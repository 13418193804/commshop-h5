<template>
  <div class="tab-contents">
    <comhead ref="comhead" isLeftIcon="icon-zuo" :gouser="true" leftIconName="angle-left" @leftClick="goUser()"  title="我的订单" isRightIcon="true"  ></comhead>
     
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
      <van-button size="small" style="margin-right:10px;"  :style="formatButtonColor()" @click.stop="recvgoods(item.orderId,item)">确认收货</van-button>
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
          <div style="margin-top:50px;text-align:center;color:#999">
      <img style="width:170px" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARgAAAEYCAYAAACHjumMAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkVERTRBRjNBNDE1NzExRTg5QzY1OEY3NzhEQzhERUUxIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkVERTRBRjNCNDE1NzExRTg5QzY1OEY3NzhEQzhERUUxIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RURFNEFGMzg0MTU3MTFFODlDNjU4Rjc3OERDOERFRTEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RURFNEFGMzk0MTU3MTFFODlDNjU4Rjc3OERDOERFRTEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4xUQkVAAAP8UlEQVR42uzd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"/>
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

  goUser(){

    console.log('---------')
    this.$router.replace('/user');
    
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
  orderId = "";
  recvgoods(orderId) {
    Dialog.confirm({
      title: "提示",
      message: "请确保收到商品后才进行确认收货，是否已收到商品?"
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
            this.changePage(4);
            // this.getOrderList(this.orderTitleList[this.active].status,true);
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


    // this.getOrderList(this.orderTitleList[this.active].status);
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


