import React, { Component } from 'react'
import { Text, View, ActivityIndicator } from 'react-native'

export default class Loading extends Component {
    render() {
        return (
            <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                <ActivityIndicator/>
            </View>
        )
    }
}
