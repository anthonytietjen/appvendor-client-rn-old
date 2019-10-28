/* @flow */
import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet, Linking, Text, View } from 'react-native';

export default class FooterLinks extends Component {
  render() {
    return (
      <View style={[styles.footerLinksRow, { justifyContent: this.props.justifyContent }]}>
        <TouchableOpacity onPress={() => { Linking.openURL('http://appvendor.blogspot.com/p/terms-of-use.html'); }}>
          <Text style={styles.link}>
            Terms of Use
                    </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => { Linking.openURL('http://appvendor.blogspot.com/p/privacy-policy.html'); }}>
          <Text style={styles.link}>
            Privacy Policy
                    </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  link: {
    marginLeft: 10,
    marginRight: 10,
    color: 'white'
  },
  footerLinksRow: {
    flexDirection: 'row',
    marginTop: 5,
    marginBottom: 15
  }
});
