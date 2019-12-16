// import React from 'react';
// import {
//   ActivityIndicator,
//   StatusBar,
//   StyleSheet,
//   View,
//   AsyncStorage
// } from 'react-native';
// import User from './User'
// // import AsyncStorage from '@react-native-community/async-storage';
// import firebase from 'firebase'

// export default  class AuthLoading extends React.Component {
//   componentDidMount() {
//     this._bootstrapAsync();
//   }

//   UNSAFE_componentWillMount(){
//     var firebaseConfig = {
//         apiKey: "AIzaSyBfzmG6WMpT8hxAjBIQHhMFham7wNmwxZY",
//         authDomain: "chatfirebase-e698a.firebaseapp.com",
//         databaseURL: "https://chatfirebase-e698a.firebaseio.com",
//         projectId: "chatfirebase-e698a",
//         storageBucket: "chatfirebase-e698a.appspot.com",
//         messagingSenderId: "39874923121",
//         appId: "1:39874923121:web:a9b83ad86100450a4929d0",
//         measurementId: "G-FPJ6XYCX8C"
//       };
//     // Initialize Firebase
//     firebase.initializeApp(firebaseConfig);
//   }

// //   Fetch the token from storage then navigate to our appropriate place
//   _bootstrapAsync = async () => {
//     User.userEmail = await AsyncStorage.getItem('userEmail');

//     // This will switch to the App screen or Auth screen and this loading
//     // screen will be unmounted and thrown away.
//     this.props.navigation.navigate(User.userEmail ? 'App' : 'Auth');
//   };

//   // Render any loading content that you like here
//   render() {
//     return (
//       <View>
//         <ActivityIndicator />
//         <StatusBar barStyle="default" />
//       </View>
//     );
//   }
// }