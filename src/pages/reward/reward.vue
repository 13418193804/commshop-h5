<template>
  <div class="tab-contents">
    <comhead ref="comhead" isLeftIcon="icon-zuo" leftIconName="angle-left" @leftClick="false"  title="奖励金提现" isRightIcon="true"  ></comhead>
    <div :style="handlePX('height', 400)" style="border-bottom:15px solid #f5f5f5;display:flex;justify-content:center;align-items:center;flex-direction:column;">
        <img v-lazy="'1'" :style="handlePX('width', 110)+handlePX('height', 110)" style="vertical-align: middle;"/>
        <div :style="handlePX('margin-top', 20)" style="font-size:16px;">可提取金额</div>
        <div :style="handlePX('margin-top', 20)" style="font-size:24px;">￥299.00</div>
    </div>

    <div :style="handlePX('padding', 30)" style="border-bottom:15px solid #f5f5f5;">
        <div>提款金额</div>
        <van-cell-group>
          <van-field v-model="amount" label="￥" placeholder="请输入提现金额" style="border-bottom: 1px solid #e4e4e4;"/>
        </van-cell-group>
    </div>

    <van-cell-group>
        <van-cell is-link style="border-bottom:15px solid #f5f5f5;">
            <template slot="title">
                <div style="display:flex;align-items:center;">
                    <img v-lazy="'1'" :style="handlePX('height', 70)+handlePX('widht', 70)+handlePX('margin-left', 20)" style="border-radius:50%;"/>
                    <div :style="handlePX('margin-left', 20)" style="flex:1;">
                        <div>1111<span style="font-size:12px;">(信用卡)</span></div>
                        <div>111</div>
                    </div>
                </div>
            </template>
            <van-icon slot="right-icon" name="arrow" class="van-cell__right-icon" style="align-self:center;"/>
        </van-cell>
    </van-cell-group>
    
    <div :style="handlePX('margin-top', 170)" style="text-align:center;">注册表示您同意</div>  
    <div :style="handlePX('padding', 30)">
        <van-button style="width:100%;color:#ffffff;background-color:#ffc530;border-radius:8px;">提现</van-button>
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
    console.log("奖励金提现");
  }
}
</script>


<style lang="scss" scoped>
@import "../../style/utils.scss";
</style>