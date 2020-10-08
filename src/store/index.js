import Vue from 'vue'
import Vuex from 'vuex'
import * as fb from '../firebase'
import router from '../router/index'

Vue.use(Vuex)

export default new Vuex.Store({
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
        dispatch('fetchUserProfile', user),
        window.location.reload()
      )
      .catch(error => window(error.message))
             
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
      
      await fb.usersCollection.doc(user.uid).set({
        firstname: form.firstname,
        lastname: form.lastname,
        title: form.title,
        phoneno: form.phoneno,
        email: form.email,
        type: '',
      })

      //fetch user profile and set in state
      dispatch('fecthUserProfile', user)
    },
    async logout({ commit }){
      await fb.auth.signOut()

      commit('SetUserProfile', {})
      router.push('/login')

      window.location.reload()
    }
  },
  modules: {
  }
})
