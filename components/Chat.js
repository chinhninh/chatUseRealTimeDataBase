import React, { Component } from 'react'
import { Text, View, TextInput,TouchableOpacity,AsyncStorage,FlatList,Image } from 'react-native'
import styles from './styles'
import User from './User'
import firebase from 'firebase'

import iconBack from '../icon/back.png';
import iconUser from '../icon/user.png'

export default class Chat extends Component {
    // static navigationOptions = ({navigation}) => {
    //     return{
    //         header: null
    //     // title: navigation.getParam('name', null)
    // }}

    constructor(props){
        super(props);
        this.state = {
            person: {
              name:  props.navigation.getParam('name'),
              phone:  props.navigation.getParam('phone')
            },
            textMessage: '',
            messageList: []
        }
    }

    UNSAFE_componentWillMount(){
        firebase.database().ref('messages').child(User.phone).child(this.state.person.phone) 
        .on('child_added', (value) => {
            this.setState((prevState) => {
                return {
                    messageList: [...prevState.messageList,value.val()]
                }
            })
        })
    }

    handleChange = key => val => {
        this.setState({[key]: val})
    }

    convertTime = (time) => {
        let d = new Date(time);
        let c = new Date();
        let result = (d.getHours() < 10? '0' : '') + d.getHours() + ':';
        result += (d.getMinutes() < 10 ? '0': '') + d.getMinutes();
        if (c.getDay() !== d.getDay()){
            result = d.getDay() + ' ' + d.getMonth() + ' ' + result
        }
        return result
    }

    sendMessage = async () => {
        if (this.state.textMessage.length > 0){
            let msgId = firebase.database().ref('messages').child(User.phone).child(this.state.person.phone).push().key
            let updates = {};
            let message = {
                message: this.state.textMessage,
                time: firebase.database.ServerValue.TIMESTAMP,
                from: User.phone
            }
            updates['messages/' + User.phone + '/' + this.state.person.phone+'/'+msgId] = message;
            updates['messages/' + this.state.person.phone + '/' + User.phone+'/'+msgId] = message;
            firebase.database().ref().update(updates);
            this.setState({textMessage: ''});
        }
    }

    renderRow = ({item}) => {
        return (
            <View style={{
                flexDirection: 'row',
                width: 300,
                alignSelf: item.from === User.phone ? 'flex-end': 'flex-start',
                backgroundColor: item.from === User.phone ? 'green': 'yellow',
                borderRadius: 5,
                marginBottom:10
            }}> 
                <Text style = {{color: 'red', padding:10, fontSize:16}}>
                    {item.message}
                </Text>
                <Text style ={{color: 'white', padding: 3,fontSize:13}}>{this.convertTime(item.time)}</Text>
            </View>
        )
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
                    <Text style={styles.txtHeader}>{User.name}</Text>
                    <Text/>
                    {/* <TouchableOpacity onPress={() => { this.props.navigation.navigate('Profile') }}>
                        <Image
                            sytle={styles.styleImage}
                            source={iconUser}
                        />
                    </TouchableOpacity> */}
                </View>
        )
        return (
            <View>
                {header}
                <FlatList
                    style ={{height:500, marginTop:10}}
                    data = {this.state.messageList}
                    renderItem = {this.renderRow}
                    keyExtractor = {(item,index) => index.toString()}
                />
                <View style = {{flexDirection: 'row',alignItems: 'center'}}> 
               <TextInput
                style={styles.txtInput}
                value = {this.state.textMessage}
                onChangeText = {this.handleChange('textMessage')}
               />
               <TouchableOpacity 
               onPress = {this.sendMessage.bind(this)}>
                   <Text style ={styles.textButton}>send</Text>
               </TouchableOpacity>
               </View>
            </View>
        )
    }
}
