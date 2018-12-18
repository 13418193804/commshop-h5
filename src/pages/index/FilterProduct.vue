<template>
  <div class="tab-contents">
    
  <form action="/">
<div class="searchbox1 flex   flex-align-center" >
      <div style=" margin-top:6px;" @click="onCancel">
          <i   class="iconfont icon-zuo"  style="color:#101010;margin:10px"></i>
      </div>
     <van-search placeholder="搜索商品" v-model="value"  @search="onSearch"   class="flex-1 packlll" style="background-color: #fafafa;" @click="doChange()"/>
</div>
</form>
   

<div class="box">
<div style="height:60px;"></div>
<div style="height:40px;" v-if="model"></div>


<div v-if="!model">
  <div v-if="queryList.length>0" class="flex flex-pack-justify flex-align-center" style="color:#999;padding-left:10px;font-size:15.8px;">
   <div>搜索记录</div>
   <div style="padding:10px;" @click="doClear()">

     <i class="iconfont icon-iconfontshanchu3"></i>

     </div>
  </div>
<div v-for="(item,index) in queryList" class="slectQuery" @click="slectQuery(item)">
{{item}}
</div>
<div>

</div>

  
<div style="height:10px;background-color:#f7f7f7;">
</div>
  <div class="" style="padding:10px;color:#999;">
    热门搜索
  </div>
  <div class="btmTitle flex ">
      <div class="hotwordItem flex" v-for="n in hotwordList" v-text="n.word" @click="doSelect(n.word)">
      </div>
  </div>
</div>

<div v-if="model " >
<div class="filterHeader flex  " v-if="goodsList.length>0">

<div class="filterItem flex flex-align-center flex-pack-center" @click="doPriceFitler()" >
<div>价格</div>
<div style="line-height:10px;" >
<div>

  <i class="iconfont icon-icon--" :style="sortStatus==false && typeof sortStatus != 'string'?'color:#ffc630':''"></i>
 </div>
 <div>
  <i class="iconfont icon-xiala" :style="sortStatus==true&&sortStatus!='' ?'color:#ffc630':''"></i>
 </div>
</div>
</div>

<div class="filterItem  flex flex-align-center flex-pack-center" @click="catModel = !catModel" :style="catModel||catId != ''?'color:#ffc630':''">
  分类
</div>


</div>



<div style=" position: relative;">

  <div style="background-color:rgba(0, 0, 0, 0.498039);" v-if="catModel" >
  <div class="AllClassification" >
    <div class="flex flex-pack-justify flex-align-center ClassificationTitle "><span>全部分类</span>
      <i class="iconfont icon-iconset0422"  style="font-size:20px;margin:3px;"  @click="catModel =false"></i>
    </div>
    <div class="ClassificationName flex flex-warp-justify">
      <div v-for="(item,index) in catList" :key="index" style="width:25%;">
      <div @click="doCatFilter(item)" class="flex flex-pack-center flex-align-center Classification" :class="item.catId==catId?'ClassificationActive':'ClassificationItem'">
{{item.catName}}
        </div>
        </div>
        </div>
        </div>
        </div>
  </div>


      <ul
  v-infinite-scroll="loadMore"
  :infinite-scroll-disabled="loading"
  infinite-scroll-distance="20" >

        <li >

