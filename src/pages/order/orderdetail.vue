<template>
  <div class="tab-contents" style="height:-webkit-fill-available;">
            <comhead ref="comhead" isLeftIcon="icon-zuo" leftIconName="angle-left" @leftClick="false"  title="订单详情" isRightIcon="true"  ></comhead>
 
            <div class="flex flex-pack-justify flex-align-center" style="background-color:#f7f7f7;padding: 10px;font-size: 16px;">
                <div style="font-size:16px">订单状态</div>
               
                <!-- <div :style="formatStatusColor(detail.orderStatus)">{{formatStatus(detail.orderStatus)}}</div> -->
                <span  :style="formatStatusColor(detail.orderStatus)">{{formatStatus(detail.orderStatus)}}</span>
             <!-- v-if="detail.detailList[0].refundStatus == 'WITHOUT_REFUND'" -->
              <!-- <span v-if="detail.detailList[0].refundStatus == 'APPLY_REFUND'" style="color:red">退款中</span>
                <span v-if="detail.detailList[0].refundStatus == 'SUCCEED_REFUND'" style="color:#ffc630;">已退款</span>
                <span v-if="detail.detailList[0].refundStatus == 'FAIL_REFUND'" style="color:#ffc630;">已拒绝</span>
                             <span v-if="detail.detailList[0].refundStatus == 'WAIT_GOODS_BACK'" style="color:#ffc630;">待寄回</span>
   <span v-if="detail.detailList[0].refundStatus == 'WAIT_RECVGOODS'" style="color:#ffc630;">退货中</span> -->

            </div>
     <div class="flex" style="height: 5px;">
         <img src="../../assets/jiange.png" style="width:100%;"/>
     </div>
        <div class="flex flex-align-center" style="padding:10px;">
         <div  style="flex:1;">
    <div class="flex flex-pack-justify" style="font-size: 16px;">
      <span>收货人：{{detail.contactName}}</span>
      <span style="margin-right:10px;">{{detail.contactPhone}}</span>
    </div>
      <div class="flex flex-align-center" style="padding: 5px;font-size: 14px; " >
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
    <div>
        <div v-for="(item,index) in detail.detailList" :key="index">
                <div  class="product">
                     <div class="flex flex-align-center">
        <img v-lazy='item.goodsImg' style='height:70px;width:70px'/>
      </div>
      <div class="flex-1" style='font-size:16px;overflow:hidden;padding:0 10px;'>
       <div style=" height:100%;">
        <div class='lineTwoType'>{{item.goodsName}}</div>
            <div style='  overflow: hidden;text-overflow: ellipsis;color:#999'>
          <div style="font-size:14px;color:#666">{{item.jingle}}</div>
       </div>
          <!-- <span v-for=" item.skuKeyValue" wx:for-item="i" style='margin-right:5px'>{{i.key}}:{{i.value}}</span> -->
        </div>
      </div>
      <div style='text-align:center;font-size:14px'>
        <div >
        <div class="labelPrice" v-if="item.labelPrice &&detail.goodsType === 'RETAIL'">￥{{item.labelPrice}}</div>
        </div>
           <span v-if="detail.goodsType === 'RETAIL'">￥</span>{{item.goodsPrice}}<span v-if="detail.goodsType === 'SCORE'">积分</span>
        
        <!-- <div class="labelPrice" v-if="detail.goodsType=='RETAIL'">￥{{item.goodsPrice}}</div> -->
        <div>X {{item.goodsNum}}</div>
      </div>
    </div>
        </div>
 </div>

 <div>
        <div v-if="detail.orderStatus == 'ORDER_WAIT_PAY'"  class="flex flex-pack-justify" style="margin-left:10px;border-bottom:1px #e5e5e5 solid;padding:10px;">
                <div>运费</div>
                <div style="margin-right:10px;">{{detail.transportPrice.toFixed(2)}}</div>
        </div>

      <div class="flex flex-pack-justify" style="margin:0 0 0 10px;padding:10px;border-bottom:1px #e5e5e5 solid;">
                <div>订单总价</div>
                <div style="margin-right:10px;" class="marketPrice">
                   <span v-if="detail.goodsType === 'RETAIL'">￥</span>
                   {{detail.orderTotalPrice.toFixed(2)}}
                  <span v-if="detail.goodsType === 'SCORE'">积分</span>
                </div>
        </div>

   <div class="flex flex-pack-justify" style="margin:0 0 0 10px;padding:10px;border-bottom:1px #e5e5e5 solid;" v-if="detail.goodsType === 'RETAIL'">
                <div>退款情况</div>
                <div style="margin-right:10px;" class="marketPrice">
              <span >
                <span v-if="detail.detailList[0].refundStatus == 'APPLY_REFUND' " style="color:red">退款中</span>
                <span v-if="detail.detailList[0].refundStatus == 'SUCCEED_REFUND'" style="color:#ffc630;">退款完成</span>
                <span v-if="detail.detailList[0].refundStatus == 'WAIT_GOODS_BACK'" style="color:#ffc630;">退款中</span>
                <span v-if="detail.detailList[0].refundStatus == 'WAIT_RECVGOODS'" style="color:#ffc630;">退款中</span>
                <span v-if="detail.detailList[0].refundStatus == 'FAIL_REFUND'" style="color:red;">已拒绝</span>
                </span>
                </div>
        </div>


