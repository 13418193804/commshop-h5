<template>
  <div class="tab-contents">
    <comhead ref="comhead" isLeftIcon="icon-zuo" leftIconName="angle-left" @leftClick="false"  title="优惠卷" isRightIcon="true"  ></comhead>

    <van-tabs v-model="active"  @click="changeTab" >
      <van-tab v-for="(item,indexs) in tablist" :title="item" :key="indexs" >

        <!-- 空空如也情况 -->
        <!-- <div style="background-color:#F4F4F4;height:-webkit-fill-available;display:flex;flex-direction:column;align-items: center;">
          <img src="../../assets/image/空空如也.png" :style="handlePX('width', 280)+handlePX('height', 280)+handlePX('margin-top', 110)"/>
          <div :style="handlePX('font-size', 30)" style="color:#7E7E7E;">空空如也~~</div>
        </div> -->

     <ul
  v-infinite-scroll="loadMore"
  :infinite-scroll-disabled="loading"
  infinite-scroll-distance="20" >

        <li >

        <!-- 有卷列表 -->
        <div class="coupon_list" v-for="(item,index) in couponList" v-if="indexs == active" :key="index">
          <!-- 未使用列表 -->          
          <div class="coupon_notused" v-if="item.status == 'UNUSED'&& active == 0" :style="handlePX('width', 702)+handlePX('height', 248)+handlePX('margin-top', 20)">
            <div class="coupon_cardbox" :style="handlePX('padding-top', 30)">
              <div class="coupon_car_left" :style="handlePX('padding-left', 60)">
                <div style="color:#fff;" :style="handlePX('font-size', 65)">{{item.coupon.couponDenomination}}<span :style="handlePX('font-size', 42)">元</span></div>
                <div style="color:rgba(255,255,255,0.8);">{{item.coupon.couponName}}</div>
              </div>
              <div class="coupon_car_right" :style="handlePX('padding-right', 42)+handlePX('padding-top', 30)">
                <van-button size="mini" :style="handlePX('width', 135)+handlePX('height', 40)" style="border:0;background-color:rgba(255,255,255,0.9);color:#fd5f61;">去使用</van-button>
                <!-- <div style="color:rgba(255,255,255,0.8);" :style="handlePX('font-size', 26)">2018.03.24-2018.03.24</div> -->
              </div>
            </div>
            <div class="coupon_car_bottom" :style="handlePX('line-height', 52)+handlePX('font-size', 20)+handlePX('padding-left', 40)">全场通用；特价商品或其他优惠活动商品不可叠加使用</div>
          </div>

          <!-- 已使用列表 -->      
          <div class="coupon_used" v-if="item.status == 'USED' && active == 1" :style="handlePX('width', 702)+handlePX('height', 248)+handlePX('margin-top', 20)">
            <div class="coupon_cardbox" :style="handlePX('padding-top', 30)">
              <div class="coupon_car_left" :style="handlePX('padding-left', 60)">
                <div style="color:#fff;" :style="handlePX('font-size', 65)">{{item.coupon.couponDenomination}}<span :style="handlePX('font-size', 42)">元</span></div>
                <div style="color:rgba(255,255,255,0.8);">{{item.coupon.couponName}}</div>
              </div>
              <div class="coupon_car_right" :style="handlePX('padding-right', 42)+handlePX('padding-top', 30)">
                <div :style="handlePX('width', 135)+handlePX('height', 40)" style="color:rgba(255,255,255,0.8);">已使用</div>
                <!-- <div style="color:rgba(255,255,255,0.8);" :style="handlePX('font-size', 26)">2018.03.24-2018.03.24</div> -->
              </div>
            </div>
            <div class="coupon_car_bottom" :style="handlePX('line-height', 52)+handlePX('font-size', 20)+handlePX('padding-left', 40)">全场通用；特价商品或其他优惠活动商品不可叠加使用</div>
          </div>




          <!-- 已过期列表 -->      
          <div class="coupon_overdue" v-if="item.status == 'OVERDUE' && active == 2" :style="handlePX('width', 702)+handlePX('height', 248)+handlePX('margin-top', 20)">
            <div class="coupon_cardbox" :style="handlePX('padding-top', 30)">
              <div class="coupon_car_left" :style="handlePX('padding-left', 60)">
                <div style="color:#fff;" :style="handlePX('font-size', 65)">{{item.coupon.couponDenomination}}<span :style="handlePX('font-size', 42)">元</span></div>
                <div style="color:rgba(255,255,255,0.8);">{{item.coupon.couponName}}</div>
              </div>
              <div class="coupon_car_right" style="align-self: flex-end;" :style="handlePX('padding-right', 42)+handlePX('padding-top', 30)">
                <!-- <div style="color:rgba(255,255,255,0.8);" :style="handlePX('font-size', 26)">2018.03.24-2018.03.24</div> -->
              </div>
            </div>
            <div class="coupon_car_bottom" :style="handlePX('line-height', 52)+handlePX('font-size', 20)+handlePX('padding-left', 40)">全场通用；特价商品或其他优惠活动商品不可叠加使用</div>
          </div>


        </div>




        <!--领卷按钮   -->
        <div :style="handlePX('padding', 30)+handlePX('margin-top', 100)" v-if="indexs == active">
          <div @click="go_collar_center()" :style="handlePX('height', 90)" style="border:1px solid #ffce5b;border-radius: 8px;display: flex;justify-content: center;align-items: center;">
            <img src="../../assets/image/优惠卷.png" :style="handlePX('width', 45)+handlePX('height', 45)"/>
            <div style="color:#ffce5b;">去领卷中心逛逛</div>
          </div>
          
        </div>


     </li>
        </ul>


      </van-tab>
    </van-tabs>


   
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
            self.usedindexPage += 1;
            break;
          case 1:
            self.unusedindexPage += 1;
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

  usedindexPage = 0;
  unusedindexPage = 0;
  overdueindexPage = 0;

  changeTab(active) {
    this.active = active;
    this.getList();
  }

  getList() {
    let status = "";
    let page = 0;
    switch (this.active) {
      case 0:
        status = "UNUSED";
        page = this.usedindexPage;
        break;
      case 1:
        status = "USED";
        page = this.unusedindexPage;
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

    Vue.prototype.$reqFormPost("/coupon/user/linklist", data, res => {
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
    console.log("优惠卷");
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
  bottom: 0;
  position: absolute;
  text-align: center;
  color: #fff;
}
</style>