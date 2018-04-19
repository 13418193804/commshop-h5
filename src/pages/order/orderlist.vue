<template>
  <div class="tab-contents">



    <comhead ref="comhead" isLeftIcon="icon-zuo" leftIconName="angle-left" @leftClick="false"  title="我的订单" isRightIcon="true"  ></comhead>



        <van-tabs :active="active" :sticky="true" >
  <van-tab v-for="(item,index) in orderTitleList" :title="item.name" style="border-top:1px #e5e5e5 solid;">
      <div v-if="index==0">

    <van-list
  v-model="loading"
  :finished="finished"
  @load="onLoad"
 >
  <div v-for="(item,index) in orderList.allOrder.orderList" @click="goDetail(item)">
          <div class="orderTitle textLabel">  
              <div style="padding-left:10px;">
                订单号:{{item.orderId}}
              </div>
              <div  style="display: flex;    align-items: center;" >

                <span v-if="item.detailList[0].refundStatus == 'APPLY_REFUND'">退款中</span>

                <span v-if="item.detailList[0].refundStatus == 'WITHOUT_REFUND'" :style="formatStatusColor(item.orderStatus)">{{formatStatus(item.orderStatus)}}</span>
                  
                     <div style="padding:0 15px;position: relative;" v-if="item.orderStatus=='ORDER_FINISH'">
                       <div class="deleteBorder"> </div>
                <i class="iconfont icon-iconfontshanchu3" style=""></i>
              </div>
              <div v-else style="width:10px"></div>
              </div>
          </div>
    <div class="detailBody">
        <div v-for="items in  item.detailList">
    <div class="product1">
       <div style='display:flex;align-items:center'>
        <img v-lazy='items.goodsImg' style='height:80px;width:80px'/>
      </div>
      <div style='font-size:12px;flex:1;overflow:hidden;padding:0 10px;'>
        <div class='lineTwoType'>{{items.goodsName}}</div>
        <div style='  overflow: hidden;text-overflow: ellipsis;white-space: nowrap;color:#999'>
          <div> {{items.jingle}}</div>
          <!-- <span v-for=" item.skuKeyValue" wx:for-item="i" style='margin-right:5px'>{{i.key}}:{{i.value}}</span> -->
        </div>
      </div>
      <div style='text-align:center;font-size:14px'>
        <div >￥{{items.goodsPrice}}</div>
        <div class="labelPrice" v-if="items.labelPrice">原价:{{items.labelPrice}}</div>
        <div>X {{items.goodsNum}}</div>
      </div>
    </div>
</div>

</div>
<div style="text-align:right;font-size:15px;padding:5px 10px;">
      <span style='margin:0 10rpx ;'>共<span style='margin:0 10rpx;'>
          {{item.orderGoodsNum}}
        </span>件商品</span>
        <span>合计：<span>￥{{item.orderTotalPrice.toFixed(2)}}</span>
        <span>(含运费{{item.transportPrice.toFixed(2)}})</span>
        </span>
</div>

    <div class="settingBody" v-if="item.orderStatus === 'ORDER_WAIT_PAY'">
      <van-button size="small" style="margin-right:10px;">取消订单</van-button>
      <van-button size="small" style="margin-right:10px;" :style="formatButtonColor()">支付订单</van-button>
    </div>

      <div class="settingBody" v-if="item.orderStatus === 'ORDER_WAIT_SENDGOODS'">

      <van-button v-if="item.detailList[0].refundStatus == 'APPLY_REFUND'" size="small" style="margin-right:10px;" :style="formatButtonColor()" @click.stop="doCancelRefund(item)">取消退款</van-button>

      <van-button v-if="item.detailList[0].refundStatus == 'WITHOUT_REFUND'" size="small" style="margin-right:10px;" :style="formatButtonColor()" @click.stop="doRefund(item)">申请退款</van-button>
    </div>
      <div class="settingBody" v-if="item.orderStatus === 'ORDER_WAIT_RECVGOODS'">
      <van-button size="small" style="margin-right:10px;" @click.stop="getShip(item)">查看物流</van-button>
      <van-button size="small" style="margin-right:10px;">退货/退款</van-button>
      <van-button size="small" style="margin-right:10px;" :style="formatButtonColor()" @click.stop="recvgoods(item.orderId)">确认收货</van-button>
    </div>

     <div class="settingBody" v-if="item.orderStatus === 'ORDER_WAIT_REVIEW' ||item.orderStatus === 'ORDER_FINISH'">
      <van-button size="small" style="margin-right:10px;" @click.stop="buyAgain(item.orderId)">再次购买</van-button>
      <van-button size="small" style="margin-right:10px;">退换/售后</van-button>
      <van-button size="small" style="margin-right:10px;" :style="formatButtonColor()">评价</van-button>
    </div>






  <div style="background-color:#f7f7f7;height:10px;">

  </div>
  </div>

</van-list>


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
import { Toast, Dialog } from "vant";
// import { recommendList } from '../../service/getData';
import comhead from "../../components/Comhead.vue";
import axios from "axios";

@Component({
  components: {
    comhead
  },
  mixins: [mixin]
})
export default class orderList extends Vue {
  loading = false;
  finished = false;

  orderList = {
    allOrder: {},
    orderList: { orderList: [] },
    orderList_pay: { orderList: [] },
    orderList_send: { orderList: [] },
    orderList_reacv: { orderList: [] },
    orderList_finish: { orderList: [] },
    orderList_refund: { orderList: [] }
  };
  onLoad() {
    setTimeout(() => {}, 500);
  }

