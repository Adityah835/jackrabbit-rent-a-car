<template>
    <header>
        <section>
            <div class = "col1">
                <router-link to = "/"> 
                    <h3>Jackrabbit Rent-A-Car</h3> 
                </router-link>
                <ul v-if = "isLoggedIn() == false" class = "inline">
                    <li><router-link to = "/login"> Login </router-link></li>
                </ul>
                <ul v-if = "isLoggedIn() == true" class = "inline">
                    <li><a @click="logout()"> Logout </a></li>
                </ul>
                <ul class = "inline">
                    <li><router-link to = "/rent-cars"> Rent Cars </router-link></li>
                    <li><router-link to = "/locations"> Locations </router-link></li>
                    <li><router-link to = "/about-us"> About Us </router-link></li>
                </ul>       
            </div>
       </section>
    </header>
</template>
<script>
import { auth } from '../firebase'
export default {
    data(){
        return{
            accountType: ''
        }
    },
    methods:{
        isLoggedIn(){
            return auth.currentUser? true : false
        },
        logout(){
            this.$store.dispatch('logout')
        }
    
    }
}
</script>
