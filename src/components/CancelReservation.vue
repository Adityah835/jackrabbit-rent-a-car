<template>
    <section>
        <div class="modal">
            <div class="modal-content">
                <h3> Cancel Reservation </h3>
                
                <div v-if="!IsSuccess">
                    <p> </p>
                    <h5> Hi {{userProfile.firstname}}! Are you sure you want to cancel your reservation?</h5>
                    <p> </p>
                    <p v-if="errorMsg !== ''" class="error">{{ errorMsg }} </p>
                    <button @click="cancelReservation()" class ="btn3_critical"> Cancel Reservation </button>
                    <button @click="$emit('close')" class ="btn3"> Close </button>
                </div>
                <div v-else> 
                    <p> Your Reservation is now cancelled</p>
                    <button @click="$emit('close'), Refresh()" class = "btn3"> Go back to Dashboard </button>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import * as fb from '../firebase'
import { mapState } from 'vuex'

export default {
    data(){
        return{
            
            IsSuccess: false,
            errorMsg: ''
        }
    },
    computed:{
        ...mapState(['userProfile', 'tempReserve'])
    },
    methods: {
        async cancelReservation(){
            this.errorMsg = ''

            try{
                console.log(this.tempReserve)
                await fb.reservations.doc(this.tempReserve.reservationId).delete()
                this.$store.commit('setTempReserve', {})
                this.IsSuccess = true
            }
            catch(error){
                this.errorMsg = error.message
            }
        },
        async Refresh(){
            await window.location.reload()
        }
    }
}
</script>

<style lang="scss">
    
    .modal{

        .modal-content{
            max-width: 300px;
        }
    }

    $critical: rgb(201, 0, 0);

    .btn3{
        background: #30A0EE;
        border: 0;
        outline: 0;
        color: white;
        padding: 0.8rem 1rem;
        min-width: 150px;
        font-size: 16px;
        border-radius: 3px;
        margin-left: 3%;
        
        &:hover{
            background: lighten(#30A0EE, 5%);
        }

        &_critical{
            background-color: $critical;
            color: white;
            margin-left: 3%;
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
