/* @flow */
import ActionTypes from '../actionTypes';
import routes from '../routes';

export default function (state: any = {}, action: any) {
  switch (action.type) {
    case ActionTypes.UPDATE_LOGIN_STATE:
      return {
        ...state,
        loginState: Object.assign({}, state.loginState, action.obj)
      }
    case ActionTypes.SIGNIN_EXISTING:
      return {
        ...state,
        loginState: {
          email: ""
        }
      }
    case ActionTypes.SIGNIN_NEW:
      return {
        ...state,
        loginState: {
          email: '',
          displayName: '',
          notifyOfDailyLatestListings: true,
          notifyOfNewsletterWeekly: true,
          notifyOfNewsletterMonthly: true,
          iAmThirteenOrOlder: false,
          agreedToTermsAndPrivacyPolicy: false
        }
      }
    case ActionTypes.SIGNIN_EMAIL_SENT:
      return {
        ...state,
        userToken: action.token,
        userKey: ''
      }
    case ActionTypes.SET_SESSION_ID:
      return {
        ...state,
        userIsLoggedIn: true,
        sessionId: action.sessionId
      }
    case ActionTypes.SIGNED_OUT:
      return {
        ...state,
        userIsLoggedIn: false,
        sessionId: '0'
      }
    default:
      return state
  }
}