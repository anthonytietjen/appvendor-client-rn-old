/* @flow */
import ActionTypes from '../actionTypes';
import routes from '../routes';

export default function(state:any = {}, action:any){
	switch(action.type){
        case ActionTypes.IS_LOADING: 
			return {
				...state,
				isLoading : action.isLoading
			}
        case ActionTypes.UPDATE_STATE:
            return Object.assign(
				{},
				state,
				action.obj
			);
        case ActionTypes.IS_REFRESHING:
            return {
                ...state,
                refreshing : action.isRefreshing
            }
        default:
            return state
	}
}