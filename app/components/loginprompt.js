/* @flow */
import React, { Component } from 'react';
import {connect} from 'react-redux';

import {
    StatusBar,
    ScrollView,
    StyleSheet,
    Text,
    View,
    TouchableOpacity
} from 'react-native';

import {signinExisting, signinNew} from '../actions'

class LoginPrompt extends Component {
    constructor(props){
        super(props);
	}

    render() {

        return (
            <View style={styles.container}>
                <ScrollView>
                    <StatusBar backgroundColor="#ffc900" barStyle="light-content" />

                    <View style={styles.view}>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity onPress={()=>{this.props.dispatch(signinExisting())}}>
                                <View style={styles.textboxContainer}>
                                    <Text style={styles.button}>
                                        I have an account
                                    </Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={()=>{this.props.dispatch(signinNew())}}>
                                <View style={styles.textboxContainer}>
                                    <Text style={styles.button}>
                                        Create free account
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>

                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    view: {
        opacity: 1,
    },
    textboxContainer:{
        borderColor:'#EEEEEE',
        borderWidth:1,
        borderRadius:3,
        padding:5,
        marginBottom:10
    },
    textWithSwitch: {
        marginTop:5,
        marginBottom:5,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    fieldLabel:{
        color: '#CCCCCC'
    },
    textbox: {
        height:26,
    },
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
    buttonContainer: {
        padding: 0,
        borderRadius: 1,
        marginTop:5,
        marginBottom:5,
        marginLeft:10,
        marginRight:10
    },
    button:{
        padding:5,
        textAlign:'center',
        color:'white'
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
    imageWrapper: {
        height:350,
        marginBottom:15
    },
    rowImage: {
        flex:1
    }
});

var mapStateToProps = (state) => {
    return state;
}

module.exports = connect(mapStateToProps)(LoginPrompt);
