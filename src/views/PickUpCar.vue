<template>
    <section>
        <div id = "dashboard">
            <div class = "col1">
                <h3>Jackrabbit-Rent-A-Car PickUp</h3>
                <h5>Select from one of the cars at your reservation location</h5>
            </div>
            <div v-if = "preferredPickUpCarInventory.length">
                <h5 class = "col1"> Preferred car type: {{tempReserve.carType}} </h5>
                <div v-for = "(pickUpCarInvent, index) in preferredPickUpCarInventory" :key="index" class = "post">
                    <h5> {{pickUpCarInvent.make}} {{pickUpCarInvent.model}} </h5>
                    <p> <strong> $ {{pickUpCarInvent.rentRate}}.00 / day </strong> </p>
                    <p> <strong> Color : </strong> {{pickUpCarInvent.color}} </p>
                    <p> <strong> Location : </strong> {{pickUpCarInvent.location}} </p>
                    <p> <strong> Type : </strong> {{pickUpCarInvent.type}} </p>
                    <p> <button @click="proceedToPay()" class="button4"> Select </button> </p>
                </div>
            </div>
            <p>. </p>
            <div v-if = "otherPickUpCarInventory.length">
                <h5 class = "col1"> Other car types </h5>
                <div v-for = "(pickUpCarInvent, index) in otherPickUpCarInventory" :key="index" class = "post">
                    <h5> {{pickUpCarInvent.make}} {{pickUpCarInvent.model}} </h5>
                    <p> <strong> $ {{pickUpCarInvent.rentRate}}.00 / day </strong> </p>
                    <p> <strong> Color : </strong> {{pickUpCarInvent.color}} </p>
                    <p> <strong> Location : </strong> {{pickUpCarInvent.location}} </p>
                    <p> <strong> Type : </strong> {{pickUpCarInvent.type}} </p>
                    <p> <button @click="proceedToPay()" class="button4"> Select </button> </p>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
import { mapState } from 'vuex'
import router from '../router'
export default {
    computed:{
        ...mapState(['tempReserve','otherPickUpCarInventory', 'preferredPickUpCarInventory']),
        
    },
    methods:{
        proceedToPay(){
            router.push('/payment')
        }
    }

}
</script>
<style lang="scss">
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