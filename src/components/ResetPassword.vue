<template>
    <section>
        <div class="modal">
            <div class="modal-content">
                <div @click="$emit('close')" class = "close"> Close</div>
                <h3> Reset Password </h3>
                <div v-if="!IsSuccess">
                    <p> Enter your email to reset your password</p>
                    <form @submit.prevent>
                        <input v-model.trim="email" type="email" placeholder="you@gmail.com"/>
                    </form>
                    <p v-if="errorMsg !== ''" class="error">{{ errorMsg }} </p>
                    <button @click="resetPassword()" class ="button2"> Reset </button>
                </div>
                <p v-else> Success! Check your email for password reset link</p>
            </div>
        </div>
    </section>
</template>

<script>
import { auth } from '@/firebase'
export default {
    data(){
        return{
            email: '',
            IsSuccess: false,
            errorMsg: ''
        }
    },
    methods: {
        async resetPassword(){
            this.errorMsg = ''

            try{
                await auth.sendPasswordResetEmail(this.email)
                this.IsSuccess = true
            }
            catch(error){
                this.errorMsg = error.message
            }
        }
    }
}
</script>

<style lang="scss">
    .button2{
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