<template>
  <div class="tab-contents">
    <comhead ref="comhead" isLeftIcon="icon-zuo" leftIconName="angle-left" @leftClick="false"  title="我的成员" isRightIcon="true"  ></comhead>
    <!-- <van-pull-refresh v-model="isLoading" @refresh="onRefresh"> -->
      <ul
  v-infinite-scroll="loadMore"
  :infinite-scroll-disabled="loading"
  infinite-scroll-distance="20" >

        <li v-for="(item, index) in memberList" :key="index">
<div class="van-cell van-hairline" style="    justify-content: space-between;">
          <div >
             <img v-if="item.userIcon" v-lazy="item.userIcon" :style="handlePX('width', 85)+handlePX('height', 85)" style="vertical-align: middle;border-radius: 100%;"/>
            <img v-else src="../../assets/image/头像.png" :style="handlePX('width', 85)+handlePX('height', 85)" style="vertical-align: middle;border-radius: 100%;"/>
            <span >{{item.nickName}}</span>
          </div>
          <div style="">
            <span :style="handlePX('line-height', 85)">{{item.mobile}}</span>
            </div>
</div>
        </li>
        </ul>
   
<div style="    display: flex;
    align-items: center;
    justify-content: center;font-size:14px;padding:15px;">

    <div v-if="loading">加载中...</div>
    <div v-else>-</div>
  
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
export default class my_member extends Vue {
  pageindex = 0;
  memberList = [];
  isLoading = false;
  list = [];
  loading = false;
  finished = false;
  getMemberList() {
    Vue.prototype.$reqFormPost(
      "/member/list",
      {
        userId: this.$store.getters[Vue.prototype.MutationTreeType.TOKEN_INFO]
          .userId,
        token: this.$store.getters[Vue.prototype.MutationTreeType.TOKEN_INFO]
          .token,
        page: this.pageindex,
        pageSize: 20
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
        console.log("请求完成", res.data.data.memberList);
        let memberList = this.memberList ? this.memberList : [];
        for (let i = 0; i < res.data.data.memberList.length; i++) {
          memberList.push(res.data.data.memberList[i]);
        }
        if (res.data.data.memberList.length == 20) {
          this.loading = false;
        } else {
          // this.finished = true;
        }
        this.memberList = memberList;
        console.log(this.finished);
        // if (res.data.data.memberList) {
        // this.finished = true;
        // this.finished = true;
      }
    );
  }

  onRefresh() {
    let self = this;

    setTimeout(() => {
      // self.loading = true;
      // self.finished = false;
      // if (!self.finished) {
      //    self.pageindex = self.pageindex + 1;
      //   self.getMemberList();
      // }
    }, 500);
  }

  onLoad() {
    let self = this;
    setTimeout(() => {
      console.log("加载");
      console.log("this.finished", this.finished);
      console.log("this.loading", this.loading);

      if (!this.finished) {
        self.pageindex = self.pageindex + 1;
        self.getMemberList();
      }
    }, 500);
  }
  loadMore() {
    console.log("刷新");
    this.loading = true;
    let self = this;
    setTimeout(() => {
      self.pageindex = self.pageindex + 1;
      self.getMemberList();
      self.loading = false;
    }, 1000);
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
    console.log("mount");
    this.getMemberList();
    console.log("我的成员");
  }
}
</script>


<style lang="scss" scoped>
@import "../../style/utils.scss";
</style>