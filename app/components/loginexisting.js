/* @flow */
import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  Alert,
  Platform,
  StatusBar,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
  View
} from 'react-native';

import FooterLinks from './footerlinks';
import { signinExistingGo, updateLoginState, updateState } from '../actions';
import { webServiceBase, appVersion, appPlatform } from '../api';
//import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

class LoginExisting extends Component {
  constructor(props) {
    super(props);
  }

  loginExisting() {
    if (this.props.isLoading) {
      return;
    }

    let errorMessage = '';
    if (this.props.loginState.email.trim() === '') {
      errorMessage = 'Missing email address';
    }

    if (errorMessage !== '') {
      Alert.alert(
        '',
        errorMessage
      )
    } else {
      this.props.dispatch(updateState({ isLoading: true }));
      this.loginExistingAPI().then((token) => {
        this.props.dispatch(updateState({ isLoading: false }));
        //console.log('token', token);
        this.props.dispatch(signinExistingGo(token))
      });
    }
  }

  loginExistingAPI() {
    return fetch(webServiceBase + 'account/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json',
        'app-version': appVersion,
        'app-platform': appPlatform
      },
      body: JSON.stringify({
        email: this.props.loginState.email
      })
    })
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((responseJson) => {
        console.log(responseJson);
        return responseJson.token
      });
  }

  render() {

    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#ffc900" barStyle="light-content" />

        <ScrollView keyboardShouldPersistTaps="handled" >
          <View style={styles.view}>
            <View style={styles.row}>
              <Text>Email</Text>
              <View style={styles.textboxContainer}>
                <TextInput
                  value={this.props.loginState.email}
                  keyboardType='email-address'
                  onChangeText={(text) => { this.props.dispatch(updateLoginState({ email: text })) }}
                  style={styles.textbox}
                  autoCorrect={false}
                  autoFocus={true}
                  underlineColorAndroid='transparent'
                />
              </View>
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={() => { this.loginExisting() }}>
                <View style={styles.textboxContainer}>
                  <Text style={styles.button}>
                    {!this.props.isLoading ? ('Sign In') : ('Please Wait...')}
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
    loginState: state.loginState,
    isLoading: state.isLoading
  }
}

module.exports = connect(mapStateToProps)(LoginExisting);
//module.exports = Login;
