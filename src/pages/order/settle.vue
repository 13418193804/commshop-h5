<template>
  <div class="tab-contents" style="height:-webkit-fill-available;">
            <comhead ref="comhead" isLeftIcon="icon-zuo" leftIconName="angle-left" @leftClick="false"  title="确认订单" isRightIcon="true"  ></comhead>
        <div class="addressbox" @click="goSelectAddress()">
        <div class="flex flex-align-center"  style="padding:10px;">
  <div v-if="!address"  class="flex-1">
              请选择一个收货地址
            </div>
            
              <div v-else class="flex-1">
    <div class="flex flex-pack-justify" style="font-size: 16px;">
      <span>收货人:{{address.contactname}}</span>
      <span style="margin-right:10px;">{{address.contactmobile}}</span>
    </div>
      <div class="flex flex-align-center" style="padding: 5px; " >
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
            <div class="flex" style="height: 5px;">
         <img src="../../assets/jiange.png" style="width:100%;"/>
     </div>
<div style="background-color:#fff;margin-bottom:10px;">
<div v-for="(item,index) in shopCartList" :key="index">
   
    <div class="product">
       <div class="flex flex-align-center">
        <img v-lazy='item.goodsImg' style='height:70px;width:70px'/>
      </div>
      <div class="flex-1" style='padding:0 10px;'>

        <div class='lineTwoType flex-1'>{{item.goodsName}}</div>
        <div class='lineTwoType flex-1' style="color:#666;font-size:14px;" >{{item.jingle}}</div>
        <div >
            <span class="marketPrice"><span v-if="goodsType == 'RETAIL'">￥</span>{{item.price.toFixed(2)}}<span v-if="goodsType == 'SCORE'">积分</span></span> 
            <span class="labelPrice" style="font-size:12px;" v-if="goodsType == 'RETAIL'">￥{{item.labelPrice}}</span>
        </div>
      </div>
        <div>X {{item.num}}</div>
    </div>
</div>

<div style="height:10px;background-color:#f7f7f7;"></div>

<!-- <div class="settingItem">
    <div>运费</div>
    <div>{{freight.toFixed(2)}}</div>
</div>   -->
<van-cell-group>
<!--   
  <div style="padding:10px 15px;color:#333;" class="flex flex-pack-justify" @click="goconpon()">
     <div>优惠券</div>
      <div  style=" max-width: 70%;">
        <span class="marketPrice" v-if="currentCoupon">{{currentCoupon.couponName}}</span>
        <span  class="marketPrice" v-else> {{couponList.length}}张可用</span>></div>
  </div> -->


  <van-cell style="border-bottom:1px solid #FAFAFA" title="优惠券" class="couponItem" is-link :value="currentCoupon?currentCoupon.couponName:couponList.length+'张可用'"  @click="goconpon()" v-if="goodsType == 'RETAIL'">
      <template slot>
    <span class="marketPrice" v-if="currentCoupon">满{{currentCoupon.fullDenomination}}减{{currentCoupon.couponDenomination}}</span>
        <span  class="marketPrice" v-else> {{couponList.length}}张可用</span>
    </template>
    </van-cell>


    <div v-if="currentCoupon" style="padding:10px 15px;color:#333;border-bottom:10px solid rgb(247, 247, 247)" class="flex flex-pack-justify">
     <div>优惠金额</div>
      <div  style="max-width: 70%;">-￥{{currentCoupon.couponDenomination.toFixed(2)}}</div>
  </div>
  
  <van-cell title="配送方式"  value="快递" style="border-bottom:1px solid #FAFAFA"/>   
  <van-cell title="运费" :value="'￥'+freight.toFixed(2)" style="border-bottom:1px solid #FAFAFA" />

  <van-cell-group v-if="goodsType == 'RETAIL'">

<div class="van-cell van-cell--clickable van-hairline flex flex-pack-justify">

<div class=" flex  flex-align-center" @click.stop="()=>{return}">
<van-checkbox v-model="invoiceStatus"  @change="changeinvoiceStatus1" >
  <img style="margin-bottom: -2.5px;"
    slot="icon"
    slot-scope="props"
    :src="props.checked ? active : normal"
  >
</van-checkbox>
<span style="margin-left:5px;">我要开发票</span>
</div>
<div class="flex-1"  @click="goinvoiceSelect">
  <span style="float:right">
{{titleType === "PERSON"?PERSON_invoiceTitle:''}}{{titleType === "COMPANY"?COMPANY_invoiceTitle:''}}
<i class=" van-icon van-icon-arrow van-cell__right-icon" >
</i>
</span>
</div>
</div>

  </van-cell-group>



  <van-field v-model="remark" label="买家留言选填：" type="textarea" placeholder="选填内容已和卖家协商确认" rows="1" autosize/>
