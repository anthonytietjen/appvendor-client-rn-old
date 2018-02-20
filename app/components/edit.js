/* @flow */
import React, { Component } from 'react';
import {connect} from 'react-redux';
import ImagePicker from 'react-native-image-picker';

import {
	Platform,
    Alert,
    StatusBar,
    TouchableOpacity,
    ScrollView,
    TextInput,
    StyleSheet,
    Text,
    View,
    Image
} from 'react-native';

//import type {IListing} from '../interfaces';
import FooterLinks from './footerlinks';
import {updateListingField, publishListing, deleteListing} from '../actions';
//import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

class EditListing extends Component {
    props;

    constructor(props){
        super(props);
    }

    pickImage(imageType){
		let options = {
			mediaType: 'photo',
			quality: 1,
			maxWidth: 144,
			maxHeight: 144
		}

        if(imageType == 2){
            options.quality = .90;
			options.maxWidth = 768;
			options.maxHeight = 3000;
        }

		ImagePicker.launchImageLibrary(options, (response) => {
			if(!response.didCancel){
				let base64Image = 'data:image/jpeg;base64,' + response.data.replace(/\r\n/g, '').replace(/\n/g, '');
				let uri = Platform.OS == 'android' ? response.uri : response.uri.replace('file://', '');

				this.props.dispatch(updateListingField('imageUrl' + imageType, base64Image));

				if(imageType == 1){
					this.props.dispatch(updateListingField('iconData', base64Image));
				} else {
					this.props.dispatch(updateListingField('screenshotData', base64Image));
				}
			}

		});
    }

	deletePrompt(){
       Alert.alert(
            'Confirm',
            'Really delete this listing?',
            [
                {text: 'Cancel'},
                {text: 'Delete', onPress: ()=>{
                    this.props.dispatch(deleteListing(this.props.sessionId, this.props.listing.listingId));
                }}
            ]
       );
	}

    render() {
        return (
            <View style={styles.container}>
                <StatusBar backgroundColor="#ffc900" barStyle="light-content" />
                <ScrollView keyboardShouldPersistTaps="handled" >
                    <View style={styles.row}>

                        {/*Name*/}
                        <Text style={styles.fieldLabel}>Name</Text>
                        <View style={styles.textboxContainer}>
                            <TextInput
                                value={this.props.listing.name}
                                onChangeText={(text) => {this.props.dispatch(updateListingField('name', text))}}
                                style={styles.textbox}
								underlineColorAndroid='transparent' />
                        </View>

                        {/*Price*/}
                        <Text style={styles.fieldLabel}>Price</Text>
                        <View style={styles.textboxContainer}>
                            <TextInput
                                keyboardType='numeric'
                                value={this.props.listing.price.toString()}
                                onChangeText={(text) => {this.props.dispatch(updateListingField('price', text))}}
                                style={styles.textbox}
								autoCorrect={false}
								underlineColorAndroid='transparent' />
                        </View>

                        {/*Contact Information*/}
                        <Text style={styles.fieldLabel}>Contact Information</Text>
                        <View style={styles.textboxContainer}>
                            <TextInput
                                value={this.props.listing.contactInformation}
                                onChangeText={(text) => {this.props.dispatch(updateListingField('contactInformation', text))}}
                                style={styles.textbox}
								autoCorrect={false}
								underlineColorAndroid='transparent'  />
                        </View>

                        {/*Description*/}
                        <Text style={styles.fieldLabel}>Description</Text>
                        <View style={styles.textboxContainer}>
                            <TextInput
                                value={this.props.listing.description}
                                onChangeText={(text) => {this.props.dispatch(updateListingField('description', text))}}
                                style={styles.textbox}
								underlineColorAndroid='transparent'  />
                        </View>

                        {/*Category
                        <Text style={styles.fieldLabel}>Category</Text>
                        <TouchableOpacity onPress={()=>{}}>
                            <View style={styles.textboxContainer}>
                                <Text style={styles.textbox}>{this.props.listing.categoryName}</Text>
                            </View>
                        </TouchableOpacity>
						*/}

                        {/* Image1 */}
                        <Text style={styles.fieldLabel}>App Icon</Text>
                        <TouchableOpacity onPress={()=>{this.pickImage(1)}}>
                            {(this.props.listing.imageUrl1 == '') ? (
                                <View style={styles.buttonBrowseContainer}>
                                    <Text>Browse...</Text>
                                </View>
                            ) : (
                                <View style={styles.imageWrapper}>
                                    <Image
                                        style={styles.rowImage}
                                        resizeMode={"cover"}
                                        source={{uri:this.props.listing.imageUrl1}} />
                                </View>
                            )}
                        </TouchableOpacity>

                        {/* Image2 */}
                        <Text style={styles.fieldLabel}>Screenshot</Text>
                        <TouchableOpacity onPress={()=>{this.pickImage(2)}}>
                            {(this.props.listing.imageUrl2 == '') ? (
                                <View style={styles.buttonBrowseContainer}>
                                    <Text>Browse...</Text>
                                </View>
                            ) : (
                                <View style={styles.imageWrapper2}>
                                    <Image
                                        style={styles.rowImage2}
                                        resizeMode={"contain"}
                                        source={{uri:this.props.listing.imageUrl2}} />
                                </View>
                            )}
                        </TouchableOpacity>
                    </View>

                    <View style={styles.buttonContainer}>
						{(this.props.listing.listingId > 0) ? (
							<TouchableOpacity onPress={()=>{this.deletePrompt()}}>
								<View style={styles.textboxContainer}>
									<Text  style={styles.button}>Delete</Text>
								</View>
							</TouchableOpacity>
						) : null}
                    </View>



                    <View style={{paddingTop:15,paddingBottom:15}}>
                        <FooterLinks justifyContent='center' />
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    textboxContainer:{
        borderColor:'#EEEEEE',
        borderWidth:1,
        borderRadius:3,
        padding:5,
        marginBottom:10
    },
    textbox: {
        height:26,
		padding:0
    },
    fieldLabel:{
        paddingBottom:5
    },
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
	buttonBrowseContainer:{
        borderColor:'#EEEEEE',
        borderWidth:1,
        borderRadius:3,
        padding:9,
        marginBottom:10
    },
    buttonContainer: {
        padding: 0,
        borderRadius: 1,
        marginTop:5,
        marginBottom:5,
        marginLeft:10,
        marginRight:10
    },
    button:{
        padding:5,
        textAlign:'center',
        color:'white'
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
        marginBottom:20
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
	},
});

var mapStateToProps = (state) => {
    return {
        listing : state.listingEdit,
        sessionId: state.sessionId
    }
}

module.exports = connect(mapStateToProps)(EditListing);
