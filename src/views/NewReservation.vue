<template>
    <div id="signup-form">
        <section>
            <form @submit.prevent>
                <div class = "col1">
                <h3>New Reservation @ {{location.location}}</h3>
                </div>
                <div class = "col1">
                <div>
                    <label>Driver's First Name</label>
                    <input v-model.trim="reservationForm.firstname" class = "option-select" type="text" placeholder = "John" id="firstname2"/>
                </div>
                <div>
                    <label>Driver's Last Name</label>
                    <input v-model.trim="reservationForm.lastname" class = "option-select" type="text" placeholder = "Doe" id="lastname2"/>
                </div>
                <div>
                    <label>Phone Number</label>
                    <input v-model.trim="reservationForm.phoneno" class = "option-select" type="text" placeholder = "XXX-XXX-XXXX" id="phoneno2"/>
                </div>
                <div>
                    <label>Email</label>
                    <input v-model.trim="reservationForm.email" class = "option-select" type="text" placeholder = "you@gmail.com" id="email3"/>
                </div>
                <div>
                    <label>Pick Up Date</label>
                    <date-pick 
                        v-model="reservationForm.pickupdate"
                        :pickTime="true"
                        :use12HourClock="true"
                        :format="'MM-DD-YYYY HH:mm'"
                        :displayFormat="'MM/DD/YYYY H:mm A'"
                        :isDateDisabled="isPastDate"

                        class = "option-select"
                    ></date-pick>
                </div>
                <div>
                    <label>Drop off Date</label>
                    <date-pick 
                        v-model="reservationForm.dropoffdate"
                        :pickTime="true"
                        :use12HourClock="true"
                        :format="'MM-DD-YYYY HH:mm'"
                        :displayFormat="'MM/DD/YYYY H:mm A'"
                        :isDateDisabled="isPastDate"

                        class = "option-select"
                    ></date-pick>
                </div>
                <div>
                    <label> Car Type </label>
                    <select v-model.trim ="reservationForm.carType" class = "option-select">
                                <option disabled value = ""> Select</option>
                                <option value = "Sedan"> Sedan </option>
                                <option value = "SUV"> SUV </option>
                                <option value = "Hatchback"> Hatchback </option>
                                <option value = "Mini Van"> Mini Van </option>
                            </select>
                </div>
                
                <div class="extras">
                    <button class="button">Reserve Ride</button>
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

import DatePick from 'vue-date-pick'
import 'vue-date-pick/dist/vueDatePick.css'

export default {
    components:{
        DatePick
    },
    data(){
        return{
            reservationForm:{
                firstname: '',
                lastname: '',
                email:'',
                phoneno:'',
                location: '',
                carType: '',
                pickupdate:'11/01/2020 12:00',
                dropoffdate:'11/02/2020 12:00',
            },
        }
    },
    computed:{
        ...mapState(['userProfile', 'location'])
    },
    methods:{
        isPastDate(date){
            const currentDate = new Date()
            return date <= currentDate
        }

    }
}
</script>
