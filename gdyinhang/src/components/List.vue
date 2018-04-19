<template>
    <div>
        <div class="head">
            <div :class="{active:isActive}" @click="jumpToUntreated">待办</div>
            <div :class="{active:!isActive}" @click="jumpToCompleted">已办</div>
        </div>
        <router-view/>
    </div>
</template>

<script>

export default {
  data() {
    return {};
  },
  computed: {
    isActive() {
        var vm = this;
        var routerName = vm.$route.name;
        if(routerName === 'untreated'){
            return true
        }
        if(routerName === 'completed'){
            return false
        }
    }
  },
  methods:{
      jumpToUntreated(){
          const conversation_id = this.$route.query.conversation_id;
          const url = conversation_id ? `/untreated?conversation_id=${conversation_id}`: '/untreated';
          this.$router.push(url);
      },
      jumpToCompleted(){
          const conversation_id = this.$route.query.conversation_id;
          const url = conversation_id ? `/completed?conversation_id=${conversation_id}`: '/completed';
          this.$router.push(url);
      }
  }
};
</script>

<style scoped>
.head {
  display: flex;
  background-color: #f9f9f9;
  border-bottom: 1px solid #ddd;
}
.head > div {
  height: 50px;
  line-height: 50px;
  font-size: 20px;
  font-weight: 600;
  text-align: center;
  flex: 1;
}
.active {
  color: #1f7be0;
  border-bottom:1px solid #1f7be0;
}
</style>
