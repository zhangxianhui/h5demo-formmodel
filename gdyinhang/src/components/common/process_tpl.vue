<template>
    <div class="pro-wrap">
        <div class="pro" v-for="(item, index) in messdata" :key="index" v-if="(showDetail || index<3)">
            <div class="node clearfix">
                <!-- <span>环节处理{{item.id}}</span> -->
                <span>环节处理人: <span v-if="item.处理人 == null">null</span>{{item['处理人']}}  </span>
                 <span>意见:<span v-if="item.意见 == null">null</span>{{item['意见']}}</span>
            </div>
            <div class="time">
                 <span>{{item['转入时间']}}</span>
            </div>
        </div>
        <div v-if="!showDetail" class="open" @click="open"><span></span>展开</div>
        <div v-if="showDetail" class="close" @click="close"><span></span>关闭</div>
    </div>
</template>
<script>
export default {
  props: ["messdata"],
  data() {
    return {
      showDetail: false
    };
  },
  methods:{
      open(){
          this.showDetail = !this.showDetail;
      },
      close(){
          this.showDetail = !this.showDetail;
      }
  }
};
</script>
<style scoped>
.pro-wrap > div:nth-child(1) > .node {
  color: #3f7cd8;
}
.pro {
  padding-bottom: 10px;
  border-bottom: 1px solid #ccc;
}
.node > span {
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  margin-top: 8px;
}
.node > span:nth-child(1) {
  float: left;
}
.node > span:nth-child(2) {
  float: right;
}
.clearfix::after {
  display: block;
  content: "";
  visibility: hidden;
  clear: both;
  height: 0;
}
.time {
  color: #9ca1aa;
  font-size: 13px;
}
.open,.close{
    font-size: 15px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    font-weight: 600;
    color: #9ca1aa;
    position: relative;
    top:-5px;
}
.open > span{
    display: inline-block;
    width: 30px;
    height: 30px;
    background-image: url(../../assets/img/open.png);
    background-position: 12px 18px;
    background-repeat: no-repeat;
    background-size: 15px;
}
.close > span{
    display: inline-block;
    width: 30px;
    height: 30px;
    background-image: url(../../assets/img/close.png);
    background-position: 12px 18px;
    background-repeat: no-repeat;
    background-size: 15px;
}
</style>
