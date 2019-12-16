import React, { Component } from 'react'
import { Text, View, TextInput,TouchableOpacity,AsyncStorage,FlatList,Image, StyleSheet } from 'react-native'
import styles from './styles'
import User from './User'
import firebase from 'firebase'

import iconBack from '../icon/back.png';
import iconUser from '../icon/user.png'

export default class Chat extends Component {
    constructor(props){
        super(props);
        this.state = {
            person: {
              name:  props.navigation.getParam('name'),
              userUid:  props.navigation.getParam('userUid')
            },
            textMessage: '',
            messageList: []
        }
    }

    UNSAFE_componentWillMount(){
        firebase.database().ref('messages').child(User.userUid).child(this.state.person.userUid) 
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
            let msgId = firebase.database().ref('messages').child(User.userUid).child(this.state.person.userUid).push().key
            let updates = {};
            let message = {
                message: this.state.textMessage,
                time: firebase.database.ServerValue.TIMESTAMP,
                from: User.userUid
            }
            updates['messages/' + User.userUid + '/' + this.state.person.userUid+'/'+msgId] = message;
            updates['messages/' + this.state.person.userUid + '/' + User.userUid+'/'+msgId] = message;
            firebase.database().ref().update(updates);
            this.setState({textMessage: ''});
        }
    }

    renderRow = ({item}) => {
        return (
            <View style={{
                flexDirection: 'row',
                width: 300,
                alignSelf: item.from === User.userUid ? 'flex-end': 'flex-start',
                backgroundColor: item.from === User.userUid ? '#4fc3f7': '#e0e0e0',
                borderRadius: 5,
                marginBottom:10
            }}> 
                <Text style = {{color: 'black', padding:10, fontSize:16}}>
                    {item.message}
                </Text>
                <Text style ={{color: 'black', padding: 3,fontSize:13}}>{this.convertTime(item.time)}</Text>
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
                    <Text style={styles.txtHeader}>{this.state.person.name}</Text>
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
            <View style={{flex:1}}>
                {header}
                <FlatList
                    style ={{flex:5, marginTop:10}}
                    data = {this.state.messageList}
                    renderItem = {this.renderRow}
                    keyExtractor = {(item,index) => index.toString()}
                />
                <View style = {{flexDirection: 'row',alignItems: 'center'}}> 
               <TextInput
                style={{
                    flex:1,
                    width:300,
                    borderColor:'black',
                    borderWidth:1,
                    borderRadius:5,
                    margin:10,
                    paddingLeft:15
                }}
                value = {this.state.textMessage}
                onChangeText = {this.handleChange('textMessage')}
                multiline = {true}
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


