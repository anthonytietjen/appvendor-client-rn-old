/* @flow */
import React, { Component } from 'react';
import { StatusBar, TouchableOpacity, Alert, StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import {connect} from 'react-redux';
import type {IListing} from '../interfaces';

import {showContactInfo, showFlagListing} from '../actions';

class Details extends Component {
    signInMessage = 'You must be signed in to use this feature.';

    contactInfo(){
        if(this.props.sessionId != '0'){
           this.props.dispatch(showContactInfo());
        } else {
            Alert.alert(null, this.signInMessage);
        }
    }

    flagListing(){
        if(this.props.sessionId != '0'){
           this.props.dispatch(showFlagListing(this.props.navigator, this.props.listing));
        } else {
            Alert.alert(null, this.signInMessage);
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar backgroundColor="#ffc900" barStyle="light-content" />

                <ScrollView>
                    <View style={styles.row} >
                        <View style={{flex:1, flexDirection:'row'}}>
							{/* Image */}
							<View style={styles.imageWrapper}>
								<Image style={styles.rowImage} resizeMode={"cover"}
									source={{uri: this.props.listing.imageUrl1}} />
							</View>
							
							<View style={{paddingLeft:15}}>
								{/* Title */}
								<Text style={styles.rowHeader}>
									{this.props.listing.name}
								</Text>

								{/* Price / Ownership*/}
								<Text style={styles.rowCategory}>
									${this.props.listing.price}
								</Text>

								{/* Category 
								<Text style={styles.rowCategory}>
									({this.props.listing.categoryName})
								</Text>*/}

								{/* Contact Info */}
								<TouchableOpacity onPress={()=>{this.contactInfo()}}>
									<Text style={styles.rowCategory}>
										Contact Seller
									</Text>
								</TouchableOpacity>

								{/* Flag Listing */}
								<TouchableOpacity onPress={()=>{this.flagListing()}}>
									<Text style={styles.rowCategory}>
										Flag Listing
									</Text>
								</TouchableOpacity>

							</View>
						</View>

						<View style={{paddingTop:5}}>
							{/* Description */}
							{(this.props.listing.description) ? (
								<Text style={styles.rowDescription}>
									{this.props.listing.description}
								</Text>
							) : null}
						</View>

                        {/* Image2 */}
                        <View style={styles.imageWrapper2}>
                            <Image style={styles.rowImage2}
                                resizeMode={"contain"}
                                source={{uri:this.props.listing.imageUrl2}} />
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
    backgroundColor:'#ffc900',
    padding:0,
    margin:0,
    marginTop:60
  },
  listView:{
    padding:0,
    margin:0
  },
  row: {
    padding: 15,
    backgroundColor:'white',
    borderRadius: 1,
    marginTop:5,
    marginBottom:5,
    marginLeft:10,
    marginRight:10
  },
  rowHeader: {
      color: '#333',
      fontWeight: 'bold'
  },
  rowCategory: {
      color: '#777',
      marginTop: 2,
      marginBottom: 10,
      fontSize:10
  },
  rowDescription: {
      color: '#555',
      marginTop: 3,
      marginBottom: 15
  },
  imageWrapper: {
    height:75,
	width:75,
  },
  rowImage: {
    flex:1,
	borderRadius:3
  },
	imageWrapper2: {
		height:550
	},
	rowImage2: {
		flex:1
	}
});

var mapStateToProps = (state) => {
    console.log('details.mapStateToProps()');

	return {
        listing : state.listing,
        sessionId: state.sessionId
    }
}

module.exports = connect(mapStateToProps)(Details);
