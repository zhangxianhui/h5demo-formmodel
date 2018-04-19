<template>
  <div>
    <div v-for="(item, index) in data" >
        <div class="list">
            <div class="checkdiv" v-if="conversation_id">
              <input type="checkbox" :id= item.FLOWID   class="input" :value =item.FLOWID  v-model="checkedNames">
              <label class="label" :for = item.FLOWID></label>
            </div>
            <div  @click="goDeatil(item.FLOWID)">
            <div class="head">
                    <div class="title">{{ item['事件标题'] }}</div>
                    <div class="creater"> <h3>创建人</h3></div>
                    <img src="../../assets/img/Rectangle.png" alt="" class="next-img">
                </div>
                <div class="footer">
                    <div class="left">
                    <div class="left_top">
                        <div class="num">
                        <span>事件编号：</span>
                        <span class="text_black">{{ item['事件单号'] }}</span>
                        </div>
                        <div class="time">
                        <span>发生时间：</span>
                        <span class="text_black">{{ item['转入时间'] }}</span>
                        </div>
                    </div>
                    <div class="left_bottom">
                        <!-- <div class="service">
                        <span>服务级别：</span>
                        <span class="text_black">{{ item.level }}</span>
                        </div>
                        <div class="status">
                        <span>事件状态：</span>
                        <span class="text_black">{{ item.status }}</span>
                        </div> -->
                    </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="resultdiv" v-if="conversation_id">
      <div><span>{{checkedNames.length}}</span><span class="line">/</span><span>4</span><span class="btn-span" @click="onShareClick">确定</span></div>
    </div>
  </div>
 
</template>

<script>
export default {
  props: ["item", "data"],
  data() {
    return {
      checkedNames: [],
      conversation_id: ''
    };
  },
created(){
 
},
mounted(){
  this.conversation_id = this.$route.query.conversation_id;
},
  methods: {
    goDeatil(flowID) { 
      // this.$emit("event", flowID);
      this.$router.push("/untreated/" + flowID);
    },
    //分享
    onShareClick(){
        const shareData = this.data.filter(item => {
          return this.checkedNames.indexOf(item['FLOWID']) > -1
        });
        window.MXCommon
          && window.MXCommon.getAppId
          && window.MXCommon.getAppId(appId => {
            appId = 'itil_test'  // 改
            Promise.all(shareData.map(item => {
              console.log('conversation id')
              console.log(`launchApp://${appId}/#/untreated/${item['FLOWID']}`)
                const body = {
                  // title: 'ITIL',
                  title:item['事件标题'],
                  app_url: `launchApp://${appId}?#untreated/${item['FLOWID']}`,
                  description:`launchApp://${appId}?#untreated/${item['FLOWID']}`,  // 改
                  // description: item['事件标题'], 
                  source_id: appId,
                  source_type: 'app',
                  // conversation_id: 20289007  // 改
                  conversation_id:this.conversation_id
                }
                return this.shareToChat(body);
              })).then(function() {
                MXWebui.closeWindow();
              })
          })
    },
    shareToChat(body) {
      return new Promise(resolve => {
        MXShare.shareToChatAuto(body, function success() {resolve()});
      })
    }
  },
  watch: {
    checkedNames(checkedNames) {
        if(checkedNames.length>4){
             checkedNames.pop();
        }
      console.log(checkedNames);

    }
  }
};
</script>

<style scoped>
.list {
  padding: 8px 0;
  margin: 0 12px;
  border-bottom: 1px solid #ddd;
}
.head {
  font-size: 14px;
  line-height: 22px;
  font-weight: 600;
  display: flex;
}
.title {
  flex: 11;
}
.creater {
  flex: 3;
  text-align: center;
  color: #1f7be0;
}
.creater h3 {
  color: #1f7be0;
}
.footer {
  display: flex;
  font-weight: 600;
  margin-top: 8px;
}
.left {
  flex: 11;
}
.left_top,
.left_bottom {
  display: flex;
}
.left_top .num,
.left_bottom .service {
  flex: 5;
}
.left_top .time,
.left_bottom .status {
  flex: 6;
}
.left span {
  color: #9b9ea6;
  font-size: 12px;
  line-height: 22px;
}
.left .text_black {
  color: #19191a;
}
.right {
  flex: 3;
}
.next-img {
  width: 10.3px;
  height: 18px;
  margin-top: 32.5px;
}

input[type="checkbox"] {
  display: none;
}
input[type="checkbox"] + label {
  display: inline-block;
  margin-top: 32.5px;
  margin-right: 10px;
  text-align: left;
}

label::before {
  content: "";
  display: inline-block;
  width: 11.5px;
  height: 11.5px;
  border: 1px solid #dddddd;

  background: #fff;

  background-size: 50px;
  border-radius: 50%;
}

input[type="checkbox"]:checked + label::before {
  width: 11.5px;
  height: 11.5px;

  background: #2f7dcd;

  background-size: 50px;
  border-radius: 50%;
}
.checkdiv {
  float: left;
}

.resultdiv{
  width: 100%;
  height: 44px;
  background: #F9F9F9 ;
  line-height: 44px;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
 
}
.resultdiv div{
 position: fixed;
  right: 0;
    bottom: 0;
}
.resultdiv span{
  font-size: 14.5px;
}
.btn-span{
  display: inline-block;
  width: 103px;
  height: 44px;
  background: #2F7DCD;
  text-align: center;
  line-height: 44px;
  cursor: pointer;
  margin-left: 14.25px;
  color: #fff
}
.line{
  display: inline-block;
  margin: 0 5px;
}
</style>
