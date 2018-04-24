<template>
  <div class="tab-contents">
<div style="display:flex;">
<van-search placeholder="搜索商品" v-model="value" style="flex:1"/>
<div>
  <div style="font-size:12px;text-alig:center;    background-color: rgb(242, 242, 242);color:#666;padding:2px 10px 4px 0;">
    <div style=" display: flex;
  justify-content: center;
  align-items: center;">
      <i class="iconfont icon-xiaoxitianchong"  style="font-size:16px;margin:3px;"></i>
      </div>
     <div style="line-height: 15px;">消息</div>
    </div>
  </div>
</div>

<div style=" position: relative;">
  <div class="AllClassification" v-show="isShow">
    <div class="ClassificationTitle"><span>全部分类</span><img v-lazy="'1'" style="width:20px;height:20px;"  @click="toggle()"/></div>
    <div class="ClassificationName"><div v-for="(item,index) in indexList" :key="index"><div @click="changeTab(index)" :class="index==active?'ClassificationActive':''">{{item.pageName}}</div></div></div>
  </div>

  <!-- swipeable -->
<van-tabs :active="active" style="flex:1" @click="changeTab">


  <van-tab v-for="(item,index) in indexList" :title="item.pageName" >

        <div v-for="items in item.children">

            <!-- actionType -->


            <!-- 轮播图 -->
            <div v-if="items.componentType === 'COMPONENT_TYPE_SCROLL_HEADER'">
               <van-swipe :autoplay="3000" style="height:200px;z-index:999;" >
                  <van-swipe-item v-for="(image, imageIndex) in items.items" >
                       <img v-lazy="image.itemImgUrl" style="width:100%;"/>
                  </van-swipe-item>
                </van-swipe>
            </div>

            <!-- 标签栏 -->
          <div v-if="items.componentType === 'COMPONENT_TYPE_QUICK_BAR'">
            <div class="tab_box">
                <div v-for=" (tab,tabIndex) in  items.items" style="width:25%;">
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
                  <span>{{items.name}}</span>
              </div>
                <div class="goodsBody" v-if="items.columnNum ===1">
                  <div v-for="(goods,goodsIndex) in items.items" class="goodsItem" style="width:-webkit-fill-available;border-top: 1px solid #e5e5e5;">
                    <div style="width:-webkit-fill-available;padding:10px;display:flex;">
                      <div style="display:flex;align-items:center;justify-content:center;overflow:hidden;" :style="handlePX('height', 270)+handlePX('width', 270)">
                        <img v-lazy="goods.goodsImg.split(',')[0]" style="width:100%"/>
                      </div>
                      <div style="padding-left:10px;flex:1;" class="textLabel" :style="handlePX('line-height', 48)">
                        <div>
                          <img src="../../assets/image/新品特价.png" :style="handlePX('width',92)+handlePX('height',30)" style="vertical-align: middle;"/>
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
              
                <div class="goodsBody" v-if="items.columnNum === 2">
                  <div v-for="(goods,goodsIndex) in items.items" class="goodsItem">
                    <div style="  width:-webkit-fill-available;  ">
                      <div style="border: 1px #e5e5e5 solid;box-sizing: border-box;display:flex;align-items: center;justify-content:center;overflow:hidden;position:relative;margin:5px auto;" :style="handlePX('height', 410)+handlePX('width', 345)">
                        <img src="../../assets/image/热.png" style="width:-webkit-fill-available;position: absolute;top: 0;left:0;" :style="handlePX('width', 43)+handlePX('height', 49)"/>
                        <img v-lazy="goods.goodsImg.split(',')[0]" style="width:-webkit-fill-available;position: absolute;top: 0;z-index:-1;"/>
                        <div class="textLabel" style="position: absolute;bottom: 0;width: 100%;background-color:rgba(207,207,207,0.3);text-align:center;color:#A3A3A3" :style="handlePX('height', 70)+handlePX('line-height', 70)+handlePX('font-size', 28)">{{goods.jingle}}</div>
                      </div>
                      <div style="margin:5px auto;display:flex;justify-content: center;flex-direction: column;width:-webkit-fill-available;" :style="handlePX('width', 345)">
                        <div>
                          <img src="../../assets/image/满减.png" :style="handlePX('width',52)+handlePX('height',25)"/>
                          <img src="../../assets/image/特价.png" :style="handlePX('width',52)+handlePX('height',25)"/>
                        </div>
                        <div class="textLabel" :style="handlePX('font-size',28)+handlePX('line-height',40)">{{goods.goodsName}}</div>
                        <div style="color:#E05459" :style="handlePX('font-size',30)+handlePX('line-height',40)">￥{{goods.labelPrice}}</div>
                      </div>
                    </div>
                  </div>
                </div>





            </div>




        </div>


<div style="height:50px;"></div> 



  </van-tab>
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


  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import mixin from "../../config/mixin";
import { Action } from "vuex-class";
import { Toast } from "vant";

// import { recommendList } from '../../service/getData';

@Component({
  components: {},
  mixins: [mixin]
})
export default class shopIndex extends Vue {
  @Action("setTabIndex") setTabIndex;
  images = ["https://img.yzcdn.cn/1.jpg", "https://img.yzcdn.cn/2.jpg"];
  indexList = [];
  active = 0;
  value = "";
  isShow = false;
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

          console.log(this.indexList[active]);
          this.indexList.push();
        }
      );
    }
  }
  toggle(){
    this.isShow = !this.isShow;
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
  background-color: #f2f2f2;
  height: 44px;
  line-height: 44px;
  font-size: 14px;
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
.AllClassification {
  position: absolute;
  top: 0;
  z-index: 11111;
  width: 100%;
  background-color: #ffffff;
  .ClassificationTitle{
    display: flex;
    justify-content: space-between;
    padding: 0 15px;
    height:40px;
    span{
      line-height:40px;
    }
  }
  .ClassificationName{
    padding:0 15px 30px;
    display: flex;
    flex-flow: row wrap;
    align-content: flex-start;
    div{
      padding:0 8px;
      flex: 0 0 25%;
      div{
        margin-top: 17px;
        height:30px;
        line-height: 28px;
        text-align: center;
        box-sizing: border-box;
        border:1px solid #9f9f9f;
        color:#9f9f9f;
        border-radius: 40%;
        overflow: hidden;
      }
      .ClassificationActive{
        border:1px solid #ffc630;
        color:#ffc630;
      }
    }
  }
}
</style>
<style>
.van-tabs--line .van-tabs__wrap {
  margin-right: 36px;
}
.van-swipe__indicators {
  left: auto;
  right: 5%;
}
.van-swipe__indicators > i {
  width: 8px;
  height: 5px;
  background-color: #d0d0d0;
}
.van-swipe__indicators > .van-swipe__indicator--active {
  width: 15px;
  background-color: #ffc630;
}
</style>

