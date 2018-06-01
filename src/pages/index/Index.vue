<template>
  <div class="tab-contents">
<div class="searchbox flex">




  <van-search placeholder="搜索商品" v-model="value" class="flex-1" style="background-color: #fafafa;" @click="filterProduct()"/>


  
<div @click="goMessageList()">
  <div style="font-size:12px;text-alig:center;background-color: rgb(250, 250, 250);color:#666;padding:4px 10px;">
    <div class="flex flex-align-center flex-pack-center">

      <i class="iconfont icon-lingdang"  style="font-size:16px;margin:3px;"></i>

      </div>
     <div style="line-height: 15px;">消息</div>
    </div>
  </div>
</div>

<div style=" position: relative;">

  <div style="background-color:rgba(0, 0, 0, 0.498039);" v-show="isShow" >
  <div class="AllClassification" >
    <div class="flex flex-pack-justify flex-align-center ClassificationTitle "><span>全部分类</span>
      <i class="iconfont icon-iconset0422"  style="font-size:20px;margin:3px;"  @click="toggle()"></i>
    </div>
    <div class="ClassificationName flex flex-warp-justify">
      <div v-for="(item,index) in indexList" :key="index" style="width:25%;">
      <div @click="changeTab(index)" class="flex flex-pack-center flex-align-center Classification" :class="index==active?'ClassificationActive':'ClassificationItem'">
        {{item.pageName}}
        </div>
        </div>
        </div>
  </div>
</div>
  <!-- swipeable -->
<van-tabs :active="active" @click="changeTab" class="index_tabs flex-1" >


<!-- :style="$route.query.active?'margin-top:-45px':''" -->
  <van-tab v-for="(item,index) in indexList" :title="item.pageName" :key="index" >
