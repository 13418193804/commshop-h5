<template>
  <div class="tab-contents">
<comhead ref="comhead" isLeftIcon="icon-zuo" leftIconName="angle-left" @leftClick="false"  title="我的银行卡" isRightIcon="true"  ></comhead>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import mixin from "../../config/mixin";
import { Action } from "vuex-class";
import { Toast } from 'vant';
import comhead from "../../components/Comhead.vue";

@Component({
  components: {
    comhead
  },
  mixins: [mixin]
})

export default class collection extends Vue {

    mounted() {
      console.log("我的银行卡")
  }
}
</script>


<style lang="scss" scoped>
@import "../../style/utils.scss";
</style>