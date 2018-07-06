<template>
  <div class="tab-contents">
<div class="searchbox flex">




  <van-search placeholder="搜索商品" v-model="value" class="flex-1" style="background-color: #fafafa;" @click="filterProduct()"/>


  
<div @click="goMessageList()" >
  <div style="height:47px;font-size:12px;text-alig:center;background-color: rgb(250, 250, 250);color:#666;padding:4px 10px;">
    <div class="flex flex-align-center flex-pack-center">

      <i class="iconfont icon-lingdang"  style="font-size:16px;margin:3px;"></i>

      </div>
     <div style="line-height: 15px;">消息</div>
    </div>
  </div>
</div>

<div style=" position: relative;">

  <div style="background-color:rgba(0, 0, 0, 0.498039);    z-index: 99999;position: fixed;width: 100%;height: 100vh;top:0;" v-show="isShow" >
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
               <van-swipe :autoplay="3000" style="z-index:199;" :style="'height:'+$store.getters[MutationTreeType.SYSTEM].availWidth/2+'px'" >
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
                       <img v-lazy="tab.itemImgUrl" style="border-radius:50px;background-color: #000;" :style="handlePX('width', 100)+handlePX('height', 100)"/>
                    </div>
                    <div style="color: #7f7f7f;">{{tab.itemName}}</div>
                    </div>
                </div>
            </div>
            </div>



          <div v-if="items.componentType === 'COMPONENT_TYPE_GOODS_TAG'">
              <div class="goodsTitleTab">
                  <div style="">
                    <span style="color:#ffc630;margin:0 3px">{{items.letter}}</span>
                    <span>{{items.name}}</span>
                     <div style="font-size: 12px;color: #999;">
                   {{items.nameEn}}
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
                        <van-button style="border-radius:4%;background-color:#F4C542;color:#FFFFFF;border:#F4C542;" :style="handlePX('width',200)+handlePX('height',55)+handlePX('line-height',55)" @click.stop="doChangeModel(goods.goodsId)">立即抢购</van-button>
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
















<!-- 选择规格 -->

