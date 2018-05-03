<template>
  <div class="tab-contents">
    <comhead ref="comhead" isLeftIcon="icon-zuo" leftIconName="angle-left" @leftClick="false"  title="奖励金提现" isRightIcon="true" rightTitle="明细" @rightClick="gorewarddetail()"></comhead>
    <div :style="handlePX('height', 400)" style="border-bottom:15px solid #f5f5f5;display:flex;justify-content:center;align-items:center;flex-direction:column;">
        <img src="../../assets/image/金币.png" :style="handlePX('width', 110)+handlePX('height', 110)" style="vertical-align: middle;"/>
        <div :style="handlePX('margin-top', 20)" style="font-size:16px;">可提取金额</div>
        <div :style="handlePX('margin-top', 20)" style="font-size:24px;">￥{{award.awardBalance}}</div>
    </div>

    <div :style="handlePX('padding', 30)" style="border-bottom:15px solid #f5f5f5;">
        <div>提款金额</div>
        <van-cell-group>
          <van-field v-model="amount" label="￥" placeholder="请输入提现金额" style="border-bottom: 1px solid #e4e4e4;"/>
        </van-cell-group>
    </div>

    <van-cell-group style="border-bottom:15px solid #f5f5f5;">
        <van-cell is-link  @click="goselectcard()">
            <template slot="title">
                <div style="display:flex;align-items:center;">
                    <img src="../../assets/image/招商银行.png" :style="handlePX('height', 70)+handlePX('widht', 70)+handlePX('margin-left', 20)" style="border-radius:50%;"/>
                    <div :style="handlePX('margin-left', 20)" style="flex:1;">
                        <div>{{bankcard.bankName}}<span style="font-size:12px;">(信用卡)</span></div>
                        <div>{{bankcard.cardId}}</div>
                    </div>
                </div>
            </template>
            <van-icon slot="right-icon" name="arrow" class="van-cell__right-icon" style="align-self:center;"/>
        </van-cell>
    </van-cell-group>
    
    <div :style="handlePX('margin-top', 170)" style="text-align:center;">注：预计3-5个工作日到账，节假日顺延</div>  
    <div :style="handlePX('padding', 30)">
        <van-button style="width:100%;color:#ffffff;background-color:#ffc530;border-radius:8px;" @click="addrecord()">提现</van-button>
    </div>

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
export default class reward extends Vue {

    amount="";
    bankcard="";
    cardId="";
    award="";
    awardBalance='';
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
  getdefaultbankcard(){
    Vue.prototype.$reqFormPost("/bank/card/getdefault", {
      userId: this.$store.getters[
            Vue.prototype.MutationTreeType.TOKEN_INFO
        ].userId,
        token: this.$store.getters[
            Vue.prototype.MutationTreeType.TOKEN_INFO
        ].token,
     }, res => {
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
      this.bankcard = res.data.data
      this.cardId=res.data.data.id
      console.log("getdefault",res.data.data);
    });
  }
  getbankcardinfo(){
    Vue.prototype.$reqFormPost("/bank/card/info", {
      userId: this.$store.getters[
            Vue.prototype.MutationTreeType.TOKEN_INFO
        ].userId,
        token: this.$store.getters[
            Vue.prototype.MutationTreeType.TOKEN_INFO
        ].token,
      id:this.$route.query.cardid
     }, res => {
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
      this.bankcard = res.data.data
      console.log("getbankcardinfo",res.data.data);
    });
  }
  addrecord(){
    if(this.amount==""){
      Toast('请输入提现金额');
      return
    }
    if(this.bankcard==""){
      Toast('请选择银行卡');
      return
    }
    if(this.amount>this.awardBalance){
      Toast('提现金额不能大于余额');
      return
    }
    Vue.prototype.$reqFormPost("/withdraw/record/add", {
      userId: this.$store.getters[
            Vue.prototype.MutationTreeType.TOKEN_INFO
        ].userId,
        token: this.$store.getters[
            Vue.prototype.MutationTreeType.TOKEN_INFO
        ].token,
        cardId:this.cardId,
        amount:this.amount
     }, res => {
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
      console.log("addrecord",res.data);
    });
  }
  getreward(){
    Vue.prototype.$reqFormPost("/user/account/query", {
      userId: this.$store.getters[
            Vue.prototype.MutationTreeType.TOKEN_INFO
        ].userId,
        token: this.$store.getters[
            Vue.prototype.MutationTreeType.TOKEN_INFO
        ].token,
     }, res => {
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
      this.award = res.data.data;
      this.awardBalance=res.data.data.awardBalance;
      console.log("award",res.data.data);
    });
  }
  goselectcard(){
    this.$router.push("/select_bankcard");
  }
  gorewarddetail(){
    this.$router.push("/present_record");
  }
  mounted() {
    if(this.$route.query.cardid){
      this.cardId=this.$route.query.cardid;
      this.getbankcardinfo()
    }else{
      this.getdefaultbankcard()
    }
    this.getreward()
    console.log("奖励金提现");
  }
}
</script>


<style lang="scss" scoped>
@import "../../style/utils.scss";
</style>