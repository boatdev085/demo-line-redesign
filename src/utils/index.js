import * as firebase from "firebase/app";
import "firebase/firestore";
import "firebase/functions";
var config = {
  apiKey: "AIzaSyCXs0Kwy7E6gihKL8K1kKd15w3j834_21U",
  authDomain: "fir-line-a28d2.firebaseapp.com",
  databaseURL: "https://fir-line-a28d2.firebaseio.com",
  projectId: "fir-line-a28d2",
  storageBucket: "fir-line-a28d2.appspot.com",
  messagingSenderId: "863763552618",
  appId: "1:863763552618:web:dff6443551a4a987"
};
let firebaseApp = firebase.initializeApp(config);

export default firebaseApp;