<div :class="keepModel ?'bg_shop1' :'bg_shop_none1'" style='background-color: rgba(0, 0, 0, 0.498039);height: 100%;width: 100%;' @click='changeModel()'>
 
 <div style="position: relative;width:100%;height:100%;">

        <div  style=' background-color:#fff;width:100%;' :class="keepModel ?'modiaBoxUp2' :'modiaBoxDown2'" @click.stop="()=>{return }">
 <div class="flex flex-pack-justify">
      <div class="flex" style='border-radius:2px;background-color:#fff;margin:10px 10px 10px 20px;'>
        <img v-lazy="skuItem.skuImgUrl?skuItem.skuImgUrl :detatil['goodsImg'].split(',')[0]" style="width:80px;height:80px;" @click="imagePreview(skuItem.skuImgUrl?skuItem.skuImgUrl :detatil['goodsImg'].split(',')[0])"/>
      </div>
      <div class="flex-1" style='font-size:13px;padding: 10px 0 0 0;'>
        <div style="font-size:16px;">{{detatil['goodsName']}}</div>
        <div style='overflow: hidden;' :style="handlePX('margin-top',20)">
          <span style='font-size:18px;color:rgb(229, 28, 35)'>￥{{skuItem.marketPrice?skuItem.marketPrice:detatil.marketPrice}}</span>
          <span class="labelPrice">￥{{detatil['labelPrice']}}</span>
        </div>
 <div style="font-size:14px;" :style="handlePX('margin-top',10)">
   <span v-if="chosensku.length>0" class="van-cell-text">已选择:
                  <span v-for="(item,index) in chosensku" :key="index"><span v-if="index!==0"></span>{{item}}</span>
                </span>
    <span v-else class="van-cell-text" style="color:#585858;">请选择规格属性</span>
 </div>
 
      </div>
    </div>

    <div style='font-size:14px;max-height:300px;overflow:auto;'>
      <div v-for='(item,indextop) in detatil.skuKey' :key="indextop">
      <div style='padding:5px 20px 0;color:#585858;'>{{item.skuKeyIdName}}</div>
      <div class='skuKeyBox'>
      <div v-for="(items,index) in  item.valueList" :key="index">
        <div  :class="chosenList[indextop] === items ?'sku_box_select':'sku_box' " 
        :style="items.disable?'color:#ccc;':''+ chosenList[indextop] === items.skuValueId?'border-color:#f4c542;color:#f4c542':'' " @click.stop='selectSku(indextop,items)'  >{{items.skuValueName}}</div>
      </div>
      </div>
     
      </div>
    </div>


    <div class='num_box'>
      <div class="flex flex-align-center" style="color:#585858;">数量</div>
    <van-stepper v-model="num" :style="handlePX('margin-top',20)"/>
    </div>
  <div>
      <van-goods-action class="vangoods" style="z-index:1000;background-color: #ffffff;">
        <van-goods-action-mini-btn icon="chat" onclick="showMeiQia()" class="flex flex-pack-center flex-align-center flex-v" style="border-top:1px #e5e5e5 solid;font-size:22px;padding:0 10px;"/>
        <van-goods-action-mini-btn icon="cart"  @click="onClickMiniBtn_cart" class="flex flex-pack-center flex-align-center flex-v" style="border-top:1px #e5e5e5 solid;font-size:22px;padding:0 10px;"/>
        <!-- <van-goods-action-mini-btn icon="like" @click="onClickMiniBtn_collection" :class="{collection_color:isCollection}" class="flex flex-pack-center flex-align-center flex-v" style="border-top:1px #e5e5e5 solid;font-size:22px;padding:0 10px;"/> -->
        <van-goods-action-big-btn text="立即购买" @click="addCar()" class="flex-1"/>
        <van-goods-action-big-btn text="加入购物车" @click="addCart()" primary class="flex-1"/>
      </van-goods-action>
    </div>
      </div>
</div>
</div>

<div style="position: absolute;top: 0;right: 0;height:44px;line-height:44px;padding:0 10px;">
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
import { Toast, ImagePreview } from "vant";
import { Watch } from "vue-property-decorator";

// import { recommendList } from '../../service/getData';

@Component({
  components: {},
  mixins: [mixin]
})
export default class shopIndex extends Vue {
  @Action("setTabIndex") setTabIndex;
  @Action("setlabelActive") setlabelActive;
  @Action("setPrepareId") setPrepareId;

  @Watch("")
  watchCount(newVal, oldVal) {
    console.log("newVal", newVal, "oldVal", oldVal);
  }

  images = ["https://img.yzcdn.cn/1.jpg", "https://img.yzcdn.cn/2.jpg"];
  indexList = [];
  active = 0;
  value = "";
  isShow = false;
  changeModel() {
    this.keepModel = !this.keepModel;
  }

  imagePreview(img) {
    ImagePreview([img], 0);
  }
  onClickMiniBtn_cart() {
    this.$router.push("/cart");
  }

