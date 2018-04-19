<template>
  <div class="wrap">
    <div class="head" v-for="(item,index) in data">
      <h3>{{ item['主题'] }}</h3>
      <div class="info">
        <div class="num">
          <span>事件单号：</span>
          <span class="text_black">{{ item['事件单号'] }}</span>
        </div>
        <div class="creator">
          <span>创建人：</span>
          <span class="text_blue" @click="onChatClick()">{{ item['创建人'] }}</span>
        </div>
      </div>
      <div class="info">
        <div class="time">
          <span>登记时间：</span>
          <span class="text_black">{{ item['登记时间'] }}</span>
        </div>
        <div></div>
      </div>
    </div>
    <div class="desc">
      <div>
        <div class="level">
          <span>紧急度：</span>
          <span class="text_black">{{ data.level || '低' }}</span>
        </div>
        <div class="influence">
          <span>影响度：</span>
          <span class="text_black">{{ data.Influence || '小' }}</span>
        </div>
        <div class="status">
          <span>事件状态：</span>
          <span class="text_black">{{ data.status || '处理中' }}</span>
        </div>
      </div>
      <div>
        <div class="type">
          <span>事件类别：</span>
          <span class="text_black">{{ data.type || '应用类' }}</span>
        </div>
        <div class="service">
          <span>服务级别：</span>
          <span class="text_black">{{ data.service || '其他类别' }}</span>
        </div>
      </div>
    </div>
    <div class="detail" v-for="(item, index) in data" >
      <h6>详情描述</h6>
      <p>{{item['详细描述']}}</p>
    </div>
    <div class="attach">
      <h6>附件</h6>
      <attach-item></attach-item>
    </div>
    <div class="upload">
      <div class="btn-wrap">
        <div @click="uploadFile">上传文件</div>
        <div @click="uploadImg">上传照片</div>
      </div>
    </div>
    <div class="img">
      <h6>我上传的</h6>
      <img-item v-for="(item, index) in imgArr" :key="index" @event="del(item.id)" :item='item'></img-item>
    </div>
    <div class="process">
      <h6>处理过程</h6>
      <process-component :messdata='messdata'></process-component>
    </div>
    <div class="btn">
      <div>
        <div>提交</div>
        <div>暂存</div>
        <div>补充意见</div>
        <div class="back">退回</div>
      </div>
    </div>
  </div>
</template>

<script>
import attachItem from "./common/attach_item_tpl";
import imgItem from "./common/img_item_tpl";
import processComponent from "./common/process_tpl"; 

import {
  FlowGetIssuesMock,
  FlowGetMessageMock,
  FlowGetIssues,
  FlowGetMessage
} from "../http/getUndoList";

export default {
  components: {
    attachItem,
    imgItem,
    processComponent
  },
  data() {
    return {
      data: [],
      messdata: [],

      imgArr: [
        { id: 1, uuId: "12n12jk12n4k", title: "test" },
        { id: 2, uuId: "12n12jk1asd4", title: "test" },
        { id: 3, uuId: "12ret2jk12nk", title: "test" }
      ]
      // item: [{ id: 6 }, { id: 5 }, { id: 4 }, { id: 3 }, { id: 2 }, { id: 1 }]
    };
  },
  mounted() {
    console.log(this.$route.path)
    this.getData();
  },
  methods: {
    uploadFile() {
      alert("上传文件");
    },
    uploadImg() {
      alert("上传图片");
    },
    getData() {
      var flowId = this.$route.params.flowId;
      var funcA = FlowGetIssues  //真实数据
        // process.env.NODE_ENV === "development"
        //   ? FlowGetIssuesMock
        //   : FlowGetIssues;
      var funcB = FlowGetMessage
        // process.env.NODE_ENV === "development"
        //   ? FlowGetMessageMock
        //   : FlowGetMessage;


      Promise.all([funcA(flowId), funcB(flowId)]).then(result => {
        this.data = result[0];
        document.getElementsByTagName('title')[0].innerHTML = this.data[0]['主题'];
        this.messdata = result[1];
      })
    },
    onChatClick() {
        console.log('发起聊天!');
        MXChat.chat && MXChat.chat(['zhaoxiaohang'], function() {});
    }
  },
  created() {
    document.addEventListener("deviceready", onDeviceReady, false);
    function onDeviceReady() {
      MXWebui.setWebViewTitle("内容详情");
    }
  }
};
</script>

<style scoped>
.wrap {
  background-color: #f1f1f1;
}
.head,
.desc,
.detail,
.attach,
.img,
.process {
  padding: 10px 10px;
  background-color: #fff;
}
.head > h3 {
  font-size: 18px;
  line-height: 26px;
  font-weight: 600;
}
.info {
  display: flex;
  margin-top: 10px;
}
.info > .num {
  flex: 5;
}
.info > .creator {
  flex: 3;
}
.info span {
  font-size: 15px;
  font-weight: 600;
  color: #9b9ea6;
}
.info .text_black,
.desc .text_black {
  color: #2b2c38;
}
.creator .text_blue {
  color: #2b69bf;
}
.desc,
.detail {
  margin-top: 10px;
}
.desc > div {
  display: flex;
}
.desc > div > .level {
  flex: 2;
}
.desc > div > .influence {
  flex: 2;
}
.desc > div > .status {
  flex: 3;
}
.desc > div > .type {
  flex: 3;
}
.desc > div > .service {
  flex: 4;
}
.desc span {
  font-size: 15px;
  font-weight: 600;
  color: #9b9ea6;
  line-height: 30px;
}
.detail > h6 {
  font-size: 15px;
  margin-bottom: 12px;
  color: #9b9ea6;
}
.detail > p {
  font-size: 15px;
  font-weight: 600;
  line-height: 28px;
  text-align: justify;
}
.attach,
.img,
.process {
  margin-top: 10px;
}
.attach h6,
.img h6,
.process h6 {
  font-size: 15px;
  padding-bottom: 10px;
  color: #90949d;
  border-bottom: 1px solid #ccc;
}
.upload {
  background-color: #fff;
  border-top: 1px solid #ccc;
}
.btn-wrap {
  display: flex;
}
.btn-wrap > div {
  flex: 1;
  text-align: center;
  font-size: 14px;
  color: #2b69bf;
  font-weight: 600;
  line-height: 40px;
}
.img {
  width: 100%;
  box-sizing: border-box;
}
.btn {
  margin-top: 10px;
}
.btn > div {
  display: flex;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
}
.btn > div > div {
  flex: 1;
  height: 45px;
  line-height: 45px;
  font-size: 16px;
  font-weight: 600;
  color: #39393a;
  text-align: center;
  background-color: #fff;
  border-right: 1px solid #ccc;
}
.btn .back {
  border-right: none;
  color: #d10a2b;
}
</style>

