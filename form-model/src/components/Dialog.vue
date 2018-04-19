<template>

<div>
  <div @click="modela">弹框1</div>
  <div @click="modelb">弹框2</div>
  <div @click="modelc">弹框3</div>
  <model :show="showlogin" @close="closeModel">
   <helloWorld></helloWorld>
  </model>
  <model :show="showlogin22" @close="closeModel">
    <div>弹框22</div>
  </model>
  <model :show="showlogin33" @close="closeModel">
    <div>弹框33</div>
  </model>

</div>
</template>

<script>
import Model from "@/components/Model";
import HelloWorld from "@/components/HelloWorld";
export default {
  components:{ Model,HelloWorld},
  data() {
    return {
      showlogin:false,
       showlogin22:false,
        showlogin33:false,
    };
  },
  methods: {
    modela(){
      this.showlogin = true
    },
    modelb(){
      this.showlogin22 = true
    },
    modelc(){
      this.showlogin33 = true
    },
    closeModel(){
      this.showlogin = false
      this.showlogin22 = false
      this.showlogin33 = false
    }

  }
};
</script>