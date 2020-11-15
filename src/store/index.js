import Vue from 'vue'
import Vuex from 'vuex'
import * as fb from '../firebase'
import router from '../router/index'

import * as secondary from '../scripts/SecondaryApp'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    userProfile: {},
    secondaryUserProfile: {},
    location: {},
    reservations: [],
    tempReserve: [],
    carInventory: []
  },
  mutations: {
    setUserProfile(state, val) {
        state.userProfile = val
    },
    setSecondaryUserProfile(state, val) {
      state.secondaryUserProfile = val
    },
    setPreferredLocation(state, val){
      state.location = val
    },
    setReservations(state, val){
      if(val == {}){
        state.reservations = val
      }
      else{

        state.reservations = []

        val.forEach(function(doc){

          state.reservations.push(doc.data())

        })
      }
    },
    setTempReserve(state, val){
      state.tempReserve = val
    },
    setInventory(state, val){
      if(val.length == 0){
        state.carInventory = []
      }
      else
      {
        
        state.carInventory = []

        val.forEach(function(doc){
          state.carInventory.push(doc.data())
        })
      }
    }
  },
  actions: {
    async login({ dispatch }, form) {
           
      // sign user in
      const user  = await fb.auth.signInWithEmailAndPassword(form.email, form.password)
      .then((response) =>{
        dispatch('fetchUserProfile', user)
        console.log(response)
      })
    },
    async fetchUserProfile({ commit }, user) {
      
      // fetch user profile
      const userProfile = await fb.usersCollection.doc(user.uid).get()
  
      // set user profile in state
      commit('setUserProfile', userProfile.data())
      
      // change route to dashboard
      router.push('/')
    },  
    async signup({ dispatch }, form){
      //sign user up
      const { user } = await fb.auth.createUserWithEmailAndPassword(form.email, form.password)
      .catch(() => window.alert('User Email already taken'))
      
      await fb.usersCollection.doc(user.uid).set({
        firstname: form.firstname,
        lastname: form.lastname,
        title: form.title,
        phoneno: form.phoneno,
        email: form.email,
        isAdmin: false,
        isEmployee: false
      })

      //fetch user profile and set in state
      dispatch('fetchUserProfile', user)

      window.location.reload()
      
    },
    async signupEmployee({ commit }, form){
      //work in progress  
      var secondaryApp = secondary.App
     
      await secondaryApp.auth().createUserWithEmailAndPassword(form.email, form.password)
        .catch(() => window.alert('User Email already taken'))

        
      await fb.usersCollection.doc(secondaryApp.auth().currentUser.uid).set({
        firstname: form.firstname,
        lastname: form.lastname,
        title: form.title,
        phoneno: form.phoneno,
        email: form.email,
        isAdmin: false,
        isEmployee: true
      })

      commit('setSecondaryUserProfile' , {})
      
      router.push('/manage-employees')
    },

    async signupAdmin({ commit }, form){
      //work in progress  
      var secondaryApp = secondary.App
     
      await secondaryApp.auth().createUserWithEmailAndPassword(form.email, form.password)
        .catch(() => window.alert('User Email already taken'))

        
      await fb.usersCollection.doc(secondaryApp.auth().currentUser.uid).set({
        firstname: form.firstname,
        lastname: form.lastname,
        title: form.title,
        phoneno: form.phoneno,
        email: form.email,
        isAdmin: true,
        isEmployee: false
      })
      
      secondaryApp.auth().signOut()
           
      commit('setSecondaryUserProfile' , {})
      
      router.push('/manage-employees')

      
    },

    async logout({ commit }){
      await fb.auth.signOut()

      commit('setUserProfile', {})
      commit('setReservations', {})
      commit('setPreferredLocation', {})
    },

    async setLocation({ commit }, location){
      
      commit('setPreferredLocation', location)

    },

    async newReservation({ commit }, form){
      
      
      const docId = await fb.reservations.doc().id

      await fb.reservations.doc(docId).set({
        accountemail: form.accountemail,
        firstname: form.firstname,
        lastname: form.lastname,
        driveremail: form.email,
        phoneno: form.phoneno,
        location: form.location,
        carType: form.carType,
        pickupdate: form.pickupdate,
        dropoffdate: form.dropoffdate,
        reservationId: docId
      })
      .then(() => router.push('/reservation-success'))
      .catch(() => console.log(' '))
      
      commit()

    },
    async setViewReservations({commit}, val){
      
      await fb.reservations.where('accountemail', '==', val)
      .get()
      .then(function(querySnapshot) {
        commit('setReservations', querySnapshot)
        router.push('/view-reservations')

      })
      .catch(() => console.error('there is an error in setViewReservations in store/index.js'))

      commit()
      
    },
    async modifyReservation({commit}, form){

      await fb.reservations.doc(form.reservationId).update({
        firstname: form.firstname,
        lastname: form.lastname,
        driveremail: form.email,
        phoneno: form.phoneno,
        location: form.location,
        carType: form.carType,
        pickupdate: form.pickupdate,
        dropoffdate: form.dropoffdate
      })
      .then(() => router.push('/reservation-success'))
      .catch(() => console.log(' '))

      commit()

    },
    async setCarInventory({commit}){
      
      await fb.inventory.get()
      .then(function(querySnapshot) {
        
        commit('setInventory', querySnapshot)

        router.push('/inventory')
      })
      .catch(() => console.error('there is an error in setInventory in store/index.js'))
    },
    
  }
})

export default store
