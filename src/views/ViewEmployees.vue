<template>
    <section>
        
        <div id = "dashboard">
            <div class = "col1">
                <h1>Hi {{userProfile.firstname}}! Below are the current employees</h1>
            </div>
            
            <div v-if = "employees.length">
                <div v-for= "employee in employees" :key= "employee.email" class ="post" >
                    <h5 v-if="employee.email == userProfile.email"> {{ employee.firstname }} {{employee.lastname}} (Self) </h5>
                    <h5 v-else> {{ employee.firstname }} {{employee.lastname}} </h5>
                    <p v-if= "employee.isAdmin"> <strong> Account Type: </strong> Admin </p>
                    <p v-if= "employee.isEmployee"> <strong> Account Type: </strong> Employee </p>
                    <p v-if= "employeeDetailsEmail === employee.email"> <strong>Email:</strong> {{ employee.email }}</p>
                    <p v-if= "employeeDetailsEmail === employee.email"> <strong>Phone No:</strong> {{ employee.phoneno }} </p>
                    <ul class="align-right" v-if= "employeeDetailsEmail === employee.email">
                        <li><a> Modify Employee Details </a></li>
                        <li><a class="a-critical"> Delete Employee </a></li>
                    </ul>
                    <a v-if= "employeeDetailsEmail === employee.email" v-on:click="toggleShow(employee)"> Less </a>
                    <a v-else v-on:click="toggleShow(employee)"> More </a>
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

export default {
    computed:{
        ...mapState(['userProfile', 'employees'])
    },
    data(){
        return {
            //showDeleteReservation: false,
            employeeDetailsEmail: '',
        }
    },
    methods:{
        toggleShow(employee){
            if(this.employeeDetailsEmail == ''){
                this.employeeDetailsEmail = employee.email
            }
            else{
                this.employeeDetailsEmail = ''
            }
        }
           
        
    }
}

</script>
