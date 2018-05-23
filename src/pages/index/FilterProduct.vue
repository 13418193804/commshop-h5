<template>
  <div class="tab-contents">
<div class="searchbox1">
     <van-search placeholder="搜索商品" v-model="value"   show-action  @cancel="onCancel" style="flex:1;background-color: #fafafa;"/>
</div>

  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import mixin from "../../config/mixin";
import { Action } from "vuex-class";
import { Toast } from "vant";
import axios from "axios";


@Component({
  components: {},
  mixins: [mixin]
})
export default class shopIndex extends Vue {
value=''
onCancel(){
   this.$router.go(-1);
}
hotwordList = []
gethotword(){
    
 Vue.prototype.$reqUrlGet(
      "/hotword/query",
      {
       
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
        console.log('热词',res.data.data)
        this.hotwordList = res.data.data 
      }
    );
}
  mounted() {
      this.gethotword()

  }
}
</script>

<style >
/* @import "../../style/utils.scss"; */
.searchbox1 .van-search .van-icon-search{
 position: absolute;
    left: 10px;
}
   
 .searchbox1 .van-search .van-icon-clear{
 position: absolute;
    right: 5px;   
}
.searchbox1 .van-search__input-wrap {
  width: 100%;
  display:flex;
  align-items: center;
      position: relative;
}
.searchbox1 .van-search__action-text{
    white-space: nowrap;
    padding: 0 10px;
    margin-right: -10px;
}
.searchbox1 .van-search__input-wrap input {
  width: 100%;
  border-radius: 30px;
  border: 0;
  background-color: #f0f0f0;
  padding-left: 30px;
}
.searchbox1{
        border-bottom: 1px #e5e5e5 solid;
}
</style>


