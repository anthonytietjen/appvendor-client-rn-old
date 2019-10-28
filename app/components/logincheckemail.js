/* @flow */
import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  Platform,
  StatusBar,
  Alert,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Text,
  View
} from 'react-native';

import FooterLinks from './footerlinks';
import { openEmail, setSessionId, updateState } from '../actions'
import { webServiceBase, appVersion, appPlatform } from '../api';
//import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

class LoginCheckEmail extends Component {
  constructor(props) {
    super(props);
  }

  validateKey() {
    if (this.props.isLoading) {
      return;
    }

    if (this.props.userKey.trim() === '') {
      Alert.alert(
        'Alert',
        'Please enter a verification code.',
        [
          { text: 'Try Again', onPress: () => { } }
        ]
      );
      return;
    }

    this.props.dispatch(updateState({ isLoading: true }));
    this.validatePasswordLessAPI().then(response => {
      this.props.dispatch(updateState({ isLoading: false }));

      if (response.sessionId) {
        this.props.dispatch(setSessionId(response.sessionId));
      } else if (response.errorCode) {
        Alert.alert(
          'Invalid Verification Code',
          'Response code: ' + response.errorCode,
          [
            { text: 'Try Again', onPress: () => { } }
          ]
        )
      } else if (response.errorCode) {
        Alert.alert(
          'Error',
          'There was an error signing in. Please try again later.',
          [
            { text: 'Try Again', onPress: () => { } }
          ]
        )
      }
    });
  }

  validatePasswordLessAPI() {
    console.log('token', this.props.userToken);
    console.log('key', this.props.userKey);

    return fetch(webServiceBase + 'account/validatePasswordLess', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json',
        'app-version': appVersion,
        'app-platform': appPlatform
      },
      body: JSON.stringify({
        key: this.props.userKey,
        token: this.props.userToken
      })
    })
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((responseJson) => {
        console.log(responseJson);
        return responseJson;
      });
  }

  render() {

    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#ffc900" barStyle="light-content" />

        <ScrollView keyboardShouldPersistTaps="handled" >
          <View style={styles.view}>

            <View style={styles.row}>
              <Text>Email Verification Code</Text>
              <View style={styles.textboxContainer}>
                <TextInput
                  keyboardType="numeric"
                  value={this.props.userKey}
                  onChangeText={(text) => { this.props.dispatch(updateState({ userKey: text })) }}
                  style={styles.textbox}
                  autoCorrect={false}
                  autoFocus={true}
                  underlineColorAndroid='transparent' />
              </View>
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={() => { this.validateKey(); }}>
                <View style={styles.textboxContainer}>
                  <Text style={styles.button}>
                    {!this.props.isLoading ? ('Submit Code') : ('Validating...')}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    opacity: 1,
  },
  textboxContainer: {
    borderColor: '#EEEEEE',
    borderWidth: 1,
    borderRadius: 3,
    padding: 5,
    marginBottom: 10
  },
  textbox: {
    height: 26,
    padding: 0
  },
  textWithSwitch: {
    marginTop: 5,
    marginBottom: 5,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  fieldLabel: {
    color: '#CCCCCC'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#ffc900',
    padding: 0,
    margin: 0,
    marginTop: 60
  },
  listView: {
    padding: 0,
    margin: 0
  },
  buttonContainer: {
    padding: 0,
    borderRadius: 1,
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 10,
    marginRight: 10
  },
  button: {
    padding: 5,
    textAlign: 'center',
    color: 'white'
  },
  row: {
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 1,
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 10,
    marginRight: 10
  }
});

var mapStateToProps = (state) => {
  return {
    userToken: state.userToken,
    userKey: state.userKey,
    sessionId: state.sessionId,
    userIsLoggedIn: state.userIsLoggedIn,
    isLoading: state.isLoading
  };
}

module.exports = connect(mapStateToProps)(LoginCheckEmail);
//module.exports = Login;