<div v-if="active == index">
        <div v-for="(items,childrenIndex) in item.children" :key="childrenIndex" >

            <!-- actionType -->

            <!-- 轮播图 -->
            <div v-if="items.componentType === 'COMPONENT_TYPE_SCROLL_HEADER'">
               <van-swipe :autoplay="3000" style="z-index:999;" :style="'height:'+$store.getters[MutationTreeType.SYSTEM].availWidth/2+'px'" >
                  <van-swipe-item v-for="(image, imageIndex) in items.items" :key="imageIndex">
                       <img v-lazy="image.itemImgUrl" style="width:100%;" @click="goActionType(image.actionType,image.actionValue)"/>
                  </van-swipe-item>
                </van-swipe>
            </div>

            <!-- 标签栏 -->
          <div v-if="items.componentType === 'COMPONENT_TYPE_QUICK_BAR'">
            <div class="tab_box">
                <div v-for=" (tab,tabIndex) in  items.items" style="width:25%;" :key="tabIndex" @click="goActionType(tab.actionType,tab.actionValue)">
                   <div style="width:-webkit-fill-available;padding: 10px;">
                    <div>
                       <img v-lazy="tab.itemImgUrl" style="border-radius:50%;" :style="handlePX('width', 100)+handlePX('height', 100)"/>
                    </div>
                    <div>{{tab.itemName}}</div>
                    </div>
                </div>
            </div>
            </div>



          <div v-if="items.componentType === 'COMPONENT_TYPE_GOODS_TAG'">
              <div class="goodsTitleTab">
                  <div style="">
                    <span style="color:#ffc630;margin:0 3px">C</span>
                    <span>{{items.name}}</span>
                     <div style="font-size: 12px;color: #999;">
                    CUSTOM RECOMMENDATION
                  </div>
                  </div>
                 
                  
              </div>
                <div class="goodsBody" v-if="items.columnNum ===1" >
                  <div v-for="(goods,goodsIndex) in items.items" @click="goProductDetail(goods.goodsId)" :key="goodsIndex" class="goodsItem" style="width:-webkit-fill-available;border-top: 1px solid #e5e5e5;">
                    <div class="flex" style="width:-webkit-fill-available;padding:10px;">
                      <div class="flex flex-pack-center flex-align-center" style="overflow:hidden;" :style="handlePX('height', 270)+handlePX('width', 270)">
                        <img v-lazy="goods.goodsImg.split(',')[0]" style="width:100%"/>
                      </div>
                      <div style="padding-left:10px;" class="textLabel flex-1" :style="handlePX('line-height', 48)">
                        <div>
                          <img src="../../assets/image/新品特价.png" v-if="goods.isBargain"  :style="handlePX('width',92)+handlePX('height',30)"  style="vertical-align: middle;"/>
                          <span class="textLabel" style="color:#000000;" :style="handlePX('font-size',28)">{{goods.goodsName}}</span>
                        </div>
                        <div class="textLabel"  style="color:#A3A3A3;" :style="handlePX('font-size',28)+handlePX('line-height',44)">{{goods.jingle}}</div>
                        <div>
                          <span style="color:#E05459" :style="handlePX('font-size',34)">￥{{goods.marketPrice}}</span>
                          <span style="color:#C5C4C4;text-decoration:line-through;" :style="handlePX('font-size',24)">原价:{{goods.labelPrice}}</span>
                        </div>
                        <van-button style="border-radius:4%;background-color:#F4C542;color:#FFFFFF;border:#F4C542;" :style="handlePX('width',200)+handlePX('height',55)+handlePX('line-height',55)">立即抢购</van-button>
                      </div>
                    </div>
                  </div>
                </div>
              
                <div class="goodsBody" v-if="items.columnNum === 2" style="  padding:10px 0;border-top:1px #e5e5e5 solid;">
                  <div v-for="(goods,goodsIndex) in items.items" @click="goProductDetail(goods.goodsId)" :key="goodsIndex" class="goodsItem">
                    <div style="  width:-webkit-fill-available;  ">
                      <div class="flex flex-pack-center flex-align-center" style="border: 1px #e5e5e5 solid;box-sizing: border-box;overflow:hidden;position:relative;margin:5px auto;" :style="handlePX('height', 410)+handlePX('width', 345)">
                        <img src="../../assets/image/热.png" style="width:-webkit-fill-available;position: absolute;top: 0;left:0;z-index:50" :style="handlePX('width', 43)+handlePX('height', 49)"/>
                        <img v-lazy="goods.goodsImg.split(',')[0]" style="width:-webkit-fill-available;position: absolute;top: 0;"/>
                        <div class="textLabel" style="position: absolute;bottom: 0;width: 100%;background-color:rgba(207,207,207,0.3);text-align:center;color:#A3A3A3" :style="handlePX('height', 70)+handlePX('line-height', 70)+handlePX('font-size', 28)">{{goods.jingle}}</div>
                      </div>
                      <div class="flex flex-pack-center flex-v" style="margin:5px auto;width:-webkit-fill-available;" :style="handlePX('width', 345)">
                        <div>
                          <img src="../../assets/image/满减.png" v-if="goods.couponList" :style="handlePX('width',52)+handlePX('height',25)"/>
                          <img src="../../assets/image/特价.png" v-if="goods.isBargain" :style="handlePX('width',52)+handlePX('height',25)"/>
                        </div>
                        <div class="textLabel" :style="handlePX('font-size',28)+handlePX('line-height',40)">{{goods.goodsName}}</div>
                        <div style="color:#E05459" :style="handlePX('font-size',30)+handlePX('line-height',40)">￥{{goods.marketPrice}}</div>
                      </div>
                    </div>
                  </div>
                </div>


                <div class="goodsBody" v-if="items.columnNum === 3" style="  padding:10px 0;border-top:1px #e5e5e5 solid;">
                  <div v-for="(goods,goodsIndex) in items.items" @click="goProductDetail(goods.goodsId)" :key="goodsIndex" class="goodsItem">
                    <div style="  width:-webkit-fill-available;  ">
                      <div class="flex flex-pack-center flex-align-center" style="border: 1px #e5e5e5 solid;box-sizing: border-box;overflow:hidden;position:relative;margin:5px auto;" :style="handlePX('height', 410)+handlePX('width', 345)">
                        <img src="../../assets/image/热.png" style="width:-webkit-fill-available;position: absolute;top: 0;left:0;" :style="handlePX('width', 43)+handlePX('height', 49)"/>
                        <img v-lazy="goods.goodsImg.split(',')[0]" style="width:-webkit-fill-available;position: absolute;top: 0;z-index:-1;"/>
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

