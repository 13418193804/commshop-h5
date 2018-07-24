<template>
  <div class="tab-contents">
    <comhead ref="comhead" isLeftIcon="icon-zuo" leftIconName="angle-left" @leftClick="false"  title="我的订单" isRightIcon="true"  ></comhead>
     
        <van-tabs :active="active" :sticky="true" @click="changePage" > 
           <ul
  v-infinite-scroll="loadMore"
  :infinite-scroll-disabled="loading"
  infinite-scroll-distance="20"
   >
  <van-tab v-for="(n,sindex) in orderTitleList"  :title="n.name" style="" :key="sindex" 
 >
<!-- border-top:1px #e5e5e5 solid; -->
      <div  v-if="active == sindex&&orderList[returnKey()].orderList.length>0">
  
        <li v-for="(item,index) in orderList[returnKey()].orderList" @click="goDetail(item)" :key="index">

  <div>
          <div class="orderTitle textLabel">  
              <div style="padding-left:10px;">
                订单号:{{item.orderId}}
              </div>
              <div  class="flex flex-align-center" >
                
                  <span v-if="active == '0' && item.detailList[0].refundStatus == 'SUCCEED_REFUND' " style="color:red">退款完成</span>
                <span :style="formatStatusColor(item.orderStatus)" v-else-if="active != '5' ">{{formatStatus(item.orderStatus)}}</span>
                <!-- v-if="item.detailList[0].refundStatus == 'WITHOUT_REFUND'"  -->

                <span v-if="active == '5'">
                  <span v-if="item.detailList[0].refundStatus == 'APPLY_REFUND' " style="color:red">退款中</span>
                  <span v-if="item.detailList[0].refundStatus == 'SUCCEED_REFUND' " style="color:red">退款完成</span>
                  <span v-if="item.detailList[0].refundStatus == 'WAIT_GOODS_BACK' " style="color:red">退款中</span>
                  <span v-if="item.detailList[0].refundStatus == 'WAIT_RECVGOODS' " style="color:red">退款中</span>
                <!-- <span v-if="item.detailList[0].refundStatus == 'SUCCEED_REFUND'" style="color:#ffc630;">已退款</span>
                <span v-if="item.detailList[0].refundStatus == 'WAIT_GOODS_BACK'" style="color:#ffc630;">待寄回</span>
                <span v-if="item.detailList[0].refundStatus == 'WAIT_RECVGOODS'" style="color:#ffc630;">退货中</span> -->
                <span v-if="item.detailList[0].refundStatus == 'FAIL_REFUND'" style="color:red;">已拒绝</span>
                </span>
                     <div style="padding:0 15px;position: relative;"  @click.stop="doDeleteOrder(item.orderId)"  v-if=" active == '0' && ( item.orderStatus === 'ORDER_FINISH' || item.orderStatus =='ORDER_CANCEL_PAY')&&(item.detailList[0].refundStatus == 'WITHOUT_REFUND' ||item.detailList[0].refundStatus == 'SUCCEED_REFUND') ">
                       <div class="deleteBorder"> </div>
                <i class="iconfont icon-iconfontshanchu3" style="" ></i>
              </div>
              <div v-else style="width:10px"></div>
              </div>
          </div>
    <div class="detailBody">
        <div v-for="items in  item.detailList">
    <div class="product1">
       <div class="flex flex-align-center">
        <img v-lazy='items.goodsImg' style='height:80px;width:80px'/>
      </div>
      <div class="flex-1" style='font-size:12px;overflow:hidden;padding:0 10px;'>
        <div class='lineTwoType'>{{items.goodsName}}</div>
        <div style='  overflow: hidden;text-overflow: ellipsis;color:#999'>
          <div> {{items.jingle}}</div>
          <!-- <span v-for=" item.skuKeyValue" wx:for-item="i" style='margin-right:5px'>{{i.key}}:{{i.value}}</span> -->
        </div>
      </div>
      <div style='text-align:center;font-size:14px'>
        <div >￥{{items.goodsPrice}}</div>
        <div class="labelPrice" v-if="items.labelPrice">￥{{items.labelPrice}}</div>
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
        <span v-if="item.orderStatus == 'ORDER_WAIT_PAY'" >(含运费{{item.transportPrice.toFixed(2)}})</span>
        </span>
