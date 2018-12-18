<template>
  <div class="skuinfo">

      <!-- <div class="bg_sku"> -->


  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import mixin from "../../config/mixin";
import { Action } from "vuex-class";
import { Toast } from "vant";
// import { recommendList } from '../../service/getData';
import { Prop, Emit } from "vue-property-decorator";

@Component({
  components: {},
  mixins: [mixin]
})
export default class shopIndex extends Vue {
  @Prop({ required: true })
  keepModel: boolean;
  //点击关闭整个sku
  @Prop({ required: true })
  @Emit("selectSku")
  selectSku() {}
  
  changeModel() {
    this.keepModel = false;
  }
  detatil: any;
  skuattr = [];
  chosenList = [];
  num = 1;
  //sku
  //skuAttr

  //点击选择sku

  //商品详情

  mounted() {}
}
</script>

<style lang="scss" scoped>
@import "../../style/utils.scss";
.bodyLabel {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
.bg_sku {
  height: -webkit-fill-available;
  width: -webkit-fill-available;
  background-color: rgba(0, 0, 0, 0.498039);
  position: fixed;
  top: 0;
}
.num_box {
  font-size: 16px;
  display: flex;
  justify-content: space-between;
  padding: 20px;
}

.num_small_box {
  border: solid 1px #ddd;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.num_box1 {
  background-color: #ebebe4;
  font-size: 14px;
  border-top: solid 1px #ddd;
  border-bottom: solid 1px #ddd;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.num_small_box_dis {
  background-color: #f8f8f8;
}

.modiaBoxDown2 {
  position: absolute;
  bottom: -100%;
  animation: myfirst0001 0.5s;
}

@keyframes myfirst0001 {
  from {
    bottom: 0;
  }

  to {
    bottom: -100%;
    display: none;
  }
}
.bg_shop_none1 {
  position: fixed;
  bottom: -100%;
  animation: myfirst0002 0.5s;
}

@keyframes myfirst0002 {
  from {
    display: flex;
  }

  to {
    display: none;
  }
}
.modiaBoxUp2 {
  position: absolute;
  bottom: 0;
  animation: myfirst000 0.5s;
  -moz-animation: myfimyfirst000rst 0.5s;
  /* Firefox */
  -webkit-animation: myfirst000 0.5s;
  /* Safari and Chrome */
  -o-animation: myfirst000 0.5s;
  /* Opera */
}

@keyframes myfirst000 {
  from {
    bottom: -100%;
  }

  to {
    bottom: 0;
  }
}

.basisInfo {
  margin: 20px 15px;
  border: 1px solid #e5e5e5;
}
.bg_shop1 {
  display: flex;
  position: fixed;
  bottom: 0;
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.498039);
  height: 100%;
  width: 100%;
}
.btm_box {
  font-size: 12px;
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 50px;
  display: flex;
  background-color: #f8f8f8;
}

.leftbox {
  width: 7em;
  background-color: #f5f5f5;
  color: #999;
  border-right: solid 1px #e5e5e5;
  padding: 7px 5px 7px 7px;
}

.rightbox {
  flex: 1;
  display: flex;
  align-items: center;
  padding-left: 2em;
  word-break: break-all;
}
.updateInfo {
  border-top: solid 1px #e5e5e5;
  border-bottom: solid 1px #e5e5e5;

  background-color: #f5f5f5;
  padding: 5px 10px;
  font-size: 14px;
}

.skuKeyBox {
  display: flex;
  flex-wrap: wrap;
}

.sku_box {
  margin: 10px 15px;
  padding: 3px 10px;
  border-radius: 5px;
  background-color: #e5e4e4;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 200px;
}

.num_box {
  font-size: 16px;
  display: flex;
  justify-content: space-between;
  padding: 20px;
}
</style>