<div style="height:10px; background-color:#f7f7f7;"></div>

            </div>




        </div>


        </div>



  </van-tab>
<div style="height:50px;"></div> 
  
</van-tabs>
<div style="position: absolute;top: 0;right: 0;height:44px;line-height:44px;padding:0 5px;">
  <i class="iconfont icon-icon-arrow-bottom2" @click="toggle()"></i>
</div>
</div>


<!-- controls 动态 加上播放的图标 -->
<!-- <video controls="controls"  >
  <source src="http://www.w3school.com.cn/i/movie.ogg" type="video/ogg" />
  <source src="http://www.w3school.com.cn/i/movie.mp4" type="video/mp4" />
Your browser does not support the video tag.
</video> -->
<div class="topBigshit" v-if="$route.query.active"></div> 
<div class="bottomBigshit" v-if="$route.query.active"></div> 

  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import mixin from "../../config/mixin";
import { Action } from "vuex-class";
import { Toast } from "vant";
import { Watch } from "vue-property-decorator";

// import { recommendList } from '../../service/getData';

@Component({
  components: {},
  mixins: [mixin]
})
export default class shopIndex extends Vue {
  @Action("setTabIndex") setTabIndex;
  @Action("setlabelActive") setlabelActive;

  @Watch("")
  watchCount(newVal, oldVal) {
    console.log("newVal", newVal, "oldVal", oldVal);
  }

  images = ["https://img.yzcdn.cn/1.jpg", "https://img.yzcdn.cn/2.jpg"];
  indexList = [];
  active = 0;
  value = "";
  isShow = false;
  filterProduct() {
    this.$router.push("/filterproduct");
  }

  goMessageList() {
    Vue.prototype.$confirmLogin("/messagelist");
  }
  initIndex() {
    Vue.prototype.$reqUrlGet("/page/list", {}, res => {
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
      this.indexList = res.data.data;

      if (this.indexList.length > 0) {
        this.changeTab(this.active);
      }
    });
  }
  changeTab(active) {
    this.active = active;
    this.isShow = false;
    if (!this.indexList[active].children) {
      Vue.prototype.$reqFormPost(
        "/page/info",
        {
          pageId: this.indexList[active].pageId
        },
        res => {
          if (res == null) {
            console.log("网络请求错误！");
            return;
          }
          if (res.data.status != 200) {
            Toast(res.data.message);
            return;
          }
          console.log("---------");
          (<any>Object).assign(this.indexList[active], {
            children: res.data.data
          });

          this.indexList.push();
          if (this.indexList[active].catId) {
            Vue.prototype.$reqFormPost(
              "/user/goods/list",
              {
                catId: this.indexList[active].catId
              },
              res => {
                if (res == null) {
                  console.log("网络请求错误！");
                  return;
                }
                if (res.data.status != 200) {
                  Toast(res.data.message);
                  return;
                }
                this.indexList[active].children.push({
                  componentType: "COMPONENT_TYPE_GOODS_TAG",
                  columnNum: 1,
                  items: res.data.data.goodsList
                });

                this.indexList.push();
              }
            );
          }
        }
      );
    }
  }
  toggle() {
    this.isShow = !this.isShow;
  }
  goProductDetail(goodsId) {
    this.$router.push({
      path: "/productdetail",
      query: {
        goodsId: goodsId
      }
    });
  }

