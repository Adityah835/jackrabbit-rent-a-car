<template>
    <div id = "home">
        <section>
        <div class='col1'>
            <h3>Welcome!</h3>
            <h5>To the seamless car renting experience..</h5>
            
        </div>
        <div class='col2'>
            <img src = '../assets/car.jpg'/>
            <router-link to='rent-cars'> <button class="button"> Rent Cars </button> </router-link>
        </div>
        </section>
    </div>
</template>
<style lang="scss">
    .button{
        background-color: #30A0EE;
        color: white;
        margin-top: 10%;
        margin-left: 35%;
    }
</style>

