import React, { Component } from 'react'
import { Text, View , TouchableOpacity,StyleSheet,AsyncStorage,TextInput,Alert,Image,TouchableWithoutFeedback,Keyboard} from 'react-native'
// import AsyncStorage from '@react-native-community/async-storage';
import User from './User'
// import styles from './styles'
import firebase from 'firebase'
import {firebaseApp} from './ConfigFireBase'
import logo from '../icon/logo.png'

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
        if (this.state.name == ''){
            Alert.alert('error', 'wrong name number')
        }else{       
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
                    'Password or email is incorrect!',
                    [
                        { text: 'OK', onPress: () => { this.props.navigation.navigate('Register') } },
                    ],
                    { cancelable: false },
                );
            });
              
            // await AsyncStorage.setItem('userEmail', this.state.userEmail)
            // User.userEmail = this.state.userEmail;
            // User.email = this.state.email;
    }
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
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.container}>
                <Image source={logo} style={{marginBottom:60}}/>
                <TextInput
                    style={styles.txtInput}
                    placeholder = 'your name'
                    value = {name}
                    onChangeText = {this.onChangeTxt('name')}
                    autoCorrect = {false}
                    onSubmitEditing ={()=> this.refs.txtuseremail.focus()}
                /> 
                <View style={{flexDirection:'row'}}>
                    <TextInput
                        style={{
                            height: 50,
                            width: 250,
                            borderRadius: 10,
                            paddingLeft: 10,
                            marginBottom: 10,
                            fontSize: 20,
                            backgroundColor: '#f1f8e9'
                        }}
                        placeholder = 'your user email'
                        value = {userEmail}
                        onChangeText = {this.onChangeTxt('userEmail')}
                        autoCorrect = {false}
                        onSubmitEditing ={()=> this.refs.txtpassword.focus()}
                        ref={'txtuseremail'}
                    />
                    <TextInput
                        style={{
                            height: 50,
                            width: 100,
                            borderRadius: 10,
                            paddingLeft: 10,
                            marginBottom: 10,
                            fontSize: 15,
                            marginLeft:2,
                            backgroundColor: '#f1f8e9'
                        }}
                        value = {doMain}
                    />
                </View>
                <TextInput
                    style={styles.txtInput}
                    placeholder = 'your password'
                    value = {password}
                    onChangeText = {this.onChangeTxt('password')}
                    secureTextEntry
                    autoCorrect = {false}
                    ref ={'txtpassword'}
                />
                <TouchableOpacity 
                    style={styles.styleButton}
                    onPress={this.submitForm.bind(this)}
                >
                    <Text style={styles.textButton}> Register </Text>
                </TouchableOpacity>    
                <TouchableOpacity 
                    style = {styles.styleButton}
                    onPress={()=>{this.props.navigation.navigate('Login')}}
                >
                    <Text style={styles.textButton}> Login </Text>
                </TouchableOpacity>
                </View>     
                </TouchableWithoutFeedback>       
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#448aff'
    },
    txtInput: {
        height: 50,
        width: 350,
        borderRadius: 10,
        paddingLeft: 10,
        marginBottom: 10,
        fontSize: 20,
        backgroundColor: '#f1f8e9'
    },
    styleHeader: {
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderBottomColor: 'black',
        borderBottomWidth: 1
    },
    styleButton: {
        height: 50,
        width:250,
        borderRadius: 10,
        // borderColor: 'black',
        // borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'#ffd54f',
        margin:5       
    },
    textButton:{
        fontSize:20
    }
})
