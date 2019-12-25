import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet, AsyncStorage, TextInput, Alert, Keyboard, Image,TouchableWithoutFeedback  } from 'react-native'
// import AsyncStorage from '@react-native-community/async-storage';
import User from './User'
// import styles from './styles'
import { firebaseApp } from './ConfigFireBase'
import logo from '../icon/logo.png'
import saveAccount from './saveAccount'

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: saveAccount.passwordEmail,
            doMain: '@gmail.com',
            userEmail: saveAccount.email
        }
    }

    onChangeTxt = key => val => {
        this.setState({ [key]: val })
    }

    submitForm = async () => {
        // console.log('sayyeah')
        this.props.navigation.navigate('Loading')
        
        firebaseApp.auth().signInWithEmailAndPassword(this.state.email = this.state.userEmail + this.state.doMain, this.state.password)
            .then( async () => {
                const userUid = firebaseApp.auth().currentUser.uid;
                // console.log(userUid)
                User.userUid = userUid;
                // <Loading/>
                await AsyncStorage.setItem('userEmail', this.state.userEmail)
                await AsyncStorage.setItem('password',this.state.password)
                Alert.alert(
                    'Alert Title',
                    'Do you want to save the password?',
                    [
                        { text: 'OK', onPress: this.saveData.bind(this)  },
                        { text: 'cancel', onPress: () => { this.props.navigation.navigate('Home') } },
                    ],
                    { cancelable: false },
                ); 
                this.setState({
                    userEmail: '',
                    password: ''
                })             
            })
            .catch((error) => {
                Alert.alert(
                    'Alert Title',
                    'Password or email is incorrect!',
                    [
                        { text: 'OK', onPress: () => { this.props.navigation.navigate('Login') } },
                    ],
                    { cancelable: false },
                );
            });

    }

    saveData = async () =>{
        this.props.navigation.navigate('Home')
        const a = await AsyncStorage.getItem('userEmail');
        const b = await AsyncStorage.getItem('password')
        saveAccount.email = a;
        saveAccount.passwordEmail = b
    }

    render() {
        
        const { email, password, doMain, userEmail } = this.state
        return (
            <View style={styles.container}>
                <TouchableWithoutFeedback style={styles.container} onPress = {Keyboard.dismiss}>
                    <View style={styles.container}>
                <Image source={logo} style={{ marginBottom: 60 }} />
                <View style={{ flexDirection: 'row' }}>
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
                        placeholder='your user email'
                        value={userEmail === ''? '': userEmail}
                        onChangeText={this.onChangeTxt('userEmail')}
                        autoCorrect = {false}
                        onSubmitEditing ={()=> this.refs.txtpassword.focus()}
                    />
                    <TextInput
                        style={{
                            height: 50,
                            width: 100,
                            borderRadius: 10,
                            paddingLeft: 10,
                            marginBottom: 10,
                            fontSize: 15,
                            marginLeft: 2,
                            backgroundColor: '#f1f8e9'
                        }}
                        value={doMain}
                    />
                </View>
                <TextInput
                    style={styles.txtInput}
                    placeholder='your password'
                    value={password === ''? '': password}
                    onChangeText={this.onChangeTxt('password')}
                    secureTextEntry
                    autoCorrect = {false}
                    ref = {'txtpassword'}
                />
                <TouchableOpacity
                    style={styles.styleButton}
                    onPress={this.submitForm.bind(this)}
                >
                    <Text style={styles.textButton}> Login </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.styleButton}
                    onPress={() => { this.props.navigation.navigate('Register') }}
                >
                    <Text style={styles.textButton}> Register </Text>
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
        width: 250,
        borderRadius: 10,
        // borderColor: 'black',
        // borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffd54f',
        margin: 5
    },
    textButton: {
        fontSize: 20
    }
})

