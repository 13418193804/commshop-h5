<template>
  <div class="tab-contents">
<div class="searchbox flex">
  <van-search placeholder="搜索商品" v-model="value" style="flex:1;background-color: #fafafa;" @click="filterProduct()"/>
</div>

<div class="contentBody">
<div class="leftTitle">
        <div v-for="(item,index) in catList" :key="index" class="left-box-item" :class="index == selectIndex?'active':'fontcolor'" @click="selectCategoyItem(index)">
         <div class="flex flex-pack-center flex-align-center" style="position: relative;">
           <div class="activeItem"></div>
            {{item.label}}</div>
        </div>
  </div>

<div class="rightContent">
     <div v-for="(item,index) in catList" :key="index" v-if="index == selectIndex" style="text-align:center;margin-top:15px;font-size:16px;">{{item.catName}}</div>


<div class="catList">
    <div style="width:33%;padding:15px;overflow:hidden;" v-for="(item,index) in catContent" :key="index" @click="goProductList(item.catId,item.parentId,index)">
    <div class="cat-item" >
            <div>
                 <img v-lazy="item.catIcon"  alt="" style="    border-radius: 50px;">
                 </div>
            <div>{{item.catName}}</div>
    </div>
    </div>

</div>
</div>

   


</div>



  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import Swipe from "../../components/Swipe.vue";
import mixin from "../../config/mixin";
import { Action } from "vuex-class";
import { Toast } from "vant";


@Component({
  components: {
    Swipe
  },
  mixins: [mixin]
})
export default class Category extends Vue {
  catList = [];
  selectIndex = 0;
  catContent = [];
  value='';

  @Action("setTabIndex") setTabIndex;

  mounted() {
    this.setTabIndex(1);

    console.log(this.$store.getters[Vue.prototype.MutationTreeType.TAB_INDEX]);
    this.getCatList();
    console.log("分类页加载");
  }
    filterProduct() {
    this.$router.push("/filterproduct");
  }
  goProductList(catId,parentCatId,selectIndex) {
    
    this.$router.push({
      path: "/productlist",
     query:{
       catId:catId,
       parentCatId,
       selectIndex,
       title: this.catList[this.selectIndex].catName
       }
    });
  }
  selectCategoyItem(index) {
    this.selectIndex = index;
    this.catContent = this.catList[index].children;
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
      console.log("selectCategoyItem",res.data.data.children);
      this.catList = res.data.data.children;
      this.selectCategoyItem(this.selectIndex);
    });
  }
}
</script>

<style lang="scss" scoped>
@import "../../style/utils.scss";
.left-box-item {
  padding: 10px 0;
}
.contentBody {
  z-index: -1;
  display: flex;
  font-size: 14px;
  width: 100%;
  height: 100vh;
  position: absolute;
  top: 0;
}
.leftTitle {
  padding-top: 42px;
  text-align: center;
  width: 80px;
  height: 100vh;
  overflow: auto;
  background-color: #f7f7f7;
}
.rightContent {
  padding-top: 42px;
  flex: 1;
  height: 100vh;
  overflow: auto;
}
.radios,
.playlists {
  margin: 14px 10px 10px;
  .title {
    color: #000;
    font-size: 16px;
    margin-bottom: 11px;
    font-weight: normal;
  }
  .list {
    display: flex;
    flex-wrap: wrap;
    .list-item {
      flex: 1;
      width: 45%;
      flex-basis: 40%;
      background-color: #fff;
      font-size: 14px;
      margin-bottom: 10px;
      &:nth-child(2n + 1) {
        margin-right: 8px;
      }
      .list-media {
        position: relative;
        margin-bottom: 5px;
      }
      .list-info {
        height: 36px;
        padding: 0 7px 5px;
        color: #000;
        .list_tit {
          @include ellipsis;
        }
      }
      .listen_count {
        position: absolute;
        left: 5px;
        bottom: 7px;
        line-height: 12px;
        color: #fff;
      }
      .icon {
        background-image: url("../../assets/list_sprite.png");
        background-repeat: no-repeat;
        background-size: 24px 60px;
      }
      .icon_listen {
        float: left;
        width: 10px;
        height: 10px;
        background-position: 0 -50px;
        margin-right: 5px;
      }
      .icon_play {
        height: 24px;
        bottom: 5px;
        right: 5px;
        width: 24px;
        position: absolute;
        background-position: 0 0;
      }
      img {
        width: 100%;
        display: block;
        min-height: 145px;
      }
    }
  }
}

.tab-contents {
  position: relative;
}
.loading {
  text-align: center;
  position: absolute;
  z-index: 10;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: #f4f4f4;
  img {
    height: 100px;
    width: 100px;
    margin-top: 127px;
  }
}
.catList {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
}
.cat-item {
  text-align: center;
  img {
    width: 60px;
    height: 60px;
  }
}
.active {
  background-color: #fff;
  border-top-left-radius: 30px;
  border-bottom-left-radius: 30px;
  .activeItem {
    border-left: 4px #ffc630 solid;
    padding: 0 10px;
    position: absolute;
    height: 14px;
    left: 15px;
  }
}
.fontcolor {
  color: #a1a1a1;
}
</style>
<style>
.van-search__input-wrap {
  border-radius: 50px;
}
.van-search {
  background-color: #fafafa;
}
.searchbox .van-search__input-wrap{
  width:100%;
}
.searchbox .van-search__input-wrap input{
  width:100%;
  border-radius:30px;
  border: 0;
  background-color: #f0f0f0;
  padding-left: 30px;
}
</style>

