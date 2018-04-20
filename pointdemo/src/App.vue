<template>
  <div id="app">
    <top-view></top-view>
    <!-- <side-menu></side-menu> -->
    <router-view/>
  </div>
</template>

<script>
import TopView from '@/components/TopView'


export default {
  components:{
    TopView,
    
 
  },
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;

}

</style>