<div class="flex flex-warp-justify">

     <div v-for="(goods,goodsIndex) in goodsList" @click="goProductDetail(goods.goodsId)" :key="goodsIndex" class="goodsItem">
                    <div style="  width:-webkit-fill-available; padding:5px 0; " class="flex   flex-pack-center">
                      <div style="">
                      <div class="flex flex-pack-center flex-align-center" style="border: 1px #e5e5e5 solid;box-sizing: border-box;overflow:hidden;position:relative;" :style="handlePX('height', 410)+handlePX('width', 345)">
                        <img src="../../assets/image/热.png" style="width:-webkit-fill-available;position: absolute;top: 0;left:0;z-index:99" :style="handlePX('width', 43)+handlePX('height', 49)"/>
                        <img v-lazy="goods.goodsImg.split(',')[0]" style="width:-webkit-fill-available;position: absolute;top: 0;"/>
                        <div class="textLabel" style="position: absolute;bottom: 0;width: 100%;background-color:rgba(207,207,207,0.3);text-align:center;color:#A3A3A3" :style="handlePX('height', 70)+handlePX('line-height', 70)+handlePX('font-size', 28)">{{goods.jingle}}</div>
                      </div>
                      <div class="flex flex-pack-center flex-v" style="margin:5px auto;width:-webkit-fill-available;" :style="handlePX('width', 345)">
                        <div>
                          <img src="../../assets/image/满减.png" :style="handlePX('width',52)+handlePX('height',25)"/>
                          <img src="../../assets/image/特价.png" :style="handlePX('width',52)+handlePX('height',25)"/>
                        </div>
                        <div class="textLabel" :style="handlePX('font-size',28)+handlePX('line-height',40)">{{goods.goodsName}}</div>
                        <div style="color:#E05459" :style="handlePX('font-size',30)+handlePX('line-height',40)">￥{{goods.marketPrice}}</div>
                      </div>
                    </div>
</div>
                  </div>
</div>


     </li>
        </ul>
 

<div v-if="goodsList.length==0" class="flex  flex-align-center  flex-pack-center" style="height:100vh; height: 100vh;position: fixed;width: 100%;
    top: 0;color:#999;"><div>你寻找的商品还未上架</div></div>



<div class="flex flex-pack-center flex-align-center" style="font-size:14px;padding:15px;" v-if="goodsList.length>0">

    <div v-if="!loading">加载中...</div>
    <div v-else>-</div>
  
</div>


</div>

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
  value = "";
  onCancel() {
    this.$router.go(-1);
  }
  loading = false;
  goProductDetail(goodsId) {
    this.$router.push({
      path: "/productdetail",
      query: {
        goodsId: goodsId
      }
    });
  }
  loadMore() {
    console.log("刷新");
    this.loading = true;
    let self = this;
    setTimeout(() => {
      if (!self.loading) {
        self.pageindex = self.pageindex + 10;
        self.onSearch();
        self.loading = false;
      }
    }, 1000);
  }

  doChange() {
    this.catModel = false;
    this.catId = "";
    this.sortName = "";
    this.sortStatus = "";
    this.model = false;
  }
  doCatFilter(row) {
    this.catModel = false;
    this.catId = row.catId;
    this.onSearch();
  }
  catModel = false;
  catId = "";
  doPriceFitler() {
    this.sortName = "PRICE";
    switch (this.sortStatus) {
      case "":
        this.sortStatus = true;
        break;
      case true:
        this.sortStatus = false;
        break;
      case false:
        this.sortStatus = "";
        break;
    }

    this.onSearch();
  }

  sortName = "";
  sortStatus: any = "";
  doSelect(n) {
    this.value = n;
    this.onSearch();
  }
  pageindex = 10;
  queryList: any = [];
  doClear() {
    this.queryList = [];
    localStorage.queryList = JSON.stringify(this.queryList);
  }
  removeByValue(arr, val) {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] == val) {
        arr.splice(i, 1);
        break;
      }
    }
  }

  onSearch() {
    if ((this.value || "") == "") {
      return;
    }
    let data = {
      userId: this.$store.getters[Vue.prototype.MutationTreeType.TOKEN_INFO]
        .userId,
      token: this.$store.getters[Vue.prototype.MutationTreeType.TOKEN_INFO]
        .token,
      keyWord: this.value,
      catId: this.catId,
      page: 0,
      pageSize: this.pageindex
    };
    if (this.sortStatus != "") {
      (<any>Object).assign(data, {
        sortName: this.sortName,
        sortStatus: this.sortStatus
      });
    }
    Vue.prototype.$reqFormPost("/user/goods/list", data, res => {
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

      this.queryList = localStorage.queryList
        ? JSON.parse(localStorage.queryList)
        : [];

      if (
        this.queryList.filter(item => {
          return item === this.value;
        }).length > 0
      ) {
        this.removeByValue(this.queryList, this.value);
      }
      this.queryList.unshift(this.value);
      if (this.queryList.length > 3) {
        this.queryList = [
          this.queryList[0],
          this.queryList[1],
          this.queryList[2]
        ];
      }
      localStorage.queryList = JSON.stringify(this.queryList);

      if (res.data.data.goodsList.length == 20) {
        this.loading = false;
      }
      this.goodsList = res.data.data.goodsList;

      this.model = true;
    });
  }
  model = false;
  goodsList = [];
  hotwordList = [];

  doFilter() {
    Vue.prototype.$reqUrlGet("/hotword/query", {}, res => {
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

      this.hotwordList = res.data.data;
    });
  }
  slectQuery(item) {
    this.value = item;
  }
  gethotword() {
    Vue.prototype.$reqUrlGet("/hotword/query", {}, res => {
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

      this.hotwordList = res.data.data;
    });
  }
  handlePX(CssName, PxNumber) {
    return (
      CssName +
      ":" +
      this.$store.getters[Vue.prototype.MutationTreeType.SYSTEM].availWidth /
        750 *
        PxNumber +
      "px;"
    );
  }

  getCatList() {
    Vue.prototype.$reqFormPost("/user/cat/querytree", {}, res => {
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
      console.log("selectCategoyItem", res.data.data.children);
      this.catList = res.data.data.children;
    });
  }
  catList = [];
  mounted() {
    this.queryList = localStorage.queryList
      ? JSON.parse(localStorage.queryList)
      : [];

    this.sortStatus == "";
    this.gethotword();
    this.getCatList();
(<any>document.getElementsByClassName('van-field__control')[0]).style.marginLeft = "20px"
  }
}
</script>

