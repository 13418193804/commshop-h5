<template>
  <div class="tab-contents" style="height:-webkit-fill-available;background-color:#f5f5f5;">
    <comhead ref="comhead" isLeftIcon="icon-zuo" leftIconName="angle-left" @leftClick="false"  title="我的奖励" isRightIcon="true"  ></comhead>
    <div style="display:flex;align-items:center;background-color:#ffffff;">
        <div :style="handlePX('height', 300)" style="display:flex;justify-content:center;align-items:center;flex:1;flex-direction:column;">
            <div>
                <img v-lazy="'1'" :style="handlePX('width', 55)+handlePX('height', 55)" style="vertical-align: middle;"/>
                <span>奖励金</span>
            </div>
            <div :style="handlePX('margin-top', 20)" style="color:#ffc600;">￥299.00</div>
            <div style="color:#ababab;">提现>></div>
            <van-button :style="handlePX('width', 220)+handlePX('height', 60)+handlePX('line-height', 60)+handlePX('margin-top', 20)">我的成员</van-button>
        </div>
        <div :style="handlePX('height', 300)" style="display:flex;justify-content:center;align-items:center;flex:1;flex-direction:column;">
            <div>
                <img v-lazy="'1'" :style="handlePX('width', 55)+handlePX('height', 55)" style="vertical-align: middle;"/>
                <span>奖励金</span>
            </div>
            <div :style="handlePX('margin-top', 20)" style="color:#ffc600;">￥299.00</div>
            <div style="color:#ababab;">提现>></div>
            <van-button :style="handlePX('width', 220)+handlePX('height', 60)+handlePX('line-height', 60)+handlePX('margin-top', 20)">我的成员</van-button>
        </div>
    </div>

    <div :style="handlePX('padding', 30)">
        <div style="color:#959595;">最新消息</div>
        <div :style="handlePX('height', 88)+handlePX('line-height', 88)" style="border-bottom:1px solid #e7e7e7;font-size:14px;">A成员在03/21 13：00消费90元，你获得2元奖励</div>
        <div :style="handlePX('height', 88)+handlePX('line-height', 88)" style="border-bottom:1px solid #e7e7e7;font-size:14px;">A成员在03/21 13：00消费90元，你获得2元奖励</div>
        <div :style="handlePX('height', 88)+handlePX('line-height', 88)" style="border-bottom:1px solid #e7e7e7;font-size:14px;">A成员在03/21 13：00消费90元，你获得2元奖励</div>
        <div :style="handlePX('height', 88)+handlePX('line-height', 88)" style="border-bottom:1px solid #e7e7e7;font-size:14px;">A成员在03/21 13：00消费90元，你获得2元奖励</div>
        <div :style="handlePX('height', 88)+handlePX('line-height', 88)" style="border-bottom:1px solid #e7e7e7;font-size:14px;">A成员在03/21 13：00消费90元，你获得2元奖励</div>
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
export default class my_reward extends Vue {

handlePX(CssName, PxNumber) {
    return CssName +":" +this.$store.getters[Vue.prototype.MutationTreeType.SYSTEM].availWidth /750 * PxNumber +"px;";
  }
  mounted() {
    console.log("我的奖励");
  }
}
</script>


<style lang="scss" scoped>
@import "../../style/utils.scss";
</style>