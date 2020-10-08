import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

// firebase init - add your own config here
const firebaseConfig = {
    apiKey: "AIzaSyDhQb0FSBHg81D3boYh1u2NH_B2N_6A2hI",
    authDomain: "jackrabbit-rent-a-car.firebaseapp.com",
    databaseURL: "https://jackrabbit-rent-a-car.firebaseio.com",
    projectId: "jackrabbit-rent-a-car",
    storageBucket: "jackrabbit-rent-a-car.appspot.com",
    messagingSenderId: "432301019328",
    appId: "1:432301019328:web:8bef936d232b338d945d25",
    measurementId: "G-NFXGNWZSQR"
}
firebase.initializeApp(firebaseConfig)

// utils
const db = firebase.firestore()
const auth = firebase.auth()

// collection references
const usersCollection = db.collection('users')
//const postsCollection = db.collection('posts')
//const commentsCollection = db.collection('comments')
//const likesCollection = db.collection('likes')

// export utils/refs
export {
  db,
  auth,
  usersCollection,
  //postsCollection,
  //commentsCollection,
  //likesCollection
}