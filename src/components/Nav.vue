<template>
    <header>
        <section>
            <div class = "col1">
                <a href = "/"> 
                    <h3>Jackrabbit Rent-A-Car</h3> 
                </a>
               
                <ul class = "inline">
                    <li><router-link to = "/rent-cars"> Rent Cars </router-link></li>
                    <li><router-link to = "/locations"> Locations </router-link></li>
                    <li><router-link to = "/about-us"> About Us </router-link></li>
                    <li v-if =  "isLoggedIn() === false"><router-link to = "/login"> Login </router-link></li>
                    
                    <ul v-if = "isLoggedIn() === true " class = "inline">
                        <ul v-if = "userProfile.isEmployee === true" class = "inline" >
                            <li> <a @click="setInventory()"> Inventory </a></li>
                            <li><a @click="logout()"> Logout </a></li>
                        </ul>
                        <ul v-if = "userProfile.isAdmin === true" class = "inline" >
                            <li> <router-link to = "/manage-employees"> Manage Employees </router-link> </li>
                            <li> <a @click="setInventory()"> Inventory </a></li>
                            <li><a @click="logout()"> Logout </a></li>
                        </ul>
                        <ul v-if = "userProfile.isAdmin === false" class = "inline">
                            <li v-if = "userProfile.isEmployee === false"> <a @click="logout()"> Logout </a> </li>
                        </ul>
                    </ul>

                </ul>
            </div>
       </section>
    </header>
</template>
<script>
import { auth } from '../firebase'
import { mapState } from 'vuex'

export default {
    computed:{
        ...mapState(['userProfile'])
    },
    methods:{
        isLoggedIn(){
            return auth.currentUser != null? true : false
        },
        logout(){
            this.$store.dispatch('logout')
            window.location.reload()
        },
        setInventory(){
            this.$store.dispatch('setCarInventory')
        }   
    }
}
</script>
