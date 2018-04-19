<template>
  <div class="img-item">
      <div class="img-wrap">
          <img src="../../assets/img/img.png" alt="">
          <span @click="del(item.id)">x</span>
      </div>
  </div>
</template>

<script>
export default {
  props:['item'],
  methods:{
      del(index){
          alert('删除第' + index + '张图片')
      }
  }
}
</script>

<style scoped>
.img-item{
    display: inline-block;
    width: 25%;
}
.img-wrap{
    position: relative;
    width: 85%;
    height: 85%;
    margin-top: 20px;
}
.img-wrap > img{
    width: 100%;
    height: 100%;
}
.img-wrap >span{
    display: inline-block;
    color: #fff;
    width: 20px;
    height: 20px;
    line-height: 20px;
    font-size: 16px;
    border-radius: 50%;
    text-align: center;
    background-color: #6B6C73;
    position: absolute;
    right: -10px;
    top:-10px;
}
</style>
