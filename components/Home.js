import React, { Component } from 'react'
import { Image, Text, View, TouchableOpacity, AsyncStorage, FlatList } from 'react-native'
// import AsyncStorage from '@react-native-community/async-storage';
import User from './User';
import styles from './styles'
import firebase from 'firebase'
import iconUser from '../icon/user.png'
import iconBack from '../icon/back.png'

export default class Home extends Component {
    // static navigationOptions = ({ navigation }) => {
    //     return {
    //         header: null
    //     }
    // }

    constructor(props) {
        super(props);
        this.state = {
            users: []
        }
    }

    UNSAFE_componentWillMount() {
        let dbRef = firebase.database().ref('users');
        dbRef.on('child_added', (val) => {
            let person = val.val();
            person.phone = val.key;
            if (person.phone === User.phone) {
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
        this.props.navigation.navigate('Auth')
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
                <TouchableOpacity onPress={() => { this.props.navigation.navigate('Login') }}>
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
        return (
            <View >
                {header}
                <FlatList
                    style={{ height: 550, marginTop: 10 }}
                    data={this.state.users}
                    renderItem={this.renderRow}
                    keyExtractor={(item) => item.phone}
                />
            </View>
        )
    }
}
