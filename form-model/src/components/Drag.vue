<template>
	<el-form ref="form" label-width="80px" class="el-form" @submit.prevent="submit">
		<div v-for="item  in  data">
			<el-form-item class="form-item" v-if="item.type == 'checkbox'">
				<el-checkbox class="el-checkbox" v-model="item.value">{{item.label}}</el-checkbox>
			</el-form-item>
			<el-form-item class="form-item" v-if="item.type == 'radio'" >
				<div class="el-radio-div">
					<el-radio-group class="el-radio-group" v-for="element  in  item.options" v-model="item.value" :key="element.value">
					 	<el-radio  :label="element.value">{{element.label}}</el-radio>
				</el-radio-group>
				</div>
			</el-form-item>
			<el-form-item class="form-item" v-if="item.type == 'inputUrl'">
				<div>
					<div class="whitelist-left" style=" float: left;margin-right: -89px;">
						<span>{{item.label}}：</span>
					</div>
					<div class="whitelist-right">						
						 <label v-for="(element, i) in item.whitelist">
							<el-input style="width:210px;margin:5px 0" v-model="item.whitelist[i]"></el-input>
							<span @click="addWhite(item.whitelist)">+</span> 
						</label>						
					</div>
				</div>
			</el-form-item>

			<el-form-item class="form-item" v-if="item.type == 'input'">
				<div class="whitelist-left" style=" float: left;margin-right: -89px;">
						<span>{{item.label}}：</span>
				</div>
				<el-input style="width:210px;margin:5px 0" v-model="item.value"></el-input>
			</el-form-item>
			<el-form-item class="form-item" v-if="item.type == 'select'">
				<div class="whitelist-left" style=" float: left;margin-right: -89px;">
						<span>{{item.description}}：</span>
				</div>
				<el-select v-model="item.value" placeholder="请选择">
					<el-option v-for="element in item.options" :key="element.value"  :label="element.label"  :value="element.value">
					</el-option>
				</el-select>
			</el-form-item>


      <el-form-item class="form-item" v-if="item.type == 'file'">
			  <el-upload class="upload-demo" ref="upload" action="" :on-remove="handleRemove" :file-list="item.fileList" :auto-upload="false">
            <el-button slot="trigger" size="small" type="primary">{{item.label}}</el-button>
        </el-upload>
			</el-form-item>

      
			<el-form-item class="form-item" v-if="item.type == 'modelCheckBox'">

				<el-checkbox v-model="register" @change="registermodel(item)"></el-checkbox>
				<span class="registerspan" @click="openmodel(item)">{{item.label}}</span>
	
        <label v-for="emelemt in registerList"><span class="option-box">{{emelemt.description}}</span></label>
     
      	<model :confirmModalOptions="confirmOptions" @togglemodel="cancel(item,item.selectedList,registerList)" @togglemodel2="save(item.selectedList)" :show="show">
					<div slot="model-header">入参选项</div>
					<div> 
						<el-row :gutter="20">     
							<el-col :span="10">
								<div class="grid-content bg-purple">
									<draggable class="list-group" element="ul" v-model="item.unSelectedList" :options="dragOptions"  :move="onMove" @start="isDragging=true" @end="isDragging=false">
										<transition-group type="transition" :name="'flip-list'">
											<li class="list-group-item" v-for="element in item.unSelectedList" :key="element.order">
												<i :class="element.fixed? 'el-icon-close' : 'el-icon-check'" aria-hidden="true"></i> {{element.description}}

												<span class="badge">{{element.order}}</span>
											</li>
										</transition-group>
									</draggable>
								</div>
							</el-col>
							<el-col :span="10">
								<div class="grid-content bg-purple">
									<draggable element="span" :options="dragOptions"  v-model="item.selectedList" >
										<transition-group name="no" class="list-group" tag="ul">
											 <li class="list-group-item" v-for="element in item.selectedList" :key="element.order">
												<i :class="element.fixed? 'el-icon-close' : 'el-icon-check'" aria-hidden="true"></i> {{element.description}}
												<span class="badge">{{element.order}}</span>
											</li> 
										</transition-group>
									</draggable>

								</div>
							</el-col>
						</el-row>
					</div>
					
				</model>
			</el-form-item>

		</div>
		<el-button type="primary" plain @click="submit">提交</el-button>
	</el-form>

</template>

<script>
import axios from "axios";
import Model from "@/components/Model";
import draggable from "vuedraggable"; //拖拽文件
import jsondata from "../../static/json.js";

