/* @flow */
import React, { Component } from 'react';
import { StatusBar, StyleSheet } from 'react-native';

export default class CustomStatusBar extends Component {
  render() {
    return (
      <StatusBar backgroundColor={styles.statusBar.backgroundColor} barStyle="light-content" />
    );
  }
}

const styles = StyleSheet.create({
  statusBar: {
    backgroundColor: "#ffc900"
  }
});
