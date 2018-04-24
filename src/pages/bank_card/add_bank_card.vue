<template>
  <div class="tab-contents">
<comhead ref="comhead" isLeftIcon="icon-zuo" leftIconName="angle-left" @leftClick="false"  title="我的银行卡" isRightIcon="true"  ></comhead>
  
    <van-cell-group>
        <van-field v-model="realName" label="持卡人"  placeholder="持卡人真实姓名"  />
        <van-field v-model="bankName" label="开户银行"  placeholder="填写开户银行名称"  />
        <van-field v-model="cardId" label="银行卡号"  placeholder="填写银行卡号"  />
        <van-field v-model="subBranch" label="支行"  placeholder="填写银行卡所在支行"  />
    </van-cell-group>
    <p style="margin-top:200px;text-align:center;">提示：提交前，请详细核对银行卡号和信息</p>
    <div style="padding:20px;">
        <van-button size="normal" :block="true" style="color:#ffffff;background-color:#f4c542;border-radius:8px;" @click="addcard()">新增</van-button>
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
export default class add_bank_card extends Vue {
  realName = "";
  bankName = "";
  cardId = "";
  subBranch = "";

  addcard() {
    if (this.cardId == "" || this.bankName == ""|| this.realName == ""|| this.subBranch == "") {
      return;
    }
    Vue.prototype.$reqFormPost(
      "/bank/card/add",
      {
        // token: '2c353ced5a3bb09cf7f05e57155999cd',
        // userId: 'UI5add43d15b065d5be5116746',
        userId: this.$store.getters[Vue.prototype.MutationTreeType.TOKEN_INFO]
          .userId,
        token: this.$store.getters[Vue.prototype.MutationTreeType.TOKEN_INFO]
          .token,
        cardId: this.cardId,
        bankName: this.bankName,
        realName: this.realName,
        subBranch: this.subBranch
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
        this.$router.replace({
          path: "/my_bankcard",
          query: {}
        });
        console.log(res.data);
      }
    );
  }

  mounted() {
    console.log("添加银行卡");
  }
}
</script>


<style lang="scss" scoped>
@import "../../style/utils.scss";
</style>