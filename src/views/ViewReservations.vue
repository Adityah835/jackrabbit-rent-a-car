<template>
    <section>
        <CancelReservation v-if="showDeleteReservation" @close="toggleCancelReservation"></CancelReservation>
        <div id = "dashboard">
            <div class = "col1">
                <h1>Hi {{userProfile.firstname}}! Check your Reservations below</h1>
            </div>
            
            <div v-if = "reservations.length">
                <p v-if="pickUpError" class = "p-critical"> Pick Up not allowed 1 day before the Reservation date </p>
                <div v-for= "reserve in reservations" :key= "reserve.reservationId" class ="post" >
                    <h5> {{ reserve.pickuplocation}} </h5>
                    <ul>
                        <li><p> <strong> Pickup Date: </strong> {{ reserve.pickupdate }}</p></li>
                        <li><p> <strong> Drop off Date: </strong> {{ reserve.dropoffdate }}</p></li>
                    </ul>
                    <p>- </p>
                    <p v-if= "reservationDetailsId === reserve.reservationId"> <strong>Driver's Name:</strong> {{ reserve.firstname }} {{ reserve.lastname }}</p>
                    <p v-if= "reservationDetailsId === reserve.reservationId"> <strong>Driver's Phone No:</strong> {{ reserve.phoneno }} </p>
                    <p v-if= "reservationDetailsId === reserve.reservationId"> <strong>Car Preference:</strong> {{ reserve.carType }}</p>
                    <p v-if= "reservationDetailsId === reserve.reservationId"> <strong> Drop off Location: </strong> {{ reserve.dropofflocation }}</p>
                    <ul class="align-right" v-if= "reservationDetailsId === reserve.reservationId">
                        <li> <button class="button4" @click="pickUpCar(reserve)"> Pick Car </button> </li>
                        <li><a @click="modifyReservation(reserve)"> Change Reservation </a></li>
                        <li><a class="a-critical" @click="toggleCancelReservation(reserve)"> Cancel Reservation </a></li>
                    </ul>
                    <a v-if= "reservationDetailsId === reserve.reservationId" v-on:click="toggleShow(reserve)"> Less </a>
                    <a v-else v-on:click="toggleShow(reserve)"> More </a>
                </div>            
            </div>

            <div v-else>
                <div class = "post">
                    <h5> No upcoming reservations </h5>
                </div>
            </div>
            
        </div>
    </section>
</template>
<script>
import {mapState} from 'vuex'
import CancelReservation from '@/components/CancelReservation'
import router from '../router/index'
import * as firebase from 'firebase/app'


export default {
    computed:{
        ...mapState(['userProfile', 'reservations'])
    },
    components:{
        CancelReservation
    },
    data(){
        return {
            showDeleteReservation: false,
            reservationDetailsId: '',

            pickUpError: false,

            date:{
                month : 1,
                date : 1,
                year : 1990
            }
        }
    },
    methods:{
        toggleCancelReservation(reservation){
            this.showDeleteReservation = !this.showDeleteReservation
            this.$store.commit('setTempReserve', reservation)
        },
        modifyReservation(reservation){
            this.$store.commit('setTempReserve', reservation)
            router.push('/modify-reservation')
        },
        toggleShow(reserve){
            if(this.reservationDetailsId == ''){
                this.reservationDetailsId = reserve.reservationId
            }
            else{
                this.reservationDetailsId = '',
                this.pickUpError = false
            }
        },
        pickUpCar(reserve){
            const serverDate = firebase.firestore.Timestamp.fromDate(new Date())
                       
            this.parseDate(reserve.pickupdate)
            

            if(this.date.month == (serverDate.toDate().getMonth() + 1)
            && this.date.year == serverDate.toDate().getFullYear()){

                if(this.date.date - serverDate.toDate().getDate() <= 1 
                && this.date.date - serverDate.toDate().getDate() >= 0){
                    
                    console.log('Pick up allowed')
                    this.pickUpError = false
                    this.$store.commit('setTempReserve', reserve)
                    this.$store.dispatch('setPickUpInventory')
                }
                else{
                    
                    console.error('Pick up not allowed more than 1 day from the reservation date - 1')
                    this.pickUpError = true

                }
            }
            else{
                    console.error('Pick up not allowed more than 1 day from the reservation date - 2')
                    this.pickUpError = true
                }
           
        },
        parseDate(dateString){
            this.date.month = parseInt(dateString[0] + dateString[1]),
            this.date.date = parseInt(dateString[3] + dateString[4]),
            this.date.year = parseInt(dateString[6] + dateString[7] + dateString[8] + dateString[9])
        }
    }
}

</script>

<style lang="scss">
    .p-critical{
        color: tomato;
        font-size: 12px;
    }
    .a-critical 
    {
        font-family: 'Open Sans', sans-serif;
        text-decoration: none;
        color: rgb(255, 0, 0);
        margin: 0;
        cursor: pointer;
        
        &:hover {
            color: lighten(rgb(255, 0, 0), 25%);
        }
    }

    $primary: #30A0EE;
    $white: #fff;
    .button4 {
        background: $primary;
        border: 0;
        outline: 0;
        color: $white;
        padding: 0.8rem 1rem;
        min-width: 75px;
        min-height: 25px;
        font-size: 13px;
        border-radius: 2px;
        margin-left: 0%;
        margin-top: 0%;
        cursor: pointer;

        &:hover {
            background: lighten($primary, 5%);
        }

        &:disabled {
            opacity: 0.5;
            
            &:hover {
                background: $primary;
            }
        }
    }

</style>