<div class="flex flex-pack-justify flex-end-justify" style="margin:0 0 0 10px;padding:10px;">

            <div class="settingBody" v-if="detail.orderStatus === 'ORDER_WAIT_PAY'">
      <van-button size="small" style="margin-right:10px;" @click="doCancel()">取消订单</van-button>
      <van-button size="small" style="margin-right:10px;" :style="formatButtonColor()" @click="payOrder()">支付订单</van-button>
    </div>


      <div class="settingBody" v-if="detail.orderStatus === 'ORDER_WAIT_SENDGOODS'">
      <van-button v-if="detail.goodsType === 'RETAIL' && detail.detailList[0].refundStatus == 'APPLY_REFUND'&& detail.detailList[0].refundStatus !== 'FAIL_REFUND'" size="small" style="margin-right:10px;" :style="formatButtonColor()" @click="cancelRefund()">取消退款</van-button>
      <van-button v-if="detail.goodsType === 'RETAIL' && detail.detailList[0].refundStatus == 'WITHOUT_REFUND'|| detail.detailList[0].refundStatus == 'FAIL_REFUND' " size="small" style="margin-right:10px;" :style="formatButtonColor()" @click="doRefund()">申请退款</van-button>
    </div>

      <!-- <van-button v-if="detail.detailList[0].refundStatus == 'WITHOUT_REFUND' && detail.orderStatus !== 'ORDER_CANCEL_PAY' " size="small" style="margin-right:10px;" :style="formatButtonColor()" @click="doRefund()">申请退款</van-button> -->
     <!-- <van-button v-if="detail.detailList[0].refundStatus == 'APPLY_REFUND'" size="small" style="margin-right:10px;"  :style="formatButtonColor()" @click="cancelRefund()">取消退款</van-button> -->

     <div class="settingBody" v-if="detail.orderStatus === 'ORDER_WAIT_RECVGOODS'">
        <div  v-if="detail.detailList[0].refundStatus == 'WITHOUT_REFUND'  || detail.detailList[0].refundStatus == 'FAIL_REFUND' ">
      <van-button size="small" style="margin-right:10px;" @click.stop="getShip()">查看物流</van-button>
      <van-button size="small" style="margin-right:10px;" @click.stop="doRefund()" v-if="detail.goodsType === 'RETAIL'">退货/退款</van-button>
      <van-button size="small" style="margin-right:10px;"  :style="formatButtonColor()" @click.stop="recvgoods(detail.orderId,detail)">确认收货</van-button>
        </div>
        <div v-if="detail.detailList[0].refundStatus == 'APPLY_REFUND'&& detail.detailList[0].refundStatus !== 'FAIL_REFUND'">
      <van-button v-if="detail.detailList[0].refundStatus == 'APPLY_REFUND' && detail.detailList[0].refundStatus !== 'FAIL_REFUND'" size="small" style="margin-right:10px;" :style="formatButtonColor()" @click="cancelRefund()">取消退款</van-button>
          </div>   
  <!-- <van-button v-if="detail.detailList[0].refundStatus == 'FAIL_REFUND'"  size="small" style="margin-right:10px;"  @click.stop="doRefund(item)">重新申请</van-button> -->
      <!-- <van-button v-if="detail.detailList[0].refundStatus == 'FAIL_REFUND'" size="small" style="margin-right:10px;" :style="formatButtonColor()" @click="cancelRefund()">取消退款</van-button> -->
    </div>



 <div class="settingBody" v-if="detail.orderStatus === 'ORDER_CANCEL_PAY' && detail.goodsType === 'RETAIL'">
      <van-button size="small" style="margin-right:10px;" :style="formatButtonColor()" @click="buyAgain()">再次购买</van-button>
    </div>

    

     <div class="settingBody" v-if="detail.orderStatus === 'ORDER_WAIT_REVIEW' ||detail.orderStatus === 'ORDER_FINISH'">
        <div  v-if="detail.detailList[0].refundStatus == 'WITHOUT_REFUND'  || detail.detailList[0].refundStatus == 'FAIL_REFUND' ">
      <van-button size="small" style="margin-right:10px;" v-if="detail.goodsType === 'RETAIL'" :style="formatButtonColor()" @click.stop="buyAgain(detail.orderId)">再次购买</van-button>
      <van-button size="small" style="margin-right:10px;" v-if="detail.orderStatus === 'ORDER_WAIT_REVIEW' " @click.stop="doRefund()"  >退换/售后</van-button>
      <van-button size="small" style="margin-right:10px;" v-if="detail.orderStatus === 'ORDER_WAIT_REVIEW'" :style="formatButtonColor()" @click.stop="gocomment()">评价商品</van-button>
    </div>

        <div v-if="detail.detailList[0].refundStatus == 'APPLY_REFUND'&& detail.detailList[0].refundStatus !== 'FAIL_REFUND'">
      <van-button v-if="detail.detailList[0].refundStatus == 'APPLY_REFUND'&& detail.detailList[0].refundStatus !== 'FAIL_REFUND'" size="small" style="margin-right:10px;" :style="formatButtonColor()" @click="cancelRefund()">取消退款</van-button>
          </div>
          
    </div>

     <div class="settingBody" v-if="detail.orderStatus === 'ORDER_END_GOODS' ">
        <div  v-if="detail.detailList[0].refundStatus == 'WITHOUT_REFUND' || detail.detailList[0].refundStatus == 'FAIL_REFUND' ">
      <van-button size="small" style="margin-right:10px;" @click.stop="doRefund()">退换/售后</van-button>
        <van-button size="small" style="margin-right:10px;" @click.stop="getShip()" :style="formatButtonColor()">查看物流</van-button>
    </div>
        <div v-if="detail.detailList[0].refundStatus == 'APPLY_REFUND' && detail.detailList[0].refundStatus !== 'FAIL_REFUND'">
      <van-button v-if="detail.detailList[0].refundStatus == 'APPLY_REFUND'&& detail.detailList[0].refundStatus !== 'FAIL_REFUND'" size="small" style="margin-right:10px;" :style="formatButtonColor()" @click="cancelRefund()">取消退款</van-button>
          </div>
    </div>
        </div>
    </div>
        <div style="height:10px;background-color:#f7f7f7;"></div>
