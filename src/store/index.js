import Vue from 'vue'
import Vuex from 'vuex'
import * as fb from '../firebase'
import router from '../router/index'

import * as secondary from '../scripts/SecondaryApp'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    userProfile: {},
    secondaryUserProfile: {}
  },
  mutations: {
    setUserProfile(state, val) {
        state.userProfile = val
    },
    setSecondaryUserProfile(state, val) {
      state.secondaryUserProfile = val
  }
  },
  actions: {
    async login({ dispatch }, form) {
      
      console.log('inside login dispatch')
      
      // sign user in
      const user  = await fb.auth.signInWithEmailAndPassword(form.email, form.password)
      .then((response) =>{
        dispatch('fetchUserProfile', user)
        console.log(response)
      })
      .catch((error) => {
        console.error(error)
        alert(error)
      })
      
      window.location.reload()
      // fetch user profile and set in state

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
        .then(function(fireBaseUser){
          console.log("User" + fireBaseUser.uid + " created successfully")
        })
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

      //fetch user profile and set in state
      commit()
      //dispatch('fetchUserProfile', user)
    },
    async logout({ commit }){
      await fb.auth.signOut()

      commit('setUserProfile', {})
    },
    
  },
  modules: {
  }
})

export default store
