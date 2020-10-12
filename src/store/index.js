import Vue from 'vue'
import Vuex from 'vuex'
import * as fb from '../firebase'
import router from '../router/index'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    userProfile: {}
  },
  mutations: {
    setUserProfile(state, val) {
      state.userProfile = val
    }
  },
  actions: {
    async login({ dispatch }, form) {
      // sign user in
      const user  = await fb.auth.signInWithEmailAndPassword(form.email, form.password)
      .then(() =>
        dispatch('fetchUserProfile', user)
      )
      .catch((error) => console.error(error))
      
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
    },
    async logout({ commit }){
      await fb.auth.signOut()

      commit('setUserProfile', {})
      router.push('/login')

    },
    
  },
  modules: {
  }
})

export default store