</div>

    <div class="settingBody" v-if="item.orderStatus === 'ORDER_WAIT_PAY'">
      <van-button size="small" style="margin-right:10px;" @click.stop="doCancel(item)">取消订单</van-button>
      <van-button size="small" style="margin-right:10px;" :style="formatButtonColor()"  @click.stop="payOrder(item)">支付订单</van-button>
   
    </div>

      <div class="settingBody" v-if="item.orderStatus === 'ORDER_WAIT_SENDGOODS'">
      <van-button v-if="item.detailList[0].refundStatus == 'APPLY_REFUND' && item.detailList[0].refundStatus !== 'FAIL_REFUND'" size="small" style="margin-right:10px;" :style="formatButtonColor()" @click.stop="goDetail(item)">取消退款</van-button>
      <van-button v-if="item.detailList[0].refundStatus == 'WITHOUT_REFUND' || item.detailList[0].refundStatus == 'FAIL_REFUND' " size="small" style="margin-right:10px;" :style="formatButtonColor()" @click.stop="doRefund(item)">申请退款</van-button>
     <van-button v-if="item.detailList[0].refundStatus == 'WAIT_GOODS_BACK'" size="small" style="margin-right:10px;" :style="formatButtonColor()" @click.stop="inputTransNo(item)">商品寄回</van-button>
    </div>
      <div class="settingBody" v-if="item.orderStatus === 'ORDER_WAIT_RECVGOODS'">
       <div  v-if="item.detailList[0].refundStatus == 'WITHOUT_REFUND' || item.detailList[0].refundStatus == 'FAIL_REFUND' ">
      <van-button size="small" style="margin-right:10px;" @click.stop="getShip(item)">查看物流</van-button>
      <van-button size="small" style="margin-right:10px;" @click.stop="doRefund(item)">退货/退款</van-button>
      <van-button size="small" style="margin-right:10px;"  :style="formatButtonColor()" @click.stop="recvgoods(item.orderId)">确认收货</van-button>
        </div>
        <div v-if="item.detailList[0].refundStatus == 'APPLY_REFUND' && item.detailList[0].refundStatus !== 'FAIL_REFUND'">
     <van-button v-if="item.detailList[0].refundStatus !== 'WITHOUT_REFUND' && item.detailList[0].refundStatus !== 'FAIL_REFUND'" size="small" style="margin-right:10px;" :style="formatButtonColor()" @click.stop="goDetail(item)">取消退款</van-button>
          </div>  
     <van-button v-if="item.detailList[0].refundStatus == 'WAIT_GOODS_BACK'" size="small" style="margin-right:10px;" :style="formatButtonColor()" @click.stop="inputTransNo(item)">商品寄回</van-button>
           
  <!-- <van-button v-if="item.detailList[0].refundStatus == 'FAIL_REFUND'"  size="small" style="margin-right:10px;"  @click.stop="doRefund(item)">重新申请</van-button> -->
      <!-- <van-button v-if="item.detailList[0].refundStatus == 'APPLY_REFUND'" size="small" style="margin-right:10px;" :style="formatButtonColor()" @click.stop="goDetail(item)">取消退款</van-button> -->
    
    </div>





     <div class="settingBody" v-if="item.orderStatus === 'ORDER_WAIT_REVIEW' ||item.orderStatus === 'ORDER_FINISH'">
        <div  v-if="item.detailList[0].refundStatus == 'WITHOUT_REFUND' || item.detailList[0].refundStatus == 'FAIL_REFUND' ">
      <van-button size="small" style="margin-right:10px;" :style="formatButtonColor()" @click.stop="buyAgain(item.orderId)">再次购买</van-button>
      <van-button size="small" style="margin-right:10px;" v-if="item.orderStatus === 'ORDER_WAIT_REVIEW' " @click.stop="doRefund(item)">退换/售后</van-button>
      <van-button size="small" style="margin-right:10px;" v-if="item.orderStatus === 'ORDER_WAIT_REVIEW'" :style="formatButtonColor()" @click.stop="gocomment(item)">评价商品</van-button>
    </div>

        <div v-if="item.detailList[0].refundStatus == 'APPLY_REFUND' && item.detailList[0].refundStatus !== 'FAIL_REFUND'">
      <van-button v-if="item.detailList[0].refundStatus == 'APPLY_REFUND' && item.detailList[0].refundStatus !== 'FAIL_REFUND'" size="small" style="margin-right:10px;" :style="formatButtonColor()" @click.stop="goDetail(item)">取消退款</van-button>
          </div>
     <van-button v-if="item.detailList[0].refundStatus == 'WAIT_GOODS_BACK'" size="small" style="margin-right:10px;" :style="formatButtonColor()" @click.stop="inputTransNo(item)">商品寄回</van-button>
          
    </div>



     <div class="settingBody" v-if="item.orderStatus === 'ORDER_END_GOODS'">
        <div  v-if="item.detailList[0].refundStatus == 'WITHOUT_REFUND' || item.detailList[0].refundStatus == 'FAIL_REFUND' ">
      <van-button size="small" style="margin-right:10px;" @click.stop="doRefund(item)">退换/售后</van-button>
      <van-button size="small" style="margin-right:10px;" @click.stop="getShip(item)" :style="formatButtonColor()">查看物流</van-button>
    </div>

        <div v-if="item.detailList[0].refundStatus == 'APPLY_REFUND' && item.detailList[0].refundStatus !== 'FAIL_REFUND'">
      <van-button v-if="item.detailList[0].refundStatus == 'APPLY_REFUND' && item.detailList[0].refundStatus !== 'FAIL_REFUND'" size="small" style="margin-right:10px;" :style="formatButtonColor()" @click.stop="goDetail(item)">取消退款</van-button>
          </div>
     <van-button v-if="item.detailList[0].refundStatus == 'WAIT_GOODS_BACK'" size="small" style="margin-right:10px;" :style="formatButtonColor()" @click.stop="inputTransNo(item)">商品寄回</van-button>
          
    </div>



     <div class="settingBody" v-if="item.orderStatus === 'ORDER_CANCEL_PAY'">
      <van-button size="small" style="margin-right:10px;" :style="formatButtonColor()" @click.stop="buyAgain(item.orderId)">再次购买</van-button>
    </div>

  <div style="background-color:#f7f7f7;height:10px;">

  </div>
  </div>
 </li>

      </div>


  </van-tab>


        </ul>
