<template>
  <div class="tab-contents" style="height:-webkit-fill-available;background-color:#f7f7f7;">
            <comhead ref="comhead" isLeftIcon="icon-zuo" leftIconName="angle-left" @leftClick="false"  title="申请退款" isRightIcon="true"  ></comhead>
     

    



  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import mixin from "../../config/mixin";
import { Action } from "vuex-class";
import { Toast } from "vant";
// import { recommendList } from '../../service/getData';
import comhead from "../../components/Comhead.vue";

@Component({
  components: { comhead },
  mixins: [mixin]
})
export default class Refund extends Vue {
 

  mounted() {
      console.log("退款页面")
  }
}
</script>

<style lang="scss" scoped>
@import "../../style/utils.scss";
</style>


