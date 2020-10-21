<template>
    <div id = "dashboard">
        <section>
            <SelectLocation v-if="showSelectLocation" @close="toggleSelectLocation"></SelectLocation>
            <div class = "col2">
                <h2>Welcome {{userProfile.firstname}}! </h2>
                <h4>Start your car reservation rental or check you current reservations! </h4>    
            </div>
        </section>
    
        <section>
            <div class="col2">
                <a @click="toggleSelectLocation()"><button class = "button2" type="button">Make a New Reservation</button></a>
                <a><button class ="button2" type="button">View/Modify/Cancel Reservation</button></a>
            </div>
        </section>
    </div>
</template>
<script>
import SelectLocation from '@/components/SelectLocation.vue'
import { mapState } from 'vuex'

export default {
    data() {
        return {
            showSelectLocation: false
        }
    },
    methods:{
        toggleSelectLocation(){
            this.showSelectLocation = !this.showSelectLocation
        }
    },
    computed:{
        ...mapState(['userProfile'])
    },
    components:{
        SelectLocation
    }
}
</script>

<style lang="scss">
    $primary: #30A0EE;
    $white: #fff;
    .button2 {
        background: $primary;
        border: 0;
        outline: 0;
        color: $white;
        padding: 0.8rem 1rem;
        min-width: 300px;
        min-height: 100px;
        font-size: 16px;
        border-radius: 3px;
        margin-left: 15%;
        margin-top: 5%;
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