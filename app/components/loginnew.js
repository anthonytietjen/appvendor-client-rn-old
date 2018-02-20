/* @flow */
import React, { Component } from 'react';
import {connect} from 'react-redux';

import {
    Alert,
    Platform,
    StatusBar,
    ScrollView,
    Switch,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Text,
    View
} from 'react-native';

import FooterLinks from './footerlinks';
import {signinNewGo, updateLoginState, updateState} from '../actions'
import {webServiceBase, appVersion, appPlatform} from '../api';
//import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

class LoginNew extends Component {
    constructor(props){
        super(props);
	}

    signup() {
        let errorMessage = '';

        if(this.props.loginState.email.trim() === ''){
            errorMessage = 'Missing email address';    
        } else if(this.props.loginState.displayName.trim() === '') {
            errorMessage = 'Missing display name';
        } else if(this.props.loginState.iAmThirteenOrOlder === false) {
            errorMessage = 'You must be 13 years old or older';
        } else if(this.props.loginState.agreedToTermsAndPrivacyPolicy === false) {
            errorMessage = 'You must accept the Terms of Use and Privacy Policy';
        }

        if(errorMessage !== ''){
            Alert.alert(
                '',
                errorMessage
            )
        } else {
			this.props.dispatch(updateState({isLoading:true}));
            this.signupAPI().then((token)=>{
				this.props.dispatch(updateState({isLoading:false}));
                this.props.dispatch(signinNewGo(token))
            });
        }
    }

    signupAPI(){
        let {email, displayName, notifyOfDailyLatestListings, notifyOfNewsletterWeekly, notifyOfNewsletterMonthly} = this.props.loginState;

        return fetch(webServiceBase + 'account/signup', {
            method : 'POST',
            headers : {
                'Accept' : 'application/json',
                'Content-type' : 'application/json',
                'app-version' : appVersion,
                'app-platform' : appPlatform
            },
            body : JSON.stringify({
                email,
                displayName,
                notifyOfDailyLatestListings,
                notifyOfNewsletterWeekly,
                notifyOfNewsletterMonthly,
                notifyOfNewsletterQuarterly : false
            })
        })
        .then((response) => {
            console.log(response);
            return response.json();
        })
        .then((responseJson) => {
            console.log(responseJson)
            return responseJson.token;
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView keyboardShouldPersistTaps="handled" >
                    <StatusBar backgroundColor="#ffc900" barStyle="light-content" />

                    <View style={styles.view}>

                        <View style={styles.row}>
                            <Text style={{paddingBottom:10, fontWeight:'bold'}}>
                                User Profile
                            </Text>

                            <Text>Email</Text>
                            <View style={styles.textboxContainer}>
                                <TextInput
                                    value={this.props.loginState.email}
									keyboardType='email-address'
                                    onChangeText={(text) => {this.props.dispatch(updateLoginState({email: text}))}}
                                    style={styles.textbox}
									autoCorrect={false}
									underlineColorAndroid='transparent' />
                            </View>

                            <Text>Display Name</Text>                            
                            <View style={styles.textboxContainer}>
                                <TextInput
                                    value={this.props.loginState.displayName}
                                    onChangeText={(text) => {this.props.dispatch(updateLoginState({displayName: text}))}}
                                    style={styles.textbox}
									autoCorrect={false}
									underlineColorAndroid='transparent' />
                            </View>
                        </View>

                        <View style={styles.row}>
                            <Text style={{paddingBottom:10, fontWeight:'bold'}}>
                                Email Subscriptions
                            </Text>

                            <Text style={{paddingBottom:10, color:'gray'}}>
                                In addition to mandatory administrative emails, also subscribe me to the following:
                            </Text>

                            <View style={styles.textWithSwitch}>
                                <Text>Daily Latest Listings</Text>
                                <Switch
                                    value={this.props.loginState.notifyOfDailyLatestListings}
                                    onValueChange={(value)=>{this.props.dispatch(updateLoginState({notifyOfDailyLatestListings:value}))}}
                                />
                            </View>

                            <View style={styles.textWithSwitch}>
                                <Text>Weekly Newsletter</Text>
                                <Switch
                                    value={this.props.loginState.notifyOfNewsletterWeekly}
                                    onValueChange={(value)=>{this.props.dispatch(updateLoginState({notifyOfNewsletterWeekly:value}))}}
                                />
                            </View>

                            <View style={styles.textWithSwitch}>
                                <Text>Monthly Newsletter</Text>
                                <Switch
                                    value={this.props.loginState.notifyOfNewsletterMonthly}
                                    onValueChange={(value)=>{this.props.dispatch(updateLoginState({notifyOfNewsletterMonthly:value}))}}
                                />
                            </View>
                        </View>

                        <View style={styles.row}>
                            <Text style={{paddingBottom:10, fontWeight:'bold'}}>
                                Agreements
                            </Text>

                            <View style={styles.textWithSwitch}>
                                <Text>I am 13 years old or older</Text>
                                <Switch
                                    value={this.props.loginState.iAmThirteenOrOlder}
                                    onValueChange={(value)=>{this.props.dispatch(updateLoginState({iAmThirteenOrOlder:value}))}}
                                />
                            </View>

                            <View style={styles.textWithSwitch}>
                                <Text>I accept the following:</Text>
                                <Switch
                                    value={this.props.loginState.agreedToTermsAndPrivacyPolicy}
                                    onValueChange={(value)=>{this.props.dispatch(updateLoginState({agreedToTermsAndPrivacyPolicy:value}))}}
                                />
                            </View>

                            <FooterLinks justifyContent="flex-start" />
                        </View>

                        <View style={styles.buttonContainer}>
                            <TouchableOpacity onPress={()=>{this.signup();}}>
                                <View style={styles.textboxContainer}>
                                    <Text style={styles.button}>
                                        {!this.props.isLoading ? ('Create Account') : ('Please Wait...')}
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
    textWithSwitch: {
        marginTop:5,
        marginBottom:5,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    fieldLabel:{
        color: '#CCCCCC'
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
        height:350,
        marginBottom:15
    },
    rowImage: {
        flex:1
    }
});

var mapStateToProps = (state) => {
    return state;
}

module.exports = connect(mapStateToProps)(LoginNew);
//module.exports = Login;
