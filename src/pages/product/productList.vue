<template>
  <div class="tab-contents">
    <comhead ref="comhead" isLeftIcon="icon-zuo" leftIconName="angle-left" @leftClick="false"  :title="title" isRightIcon="true"  ></comhead>
<!-- <div class="bodyContent"> -->

<van-tabs :active="selectIndex" @click="selectCatItem">

  <van-tab v-for="(item,index) in catlist" :title="item.catName" :key="index">
    <div v-if="index==selectIndex">

      <div style="background-color:#f7f7f7;height:10px;"></div>
      <div :style="handlePX('line-height',100)+handlePX('font-size',32)" style="color:#000000;text-align:center;">{{catlist[selectIndex].catName}}</div>

        <ul v-infinite-scroll="loadMore" :infinite-scroll-disabled="loading" infinite-scroll-distance="20" style="display:flex;justify-content:space-between;flex-wrap:wrap;margin:0 10px;">
          <li  v-for="(item,goodsListindex) in goodsList" :key="goodsListindex">
                  <div class="bodyItem" :style="handlePX('margin-bottom',50)" style="display:flex;justify-content:center;" @click="goProductDetail(item.goodsId)">
                  <div style="overflow: hidden;">
                    <div style="border: 1px #e5e5e5 solid;box-sizing: border-box;display:flex;align-items: center;justify-content:center;overflow:hidden;position:relative;margin:5px auto;" :style="handlePX('height', 410)+handlePX('width', 345)">
                      <img src="../../assets/image/热.png" style="width:-webkit-fill-available;position: absolute;top: 0;left:0;" :style="handlePX('width', 43)+handlePX('height', 49)"/>
                      <img v-lazy="item.goodsImg.split(',')[0]" style="width:-webkit-fill-available;position: absolute;top: 0;z-index:-1;"/>
                      <div class="textLabel" style="position: absolute;bottom: 0;width: 100%;background-color:rgba(207,207,207,0.3);text-align:center;color:#A3A3A3" :style="handlePX('height', 70)+handlePX('line-height', 70)+handlePX('font-size', 28)">{{item.jingle}}</div>
                    </div>
                    <div style="margin:0 5px;">                      
                    <div>
                      <img src="../../assets/image/满减.png" :style="handlePX('width',52)+handlePX('height',25)"/>
                      <img src="../../assets/image/特价.png" :style="handlePX('width',52)+handlePX('height',25)"/>
                    </div>                  
                    <div class="textLabel" :style="handlePX('font-size',28)" style="color:#000000;">{{item.goodsName}}</div>
                    <div :style="handlePX('font-size',30)" style="color:#E05459;">￥{{item.marketPrice}}</div>
                    </div>
                  </div>
                </div>
          </li>
        </ul>

        <div style="display: flex;align-items: center;justify-content: center;font-size:14px;padding:15px;">
            <div v-if="loading">加载中...</div>
            <div v-else>没有更多</div>
        </div>

    </div>


  </van-tab>
</van-tabs>

  </div>
  
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import Swipe from "../../components/Swipe.vue";
import mixin from "../../config/mixin";
import comhead from "../../components/Comhead.vue";
import { List } from 'vant';
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
  list= [];
  loading=false;
  finished= false;
  selectIndex="";
  catlist="";
  goodsList = [];
  catId='';
  parentCatId="";
  pageIndex=0;
  title="";
  goProductDetail(goodsId) {
    this.$router.push({
      path: "/productdetail",
      query: {
        goodsId: goodsId
      }
    });
  }
  selectCatItem(index){
    let item = this.catlist[index];
    if(item['catId']!=this.catId){
      this.goodsList = []
      this.pageIndex = 0;
    }
    this.catId = item['catId'];
    this.selectIndex = index;
    this.getProductList();    
    this.$router.replace({
      path: "/productlist",
     query:{
       catId:this.catId,
       parentCatId:this.parentCatId,
       selectIndex:index,
       title:this.title
       }
    });
  }
  loadMore(){
    console.log("刷新");
    this.loading = true;
    let self = this;
    setTimeout(() => {
      self.pageIndex = self.pageIndex + 1;
      self.getProductList();
      self.loading = false;
    }, 1000);
  }
  getProductList() {
    Vue.prototype.$reqFormPost(
      "/user/goods/list",
      {
        catId: this.catId,
        page: this.pageIndex,
        pageSize:20,
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
        let goodsList = this.goodsList ? this.goodsList : [];
        for (let i = 0; i < res.data.data.goodsList.length; i++) {
          goodsList.push(res.data.data.goodsList[i]);
        }
        if (res.data.data.goodsList.length == 20) {
          this.loading = false;
        } else {
          // this.finished = true;
        }
        this.goodsList = goodsList;
        console.log(this.finished);        
      }
    );
  }
  getCategoryList(){
     Vue.prototype.$reqFormPost("/user/cat/list", {
      parentId:  this.parentCatId
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
      this.catlist = res.data.data
      console.log("getCategoryList",res.data.data);
    });
      
    }

  mounted() {
   
   //load products
    this.catId = this.$route.query.catId;
    this.getProductList();

    //load categories
    this.parentCatId = this.$route.query.parentCatId;
    this.getCategoryList();

    //load selectIndex
    this.selectIndex = this.$route.query.selectIndex;

    //load title
    this.title = this.$route.query.title;
   
  }

  handlePX(CssName, PxNumber) {
    return CssName +":" +this.$store.getters[Vue.prototype.MutationTreeType.SYSTEM].availWidth /750 * PxNumber +"px;";
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

