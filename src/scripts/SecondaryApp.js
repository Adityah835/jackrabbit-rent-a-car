import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

var config = {
    apiKey: "AIzaSyDhQb0FSBHg81D3boYh1u2NH_B2N_6A2hI",
    authDomain: "jackrabbit-rent-a-car.firebaseapp.com",
    databaseURL: "https://jackrabbit-rent-a-car.firebaseio.com"
  }

var App = firebase.initializeApp(config, "Secondary")

export{
    App
}