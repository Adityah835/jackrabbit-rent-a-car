<template>
    <section>
        <div id = "dashboard">
            <div class = "col1">
                <h3>Inventory page</h3>
            </div>
            <div v-if = "carInventory.length">
                <div v-for = "(carInvent, index) in carInventory" :key="index" :title="carInvent.plateNo" class = "post">
                    <h5> {{carInvent.make}} {{carInvent.model}} </h5>
                    <p> <strong> Color : </strong> {{carInvent.color}} </p>
                    <p> <strong> License Plate No : </strong> {{carInvent.plateNo}} </p>
                    <p> <strong> Location : </strong> {{carInvent.location}} </p>
                    <p> <strong> Type : </strong> {{carInvent.type}} </p>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
import { mapState } from 'vuex'
export default {
    computed:{
        ...mapState(['carInventory']),
        
    }

}
</script>