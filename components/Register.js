import React, { Component } from 'react'
import { Text, View , TouchableOpacity,StyleSheet,AsyncStorage,TextInput,Alert} from 'react-native'
// import AsyncStorage from '@react-native-community/async-storage';
import User from './User'
import styles from './styles'
import firebase from 'firebase'
// import {firebaseApp} from './ConfigFireBase'

export default class Register extends Component {
    constructor(props){
        super(props);
        this.state = {
            phone: '',
            name: '',
            email:'',
            password:''
        }
    }

    // static navigationOptions  ={
    //     header: null
    // }

    onChangeTxt = key=>val =>{
        this.setState({[key]:val})
    }

    submitForm = async () => {
        if (this.state.phone.length < 10){
            Alert.alert('error', 'wrong phone number')
        }else if(this.state.name.length <2){
            Alert.alert('error', 'wrong name')
        }else{
            await AsyncStorage.setItem('userPhone', this.state.phone)
            User.phone = this.state.phone;
            firebase.database().ref('users/' + User.phone).set({name: this.state.name});
            firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
                .then(()=>{
                    Alert.alert(
                        'Alert Title',
                        'Register success',
                        [
                          {text: 'OK', },
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
            .catch(function(error) {
                Alert.alert('Register fail')
              });
            // this.props.navigation.navigate('Login');
        }
    }

    render() {
        const {phone,name,email,password} = this.state
        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.txtInput}
                    placeholder = 'your phone'
                    value = {phone}
                    onChangeText = {this.onChangeTxt('phone')}
                />
                <TextInput
                    style={styles.txtInput}
                    placeholder = 'your name'
                    value = {name}
                    onChangeText = {this.onChangeTxt('name')}
                />
                <TextInput
                    style={styles.txtInput}
                    placeholder = 'your email'
                    value = {email}
                    onChangeText = {this.onChangeTxt('email')}
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
            </View>
        )
    }
}


