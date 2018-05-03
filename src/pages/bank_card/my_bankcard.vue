<template>
  <div class="tab-contents">
<comhead ref="comhead" isLeftIcon="icon-zuo" leftIconName="angle-left" @leftClick="false"  title="我的银行卡" isRightIcon="true"  ></comhead>
  
  <div v-for="(item, index) in cardlist" :key="index" :style="handlePX('height', 300)+handlePX('padding', 30)" style="border-bottom:15px solid #f5f5f5;">
    <div :style="handlePX('height', 140)" style="border:1px solid #d9d9d9;border-radius:8px;box-sizing:border-box;display:flex;align-items:center;">
      <img src="../../assets/image/招商银行.png" :style="handlePX('height', 70)+handlePX('widht', 70)+handlePX('margin-left', 20)" style="border-radius:50%;"/>
      <div :style="handlePX('margin-left', 20)+handlePX('width', 200)">
        <div>{{item.bankName}}</div>
        <div style="font-size:12px;">信用卡</div>
      </div>
      <div :style="handlePX('padding-top', 20)">{{item.cardId}}</div>
    </div>
    <div :style="handlePX('height', 40)+handlePX('line-height', 40)+handlePX('margin-top', 20)" style="display:flex;justify-content:space-between;">
      <div>
        <van-radio-group v-model="isDefaultid" :change="isDefaultchange()">
        <van-radio :name="item.id">默认地址</van-radio>
        </van-radio-group>
      </div>
      <div @click="deletebankcard(item.id)"><img src="../../assets/image/删除.png" :style="handlePX('height', 40)+handlePX('widht', 40)" style="vertical-align: top;"/>删除</div>
    </div>
  </div>

  <div :style="handlePX('height', 300)+handlePX('padding', 30)">
    <div @click="addbangcard()" :style="handlePX('height', 140)" style="color:#959595;border:1px solid #d9d9d9;border-radius:8px;box-sizing:border-box;display:flex;align-items:center;justify-content:center;">
      +添加银行卡
    </div>
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
export default class mybankcard extends Vue {
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
  deletebankcard(cardid) {
    Vue.prototype.$reqFormPost(
      "/bank/card/delete",
      {
        userId: this.$store.getters[
          Vue.prototype.MutationTreeType.TOKEN_INFO
        ].userId,
        token: this.$store.getters[
          Vue.prototype.MutationTreeType.TOKEN_INFO
        ].token,
        id: cardid
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
        this.getBankCardList();
        console.log("/bank/card/delete", res.data.message);
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
    console.log("我的银行卡");
  }
}
</script>


<style lang="scss" scoped>
@import "../../style/utils.scss";
</style>