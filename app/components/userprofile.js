/* @flow */
import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  StatusBar,
  Switch,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Text,
  View
} from 'react-native';

import FooterLinks from './footerlinks';
import { userProfileModel, userProfileUpdateModel, userProfileSave } from '../actions'
//import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

class UserProfile extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log('userProfile.componentDidMount');

    // Wait for the animation to finish, or the ajax call will slow it down
    setTimeout(() => {
      this.props.dispatch(userProfileModel(this.props.sessionId));
    }, 400);
  }

  render() {
    var renderBody = () => {
      if (!this.props.userProfileModel) {
        return (
          <View style={styles.row} >
            <Text>Loading...</Text>
          </View>
        );
      } else {
        return (
          <View>
            <View style={styles.view}>
              <View style={styles.row}>
                <Text style={{ paddingBottom: 10, fontWeight: 'bold' }}>
                  User Profile
                                </Text>

                <Text style={{ paddingBottom: 15 }}>Email: {this.props.userProfileModel.email}</Text>

                <Text>Display Name</Text>
                <View style={styles.textboxContainer}>
                  <TextInput
                    value={this.props.userProfileModel.displayName}
                    onChangeText={(text) => { this.props.dispatch(userProfileUpdateModel({ displayName: text })) }}
                    style={styles.textbox}
                    autoCorrect={false}
                    underlineColorAndroid='transparent' />
                </View>
              </View>
            </View>

            <View style={styles.row}>
              <Text style={{ paddingBottom: 10, fontWeight: 'bold' }}>
                Email Subscriptions
                            </Text>

              <Text style={{ paddingBottom: 10, color: 'gray' }}>
                In addition to mandatory administrative emails, also subscribe me to the following:
                            </Text>

              <View style={styles.textWithSwitch}>
                <Text>Daily Latest Listings</Text>
                <Switch
                  value={this.props.userProfileModel.notifyOfDailyLatestListings}
                  onValueChange={(value) => { this.props.dispatch(userProfileUpdateModel({ notifyOfDailyLatestListings: value })) }}
                />
              </View>

              <View style={styles.textWithSwitch}>
                <Text>Weekly Newsletter</Text>
                <Switch
                  value={this.props.userProfileModel.notifyOfNewsletterWeekly}
                  onValueChange={(value) => { this.props.dispatch(userProfileUpdateModel({ notifyOfNewsletterWeekly: value })) }}
                />
              </View>

              <View style={styles.textWithSwitch}>
                <Text>Monthly Newsletter</Text>
                <Switch
                  value={this.props.userProfileModel.notifyOfNewsletterMonthly}
                  onValueChange={(value) => { this.props.dispatch(userProfileUpdateModel({ notifyOfNewsletterMonthly: value })) }}
                />
              </View>
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={() => { this.props.dispatch(userProfileSave(this.props.userProfileModel, this.props.sessionId)) }}>
                <View style={styles.textboxContainer}>
                  <Text style={styles.button}>
                    Save
                                    </Text>
                </View>
              </TouchableOpacity>
            </View>

            <FooterLinks justifyContent="center" />
          </View>
        );
      }
    }

    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#ffc900" barStyle="light-content" />
        <ScrollView>
          {renderBody()}
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
  },
  rowHeader: {
    color: '#333',
    fontWeight: 'bold'
  },
  rowCategory: {
    color: '#777',
    marginTop: 2,
    marginBottom: 10,
    fontSize: 10
  },
  rowDescription: {
    color: '#555',
    marginTop: 3,
    marginBottom: 15
  },
  imageWrapper: {
    height: 350,
    marginBottom: 15
  },
  rowImage: {
    flex: 1
  }
});

var mapStateToProps = (state) => {
  return {
    userProfileModel: state.userProfileModel,
    sessionId: state.sessionId
  };
}

module.exports = connect(mapStateToProps)(UserProfile);
