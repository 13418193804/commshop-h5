<template>
  <div class="tab-contents">
    <comhead ref="comhead" isLeftIcon="icon-zuo" leftIconName="angle-left" @leftClick="false"  title="选择银行" isRightIcon="true"  ></comhead>
  
  <div v-for="(item, index) in cardlist" :key="index" :style="handlePX('padding', 30)+handlePX('padding-top', 0)+handlePX('padding-bottom', 0)">
    <div :style="handlePX('height', 160)" style="border-bottom:1px solid #dedede;box-sizing:border-box;display:flex;align-items:center;">
      <img v-lazy="'1'" :style="handlePX('height', 70)+handlePX('widht', 70)+handlePX('margin-left', 20)" style="border-radius:50%;"/>
      <div :style="handlePX('margin-left', 20)" style="flex:1;">
        <div>{{item.bankName}}<span style="font-size:12px;">(信用卡)</span></div>
        <div>{{item.cardId}}</div>
      </div>
      <van-radio-group v-model="isDefaultid" :change="isDefaultchange()">
        <van-radio :name="item.id"></van-radio>
        </van-radio-group>
    </div>
  </div>

  <div :style="handlePX('padding', 30)+handlePX('padding-top', 60)">
    <div @click="addbangcard()" :style="handlePX('height', 140)" style="color:#959595;border:1px solid #d9d9d9;box-sizing:border-box;display:flex;align-items:center;justify-content:center;">
      +添加银行卡
    </div>
  </div>

    <div :style="handlePX('padding', 30)">
        <van-button style="width:100%;color:#ffffff;background-color:#ffc530;border-radius:8px;" @click="goback()">确认</van-button>
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
export default class select_bankcard extends Vue {

    cardlist = [];
  isDefaultid = "";
  getBankCardList() {
    Vue.prototype.$reqFormPost(
      "/bank/card/list",
      {
        userId: this.$store.getters[
          Vue.prototype.MutationTreeType.TOKEN_INFO
        ].userId,
        token: this.$store.getters[
          Vue.prototype.MutationTreeType.TOKEN_INFO
        ].token,
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
          return;
        }
        for (var i = 0; i < res.data.data.length; i++) {
          if (res.data.data[i].isDefault) {
            this.isDefaultid = res.data.data[i].id;
          }
        }
        this.cardlist = res.data.data;
        console.log(res.data.data);
      }
    );
  }
  isDefaultchange() {
    Vue.prototype.$reqFormPost(
      "/bank/card/setdefault",
      {
        userId: this.$store.getters[
          Vue.prototype.MutationTreeType.TOKEN_INFO
        ].userId,
        token: this.$store.getters[
          Vue.prototype.MutationTreeType.TOKEN_INFO
        ].token,
        id: this.isDefaultid
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
          return;
        }
        console.log("/bank/card/setdefault", res.data.message);
      }
    );
  }
  addbangcard() {
    this.$router.push({
      path: "/add_bank_card",
      query: {}
    });
  }
  goback(){
    this.$router.go(-1);
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
    this.getBankCardList();
    console.log("选择银行");
  }
}
</script>


<style lang="scss" scoped>
@import "../../style/utils.scss";
</style>