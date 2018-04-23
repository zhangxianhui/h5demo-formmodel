<template>
	<transition name="fade">
		<div class="mask" v-show="show">
			<div class="mask_bg"></div>
			<transition name="fade">
				<div class="modelBox" v-show="show">
					<div class="title">
						<slot name="model-header"></slot>
					</div>
					<div class="textCenter">
            <slot> 主题</slot>
					</div>
					<div class="model_btnBox">
            
             	<div class="btn" @click="close()">
                   <span class="close"> 取消</span>
              </div>
          
						<div class="btn" @click="submit()">
               <span class="submit"> 确定</span>
						</div>
					</div>
				</div>
			</transition>
		</div>
	</transition>
</template>
<script>
export default {
  props: ["show"],
  data() {
    return {};
  },
  methods: {
    close() {
      this.$emit("close")
    },
    submit() {
      this.$emit("save");
    }
  }
};
</script>

<style scoped>
.dialog {
  position: relative;
}

.modelBox {
  position: fixed;
  box-sizing: border-box;
  width: 30%;
  min-height: 200px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 5px;
  background: #fff;
  z-index: 50002;
}

.title {
  font-size: 16px;
  font-weight: 600;
  line-height: 30px;
  background: #F4F4F4;
  line-height: 40px;
  border-radius: 5px;
}
.textCenter{
  width: 100%;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.text {
  font-size: 14px;
  line-height: 30px;
  color: #555;
}

.model_btnBox {
  display: flex;
  position: absolute;
  right:20px;
  bottom: 10px;
}

.btn {
  padding: 10px 20px;
  font-size: 14px;
 
}
.close{
  display: inline-block;
  background: #F4F4F4;
  padding: 5px 20px;
   cursor: pointer;
}
.submit{
   display: inline-block;
  background: #307DCD;
  padding: 5px 20px;
   cursor: pointer;
}
.mask {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 50001;
  background: rgba(0, 0, 0, 0.5);
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>