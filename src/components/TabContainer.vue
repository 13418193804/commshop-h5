<template>
  <div class="tab-contents">
          <div class="content">
            <transition name="move" mode="out-in"><router-view></router-view></transition>
        </div>
        <van-tabbar v-model="active">
  <van-tabbar-item  @click="selectTab(0)">
    <div style="text-align:center">
      <i class="iconfont icon-shouye" style="font-size:22px;"></i>
    </div>
    首页</van-tabbar-item>
  <van-tabbar-item  @click="selectTab(1)">
   <div style="text-align:center">
      <i class="iconfont icon-fenleifill" style="font-size:22px;"></i>
    </div>
    分类</van-tabbar-item>
  <van-tabbar-item  @click="selectTab(2)">
   <div style="text-align:center">
      <i class="iconfont icon-gouwucheman" style="font-size:22px;"></i>
    </div>
    购物车</van-tabbar-item>
  <van-tabbar-item  @click="selectTab(3)">
  <div style="text-align:center">
      <i class="iconfont icon-iconuser" style="font-size:22px;"></i>
    </div>
    个人</van-tabbar-item>
</van-tabbar>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Action } from "vuex-class";

export default class TabContainer extends Vue {
  get active() {
    return this.$store.getters[Vue.prototype.MutationTreeType.TAB_INDEX];
  }
  selectTab(num:number) {
    if (num === 0) {
      this.$router.push("/");
    }
    if (num === 1) {
      this.$router.push("/category");
    }
    if (num === 2) {
      this.$router.push("/cart");
    }
    if (num === 3) {
      this.$router.push("/user");
    }
  }
  mounted() {
    console.log(111);
  }
}
</script>
<style>
.van-tabbar{
      /* border-width: 1px 0; */
  border-top: 1px solid #e5e5e5;
}
</style>
