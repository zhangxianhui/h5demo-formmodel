<template>
    <div class="wrap">
        <Header></Header>
        <div class="title">
            <ul>
              <p><img src="../../assets/data.png" alt="" class="data-icon"><span class="data-span">数据管理</span></p>
              <li v-for="item in list" @click="goPath(item.path)" :class='{active:url==item.path}' >{{item.title}}</li>
            </ul>
        </div>
       <div class="route">
           <router-view/>
       </div>
    </div>
</template>
<script>
import Header from '@/share/components/headers.vue';

export default {
    components:{ Header },
    data() {
        return {
        list: [
            { title: "积分管理", path: "/points_manage/points" },
            { title: "普通用户统计", path: "/points_manage/commonUserStat" },
            { title: "特殊用户统计", path: "/points_manage/specialUserStat" },
        ]
        
        }
    },
    created() {
        this.url = this.$route.path;
        console.log('url =>', this.url)
    },
    methods: {
        goPath(path) {
            this.$router.replace(path);
            this.url = this.$route.path;
        }
    }
};
</script>
<style scoped>
/* .title:after{
  content:".";
  visibility:hidden; 
  display:block;
  height:0;
  clear:both;
} */

.title{
  float: left;
  width: 200px;
}
.route{
  float: left;
  margin-top: -10px;
 width: calc(100% - 210px);
  
}
.title ul {
margin-left: -40px;
}
.title > ul > li {
  list-style: none;
  font-size: 16px;
  height: 35px;
  line-height: 35px;
  margin-right: 15px;
  padding: 0 10px;
  
}
.title .active {
 background: #2269B3;
 color: #F1F6FC
}
.data-icon{
  width: 25px;
  height: 25px;
  display: inline-block;
  vertical-align: middle;
}
.data-span{
  display: inline-block;
  vertical-align: middle;
  margin-left: 4px;
}
</style>

