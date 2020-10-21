<template>
    <div id="signup-form">
        <section>
            <form @submit.prevent>
                <div class = "col1">
                <h3>New Reservation @ {{location.location}}</h3>
                </div>
                <div class = "col2">
                <div>
                    <label>Driver's First Name</label>
                    <input v-model.trim="reservationForm.firstname" type="text" placeholder = "John" id="firstname2"/>
                </div>
                <div>
                    <label>Driver's Last Name</label>
                    <input v-model.trim="reservationForm.lastname" type="text" placeholder = "Doe" id="lastname2"/>
                </div>
                <div>
                    <label>Phone Number</label>
                    <input v-model.trim="reservationForm.phoneno" type="text" placeholder = "XXX-XXX-XXXX" id="phoneno2"/>
                </div>
                <div>
                    <label>Email</label>
                    <input v-model.trim="reservationForm.email" type="text" placeholder = "you@gmail.com" id="email3"/>
                </div>
                <div>
                    <label>Pick Up Date</label>
                    <input v-model.trim="reservationForm.pickupdate" type="text" placeholder = "10/5/2020" id="pickupdate"/>
                </div>
                <div>
                    <label>Pick Up Time</label>
                    <input v-model.trim="reservationForm.pickuptime" type="text" placeholder = "10:00 AM" id="pickuptime"/>
                </div>
                <div>
                    <label>Drop off Date</label>
                    <input v-model.trim="reservationForm.dropoffdate" type="text" placeholder = "10/7/2020" id="dropoffdate"/>
                </div>
                <div>
                    <label>Drop off Time</label>
                    <input v-model.trim="reservationForm.dropofftime" type="text" placeholder = "02:00 PM" id="dropofftime"/>
                </div>
                <button class="button">Reserve Ride</button>
                <div class="extras">
                    <p> </p>
                    <router-link to="/rent-cars">Back to Rent Cars Dashboard</router-link>
                </div>
                </div>
            </form>
        </section>
    </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
    data(){
        return{
            reservationForm:{
                firstname: '',
                lastname: '',
                email:'',
                phoneno:'',
                pickupdate:'',
                pickuptime:'',
                dropoffdate:'',
                dropofftime:''
            }
        }
    },
    computed:{
        ...mapState(['userProfile', 'location'])
    },
    methods:{

    }
}
</script>
