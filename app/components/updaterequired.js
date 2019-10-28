/* @flow */
import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  StatusBar,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Linking,
} from 'react-native';

import { getCategories, setCategoryIdToIgnore } from '../actions';

class UpdateRequired extends Component {
  props;

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#ffc900" barStyle="light-content" />
        <ScrollView>
          <View style={styles.row} >
            <View >
              <Text>In order to keep using the app, you must download the latest update.</Text>
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={() => { Linking.openURL(this.props.updateUrl) }}>
              <View style={styles.textboxContainer}>
                <Text style={styles.button}>
                  Update Now
								</Text>
              </View>
            </TouchableOpacity>
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
  textboxContainer: {
    borderColor: '#EEEEEE',
    borderWidth: 1,
    borderRadius: 3,
    padding: 5,
    marginBottom: 10
  },
  listView: {
    padding: 0,
    margin: 0
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
  textWithSwitch: {
    marginTop: 5,
    marginBottom: 5,
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});

var mapStateToProps = (state) => {
  console.log('updaterequired.mapStateToProps');
  return {
    updateUrl: state.updateUrl
  }
}

module.exports = connect(mapStateToProps)(UpdateRequired);
