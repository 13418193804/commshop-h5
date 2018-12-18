<template>
  <div class="tab-contents" style="height:-webkit-fill-available;background-color:#f7f7f7;">
            <comhead ref="comhead" isLeftIcon="icon-zuo" leftIconName="angle-left" @leftClick="false"  title="支付" isRightIcon="true"  ></comhead>
     <div class="flex" style="height: 5px;">
         <img src="../../assets/jiange.png" style="width:100%;"/>
     </div>

      <div style="padding:15px 0 0 15px;background-color:#fff;">
        <div class="flex">
          <img src="../../assets/image/提交成功.png" :style="handlePX('width',40)+handlePX('height',40)"/>
          <div>订单提交成功，请尽快付款！</div>
        </div>
        <div :style="handlePX('line-height',80)" style="color:#A3A3A3;">温馨提示：24小时内未付款将自动取消</div>
        <div style="color:#A3A3A3;border-top:1px solid #EFEFEF;" :style="handlePX('line-height',80)">
          支付{{obj.goodsType == 'SCORE' ?'积分':'金额'}}:<span class="marketPrice">
            &nbsp;
          <span v-if="obj.goodsType == 'RETAIL'">￥</span>{{obj.payTotal}}<span v-if="obj.goodsType == 'SCORE'">积分</span></span>  </div>
      </div>

      <div class="flex-1" style="padding:15px;background-color:#fff;margin-top:5px;">
        <div class="flex flex-pack-justify" style="font-size: 16px;">
          <span>收货人:{{address.contactname}}</span>
          <span style="margin-right:10px;">{{address.contactmobile}}</span>
        </div>
        <div class="flex flex-align-center">
          <div>
            <i class="iconfont icon-location" style="font-size:22px;"></i>
          </div>
          <div class="lineTwo">收货地址：{{address.province}}{{address.city}}{{address.country}}{{address.address}}</div>
        </div>
      </div>

<div style="padding-top:15px;background-color:#fff;margin-top:5px;">
  <div :style="handlePX('height',80)+handlePX('line-height',80)" style="margin-left:15px;color:#A3A3A3;border-bottom:1px solid #EFEFEF;">选择支付方式</div>
  <van-radio-group v-model="payActive">
    <van-cell-group>


      <van-cell  clickable @click="payActive = 'ali'" v-if="!isWeiXin&& obj.goodsType == 'RETAIL'" >
        <template slot="title">
          <div :style="handlePX('height',80)" class="flex flex-align-center">        
            <van-radio name="ali" />
            &nbsp;
            &nbsp;
            <img src="../../assets/image/支付宝.png" style="vertical-align:sub;" :style="handlePX('width',40)+handlePX('height',40)"/>
            <span>支付宝支付</span>
          </div>
        </template>
      </van-cell>
      
      <van-cell  clickable @click="payActive = 'wechat'" v-if="obj.goodsType == 'RETAIL'">
        <template slot="title">
          <div :style="handlePX('height',80)" class="flex flex-align-center">
            <van-radio name="wechat" />
            &nbsp;
            &nbsp;
            <img src="../../assets/image/微信.png" style="vertical-align:sub;" :style="handlePX('width',40)+handlePX('height',40)"/>
            <span>微信支付</span>
          </div>
        </template>
      </van-cell>


 <van-cell  clickable @click="payActive == 'SCORE'" v-if="obj.goodsType == 'SCORE'">
        <template slot="title">
          <div :style="handlePX('height',80)" class="flex flex-align-center">
            <van-radio name="SCORE" :disabled="awardBalance< obj.payTotal" />
            &nbsp;
            &nbsp;
            <img src="../../assets/image/积分.png" style="vertical-align:sub;" v-if="awardBalance>= obj.payTotal" :style="handlePX('width',40)+handlePX('height',40)"/>
            <img v-else src="../../assets/image/积分灰色.png" style="vertical-align:sub;"  :style="handlePX('width',40)+handlePX('height',40)"/>
            <span> &nbsp;积分支付<span style="color:#A9A9A9">(积分余额{{awardBalance.toFixed(2)}}{{awardBalance<obj.payTotal?'，积分不足':''}})</span></span>
          </div>
        </template>
      </van-cell>

    </van-cell-group>
  </van-radio-group>
</div>