</van-cell-group>
<div style="margin: 0 10px;text-align:right;padding:10px;">
     <span style='margin:0 10rpx;'>
          <!-- {{shopCartList[0].num}} -->
        共{{goodsSum}}件商品
     </span>
     <span>小计：<span class="marketPrice">
       <span v-if="goodsType == 'RETAIL'">￥</span>{{totalPrice.toFixed(2)}}<span v-if="goodsType == 'SCORE'">积分</span></span></span>
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

  couponId = "";
  titleType = "";

  remark = "";
  shopCartList = [];
  address = null;
  totalPrice = 0;
  freight = 0;
  goodsSum = 0;

  active = require("../../assets/image/选择发票.png");
  normal = require("../../assets/image/未选择发票.png");
  goSelectAddress() {
    this.$router.push({
      name: "selectaddress"
    });
  }
  // 优惠券跳转
  goconpon() {
    if (this.couponList.length == 0) {
      return;
    }

    let data = {
      prepareId: this.prepareId
    };

    if (this.address) {
      (<any>Object).assign(data, { addressId: this.address.addressId });
    }

    this.$router.push({
      name: "selectcoupon",
      query: data
    });
  }
goinvoiceSelect(){
      this.goinvoice();
  
}
  changeinvoiceStatus1(e) {

    if (e && this.titleType === "") {
  this.titleType = "PERSON"
  this.PERSON_invoiceTitle = "个人"
  }
    
    if (!e) {
      this.titleType = "";

      this.$route.query.titleType = "";
    }

  }
  invoiceStatus = false;
  goinvoice(filter = null) {
    if (filter) {
      sessionStorage.handleSave = "true";
    }

    this.$router.push({
      name: "invoice",
      query: {
        invoiceStatus: this.invoiceStatus.toString(),
        titleType: this.titleType,
     PERSON_invoiceTitle: this.PERSON_invoiceTitle,
        COMPANY_invoiceTitle: this.COMPANY_invoiceTitle,
        COMPANY_invoiceNo: this.COMPANY_invoiceNo
      }
    });
  }
  goodsType = null;
  currentCoupon = null;
  getPreInfo(prepareId) {
    Vue.prototype.$reqFormPost(
      "/prepare/query",
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
        this.currentCoupon = res.data.data.currentCoupon;

        this.couponList = res.data.data.couponList;
        this.goodsType = res.data.data.goodsType;
        if (this.goodsType === "SCORE") {
          document.getElementsByClassName(
            "van-submit-bar__text"
          )[0].children[0].innerHTML =
            "支付积分：";
          this.$nextTick(() => {
            let span: any = document
              .getElementsByClassName("van-submit-bar__text")[0]
              .children[1].innerHTML.replace("¥", "");
            document.getElementsByClassName(
              "van-submit-bar__text"
            )[0].children[1].innerHTML =
              span + "积分";
          });
        }

        this.shopCartList = res.data.data.shopCartList;
        this.address = res.data.data.address;
        this.totalPrice = res.data.data.totalPrice;
        this.goodsSum = res.data.data.goodsSum;
        this.freight = res.data.data.freight;
      }
    );
  }
  couponList = [];
  onSubmit() {
    if (!this.address) {
      Toast("请选择一个收货地址");
      return;
    }
    Vue.prototype.$reqFormPost(
      "/prepare/submit",
      {
        userId: this.$store.getters[Vue.prototype.MutationTreeType.TOKEN_INFO]
          .userId,
        token: this.$store.getters[Vue.prototype.MutationTreeType.TOKEN_INFO]
          .token,
        couponId: this.couponId,

        PERSON_invoiceTitle: this.PERSON_invoiceTitle,
        COMPANY_invoiceTitle: this.COMPANY_invoiceTitle,
        COMPANY_invoiceNo: this.COMPANY_invoiceNo,

        titleType: this.titleType,
        // invoiceTitle: this.invoiceTitle,
        // invoiceNo: this.invoiceNo,
        prepareId: this.prepareId,
        remark: this.remark
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
          query: {
            contactname: this.address.contactname,
            contactmobile: this.address.contactmobile,
            address:
              this.address.province +
              this.address.city +
              this.address.country +
              this.address.address,
            goodsType: this.goodsType,
            body: res.data.data.body,
            payId: res.data.data.payId,
            payTotal: res.data.data.payTotal
          }
        });
        console.log(res.data.data);
      }
    );
  }
  

PERSON_invoiceTitle=  ""
COMPANY_invoiceTitle= ""
COMPANY_invoiceNo=""

  mounted() {
    this.prepareId = this.$store.getters[
      Vue.prototype.MutationTreeType.PREPAREID
    ];
    this.getPreInfo(
      this.$store.getters[Vue.prototype.MutationTreeType.PREPAREID]
    );

    if (
      this.$route.query.titleType &&
      this.$route.query.titleType !== "" &&
      (sessionStorage.handleSave || "") !== ""
    ) {

      console.log(this.$route.query.titleType)
  this.titleType = this.$route.query.titleType


this.PERSON_invoiceTitle=  this.$route.query.PERSON_invoiceTitle
        this.COMPANY_invoiceTitle= this.$route.query.COMPANY_invoiceTitle
        this.COMPANY_invoiceNo= this.$route.query.COMPANY_invoiceNo


      this.invoiceStatus = true;
    }

    sessionStorage.handleSave = "";
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
.settingItem {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #e5e5e5;
  margin: 0 10px;
  padding: 10px 0;
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
<style>
.van-field .van-cell__title {
  max-width: 100px;
}
.fonll > .van-cell__value {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>


