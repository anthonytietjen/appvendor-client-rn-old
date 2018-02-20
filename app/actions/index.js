/* @flow */
import {
	Alert,
	Navigator
} from 'react-native';
import {Dispatch} from 'redux';

import {saveProfileAPI, meAPI, putListingAPI, putListingAsBlobAPI, getListingsAPI, getCategoriesAPI, setCategoryIdsToIgnoreAPI, deleteListingAPI} from '../api';
import ActionTypes from '../actionTypes';
import routes from '../routes';
import type {IListing} from '../interfaces';
var theNavigator: any;


exports.goBack = (navigator:Navigator, router:any, sessionId:Number, categoryIdsToIgnore:Array<Number>) => {
    console.log('sessionId', sessionId);
    console.log('categoryIdsToIgnore', categoryIdsToIgnore);

    if(router.routeName == "Categories"){
        return function(dispatch:Dispatch){
            return setCategoryIdsToIgnoreAPI(sessionId, categoryIdsToIgnore)
                .then(success => {

                    // Get the newly filtered listings
                    getListingsAPI(sessionId).then((listings)=>{
                        dispatch({type: ActionTypes.SET_LISTINGS, listings});
                        navigator.pop();
                    });
                });
        }
    } else {
        return function(dispatch:Dispatch){
			theNavigator.pop();
		}
    }
}

exports.clickedRow = (navigator:Navigator, listing:IListing) => {
	theNavigator = navigator;
    var formData = new FormData();
	return function(dispatch:Dispatch){
    	dispatch({ type: ActionTypes.CLICK_LISTING, listing });
		navigator.push(routes.Details);
	}
}

exports.editListing = (navigator:Navigator) => {
    return function(dispatch:Dispatch){
		dispatch({ type: ActionTypes.EDIT_LISTING });
        navigator.push(routes.Edit);
	}
}

exports.newListing = (navigator:Navigator, userIsLoggedIn:Boolean) => {
	theNavigator = navigator;
	
    return function(dispatch:Dispatch){
		dispatch({ type: ActionTypes.NEW_LISTING });

		if(!userIsLoggedIn){
			theNavigator.push(routes.SignInPrompt);
		} else {
        	theNavigator.push(routes.Edit);
		}
	}
}

exports.updateListingField = (name:string, value:any) => {
    return { type: ActionTypes.UPDATE_LISTING_FIELD, name, value}
}

exports.signinPrompt = (navigator:Navigator) => {
    return function (dispatch:Dispatch){
		theNavigator.push(routes.SignInPrompt);
	}
}

exports.signinExisting = () => {
    return function (dispatch:Dispatch){
		dispatch({ type: ActionTypes.SIGNIN_EXISTING });
        theNavigator.push(routes.SignInExisting);
	}
}

exports.signinNew = () => {
    return function (dispatch:Dispatch){
		dispatch({ type: ActionTypes.SIGNIN_NEW });
		theNavigator.push(routes.SignInNew);
	}
}

exports.signinNewGo = (token:string) => {
    return function (dispatch:Dispatch) {
		dispatch({ type: ActionTypes.SIGNIN_EMAIL_SENT, token });
        theNavigator.push(routes.SignInCheckEmail);
	}
}

exports.signinExistingGo = (token:string) => {
    return function (dispatch:Dispatch) {
		dispatch({ type: ActionTypes.SIGNIN_EMAIL_SENT, token });
        theNavigator.push(routes.SignInCheckEmail);
	}
}

exports.setSessionId = (sessionId:Number) => {
    return function(dispatch:Dispatch){
        return getListingsAPI(sessionId).then((listings)=>{
            dispatch({ type: ActionTypes.SET_SESSION_ID, sessionId });
            dispatch({ type: ActionTypes.REFRESH_LISTING_IMAGES, listings, version: new Date().getTime() });
			theNavigator.popToTop();
        });
    }
}

exports.signOut = () => {
    return function(dispatch:Dispatch){
        return getListingsAPI('0').then((listings)=>{
            dispatch({ type: ActionTypes.SIGNED_OUT, listings });
            dispatch({ type: ActionTypes.REFRESH_LISTING_IMAGES, listings, version: new Date().getTime() });
			if(theNavigator){
				// Note: theNavigator won't exist if you got signed out on another device and you are currently on the home screen of the current device
            	theNavigator.popToTop();
			}
        });
    }
}

exports.userProfile = (navigator:Navigator) => {
	theNavigator = navigator;

    return function (dispatch:Dispatch) {
		dispatch({ type: ActionTypes.PROFILE});
        dispatch({ type: ActionTypes.IS_REFRESHING, isRefreshing: true});
		theNavigator.push(routes.UserProfile);
	}
}

exports.userProfileModel = (sessionId:string) => {
    return function(dispatch:Dispatch){
        meAPI(sessionId).then((response) => {
			if(response.invalidSession){
				getListingsAPI('0').then((listings)=>{
					dispatch({ type: ActionTypes.SIGNED_OUT, listings: [] });
					if(theNavigator){
						// Note: theNavigator won't exist if you got signed out on another device and you are currently on the home screen of the current device
						theNavigator.popToTop();
					}
				});
			}else {
            	dispatch({ type: ActionTypes.PROFILE_GOT_MODEL, userProfileModel: response.userProfile });
            	dispatch({ type: ActionTypes.IS_REFRESHING, isRefreshing: false});
			}
        });
    }
}

