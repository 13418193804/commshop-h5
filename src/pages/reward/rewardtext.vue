<template>
  <div class="tab-contents">
<comhead ref="comhead" isLeftIcon="icon-zuo"  @leftClick="false"  title="奖励规则"   ></comhead>
 




<div v-for="(item,index) in messageList" style="margin:5px;line-height:26px; ">{{item}}</div>
 

  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import mixin from "../../config/mixin";
import { Action } from "vuex-class";
import { Toast } from "vant";
import comhead from "../../components/Comhead.vue";

@Component({
  components: {
    comhead
  },
  mixins: [mixin]
})
export default class Sign extends Vue {
 messageList=[`积分奖励前提：用户通过点击中宜严选 App 个人 中心右上角分享用户专用的推荐二维码给未注册 的游客，游客通过扫描二维码打开并完成账号注册， 即成为用户的成员。 
用户的成员在商城内的所有购物消费，消费的金额 将×10%转化为用户的积分奖励。积分奖励在商城 内有以下用途：
1、用于提现；用户可绑定个人的银行卡号，并申请 积分提现，积分将以 1：1 的比例兑换人民币提现。 商城平台后台审核通过用户的提现审核后会将提 现奖励直接打到用户绑定的个人银行卡账户上。
 2、积分消费；用户的积分可以 1：1 的比例用于商 城的所有自营商品购买。但需注意积分余额必须大 于所购商品金额，且积分不可与钱混合使用支付。
`]
  mounted() {
    
  }
}
</script>

<style lang="scss" scoped>
@import "../../style/utils.scss";

</style>


