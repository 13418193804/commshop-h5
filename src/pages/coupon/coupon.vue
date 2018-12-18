<template>
  <div class="tab-contents">
    <comhead ref="comhead" isLeftIcon="icon-zuo" leftIconName="angle-left" @leftClick="false"  title="优惠券" isRightIcon="true"  ></comhead>

    <van-tabs v-model="active"  @click="changeTab" >
      <van-tab v-for="(item,indexs) in tablist" :title="item" :key="indexs" >

        <!-- 空空如也情况 -->
        <!-- <div style="background-color:#F4F4F4;height:-webkit-fill-available;display:flex;flex-direction:column;align-items: center;">
          <img src="../../assets/image/空空如也.png" :style="handlePX('width', 280)+handlePX('height', 280)+handlePX('margin-top', 110)"/>
          <div :style="handlePX('font-size', 30)" style="color:#7E7E7E;">空空如也~~</div>
        </div> -->

     <ul v-if="couponList.length>0"
          v-infinite-scroll="loadMore"
          :infinite-scroll-disabled="loading"
          infinite-scroll-distance="20" >
        <li >

        <!-- 有卷列表 -->
        <div class="coupon_list" v-for="(item,index) in couponList" v-if="indexs == active" :key="index">
          <!-- 未使用列表 -->          
          <div class="coupon_notused" v-if="item.useStatus == 'UNUSED'&& active == 0 " :style="handlePX('width', 702)+handlePX('height', 248)+handlePX('margin-top', 20)">
            <div class="coupon_cardbox" :style="handlePX('padding-top', 30)">
              <div class="coupon_car_left" :style="handlePX('padding-left', 60)">
                <div style="color:#fff;" :style="handlePX('font-size', 65)">{{item.couponDenomination}}<span :style="handlePX('font-size', 42)">元</span></div>
                <div style="color:rgba(255,255,255,0.8);    margin-right: 5px;
    color: rgb(255, 255, 255);
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;">满{{item.fullDenomination}}减{{item.couponDenomination}}</div>
              </div>
              <div class="coupon_car_right" :style="handlePX('padding-right', 42)+handlePX('padding-top', 30)">
                <van-button size="mini" :style="handlePX('width', 135)+handlePX('height', 40)" @click="goIndex()"
                style="border:0;background-color:rgba(255,255,255,0.9);color:#fd5f61;">去使用</van-button>
                <div> <i style="color: #fff;" v-if="item.linkCreateTime">{{item.linkCreateTime.split(' ')[0]}} - </i>
                      <i style="color: #fff;" v-if="item.validityTime">{{item.validityTime.split(' ')[0]}}</i></div>
                <!-- <div style="color:rgba(255,255,255,0.8);" :style="handlePX('font-size', 26)">2018.03.24-2018.03.24</div> -->
              </div>
            </div>
            <div class="coupon_car_bottom" :style="handlePX('line-height', 52)+handlePX('font-size', 20)+handlePX('padding-left', 40)">   <span v-if="item.conditionType == 'NEW_USER'">新人专享;</span>               <span v-if="item.rangeType == 'ALL'">全场通用;</span>               <span v-else>{{item.catName}}类商品适用;</span>               特价商品或其他优惠活动商品不可叠加使用；特价商品或其他优惠活动商品不可叠加使用</div>
          </div>
          <!-- 已使用列表 -->      
          <div class="coupon_used" v-if="item.useStatus == 'USED' && active == 1 " :style="handlePX('width', 702)+handlePX('height', 248)+handlePX('margin-top', 20)">
            <div class="coupon_cardbox" :style="handlePX('padding-top', 30)">
              <div class="coupon_car_left" :style="handlePX('padding-left', 60)">
                <div style="color:#fff;" :style="handlePX('font-size', 65)">{{item.couponDenomination}}<span :style="handlePX('font-size', 42)">元</span></div>
                <div style="color:rgba(255,255,255,0.8);">满{{item.fullDenomination}}减{{item.couponDenomination}}</div>
              </div>
              <div class="coupon_car_right" :style="handlePX('padding-right', 42)+handlePX('padding-top', 30)">
                <div :style="handlePX('width', 135)+handlePX('height', 40)" style="color:rgba(255,255,255,0.8);">已使用</div>
                <!-- <div style="color:rgba(255,255,255,0.8);" :style="handlePX('font-size', 26)">2018.03.24-2018.03.24</div> -->
              </div>
            </div>
            <div class="coupon_car_bottom" :style="handlePX('line-height', 52)+handlePX('font-size', 20)+handlePX('padding-left', 40)">   <span v-if="item.conditionType == 'NEW_USER'">新人专享;</span>               <span v-if="item.rangeType == 'ALL'">全场通用;</span>               <span v-else>{{item.catName}}类商品适用;</span>               特价商品或其他优惠活动商品不可叠加使用；特价商品或其他优惠活动商品不可叠加使用</div>
          </div>

          <!-- 已过期列表 -->      
          <div class="coupon_overdue" v-if="item.useStatus == 'OVERDUE' && active == 2 " :style="handlePX('width', 702)+handlePX('height', 248)+handlePX('margin-top', 20)">
            <div class="coupon_cardbox" :style="handlePX('padding-top', 30)">
              <div class="coupon_car_left" :style="handlePX('padding-left', 60)">
                <div style="color:#fff;" :style="handlePX('font-size', 65)">{{item.couponDenomination}}<span :style="handlePX('font-size', 42)">元</span></div>
                <div style="color:rgba(255,255,255,0.8);">满{{item.fullDenomination}}减{{item.couponDenomination}}</div>
              </div>
              <div class="coupon_car_right" style="align-self: flex-end;" :style="handlePX('padding-right', 42)+handlePX('padding-top', 30)">
                <!-- <div style="color:rgba(255,255,255,0.8);" :style="handlePX('font-size', 26)">2018.03.24-2018.03.24</div> -->
              </div>
            </div>
            <div class="coupon_car_bottom" :style="handlePX('line-height', 52)+handlePX('font-size', 20)+handlePX('padding-left', 40)">   <span v-if="item.conditionType == 'NEW_USER'">新人专享;</span>               <span v-if="item.rangeType == 'ALL'">全场通用;</span>               <span v-else>{{item.catName}}类商品适用;</span>               特价商品或其他优惠活动商品不可叠加使用；特价商品或其他优惠活动商品不可叠加使用</div>
          </div>
        </div>
        </li>
      </ul>
      <div style="font-size:14px;padding:15px;text-align: center;" v-else>
       
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARgAAAEYCAYAAACHjumMAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkM2MDdCNkNFMzY1MjExRThBOTJFQkU3QjYzRDg3RjM0IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkM2MDdCNkNGMzY1MjExRThBOTJFQkU3QjYzRDg3RjM0Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QzYwN0I2Q0MzNjUyMTFFOEE5MkVCRTdCNjNEODdGMzQiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QzYwN0I2Q0QzNjUyMTFFOEE5MkVCRTdCNjNEODdGMzQiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7kJNQ6AAAQBUlEQVR42uzd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" v-if="indexs == active"/>
          <p style="font-size:14px;color:#a3a3a3;" v-if="indexs == active">空空如也～</p>
      </div>
         <!--领卷按钮   -->
        <div :style="handlePX('padding', 30)+handlePX('margin-top', 100)" v-if="indexs == active">
          <div @click="go_collar_center()" :style="handlePX('height', 90)" style="border:1px solid #ffce5b;border-radius: 8px;display: flex;justify-content: center;align-items: center;">
            <img src="../../assets/image/优惠卷.png" :style="handlePX('width', 45)+handlePX('height', 45)"/>
            <div style="color:#ffce5b;">去领券中心逛逛</div>
          </div>
          
        </div>
      </van-tab>
    </van-tabs>


   

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
export default class coupon extends Vue {
  tablist = ["未使用", "已使用", "已失效"];
  go_collar_center() {
    this.$router.push("/collar_center");
  }
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
  couponList = [];
  active = 0;

