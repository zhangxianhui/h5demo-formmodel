
<template>
  <div>
    <group>
      <popup-picker title="上海市" :data="list" v-model="value" placeholder="请选择区县"></popup-picker>
    </group>
    <div class="input">
      <input type="text" placeholder="请输入单位名称">
    </div>
    <group id="position">
      <datetime title="开始时间" v-model="value2"></datetime>
      <datetime title="结束时间" v-model="value3"></datetime>
    </group>
    <div>
      <p class="check-title">检查项目</p>
    </div>
    <div class="checkbox">
      <div v-for="(item,index) in check" :key="index" >
        <input type="checkbox"  :id=index class="inputcheck"  @click="checkstate(item.state)" v-model="item.state">
        <label :for=index class="label"><span class="span">{{item.title}}</span></label>
     </div>
    </div>
    <div style="text-align:center;">
      <button @click="checkDetail(check)">查询</button>
    </div>
  </div>
</template>
<script>
import { PopupPicker, Group, Datetime, CheckIcon } from "vux";

export default {
  components: {
    PopupPicker,
    Group,
    Datetime,
    CheckIcon
  },

  data() {
    return {
      value: ["黄浦区"],
      value2: "",
      value3: "",
      list: [
        [
          "黄浦区",
          "徐汇区",
          "长宁区",
          "静安区",
          "普陀区",
          "虹口区",
          "杨浦区",
          "崇明区"
        ]
      ],
      disinfect: false,
      sterilize: true,
      inputcheck: "",

      check: [
        { title: "紫外消毒", state: false },
        { title: "高压高温灭菌", state: false }
      ]
    };
  },
  created() {
    document.addEventListener("deviceready", onDeviceReady, false);
    function onDeviceReady() {
      MXWebui.setWebViewTitle("紫外线和压力蒸汽灭菌");
    }
    document.getElementsByTagName("title")[0].innerHTML =
      "紫外线和压力蒸汽灭菌";
  },
  methods: {
    checkDetail(check) {
      this.$router.push("/ylzqmjList");
    },

    checkstate(item) {
      item = !item;

      console.log(item);
    }
  },
  activated() {
    document.getElementsByTagName("title")[0].innerHTML =
      "紫外线和压力蒸汽灭菌";
  },
  computed: {
    currentDate() {}
  }
};
</script>

<style scoped>
.input > input {
  margin-top: 10px;
  display: inline-block;
  width: 100%;
  height: 40px;
  padding-left: 16px;
  font-size: 16px;
  border: none;
  outline: none;
  box-sizing: border-box;
}
button {
  display: inline-block;
  width: 90%;
  height: 40px;
  line-height: 40px;
  margin: 30px auto;
  color: #fff;
  font-size: 20px;
  background-color: #5479b8;
  border-radius: 5px;
  border: none;
  outline: none;
}
#position {
  position: relative;
  top: -13px;
}

.checkbox div {
  background: #fff;
  margin: 1px 0;
  padding-left: 5px;
}
.check-title {
  margin: -2px 0 10px 13px;
  font-size: 15px;
}
.inputcheck[type="checkbox"] {
  display: none;
}

.inputcheck[type="checkbox"] + label {
  display: inline-block;

  margin: 0px 5px 5px 2px;
}

.label::before {
  content: "";
  display: inline-block;
  width: 40px;
  height: 40px;
  background: url("../assets/BAI-false.png")no-repeat center;
  background-position: -2px 5px;
  background-size: 40px;
}

.inputcheck[type="checkbox"]:checked + label::before {
  width: 40px;
  height: 40px;
  background: url("../assets/BAI-true.png")no-repeat center;
  background-position: -2px 5px;
  background-size: 40px;
}
.span {
  position: relative;
  top: -10px;
}
</style>