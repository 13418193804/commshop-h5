<template>
  <div class="tab-contents">
    <comhead ref="comhead" isLeftIcon="icon-zuo" leftIconName="angle-left" @leftClick="false"  title="提现记录" isRightIcon="true"  ></comhead>
  
    <van-cell-group>
        <van-cell v-for="(item, index) in recordList" :key="index" :value="item.updateTime">
            <template slot="title">
            <span class="van-cell-text">-{{item.amount}}</span>
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
export default class present_record extends Vue {
recordList="";
getrecordList(){
     Vue.prototype.$reqFormPost("/withdraw/record/listbyuser", {
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
      this.recordList = res.data.data.recordList
      console.log("getrecordList",res.data.data.recordList);
    });
      
    }

  mounted() {
      this.getrecordList();      
    console.log("提现记录");
  }
}
</script>


<style lang="scss" scoped>
@import "../../style/utils.scss";
</style>