<template>
    <div id="signup-form">
        <section>
            <form @submit.prevent>
                <div class = "col1">
                <h1>Get Started - Create New Account</h1>
                </div>
                <div class = "col2">
                <div>
                    <label>First Name</label>
                    <input v-model.trim="signupForm.firstname" type="text" placeholder = "John" id="firstname"/>
                </div>
                <div>
                    <label>Last Name</label>
                    <input v-model.trim="signupForm.lastname" type="text" placeholder = "Doe" id="lastname"/>
                </div>
                <div>
                    <label>Title</label>
                    <input v-model.trim="signupForm.title" type="text" placeholder = "Company" id="title"/>
                </div>
                <div>
                    <label>Email</label>
                    <input v-model.trim="signupForm.email" type="text" placeholder = "you@email.com" id="email2"/>
                </div>
                <div>
                    <label>Password</label>
                    <input v-model.trim="signupForm.password" type="password" placeholder = "min 6 characters" id="password2"/>
                </div>
                <div>
                    <label>Phone Number</label>
                    <input v-model.trim="signupForm.phoneno" type="text" placeholder = "XXX-XXX-XXXX" id="phoneno"/>
                </div>
                <button @click="signup()" class="button">Sign Up</button>
                <div class="extras">
                    <router-link to="login">Back to Login</router-link>
                </div>
                </div>
            </form>
        </section>
    </div>
</template>

<script>
export default {
    data(){
      return {
        signupForm:{
            firstname: '',
            lastname: '',
            title: '',
            email:'',
            password:'',
            phoneno:''
        }
      }  
    },
    methods:{
        signup(){
            this.$store.dispatch('signup',{
                email: this.signupForm.email,
                password: this.signupForm.password,
                firstname: this.signupForm.firstname,
                lastname: this.signupForm.lastname,
                title: this.signupForm.title,
                phoneno: this.signupForm.phoneno
            })
        }
    }
}
</script>