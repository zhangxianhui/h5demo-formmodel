<template>
  <div class="wrap">
       <div class="title-box">
            <p class="title">积分管理</p>
            <p class="point-span"><span>积分兑换值</span><span>{{pointValue}}</span> <span class="set" @click="setPoint">设置</span></p>
       </div>
        <div>
            <el-table :data="list" style="width: 100%" stripe  @sort-change="handleSortChange" :default-sort="{prop: tableData.type, order: tableData.descString}">
                <el-table-column prop="name" label="姓名">
                </el-table-column>
                <el-table-column prop="shortName" label="部门">
                </el-table-column>
                <el-table-column prop="integral" label="积分" sortable="false">
                </el-table-column>
                <el-table-column  label="操作">
                    <template slot-scope="scope">
                        <span @click="handleConvert(scope.$index, scope.row)" class="handle">兑换</span>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination background @current-change="handleCurrentChange" :current-page="tableData.pageNum" :page-size="tableData.pageSize" :total="total" layout="total, prev, pager, next, jumper">
            </el-pagination>
        </div>
        <model :show="isShowMOdel" @close="close" @save="setPointSave">
          <div slot="model-header">兑换设置</div>
          <div class="model-cont">
            <p class="model-span"><span>每次兑换扣除本次设置的积分数值</span></p>
            <p><input type="text" placeholder="请输入需要设置的积分兑换值" class="point-input" v-model="Pointinput"></p>
          </div>
        </model>
        <model :show="isShowConvert" @close="close" @save="convertsave">
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
  components: {
    Model
  },
  data() {
    const d = this.getDataByRoute();
    // console.log('dddd =>', d);
    const ret = {
        list: [],
        total: 50,
        tableData: d,
        isShowMOdel: false,
        isShowConvert: false,
        pointValue: "100",
        Pointinput: "",
        userId: "",
        initOrder: {}
    };
    // console.log('data ->', ret);
    return ret;
  },
  created(){
    let arg = this.$route.query;
    // console.log("刷新",arg)
      this.getlist(arg);
      this.initPoint()
  },
  methods: {
    //分页
    handleCurrentChange: function(page) {
        const vm = this
        const newQuery = {
            pageNum:page,
            pageSize: vm.tableData.pageSize,
        };
        vm.tableData.type && (newQuery.type = vm.tableData.type);
        vm.tableData.descString && (newQuery.order = vm.tableData.descString === 'descending' ? 0 : 1);
        this.changeRoute(newQuery);
    },
    //点击排序
    handleSortChange: function({ column, prop, order }) {
        const vm = this;
        if (prop === vm.tableData.type && vm.tableData.descString === order) return;
        const newQuery = { pageNum: 1, pageSize: vm.tableData.pageSize };
        if (prop) {
            newQuery.type = prop;
            newQuery.order = order === 'descending' ? '0' : '1';        
        }
        this.changeRoute(newQuery)
    },
    //监听路由方法
    changeRoute(query) {
      this.$router.push({ query });
    },
    routeChange(query) {
        console.log('query change!', query);
        const arg = query.query;
        this.tableData = this.getDataByRoute();
      //发送请求这里
      this.getlist(arg);
    },
    getDataByRoute() {
        const query = this.$route.query;
        // console.log("数据变化====》",query)
        const pageNum = query.pageNum ? Number(query.pageNum) : 1; 
        const pageSize = query.pageSize ? Number(query.pageSize) : 20; 
        const type = query.type || ''; 
        const descString = query.hasOwnProperty('order')
            ? query.order == 0
                ? 'descending'
                : 'ascending'
            : '';
        return {
            pageNum,
            pageSize,
            type,
            descString
        }
    },
    //请求列表
    getlist(arg) {
      this.$get(`queryList`, arg).then(response => {
        this.list = response.vos;
        this.total = response.total;
        console.log("=========列表=====", response);
      })
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
      this.getsetPoint()
    },
    //请求设置积分接口
    getsetPoint() {
      this.$put(`updateIntegral?integralModification=${this.Pointinput}`).then(
        response => {
          this.pointValue = this.Pointinput;
          this.$message({
            showClose: true,
            message:response.message,
            type: 'success'
          })
        }
      )
    },
    //请求兑换的接口
    getConver() {
        this.$put(`removeUserIntegralByUserId?userId=${this.userId}&integral=${this.pointValue}`).then(
            response => {

            this.$message({
                    showClose: true,
                    message:response.message,
                    type: 'success'
                })
        }) .catch(error => {
                const errmess = error.response.data.errors.message
                if(error.response.data.errors){
                    this.$message({
                        showClose: true,
                        message:errmess,
                        type: 'warning'
                    })
                }
        })
    },
    //初始化积分值
    initPoint() {
      this.$get(`selectExchange`).then(response => {
        this.pointValue = response.exchange;
      })
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
.handle {
  cursor: pointer;
}
</style>


