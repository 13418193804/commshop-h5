<template>
  <div class="tab-contents" style="height:-webkit-fill-available;background-color:#f7f7f7;">
            <comhead ref="comhead" isLeftIcon="icon-zuo" leftIconName="angle-left" @leftClick="false"  title="支付" isRightIcon="true"  ></comhead>
     

              <div style="margin:30px;">
                    <div>
                    订单提交成功，请尽快付款！
                </div>
                <div>
                    温馨提示：24小时内未付款将自动取消
                </div>

                <div >
                      <span class="marketPrice">￥{{obj.payTotal}}</span>  元
                </div>
</div>
<div>
</div>

<div style="margin:30px;">
<van-radio-group v-model="payActive">
  <van-radio name="ali">支付宝支付</van-radio>
</van-radio-group>

<van-radio-group v-model="payActive">
  <van-radio name="wechat">微信支付</van-radio>
</van-radio-group>


</div>


<div style="margin:30px;">
    <van-button size="large" @click="dopay">支付</van-button>
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
  obj = {};
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
          body: this.obj["body"],
          outTradeNo: this.obj["payId"],
          totalFee: 1
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
      
        window.location.href ="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx2e2d97a4e10ef2b6&redirect_uri=http://sr.cncloud.com/qichang/wechat/enter/call?action=viewtest&response_type=code&scope=snsapi_userinfo&state="+
       this.obj["payId"] +"#wechat_redirect"
      
      console.log('微信支付')
    }
  }

  mounted() {
    console.log();
    this.obj = this.$route.query;
  }
}
</script>

<style lang="scss" scoped>
@import "../../style/utils.scss";
</style>


