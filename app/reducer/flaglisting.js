/* @flow */
import ActionTypes from '../actionTypes';
import routes from '../routes';

export default function (state: any = {}, action: any) {
  switch (action.type) {
    case ActionTypes.TOGGLE_LISTING_VISIBILITY:
      return {
        ...state,
        listings: state.listings.map((listing) => {
          if (listing.listingId == state.listing.listingId) {
            listing.hideListing = action.hideListing
          }
          return listing;
        }),
        listing: {
          ...state.listing,
          hideListing: action.hideListing
        }
      }
    case ActionTypes.TOGGLE_USERS_LISTINGS_VISIBILITY:
      console.log('TOGGLE_USERS_LISTINGS_VISIBILITY');
      return {
        ...state,
        listings: action.listings,
        listing: {
          ...state.listing,
          hideUsersListings: action.hideUsersListings
        }
      }
    default:
      return state
  }
}