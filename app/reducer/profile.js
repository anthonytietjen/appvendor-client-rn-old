/* @flow */
import ActionTypes from '../actionTypes';
import routes from '../routes';

export default function (state: any = {}, action: any) {
  switch (action.type) {
    case ActionTypes.PROFILE:
      return {
        ...state,
        userProfileModel: null
      }
    case ActionTypes.PROFILE_GOT_MODEL:
      return {
        ...state,
        userProfileModel: action.userProfileModel
      }
    case ActionTypes.PROFILE_UPDATE_MODEL:
      return {
        ...state,
        userProfileModel: Object.assign({}, state.userProfileModel, action.obj)
      }
    default:
      return state
  }
}