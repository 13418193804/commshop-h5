<template>
  <div class="tab-contents">
    <comhead ref="comhead" isLeftIcon="icon-zuo" leftIconName="angle-left" @leftClick="false"  :title="title" isRightIcon="true"  ></comhead>
<!-- <div class="bodyContent"> -->

<van-tabs :active="selectIndex" @click="selectCatItem">
  <van-tab v-for="(item,index) in catlist" :title="item.catName">
    <!-- <van-list v-model="loading" :finished="finished" @load="loadMore" :offset="30"> -->
      <div style="background-color:#f7f7f7;height:10px;"></div>
      <div :style="handlePX('line-height',100)+handlePX('font-size',32)" style="color:#000000;text-align:center;">{{catlist[selectIndex].catName}}</div>
  
    <van-list>
      <van-row  >
        <van-col span="12" v-for="item in goodsList">
          <div class="bodyItem" :style="handlePX('margin-bottom',50)" style="display:flex;justify-content:center;" @click="goProductDetail(item.goodsId)">
          <div>
            <div style="border: 1px #e5e5e5 solid;box-sizing: border-box;display:flex;align-items: center;justify-content:center;overflow:hidden;position:relative;margin:5px auto;" :style="handlePX('height', 410)+handlePX('width', 345)">
              <img src="../../assets/image/热.png" style="width:-webkit-fill-available;position: absolute;top: 0;left:0;" :style="handlePX('width', 43)+handlePX('height', 49)"/>
              <img v-lazy="item.goodsImg.split(',')[0]" style="width:-webkit-fill-available;position: absolute;top: 0;z-index:-1;"/>
              <div class="textLabel" style="position: absolute;bottom: 0;width: 100%;background-color:rgba(207,207,207,0.3);text-align:center;color:#A3A3A3" :style="handlePX('height', 70)+handlePX('line-height', 70)+handlePX('font-size', 28)">{{item.jingle}}</div>
            </div>
            <div>
              <img src="../../assets/image/满减.png" :style="handlePX('width',52)+handlePX('height',25)"/>
              <img src="../../assets/image/特价.png" :style="handlePX('width',52)+handlePX('height',25)"/>
            </div>
            <div class="textLabel" :style="handlePX('font-size',28)" style="color:#000000;">{{item.goodsName}}</div>
            <div :style="handlePX('font-size',30)" style="color:#E05459;">￥{{item.labelPrice}}</div>
          </div>
        </div>
        </van-col>
        </van-row>
    </van-list>


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
  getProductList() {
    Vue.prototype.$reqFormPost(
      "/user/goods/list",
      {
        catId: this.catId,
        page:this.pageIndex,
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
        if(this.pageIndex==0){
          this.goodsList = res.data.data.goodsList;
        }else{
          for (let i = 0; i < res.data.data.goodsList.length; i++) {
            this.goodsList.push(res.data.data.goodsList[i])
          }
        }
        
      }
    );
  }
  // 下拉
  loadMore(){
    console.log('loadMore');
      setTimeout(() => {
        this.pageIndex++;
        this.getProductList();
        console.log('pageIndex',this.pageIndex)
      }, 200);
  }
  onLoad() {
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1);
        }
        this.loading = false;

        if (this.list.length >= 40) {
          this.finished = true;
        }
      }, 500);
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

