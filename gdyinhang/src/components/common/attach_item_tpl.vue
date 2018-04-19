<template>
    <div>
        <div class="attach-item">
            <div class="img-wrap">
                <img src="../../assets/img/pdf.png" alt="文件类型图标">
            </div>
            <div class="info-wrap">
                <p class="title">业务联系单-中金支付代收业务商户上线申请表中金支付代收业务商户上线申请表</p>
                <p class="name">
                    <span>2018-3-22</span>&nbsp;&nbsp;
                    <span>陈翔翔</span>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
export default {};
</script>

<style scoped>
.attach-item {
  margin: 5px 0;
}
.attach-item > div {
  display: inline-block;
}
.img-wrap {
  width: 55px;
  height: 55px;
}
.img-wrap > img {
  width: 100%;
  height: 100%;
}
.info-wrap {
  margin-left: 10px;
  height: 55px;
  width: 80%;
}
.title {
  font-size: 15px;
  font-weight: 600;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  position: relative;
  top: 10px;
}
.name{
    position: relative;
    top: 15px;
    color:#ccc;
    font-size: 14px;
    font-weight: 600;
}
</style>
