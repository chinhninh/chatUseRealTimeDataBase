import React, { Component } from 'react'
import { Image, Text, View, TouchableOpacity, AsyncStorage, FlatList, ActivityIndicator } from 'react-native'
// import AsyncStorage from '@react-native-community/async-storage';
import User from './User';
import styles from './styles'
import firebase from 'firebase'
import iconUser from '../icon/user.png'
import iconBack from '../icon/back.png'
import {firebaseApp} from './ConfigFireBase'

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: []
        }
    }

    UNSAFE_componentWillMount() {
        let dbRef = firebaseApp.database().ref('users');
        dbRef.on('child_added', (val) => {
            let person = val.val();
            person.userUid = val.key;
            if (person.userUid === User.userUid) {
                User.name = person.name
            } else {
                this.setState((pervState) => {
                    return {
                        users: [...pervState.users, person]
                    }
                })
            }
        })
    }

    logOut = async () => {
        await AsyncStorage.clear();
        this.props.navigation.navigate('Login')
    }

    renderRow = ({ item }) => {
        return (
            <TouchableOpacity
                onPress={() => { this.props.navigation.navigate('Chat', item) }}
                style={{ margin: 10, borderBottomColor: 'black', borderBottomWidth: 1 }}>
                <Text style={{ fontSize: 20 }}> {item.name}</Text>
            </TouchableOpacity>
        )
    }

    render() {
        const header = (
            <View style={styles.styleHeader}>
                <TouchableOpacity onPress={this.logOut.bind(this)}>
                    <Image
                        sytle={styles.styleImage}
                        source={iconBack}
                    />
                </TouchableOpacity>
                <Text style={styles.txtHeader}>User chat</Text>
                <TouchableOpacity onPress={() => { this.props.navigation.navigate('Profile') }}>
                    <Image
                        sytle={styles.styleImage}
                        source={iconUser}
                    />
                </TouchableOpacity>
            </View>
        )

        if(this.state.users === null) {
             
                <View>
                    {header}
                    <ActivityIndicator/>
                </View>
            
        } else{
            return (
                <View >
                    {header}
                    <FlatList
                        style={{ height: 550, marginTop: 10 }}
                        data={this.state.users}
                        renderItem={this.renderRow}
                        keyExtractor={(item) => item.userUid}
                    />
                </View>
            )
        }
        
    }
}