<style >
/* @import "../../style/utils.scss"; */
.searchbox1 .van-search .van-icon-search {
  position: absolute;
  left: 10px;
}

.searchbox1 .van-search .van-icon-clear {
  position: absolute;
  right: 5px;
  padding: 10px;
}
.searchbox1 .van-search__input-wrap {
  width: 100%;
  display: flex;
  align-items: center;
  position: relative;
  padding-right: 15px;
}
.searchbox1 .van-search__action-text {
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
  padding-top: 5px;
  padding-bottom: 5px;
}
.searchbox1 .van-search .van-icon-clear {
  right: 23px;
  padding: 10px;
}
.searchbox1 .van-search {
  padding: 6px 0 0 0;
}
.searchbox1 {
  border-bottom: 1px #e5e5e5 solid;
  position: fixed;
  background-color: #fafafa;
  top: 0;
  width: 100%;
  z-index: 999;
  height: 60px;
  box-sizing: border-box;
}
.box {
  width: 100%;
  height: 100vh;
  overflow: auto;
}
.btmTitle {
  padding: 10px 20px;
  font-size: 16px;
  color: #666;
}
.hotwordItem {
  border: 1px red solid;
  color: red;
  border-radius: 5px;
  margin: 2px 5px;
  padding: 5px;
  font-size: 15px;
}
.filterHeader {
  font-size: 15px;
  border-bottom: 1px #e5e5e5 solid;
  position: fixed;
  top: 60px;
  width: 100%;
  z-index: 999;
  background-color: #fff;
}
.filterItem {
  width: 50%;
  height: 40px;
}

.ClassificationTitle {
  padding: 5px 10px;
}
.AllClassification {
  position: absolute;
  top: 0;
  z-index: 11111;
  width: 100%;
  background-color: #ffffff;
}

.ClassificationActive {
  border: 1px #ffc630 solid;
  color: #ffc630;
}
.ClassificationName {
  padding-bottom: 10px;
}
.Classification {
  padding: 5px 0;
  margin: 5px;
  border-radius: 30px;
}
.ClassificationItem {
  border: 1px #e5e5e5 solid;
}
.goodsItem {
  width: 50%;
}
.slectQuery {
  padding: 10px;
  border-bottom: 1px #e5e5e5 solid;
}
.slectQuery:active {
  background: #f2f2f2;
}

</style>


