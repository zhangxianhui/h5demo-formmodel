<template>
    <div>
        <list-item :data="data" ></list-item>
    </div>
</template>

<script>
import listItem from "./common/list_item_tpl";
export default {
  components: {
    listItem
  },
  data() {
    return {
      data: [
        {
          title:
            "关于协助提供盖章版《商户上线申请表》的需求[个人信贷管理部201880422]",
          creater: "创建人",
          number: "0251",
          time: "2018-04-03 12:00:00",
          level: "紧急",
          status: "已结束"
        },
        {
          title:
            "关于协助提供盖章版《商户上线申请表》的需求[个人信贷管理部201880422]",
          creater: "创建人",
          number: "0251",
          time: "2018-04-03",
          level: "紧急",
          status: "已结束"
        }
      ]
    };
  },
  methods:{
      // goDetail(flowID){
      //     this.$router.push('/completed/'+ flowID)
      // }
  }
};
</script>

<style scoped>

</style>
