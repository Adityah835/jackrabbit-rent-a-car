<template>
    <div id = "dashboard">
        <section>
            <div class = "col2">
                <h2>Welcome {{userProfile.firstname}}! </h2>
                <h4> Use below links to add or view employee information </h4>    
            </div>
        </section>
    
        <section>
            <div class="col2">
                <router-link to = "/employee-signup"><button class = "button2" type="button">Add Employee</button></router-link>
                <a @click="setViewEmployees()"><button class ="button2" type="button">View All Employees</button></a>
            </div>
        </section>
    </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
    computed:{
        ...mapState(['userProfile'])
    },
    methods:{
        setViewEmployees(){
            this.$store.dispatch('setViewEmployees')
        }
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