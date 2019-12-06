import React, { Component } from 'react'
import { Text, View, TextInput, TouchableOpacity, AsyncStorage, Alert, Image } from 'react-native'
import User from './User'
import styles from './styles'
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
            name: User.name
        }
    }

    changeName = async () => {
        if (this.state.name.length < 2) {
            Alert.alert('Error', 'please enter valid name')
        } else if (User.name !== this.state.name) {
            firebase.database().ref('users').child(User.phone).set({ name: this.state.name });
            User.name = this.state.name;
            Alert.alert('success', 'name changed successfull')
        }
    }

    goBack(){
        this.props.navigation.goBack()
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

                    <Text style={{ fontSize: 20 }}> {User.phone} </Text>
                    <TextInput
                        style={styles.txtInput}
                        value={this.state.name}
                        onChangeText={this.handleChange('name')}
                    />
                    <TouchableOpacity style={styles.styleButton} onPress={this.changeName}>
                        <Text style={styles.textButton}>Change Name</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.styleButton}
                        onPress={() => { this.props.navigation.navigate('Login') }}
                    >
                        <Text style={styles.textButton}>Logout</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

