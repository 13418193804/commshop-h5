<template>
  <div class="tab-contents">



    <comhead ref="comhead" isLeftIcon="icon-zuo" leftIconName="angle-left" @leftClick="false"  title="我的订单" isRightIcon="true"  ></comhead>



        <van-tabs :active="active">
  <van-tab v-for="index in orderTitleList" :title="index.name" style="border-top:1px #e5e5e5 solid;">
      

   
  </van-tab>
</van-tabs>


  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import mixin from "../../config/mixin";
import { Action } from "vuex-class";
import { Toast } from 'vant';
// import { recommendList } from '../../service/getData';
import comhead from "../../components/Comhead.vue";

@Component({
  components: {
  comhead
  },
  mixins: [mixin],
}) 
export default class orderList extends Vue {

active=1
orderTitleList=[
    {
        name:"全部",
    },   {
      name:"待付款",
    }, {
      name:"待发货",
    }, {
      name:"待收货",
    }, {
      name:"待评价",
    }, {
      name:"退换/售后",
    },
]
  mounted() {
   
  }
}
</script>

<style lang="scss" scoped>
@import "../../style/utils.scss";
.bodyLabel{
    width:100%;
    height:100vh;
    display:flex;
     align-items: center;justify-content: center;
}
</style>


