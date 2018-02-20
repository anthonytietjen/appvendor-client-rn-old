/* @flow */
import React, {Component} from 'react';
import {Provider, connect} from 'react-redux';
import {AsyncStorage} from 'react-native';
import {store, configureStore} from './store';
import {AppRegistry, View} from 'react-native';
import Navigation from './components/navigation';
import {persistStore} from 'redux-persist';

class AppVendor extends Component {
	constructor(){
		super();
		this.state = {rehydrated:false}
	}

	// home.js was loading too soon before auto-reyhdration.
	// Refer to https://github.com/rt2zz/redux-persist/blob/master/docs/recipes.md#delay-render-until-rehydration-complete
	componentWillMount(){
		//persistStore(store, {storage: AsyncStorage}, () =>{
			this.setState({rehydrated:true});
		//});
	}

    render(){
		if(!this.state.rehydrated){
			return(
				<View style={{backgroundColor:'#ffc900'}}></View>
			)
		} else {
			return (
				<Provider store={store}>
					<Navigation/>
				</Provider>
			)
		}
    }
}

AppRegistry.registerComponent('appvendor', () => AppVendor);
//Exponent.registerRootComponent(RexburgOnlineGarageSale);