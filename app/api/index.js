/* @flow */
import {
    Platform
} from 'react-native';

var webServiceBase = 'http://192.168.1.16:8080/app/api/';
webServiceBase = 'https://appvendor-appvendor.rhcloud.com/app/api/';
var appVersion = '201701051928';
var appPlatform = Platform.OS === 'ios' ? 'ios' : 'android';

var getHeaders = (sessionId:string) => {
    let headers = {
        'Accept' : 'application/json',
        'Content-type' : 'application/json',
        'app-version' : appVersion,
        'app-platform' : appPlatform
    };

	if(sessionId !== null){
		headers.sessionId = sessionId;
	}

	return headers;
};

exports.webServiceBase = webServiceBase;
exports.appVersion = appVersion;
exports.appPlatform = appPlatform;

exports.saveProfileAPI = (userProfileModel, sessionId:string) => {
    console.log('saveProfileAPI');

    return fetch(webServiceBase + 'account/saveProfile/', {
        method: 'POST',
		headers: getHeaders(sessionId != '0' ? sessionId : null),
        body: JSON.stringify({
            displayName                 : userProfileModel.displayName,
            notifyOfDailyLatestListings : userProfileModel.notifyOfDailyLatestListings,
            notifyOfNewsletterWeekly    : userProfileModel.notifyOfNewsletterWeekly,
            notifyOfNewsletterMonthly   : userProfileModel.notifyOfNewsletterMonthly,
        })
    })
    .then((response) => {
        console.log(response);
        return response.json();
    })
    .then((responseJson) => {
        console.log('responseJson', responseJson);
        return responseJson.userProfile;
    });
}

exports.meAPI = (sessionId:string) => {
    return fetch(webServiceBase + 'account/me/', {
        method: 'POST',
        headers: getHeaders(sessionId != '0' ? sessionId : null)
    })
    .then((response) => {
        //console.log(response);
        return response.json();
    })
    .then((responseJson) => {
        console.log('responseJson', responseJson);
        
        return responseJson;
    });
}

exports.putListingAPI = (listing, sessionId:string) => {
	console.log('putListingAPI');

    let headers = {
        'Accept' : 'application/json',
        'Content-type' : 'application/json',
        'app-version' : appVersion,
        'app-platform' : appPlatform,
        'sessionid': sessionId
    };

    return fetch(webServiceBase + 'listing/put/', {
        method: 'POST',
        headers: getHeaders(sessionId),
        body: JSON.stringify(listing)
    })
    .then((response) => {
        console.log(response);
        return response.json();
    })
    .then((responseJson) => {
        console.log('responseJson', responseJson);
        return responseJson.listingId;
    });
}

exports.putListingAsBlobAPI = (listing, sessionId:string) => {

    let body = new FormData();
    body.append('images', {
        uri: listing.imageUrl1,
        type: 'multipart/formdata',
        name: 'image1.jpeg'
    });
    body.append('images', {
        uri: listing.imageUrl2,
        type: 'multipart/formdata',
        name: 'image2.jpeg'
    });

    return fetch(webServiceBase + 'listing/put2/', {
        method: 'POST',
		headers: getHeaders(sessionId),
        body
    })
    .then((response) => {
        console.log(response);
        return response.json();
    })
    .then((responseJson) => {
        console.log('responseJson', responseJson);
        return responseJson;
    });

}

exports.getListingsAPI = (sessionId:string) => {
    return fetch(webServiceBase + 'listing/get/', {
        method: 'GET',
        headers: getHeaders(sessionId != '0' ? sessionId : null)
    })
    .then((response) => {
        //console.log(response);
        return response.json();
    })
    .then((responseJson) => {
        console.log('responseJson', responseJson);
        //console.log('responseJson.listings', responseJson.listings);

		if(responseJson.updateRequired){		
			return {
				updateRequired:true,
				updateUrl: responseJson.updateUrl
			};
		} else if(responseJson.invalidSession){		
			return {
				invalidSession:true
			};
		} else {
			return responseJson.listings;
		}
    });
}

exports.getCategoriesAPI = (sessionId:string) => {
    return fetch(webServiceBase + 'categories/get/', {
        method: 'GET',
        headers: getHeaders(sessionId != '0' ? sessionId : null)
    })
    .then((response) => {
        //console.log(response);
        return response.json();
    })
    .then((responseJson) => {
        //console.log('responseJson', responseJson);

        let categoryIdsToIgnore = responseJson.categoriesToIgnore.map((category) => {
            return category.categoryId;
        });
        
        return {categories: responseJson.categories, categoryIdsToIgnore};
    });
}

exports.setCategoryIdsToIgnoreAPI = (sessionId:string, categoryIdsToIgnore:Array<number>) => {
    return fetch(webServiceBase + 'categories/setCategoryIdsToIgnore/', {
        method: 'POST',
        headers: getHeaders(sessionId != '0' ? sessionId : null),
        body: JSON.stringify({
            categoryIdsToIgnore
        })
    })
    .then((response) => {
        //console.log(response);
        return response.json();
    })
    .then((responseJson) => {
        //console.log('responseJson', responseJson);
        
        return true;
    });
}

exports.deleteListingAPI = (sessionId:string, listingId:number) => {
    return fetch(webServiceBase + 'listing/delete/', {
        method: 'POST',
        headers: getHeaders(sessionId),
        body: JSON.stringify({
            listingId
        })
    })
    .then((response) => {
        //console.log(response);
        return response.json();
    })
    .then((responseJson) => {
        //console.log('responseJson', responseJson);
        return true;
    });
}

exports.logoutAPI = (sessionId:string) => {
	console.log('logoutAPI()');
	console.log('sessionId', sessionId);

	return fetch(webServiceBase + 'account/logout', {
		method : 'POST',
		headers : {
			'Accept' : 'application/json',
			'Content-type' : 'application/json',
			'app-version' : appVersion,
			'app-platform' : appPlatform,
			'sessionid' : sessionId
		},
		body : JSON.stringify({
			sessionId : sessionId
		})
	})
	.then((response) => {
		console.log('1', response);
		return response.json();
	})
	.then((responseJson) => {
		console.log('2', responseJson);

		if(responseJson.invalidSession){
			return true;
		}

		return responseJson;
	});
}