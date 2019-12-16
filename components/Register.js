import React, { Component } from 'react'
import { Text, View , TouchableOpacity,StyleSheet,AsyncStorage,TextInput,Alert} from 'react-native'
// import AsyncStorage from '@react-native-community/async-storage';
import User from './User'
import styles from './styles'
import firebase from 'firebase'
import {firebaseApp} from './ConfigFireBase'

export default class Register extends Component {
    constructor(props){
        super(props);
        this.state = {
            phone: '',
            name: '',
            userEmail:'',
            password:'',
            doMain: '@gmail.com',
            email: ''
        }
    }

    // static navigationOptions  ={
    //     header: null
    // }

    onChangeTxt = key=>val =>{
        this.setState({[key]:val})
    }

    submitForm () {
        // if (this.state.phone.length < 10){
        //     Alert.alert('error', 'wrong phone number')
        // }else if(this.state.name.length <2){
        //     Alert.alert('error', 'wrong name')
        // }else{       
            this.props.navigation.navigate('Loading')
            firebaseApp.auth().createUserWithEmailAndPassword(this.state.email = this.state.userEmail+ this.state.doMain, this.state.password)
            .then(()=>{
                const userUid = firebaseApp.auth().currentUser.uid
                // User.userUid = userUid
                // console.log(userUid)    
                firebaseApp.database().ref('users/' + userUid).set({name:this.state.name})
                    Alert.alert(
                    'Alert Title',
                    'Register success',
                    [
                      {text: 'OK', onPress:()=>{this.props.navigation.navigate('Login')}},
                    ],
                    {cancelable: false},
                  );
                  this.setState({
                      email:'',
                      password:'',
                      name:'',
                      phone:''
                  })
            })
            .catch(() => {
                Alert.alert(
                    'Alert Title',
                    'error', 'false email or password',
                    [
                      {text: 'OK', onPress:()=>{this.props.navigation.navigate('Register')}},
                    ],
                    {cancelable: false},
                  );
              });
              
            // await AsyncStorage.setItem('userEmail', this.state.userEmail)
            // User.userEmail = this.state.userEmail;
            // User.email = this.state.email;
    }

    render() {
        const {phone,name,email,password,doMain,userEmail} = this.state
        return (
            <View style={styles.container}>
                 {/* <TextInput
                    style={styles.txtInput}
                    placeholder = 'your phone'
                    value = {phone}
                    onChangeText = {this.onChangeTxt('phone')}
                /> */}
                <TextInput
                    style={styles.txtInput}
                    placeholder = 'your name'
                    value = {name}
                    onChangeText = {this.onChangeTxt('name')}
                /> 
                <TextInput
                    style={styles.txtInput}
                    placeholder = 'your userEmail'
                    value = {userEmail}
                    onChangeText = {this.onChangeTxt('userEmail')}
                />
                <TextInput
                    style={styles.txtInput}
                    // placeholder = 'your userEmail'
                    value = {doMain}
                    // onChangeText = {this.onChangeTxt('email')}
                />
                <TextInput
                    style={styles.txtInput}
                    placeholder = 'your password'
                    value = {password}
                    onChangeText = {this.onChangeTxt('password')}
                    secureTextEntry
                />
                <TouchableOpacity onPress={this.submitForm.bind(this)}>
                    <Text style={styles.textButton}> Register </Text>
                </TouchableOpacity>    
                <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Login')}}>
                    <Text style={styles.textButton}> Login </Text>
                </TouchableOpacity>            
            </View>
        )
    }
}


