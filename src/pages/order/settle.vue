<template>
  <div class="tab-contents" style="height:-webkit-fill-available;">
            <comhead ref="comhead" isLeftIcon="icon-zuo" leftIconName="angle-left" @leftClick="false"  title="确认订单" isRightIcon="true"  ></comhead>
        <div class="addressbox" @click="goSelectAddress()">
        <div  style="display:flex;align-items: center;padding:10px;">
  <div v-if="!address"  style="flex:1;">
              请选择一个收货地址
            </div>
              <div v-else style="flex:1;">
    <div style="    font-size: 16px;    display: flex;justify-content: space-between;">
      <span>收货人:{{address.contactname}}</span>
      <span style="margin-right:10px;">{{address.contactmobile}}</span>
    </div>
      <div style="display:flex;    align-items: center;padding: 5px; " >
                  <div>
                    <i class="iconfont icon-location" style="margin-right:10px;font-size:22px;"></i>
                  </div>
                    <div class="lineTwo">
                     收货地址：    {{address.province}}{{address.city}}{{address.country}}{{address.address}}
                    </div>

              </div>
              </div>
         <i class="iconfont icon-youjiantou" style="font-size:20px;"></i>
           </div>
        </div>
            <div style="    display: flex;height: 5px;">
         <img src="../../assets/jiange.png" style="width:100%;"/>
     </div>
<div style="background-color:#fff;margin-bottom:10px;">
<div v-for="(item,index) in shopCartList" >
   
    <div class="product">
       <div style='display:flex;align-items:center'>
        <img v-lazy='item.goodsImg' style='height:70px;width:70px'/>
      </div>
      <div style='flex:1;padding:0 10px;'>

        <div class='lineTwoType' style="flex:1;">{{item.goodsName}}</div>
        <div class='lineTwoType' style="flex:1;color:#666;font-size:14px;" >{{item.jingle}}</div>
        <div >
            <span class="marketPrice">￥{{item.price}}</span> 
            <span class="labelPrice" style="font-size:12px;">￥{{item.labelPrice}}</span>
        </div>
      </div>
        <div>X {{item.num}}</div>
    </div>
</div>

<div style="height:10px;background-color:#f7f7f7;"></div>
<div class="settingItem">
    <div>运费</div>
    <div>{{freight.toFixed(2)}}</div>
</div>

<div style="margin: 0 10px;text-align:right;padding:10px;">
     <span style='margin:0 10rpx;'>
          <!-- {{shopCartList[0].num}} -->
        共{{goodsSum}}件商品
     </span>
     <span>小计：<span class="marketPrice">￥{{totalPrice.toFixed(2)}}</span></span>
</div>
<div style="height:10px;background-color:#f7f7f7;"></div>

</div>

 <van-submit-bar
  :price="totalPrice* 100"
  button-text="立即支付"
  @submit="onSubmit"
/>





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
  prepareId = "";
  pageType = "";
  shopCartList = [];
  address = null;
  totalPrice = 0;
freight=0;
  goodsSum = 0;
  goSelectAddress() {
    this.$router.push({
      name: "selectaddress"
    });
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
        this.shopCartList = res.data.data.shopCartList;
        this.address = res.data.data.address;
        this.totalPrice = res.data.data.totalPrice ;
        this.goodsSum = res.data.data.goodsSum;
        this.freight = res.data.data.freight;

      }
    );
  }
  onSubmit() {
    if (!this.address) {
      Toast("请选择一个收货地址");
      return;
    }
    Vue.prototype.$reqFormPost(
      "/prepare/order/submit",
      {
        userId: this.$store.getters[Vue.prototype.MutationTreeType.TOKEN_INFO]
          .userId,
        token: this.$store.getters[Vue.prototype.MutationTreeType.TOKEN_INFO]
          .token,
        prepareId: this.prepareId
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

        this.$router.replace({
          name: "pay",
          query: res.data.data
        });
        console.log(res.data.data);
      }
    );
  }
  mounted() {
    this.prepareId = this.$store.getters[
      Vue.prototype.MutationTreeType.PREPAREID
    ];
    this.getPreInfo(
      this.$store.getters[Vue.prototype.MutationTreeType.PREPAREID]
    );
  }
}
</script>

<style lang="scss" scoped>
@import "../../style/utils.scss";
.bodyLabel {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
.addressbox {
  background-color: #fff;
  font-size: 14px;
}
.settingItem{

    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #e5e5e5;
    margin: 0 10px;
    padding:10px 0;
}
.product {
  display: flex;
  font-size: 16px;
  margin: 0 10px;
  align-items: flex-start;
  padding: 10px 0;
  background-color: #fff;
}
</style>


