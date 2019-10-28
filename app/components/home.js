/* @flow */
import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  Platform,
  StatusBar,
  RefreshControl,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Text,
  View,
  ListView,
  Image
} from 'react-native';

import type { IListing } from '../interfaces';
import { clickedRow, getListings, showFlagListing } from '../actions';

class Home extends Component {

  constructor(props) {
    super(props);

    console.log('home.constructor()');
  }

  componentDidMount = () => {
    this.props.dispatch(getListings(this.props.sessionId, true));
  }

  onRowClick(listing: IListing) {
    if (listing.hideListing || listing.hideUsersListings) {
      this.props.dispatch(showFlagListing(this.props.navigator, listing));
    } else {
      this.props.dispatch(clickedRow(this.props.navigator, listing));
    }
  }

  _onRefresh() {
    this.props.dispatch(getListings(this.props.sessionId));
  }

  render() {
    if (!this.props.listings || this.props.listings.length === 0) {
      return (
        <View style={styles.container}>
          <StatusBar backgroundColor="#ffc900" barStyle="light-content" />
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <StatusBar backgroundColor="#ffc900" barStyle="light-content" hidden={true} />
          <ListView
            refreshControl={
              <RefreshControl
                refreshing={this.props.refreshing}
                onRefresh={this._onRefresh.bind(this)}
              />
            }
            removeClippedSubviews={false}
            enableEmptySections={true}
            style={styles.listView}
            dataSource={this.props.listings}
            renderRow={(listing) => { return this.renderListing(listing) }}
          />
        </View>
      );
    }
  }

  renderListing = (listing) => {
    if (listing.hideListing) {
      return (
        <TouchableOpacity onPress={() => this.onRowClick(listing)} >
          <View style={styles.row} >
            <Text>This listing was hidden by you</Text>
          </View>
        </TouchableOpacity>
      );
    } else if (listing.hideUsersListings) {
      return (
        <TouchableOpacity onPress={() => this.onRowClick(listing)} >
          <View style={styles.row} >
            <Text>This user's listings were hidden by you</Text>
          </View>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity onPress={() => this.onRowClick(listing)} >
          <View style={styles.row} >
            <View style={{ flex: 1, flexDirection: 'row' }}>
              {/* Image */}
              <View style={styles.imageWrapper}>
                <Image style={styles.rowImage} resizeMode={"cover"}
                  source={{ uri: listing.imageUrl1 }} />
              </View>

              <View style={{ paddingLeft: 15 }}>
                {/* Title */}
                <Text style={styles.rowHeader}>
                  {listing.name}
                </Text>

                {/* Price / Ownership*/}
                <Text style={styles.rowCategory}>
                  ${listing.price}
                </Text>

                {/* Category
								<Text style={styles.rowCategory}>
									({listing.categoryName})
								</Text> */}
              </View>
            </View>

            <View style={{ paddingTop: 5 }}>
              {/* Description */}
              {(listing.description) ? (
                <Text style={styles.rowDescription}>
                  {listing.description}
                </Text>
              ) : null}
            </View>
          </View>
        </TouchableOpacity>
      );
    }
  }
}

var styles = StyleSheet.create({
  categoriesLink: {
    paddingLeft: 10,
    paddingBottom: 10,
    color: 'white'
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
    height: 75,
    width: 75,
  },
  rowImage: {
    flex: 1,
    borderRadius: 3
  }
});

var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
var mapStateToProps = (state) => {
  console.log('home.mapStateToProps()');

  return {
    sessionId: state.sessionId,
    refreshing: state.refreshing,
    listings: ds.cloneWithRows(state.listings),
    userIsLoggedIn: state.userIsLoggedIn
  }
}

module.exports = connect(mapStateToProps)(Home);
