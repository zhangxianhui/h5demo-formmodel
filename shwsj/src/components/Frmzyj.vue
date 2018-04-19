<template>
    <div class="wrap">
        <div class="title">
            <ul>
              <li v-for="(item) in  list" @click="goYzfj(item.path)" :class='{active:url==item.path}' >{{item.title}}</li>
              <li>环境卫生</li>
              <li>紫外照度</li>
              <li>手术门诊</li>
            </ul>
        </div>
        <!-- <router-view/> -->
        <keep-alive>
        <router-view/>
        </keep-alive>
    </div>
</template>
<script>
export default {
  data() {
    return {
      list: [
        { title: "预检分诊", path: "/frmzyj/yjfz" },
        { title: "病例监控", path: "/frmzyj/bljk" },
      ],
      path: ""
    };
  },
  created() {
    document.addEventListener("deviceready", onDeviceReady, false);
    function onDeviceReady() {
      MXWebui.setWebViewTitle("发热门诊预检");
    }
    this.url = this.$route.path;
    console.log(this.url);
   document.getElementsByTagName('title')[0].innerHTML = "发热门诊预检";
  },
  mounted() {
    console.log(111444)
   
  },
  activated() {
    this.goYzfj(this.path);
    this.url = this.$route.path;
    document.getElementsByTagName('title')[0].innerHTML = "发热门诊预检";
    console.log("111");
    console.log(this.$route.path);
  },
  deactivated() {
    console.log("22");
  },
  methods: {
    goYzfj(path) {
      this.path = path;
      this.$router.replace(path);
       this.url = path;
     // console.log(this.url);
    }
  },
  computed: {},
  watch: {
    path(path){
       console.log("路径发生变化1")
       console.log(path)
      // this.url = path;
       console.log("路径发生变化2")
    }
  }
};
</script>
<style scoped>
.wrap {
  width: 100%;
  height: 100%;
}
.title {
  padding: 0 10px;
  background-color: #eff6f7;
  overflow-x: scroll;
  width: 100%;
  white-space: nowrap;
  border-bottom: 1px solid #ccc;
  box-sizing: border-box;
}
.title > ul > li {
  font-size: 16px;
  height: 35px;
  line-height: 35px;
  margin-right: 15px;
  display: inline-block;
}
.title .active {
  color: #5479b8;
  border-bottom: 1px solid #5479b8;
}
</style>