<div style="padding:10px;    line-height: 24px;color:#999;font-size:13px;">
  <div v-if="detail.orderId">
        订单编号：{{detail.orderId}}
    </div>
  <div v-if="detail.createTime">
        创建时间：{{detail.createTime}}
    </div>
 <div v-if="detail.payTime">
        支付时间：{{detail.payTime}}
    </div>
 <div v-if="detail.shipTime">
        发货时间：{{detail.shipTime}}
    </div>
          <div v-if="detail.recvGoodsTime">
        收货时间：{{detail.recvGoodsTime}}
    </div>   
 <div v-if="detail.detailList[0].refundOrderList[0]">
        申请退款时间：{{detail.detailList[0].refundOrderList[0].createTime}}
    </div>
 <div v-if=" detail.detailList[0].refundStatus === 'FAIL_REFUND'|| detail.detailList[0].refundStatus === 'SUCCEED_REFUND'">
       {{detail.detailList[0].refundStatus === 'FAIL_REFUND' ?'拒绝退款':''}}{{detail.detailList[0].refundStatus === 'SUCCEED_REFUND' ?'退款完成':''}}时间：{{detail.detailList[0].refundOrderList[0].updateTime}}
  </div>
</div>

        <div style="height:10px;background-color:#f7f7f7;" v-if="detail.detailList[0].refundStatus == 'FAIL_REFUND'"></div>

      <div style="margin:0 0 0 10px;padding:10px;" v-if="detail.detailList[0].refundStatus == 'FAIL_REFUND'">
      <div>
        退回原因
      </div>
      <p style="color:#999;">
        {{detail.detailList[0].refundOrderList[0].merchantRemark}}
      </p>
      </div>
        <div style="height:10px;background-color:#f7f7f7;"></div>
        
