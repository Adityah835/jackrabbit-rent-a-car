<template>
    <section>
        <div class="modal">
            <div class="modal-content">
                <h3> Delete Account </h3>
                
                <div v-if="!IsSuccess">
                    <p> </p>
                    <h5> Hi {{userProfile.firstname}}! Are you sure you want to delete your account?</h5>
                    <p> </p>
                    <p v-if="errorMsg !== ''" class="error">{{ errorMsg }} </p>
                    <button @click="deleteAccount()" class ="btn3_critical"> Delete Account </button>
                    <button @click="$emit('close')" class ="btn3"> Cancel </button>
                </div>
                <div v-else> 
                    <p> Your account has been deleted. We will miss you!</p>
                    <button @click="$emit('close'), Refresh()" class = "btn3"> Close </button>
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
        ...mapState(['userProfile'])
    },
    methods: {
        async deleteAccount(){
            this.errorMsg = ''

            try{
                await fb.usersCollection.doc(fb.auth.currentUser.uid).delete()
                await fb.auth.currentUser.delete()
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