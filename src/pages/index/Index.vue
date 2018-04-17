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
  <!-- swipeable -->
<van-tabs :active="active" style="flex:1" @click="changeTab">


  <van-tab v-for="(item,index) in indexList" :title="item.pageName"  >

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
                   <div style="  width:-webkit-fill-available;  padding: 10px;">
                    <div>
                       <img v-lazy="tab.itemImgUrl" style="width:50px;height:50px;"/>
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
               <div v-for="(goods,goodsIndex) in items.items" class="goodsItem" style="width:-webkit-fill-available;">
                   <div style="  width:-webkit-fill-available;  padding: 10px;display:flex;">
                      <div style="display:flex;    align-items: center;justify-content: center;    overflow: hidden;" :style="handleImageWidth1()">
                       <img v-lazy="goods.goodsImg.split(',')[0]" style="width:100%"/>
                      </div>
                   <div style="padding-left:10px;line-height: 23px;flex:1;" class="textLabel">
                     <div class="textLabel">{{goods.goodsName}}
                    </div>
                         <div  class="textLabel"  style="color:#666;font-size:14px;">
                     {{goods.jingle}}
                    </div>
                       <div style="padding:5px;">
                      <span style="color:red">￥{{goods.marketPrice}}</span>
                      <span style="color:#969696;text-decoration:line-through;font-size:13px;">原价:{{goods.labelPrice}}</span>
                    </div>
                   </div>


                    </div>

                    </div>
                </div>
              
                <div class="goodsBody" v-if="items.columnNum === 2">
                    <div v-for="(goods,goodsIndex) in items.items" class="goodsItem">
                   <div style="  width:-webkit-fill-available;  ">
                      <div style="    border: 1px #e5e5e5 solid;box-sizing: border-box;display:flex;
                      align-items: center;justify-content: center;   
                       overflow: hidden;    position: relative;    margin: 5px auto;"
                       :style="handleImageWidth()">
                       <img v-lazy="goods.goodsImg.split(',')[0]" style="width:-webkit-fill-available;"/>
                      <div class="textLabel" style="    position: absolute;bottom: 0;    width: 100%;
    background-color: #fff;
    opacity: 0.6;">{{goods.jingle}}</div>

                      </div>
                      <div style="width:150px;margin:0 auto;">
                   <div class="textLabel">
                      {{goods.goodsName}}
                    </div>
                       <div style="color:red">
                      ￥{{goods.labelPrice}}
                    </div>
</div>
                    
                    </div>
                    </div>
                </div>





            </div>




        </div>


<div style="height:50px;"></div> 



  </van-tab>
</van-tabs>
<div style="  position: absolute;
  top: 0;
  right: 0;height:44px;line-height:44px;padding:0 5px">
  <i class="iconfont icon-icon-arrow-bottom2"></i>
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
</style>
<style>
.van-tabs--line .van-tabs__wrap {
  margin-right: 36px;
}
</style>

