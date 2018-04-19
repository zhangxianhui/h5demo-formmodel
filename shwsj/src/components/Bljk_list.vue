<template>
  <div>
    <div>
      <ul class="list">
         <div class="clearfix">
            <p class="float-right">疑似病例数/总访诊人数</p>
        </div>
        <li v-for="item in list">
          <p>
            <span>{{item.title}}</span>
            <span class="float-right text-blue">{{item.result}}</span>
          </p>
          <p>{{item.template}}</p>
          <p>{{item.time}}</p>
        </li>
        
       
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return{
       list:[
         {
           title:"上海中治医院",
           result:"20/123",
           template:"其他：12",
           time:"2018年3月26日"
         },
          {
           title:"上海市第二人民医院 ",
           result:"36/136",
           template:"其他：无",
           time:"2018年3月27日"
         },
          {
           title:"上海中治医院",
           result:"20/123",
           template:"其他：12",
           time:"2018年3月26日"
         },
          {
           title:"上海市第二人民医院 ",
           result:"36/136",
           template:"其他：无",
           time:"2018年3月27日"
         }
        
       ],
       obj:{},
    }
  },
  created() {
    document.addEventListener("deviceready", onDeviceReady, false);
    function onDeviceReady() {
      MXWebui.setWebViewTitle("病例监控");
    }
    document.getElementsByTagName('title')[0].innerHTML = "病例监控";
    console.log(this.$route.path)
   

  },
  methods:{
    
  },
  activated(){
    document.getElementsByTagName('title')[0].innerHTML = "病例监控";
  }

};
</script>
<style scoped>
.float-right {
  float: right;
}
.float-left {
  float: left;
}
span.float-right{
  margin-right: 10px;
}
p.float-right {
  line-height: 30px;
  color:#6A6B6B;
  margin-right: 10px;
}
.clearfix::after {
  content: ".";
  display: block;
  height: 0;
  clear: both;
  visibility: hidden;
}
.list > li {
  padding: 10px;
  padding-bottom: 0;
  background-color: #fff;
}
.list > li > p:nth-child(1) > span {
  font-size: 16px;
}
.list > li > p:nth-child(2){
  font-size: 14px;
}
.list > li > p:nth-child(3){
  color:#707171;
  line-height: 22px;
  padding-bottom: 10px;
  border-bottom: 1px solid #E4E4E5;
}
.text-blue {
  color: #5479b8;
}
.text-red{
  color: red
}
.text-gray {
  color: #9B9B9B;
}
</style>
