/* @flow */
import {createStore, compose, applyMiddleware} from 'redux';
import {AsyncStorage} from 'react-native';
import {persistStore, autoRehydrate} from 'redux-persist';
//import reducer from '../reducer';
import thunk from 'redux-thunk';

/* @flow */
import ActionTypes from '../actionTypes';
//import {combineReducers} from 'redux';

import auth from '../reducer/auth';
import flaglisting from '../reducer/flaglisting';
import categories from '../reducer/categories';
import listingReducer from '../reducer/listingReducer';
import profile from '../reducer/profile';
import misc from '../reducer/misc';
import routes from '../routes';

var defaultState = {
    sessionId: "0",
    userIsLoggedIn : false,
    userToken : "",
    userKey : "",
    listings : [],
    listing : [],
    listingEdit : {},
    routes : routes,
    route : routes['Home'],
    loginState: {},
    doReloadListings: true,
    refreshing: false,
	isLoading: false,
    categories: [],
    categoryIdsToIgnore: [],
    userProfile: null,
	updateRequired: false,
	imageCacheParam: new Date().getTime().toString()
}

// const reducer = (state:any=defaultState, action:any) => {
// 	return {
// 		auth : auth(state, action),
// 		flaglisting : flaglisting(state, action),
// 		categories : categories(state, action),
// 		listing : listing(state, action),
// 		profile : profile(state, action),
// 		misc : misc(state, action)
// 	}
// };

const reducer = (state:any=defaultState, action:any) => {
    //console.group('Reducer');
    //console.log('state:', state);
    //console.log('action:', action);
    //console.groupEnd();
	//return defaultState;

    switch(action.type){
        case ActionTypes.SET_LISTINGS: 
        case ActionTypes.CLICK_LISTING:
        case ActionTypes.EDIT_LISTING:
        case ActionTypes.NEW_LISTING:
        case ActionTypes.UPDATE_LISTING_FIELD:            
        case ActionTypes.PUBLISH_LISTING:
		case ActionTypes.DELETED_LISTING:
		case ActionTypes.REFRESH_LISTING_IMAGES:
			return listingReducer(state, action);
        case ActionTypes.UPDATE_LOGIN_STATE:
        case ActionTypes.SIGNIN_EXISTING:
        case ActionTypes.SIGNIN_NEW:
        case ActionTypes.SIGNIN_EMAIL_SENT:
        case ActionTypes.SET_SESSION_ID:
        case ActionTypes.SIGNED_OUT:
        	return auth(state, action);
        case ActionTypes.PROFILE:
        case ActionTypes.PROFILE_GOT_MODEL:
        case ActionTypes.PROFILE_UPDATE_MODEL:
            return profile(state, action);
        case ActionTypes.SHOW_CATEGORIES:
        case ActionTypes.SET_CATEGORIES:
        case ActionTypes.SET_CATEGORYID_TO_IGNORE:
            return categories(state, action);
        case ActionTypes.TOGGLE_LISTING_VISIBILITY:
        case ActionTypes.TOGGLE_USERS_LISTINGS_VISIBILITY:
            return flaglisting(state, action);
		case ActionTypes.IS_LOADING:  
        case ActionTypes.UPDATE_STATE:
        case ActionTypes.IS_REFRESHING:
            return misc(state, action);
        default:
            return state
    }
}

//export var store = compose(applyMiddleware(thunk), autoRehydrate())(createStore)(reducer)
export var store = compose(applyMiddleware(thunk))(createStore)(reducer)

/*
export var configureStore = (initialState?:any) => {
    var store = createStore(reducer, initialState, compose(
        applyMiddleware(thunk),
        autoRehydrate()
    ));

    persistStore(store, {storage: AsyncStorage})

    return store;
}
*/
