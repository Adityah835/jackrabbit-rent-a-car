<template>
    <section>
        <CancelReservation v-if="showDeleteReservation" @close="toggleCancelReservation"></CancelReservation>
        <div id = "dashboard">
            <div class = "col1">
                <h1>Hi {{userProfile.firstname}}! Check your Reservations below</h1>
            </div>
            <!--div v-if= "reservations != []"-->
            <div v-if = "reservations.length">
                <div v-for= "reserve in reservations" :key= "reserve.reservationId" class ="post">
                    <h5> {{ reserve.location}} </h5>
                    <ul>
                        <li><p> <strong> Pickup Date: </strong> {{ reserve.pickupdate }}</p></li>
                        <li><p> <strong> Drop off Date </strong> {{ reserve.dropoffdate }}</p></li>
                    </ul>
                    <p>- </p>
                    <p> <strong>Driver's Name:</strong> {{ reserve.firstname }} {{ reserve.lastname }}</p>
                    <p> <strong>Driver's Phone No:</strong> {{ reserve.phoneno }} </p>
                    <p> <strong>Car Preference:</strong> {{ reserve.carType }}</p>  
                    <ul class="align-right">
                        <li><a @click="modifyReservation(reserve)"> Change Reservation </a></li>
                        <li><a class="a-critical" @click="toggleCancelReservation(reserve)"> Cancel Reservation </a></li>
                    </ul>                  
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

export default {
    computed:{
        ...mapState(['userProfile', 'reservations'])
    },
    components:{
        CancelReservation
    },
    data(){
        return {
            showDeleteReservation: false
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
        }
    }
}

</script>

<style lang="scss">
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
</style>