<template>
    <div id="signup-form">
        <section>
            <form @submit.prevent>
                <div class = "col1">
                <h1>PickUp - Please enter the Credit/Debit card information </h1>
                </div>
                <div class = "col2">
                <div>
                    <label>First Name</label>
                    <p v-if="FirstNameErrorMsg != ''" class="error"> {{FirstNameErrorMsg}} </p>
                    <input v-model.trim="signupForm.firstname" type="text" placeholder = "John" id="firstname"/>
                </div>
                <div>
                    <label>Last Name</label>
                    <p v-if="LastNameErrorMsg != ''" class="error"> {{LastNameErrorMsg}} </p>
                    <input v-model.trim="signupForm.lastname" type="text" placeholder = "Doe" id="lastname"/>
                </div>
                
                <div>
                    <label>Credit Card Number</label>
                    <p v-if="CardNumberErrorMsg != ''" class="error"> {{CardNumberErrorMsg}} </p>
                    <input v-model.trim="signupForm.cardno" type="text" placeholder = "XXXX-XXXX-XXXX-XXXX" id="email2"/>
                </div>
                <div>
                    <label>Expiry date</label>
                    <p v-if="ExpiryErrorMsg != ''" class="error"> {{ExpiryErrorMsg}} </p>
                    <input v-model.trim="signupForm.expdate" type="text" placeholder = "mm/yy" id="password2"/>
                </div>
                <div>
                    <label>CVV2</label>
                    <p v-if="CVVErrorMsg != ''" class="error"> {{CVVErrorMsg}} </p>
                    <input v-model.trim="signupForm.cvv2" type="text" placeholder = "###" id="phoneno"/>
                </div>

                <button class="btn4" @click="processPayment()"> Pay </button>
                <div class="extras">
                    <router-link to="view-reservations">Back to View Reservations</router-link>
                </div>
                </div>
            </form>
        </section>
    </div>
</template>

<script>
import router from '../router/index'
export default {
    data(){
      return {
        signupForm:{
            firstname: '',
            lastname: '',
            cardno: '',
            expdate:'',
            cvv2:''
        },
        FirstNameErrorMsg: '',
        LastNameErrorMsg: '',
        CardNumberErrorMsg: '',
        ExpiryErrorMsg: '',
        CVVErrorMsg: '',
      }  
    },
    methods:{
        processPayment(){

            this.FirstNameErrorMsg = ''
            this.LastNameErrorMsg = ''
            this.CardNumberErrorMsg = ''
            this.ExpiryErrorMsg = ''
            this.CVVErrorMsg = ''
            
            if(this.IsFormValid() == true){

                router.push('/payment-success')
                
            }
        },
        IsFormValid(){
            
            this.IsFirstNameValid()
            this.IsLastNameValid()
            this.IsCardNumberValid()
            this.IsExpiryValid()
            this.IsCVVValid()

            if(this.FirstNameErrorMsg == '' 
            && this.LastNameErrorMsg == ''
            && this.CardNumberErrorMsg == ''
            && this.ExpiryErrorMsg == ''
            && this.CVVErrorMsg == '')
            {
                return true
            }
            else{
                return false
            }
            
        },
        IsFirstNameValid(){
            var letters = /^[A-Za-z]+$/;
            if(this.signupForm.firstname.length < 2){
                this.FirstNameErrorMsg = 'First Name too short! Must be atleast 2 characters'
            }
            else if(!this.signupForm.firstname.match(letters)){
                this.FirstNameErrorMsg = 'First Name must only contain letters'
            }
        },
        IsLastNameValid(){
            var letters = /^[A-Za-z]+$/;
            if(this.signupForm.lastname.length < 2){
                this.LastNameErrorMsg = 'Last Name too short! Must be atleast 2 characters'
            }
            else if(!this.signupForm.firstname.match(letters)){
                this.LastNameErrorMsg = 'Last Name must only contain letters'
            }
        },
        IsCardNumberValid(){
            if(this.signupForm.cardno.length != 12)
            {
                console.log(this.signupForm.cardno.length)
                this.CardNumberErrorMsg = 'Card Number must 12 digits long'
            }
        },
        IsExpiryValid(){
            if(/^\d{1,2}\/\d{1,2}$/.test(this.signupForm.expdate) == false){
                this.ExpiryErrorMsg = 'Invalid expiry date format (mm/yy)'
            }
            else{
                
                var parts = this.signupForm.expdate.split("/");
                var month = parseInt(parts[0], 10)
                var year = parseInt(parts[1], 10)

                if(year < 20 || year > 30 || month == 0 || month > 12){
                    this.ExpiryErrorMsg = 'Invalid expiry date'
                }
            
            }

            
        },
        IsCVVValid(){
            console.log(this.signupForm.cvv2)
            if(this.signupForm.cvv2.length != 3){
                this.CVVErrorMsg = 'CVV2 must be 3 digits long'
            }
        }
    }
}
</script>
<style lang="scss">
    .option-select{
        width: 100%;
        height: 10%;
        font-size: 15px;
    }
    .error {
        color: tomato;
        font-size: 12px;
    }

    $critical: rgb(201, 0, 0);

    .btn4{
        background: #30A0EE;
        border: 0;
        outline: 0;
        color: white;
        padding: 0.8rem 1rem;
        min-width: 150px;
        font-size: 16px;
        border-radius: 3px;
        margin-left: 35%;
        margin-top: 2%;
        margin-bottom: 2%;
        
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