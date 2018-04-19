<template>
  <div id="app">
 <keep-alive>
    <router-view />
  </keep-alive>
  <!-- <router-view></router-view> -->
 

  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app{
  width:100%;
  height: 100%;
  color: #313131;
  background-color: #EBECF0;
}
</style>
