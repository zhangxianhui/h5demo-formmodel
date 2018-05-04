<template>
  <div id="addData" class="body">
    <div class="titleBox">
      <h2 class="title">编辑节假日</h2>
      <button type="button"@click="back">返回</button>
    </div>
    <div class="infoBox">
      <div class="pannel">
        <p>
         
          <label>节假日名称: </label>
          <input type="" name="title" v-model="data.title" >
          <span class="redStart" v-show="data.title==''">*</span>
        </p>
        <p>
          <label>节假日描述: </label>
          <textarea rows="5" cols="50" v-model="data.description" ></textarea>
        </p>
        <p class="ico-box">
            <label style="float:left">节假日图标: </label>
           <div class="imgdiv">
                <a class="imgSrc">
                     <img :src="imgDataUrl" id="image" >
                </a>
                <div class="upload-box">
                    <a href="javascript:;" class="upload">更改图片
                        <input type="file" id="choose"class="upload__input" @change="uploadimg">
                    </a><br>
                    <span>建议大小56*56px; png格式白色透明度的图标</span>
                </div>
           </div>
        </p>
        <p>
          <label>显示时间: </label>
          <el-date-picker v-model="data.timeRange"type="datetimerange" range-separator="至"
              start-placeholder="开始日期" end-placeholder="结束日期"value-format="timestamp">
          </el-date-picker>
        </p>
        <div class="clear"></div>
        <p>
          <button type="button" @click="addData">保存</button>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {
  
  },
  data() {
    return {
      id: null,
      data: {
        title: "",
        description: "",
        timeRange: []
      },
      imgDataUrl: "",
    };
  },
  mounted: function() {
    this.getId();
  },
  methods: {
    //通过路由获取id
    getId() {
      this.id = this.$route.query.id;
      console.log(this.id);
      //按照id查询获取数据
      var _this = this;
      this.httpService.findDataById(this.id).then(function(resp) {
        _this.imgDataUrl = resp.body.data.picUrl;
        _this.data = Object.assign(_this.data, resp.body.data);
        _this.data.timeRange.push(resp.body.data.startAt * 1000);
        _this.data.timeRange.push(resp.body.data.endAt * 1000);
        console.log("id查询==》", _this.data);
      });
    },
    //保存信息
    addData() {
       if (this.data.title == "") {
        this.$toast("节假日名称是必填项!");
        return;
      }
      if (this.data.description == "") {
        this.$toast("请填写节假日描述!");
        return;
      }
      if (this.imgDataUrl == "") {
        this.$toast("请上传图片!");
        return;
      }
      if (this.data.timeRange == "") {
        this.$toast("请选择日期!");
        return;
      }
      const choose = document.getElementById("choose");
      if (choose.files[0]) {
        this.upimg();
      } else {
        this.save();
      }
    },
    upimg() {
      const url = "/api/v2/holiday/picture/upload";
      const choose = document.getElementById("choose");
      const file = choose.files[0];
      const fr = new FileReader();
      const _this = this;
      fr.onload = function(e) {
        var blob = new Blob([e.target.result], { type: "image/png" });
        const formData = new FormData();
        formData.append("pic", blob, `thumb`);
        _this.httpService
          .editData("/api/v2/holiday/picture/upload", formData, {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          })
          .then(function(resp) {
            console.log("上传图片成功")
            _this.save(resp);
          })
          .catch(error => {
            console.log("上传error===》", error);
          });
      };
      fr.readAsArrayBuffer(file);
    },
    save(resp) {
      var imgurl;
      var _this =this
      if (resp) {
        imgurl = resp.body.picUrl;
      } else {
        imgurl = this.imgDataUrl;
      }
      const data = {
        title: this.data.title,
        description: this.data.description,
        startAt: this.data.timeRange[0]/1000,
        endAt: this.data.timeRange[1]/1000,
        picUrl: imgurl,
        id: this.data.id
      };
      console.log("保存===》", data);
      console.log("图片地址===》", imgurl);
      this.httpService
        .editData("/api/v2/holiday/picture", data)
        .then(function(resp) {
          _this.$toast("保存成功");
        })
        .catch(error => {
          console.log("保存失败===》", error);
          const err =error.body.errors.status_code
          if(err == 20201){
               _this.$toast("日期重复请从新选择");
          }
        });
    },
    uploadimg(event) {
      var demo = document.getElementById("image");
      var file = event.target.files[0];
      var fr = new FileReader();
      fr.onload = function(e) {
        demo.src = this.result;
      };
      fr.readAsDataURL(file);
    },
    back(){
        window.history.go(-1);
    }
  }
};
</script>


<style>
label {
  width: 100px;
  display: inline-block;
  vertical-align:middle;
}
input,
textarea {
  display: inline-block;
  margin-right: 3px;
  vertical-align: top;
  padding: 10px 5px;
  border-radius: 5px;
  border:1px solid #999;
   vertical-align:middle;
   outline: none;
   overflow:auto
}
.infoBox {
  border-top: 1px solid #ccc;
  margin-top: 25px;
}
.infoBox .pannel {
  background: #fff;
  padding: 15px;
  margin-top: 15px;
}
.redStart {
  color: #ff0000;
  font-size: 18px;
}
.imgSrc img {
  width: 80px;
  height: 80px;
}
.upload__input {
  position: absolute;
  overflow: hidden;
  right: 0;
  top: 0;
  opacity: 0;
  z-index: 666;
  cursor: pointer;
}
.upload {
  padding: 10px 30px;
  height: 20px;
  line-height: 20px;
  position: relative;
  border: 1px solid #999;
  text-decoration: none;
  color: #666;
  background: #f0f0f0;
  border: none;
}
.imgdiv {
  position: relative;
}
.upload-box {
  position: absolute;
  left: 240px;
  top: 12px;
}
.upload-box span {
  display: inline-block;
  margin-top: 20px;
}

</style>
