<template>
  <div class="tab-contents">
    <comhead ref="comhead" isLeftIcon="icon-zuo" leftIconName="angle-left" @leftClick="false"  title="领卷中心" isRightIcon="true"  ></comhead>

        <!-- 有卷列表 -->
        <div class="coupon_list">
          <!-- collar列表 -->          
          <div class="coupon_collar" :style="handlePX('width', 702)+handlePX('height', 248)+handlePX('margin-top', 20)">
            <div class="coupon_cardbox" :style="handlePX('padding-top', 30)">
              <div class="coupon_car_left" :style="handlePX('padding-left', 60)">
                <div style="color:#fff;" :style="handlePX('font-size', 65)">100<span :style="handlePX('font-size', 42)">元</span></div>
                <div style="color:rgba(255,255,255,0.8);">满299减100</div>
              </div>
              <div class="coupon_car_right" :style="handlePX('padding-right', 42)+handlePX('padding-top', 30)">
                <van-button size="mini" :style="handlePX('width', 135)+handlePX('height', 40)" style="border:0;background-color:rgba(255,255,255,0.5);color:#DAA000;">领卷</van-button>
                <div style="color:rgba(255,255,255,0.8);" :style="handlePX('font-size', 26)">2018.03.24-2018.03.24</div>
              </div>
            </div>
            <div class="coupon_car_bottom" :style="handlePX('line-height', 52)+handlePX('font-size', 20)+handlePX('padding-left', 40)">全场通用；特价商品或其他优惠活动商品不可叠加使用</div>
          </div>

        </div>


  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import mixin from "../../config/mixin";
import { Action } from "vuex-class";
import { Toast } from "vant";
import comhead from "../../components/Comhead.vue";

@Component({
  components: {
    comhead
  },
  mixins: [mixin]
})
export default class collar_center extends Vue {

  handlePX(CssName, PxNumber) {
    return CssName +":" +this.$store.getters[Vue.prototype.MutationTreeType.SYSTEM].availWidth /750 * PxNumber +"px;";
  }
  mounted() {

    console.log("领卷中心");
  }
}
</script>


<style lang="scss" scoped>
@import "../../style/utils.scss";
.coupon_list{
  display:flex;
  align-items: center;
  flex-direction: column;
  .coupon_collar{
    background-image: url('../../assets/image/领卷中心背景.png');
    background-size: 100% 100%;
    position: relative;
  }
}
.coupon_cardbox{
  display:flex;
  justify-content:space-between;
  .coupon_car_right{
    display:flex;
    flex-direction:column;
    align-items:flex-end;
    justify-content:space-between;
  }
}
.coupon_car_bottom{
  bottom:0;
  position:absolute;
  text-align:center;
  color:#fff;
}
</style>