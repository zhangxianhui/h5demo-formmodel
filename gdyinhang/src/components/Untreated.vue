<template>
  <div>
    <!-- v-for="(item, index) in data" :key="index" @event="goDetail(item)" -->
    <list-item :data="data"></list-item>
    
  </div>
</template>

<script>
import listItem from "./common/list_item_tpl";
import { userGetIssuesMock, userGetIssues } from "../http/getUndoList";
export default {
  components: {
    listItem
  },
  data() {
    return {
      data: [],
    };
  },
  mounted() {
  
  },
  methods: {
    getData(){
      var getFunc =userGetIssues  //真实数据
        // process.env.NODE_ENV === "development"
        //   ? userGetIssuesMock
        //   : userGetIssues;

        getFunc('liyunlong').then(d => {
          this.data = d;
        });
    },
    
  },
  created() {
    var requestTag = false;
    var self = this;
    setTimeout(() => {
      if (!requestTag) {
        this.getData();
        requestTag = true;
      }
    }, 1000);

    document.addEventListener("deviceready", onDeviceReady, false);
    function onDeviceReady() {
      MXWebui.setWebViewTitle("ITIL");
      if (!requestTag) {
        self.getData();
        requestTag = true;
      }
    }
  }
};
</script>

<style scoped>

</style>
