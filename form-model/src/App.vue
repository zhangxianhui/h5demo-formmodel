<template>
  <div id="app">
    <div class="nav">
      <router-link  to="/Drag">动态生成表单</router-link>
      <router-link  to="/Dialog">弹框复用</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
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
.nav{
  margin-bottom: 20px;
}
</style>
