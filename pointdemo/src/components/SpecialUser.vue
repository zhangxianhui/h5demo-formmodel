<template>
  <div class="wrap">
        <div class="title-box">
          <p class="title">特殊用户管理</p>
           <p class="point-span"><input type="text" placeholder="输入姓名和拼音"> <span class="span-btn" >添加</span></p>
        </div>
      
       
      
  </div>
</template>
<script>
import Model from "@/components/Model";
export default {
  components: {
    Model
  },
  data() {
    return {
    

    }
  },
  methods: {
   
  },
  watch: {
    //监听路由变化调用方法
    $route: "routeChange"
  }
};
</script>

<style>
.el-table th > .cell {
  position: relative;
  word-wrap: normal;
  text-overflow: ellipsis;
  vertical-align: middle;
  width: 100%;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  text-align: center;
  color: #f1f6fc;
}
.el-table th {
  white-space: nowrap;
  overflow: hidden;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  text-align: left;
  background: #2269b3;
}
.el-pagination {
  white-space: nowrap;
  padding: 2px 5px;
  color: #303133;
  font-weight: 1000;
  margin: 50px 20px;
}
.el-table td, .el-table th {
    padding: 6px 0;
    min-width: 0;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    text-overflow: ellipsis;
    vertical-align: middle;
    position: relative;
}
</style>

<style scoped>
.wrap {
  margin-left: 20px;
}
.title-box {
  border-bottom: 1px solid #cccccc;
  margin-bottom: 30px;
}
.title-box:after {
  content: ".";
  display: block;
  clear: both;
}
.title {
  font-size: 24px;
  color: #5a5957;
  text-align: left;
}
.point-span {
  margin-top: -6px;
  text-align: left;
}
.point-span span {
  margin: 0 5px;
}
.span-btn {
  display: inline-block;
  width: 60px;
  height: 30px;
  line-height: 30px;
  background: #307dcd;
  border-radius: 5px;
  color: #f1f6fc;
  cursor: pointer;
  text-align: center;
}
.point-input {
  outline: none;
  padding: 10px 0 10px 5px;
  width: 50%;
  border: 1px solid #ccc;
}
.point-span {
  float: right;
  /* margin-top:px; */
}
input {
  padding: 8px;
  border-radius: 5px;
  outline: none;
  /* width: 0; */
  border-width: 0;
  background: #ccc;
  width: 100px;
}
.handle{
  cursor: pointer;
  color:#5D8FED;
}
</style>


