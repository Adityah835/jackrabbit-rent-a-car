 <template>
    <div id="signup-form">
        <section>
            <form @submit.prevent>
                <div class = "col1">
                <h1>Get Started - Add New Employee (Work in Progress)</h1>
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

                <div>
                    <label for = "AccountType">Account Type</label>
                    <select v-model.trim ="signupForm.accountType" class = "option-select">
                        <option disabled value = ""> Select One </option>
                        <option value = "Admin"> Admin </option>
                        <option value = "Employee"> Employee </option>
                    </select>
                </div>

                <button @click="signupEmployee()" class="button">Add Employee</button>
                <div class="extras">
                    <router-link to="manage-employees">Manage Employees</router-link>
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
            phoneno:'',
            accountType: ''
        }
      }  
    },
    methods:{
        signupEmployee(){

            if (this.signupForm.accountType === "Employee"){
                this.$store.dispatch('signupEmployee',{
                    email: this.signupForm.email,
                    password: this.signupForm.password,
                    firstname: this.signupForm.firstname,
                    lastname: this.signupForm.lastname,
                    title: this.signupForm.title,
                    phoneno: this.signupForm.phoneno
                })
            }
            else if(this.signupForm.accountType === "Admin"){
                this.$store.dispatch('signupAdmin',{
                    email: this.signupForm.email,
                    password: this.signupForm.password,
                    firstname: this.signupForm.firstname,
                    lastname: this.signupForm.lastname,
                    title: this.signupForm.title,
                    phoneno: this.signupForm.phoneno
                })
                .catch((response) => {alert(response)})
            }
            
        }
    }
}
</script>
<style lang="scss">
    .option-select{
        width: 100%;
        height: 10%;
        font-size: 15px;
    }
</style>
                