</van-tabs>

 <div class=""  style="font-size:14px;padding:15px;" v-if="orderList[returnKey()].orderList.length==0">
          <div style="margin-top:50px;text-align:center;">
            <img src="../../assets/none.png" />
            <p>暂时还没有相关的订单哦!</p>
          </div>
      </div>
          <div v-if="orderList[returnKey()].orderList.loading">加载中...</div>
      
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
    orderList: { orderList: [], pageSize: 10, loading: true },
    orderList_pay: { orderList: [], pageSize: 10, loading: true },
    orderList_send: { orderList: [], pageSize: 10, loading: true },
    orderList_reacv: { orderList: [], pageSize: 10, loading: true },
    orderList_finish: { orderList: [], pageSize: 10, loading: true },
    orderList_refund: { orderList: [], pageSize: 10, loading: true }
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

 inputTransNo(item) {
    console.log("填写单号");
    this.$router.push({
      name: "refundbackgoods",
      query: {
        refundId: item["detailList"][0].refundOrderList[0].refundId
      }
    });
  }
doDeleteOrder(orderId){
 Dialog.confirm({
      title: "提示",
      message: "删除订单?"
    })
      .then(() => {
        Vue.prototype.$reqFormPost(
          "/order/delete",
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

            this.getOrderList(this.orderTitleList[this.active].status,true);
          }
        );
        // on confirm
      })
      .catch(() => {
        // on cancel
      });

}
  payOrder(item) {
    this.$router.push({
      name: "pay",
      query: {
        body: item.orderTitle,
        payId: item.payNo,
        payTotal: item.payTotal
      }
    });
  }
  loadMore() {
    this.loading = true;
    let self = this;
    setTimeout(() => {
      this.orderList[this.returnKey()].pageSize += 10;
      this.getOrderList(this.orderTitleList[this.active].status);
    }, 1000);
  }
  // ORDER_WAIT_PAY
  // ORDER_CANCEL_PAY
  // ORDER_WAIT_SENDGOODS
  // ORDER_WAIT_RECVGOODS
  // ORDER_WAIT_REVIEW
  // ORDER_END_GOODS
  // ORDER_FINISH
  doCancel(item) {
    Vue.prototype.$reqFormPost(
      "/order/cancel",
      {
        userId: this.$store.getters[Vue.prototype.MutationTreeType.TOKEN_INFO]
          .userId,
        token: this.$store.getters[Vue.prototype.MutationTreeType.TOKEN_INFO]
          .token,
        orderId: item.orderId
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
        this.getOrderList(this.orderTitleList[this.active].status,true);

        console.log("取消订单");
      }
    );
  }

  doRefund(item) {
    console.log(item.orderId);
    this.$router.push({
      name: "refund",
      query: {
        orderId: item.orderId
      }
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
          case "ORDER_END_GOODS":
        return "color:#ffc630";

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
          Toast(res.data.message);
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

            this.getOrderList(this.orderTitleList[this.active].status,true);
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
        return "未付款";
      case "ORDER_CANCEL_PAY":
        return "已取消";
      case "ORDER_WAIT_SENDGOODS":
        return "未发货";
      case "ORDER_WAIT_RECVGOODS":
        return "未收货";
      case "ORDER_END_GOODS":
        return "已评论";
      case "ORDER_WAIT_REVIEW":
        return "待评价";
      case "ORDER_FINISH":
        return "交易完成";
    }
  }

  returnKey() {
    switch (this.active) {
      case 0:
        return "orderList";
      case 1:
        return "orderList_pay";
      case 2:
        return "orderList_send";
      case 3:
        return "orderList_reacv";
      case 4:
        return "orderList_finish";
      case 5:
        return "orderList_refund";
    }
  }
  getOrderList(orderStatus,keep:boolean=false) {
    let valKey = this.returnKey();

    Vue.prototype.$reqFormPost(
      orderStatus != "REFUND" ? "/order/queryorder" : "/refund/order/query",
      {
        userId: this.$store.getters[Vue.prototype.MutationTreeType.TOKEN_INFO]
          .userId,
        token: this.$store.getters[Vue.prototype.MutationTreeType.TOKEN_INFO]
          .token,
        orderStatus: orderStatus,
        page: 0,
        pageSize: this.orderList[valKey].pageSize
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


        if (this.orderList[valKey].loading||keep) {
          this.orderList[valKey].orderList = res.data.data.orderList;
          if (
            res.data.data.orderList.length != this.orderList[valKey].pageSize
          ) {
            this.orderList[valKey].loading = false;
          }
        }
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
  gocomment(item) {
    this.$router.push({
      name: "addcomment",
      query: {
        orderId: item.orderId
      }
    });
  }
  changePage(index) {
    this.active = index;
    this.getOrderList(this.orderTitleList[index].status,true);
  }
  mounted() {
    this.orderTitleList.forEach((item, index) => {
      if (this.$route.query.orderStatus == item.status) {
        this.active = index;
        return;
      }
    });
    if (this.$route.query.orderStatus === "REFUND") {
      return;
    }
    this.getOrderList(this.orderTitleList[this.active].status);
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


