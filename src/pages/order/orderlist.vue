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
  <div v-for="(item,index) in orderList.allOrder.orderList" >
          <div class="orderTitle">  
              <div>
                订单号:{{item.orderId}}
              </div>
              <div>
                {{item.orderStatus}}
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
        <div>X {{items.goodsNum}}</div>
      </div>
    </div>
</div>

</div>
<div style="text-align:right;font-size:15px;padding:5px 10px;">
      <span style='margin:0 10rpx ;'>共<span style='margin:0 10rpx;'>
          {{item.orderGoodsNum}}
        </span>件商品</span>
        <span>合计：<span>￥{{item.orderTotalPrice}}</span>
        </span>
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
import { Toast } from "vant";
// import { recommendList } from '../../service/getData';
import comhead from "../../components/Comhead.vue";

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

  mounted() {
    console.log(this.$route.query)
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
  display: flex;
  height: 50px;
  line-height: 50px;
}
.detailBody {
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


