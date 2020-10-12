<template>
  <div id="login">
    <section>
      <PasswordReset v-if="showPasswordReset" @close="togglePasswordReset"></PasswordReset>
      <div class="col1">
        <h1>Jackrabbit Rent-A-Car</h1>
        <p>Welcome to the <router-link to ="/">Jackrabbit Rent-A-Car</router-link> web app.
          Log in to experience a seamless way to renting cars!</p>
      </div>
      <div class="col2">
        <form @submit.prevent>
          <h1>Welcome!</h1>
          <div>
            <label for="email1">Email</label>
            <input v-model.trim="loginForm.email" type="text" placeholder="you@email.com" id="email1" />
          </div>
          <div>
            <label for="password1">Password</label>
            <input v-model.trim="loginForm.password" type="password" placeholder="******" id="password1" />
          </div>
          <button class="button" @click="login()">Log In</button>
          <div class="extras">
            <a @click="togglePasswordReset()">Forgot Password?</a>
            <router-link to = "/signup">Create an Account</router-link>
          </div>
        </form>
      </div>
    </section>
  </div>
</template>

<script>
import PasswordReset from '@/components/ResetPassword'
export default {
  data() {
    return {
      loginForm: {
        email: '',
        password: ''
      },
      showPasswordReset: false
    }
  },
  components:{
    PasswordReset
  },
  methods: {
    login() {
      this.$store.dispatch('login', {
        email: this.loginForm.email,
        password: this.loginForm.password
      })
   
    },
    togglePasswordReset(){
      this.showPasswordReset = !this.showPasswordReset
   }
  }
}
</script>