<template>
  <div class="tab-contents" style="height:-webkit-fill-available;background-color:#f7f7f7;">
            <comhead ref="comhead" isLeftIcon="icon-zuo" leftIconName="angle-left" @leftClick="false"  title="确认订单" isRightIcon="true"  ></comhead>
        <div class="addressbox" @click="goSelectAddress()">
            <div v-if="!address" >
              请选择一个收货地址
            </div>
        <div v-else>
           {{address}}
           </div>
        </div>
<div style="background-color:#fff;margin-bottom:10px;">
<div v-for="(item,index) in shopCartList" >
   
    <div class="product">
       <div style='display:flex;align-items:center'>
        <img v-lazy='item.goodsImg' style='height:60px;width:60px'/>
      </div>
      <div style='font-size:12px;flex:1;overflow:hidden;padding:0 10px;'>
        <div class='lineTwoType'>{{item.goodsName}}</div>
        <div style='  overflow: hidden;text-overflow: ellipsis;white-space: nowrap;color:#999'>
          <!-- <span v-for=" item.skuKeyValue" wx:for-item="i" style='margin-right:5px'>{{i.key}}:{{i.value}}</span> -->
        </div>
      </div>
      <div style='text-align:center;font-size:14px'>
        <div style='color:#ff9800'>￥{{item.price}}</div>
        <div>X {{item.num}}</div>
      </div>
    </div>
</div>
<div style="margin: 0 10px;text-align:right;font-size:15px;padding:5px;color:#808080">
      <span style='margin:0 10rpx ;'>共<span style='color:#ff9800;margin:0 10rpx;'>
          <!-- {{shopCartList[0].num}} -->
        
        </span>件商品</span>
</div>
</div>

 <van-submit-bar
  :price="totalPrice"
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
        this.totalPrice = res.data.data.totalPrice * 100;
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
        console.log(res);
        if (res.data.status != 200) {
          console.log(
            "需控制错误码" + res.data.status + ",错误信息：" + res.data.message
          );
          Toast(res.data.message);
          return;
        }
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
  margin: 5px 0 10px;
  font-size: 14px;
  height: 50px;
  line-height: 50px;
  border-bottom: 1px #e5e5e5 solid;
}
.product {
  display: flex;
  font-size: 16px;
  margin: 0 10px;
  border-bottom: solid 1px #eee;
  align-items: center;
  padding: 10px 0;
  background-color: #fff;
}
</style>


