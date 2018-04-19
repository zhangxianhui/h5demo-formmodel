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
    <div style="text-align:center;">
      <button @click="checkDetail">查询</button>
    </div>

  </div>
</template>


<script>
import { PopupPicker, Group, Datetime } from "vux";

export default {
  components: {
    PopupPicker,
    Group,
    Datetime
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
      ]
    };
  },
  methods: {
    checkDetail() {
      this.$router.push("/frmzyj/bljk/list");
    }
  },

  computed:{
    currentDate(){
      
    }
  },

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
#position{
  position: relative;
  top: -13px;
}
</style>