  skuItem = {};
  detatil = {
    goodsImg: ""
  };
  keepModel = false;
  chosensku = [];
  chosenList = [];
  isCollection = false;
  num = 0;
  doChangeModel(goodsId) {
    if (
      this.$store.getters[Vue.prototype.MutationTreeType.TOKEN_INFO].userId ==
        "" &&
      this.$store.getters[Vue.prototype.MutationTreeType.TOKEN_INFO].token == ""
    ) {
      this.$router.push({ name: "login" });
      return;
    }

    this.num = 1;

    Vue.prototype.$reqFormPost(
      "/goods/front/detail",
      {
        userId: this.$store.getters[Vue.prototype.MutationTreeType.TOKEN_INFO]
          .userId,
        token: this.$store.getters[Vue.prototype.MutationTreeType.TOKEN_INFO]
          .token,
        goodsId: goodsId
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
        console.log("res.data", res.data);

        if (res.data.data.singleStatus) {
          this.skuItem = res.data.data.sku[0];
        }
        this.detatil = res.data.data;
        this.detatil["skuKey"].forEach((keyItem, keyIndex) => {
          keyItem.valueList.forEach((valueItem, valueIndex) => {
            let opt = { disable: true, chosen: false };
            this.detatil["sku"].forEach((skuItem, skuIndex) => {
              if (valueItem.skuValueId === skuItem.attrs[keyIndex].valueId) {
                opt.disable = false;
                return false;
              }
            });
            (<any>Object).assign(valueItem, opt);
          });
        });
        this.keepModel = !this.keepModel;
      }
    );
  }
  filterProduct() {
    this.$router.push("/filterproduct");
  }

