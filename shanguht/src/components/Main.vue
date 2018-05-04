<template>
  <div id="main" class="body">
    <div class="titleBox">
      <h2 class="title">节假日管理</h2>
      <button type="button" @click="addDataItem">添加</button>
    </div>
    <div class="tableBox ">
      <table class="tablediv">
        <thead>
          <tr>
            <th v-for="(th, index) in ths" :key="index">{{th}}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in datas" :key="index">
            <td>{{item.title}}</td>
            <td>
              <img :src="item.picUrl">
            </td>
            <td>
              <span>{{formatDateTime(item.startAt)}}</span><br>
              <span>{{formatDateTime(item.endAt)}}</span>
            </td>
            <td>
              <button type="button" @click="editDataItem(item.id)">编辑</button>
              <button type="button" @click="deleteDataItem(item.id)">删除</button>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-if="isShowK" class="zanwu"><span>暂无内容</span></div>
      <el-pagination background @current-change="handleCurrentChange" :current-page="tabledata.page" :page-size="tabledata.limit" :total="total" layout="total, prev, pager, next, jumper">
      </el-pagination>
    </div>
     
  </div>
</template>

<script>
export default {
  data() {
    const d = this.getDataByRoute();
    const ret = {
      ths: ["名称", "图标", "显示时间", "操作"],
      datas: [],
      total: 50,
      tabledata: d,
      isShowK: false
    };
    return ret;
    // return {
    //       ths: ["名称", "图标", "显示时间", "操作"],
    //   datas: [],
    //   total: 50,
    //  page:1,
    //  limit:10,
    //   isShowK: false
    // }
  },
  mounted: function() {
    //初始化数据列表
    let data = this.$route.query;
    this.init(data);
  },
  methods: {
    init(data) {
      var _this = this;
      this.httpService
        .findAllData(`/api/v2/holiday/picture/list`, data)
        .then(function(resp) {
          _this.datas = resp.body.data;
          if (resp.body.data.length == 0) {
            _this.isShowK = true;
          } else {
            _this.isShowK = false;
          }
        });
    },
    // 分页切换执行
    handleCurrentChange(page) {
      const data = {
        page,
        limit: this.tabledata.limit
      };
      this.changeRoute(data);
    },
    //监听路由方法
    changeRoute(query) {
      this.$router.push({query});
    },
    routeChange(query) {
      const data = query.query;
      this.tabledata = this.getDataByRoute();
      //发送请求这里
      this.init(data);
    },
    //路由和分页关联
    getDataByRoute() {
      const query = this.$route.query;
      const page = query.page ? Number(query.page) : 1;
      const limit = query.limit ? Number(query.limit) : 20;
      return {
        page,
        limit
      };
    },
    // 删除信息
    deleteDataItem(id) {
      console.log(id);
      var _this = this;
      this.httpService.deleteDataById(id).then(function(resp) {
        console.log("删除成功");
        _this.init();
      });
    },
    // 编辑信息
    editDataItem(id) {
      this.$router.push({ path: "/editData", query: { id: id } });
    },
    // 添加信息
    addDataItem() {
      this.$router.push({ path: "/addData" });
    },

    formatDateTime(timeStamp) {
      var date = new Date();
      date.setTime(timeStamp * 1000);
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      m = m < 10 ? "0" + m : m;
      var d = date.getDate();
      d = d < 10 ? "0" + d : d;
      var h = date.getHours();
      h = h < 10 ? "0" + h : h;
      var minute = date.getMinutes();
      var second = date.getSeconds();
      minute = minute < 10 ? "0" + minute : minute;
      second = second < 10 ? "0" + second : second;
      return y + "-" + m + "-" + d + " " + h + ":" + minute + ":" + second;
    }
  },
  watch: {
    $route: "routeChange"
  }
};
</script>

<style>
#main table {
  width: 100%;
  text-align: center;
  font-size: 14px;
  line-height: 28px;
  border-collapse: collapse;
}
#main table thead {
  background: rgb(26, 119, 211);
  color: #fff;
}
#main table,
#main table tr th,
#main table tr td {
  border: none;
}
#main table tbody tr:nth-child(even) {
  background: #fff;
}
#main table tbody tr:nth-child(odd) {
  background: rgb(250, 250, 250);
}
#main table tr td button {
  background: none;
  color: #333;
}
#main table tr td img {
  width: 50px;
  height: 50px;
}
.el-pagination {
  white-space: nowrap;
  padding: 2px 5px;
  color: #303133;
  font-weight: 700;
  /*  float: right;
    margin-top: 50px;
    margin-right: 20px; */
  position: absolute;
  right: 10%;
  top: 500px;
}
.tablediv {
  position: relative;
}
.zanwu {
  position: absolute;
  left: 50%;
  top: 50%;
}
</style>
