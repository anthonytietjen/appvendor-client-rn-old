/* @flow */
import React, { Component } from 'react';
import {connect} from 'react-redux';

import {
	StatusBar,
	TouchableOpacity,
	Alert,
	StyleSheet,
	Switch,
	Text,
	View,
	ScrollView,
	Image
} from 'react-native';

import {getCategories, setCategoryIdToIgnore} from '../actions';

class Categories extends Component {
    props;

    constructor(props){
        super(props);
    }

    componentDidMount(){
        console.log('categories.componentDidMount');

        // Wait for the animation to finish, or the ajax call will slow it down
        setTimeout(()=>{
            this.props.dispatch(getCategories(this.props.sessionId));
        }, 400); 
    }

    render() {
		var renderCategories = () =>{
			return(
				this.props.categories.map((category, index) =>{
					return (
						<View key={category.categoryId} style={styles.textWithSwitch}>
							<Text>{category.name}</Text>
							<Switch
								value={this.props.categoryIdsToIgnore.indexOf(category.categoryId) == -1}
								onValueChange={(isChecked)=>{this.props.dispatch(setCategoryIdToIgnore(category.categoryId, !isChecked))}}
							/>
						</View>
					);
				})
			);
		};

        var renderBody = () => {
            if(this.props.isLoading){
                return(
                    <View style={styles.row} >
                        <Text>Loading...</Text>
                    </View>
                );
            } else {
                return(
                    <View style={styles.row} >
                        {renderCategories()}
                    </View>
                );
            }
        }

        return (
            <View style={styles.container}>
                <StatusBar backgroundColor="#ffc900" barStyle="light-content" />
                <ScrollView>
                    {renderBody()}
                 </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor:'#ffc900',
    padding:0,
    margin:0,
    marginTop:60
  },
  listView:{
    padding:0,
    margin:0
  },
  row: {
    padding: 15,
    backgroundColor:'white',
    borderRadius: 1,
    marginTop:5,
    marginBottom:5,
    marginLeft:10,
    marginRight:10
  },
  rowHeader: {
      color: '#333',
      fontWeight: 'bold'
  },
  rowCategory: {
      color: '#777',
      marginTop: 2,
      marginBottom: 10,
      fontSize:10
  },
  rowDescription: {
      color: '#555',
      marginTop: 3,
      marginBottom: 15
  },
	textWithSwitch: {
		marginTop:5,
		marginBottom:5,
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
  imageWrapper: {
    height:350,
    marginBottom:15
  },
  rowImage: {
    flex:1
  }
});

var mapStateToProps = (state) => {
    console.log('categories.mapStateToProps');
    return {
        categories : state.categories,
		categoryIdsToIgnore: state.categoryIdsToIgnore,
        isLoading: state.isLoading,
        sessionId: state.sessionId
    }
}

module.exports = connect(mapStateToProps)(Categories);