<div class="flex flex-pack-justify flex-align-center" style="padding: 10px;font-size: 14px;">
    <div>服务时间：9:00 - 22:00</div>
    <van-button size="small" onclick="showMeiQia()">联系客服</van-button>

</div>

<div v-if="detail.detailList[0].refundOrderList[0]">
        <div style="height:10px;background-color:#f7f7f7;"></div>
      <div class="flex flex-pack-justify" style="margin:0 0 0 10px;padding:10px;border-bottom:1px #e5e5e5 solid;">
                <div>售后类型</div>
                <div style="margin-right:10px;">{{detail.detailList[0].refundOrderList[0].refundType=='REFUND'?'退款':'退货/退款'}} </div>
        </div>

      <div style="margin:0 0 0 10px;padding:10px;" >
      <div>
        售后原因
      </div>
      <p style="color:#999;">
        {{detail.detailList[0].refundOrderList[0].refundReason}}
      </p>
      </div>


<div class="flex">

  <div v-for="n in  detail.detailList[0].refundOrderList[0].refundImg?detail.detailList[0].refundOrderList[0].refundImg.split(','):[]">
          <img :src="n" style="width: 80px;height: 80px;padding:10px;"/>
    </div>

</div>


<div v-if="detail.detailList[0].refundStatus == 'WAIT_GOODS_BACK' ||detail.detailList[0].refundStatus ==  'WAIT_RECVGOODS'">
        <div style="height:10px;background-color:#f7f7f7;"></div>
   <div class="flex flex-pack-justify" style="font-size:14px;margin:0 0 0 10px;padding:10px;border-bottom:1px #e5e5e5 solid;">
                <div>请在七天内将商品寄回一下地址并填写物流单号：</div>
        </div>
       <div class="flex flex-pack-justify" style="margin:0 0 0 10px;padding:10px;">
                
 <span class="textLabel" >{{detail.detailList[0].refundOrderList[0].contactName}}</span>
      <span style="margin-right:10px;" class="textLabel">{{detail.detailList[0].refundOrderList[0].contactMobile}}</span>
    </div>
      <div class="flex flex-align-center" style="margin:0 0 0 10px;padding: 5px;font-size: 14px;border-bottom:1px #e5e5e5 solid; " >
                  <div>
                    <i class="iconfont icon-location" style="margin-right:10px;font-size:22px;"></i>
                  </div>
                    <div class="lineTwo">
                         {{detail.detailList[0].refundOrderList[0].provinceName}}{{detail.detailList[0].refundOrderList[0].cityName}}{{detail.detailList[0].refundOrderList[0].countryName}}{{detail.detailList[0].refundOrderList[0].address}}</div>
              </div>
              </div>
           </div>



 <div  v-if="detail.detailList[0].refundStatus == 'WAIT_GOODS_BACK'||detail.detailList[0].refundStatus ==  'WAIT_RECVGOODS'" class="flex flex-pack-justify" style="margin:0 0 0 10px;padding:10px;border-bottom:1px #e5e5e5 solid;">
                <div>物流单号:<span style="color:#999" v-if="detail.detailList[0].refundOrderList[0].transNo">{{detail.detailList[0].refundOrderList[0].transNo}}</span><span v-else>未填写</span></div>
              <van-button size="small" :style="formatButtonColor()" @click="inputTransNo()" v-if="!detail.detailList[0].refundOrderList[0].transNo">填写</van-button>
                
        </div>



                
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