exports.userProfileUpdateModel = (obj:any) => {
    return{ type: ActionTypes.PROFILE_UPDATE_MODEL, obj }
}

exports.userProfileSave = (userProfileModel:any, sessionId:string) => {
    return function(dispatch:Dispatch){
        //dispatch({ type: ActionTypes.PROFILE_SAVING_MODEL" });
        
        saveProfileAPI(userProfileModel, sessionId).then(()=>{
            dispatch({ type: ActionTypes.IS_REFRESHING, isRefreshing: false});
			theNavigator.pop();
        });
    }
}

exports.updateState = (obj:any) => {
    return {type: ActionTypes.UPDATE_STATE, obj}
}

exports.updateLoginState = (obj:any) => {
    return {type: ActionTypes.UPDATE_LOGIN_STATE, obj}
}

exports.showCategories = (navigator:Navigator) => {
    console.log('actions.showCategories');
    return function(dispatch:Dispatch){
		dispatch({type: ActionTypes.IS_LOADING, isLoading: true});
		dispatch({type: ActionTypes.SHOW_CATEGORIES, navigator});
		theNavigator.push(routes.Categories);
	}
}

exports.getCategories = (sessionId:Navigator) => {
    console.log('actions.getCategories');

    return function(dispatch:Dispatch){
        return getCategoriesAPI(sessionId).then(({categories, categoryIdsToIgnore }) =>{
            dispatch({type: ActionTypes.SET_CATEGORIES, categories, categoryIdsToIgnore});
			dispatch({type: ActionTypes.IS_LOADING, isLoading: false});
        });
    }
}

exports.setCategoryIdToIgnore = (categoryId:number, isIgnored:boolean) => {
    return { type: ActionTypes.SET_CATEGORYID_TO_IGNORE, categoryId, isIgnored };
}

exports.showContactInfo = (navigator:Navigator) => {
    return function (dispatch:Dispatch){
		theNavigator.push(routes.ContactInfo);
	}
}

exports.showFlagListing = (navigator:Navigator, listing:IListing) => {
    return function(dispatch:Dispatch){
		theNavigator.push(routes.FlagListing);
	}
}

exports.getListings = (sessionId:string, useCachedImages:boolean=false) => {
    console.log('actions.getListings');
    
    return function(dispatch:Dispatch){
        return getListingsAPI(sessionId).then((listings)=>{
			if(listings.invalidSession){
				Alert.alert('Alert', 'Your session has expired. Please sign in again.', [
					{text: 'OK', onPress:()=>{
						dispatch({ type: ActionTypes.SIGNED_OUT, listings: [] });
						getListingsAPI('0').then((listings)=>{
							dispatch({ type: ActionTypes.SIGNED_OUT, listings });
						});
					}}
				]);
			} else {
            	dispatch({type: ActionTypes.SET_LISTINGS, listings, useCachedImages});
			}
        });
    }
}

exports.deleteListing = (sessionId:number, listingId:number) => {
    console.log('actions.deleteListing');
    
    return function(dispatch:Dispatch){
        return deleteListingAPI(sessionId, listingId).then(()=>{
            dispatch({type: ActionTypes.DELETED_LISTING, listingId});
			theNavigator.popToTop();
        });
    }
}

exports.flagListing = (listingId:number) => {
    return { type: ActionTypes.FLAG_LISTING};
}

exports.flagUser = (listingId:number) => {
    return { type: ActionTypes.FLAG_LISTING};    
}

exports.toggleListingVisibility = (hideListing:boolean) => {
    return { type: ActionTypes.TOGGLE_LISTING_VISIBILITY, hideListing};
}

exports.toggleUsersListingsVisibility = (hideUsersListings:boolean, sessionId:string) => {
    return function(dispatch:Dispatch){
        return getListingsAPI(sessionId).then((listings)=>{
            dispatch({ type: ActionTypes.TOGGLE_USERS_LISTINGS_VISIBILITY, hideUsersListings, listings});
        });
    }
}

exports.publishListing = (listing:IListing, sessionId:string) => {
    //console.log('listing.iconData', listing.iconData);
    //console.log('listing.screenshotData', listing.screenshotData);
    //console.log('listing.screenshotData', listing.screenshotData.substr(0, 20));

	if(listing.listingId == 0){
		listing.wasNew = true;
		listing.showEditLink = true;
	}

    return function(dispatch:Dispatch){
		dispatch({ type: ActionTypes.IS_LOADING, isLoading:true });
        return putListingAPI(listing, sessionId).then((listingId)=>{
			listing.listingId = listingId;
            dispatch({ type: ActionTypes.PUBLISH_LISTING, listing });
			dispatch({ type: ActionTypes.IS_LOADING, isLoading:false });
			
			Alert.alert(
				'Success',
				'Your listing has been published.',
				[
					{
						text: 'Continue',
						onPress: ()=>{ theNavigator.pop(); }
					}
				]
			);
        });
    }
}