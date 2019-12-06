import firebase from 'firebase'

var firebaseConfig = {
    apiKey: "AIzaSyBfzmG6WMpT8hxAjBIQHhMFham7wNmwxZY",
    authDomain: "chatfirebase-e698a.firebaseapp.com",
    databaseURL: "https://chatfirebase-e698a.firebaseio.com",
    projectId: "chatfirebase-e698a",
    storageBucket: "chatfirebase-e698a.appspot.com",
    messagingSenderId: "39874923121",
    appId: "1:39874923121:web:a9b83ad86100450a4929d0",
    measurementId: "G-FPJ6XYCX8C"
  };
  // Initialize Firebase
 export const firebaseApp =  firebase.initializeApp(firebaseConfig);