export default {
  name: "Drag",
  components: {
    Model,
    draggable
  },
  data() {
    return {
      data: [],
      show: false,
      confirmOptions: {},
      editable: true, //禁止拖拽颜色
      register: false, //弹框 那个复选框
      registerList: [], //开启注册 传值
      result: [], //原始值
      resultDiff: [], //变化值
      temporaryList: [] //中间值
    };
  },
  mounted() {
    this.data = [...jsondata].map(item => {
      return item.type === "modelCheckBox"
        ? this.initModelCheckBox(item)
        : item;
    });
    //初始数组
    this.result = this.data.map(item => item.formatFunc(item));
    console.log("初始值");
    console.log(this.result);
  },
  methods: {
    initModelCheckBox(item) {
      return Object.assign({}, item, {
        unSelectedList: item.list,
        selectedList: []
      });
    },

    openmodel(item) {
      this.show = true;
      this.default(item);
    },

    // 恢复默认值
    default(item) {
      this.data = this.data.map(i => {
        return i.key === item.key ? this.initModelCheckBox(i) : i;
      });
    },
    //点击开启注册 复选框
    registermodel(item) {
      if (this.register) {
        this.show = true;
        console.log(item);
      } else {
        this.registerList = [];
        this.default(item);
      }
    },
    //取消
    cancel(item, list, registerList) {
      this.show = false;
      if (registerList.length >= 1) {
        this.register = true;
      } else {
        this.register = false;
      }
      this.default(item);
    },
    //确定
    save(selectedList) {
      this.show = false;
      if (selectedList.length >= 1) {
        alert(111);
        this.registerList = selectedList;
        this.register = true;
        console.log(selectedList);
      } else {
        alert(222);
        this.register = false;
      }
    },
    //提交
    submit() {
      this.resultDiff = this.data.map(item => item.formatFunc(item)); //变化值

      console.log(this.resultDiff);
      this.alike(this.result,this.resultDiff,this.temporaryList)
      this.array_diff(this.resultDiff,this.temporaryList)
      console.log(this.resultDiff.join('\n'))

    },
    //获取到两组数组相同的值
    alike(oldArr,newArr,Arr){
      oldArr.map(i => {
					newArr.map(j => {
						if(i == j) {
							Arr.push(i)
						}
					})
				})
    },
    //获取最终修改的变化的值
    array_diff(a,b){
      b.map(i => {
					a.map((item, index) => {
						if(item == i) {
							a.splice(index, 1);
							index = index - 1
						}
					})
				})
				return a
    },

    //替换
    replace2(str) {
      // var reg = /[,]/g;
      var reg = /,(?=([^"]*"[^"]*"[^"]*)*[^"]*$)/g;
      str = str.replace(reg, "\r\n");
      this.allsubmitvalue = str;
      console.log("处理后");
      console.log(this.allsubmitvalue);
    },
    //去空
    notempty(arr) {
      for (var i = 0; i < arr.length; i++) {
        if (arr[i] == "" || typeof arr[i] == "undefined") {
          arr.splice(i, 1);
          i--;
        }
      }
      return arr;
    },
    onMove({ relatedContext, draggedContext }) {
      const relatedElement = relatedContext.element;
      const draggedElement = draggedContext.element;
      return (
        (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed
      );
    },
    //添加白名单
    addWhite(addWhite) {
      addWhite.push("");
      console.log(addWhite);
    },
    //上传文件的移除
    handleRemove(file, fileList) {
      console.log(file, fileList);
    }
  },
  computed: {
    dragOptions() {
      return {
        animation: 0,
        group: "item",
        sort: false,
        disabled: !this.editable, //拖拽
        ghostClass: "ghost"
      };
    }
  },
  watch: {}
};
</script>

<style scoped>
a {
  text-decoration: none;
}

ul li {
  list-style: none;
}

.el-form {
  width: 500px;
  padding: 10px 20px;
  border: 1px solid #cccccc;
}

.form-item {
  border: 1px solid #cccccc;
}

.el-checkbox {
  float: left;
}
/* 拖拽 */

.flip-list-move {
  transition: transform 0.5s;
}

.no-move {
  transition: transform 0s;
}

.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}

.list-group {
  border: 1px solid #cccccc;
  min-height: 40px;
}

.list-group-item {
  cursor: move;
}

.list-group-item i {
  cursor: pointer;
}

.el-row {
  margin-bottom: 20px;
}

.el-col {
  border-radius: 4px;
}

.bg-purple-dark {
  background: #99a9bf;
}

.bg-purple {
  background: #d3dce6;
}

.bg-purple-light {
  background: #e5e9f2;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}

.el-radio-group {
  margin: 0 10px;
}
.el-radio-div {
  margin-left: -100px;
}
.whitelist-right span {
  display: inline-block;
  width: 20px;
  height: 20px;
  font-size: 25px;
  cursor: pointer;
  margin-left: 5px;
}
.option-box {
  margin: 0 10px;
}
.registerspan {
  float: left;
  margin-left: 10px;
  cursor: pointer;
}
</style>