<template>
  <div class="wrap">
        <div class="title-box">
            <p class="title">特殊用户统计</p>
        </div>
         <div class="date-box">
            <span class="demonstration">选择时间：</span>
            <el-date-picker v-model="timeStart" type="datetime" placeholder="开始日期" :picker-options="startDate" value-format="timestamp" >
            </el-date-picker>
            <span class="zhi">至</span>
            <el-date-picker v-model="timeEnd" type="datetime" placeholder="结束日期" :picker-options="endDate" value-format="timestamp">
            </el-date-picker>
            <span class="span-btn" @click="search">查询</span>
        </div>
        <div>
            <el-table :data="list" style="width: 100%" stripe  @sort-change="handleSortChange" :default-sort="{prop: tableData.type, order: tableData.descString}">
                <el-table-column prop="name" label="姓名"> </el-table-column>              
                <el-table-column prop="read" label="阅读数" sortable="false"></el-table-column>               
                <el-table-column prop="comment" label="评论数" sortable="false"> </el-table-column> 
                <el-table-column prop="forward" label="转发数" sortable="false"> </el-table-column>  
                <el-table-column prop="count1" label="转发+评论"> </el-table-column>              
                <el-table-column prop="count2"label="总合计"> </el-table-column>                                 
		    </el-table>
            <el-pagination background @current-change="handleCurrentChange" :current-page="tableData.pageNum" :page-size="tableData.pageSize" :total="total" layout="total, prev, pager, next, jumper">
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
    const d = this.getDataByRoute();
    console.log("dddd =>", d);
    const ret = {
      list: [],
      total: 100,
      tableData: d,
      isShowMOdel: false,
      isShowConvert: false,
      pointValue: "100",
      Pointinput: "",
      userId: "",
      initOrder: {},
      timeStart: "",
      timeEnd: "",
      startDate: {
        disabledDate: time => {
          let beginDateVal = this.timeEnd;
          if (beginDateVal) {
            return time.getTime() > beginDateVal;
          }
        }
      },
      endDate: {
        disabledDate: time => {
          let beginDateVal = this.timeStart;
          if (beginDateVal) {
            return time.getTime() < beginDateVal;
          }
        }
      }
    };
    console.log("data ->", ret);
    return ret;
  },
  created() {
    let arg = this.$route.query;
    this.getlist(arg);
  },
  methods: {
    //分页
    handleCurrentChange: function(page) {
        console.log("page===>", page);
        const vm = this;
        const newQuery = {
            pageNum: page,
            pageSize: vm.tableData.pageSize
        };
        vm.tableData.type && (newQuery.type = vm.tableData.type);
        vm.tableData.descString &&
            (newQuery.order = vm.tableData.descString === "ascending" ? 0 : 1);
        this.changeRoute(newQuery);
    },
    //点击排序
    handleSortChange: function({ column, prop, order }) {
        const vm = this;
        if (prop === vm.tableData.type && vm.tableData.descString === order)
            return;
        const newQuery = { pageNum: 1, pageSize: vm.tableData.pageSize };
        if (prop) {
            newQuery.type = prop;
            newQuery.order = order === "ascending" ? "0" : "1";
        }
        this.changeRoute(newQuery);
        console.log("newQuery===>", newQuery);
    },
    //监听路由方法
    changeRoute(query) {
        this.$router.push({ query });
    },
    routeChange(query) {
        console.log("query change!", query);
        const arg = query.query;
        console.log("arg change!", arg);
        this.tableData = this.getDataByRoute();
        //发送请求这里
        this.getlist(arg);
    },
    getDataByRoute() {
        const query = this.$route.query;
        console.log("数据变化====》", query);
        const pageNum = query.pageNum ? Number(query.pageNum) : 1; //currentPage  当前页
        const pageSize = query.pageSize ? Number(query.pageSize) : 20; //limit  每页条数
        const type = query.type || ""; // order  排序类型
        const descString = query.hasOwnProperty("order") // descString   desc 排序字段 0 降 1 升
            ? query.order == 0 ? "ascending" : "descending"
            : "";
        const timeStart = this.timeStart ? this.timeStart / 1000 : "";
        const timeEnd = this.timeEnd ? this.timeEnd / 1000 : "";
        return {
            pageNum,
            pageSize,
            type,
            descString,
            timeStart,
            timeEnd
        };
    },
    search() {
        const arg = this.getDataByRoute();
        console.log("查询", arg);
        this.getlist(arg);
    },
    //请求列表
    getlist(arg) {
        this.$get(`specialUser`, arg).then(response => {
        this.list = response.vos;
        this.total = response.total;
        console.log("=================列表=====", response);
        });
        console.log("请求", arg);
    },

    //操作 兑换
    handleConvert(index, row) {
      this.userId = row.id;
      console.log(index, row);
      this.isShowConvert = true;
    }
  },
  watch: {
    //监听路由变化调用方法
    $route: "routeChange"
  }
};
</script>
<style>
/* 表格 */
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
.el-table td,
.el-table th {
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
.title {
  font-size: 24px;
  color: #5a5957;
  text-align: left;
}
.title-box {
  border-bottom: 1px solid #cccccc;
  margin-bottom: 20px;
}
.point-span {
  margin-top: -6px;
  text-align: left;
}
.point-span span {
  margin: 0 5px;
}
.set {
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
  width: 80%;
  border: 1px solid #ccc;
}
.model-span {
  text-align: left;
  margin-left: 10%;
  color: red;
}
.date-box {
  text-align: left;
  margin-bottom: 20px;
}
.zhi {
  margin: 0 5px;
}
.span-btn {
  display: inline-block;
  width: 60px;
  height: 35px;
  line-height: 35px;
  background: #307dcd;
  border-radius: 5px;
  color: #f1f6fc;
  cursor: pointer;
  text-align: center;
}
</style>


