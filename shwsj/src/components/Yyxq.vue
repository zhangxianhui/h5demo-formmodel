
<template>
  <div class="wrap">
   <div><h1>上海瑞诚口腔医院</h1></div>
   <div class="text-cont">
      <p><span>高压高温灭菌检测：</span><span class="text-red">不合格</span></p>
      <p>2018年3月26日</p>
      <p><span>检测仪器编号：</span><span>BT1G112G01047</span></p>
      <p><span>检测设备编号：</span><span>BT1G112G01047</span></p>
      <p><span>检测原因：</span><span>温度不达标（设备温度134度，温度最 高13866度），时间不达标（设定时间240秒，维持时间170秒）</span>  
      </p>
   </div>
  </div>
</template>
<script>
export default {
  components: {},

  data() {
    return {};
  },
  created() {
    document.addEventListener("deviceready", onDeviceReady, false);
    function onDeviceReady() {
      MXWebui.setWebViewTitle("压力蒸汽灭菌");
    }
    document.getElementsByTagName('title')[0].innerHTML="压力蒸汽灭菌"
  },
  methods: {},
  activated(){
    document.getElementsByTagName('title')[0].innerHTML="压力蒸汽灭菌"
  },  
  computed: {}
};
</script>

<style scoped>
.wrap {
  background: #fff;
  padding: 20px;
}
.text-cont p {
  font-size: 18px;
  margin: 10px 0;
}

.text-cont p:nth-child(2) {
  margin: 20px 0;
}
.text-cont p span:nth-child(1) {
  color: #9b9b9b;
}
.text-red {
  color: red;
}
</style>