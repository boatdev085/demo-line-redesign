import * as firebase from "firebase/app";
import "firebase/firestore";
import "firebase/functions";
var config = {
  apiKey: "API KEY",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
};
let firebaseApp = firebase.initializeApp(config);

export default firebaseApp;
