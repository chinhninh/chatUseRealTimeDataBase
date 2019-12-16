import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet, AsyncStorage, TextInput, Alert, ActivityIndicator } from 'react-native'
// import AsyncStorage from '@react-native-community/async-storage';
import User from './User'
import styles from './styles'
import firebase from 'firebase'
import { firebaseApp } from './ConfigFireBase'
import Loading from './Loading'

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }

    onChangeTxt = key => val => {
        this.setState({ [key]: val })
    }

    submitForm () {
        this.props.navigation.navigate('Loading')
        firebaseApp.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
        .then(()=>{        
        const userUid = firebaseApp.auth().currentUser.uid;
            // console.log(userUid)
        User.userUid = userUid;
        // <Loading/>
        this.props.navigation.navigate('Home')
        })
        .catch( (error)=>  {
            Alert.alert(
                'Alert Title',
                'Password or email is incorrect!',
                [
                    {text: 'OK', onPress:()=>{this.props.navigation.navigate('Login')}},
                ],
                {cancelable: false},
              );
        });
       
    }

    render() {
        const { email, password } = this.state
        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.txtInput}
                    placeholder='your email'
                    value={email}
                    onChangeText={this.onChangeTxt('email')}
                    keyboardType = 'email-address'
                />
                <TextInput
                    style={styles.txtInput}
                    placeholder='your password'
                    value={password}
                    onChangeText={this.onChangeTxt('password')}
                    secureTextEntry
                />
                <TouchableOpacity onPress={this.submitForm.bind(this)}>
                    <Text style={styles.textButton}> Login </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { this.props.navigation.navigate('Register') }}>
                    <Text style={styles.textButton}> Register </Text>
                </TouchableOpacity>
            </View>
        )
    }
}


