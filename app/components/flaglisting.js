/* @flow */
import React, { Component } from 'react';
import { StatusBar, TouchableOpacity, Alert, StyleSheet, Text, View, ScrollView, Switch } from 'react-native';
import { connect } from 'react-redux';

import { webServiceBase, appVersion, appPlatform } from '../api';
import { flagListing, flagUser, toggleListingVisibility, toggleUsersListingsVisibility } from '../actions';

class ContactInfo extends Component {
  promptFlagListing() {
    Alert.alert(
      'Confirm',
      'Really flag this listing for review?',
      [
        { text: 'Cancel' },
        {
          text: 'Flag Listing', onPress: () => {
            this.flagListingOrUser('reportlisting/flagListing').then(() => {
              Alert.alert('Thank You', 'This listing has been flagged for review.');
            });
            //this.props.dispatch(flagListing());
          }
        }
      ]
    );
  }

  promptFlagUser() {
    Alert.alert(
      'Confirm',
      'Really flag this user for review?',
      [
        { text: 'Cancel' },
        {
          text: 'Flag User', onPress: () => {
            this.flagListingOrUser('reportlisting/flagUser').then(() => {
              Alert.alert('Thank You', 'This user has been flaggged for review.');
            });
            //this.props.dispatch(flagUser());                    
          }
        }
      ]
    );
  }

  flagListingOrUser(apiEndPoint) {
    let listingFlag = {
      listingId: this.props.listing.listingId
    }

    return fetch(webServiceBase + apiEndPoint, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json',
        'app-version': appVersion,
        'app-platform': appPlatform,
        'sessionId': this.props.sessionId
      },
      body: JSON.stringify({ listingFlag: listingFlag })
    })
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((responseJson) => {
        console.log(responseJson)
      });
  }

  setToggleListingVisibility(hideListing) {
    let apiEndPoint = hideListing ? 'reportlisting/hideListingFromMe' : 'reportlisting/unHideListingFromMe';
    let listingFlag = {
      listingId: this.props.listing.listingId
    }

    return fetch(webServiceBase + apiEndPoint, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json',
        'app-version': appVersion,
        'app-platform': appPlatform,
        'sessionId': this.props.sessionId
      },
      body: JSON.stringify({ listingFlag: listingFlag })
    })
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((responseJson) => {
        console.log(responseJson)
        this.props.dispatch(toggleListingVisibility(hideListing));
      });
  }

  setToggleUsersListingsVisibility(hideUsersListings) {
    let apiEndPoint = hideUsersListings ? 'reportlisting/hideUsersListingsFromMe' : 'reportlisting/unHideUsersListingsFromMe';
    let listingFlag = {
      listingId: this.props.listing.listingId
    }

    return fetch(webServiceBase + apiEndPoint, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json',
        'app-version': appVersion,
        'app-platform': appPlatform,
        'sessionId': this.props.sessionId
      },
      body: JSON.stringify({ listingFlag: listingFlag })
    })
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((responseJson) => {
        console.log(responseJson)
        this.props.dispatch(toggleUsersListingsVisibility(hideUsersListings, this.props.sessionId));
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#ffc900" barStyle="light-content" />

        <ScrollView>
          <View style={styles.row} >
            <View style={{ paddingBottom: 20 }}>
              <TouchableOpacity
                onPress={() => { this.promptFlagListing() }}>
                <Text style={styles.link}>Flag this listing as objectionable</Text>
              </TouchableOpacity>
            </View>

            <View style={{ paddingBottom: 20 }}>
              <TouchableOpacity
                onPress={() => { this.promptFlagUser() }}>
                <Text style={styles.link}>Flag this user ({this.props.listing.userDisplayName})</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.textWithSwitch}>
              <Text>Hide listing from me</Text>
              <Switch
                value={this.props.listing.hideListing}
                onValueChange={(hideListing) => { this.setToggleListingVisibility(hideListing) }}
              />
            </View>


            <View style={styles.textWithSwitch}>
              <Text>Hide user's listings from me</Text>
              <Switch
                value={this.props.listing.hideUsersListings}
                onValueChange={(hideUsersListings) => { this.setToggleUsersListingsVisibility(hideUsersListings) }}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#ffc900',
    padding: 0,
    margin: 0,
    marginTop: 60
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
  link: {
    color: 'blue'
  },
  textWithSwitch: {
    marginTop: 5,
    marginBottom: 5,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
});

var mapStateToProps = (state) => {
  return {
    listing: state.listing,
    sessionId: state.sessionId
  }
}

module.exports = connect(mapStateToProps)(ContactInfo);