  active = 0;
  orderTitleList = [
    {
      name: "全部",
      status: ""
    },
    {
      name: "待付款",
      status: "ORDER_WAIT_PAY"
    },
    {
      name: "待发货",
      status: "ORDER_WAIT_SENDGOODS"
    },
    {
      name: "待收货",
      status: "ORDER_WAIT_RECVGOODS"
    },
    {
      name: "待评价",
      status: "ORDER_WAIT_REVIEW"
    },
    {
      name: "退换/售后",
      status: "REFUND"
    }
  ];
  // ORDER_WAIT_PAY
  // ORDER_CANCEL_PAY
  // ORDER_WAIT_SENDGOODS
  // ORDER_WAIT_RECVGOODS
  // ORDER_WAIT_REVIEW
  // ORDER_END_GOODS
  // ORDER_FINISH

doCancelRefund(item){
  console.log("取消退款")
Vue.prototype.$reqFormPost(
          "/order/refund/delete",
          {
            userId: this.$store.getters[
              Vue.prototype.MutationTreeType.TOKEN_INFO
            ].userId,
            token: this.$store.getters[
              Vue.prototype.MutationTreeType.TOKEN_INFO
            ].token,
            refundId: item.detailList[0].refundOrderList[0].refundId
          },
          res => {
            if (res == null) {
              console.log("网络请求错误！");
              return;
            }
            if (res.data.status != 200) {
              console.log(
                "需控制错误码" +
                  res.data.status +
                  ",错误信息：" +
                  res.data.message
              );
              Toast(res.data.message);
              return;
            }

            console.log("取消退款成功")
          }
        );


}
  doRefund(item) {
    console.log(item);
    Dialog.confirm({
      title: "提示",
      message: "确定申请退款吗？"
    })
      .then(() => {

        Vue.prototype.$reqFormPost(
          "/order/refund/apply",
          {
            userId: this.$store.getters[
              Vue.prototype.MutationTreeType.TOKEN_INFO
            ].userId,
            token: this.$store.getters[
              Vue.prototype.MutationTreeType.TOKEN_INFO
            ].token,
            orderId: item.orderId,
            money: item.orderTotalPrice,
            refundType: "REFUND"
          },
          res => {
            if (res == null) {
              console.log("网络请求错误！");
              return;
            }
            if (res.data.status != 200) {
              console.log(
                "需控制错误码" +
                  res.data.status +
                  ",错误信息：" +
                  res.data.message
              );
              Toast(res.data.message);
              return;
            }

            console.log("申请退款成功")
          }
        );
        // on confirm
      })
      .catch(() => {
        // on cancel
      });
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
  getShip(item) {
    this.$router.push({ name: "ship", query: item });
  }
  buyAgain(orderId) {
    Vue.prototype.$reqFormPost(
      "/order/buyagain",
      {
        userId: this.$store.getters[Vue.prototype.MutationTreeType.TOKEN_INFO]
          .userId,
        token: this.$store.getters[Vue.prototype.MutationTreeType.TOKEN_INFO]
          .token,
        orderId: orderId
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
          return;
        }
        this.$router.push({ name: "cart" });
      }
    );
  }
  recvgoods(orderId) {
    Dialog.confirm({
      title: "提示",
      message: "确认收货?"
    })
      .then(() => {
        Vue.prototype.$reqFormPost(
          "/order/recvgoods",
          {
            userId: this.$store.getters[
              Vue.prototype.MutationTreeType.TOKEN_INFO
            ].userId,
            token: this.$store.getters[
              Vue.prototype.MutationTreeType.TOKEN_INFO
            ].token,
            orderId: orderId
          },
          res => {
            if (res == null) {
              console.log("网络请求错误！");
              return;
            }
            if (res.data.status != 200) {
              console.log(
                "需控制错误码" +
                  res.data.status +
                  ",错误信息：" +
                  res.data.message
              );
              Toast(res.data.message);
              return;
            }
            this.getOrderList(this.$route.query.orderStatus);
          }
        );
        // on confirm
      })
      .catch(() => {
        // on cancel
      });
  }
  formatButtonColor() {
    return "border-color:#ffc630;color:#ffc630";
  }
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
  getOrderList(orderStatus) {
    Vue.prototype.$reqFormPost(
      "/order/queryorder",
      {
        userId: this.$store.getters[Vue.prototype.MutationTreeType.TOKEN_INFO]
          .userId,
        token: this.$store.getters[Vue.prototype.MutationTreeType.TOKEN_INFO]
          .token,
        orderStatus: orderStatus
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
        this.orderList.allOrder = res.data.data;
        console.log(res.data.data);
      }
    );
  }
  goDetail(item) {
    this.$router.push({
      name: "orderdetail",
      query: {
        orderId: item.orderId
      }
    });
  }
  mounted() {
    console.log(this.$route.query);
    this.orderTitleList.forEach((item, index) => {
      if (this.$route.query.orderStatus == item.status) {
        this.active = index;
        return;
      }
    });
    if (this.$route.query.orderStatus === "REFUND") {
      return;
    }
    this.getOrderList(this.$route.query.orderStatus);
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
.orderTitle {
  font-size: 14px;

  display: flex;
  height: 50px;
  line-height: 50px;
  justify-content: space-between;
}
.detailBody {
}
.deleteBorder {
  border-left: 1px #e5e5e5 solid;
  padding: 0 10px;
  position: absolute;
  height: 20px;
  left: 4px;
  top: 15px;
}
.settingBody {
  border-top: 1px #e5e5e5 solid;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 50px;
}
</style>

<style>
.product1 {
  display: flex;
  font-size: 16px;
  border-top: solid 1px #eee;
  border-bottom: solid 1px #eee;
  align-items: center;
  padding: 10px;
  background-color: #fff;
}
</style>


