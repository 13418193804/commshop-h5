<template>
  <div class="tab-contents">
    <comhead ref="comhead" isLeftIcon="icon-zuo" leftIconName="angle-left" @leftClick="false"  title="商品列表" isRightIcon="true"  ></comhead>
<!-- <div class="bodyContent"> -->
<van-row>
  <van-col span="12" v-for="(item,index) in goodsList">

    <div class="bodyItem" style="display:flex;" @click="goProductDetail(item.goodsId)">
  <div>

    <div><img v-lazy="item.goodsImg.split(',')[0]" style="width:100px;height:100px;"/></div>
    <div> {{item.goodsName}}</div>
  </div>
    </div>
  </van-col>
</van-row>

        



  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import Swipe from "../../components/Swipe.vue";
import mixin from "../../config/mixin";
import comhead from "../../components/Comhead.vue";
@Component({
  components: {
    Swipe,
    comhead
  },
  mixins: [mixin]
})


export default class ProductList extends Vue {

  secCategoryItem = {
  };




  goodsList = [];
  goProductDetail(goodsId) {
    this.$router.push({
      path: "/productdetail",
      query: {
        goodsId: goodsId
      }
    });
  }

  getProductList() {
    Vue.prototype.$reqFormPost(
      "/user/goods/list",
      {
        catId: this.secCategoryItem['catId']
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
        this.goodsList = res.data.data.goodsList;
      }
    );
  }
  
  getCategoryList(){
     Vue.prototype.$reqFormPost("/user/cat/list", {
     parentId:  this.$route.query.parentId
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
      console.log(res.data.data);
    });
      
    }
  mounted() {
    console.log(this.$route.query)
  
    this.secCategoryItem = this.$route.query
    this.getProductList();
  }
}
</script>

<style lang="scss" scoped>
@import "../../style/utils.scss";
.bodyContent {
  display: flex;
}
.bodyItem {
  width: 100%;
}
</style>

