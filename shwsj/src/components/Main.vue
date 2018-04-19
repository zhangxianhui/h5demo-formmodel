<template>
    <div class="wrap">
        <div class="list-item" @click="goOne">
            <div class="img-wrap">
                <img src="../assets/icon_frmz.png" alt="">
            </div>
            <div class="title-wrap">
                <p>发热门诊预检</p>
            </div>
            <div class="arrow"></div>
        </div>
        <div class="list-item" @click="goTwo">
            <div class="img-wrap">
                <img src="../assets/icon_xdmjsb.png" alt="">
            </div>
            <div class="title-wrap">
                <p>紫外线和小型压力蒸汽灭菌锅</p>
            </div>
            <div class="arrow"></div>
        </div>
        <div class="list-item">
            <div class="img-wrap">
                <img src="../assets/icon_crb.png" alt="">
            </div>
            <div class="title-wrap">
                <p>传染病防治</p>
            </div>
            <div class="arrow"></div>
        </div>
        <div class="list-item">
            <div class="img-wrap">
                <img src="../assets/icon_fsws.png" alt="">
            </div>
            <div class="title-wrap">
                <p>放射卫生</p>
            </div>
            <div class="arrow"></div>
        </div>
        <div class="list-item">
            <div class="img-wrap">
                <img src="../assets/icon_ecgs.png" alt="">
            </div>
            <div class="title-wrap">
                <p>二次供水</p>
            </div>
            <div class="arrow"></div>
        </div>
        <div class="list-item">
            <div class="img-wrap">
                <img src="../assets/icon_jzkt.png" alt="">
            </div>
            <div class="title-wrap">
                <p>集中空调</p>
            </div>
            <div class="arrow"></div>
        </div>
        <div class="list-item">
            <div class="img-wrap">
                <img src="../assets/icon_dsf.png" alt="">
            </div>
            <div class="title-wrap">
                <p>第三方评估</p>
            </div>
            <div class="arrow"></div>
        </div>
        <div class="list-item">
            <div class="img-wrap">
                <img src="../assets/icon_ylfw.png" alt="">
            </div>
            <div class="title-wrap">
                <p>医疗废物</p>
            </div>
            <div class="arrow"></div>
        </div>
        <div class="list-item">
            <div class="img-wrap">
                <img src="../assets/icon_ylqxmjzs.png" alt="">
            </div>
            <div class="title-wrap">
                <p>医疗器械灭菌追溯</p>
            </div>
            <div class="arrow"></div>
        </div>
        <div class="list-item">
            <div class="img-wrap">
                <img src="../assets/icon_fszlsb.png" alt="">
            </div>
            <div class="title-wrap">
                <p>放射诊疗设备</p>
            </div>
            <div class="arrow"></div>
        </div>
        <div class="list-item">
            <div class="img-wrap">
                <img src="../assets/icon_xdcp.png" alt="">
            </div>
            <div class="title-wrap">
                <p>消毒产品</p>
            </div>
            <div class="arrow"></div>
        </div>
        <div class="list-item">
            <div class="img-wrap">
                <img src="../assets/icon_xtys.png" alt="">
            </div>
            <div class="title-wrap">
                <p>血透用水</p>
            </div>
            <div class="arrow"></div>
        </div>
        <div class="list-item">
            <div class="img-wrap">
                <img src="../assets/icon_yfxsh.png" alt="">
            </div>
            <div class="title-wrap">
                <p>预防性审核</p>
            </div>
            <div class="arrow"></div>
        </div>
        <div class="list-item">
            <div class="img-wrap">
                <img src="../assets/icon_crbyy.png" alt="">
            </div>
            <div class="title-wrap">
                <p>负压病房</p>
            </div>
            <div class="arrow"></div>
        </div>
    </div>
</template>
<script>
export default {
    created() {
    document.addEventListener("deviceready", onDeviceReady, false);
    function onDeviceReady() {
      MXWebui.setWebViewTitle("上海卫生局");
    }
    document.getElementsByTagName('title')[0].innerHTML="上海卫生局"
  },
    methods:{
        goOne(){
            this.$router.push('/frmzyj')
        },
        goTwo(){
            this.$router.push('/ylzqmj')
        }
    }
};
</script>
<style scoped>
.wrap{
    width: 100%;
    height: 100%;
}
.list-item {
  padding: 10px;
  border-bottom: 1px solid #ccc;
  height: 50px;
  line-height: 50px;
  position: relative;
  background-color: #fff;
}
.list-item > div {
  display: inline-block;
}
.img-wrap {
  width: 50px;
}
.img-wrap > img {
  width: 100%;
  height: 100%;
}
.title-wrap {
  height: 50px;
  line-height: 50px;
}
.title-wrap > p {
  font-size: 16px;
  font-weight: 600;
  margin-left: 10px;
  position: relative;
  top: 3px;
}
.arrow {
  width: 6px;
  height: 6px;
  border-right: 2px solid #c7c7c7;
  border-top: 2px solid #c7c7c7;
  transform: rotateZ(45deg);
  position: absolute;
  top: 35px;
  right: 10px;
}
</style>
