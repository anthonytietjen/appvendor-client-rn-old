/* @flow */
import React, { Component } from 'react';
import { StatusBar, TouchableOpacity, Alert, StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import { connect } from 'react-redux';

class ContactInfo extends Component {
  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#ffc900" barStyle="light-content" />

        <ScrollView>
          <View style={styles.row} >
            <Text>
              {this.props.listing.contactInformation}
            </Text>
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
  }
});

var mapStateToProps = (state) => {
  return {
    listing: state.listing
  }
}

module.exports = connect(mapStateToProps)(ContactInfo);
