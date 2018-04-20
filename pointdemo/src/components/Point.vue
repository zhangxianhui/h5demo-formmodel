<template>
  <div class="wrap">
        <p class="title">积分管理</p>
        <p class="point-span"><span>积分兑换值</span><span>{{pointValue}}</span> <span class="set" @click="setPoint">设置</span></p>
        <div>
            <el-table :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" style="width: 100%" stripe @sort-change="handleSortChange">
                <el-table-column prop="name" label="姓名">
                </el-table-column>
                <el-table-column prop="section" label="部门">
                </el-table-column>
                <el-table-column prop="point" label="积分" sortable="false">
                  
                </el-table-column>
                 <el-table-column prop="handle" label="操作">
                </el-table-column>
		        </el-table>
            <el-pagination background @current-change="handleCurrentChange" :current-page="currentPage" :total="tableData.length" layout="total, prev, pager, next, jumper">
		        </el-pagination>
        </div>
        <model :show="isPonit" @close="close" @save="save">
          <div slot="model-header">兑换设置</div>
          <div>
            <p>每次兑换扣除本次设置的积分数值</p>
            <input type="text" placeholder="请输入需要设置的积分兑换值" class="point-input" v-model="Pointinput">
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
          section: "王建国",
          point: 1,
          handle: "兑换"
        },
        {
          name: "王涛",
          section: "王涛",
          point: 4,
          handle: "兑换"
        },
        {
          name: "司马",
          section: "司马",
          point: 3,
          handle: "兑换"
        },
        {
          name: "诸葛",
          section: "诸葛",
          point: 5,
          handle: "兑换"
        },
        {
          name: "欧阳",
          section: "欧阳",
          point: 2,
          handle: "兑换"
        },
        {
          name: "公孙",
          section: "公孙",
          point: 6,
          handle: "兑换"
        },
        {
          name: "王建国",
          section: "王建国",
          point: 7,
          handle: "兑换"
        },
        {
          name: "王涛",
          section: "王涛",
          point: 8,
          handle: "兑换"
        },
        {
          name: "司马",
          section: "司马",
          point: 9,
          handle: "兑换"
        },
        {
          name: "诸葛",
          section: "诸葛",
          point: 10,
          handle: "兑换"
        },
        {
          name: "欧阳",
          section: "欧阳",
          point: 11,
          handle: "兑换"
        },
        {
          name: "公孙",
          section: "公孙",
          point: 12,
          handle: "兑换"
        }
      ],
      pagesize: 10, //每页的数据条数
      currentPage: 1, //默认开始页面,
      isPonit:false,
      pointValue:500,
      Pointinput:'',
      initalQuery: {
        page:1,
        limit:10
      }
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
    setPoint(){
      this.isPonit = true
    },
    close(){
      this.isPonit = false
    },
    save(){
       this.isPonit = false
       this.pointValue = this.Pointinput
    }
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
.point-span {
  border-bottom: 1px solid #cccccc;
  padding-bottom: 10px;
 
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
   width:50%;
   border:1px solid #ccc;
}
</style>


