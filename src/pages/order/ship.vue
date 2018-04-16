<template>
  <div class="tab-contents" style="height:-webkit-fill-available;background-color:#f7f7f7;">
            <comhead ref="comhead" isLeftIcon="icon-zuo" leftIconName="angle-left" @leftClick="false"  title="物流信息" isRightIcon="true"  ></comhead>
     
      <div class="detailBody">
        <div v-for="items in  $route.query.detailList">
    <div class="product1">
       <div style='display:flex;align-items:center'>
        <img v-lazy='items.goodsImg' style='height:80px;width:80px'/>
      </div>
      <div style='font-size:12px;flex:1;overflow:hidden;padding:0 10px;'>
        <div class='lineTwoType'>{{items.goodsName}}</div>
        <div style='  overflow: hidden;text-overflow: ellipsis;white-space: nowrap;color:#999'>
          <div> {{items.jingle}}</div>
          <!-- <span v-for=" item.skuKeyValue" wx:for-item="i" style='margin-right:5px'>{{i.key}}:{{i.value}}</span> -->
        </div>
      </div>
      <div style='text-align:center;font-size:14px'>
        <div >￥{{items.goodsPrice}}</div>
        <div class="labelPrice" v-if="items.labelPrice">原价:{{items.labelPrice}}</div>
        <div>X {{items.goodsNum}}</div>
      </div>
    </div>
</div>
</div>

<div>
    <div>物流公司：{{ $route.query.transportName}} </div>
    <div>物流电话：{{ $route.query.transportMobile}} </div>
    <div>物流单号：{{ $route.query.transportNo}} </div>
</div>

    



  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import mixin from "../../config/mixin";
import { Action } from "vuex-class";
import { Toast } from "vant";
// import { recommendList } from '../../service/getData';
import comhead from "../../components/Comhead.vue";

@Component({
  components: { comhead },
  mixins: [mixin]
})
export default class shopIndex extends Vue {
  shipInfoList = [];
  getShipInfoList() {
    Vue.prototype.$reqFormPost(
      "/transport/info",
      {
        com: this.$route.query.transportCode,
        nu: this.$route.query.transportNo
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
          Toast(res.data.message);
          return;
        }
        this.shipInfoList = res.data.data;
        console.log("查看物流信息", res.data.data);
      }
    );
  }

  mounted() {
    console.log(this.$route.query);
    this.getShipInfoList();
  }
}
</script>

<style lang="scss" scoped>
@import "../../style/utils.scss";
</style>