<div style="margin:100px 15px 0;">
    <van-button size="large" @click="dopay" style="color:#ffffff;background-color:#F4C542;" :disabled="payActive == 'SCORE' && awardBalance< obj.payTotal">支付</van-button>
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
export default class shopIndex extends Vue {
  obj = { body: "", payId: "", payTotal: "", goodsType: null };
  address = { contactname: "", contactmobile: "", address: "" };
  payActive = "ali";
  dopay() {
    //    this.obj["payTotal"]
    if (this.payActive == "ali") {
      Vue.prototype.$reqFormPost(
        "/ali/pay/wap",
        {
          userId: this.$store.getters[Vue.prototype.MutationTreeType.TOKEN_INFO]
            .userId,
          token: this.$store.getters[Vue.prototype.MutationTreeType.TOKEN_INFO]
            .token,
          clientType: "H5",
          body: this.obj["body"],
          outTradeNo: this.obj["payId"],
          totalFee: this.obj["payTotal"]
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
          window.location.href =
            "https://openapi.alipay.com/gateway.do?" +
            res.data.data.orderString;
        }
      );
    }

    if (this.payActive == "wechat") {
      if (this.isWeiXin) {
        window.location.href =
          "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx2e2d97a4e10ef2b6&redirect_uri=https://m.yourhr.com.cn/zhongyi/wechat/enter/call?action=viewtest&response_type=code&scope=snsapi_userinfo&state=" +
          this.obj["payId"] +
          "#wechat_redirect";
      } else {
        let a: any = window;
        Vue.prototype.$reqFormPost(
          "/wechat/pay/wap",
          {
            userId: this.$store.getters[
              Vue.prototype.MutationTreeType.TOKEN_INFO
            ].userId,
            token: this.$store.getters[
              Vue.prototype.MutationTreeType.TOKEN_INFO
            ].token,
            spbillCreateIp: a.getAddressIP().cip,
            body: this.obj["body"],
            outTradeNo: this.obj["payId"],
            totalFee: this.obj["payTotal"]
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
            if (res.data.data.mwebUrl) {
              window.location.href =
                res.data.data.mwebUrl +
                "&redirect_url=" +
                encodeURIComponent(
                  "https://m.yourhr.com.cn/custom/#/orderlist?orderStatus=ORDER_WAIT_SENDGOODS"
                );
            } else {
              Toast("请重试");
            }
          }
        );
      }
    }

    if (this.payActive === "SCORE") {
      Dialog.confirm({
        title: "提示",
        message: "积分商品不可退换,确定用积分支付该商品吗?"
      })
        .then(() => {
          Vue.prototype.$reqFormPost(
            "/order/score/pay",
            {
              userId: this.$store.getters[
                Vue.prototype.MutationTreeType.TOKEN_INFO
              ].userId,
              token: this.$store.getters[
                Vue.prototype.MutationTreeType.TOKEN_INFO
              ].token,
              payId: this.obj["payId"],
              payTotal: this.obj["payTotal"]
            },
            res => {
              if (res == null) {
                console.log("网络请求错误！");
                return;
              }
              if (res.data.status != 200) {
                Toast(res.data.message);
                return;
              }
              
            this.$router.replace( {  name: "orderlist",
      query: {
        orderStatus: "ORDER_WAIT_SENDGOODS"
      }
    })
            }
          );
        })
        .catch(() => {
          // on cancel
        });
    }
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
  isWeiXin = false;
  awardBalance = 0;
  getreward() {
    Vue.prototype.$reqFormPost(
      "/user/account/query",
      {
        userId: this.$store.getters[Vue.prototype.MutationTreeType.TOKEN_INFO]
          .userId,
        token: this.$store.getters[Vue.prototype.MutationTreeType.TOKEN_INFO]
          .token
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
        this.awardBalance = res.data.data.awardBalance;
      }
    );
  }
  mounted() {
    this.obj.body = this.$route.query.body;
    this.obj.payId = this.$route.query.payId;
    this.obj.payTotal = this.$route.query.payTotal;
    this.obj.goodsType = this.$route.query.goodsType;

    if (this.obj.goodsType === "SCORE") {
      this.payActive = "SCORE";
      this.getreward();
    }

    this.address.address = this.$route.query.address;
    this.address.contactname = this.$route.query.contactname;
    this.address.contactmobile = this.$route.query.contactmobile;

    if (
      navigator.userAgent.toLowerCase().match(/MicroMessenger/i)[0] ==
      "micromessenger"
    ) {
      this.payActive = "wechat";
      this.isWeiXin = true;
    } else {
      this.isWeiXin = false;
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../style/utils.scss";
</style>


