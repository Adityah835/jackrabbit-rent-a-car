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
                    <p v-if="FirstNameErrorMsg != ''" class="error"> {{FirstNameErrorMsg}} </p>
                    <input v-model.trim="reservationForm.firstname" class = "option-select" type="text" placeholder = "John" id="firstname2"/>
                </div>
                <div>
                    <label>Driver's Last Name</label>
                    <p v-if="LastNameErrorMsg != ''" class="error"> {{LastNameErrorMsg}} </p>
                    <input v-model.trim="reservationForm.lastname" class = "option-select" type="text" placeholder = "Doe" id="lastname2"/>
                </div>
                <div>
                    <label>Phone Number</label>
                    <p v-if="PhoneNumberErrorMsg != ''" class="error"> {{PhoneNumberErrorMsg}} </p>
                    <input v-model.trim="reservationForm.phoneno" class = "option-select" type="text" placeholder = "XXX-XXX-XXXX" id="phoneno2"/>
                </div>
                <div>
                    <label>Email</label>
                    <p v-if="EmailErrorMsg != ''" class="error"> {{EmailErrorMsg}} </p>
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
                    <label> Drop Off Location </label>
                    <p v-if="DropOffLocationErrorMsg != ''" class="error"> {{DropOffLocationErrorMsg}} </p>
                    <select v-model.trim ="reservationForm.dropofflocation" class = "option-select">
                        <option disabled value = ""> Location </option>
                        <option value = "Sioux Falls Regional Airport, SD (FSD)"> Sioux Falls Regional Airport, SD (FSD) </option>
                        <option value = "Minneapolis International Airport, MN (MSP)"> Minneapolis International Airport, MN (MSP) </option>
                        <option value = "Chicago O'Hare International Airport, IL (ORD)"> Chicago O'Hare International Airport, IL (ORD) </option>
                    </select>
                </div>
                <div>
                    <label> Car Type </label>
                    <p v-if="CarTypeErrorMsg != ''" class="error"> {{CarTypeErrorMsg}} </p>
                    <select v-model.trim ="reservationForm.carType" class = "option-select">
                        <option disabled value = ""> Select</option>
                        <option value = "Sedan"> Sedan </option>
                        <option value = "SUV"> SUV </option>
                        <option value = "Hatchback"> Hatchback </option>
                        <option value = "Mini Van"> Mini Van </option>
                    </select>
                </div>
                <div class="extras">
                    <button @click="newReservation()" class="button">Reserve Ride</button>
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
import * as fb from '../firebase'
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
                carType: '',
                pickupdate:'11/24/2020 10:00',
                dropoffdate:'11/24/2020 16:00',
                dropofflocation: ''
            },
            FirstNameErrorMsg: '',
            LastNameErrorMsg: '',
            TitleErrorMsg: '',
            EmailErrorMsg: '',
            PhoneNumberErrorMsg: '',
            DropOffLocationErrorMsg: '',
            CarTypeErrorMsg: ''
        }
    },
    computed:{
        ...mapState(['userProfile', 'location'])
    },
    methods:{
        isPastDate(date){
            const currentDate = new Date()
            return date <= currentDate
        },
        IsFormValid(){
            this.IsFirstNameValid()
            this.IsLastNameValid()
            this.IsEmailValid()
            this.IsPhoneNumberValid()
            this.IsCarTypeValid()
            this.IsDropOffLocationValid()

            if(this.FirstNameErrorMsg == '' 
            && this.LastNameErrorMsg == ''
            && this.EmailErrorMsg == ''
            && this.PhoneNumberErrorMsg == ''
            && this.DropOffLocationErrorMsg == ''
            && this.CarTypeErrorMsg == '')
            {
                return true
            }
            else{
                return false
            }


        },
        newReservation(){
            
            this.FirstNameErrorMsg = ''
            this.LastNameErrorMsg = ''
            this.TitleErrorMsg = ''
            this.EmailErrorMsg = ''
            this.PhoneNumberErrorMsg = '',
            this.DropOffLocationErrorMsg = ''
            this.CarTypeErrorMsg = ''

            if(this.IsFormValid() == true){
                this.$store.dispatch('newReservation',{
                    accountemail: fb.auth.currentUser.email,
                    firstname: this.reservationForm.firstname,
                    lastname: this.reservationForm.lastname,
                    email: this.reservationForm.email,
                    phoneno:this.reservationForm.phoneno,
                    pickuplocation: this.$store.state.location.location,
                    carType: this.reservationForm.carType,
                    pickupdate: this.reservationForm.pickupdate,
                    dropoffdate: this.reservationForm.dropoffdate,
                    dropofflocation: this.reservationForm.dropofflocation
                })
            }
        },
        IsFirstNameValid(){
            var letters = /^[A-Za-z]+$/;
            if(this.reservationForm.firstname.length < 2){
                this.FirstNameErrorMsg = 'First Name too short! Must be atleast 2 characters'
            }
            else if(!this.reservationForm.firstname.match(letters)){
                this.FirstNameErrorMsg = 'First Name must only contain letters'
            }
        },
        IsLastNameValid(){
            var letters = /^[A-Za-z]+$/;
            if(this.reservationForm.lastname.length < 2){
                this.LastNameErrorMsg = 'Last Name too short! Must be atleast 2 characters'
            }
            else if(!this.reservationForm.firstname.match(letters)){
                this.FirstNameErrorMsg = 'First Name must only contain letters'
            }
        },
        IsEmailValid(){
            if(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(this.reservationForm.email) == false){
                this.EmailErrorMsg = 'Invalid email format'
            }
            
        },
        IsPhoneNumberValid(){
            if(/^\d+$/.test(this.reservationForm.phoneno) == false){
                this.PhoneNumberErrorMsg = 'Phone Number must only contains digits 0-9'
            }
            else if(this.reservationForm.phoneno.length != 10){
                this.PhoneNumberErrorMsg = 'Phone Number must be 10 digits'
            }
        },
        IsCarTypeValid(){
            if(this.reservationForm.carType == ''){
                this.CarTypeErrorMsg = 'Select the type of car'
            }
        },
        IsDropOffLocationValid(){
            if(this.reservationForm.dropofflocation == ''){
                this.DropOffLocationErrorMsg = 'Select a dropoff location'
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
