<template>
    <section>
        <div class="modal">
            <div class="modal-content">
                <div @click="$emit('close')" class = "close"> Close</div>
                <div>
                    <h3> Select Location </h3>
                    <p> </p>
                    <form @submit.prevent>
                       <div>
                            <select @change="setLocation()" v-model.trim ="selectedLocation" class = "option-select">
                                <option disabled value = ""> Location </option>
                                <option value = "Sioux Falls Regional Airport, SD (FSD)"> Sioux Falls Regional Airport, SD (FSD) </option>
                                <option value = "Minneapolis International Airport, MN (MSP)"> Minneapolis International Airport, MN (MSP) </option>
                                <option value = "Chicago O'Hare International Airport, IL (ORD)"> Chicago O'Hare International Airport, IL (ORD) </option>
                            </select>
                        </div>
                    </form>
                    <p> </p>
                    <p v-if="errorMsg !== ''" class="error">{{ errorMsg }} </p>
                    <a> <button class ="button3" @click="checkLocation()"> Select </button> </a>
                </div>    
                <p>  </p>
            </div>
        </div>
    </section>
</template>

<script>
import { mapState } from 'vuex'
import router from '../router/index'

export default {
    data(){
        return{
            IsSuccess: false,
            errorMsg: '',
            selectedLocation: ''
        }
    },
    computed:{
        ...mapState(['userProfile', 'location'])
    },
    methods:{
        setLocation(){
            
            this.errorMsg = ''

            if(this.selectedLocation == ''){
                this.errorMsg = 'Please select a location before proceeding'
            }
            else{
                this.$store.dispatch('setLocation', {location: this.selectedLocation})
                this.IsSuccess = true
            }
        },
        checkLocation(){
            this.errorMsg = ''

            if(this.selectedLocation == ''){
                this.errorMsg = 'Please select a location before proceeding'
            }
            else{
                this.$store.dispatch('setLocation', {location: this.selectedLocation})
                router.push('/new-reservation')
            }
        }
    }
}
</script>

<style lang="scss">
    .option-select{
        width: 70%;
        height: 50px;
    }
    .modal{

        .modal-content{
            max-width: 800px;
        }
    }
     .button3{
        background: #30A0EE;
        border: 0;
        outline: 0;
        color: white;
        padding: 0.8rem 1rem;
        min-width: 150px;
        font-size: 16px;
        border-radius: 3px;
        
        &:hover{
            background: lighten(#30A0EE, 5%);
        }
    }
</style>