  goActionType(actionType, actionValue) {
    if (actionType == "ACTION_TYPE_GOODSID") {
      var goodsId = actionValue;
      this.$router.push({
        path: "/productdetail",
        query: {
          goodsId: goodsId
        }
      });
    }
    if (actionType == "ACTION_TYPE_TAGID") {
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
        for (var i = 0; i < res.data.data.children.length; i++) {
          for (var j = 0; j < res.data.data.children[i].children.length; j++) {
            if (res.data.data.children[i].children[j].catId == actionValue) {
              var selectIndex = j.toString();
              this.$router.push({
                path: "/productlist",
                query: {
                  catId: res.data.data.children[i].children[j].catId,
                  parentCatId: res.data.data.children[i].children[j].parentId,
                  selectIndex: selectIndex,
                  title: res.data.data.children[i].label
                }
              });
              return;
            }
          }
        }
      });
    }
    if (actionType == "ACTION_TYPE_URL") {
      return;
    }
    return;
  }

  handleImageWidth() {
    return (
      "width:" +
      this.$store.getters[Vue.prototype.MutationTreeType.SYSTEM].availWidth *
        0.45 +
      "px;height:" +
      this.$store.getters[Vue.prototype.MutationTreeType.SYSTEM].availWidth *
        0.45 +
      "px;"
    );
  }
  handleImageWidth1() {
    return (
      "width:" +
      this.$store.getters[Vue.prototype.MutationTreeType.SYSTEM].availWidth *
        0.35 +
      "px;height:" +
      this.$store.getters[Vue.prototype.MutationTreeType.SYSTEM].availWidth *
        0.35 +
      "px;"
    );
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

  mounted() {
    if (this.$route.query.active) {
      this.active = parseInt(this.$route.query.active);
      if (this.$route.query.availWidth && this.$route.query.availHeight) {
        this.setlabelActive({
          availWidth: this.$route.query.availWidth,
          availHeight: this.$route.query.availHeight
        });
      }
    }

    this.setTabIndex(0);

    this.initIndex();
  }
}
</script>

<style lang="scss" scoped>
@import "../../style/utils.scss";

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
.tab_box {
  display: flex;
  text-align: center;
  font-size: 14px;
  flex-wrap: wrap;
}
.goodsTitleTab {
  height: 70px;
  display: flex;
  color: #666;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  text-align: center;
}
.goodsBody {
  width: -webkit-fill-available;
  display: flex;
  flex-wrap: wrap;
}
.goodsItem {
  width: 50%;
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
</style>

<style>
/* .index_tabs .van-tabs__wrap {
  margin-right: 36px;
}

.index_tabs .van-swipe__indicators > i {
  width: 8px;
  height: 8px;
  background-color: #d0d0d0;
  margin: 0 5px;
  border-radius: 100px;
}
.index_tabs .van-swipe__indicators > .van-swipe__indicator--active {
  background-color: #ffc630;
}
.van-tabs__wrap {
  overflow-x: auto;
} */
.searchbox .van-search__input-wrap {
  width: 100%;
  display: flex;
  align-items: center;
}

.searchbox .van-search__input-wrap input {
  width: 100%;
  border-radius: 30px;
  border: 0;
  background-color: #f0f0f0;
  padding-left: 30px;
}

.bottomBigshit {
  position: fixed;
  bottom: 0;
  width: 100%;
  z-index: 9999;
  height: 50px;
}
.topBigshit {
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 9999;
  height: 100%;
}
::-webkit-input-placeholder {
  /* WebKit browsers */
  font-size: 14px;
}
:-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  font-size: 14px;
}
::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  font-size: 14px;
}
:-ms-input-placeholder {
  /* Internet Explorer 10+ */
  font-size: 14px;
}
</style>

