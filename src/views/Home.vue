<template>
    <div id = "home">
        <section>
        <ConfirmAccountDelete v-if="showAccountDelete" @close="toggleDeleteAccount"></ConfirmAccountDelete>
        <div class = "col2">
            <h3>Welcome {{userProfile.firstname}}!</h3>
            <h5>To the seamless car renting experience..</h5>
            <img class = "image" src = '../assets/car.jpg'/> 
        </div>
        <div class='col1'>           
            <router-link to='rent-cars'> <button class="button"> Rent Cars </button> </router-link>
            <router-link to='locations'> <button class="button"> Locations </button> </router-link>
            <router-link to='about-us'> <button class="button"> About Us </button> </router-link>
            <a @click="toggleDeleteAccount()" v-if="isLoggedIn()"> <button class="button_critical"> Delete Account </button> </a>
                       
        </div>
        </section>
    </div>
</template>
<script>
import { mapState } from 'vuex'
import { auth } from '../firebase'
import ConfirmAccountDelete from '@/components/ConfirmDelete'

export default {
    data(){
        return{
            showAccountDelete: false
        }
    },
    computed:{
        ...mapState(['userProfile'])
    },
    methods:{
        isLoggedIn(){
            return auth.currentUser != null? true : false
        },
        toggleDeleteAccount(){
            this.showAccountDelete = !this.showAccountDelete
        }
    },
    components:{
        ConfirmAccountDelete
    }
}
</script>
<style lang="scss">
    $critical: rgb(201, 0, 0);

    .button{
        background-color: #30A0EE;
        color: white;
        margin-top: 20%;
        margin-left: 10%;
        width: 40%;
        height: 20%;

        &_critical{
            background-color: $critical;
            color: white;
            margin-top: 20%;
            margin-left: 10%;
            width: 40%;
            height: 20%;
            border: 0;
            outline: 0;
            padding: 0.8rem 1rem;
            min-width: 150px;
            font-size: 16px;
            border-radius: 3px;
            cursor: pointer;
            
            &:hover {
                background: lighten($critical, 5%);
            }
            
            &:disabled {
                opacity: 0.5;
                
                &:hover {
                    background: $critical;
                }
            }

        }
    }
</style>

