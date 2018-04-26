<template>
  <div class="tab-contents">
    <comhead ref="comhead" isLeftIcon="icon-zuo" leftIconName="angle-left" @leftClick="false"  title="我的成员" isRightIcon="true"  ></comhead>
    <van-cell-group>
        <van-cell v-for="(item, index) in memberlist" :key="index">
            <template slot="title">
            <img v-lazy="'1'" :style="handlePX('width', 85)+handlePX('height', 85)" style="vertical-align: middle;"/>
            <span class="van-cell-text">{{item.nickName}}</span>
            </template>
            <template>
            <span class="van-cell-text" :style="handlePX('line-height', 85)">{{item.loginName}}</span>
            </template>
        </van-cell>
    </van-cell-group>

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
export default class my_member extends Vue {
    memberlist="";
    getMemberList(){
     Vue.prototype.$reqFormPost("/member/list", {
        userId: this.$store.getters[
            Vue.prototype.MutationTreeType.TOKEN_INFO
        ].userId,
        token: this.$store.getters[
            Vue.prototype.MutationTreeType.TOKEN_INFO
        ].token,
        // page:0,
        // pageSize:20,
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
      this.memberlist = res.data.data.memberList
      console.log("getMemberList",res.data.data.memberList);
    });
      
    }

  handlePX(CssName, PxNumber) {
    return CssName +":" +this.$store.getters[Vue.prototype.MutationTreeType.SYSTEM].availWidth /750 * PxNumber +"px;";
  }
  mounted() {
      this.getMemberList();
    console.log("我的成员");
  }
}
</script>


<style lang="scss" scoped>
@import "../../style/utils.scss";
</style>