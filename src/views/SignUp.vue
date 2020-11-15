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
                    <p v-if="FirstNameErrorMsg != ''" class="error"> {{FirstNameErrorMsg}} </p>
                    <input v-model.trim="signupForm.firstname" type="text" placeholder = "John" id="firstname"/>
                </div>
                <div>
                    <label>Last Name</label>
                    <p v-if="LastNameErrorMsg != ''" class="error"> {{LastNameErrorMsg}} </p>
                    <input v-model.trim="signupForm.lastname" type="text" placeholder = "Doe" id="lastname"/>
                </div>
                <div>
                    <label>Title</label>
                    <p v-if="TitleErrorMsg != ''" class="error"> {{TitleErrorMsg}} </p>
                    <input v-model.trim="signupForm.title" type="text" placeholder = "Company" id="title"/>
                </div>
                <div>
                    <label>Email</label>
                    <p v-if="EmailErrorMsg != ''" class="error"> {{EmailErrorMsg}} </p>
                    <input v-model.trim="signupForm.email" type="text" placeholder = "you@email.com" id="email2"/>
                </div>
                <div>
                    <label>Password</label>
                    <p v-if="PasswordErrorMsg != ''" class="error"> {{PasswordErrorMsg}} </p>
                    <input v-model.trim="signupForm.password" type="password" placeholder = "min 6 characters" id="password2"/>
                </div>
                <div>
                    <label>Phone Number</label>
                    <p v-if="PhoneNumberErrorMsg != ''" class="error"> {{PhoneNumberErrorMsg}} </p>
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
        },
        FirstNameErrorMsg: '',
        LastNameErrorMsg: '',
        TitleErrorMsg: '',
        EmailErrorMsg: '',
        PasswordErrorMsg: '',
        PhoneNumberErrorMsg: ''
      }  
    },
    methods:{
        IsFormValid(){
            
            this.IsFirstNameValid()
            this.IsLastNameValid()
            this.IsTitleValid()
            this.IsEmailValid()
            this.IsPasswordValid()
            this.IsPhoneNumberValid()

            if(this.FirstNameErrorMsg == '' 
            && this.LastNameErrorMsg == ''
            && this.TitleErrorMsg == ''
            && this.EmailErrorMsg == ''
            && this.PasswordErrorMsg == ''
            && this.PhoneNumberErrorMsg == '')
            {
                return true
            }
            else{
                return false
            }
            
        },
        IsFirstNameValid(){
            var letters = /^[A-Za-z]+$/;
            if(this.signupForm.firstname.length < 2){
                this.FirstNameErrorMsg = 'First Name too short! Must be atleast 2 characters'
            }
            else if(!this.signupForm.firstname.match(letters)){
                this.FirstNameErrorMsg = 'First Name must only contain letters'
            }
        },
        IsLastNameValid(){
            var letters = /^[A-Za-z]+$/;
            if(this.signupForm.lastname.length < 2){
                this.LastNameErrorMsg = 'Last Name too short! Must be atleast 2 characters'
            }
            else if(!this.signupForm.firstname.match(letters)){
                this.FirstNameErrorMsg = 'First Name must only contain letters'
            }
        },
        IsTitleValid(){
            if(this.signupForm.title != 'Mr.' 
            && this.signupForm.title != 'Ms.'
            && this.signupForm.title != 'Mrs.')
            {
                this.TitleErrorMsg = 'Title must be either \'Mr.\' , \'Mrs.\' or \'Ms.\''
            }
        },
        IsEmailValid(){
            if(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(this.signupForm.email) == false){
                this.EmailErrorMsg = 'Invalid email format'
            }
            
        },
        IsPasswordValid(){
            if(this.signupForm.password.length < 6){
                this.PasswordErrorMsg = 'Password must be atleast 6 characters long'
            }
        },
        IsPhoneNumberValid(){
            if(/^\d+$/.test(this.signupForm.phoneno) == false){
                this.PhoneNumberErrorMsg = 'Phone Number must only contains digits 0-9'
            }
        },
        signup(){

            this.FirstNameErrorMsg = ''
            this.LastNameErrorMsg = ''
            this.TitleErrorMsg = ''
            this.EmailErrorMsg = ''
            this.PasswordErrorMsg = ''
            this.PhoneNumberErrormsg = ''

            if(this.IsFormValid() == true){
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
}
</script>
<style lang="scss">
    .error {
        color: tomato;
        font-size: 12px;
    }
</style>