import React, { Component } from 'react'
import { Text, View , TouchableOpacity,StyleSheet,AsyncStorage,TextInput,Alert} from 'react-native'
// import AsyncStorage from '@react-native-community/async-storage';
import User from './User'
import styles from './styles'
import firebase from 'firebase'

export default class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }

    // static navigationOptions  ={
    //     header: null
    // }

    onChangeTxt = key=>val =>{
        this.setState({[key]:val})
    }

    submitForm (){
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
        .then(()=>{
            Alert.alert(
                'Alert Title',
                'Register success',
                [
                    {
                        text: 'Cancel',
                        // onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel',
                      },
                  {text: 'OK', onPress: () => {this.props.navigation.navigate('Home')}},
                ],
                {cancelable: false},
              );
        })
        .catch(function(error) {
            Alert.alert('Password or email is incorrect!')
          });
    }

    render() {
        const {phone,name} = this.state
        return (
            <View style={styles.container}>
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
                    <Text style={styles.textButton}> Login </Text>
                </TouchableOpacity>              
            </View>
        )
    }
}


