<template>
  <div class="tab-contents" style="height:-webkit-fill-available;background-color:#f7f7f7;">
            <comhead ref="comhead" isLeftIcon="icon-zuo" leftIconName="angle-left" @leftClick="false"  title="" isRightIcon="true"  ></comhead>
     

        <!-- 支付成功{{$route.query}} -->

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
export default class shopIndex extends Vue {
 
  mounted() {
      console.log("支付成功",this.$route.query)
      Vue.prototype.$confirmLogin({
      name: "orderlist",
      query: {
        orderStatus: "ORDER_WAIT_SENDGOODS"
      }
    });

  }
}
</script>

<style lang="scss" scoped>
@import "../../style/utils.scss";
</style>


