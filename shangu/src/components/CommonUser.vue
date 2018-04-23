<template>
  <div class="wrap">
        <div class="title-box">
            <p class="title">普通用户统计</p>
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
            <el-table :data="tableData" style="width: 100%" stripe @sort-change="handleSortChange">
                <el-table-column prop="name" label="姓名"> </el-table-column>              
                <el-table-column prop="read" label="新闻阅读数" sortable="false"></el-table-column>               
                <el-table-column prop="comment" label="评论数" sortable="false"> </el-table-column>              
                <el-table-column prop="total"label="合计"> </el-table-column>                                 
		        </el-table>
                <el-pagination background @current-change="handleCurrentChange" :current-page="currentPage" :total="tableData.length" layout="total, prev, pager, next, jumper">
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
    return {
      tableData: [
        {
          name: "王建国",
          red: "王建国",
          comment: 1,
          total: "100"
        }, {
          name: "王建国",
          red: "王建国",
          comment: 1,
          total: "100"
        },
         {
          name: "王建国",
          red: "王建国",
          comment: 1,
          total: "100"
        },
         {
          name: "王建国",
          red: "王建国",
          comment: 1,
          total: "100"
        },
       
      ],
      pagesize: 10, //每页的数据条数
      currentPage: 1, //默认开始页面,
      isShowMOdel:false,
      isShowConvert:false,
      pointValue:500,
      Pointinput:'',
      initalQuery: {
        page:1,
        limit:10
      },
        start: '',
        end: '',
        startDate: {
            disabledDate: (time) => {
                if (this.end != "") {
                    return time.getTime() > Date.now() || time.getTime() > this.end;
                } else {
                    return time.getTime() > Date.now();
                }

            }
        },
        endDate: {
            disabledDate: (time) => {
                return time.getTime() < this.start || time.getTime() > Date.now();
            }
        },
    };
  },
  methods: {
    //跳页
    handleCurrentChange: function(currentPage) {
      const query = this.$route.query;
      console.log('query', query)
      const newQuery = {
        ...query,
        ...this.initalQuery,
        page: currentPage
      }
      console.log('newQuery', newQuery)      
       this.changeRoute(newQuery);
    },
    //点击排序
    handleSortChange: function({prop, order}) {

      const query = this.$route.query;
      const newQuery = prop
      ? {
          ...query,
          ...this.initalQuery,
          page: 1,
          orderBy: prop,
          desc: order === "ascending" ? 0 : 1
      }: this.initalQuery
      this.changeRoute(newQuery);
    },
    //监听路由方法
    changeRoute(query) {
      this.$router.push({query})
    },
    routeChange(query) {
      //发送请求这里
      console.log('route change', query)
    },
    //点击设置 弹框
    setPoint(){
      this.isShowMOdel = true
    },
    close(){
      this.isShowMOdel = false
      this.isShowConvert = false
    },
    save(){
       this.isShowMOdel = false
       this.pointValue = this.Pointinput
        this.isShowConvert = false
    },
    //操作 兑换
     handleConvert(index, row) {
        console.log(index, row);
         this.isShowConvert = true
      },
  },
  watch: {
    //监听路由变化调用方法
    '$route': 'routeChange'
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


