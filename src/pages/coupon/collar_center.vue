<template>
  <div class="tab-contents">
    <comhead ref="comhead" isLeftIcon="icon-zuo" leftIconName="angle-left" @leftClick="false"  title="领卷中心" isRightIcon="true"  ></comhead>
          <ul
  v-infinite-scroll="loadMore"
  :infinite-scroll-disabled="loading"
  infinite-scroll-distance="20" >

        <li >
        <!-- 有卷列表 -->
<<<<<<< HEAD
        <div class="coupon_list">

=======
        <div class="coupon_list" v-for="(item,index) in couponList" :key="index">
>>>>>>> 879854d80da080c6da6ebb9f8654bd8f220580a7

          <!-- collar列表 -->          
          <div v-for="(item,index) in couponList" class="coupon_collar" :style="handlePX('width', 702)+handlePX('height', 248)+handlePX('margin-top', 20)">
            <div class="coupon_cardbox" :style="handlePX('padding-top', 30)">
              <div class="coupon_car_left" :style="handlePX('padding-left', 60)">
                <div style="color:#fff;" :style="handlePX('font-size', 65)">{{item.couponDenomination}}<span :style="handlePX('font-size', 42)">元</span></div>
                <div style="color:rgba(255,255,255,0.8);">{{item.couponName}}</div>
              </div>
              <div class="coupon_car_right" :style="handlePX('padding-right', 42)+handlePX('padding-top', 30)">
                <van-button size="mini" :style="handlePX('width', 135)+handlePX('height', 40)" style="border:0;background-color:rgba(255,255,255,0.5);color:#DAA000;" @click="addcoupon(item.id)">领卷</van-button>
                <div style="color:rgba(255,255,255,0.8);" :style="handlePX('font-size', 26)">{{item.createTime.split(' ')[0]}}-{{item.endDate.split(' ')[0]}}</div>
              </div>
            </div>
            <div class="coupon_car_bottom" :style="handlePX('line-height', 52)+handlePX('font-size', 20)+handlePX('padding-left', 40)">全场通用；特价商品或其他优惠活动商品不可叠加使用</div>
          </div>


<!-- coupon_overdue -->


        </div>
    </li>
 </ul>
<div style="    display: flex;
    align-items: center;
    justify-content: center;font-size:14px;padding:15px;">

    <div v-if="!loading">加载中...</div>
    <div v-else>-</div>
  
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
    return (
      CssName +
      ":" +
      this.$store.getters[Vue.prototype.MutationTreeType.SYSTEM].availWidth /
        750 *
        PxNumber +
      "px;"
    );
  }
  loading=false
  pageSize = 20;
  couponList=[];
  getList() {
 Vue.prototype.$reqFormPost("/coupon/center/list", {
   
      userId: this.$store.getters[Vue.prototype.MutationTreeType.TOKEN_INFO]
        .userId,
      token: this.$store.getters[Vue.prototype.MutationTreeType.TOKEN_INFO]
        .token,
      page: 0,
      pageSize: this.pageSize
 }, res => {
      if (res == null) {
        console.log("网络请求错误！");
        return;
      }
      if (res.data.status != 200) {
        console.log(
          "需控制错误码" + res.data.status + ",错误信息：" + res.data.message
        );
        Toast(res.data.message);
        return;
      }
  console.log(res)
    this.couponList = res.data.data.couponList;
       if (res.data.data.couponList.length == 20) {
          this.loading = false;
        }
    });


  }
  mounted() {
    this.getList();
    console.log("领卷中心");
  }
}
</script>


<style lang="scss" scoped>
@import "../../style/utils.scss";
.coupon_list {
  display: flex;
  align-items: center;
  flex-direction: column;
  .coupon_collar {
    background-image: url("../../assets/image/领卷中心背景.png");
    background-size: 100% 100%;
    position: relative;
  }
  
  .coupon_overdue {
    background-image: url("../../assets/image/已过期优惠卷.png");
    background-size: 100% 100%;
    position: relative;
  }
}
.coupon_cardbox {
  display: flex;
  justify-content: space-between;
  .coupon_car_right {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: space-between;
  }
}
.coupon_car_bottom {
  bottom: 0;
  position: absolute;
  text-align: center;
  color: #fff;
}
</style>