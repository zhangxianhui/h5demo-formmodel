<template>
  <div class="wrap">
        <div class="title-box">
            <p class="title">特殊用户统计</p>
        </div>
        <div class="date-box">
            <span class="demonstration">选择时间：</span>
            {{start}}
            <el-date-picker v-model="start" type="date" placeholder="开始日期":picker-options="startDate"  value-format="timestamp">
            </el-date-picker>
            <span class="zhi">至</span>
            <el-date-picker v-model="end" type="date" placeholder="结束日期" :picker-options="endDate" value-format="timestamp">
            </el-date-picker>
            <span class="span-btn">查询</span>
        </div>
        <div>
            <el-table :data="list" style="width: 100%" stripe  @sort-change="handleSortChange" :default-sort="{prop: tableData.type, order: tableData.order}">
                <el-table-column prop="name" label="姓名"> </el-table-column>              
                <el-table-column prop="read" label="阅读数" sortable="false"></el-table-column>               
                <el-table-column prop="comment" label="评论数" sortable="false"> </el-table-column> 
                <el-table-column prop="comment" label="转发数" sortable="false"> </el-table-column>  
                <el-table-column prop="count1" label="转发+评论"> </el-table-column>              
                <el-table-column prop="count2"label="总合计"> </el-table-column>                                 
		        </el-table>
                 <el-pagination background @current-change="handleCurrentChange" :current-page="tableData.pageNum" :page-size="tableData.pageSize" :total="total" layout="total, prev, pager, next, jumper">
		        </el-pagination>
        </div>
        <model :show="isShowMOdel" @close="close" @save="save">
          <div slot="model-header">兑换设置</div>
          <div class="model-cont">
            <p class="model-span"><span>每次兑换扣除本次设置的积分数值</span></p>
            <p><input type="text" placeholder="请输入需要设置的积分兑换值" class="point-input" v-model="Pointinput"></p>
          </div>
        </model>
        <model :show="isShowConvert" @close="close" @save="save">
          <div slot="model-header">兑换积分确认</div>
          <div>
            <p>本次兑换需要扣除<span>{{pointValue}}</span></p>
          </div>
        </model>
      
  </div>
</template>
<script>
import Model from "@/components/Model";
export default {
  components:{
    Model
  },
   data() {
    const d = this.getDataByRoute();
    console.log('dddd =>', d);
    const ret = {
        list: [],
        total: 100,
        tableData: d,
        isShowMOdel: false,
        isShowConvert: false,
        pointValue: "100",
        Pointinput: "",
        userId: "",
        initOrder: {}
    };
    console.log('data ->', ret);
    return ret;
  },
  created(){
    // let arg = this.$route.query;
    //  this.getlist(arg);
    //  this.initPoint()
   
  },
  methods: {
    //分页
    handleCurrentChange: function(pageNum) {
      console.log("page===>", pageNum)
        const vm = this;
        const newQuery = {
            pageSize: vm.tableData.pageSize,
            pageNum,
        }
        vm.tableData.type && (newQuery.type = vm.tableData.type);
        vm.tableData.order && (newQuery.order = vm.tableData.order === 'ascending' ? 0 : 1);
        this.changeRoute(newQuery);
    },
    //点击排序
    handleSortChange: function({ column, prop, order }) {

        const vm = this;
        if (prop === vm.tableData.type && vm.tableData.type === order) return;
        const newQuery = { pageNum: 1, pageSize: vm.tableData.pageSize };
        if (prop) {
            newQuery.type = prop;
            newQuery.order = order === 'ascending' ? '0' : '1';        
        }
        this.changeRoute(newQuery);
    },
    //监听路由方法
    changeRoute(query) {
      this.$router.push({ query });
    },
    routeChange(query) {
        console.log('query change!', query);
        const arg = query.query
         console.log('arg change!', arg);
        this.tableData = this.getDataByRoute();
      //发送请求这里
        this.getlist(arg);
    },
    getDataByRoute() {
        const query = this.$route.query;
        const pageNum = query.pageNum ? Number(query.pageNum) : 1; //currentPage  当前页
        const pageSize = query.pageSize ? Number(query.pageSize) : 20;  //limit  每页条数
        const type = query.type || ''; // order  排序类型
        const order = query.hasOwnProperty('order') // descString   desc 排序字段 0 降 1 升
            ? query.order == 0
                ? 'ascending'
                : 'descending'
            : '';
        return {
            pageNum,
            pageSize,
            type,
            order
        }
    },
    //请求列表
    getlist(arg) {
      this.$get(`ordinaryUser`, arg).then(response => {
        this.list = response.vos;
        this.total = response.total;
        console.log("=================列表=====", response);
      });
      console.log("请求", arg);
    },
    //点击设置 弹框
    setPoint() {
      this.isShowMOdel = true;
    },

    close() {
      this.isShowMOdel = false;
      this.isShowConvert = false;
    },
    convertsave() {
      this.isShowConvert = false;
      this.getConver();
    },
    setPointSave() {
      this.isShowMOdel = false;
      this.pointValue = this.Pointinput;
      this.getsetPoint();
    },
    //请求设置积分接口
    getsetPoint() {
      this.$put(`updateIntegral?integralModification=${this.Pointinput}`).then(
        response => {
          console.log("=====", response);
        }
      );
      console.log("设置积分请求");
    },
    //请求兑换的接口
    getConver() {
      console.log("积分兑换请求", this.userId);
      console.log("积分兑换请求", this.pointValue);
      this.$put(
        `removeUserIntegralByUserId?userId=${this.userId}&integral=${
          this.pointValue
        }`
      ).then(response => {
        console.log("======================", response);
      });
    },
    //初始化积分值
    initPoint() {
      this.$get(`selectExchange`).then(response => {
        this.pointValue = response.exchange;
        console.log("======================", response);
      });
      console.log("初始化积分兑换值", this.pointValue);
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
.point-input{
   outline: none;
   padding:10px 0 10px  5px;
   width:80%;
   border:1px solid #ccc;
}
.model-span{
   text-align:left;
   margin-left:10%;
   color:red
}
.date-box{
    text-align:left;
    margin-bottom:20px;
}
.zhi{
    margin:0 5px;
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


