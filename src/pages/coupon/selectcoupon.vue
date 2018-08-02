<template>
  <div class="tab-contents">
    <comhead ref="comhead" isLeftIcon="icon-zuo" leftIconName="angle-left" @leftClick="false"  title="选择优惠券" isRightIcon="true"  ></comhead>


          <ul v-if="couponList.length>0"
  :infinite-scroll-disabled="loading"
  infinite-scroll-distance="20" style="padding-bottom: 65px;">

  <!-- v-infinite-scroll="loadMore" --> 
  
        <li >
        <!-- 有卷列表 -->
        <div class="coupon_list">
          <div v-for="(item,index) in couponList" :key="index">

          <!-- collar列表 -->          
          <div class="coupon_notused" @click="doChangePreDis(item.id)" :style="handlePX('width', 702)+handlePX('height', 248)+handlePX('margin-top', 20)" >
            <div class="coupon_cardbox" :style="handlePX('padding-top', 30)">
              <div class="coupon_car_left" :style="handlePX('padding-left', 60)">
                <div style="color:#fff;" :style="handlePX('font-size', 65)">{{item.couponDenomination}}<span :style="handlePX('font-size', 42)">元</span></div>
                <div style="color:rgba(255,255,255,0.8);">满{{item.fullDenomination}}减{{item.couponDenomination}}</div>
              </div>
              <div class="coupon_car_right" :style="handlePX('padding-right', 42)+handlePX('padding-top', 20)">
                <div style="background-color: #FF5359; border: 1px #fff solid;color: #fff;width: 67.5px;height: 25px;" class="flex flex-pack-center flex-align-center">已选择</div>
                <div style="color:rgba(255,255,255,0.8);" :style="handlePX('font-size', 26)"><span v-if="item.createTime">{{item.createTime.split(' ')[0]}}</span> <span v-if="item.validityTime">-{{item.validityTime.split(' ')[0]}}</span></div>
              </div>
            </div>
            <div class="coupon_car_bottom" :style="handlePX('line-height', 52)+handlePX('font-size', 20)+handlePX('padding-left', 40)">   <span v-if="item.conditionType == 'NEW_USER'">新人专享;</span>               <span v-if="item.rangeType == 'ALL'">全场通用;</span>               <span v-else>{{item.catName}}类商品适用;</span>               特价商品或其他优惠活动商品不可叠加使用；特价商品或其他优惠活动商品不可叠加使用</div>
          </div>

          </div>
      

        </div>
    </li>
 </ul>
<div class="flex flex-pack-center flex-align-center" style="font-size:14px;padding:15px;" v-else>

    <!-- <div v-if="!loading">加载中...</div> -->
    <div  style="font-size:14px;padding:15px;text-align: center;">
      <img src="../../assets/image/空空如也.png" alt="">
      <p>空空如也～</p>
    </div>
  
</div>


  <!-- 不使用优惠券按钮 -->
  <div class="nonebtn" ><span @click="doChangePreDis('')">不使用优惠券</span></div>

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

  page=0;
 prepareId=""
couponList=[]
addressId = null

doChangePreDis(value){
let data = {
        userId: this.$store.getters[Vue.prototype.MutationTreeType.TOKEN_INFO]
          .userId,
        token: this.$store.getters[Vue.prototype.MutationTreeType.TOKEN_INFO]
          .token,
          prepareId:this.$store.getters[Vue.prototype.MutationTreeType.PREPAREID],
          couponId: value
}

if(this.addressId){
  
(<any>Object).assign(data,{addressId:this.addressId})

}

   Vue.prototype.$reqFormPost(
      "/prepare/order/update",
      data,
      res => {
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

//  this.getPreInfo(
//       this.$store.getters[Vue.prototype.MutationTreeType.PREPAREID]
//     );
    this.$router.go(-1);


      }
    );


}

 getPreInfo(prepareId) {
    Vue.prototype.$reqFormPost(
      "/prepare/order/query",
      {
        userId: this.$store.getters[Vue.prototype.MutationTreeType.TOKEN_INFO]
          .userId,
        token: this.$store.getters[Vue.prototype.MutationTreeType.TOKEN_INFO]
          .token,
        prepareId: prepareId
      },
      res => {
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
        console.log(res.data.data);
        this.currentCoupon = res.data.data.currentCoupon
        
        this.couponList = res.data.data.couponList
         this.couponList.push()
         console.log( this.couponList)
      }
    );
  }
currentCoupon=null
// 可领取列表
  mounted() {
this.prepareId = this.$route.query.prepareId
if(this.$route.query.addressId){
this.addressId = this.$route.query.addressId
}
this.getPreInfo(this.prepareId)
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
  .coupon_notused {
    background-image: url("../../assets/image/未使用优惠卷.png");
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
  width: 97%;
  bottom: 0;
  position: absolute;
  text-align: center;
  color: #fff;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.nonebtn{
  width: 100%;left:0;
  position: fixed;
  bottom: 0px;
  background: #fff;
  height:60px;
  padding-top:5px;
    span{
         width:92%;margin: 0 auto;border: 1px solid #ededed;color: #838383;text-align: center;line-height: 45px;
         border-radius: 8px;display: inline-block;margin-left: 4%;
    }
  
}
</style>