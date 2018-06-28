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
        <div style="color:#A3A3A3;border-top:1px solid #EFEFEF;" :style="handlePX('line-height',80)">支付金额:<span class="marketPrice">￥{{obj.payTotal}}</span>  </div>
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
      <van-cell  clickable @click="payActive = 'ali'">
        <template slot="title">
          <div :style="handlePX('height',80)" class="flex flex-align-center">        
            <van-radio name="ali" />
            <img src="../../assets/image/支付宝.png" style="vertical-align:sub;" :style="handlePX('width',40)+handlePX('height',40)"/>
            <span>支付宝支付</span>
          </div>
        </template>
      </van-cell>
      <van-cell  clickable @click="payActive = 'wechat'">
        <template slot="title">
          <div :style="handlePX('height',80)" class="flex flex-align-center">
            <van-radio name="wechat" />
            <img src="../../assets/image/微信.png" style="vertical-align:sub;" :style="handlePX('width',40)+handlePX('height',40)"/>
            <span>微信支付</span>
          </div>
        </template>
      </van-cell>
    </van-cell-group>
  </van-radio-group>
</div>


<div style="margin:100px 15px 0;">
    <van-button size="large" @click="dopay" style="color:#ffffff;background-color:#F4C542;">支付</van-button>
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
export default class shopIndex extends Vue {
  obj = {body:"",payId:"",payTotal:""};
  address={contactname:"",contactmobile:"",address:""};
  payActive = "ali";
  dopay() {
    //    this.obj["payTotal"]
    if (this.payActive == "ali") {
      console.log('支付宝支付')
      Vue.prototype.$reqFormPost(
        "/ali/pay/wap",
        {
          userId: this.$store.getters[Vue.prototype.MutationTreeType.TOKEN_INFO]
            .userId,
          token: this.$store.getters[Vue.prototype.MutationTreeType.TOKEN_INFO]
            .token,
            clientType:'H5',
          body: this.obj["body"],
          outTradeNo: this.obj["payId"],
          totalFee: 0.01
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
    }else{
//  console.log("https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx2e2d97a4e10ef2b6&redirect_uri=http://sr.cncloud.com/qichang/wechat/enter/call?action=viewtest&response_type=code&scope=snsapi_userinfo&state="+
//        this.obj["payId"] +"#wechat_redirect")
        window.location.href ="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx2e2d97a4e10ef2b6&redirect_uri=http://sr.cncloud.com/qichang/wechat/enter/call?action=viewtest&response_type=code&scope=snsapi_userinfo&state="+
       this.obj["payId"] +"#wechat_redirect"
     
      console.log('微信支付')
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
  mounted() {
    this.obj.body = this.$route.query.body;
    this.obj.payId = this.$route.query.payId;
    this.obj.payTotal = this.$route.query.payTotal;
    this.address.address = this.$route.query.address; 
    this.address.contactname = this.$route.query.contactname; 
    this.address.contactmobile = this.$route.query.contactmobile; 
  }
}
</script>

<style lang="scss" scoped>
@import "../../style/utils.scss";
</style>


