<template>
  <div id="app">
    <Navbar></Navbar>
    <router-view/>
  </div>
</template>

<script>
import Navbar from './components/Nav.vue'
export default {
  components:{
    'Navbar' : Navbar
  }
}
</script>
