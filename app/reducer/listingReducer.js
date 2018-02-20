/* @flow */
import ActionTypes from '../actionTypes';
import routes from '../routes';
import {webServiceBase} from '../api';

export default function(state:any = {}, action:any){
	let dateTime = new Date().getTime().toString();

	switch(action.type){
        case ActionTypes.SET_LISTINGS: {
			action.listings = action.listings || [];
			if(action.listings.updateRequired){
				return {
					...state,
					listings: [],
					refreshing: false,
					updateRequired: true,
					updateUrl: action.listings.updateUrl,
				}
			} else {
				let imageCacheParam = (action.useCachedImages) ? state.imageCacheParam : dateTime;
				return {
					...state,
					listings : action.listings.map((listing)=>{
						listing.imageUrl1 = `${webServiceBase}listing/iconAsFile/${listing.listingId}?v_=${imageCacheParam}`,
						listing.imageUrl2 = `${webServiceBase}listing/screenShotAsFile/${listing.listingId}?v_=${imageCacheParam}`
						return listing;
					}),
					refreshing: false,
					imageCacheParam
				}
			}
		}
        case ActionTypes.CLICK_LISTING:
            return {
                ...state,
                listing : action.listing
            };
        case ActionTypes.EDIT_LISTING:
            dateTime = new Date().getTime();
			
			return {
                ...state,
                listingEdit : {
                    ...JSON.parse(JSON.stringify(state.listing)),
					imageUrl1: `${webServiceBase}listing/iconAsFile/${state.listing.listingId}?v_=${state.imageCacheParam}`,
					imageUrl2:`${webServiceBase}listing/screenShotAsFile/${state.listing.listingId}?v_=${state.imageCacheParam}`
                },
				isLoading:false
            };
        case ActionTypes.NEW_LISTING:
            if(!state.userIsLoggedIn){
                return {
                    ...state
                }
            } else {
                return {
                    ...state,
                    listingEdit : {
                        listingId : 0,
                        name : '',
                        price : 0,
                        categoryId: 1,
						imageUrl1: '',
						imageUrl2: ''
                    }
                };
            }
        case ActionTypes.UPDATE_LISTING_FIELD:
            let listingEdit = {
                ...state.listingEdit
            }
            listingEdit[action.name] = action.value;

            return {
                ...state,
                listingEdit
            }
		case ActionTypes.PUBLISH_LISTING:
			let listings = state.listings.map((listing) => {return listing});
			let imageCacheParam = dateTime;

			if(action.listing.wasNew){
				listings.splice(0, 0, {
					...action.listing,
					imageUrl1: `${webServiceBase}listing/iconAsFile/${action.listing.listingId}?v_=${imageCacheParam}`,
					imageUrl2: `${webServiceBase}listing/screenShotAsFile/${action.listing.listingId}?v_=${imageCacheParam}`
				});
			} else {
				listings = listings.map((listing)=>{
					if(listing.listingId == state.listing.listingId){
						listing.listingId = action.listing.listingId,
						listing.name = action.listing.name,
						listing.price = action.listing.price,
						listing.contactInformation = action.listing.contactInformation,
						listing.description = action.listing.description,
						listing.imageUrl1 = `${webServiceBase}listing/iconAsFile/${action.listing.listingId}?v_=${imageCacheParam}`,
						listing.imageUrl2 = `${webServiceBase}listing/screenShotAsFile/${action.listing.listingId}?v_=${imageCacheParam}`
					}
					return listing;
				});
			}

			let listing = listings.filter((listing) => {
				return listing.listingId == action.listing.listingId
			})[0];

            return {
                ...state,
                listings,
				listing : {
					...listing // Not sure why I had to clone this, but it was the only way to get it to work
				},
				imageCacheParam
            }
		case ActionTypes.DELETED_LISTING:
            return {
                ...state,
				listings: state.listings.filter((listing) => {return listing.listingId != action.listingId} )
            }
		case ActionTypes.REFRESH_LISTING_IMAGES:
			return {
                ...state,
				listings: action.listings.map((listing)=>{
					listing.imageUrl1 = `${webServiceBase}listing/iconAsFile/${listing.listingId}?v_=${action.version}`,
					listing.imageUrl2 = `${webServiceBase}listing/screenShotAsFile/${listing.listingId}?v_=${action.version}`
					return listing;
				})
			}
		default:
			return state
	}
}