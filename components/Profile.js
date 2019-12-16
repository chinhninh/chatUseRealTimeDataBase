import React, { Component } from 'react'
import { Text, View, TextInput, TouchableOpacity, AsyncStorage, Alert, Image, StyleSheet } from 'react-native'
import User from './User'
// import styles from './styles'
import firebase from 'firebase'

import iconBack from '../icon/back.png'

export default class Profile extends Component {
    // static navigationOptions = {
    //     header: null
    // }

    handleChange = key => val => {
        this.setState({ [key]: val })
    }

    constructor(props) {
        super(props);
        this.state = {
            name: User.name,
            userUid: User.userUid
        }
    }

    changeName = async () => {
        if (this.state.name.length < 2) {
            Alert.alert('Error', 'please enter valid name')
        } else if (User.name !== this.state.name) {
            firebase.database().ref('users').child(User.userUid).set({ name: this.state.name });
            User.name = this.state.name;
            Alert.alert('success', 'name changed successful')
        }
    }

    // changePhone = async () => {
    //     if (this.state.phone.length <9 || this.state.phone.length >12) {
    //         Alert.alert('Error', 'please enter valid phone')
    //     } else if (User.phone !== this.state.phone) {
    //         firebase.database().ref('users').child(User.phone = this.state.phone)
    //         User.phone = this.state.phone;
    //         Alert.alert('success', 'phone number changed successful')
    //     }
    // }

    goBack() {
        this.props.navigation.goBack()
    }

    logOut = async () => {
        await AsyncStorage.clear();
        this.props.navigation.navigate('Login')
    }

    render() {
        const header = (
            <View style={styles.styleHeader}>
                <TouchableOpacity onPress={this.goBack.bind(this)}>
                    <Image
                        sytle={styles.styleImage}
                        source={iconBack}
                    />
                </TouchableOpacity>
            </View>
        )
        return (
            <View style={{ flex: 1 }}>
                {header}
                <View style={styles.container}>
                    <View style={{flexDirection:'row'}}>
                        <TextInput
                            style={styles.txtInput}
                            value={this.state.name}
                            onChangeText={this.handleChange('name')}
                        />
                        <TouchableOpacity style={styles.styleButton} onPress={this.changeName}>
                            <Text style={styles.textButton}>Change Name</Text>
                        </TouchableOpacity>
                    </View>
                    {/* <View style={{flexDirection:'row'}}>
                        <TextInput
                            style={styles.txtInput}
                            value={this.state.phone}
                            onChangeText={this.handleChange('phone')}
                        />
  
                    </View> */}
                    <TouchableOpacity
                        style={styles.styleButton}
                        onPress={this.logOut.bind(this)}
                    >
                        <Text style={styles.textButton}>Logout</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 15
    },
    txtInput: {
        height: 50,
        width: 200,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 5,
        paddingLeft: 10,
        marginBottom: 10,
        fontSize: 20
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
        height: 40,
        borderRadius: 10,
        borderColor: 'black',
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft:20,
        padding: 10,
        margin:5
        
    }
})

