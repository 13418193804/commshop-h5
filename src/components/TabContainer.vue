<template>
  <div class="tab-contents">
          <div class="content">
            <transition name="move" mode="out-in"><router-view></router-view></transition>
        </div>
        <van-tabbar v-model="active">
  <van-tabbar-item icon="shop" @click="selectTab(0)">首页</van-tabbar-item>
  <van-tabbar-item icon="chat" @click="selectTab(1)">分类</van-tabbar-item>
  <van-tabbar-item icon="records" @click="selectTab(2)">购物车</van-tabbar-item>
  <van-tabbar-item icon="gold-coin" @click="selectTab(3)">个人</van-tabbar-item>
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
