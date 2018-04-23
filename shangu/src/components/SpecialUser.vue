<template>
  <div class="wrap">
        <div class="title-box">
          <p class="title">特殊用户管理</p>
           <p class="point-span"><input type="text" placeholder="输入姓名和拼音"> <span class="span-btn" >添加</span></p>
        </div>
        <div>
            <el-table :data="tableData" style="width: 100%" stripe >
                <el-table-column prop="name" label="姓名">
                </el-table-column>
                <el-table-column prop="section" label="部门">
                </el-table-column>
                <el-table-column prop="job" label="职务" >
                </el-table-column>
                 <el-table-column prop="tel" label="电话" >
                </el-table-column>
                <el-table-column  label="操作">
                    <template slot-scope="scope">
                        <span @click="handleDel(scope.$index, scope.row)" class="handle">删除</span>
                    </template>
                </el-table-column>
		        </el-table>
            <el-pagination background @current-change="handleCurrentChange" :current-page="currentPage" :total="tableData.length" layout="total, prev, pager, next, jumper">
		        </el-pagination>
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
      tableData: [
        {
          name: "王建国",
          section: "王建国",
          job: 1,
          tel: 1234567890,
          handle: "删除"
        },

        {
          name: "司马",
          section: "司马",
          job: 1,
          tel: 1234567890,
          handle: "删除"
        },
        {
          name: "诸葛",
          section: "诸葛",
          job: 1,
          tel: 1234567890,
          handle: "删除"
        },
        {
          name: "欧阳",
          section: "欧阳",
          job: 1,
          tel: 1234567890,
          handle: "删除"
        },
        {
          name: "公孙",
          section: "公孙",
          job: 1,
          tel: 1234567890,
          handle: "删除"
        }
      ],
      pagesize: 10, //每页的数据条数
      currentPage: 1, //默认开始页面,
      isPonit: false,
      pointValue: 500,
      Pointinput: "",
      initalQuery: {
        page: 1,
        limit: 10
      }
    };
  },
  methods: {
    //跳页
    handleCurrentChange: function(currentPage) {
      const query = this.$route.query;
      console.log("query", query);
      const newQuery = {
        ...query,
        ...this.initalQuery,
        page: currentPage
      };
      console.log("newQuery", newQuery);
      this.changeRoute(newQuery);
    },
    //监听路由方法
    changeRoute(query) {
      this.$router.push({ query });
    },
    routeChange(query) {
      //发送请求这里
      console.log("route change", query);
    },
    //删除
    handleDel(index,row){
        console.log(index,row)
    }
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