  loading = false;
  loadMore() {
    console.log("刷新");
    this.loading = true;
    let self = this;
    setTimeout(() => {
      if (!self.loading) {
        switch (self.active) {
          case 0:
            self.unusedindexPage += 1;
            break;
          case 1:
            self.usedindexPage += 1;
            break;
          case 2:
            self.overdueindexPage += 1;
            break;
        }
        self.getList();
        self.loading = false;
      }
    }, 1000);
  }

  unusedindexPage = 0;
  usedindexPage = 0;  
  overdueindexPage = 0;

  changeTab(active) {
    this.active = active;
    this.getList();
  }
//使用跳转首页
goIndex(){
  this.$router.push("/");
}
  getList() {
    let status = "";
    let page = 0;
    switch (this.active) {
      case 0:
        status = "UNUSED";
        page = this.unusedindexPage;
        break;
      case 1:
        status = "USED";
        page = this.usedindexPage;
        break;
      case 2:
        status = "OVERDUE";
        page = this.overdueindexPage;
        break;
    }
    let data = {
      userId: this.$store.getters[Vue.prototype.MutationTreeType.TOKEN_INFO]
        .userId,
      token: this.$store.getters[Vue.prototype.MutationTreeType.TOKEN_INFO]
        .token,
      status: status,
      page: page,
      pageSize: 20
    };

    Vue.prototype.$reqFormPost("/coupon/user/list", data, res => {
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
      this.couponList = res.data.data.couponList;
       if (res.data.data.couponList.length == 20) {
          this.loading = false;
        }
      console.log("优惠券列表", res.data);
    });
  }
  mounted() {
    this.getList();
    console.log("优惠券");
  }
}
</script>


<style lang="scss" scoped>
@import "../../style/utils.scss";
.coupon_list {
  display: flex;
  align-items: center;
  flex-direction: column;
  .coupon_notused {
    background-image: url("../../assets/image/未使用优惠卷.png");
    background-size: 100% 100%;
    position: relative;
  }
  .coupon_used {
    background-image: url("../../assets/image/已使用优惠卷.png");
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
</style>