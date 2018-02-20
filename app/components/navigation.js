/* @flow */
import React, { Component } from 'react';
import {connect} from 'react-redux';

import {
    Alert,
    BackAndroid,
    Platform,
    StatusBar,
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import {
	Navigator
} from 'react-native-deprecated-custom-components'

import Home from './home';
import Details from './details';
import Edit from './edit';
import LoginNew from './loginnew';
import LoginExisting from './loginexisting';
import LoginPrompt from './loginprompt';
import LoginCheckEmail from './logincheckemail';
import UserProfile from './userprofile';
import Categories from './categories';
import ContactInfo from './contactinfo';
import FlagListing from './flaglisting';
import UpdateRequired from './updaterequired';
import {goBack, showCategories, editListing, newListing, publishListing, signinPrompt, userProfile, signOut, categories} from '../actions';
import {logoutAPI} from '../api';
import PreventDoubleTap from '../preventdoubletap';

class Navigation extends Component {
    constructor(){
        super();

        this.registerBackAndroidListener();
    }

    theNavigator;

    registerBackAndroidListener(){
        if(Platform.OS != 'android'){
            return;
        }

        BackAndroid.addEventListener('hardwareBackPress', ()=>{
            if(this.theRoute.index > 0){
                this.props.dispatch(goBack(this.theNavigator, this.theRoute, this.props.sessionId, this.props.categoryIdsToIgnore));
            } else {
                Alert.alert(
                    null,
                    'Are you sure you want to exit?',
                    [
                        {text: 'Cancel', onPress: ()=>{}},
                        {text: 'Close App', onPress: ()=>{
                            BackAndroid.exitApp();
                        }}
                    ]
                );
            }

            return true;
        });
    }

    signOutClicked(){
        Alert.alert(
            null,
            'Are you sure?',
            [
                {text: 'Cancel', onPress: ()=>{} },
                {text: 'Sign Out', onPress: ()=>{
                     logoutAPI(this.props.sessionId).then((success)=>{
                        console.log(success);
                        if(success){
                            this.props.dispatch(signOut());
                        }
                    });
                }}
            ]
        );
    }

    render() {
        return (
            <Navigator
                initialRoute={this.props.route}
                initialRoutes={this.props.routes}
                navigationBar={
                    <Navigator.NavigationBar
                        style={styles.navigationBar}
                        routeMapper={{
                            LeftButton: (route, navigator, index, navState) => {
                                this.theRoute = route;
                                this.theNavigator = navigator;

								if(this.props.updateRequired){
									//
								} else if(route.routeName == 'Home'){
									// New Post
									return (
										<Text onPress={()=>{PreventDoubleTap().then(()=>{this.props.dispatch(newListing(navigator, this.props.userIsLoggedIn)); })}}
											style={styles.navLink}>
											+ New Post
										</Text>
									);
								} else if(route.routeName == 'Details'){
									// Back (when on Details screen)
									return (
										<Text onPress={()=>{PreventDoubleTap().then(()=>{this.props.dispatch(goBack(navigator, route)); })}}
											style={styles.navLink}>
											Back
										</Text>
									);
								} else if(route.routeName == 'Edit'){
									return (
										<Text onPress={()=>{PreventDoubleTap().then(()=>{this.props.dispatch(goBack(navigator, route)); })}}
											style={styles.navLink}>
											Cancel
										</Text>
									);
								} else if(route.routeName == 'Categories'){
									return (
										<Text onPress={()=>{PreventDoubleTap().then(()=>{this.props.dispatch(goBack(navigator, route, this.props.sessionId, this.props.categoryIdsToIgnore)); })}}
											style={styles.navLink}>
											Back
										</Text>
									);
								} else if(route.routeName == 'SignInPrompt' ||
										route.routeName == 'SignInExisting' ||
										route.routeName == 'SignInNew' ||
										route.routeName == 'SignInCheckEmail' ||
										route.routeName === 'ContactInfo' ||
										route.routeName === 'FlagListing' ||
										route.routeName === 'UserProfile'){
									return (
										<Text onPress={()=>{PreventDoubleTap().then(()=>{this.props.dispatch(goBack(navigator, route)); })}}
											style={styles.navLink}>
											Back
										</Text>
									);
								}
                            },
                            RightButton: (route, navigator, index, navState) => {
								if(this.props.updateRequired){
									//
								} else if(route.routeName == 'Home'){
                                    if(!this.props.userIsLoggedIn){
                                        return (
                                            <Text onPress={()=>{PreventDoubleTap().then(()=>{this.props.dispatch(signinPrompt(navigator)); })}}
                                                style={styles.navLink}>
                                                Sign In
                                            </Text>
                                        );
                                    } else {
                                        return (
                                            <Text onPress={()=>{PreventDoubleTap().then(()=>{this.props.dispatch(userProfile(navigator)); })}}
                                                style={styles.navLink}>
                                                My Profile
                                            </Text>
                                        );
                                    }
                                } else if(route.routeName == 'Details'){
                                    if(this.props.listing.showEditLink){
                                        return (
                                            <Text onPress={()=>{PreventDoubleTap().then(()=>{this.props.dispatch(editListing(navigator)); })}}
                                                style={styles.navLink}>
                                                Edit
                                            </Text>
                                        );
                                    }
                                } else if(route.routeName == 'Edit'){
									if(!this.props.isLoading){
										return (
											<Text onPress={()=>{PreventDoubleTap().then(()=>{this.props.dispatch(publishListing(this.props.listingEdit, this.props.sessionId)); })}}
												style={styles.navLink}>
												Publish Now
											</Text>
										);
									} else {
										return (
											<Text
												style={styles.navLink}>
												Saving...
											</Text>
										);
									}
                                } else if(route.routeName == 'UserProfile'){
                                    return (
                                        <Text onPress={()=>{PreventDoubleTap().then(()=>{this.signOutClicked();})}}
                                            style={styles.navLink}>
                                                Sign Out
                                        </Text>);
                                }
                            },
                            Title : (route, navigator, index, navState) => {
                                //return (<Text style={styles.navTitle}>{route.title}</Text>);
                            }
                        }}
                    />
                }
                renderScene = {(route, navigator) => {
                    if(this.props.updateRequired){
						return (<UpdateRequired/>)
					} else if(route.routeName == 'Home'){
                        return (
                            <Home
                                title={route.title}
                                route={route}
                                navigator={navigator}
                            />
                        )
                    } else if(route.routeName == 'Details'){
                        return (
                            <Details
                                title={route.title}
                                route={route}
                                navigator={navigator}
                            />
                        )
                    } else if(route.routeName == 'ContactInfo'){
                        return (
                            <ContactInfo
                                title={route.title}
                                route={route}
                                navigator={navigator}
                            />
                        )
                    } else if(route.routeName == 'FlagListing'){
                        return (
                            <FlagListing
                                title={route.title}
                                route={route}
                                navigator={navigator}
                            />
                        )
                    } else if(route.routeName == 'Edit'){
                        return (
                            <Edit
                                title={route.title}
                                route={route}
                                navigator={navigator}
                                listingId={navigator.listingId}
                            />
                        )
                    } else if(route.routeName == 'SignInPrompt'){
                        return (
                            <LoginPrompt
                                title={route.title}
                                route={route}
                                navigator={navigator}
                            />
                        )
                    } else if(route.routeName == 'SignInExisting'){
                        return (
                            <LoginExisting
                                title={route.title}
                                route={route}
                                navigator={navigator}
                            />
                        )
                    } else if(route.routeName == 'SignInNew'){
                        return (
                            <LoginNew
                                title={route.title}
                                route={route}
                                navigator={navigator}
                            />
                        )
                    } else if(route.routeName == 'SignInCheckEmail'){
                        return (
                            <LoginCheckEmail
                                title={route.title}
                                route={route}
                                navigator={navigator}
                            />
                        )
                    } else if(route.routeName === 'UserProfile'){
                        return (
                            <UserProfile
                                title={route.title}
                                route={route}
                                navigator={navigator}
                            />
                        )
                    } else if(route.routeName === 'Categories'){
                        return (
                            <Categories
                                title={route.title}
                                route={route}
                                navigator={navigator}
                            />
                        )
                    }
                }}
            />
        );
    }
}

const styles = StyleSheet.create({
    navigationBar: {
        backgroundColor:'#ffc900',
        height:60,
    },
    navLink : {
        padding: 10,
        paddingTop: Platform.OS === 'ios' ? 5 : 24, // 34
        color:'#FFFFFF'
    },
    navTitle : {
        padding: 10,
        paddingTop: Platform.OS === 'ios' ? 5 : 20, // 30
        paddingLeft: Platform.OS === 'ios' ? 0 : 40,
        textAlign:'center',
        color:'#FFFFFF'
    }
});

var mapStateToProps = (state) => {
    return {
        loginMode : state.mode,
        route : state.route,
        listing: state.listing,
        listingEdit: state.listingEdit,
        routes: state.routes,
        userIsLoggedIn: state.userIsLoggedIn,
        sessionId: state.sessionId,
        categoryIdsToIgnore: state.categoryIdsToIgnore,
		updateRequired: state.updateRequired,
		isLoading: state.isLoading
    }
}

module.exports = connect(mapStateToProps)(Navigation);
