/* @flow */
import ActionTypes from '../actionTypes';
import routes from '../routes';

export default function(state:any = {}, action:any){
	switch(action.type){
        case ActionTypes.SHOW_CATEGORIES:
            return {
                ...state
            }
        case ActionTypes.SET_CATEGORIES:
            return{
                ...state,
                categories: action.categories,
                categoryIdsToIgnore: action.categoryIdsToIgnore
            }
        case ActionTypes.SET_CATEGORYID_TO_IGNORE:
            let categoryIdsToIgnore = [];
            
            if(action.isIgnored){
                categoryIdsToIgnore = state.categoryIdsToIgnore.map(categoryId => {return categoryId});
                categoryIdsToIgnore.push(action.categoryId);
            } else {
                categoryIdsToIgnore = state.categoryIdsToIgnore.filter(categoryId => { return categoryId != action.categoryId; });
            }

            return {
                ...state,
                categoryIdsToIgnore
            }
		default:
			return state
	}
}