  goMessageList() {
    Vue.prototype.$confirmLogin("/messagelist");
  }
  initIndex(status) {
    Vue.prototype.$reqUrlGet("/page/list", {
      status:status
    }, res => {
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

  addCart() {
    if (!this.skuItem["skuId"]) {
      Toast("请选择规格属性");
      return;
    }
    Vue.prototype.$reqFormPost(
      "/shop/cart/add",
      {
        userId: this.$store.getters[Vue.prototype.MutationTreeType.TOKEN_INFO]
          .userId,
        token: this.$store.getters[Vue.prototype.MutationTreeType.TOKEN_INFO]
          .token,
        goodsId: this.detatil["goodsId"],
        skuId: this.skuItem["skuId"]
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
        Toast("加入成功");
        this.keepModel = false;
        console.log("加入购物车", res.data);
        this.getCartList();
      }
    );
  }
  addCar() {
    if (!this.skuItem["skuId"]) {
      Toast("请选择规格属性");
      return;
    }
    Vue.prototype.$reqFormPost(
      "/prepare/order/direct",
      {
        userId: this.$store.getters[Vue.prototype.MutationTreeType.TOKEN_INFO]
          .userId,
        token: this.$store.getters[Vue.prototype.MutationTreeType.TOKEN_INFO]
          .token,
        goodsId: this.detatil["goodsId"],
        skuId: this.skuItem["skuId"],
        num: this.num
      },
      res => {
        if (res == null) {
          console.log("网络请求错误！");
          return;
        }
        console.log(res);

        if (res.data.status != 200) {
          console.log(
            "需控制错误码" + res.data.status + ",错误信息：" + res.data.message
          );
          Toast(res.data.message);
          return;
        }
        this.setPrepareId(res.data.data.prepareId);
        this.$router.push({
          path: "/settle"
        });
        console.log("预支付订单ID", res.data.data.prepareId);
      }
    );
    // console.log(this.skuItem.skuId);
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
  selectSku(indextop, main) {
    if (main.disable) {
      return;
    }

    if (
      (this.chosenList[indextop] || "") != "" &&
      this.chosenList[indextop] === main.skuValueId
    ) {
      this.chosenList[indextop] = "";
      this.chosensku[indextop] = "";
      this.chosensku.splice(0, this.chosensku.length);
    } else {
      this.chosenList[indextop] = main.skuValueId;
      this.chosensku[indextop] = main.skuValueName;
    }

    this.chosenList = this.chosenList;
    this.skuItem = {};

    let skuItemOpt = false;

    this.detatil["skuKey"].forEach((keyItem, keyIndex) => {
      keyItem.valueList.forEach((valueItem, valueIndex) => {
        valueItem.disable = true;
        for (let i = 0; i < this.detatil["sku"].length; i++) {
          if (
            this.detatil["sku"][i].attrs[keyIndex].valueId !=
            valueItem.skuValueId
          ) {
            continue;
          }
          let tag = true;
          for (let j = 0; j < this.detatil["sku"][i].attrs.length; j++) {
            if (keyIndex == j) {
              continue;
            }
            if (
              (this.chosenList[j] || "") != "" &&
              this.chosenList[j] != this.detatil["sku"][i].attrs[j].valueId
            ) {
              tag = false;
              break;
            }
          }
          if (tag) {
            valueItem.disable = false;
            break;
          }
        }
      });
    });
    if (this.chosenList.length === this.detatil["skuKey"].length) {
      let optionChosen = () => {
        let count = true;
        this.chosenList.forEach((item, index) => {
          if (item === "") {
            count = false;
            return false;
          }
        });
        return count;
      };
      if (optionChosen) {
        for (let i = 0; i < this.detatil["sku"].length; i++) {
          let count = 0;
          for (let j = 0; j < this.chosenList.length; j++) {
            if (
              this.chosenList[j] === this.detatil["sku"][i].attrs[j].valueId
            ) {
              console.log(
                this.chosenList[j] === this.detatil["sku"][i].attrs[j].valueId,
                this.detatil["sku"][i].attrs[j]
              );
              count += 1;
              if (count === this.chosenList.length) {
                this.skuItem = this.detatil["sku"][i];
                break;
              }
            }
          }
        }
      }
    }
    this.chosenList.push();
    this.chosensku.push();
  }
   getNumber(cartList = []) {
    let num = 0;
    cartList.forEach((item, index) => {
      num += item.num;
    });
    return num.toString();
  }
  getCartList() {
    Vue.prototype.$reqFormPost(
      "/shop/cart/query",
      {
        userId: this.$store.getters[Vue.prototype.MutationTreeType.TOKEN_INFO]
          .userId,
        token: this.$store.getters[Vue.prototype.MutationTreeType.TOKEN_INFO]
          .token
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
        var div = document.getElementById("cartLen");
        if (!document.getElementById("cartLen")) {
          div = document.createElement("div");
          div.setAttribute("id", "cartLen");
          div.className = "messageFexid";
          div.style.right = "11px";
          var diva = document.getElementsByClassName(
            "van-tabbar-item__text"
          )[2];
          diva.appendChild(div);
        }
        if (res.data.data.carts.length > 0) {
          div.innerHTML = this.getNumber(res.data.data.carts);
        } else {
          div.style.display = "none";
        }
      }
    );
  }
  mounted() {
    let status = false
    if (this.$route.query.active) {
      status = true
      this.active = parseInt(this.$route.query.active);
      if (this.$route.query.availWidth && this.$route.query.availHeight) {
        this.setlabelActive({
          availWidth: this.$route.query.availWidth,
          availHeight: this.$route.query.availHeight
        });
      }
    }

    this.setTabIndex(0);
    this.initIndex(status);
    if (
      this.$store.getters[Vue.prototype.MutationTreeType.TOKEN_INFO].userId !=
        "" &&
      this.$store.getters[Vue.prototype.MutationTreeType.TOKEN_INFO].token != ""
    ) {
      this.getCartList();
    }
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
  top: 47px;
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
.searchbox .van-search__input-wrap {
  width: 100%;
  display: flex;
  align-items: center;
  z-index: 200;
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
.bg_shop1 {
  display: flex;
  position: fixed;
  bottom: 0;
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.498039);
  height: 100%;
  width: 100%;
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

.modiaBoxDown2 {
  position: absolute;
  bottom: -100%;
  animation: myfirst0001 0.5s;
}

.collection_color {
  color: red;
}

.skuKeyBox {
  display: flex;
  flex-wrap: wrap;
}

.sku_box {
  margin: 10px 0px 0px 20px;
  padding: 3px 10px;
  border-radius: 4px;
  border: 1px solid #7f7f7f;
  background-color: #ffffff;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 100px;
}

.vangoods {
  position: inherit;
}
.num_box {
  font-size: 16px;
  padding: 20px;
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

