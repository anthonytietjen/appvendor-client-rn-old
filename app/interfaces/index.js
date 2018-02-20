/* @flow */
export type IListing = {
    listingId?: number;
    name?: string;
    price?: number;
    description?: string;
    categoryId?: number;
    contactInformation?: string;
    iconData?: string;
    screenshotData?: string;
    showEditLink?: boolean;
    hideListing?: boolean;
    hideUsersListings?: boolean;
    userDisplayName?: string;
    showDetails?: boolean;
    categoryName?: string;
	imageUrl1:string,
	imageUrl2:string,
	wasNew?:boolean
}
