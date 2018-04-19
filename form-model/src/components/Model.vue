<template>
	<transition name="fade">
		<div class="mask" v-show="show">
			<div class="mask_bg"></div>
			<transition name="fade">
				<div class="modelBox" v-show="show">
					<div class="title">
						<slot name="model-header"></slot>
					</div>
					<div class="message textCenter">
            <slot> 主题</slot>
					</div>
					<div class="model_btnBox">
            
             	<div class="btn" @click="confirmCancel()">
                    取消
              </div>
          
						<div class="btn" @click="confirmSubmit()">
                确定
						</div>
					</div>
				</div>
			</transition>
		</div>
	</transition>
</template>
<script>
export default {
  props: ["confirmModalOptions", "show"],
  data() {
    return {};
  },
  methods: {
    confirmCancel() {
      this.$emit("togglemodel");
      this.$emit("close")
    },
    confirmSubmit() {
      this.$emit("togglemodel2");
    }
  }
};
</script>

<style>
.dialog {
  position: relative;
}

.modelBox {
  position: fixed;
  box-sizing: border-box;
  padding: 20px;
  width: 50%;
  min-height: 140px;
  left: 50%;
  top: 40%;
  transform: translate(-50%, -50%);
  border-radius: 5px;
  background: #fff;
  z-index: 50002;
}

.title {
  font-size: 16px;
  font-weight: 600;
  line-height: 30px;
}

.text {
  font-size: 14px;
  line-height: 30px;
  color: #555;
}

.model_btnBox {
  display: flex;
  position: absolute;
  right: 0;
  bottom: 10px;
}

.btn {
  padding: 10px 20px;
  font-size: 14px;
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