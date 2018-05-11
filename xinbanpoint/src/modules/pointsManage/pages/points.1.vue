<template>
  <div class="wrap">
       <div class="title-box">
            <p class="title">积分管理</p>
            <p class="point-span"><span>积分兑换值</span><span>{{pointValue}}</span> <span class="set" @click="setPoint">设置</span></p>
             <p class="search-p">
                <input type="text" class="search-input" placeholder="输入姓名或拼音查询" v-model="nameStr" @keyup.enter="searchName(nameStr)">
                <span class="search" @click="nameSearch(nameStr)">查询</span>
                 <span class="search" @click="reset(nameStr)">重置</span>
            </p>
       </div>
        <div>
          
            <el-table class="test-table" :data="list" style="width: 100%" stripe  @sort-change="handleSortChange" :default-sort="{prop: tableData.type, order: tableData.descString}">
                <el-table-column prop="name" label="姓名">
                </el-table-column>
                <el-table-column prop="shortName" label="部门">
                </el-table-column>
                <el-table-column prop="integral" label="积分" sortable="false" >
                </el-table-column>
                <el-table-column  label="操作">
                    <template slot-scope="scope">
                        <span @click="handleConvert(scope.$index, scope.row)" class="handle">兑换</span>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
              <el-pagination   background @current-change="handleCurrentChange" :current-page="tableData.pageNum" :page-size="tableData.pageSize" :total="total" layout="total, prev, pager, next, jumper">
             </el-pagination>
            </div>
        </div>
        <model :show="isShowMOdel" @close="close" @save="setPointSave" :class="{'test-model':isDisable}">
          <div slot="model-header">兑换设置</div>
          <div class="model-cont">
            <p class="model-span"><span>每次兑换扣除本次设置的积分数值</span></p>
            <p><input type="text" placeholder="请输入积分兑换值最多10位" class="point-input" v-model="Pointinput" maxlength="10"></p>
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
import Model from "@/share/components/Model";
import { pointsManage } from '../../../core/api';
export default {
  components: {
    Model
  },
  data() {
    const d = this.getDataByRoute();
    console.log("d===",d)
    const ret = {
        list: [],
        total: 50,
        tableData: d,
        isShowMOdel: false,
        isShowConvert: false,
        pointValue:"",
        Pointinput: "",
        userId: "",
        initOrder: {},
        isDisable:false,
        nameStr:""
       
    };
    // console.log('data ->', ret);
    return ret;
  },

  created(){
      //  let arg = this.tableData;
      const query = this.$route.query;
      console.log('arggggg===',query)
      this.getlist(query);
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
        const newQuery = { pageNum: 1, pageSize: vm.tableData.pageSize,};
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
       console.log('发请求!', arg);
      this.getlist(arg);
    },
    getDataByRoute() {
        const query = this.$route.query;
         console.log("数据变化====》",query)
        const pageNum = query.pageNum ? Number(query.pageNum) : 1; 
        const pageSize = query.pageSize ? Number(query.pageSize) : 20; 
        const type = query.type || 'integral'; 
        const descString = query.hasOwnProperty('order')
            ? query.order == 0
                ? 'descending'
                : 'ascending'
            : 'descending';
        return {
            pageNum,
            pageSize,
            type,
            descString
        }
    },
    //请求列表
    getlist(arg) {
      console.log("arg====>",arg)
      pointsManage.getQueryList(arg)
        .then(({vos,total}) => {
          this.list = vos;
          this.total = total;
          console.log("vos===>",vos)
      })
    },
    //姓名搜索
    nameSearch(name){
      const dataname ={
        nameStr:name
      }
        this.getlist(dataname)
    },
    //回车搜索
    searchName(name){
         const dataname ={
        nameStr:name
      }
        this.getlist(dataname)
    },
    //重置
    reset(name){
        this.nameStr = ''
        const dataname ={
          nameStr:this.nameStr
        }
        this.getlist(dataname)
    },

    //点击设置 弹框
    setPoint() {
      this.isShowMOdel = true;
      this.Pointinput =  this.pointValue
      
    },
    
    close() {
      this.isShowMOdel = false;
      this.isShowConvert = false;
    },
    convertsave() {
      this.isShowConvert = false;
      this.getConverPort();
    },
    setPointSave() {
       var reg = /^[1-9]\d*$/
      if(this.Pointinput == ""){
          
      } else if(!reg.test(this.Pointinput )){
          alert("请输入正整数")
      } else if(this.Pointinput.length>10){
      
         this.$message({
          message:'积分数值已超过最大值，请重新输入',
          type: 'warning'
         });
      }
      else{
        this.isShowMOdel = false;
        this.getPointPort()
      }
    },
    //请求设置积分接口
    getPointPort() {
      pointsManage.setPointQuota(this.Pointinput)
        .then(({ message }) => {
          this.pointValue = this.Pointinput;
          this.$message({
            showClose: true,
            message,
            type: 'success'
          })
        })

    },
    //请求兑换的接口
    getConverPort() {
        pointsManage.redeemPoint(this.userId, this.pointValue)
        // .then(response=>{
        //   console.log("兑换response",response)
        // })
          .then(({message, out}) => {
            console.log("兑换信息",message)
            this.$message({
                    showClose: true,
                    message,
                    type: 'success'
                })
                this.list = this.list.map(item => {
                  return item.id === this.userId
                    ? Object.assign({}, item, {integral: out})
                    : item;
                })
          }).catch(error => {
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
      pointsManage.getSelectExchangePoint()
        .then(({exchange}) => {
          this.pointValue = exchange;
           this.Pointinput = this.pointValue
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
    $route: "routeChange",
    Pointinput:function(){
      this.Pointinput=="" ? this.isDisable =true : this.isDisable =false
    }
   
  }
};
</script>


<style scoped>
/* 表格 */
.test-table >>> th > .cell {
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

.test-table >>> th {
  white-space: nowrap;
  overflow: hidden;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  text-align: left;
  background: #2269b3;
}
.pagination >>> .el-pagination {
  white-space: nowrap;
  padding: 2px 5px;
  color: #303133;
  font-weight: 1000;
  margin: 50px 20px;
}
.test-table >>> td,
.test-table >>> th {
  padding: 6px 0;
  min-width: 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  text-overflow: ellipsis;
  vertical-align: middle;
  position: relative;
}
.test-model >>> .submit{
 background: #5a5957;
 cursor: text;
}


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
.set,
.search {
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
.search{
 border-radius:5px;
 height: 35px;
  line-height: 35px;
  margin-left: 10px;
}
.point-input,
.search-input {
  outline: none;
  padding: 10px 0 10px 5px;
  width: 80%;
  border: 1px solid #ccc;
}
.search-input{
   width: 40%;
     padding: 10px 0 10px 10px;
   border-radius: 5px;
}
.search-p{
  margin-left: 600px;
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


