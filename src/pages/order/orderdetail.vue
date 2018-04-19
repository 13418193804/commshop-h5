<template>
  <div class="tab-contents" style="height:-webkit-fill-available;">
            <comhead ref="comhead" isLeftIcon="icon-zuo" leftIconName="angle-left" @leftClick="false"  title="订单详情" isRightIcon="true"  ></comhead>
            <div style="background-color:#f7f7f7;display: flex;justify-content: space-between;padding: 10px;font-size: 16px;align-items: center;">
                <div>订单状态</div>
                <div :style="formatStatusColor(detail.orderStatus)">{{formatStatus(detail.orderStatus)}}</div>
            </div>
     <div style="    display: flex;height: 5px;">
         <img src="../../assets/jiange.png" style="width:100%;"/>
     </div>
        <div  style="display:flex;align-items: center;padding:10px;">
         <div  style="flex:1;">
    <div style="    font-size: 16px;   display: flex;justify-content: space-between;">
      <span>收货人：{{detail.contactName}}</span>
      <span style="margin-right:10px;">{{detail.contactPhone}}</span>
    </div>
      <div style="display:flex;    align-items: center;padding: 5px;     font-size: 14px; " >
                  <div>
                    <i class="iconfont icon-location" style="margin-right:10px;font-size:22px;"></i>
                  </div>
                    <div class="lineTwo">
                     收货地址：    {{detail.provinceName}}{{detail.cityName}}{{detail.countryName}}{{detail.address}}
                    </div>

              </div>
              </div>
           </div>
        <div style="height:10px;background-color:#f7f7f7;"></div>
    <div style="">
        <div v-for="(item,index) in detail.detailList">
                <div  class="product">
                     <div style='display:flex;align-items:center'>
        <img v-lazy='item.goodsImg' style='height:70px;width:70px'/>
      </div>
      <div style='font-size:16px;flex:1;overflow:hidden;padding:0 10px;'>
       <div style=" height:100%;">
        <div class='lineTwoType'>{{item.goodsName}}</div>
            <div style='  overflow: hidden;text-overflow: ellipsis;white-space: nowrap;color:#999'>
          <div style="font-size:14px;color:#666">{{item.jingle}}</div>
       </div>
          <!-- <span v-for=" item.skuKeyValue" wx:for-item="i" style='margin-right:5px'>{{i.key}}:{{i.value}}</span> -->
        </div>
      </div>
      <div style='text-align:center;font-size:14px'>
        <div >￥{{item.goodsPrice}}</div>
        <div class="labelPrice">￥{{item.goodsPrice}}</div>
        <div>X {{item.goodsNum}}</div>
      </div>
    </div>
        </div>
 </div>

 <div style="">
        <div style="margin-left:10px;border-bottom:1px #e5e5e5 solid;display:flex;justify-content: space-between;padding:10px;">
                <div>运费</div>
                <div style="margin-right:10px;">￥{{detail.transportPrice.toFixed(2)}}</div>
        </div>

      <div style="margin:0 0 0 10px;display:flex;justify-content: space-between;padding:10px;">
                <div>订单总价</div>
                <div style="margin-right:10px;" class="marketPrice">￥{{detail.orderTotalPrice.toFixed(2)}}</div>
        </div>

    </div>

        <div style="height:10px;background-color:#f7f7f7;"></div>

<div style="padding:10px;    line-height: 24px;">
    
  <div>
        订单号：{{detail.orderId}}
    </div>
 <div>
        创建时间：{{detail.createTime}}
    </div>
 <div>
        支付时间：{{detail.payTime}}
    </div>

</div>
        <div style="height:10px;background-color:#f7f7f7;"></div>
<div style="    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    font-size: 14px;">
    <div>服务时间：9:00 - 22:00</div>
    <van-button size="small">联系客服</van-button>

</div>




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
export default class orderdetail extends Vue {
  orderId ="";
  detail = "";
  formatStatus(status) {
    // ORDER_WAIT_PAY
    // ORDER_CANCEL_PAY
    // ORDER_WAIT_SENDGOODS
    // ORDER_WAIT_RECVGOODS
    // ORDER_WAIT_REVIEW
    // ORDER_END_GOODS
    // ORDER_FINISH
    switch (status) {
      case "ORDER_WAIT_PAY":
        return "等待付款";
      case "ORDER_CANCEL_PAY":
        return "交易取消";
      case "ORDER_WAIT_SENDGOODS":
        return "等待发货";
      case "ORDER_WAIT_RECVGOODS":
        return "等待收货";
      case "ORDER_END_GOODS":
        return "交易结束";
      case "ORDER_WAIT_REVIEW" || "ORDER_FINISH":
        return "交易完成";
    }
  }
  queryDetail() {
    Vue.prototype.$reqFormPost(
      "/order/queryorderdetail",
      {
        userId: this.$store.getters[Vue.prototype.MutationTreeType.TOKEN_INFO]
          .userId,
        token: this.$store.getters[Vue.prototype.MutationTreeType.TOKEN_INFO]
          .token,
        orderId: this.orderId
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
        this.detail = res.data.data;
        console.log(res.data.data);
      }
    );
  }
  formatStatusColor(status) {
    switch (status) {
      case "ORDER_WAIT_SENDGOODS":
        return "color:red";
      case "ORDER_WAIT_RECVGOODS":
        return "color:red";
      case "ORDER_CANCEL_PAY":
        return "color:red";
      case "ORDER_WAIT_PAY":
        return "color:red";
      case "ORDER_WAIT_REVIEW":
        return "color:#ffc630";
      case "ORDER_FINISH":
        return "color:#ffc630;";
    }
  }
  mounted() {
    this.orderId = this.$route.query.orderId;
    this.queryDetail();
  }
}
</script>

<style lang="scss" scoped>
@import "../../style/utils.scss";
.product {
  display: flex;
  font-size: 16px;
  border-bottom: solid 1px #eee;
  align-items: center;
  padding: 10px;
  background-color: #fff;
}
</style>