@Component({
  components: { comhead },
  mixins: [mixin]
})
export default class orderdetail extends Vue {
  orderId = "";
  detail = {};

  inputTransNo() {
    console.log("填写单号");
    this.$router.push({
      name: "refundbackgoods",
      query: {
        refundId: this.detail["detailList"][0].refundOrderList[0].refundId
      }
    });
  }
  formatButtonColor() {
    return "border-color:#ffc630;color:#ffc630";
  }
  gocomment() {
    this.$router.push({
      name: "addcomment",
      query: {
        orderId: this.detail["orderId"]
      }
    });
  }
  buyAgain() {
    Vue.prototype.$reqFormPost(
      "/order/buyagain",
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
        this.$router.push({ name: "cart" });
      }
    );
  }
  recvgoods(orderId, ORDER_WAIT_REVIEW) {
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
            // this.$router.push({
            //     name: "orderlist",
            // });

            // Vue.prototype.$confirmLogin({
            //   name: "orderlist",
            //   query: {
            //     orderStatus: "ORDER_WAIT_REVIEW"
            //   }
            // });
            // }
            this.queryDetail();
          }
        );
        // on confirm
      })
      .catch(() => {
        // on cancel
      });
  }
  getShip() {
    this.$router.push({ name: "ship", query: this.detail });
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
      case "ORDER_END_GOODS":
        return "color:#ffc630";

      case "ORDER_WAIT_REVIEW":
        return "color:#ffc630";
      case "ORDER_FINISH":
        return "color:#ffc630;";
    }
  }
  doCancel() {
    Dialog.confirm({
      title: "提示",
      message: "是否取消订单?"
    })
      .then(() => {
        Vue.prototype.$reqFormPost(
          "/order/cancel",
          {
            userId: this.$store.getters[
              Vue.prototype.MutationTreeType.TOKEN_INFO
            ].userId,
            token: this.$store.getters[
              Vue.prototype.MutationTreeType.TOKEN_INFO
            ].token,
            orderId: this.detail["orderId"]
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
            this.queryDetail();

            console.log("取消订单");
          }
        );
        // on confirm
      })
      .catch(() => {
        // on cancel
      });
  }
  cancelRefund() {
    Dialog.confirm({
      title: "提示",
      message: "是否取消申请退款?"
    })
      .then(() => {
        Vue.prototype.$reqFormPost(
          "/order/refund/delete",
          {
            userId: this.$store.getters[
              Vue.prototype.MutationTreeType.TOKEN_INFO
            ].userId,
            token: this.$store.getters[
              Vue.prototype.MutationTreeType.TOKEN_INFO
            ].token,
            refundId: this.detail["detailList"][0].refundOrderList[0].refundId
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
            Toast("取消成功");
            this.queryDetail();
          }
        );
        // on confirm
      })
      .catch(() => {
        // on cancel
      });

    console.log("取消退款");
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

  doRefund() {
    this.$router.push({
      name: "refund",
      query: {
        orderId: this.detail["orderId"]
      }
    });
  }

  payOrder() {
    this.$router.push({
      name: "pay",
      query: {
             contactname: this.detail['contactName'],
            contactmobile: this.detail['contactPhone'],
            address:
              this.detail['provinceName'] +
              this.detail['cityName'] +
              this.detail['countryName'] +
              this.detail['address'],
        body: this.detail["orderTitle"],
        payId: this.detail["payNo"],
        payTotal: this.detail["payTotal"],
        goodsType:this.detail['goodsType']
      }
    });
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


