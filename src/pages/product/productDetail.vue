<template>

  <div class="tab-contents"   style=" width: 100%;
    background-color: #e4e4e4;
    overflow: auto;" ref="logo" v-on:scroll.passive="onScroll">
    <div v-if="$route.query.availWidth && $route.query.availHeight"  class="dialog"></div>
    <comhead ref="comhead" isLeftIcon="icon-zuo"   leftIconName="angle-left" @leftClick="false"   :contextIndex="true" isRightIcon="true"  ></comhead>
    <!-- <div style="    height: 38px;
    position: absolute;
    z-index: 999;
    top: 11px;
    left: 51%;
    width: 58px;
    " @click="returnTop"></div> -->
     <!-- <ul>
    <li  v-scroll-to="'#element'">section 1</li>
</ul>
     <div style="margin-top:1000px;"  id="element">111</div> -->
     
        <van-swipe :autoplay="3000"  :style="'height:'+$store.getters[MutationTreeType.SYSTEM].availWidth+'px'">
          <van-swipe-item v-for="(image, index) in detatil['goodsImg'].split(',')"  :key="index" class="flex shopTop">
            <img v-lazy="image" style="width:100%;" />
          </van-swipe-item>
        </van-swipe>
        <div class="goodsTitle">
            <div class="goodstitle">
                <div>{{detatil.goodsName}}</div>
                <div style="font-size:14px;color:#666">{{detatil.jingle}}</div>
                <div class="pricebox">
                  <div>
                    <div class="marketPrice" style="font-size:18px;"> {{detatil.goodsType =='RETAIL' ?detatil.sectionMarketPrice:`${detatil.marketPrice}积分`}}</div>
                    <span class="labelPrice" style="font-size:14px;" v-if="detatil.goodsType =='RETAIL'&&  detatil['labelPrice'] &&  detatil['labelPrice'] !== 0">原价:{{detatil.sectionLabelPrice}}</span>
                    <div class="marketPrice" style="font-size:14px;" v-if="detatil.awardScore>0&&detatil.goodsType =='RETAIL'"> {{detatil.sectionScore}}</div>
              
                  </div>
                  <div class="comment" @click="go_comment()">
                    <div style="font-size:15px;color:#666">用户评价</div>
                    <div>
                      <i class="iconfont icon-pingjia" style="color:#ffc630;font-size:22px;"></i>
                      <span>{{commentnum}}</span>
                    </div>
                  </div>
                </div>
            </div>   
        </div>
  
        <div class="functionList" style="margin-top:10px;">
          <van-cell-group>
            <van-cell title="请选择规格数量" is-link @click="changeModel()">
              <template slot="title">
                <span v-if="chosensku.length>0" class="van-cell-text">已选择:
                  <span v-for="(item,index) in chosensku" :key="index"><span v-if="index!==0">，</span>{{item}}</span>
                </span>
                <span v-else class="van-cell-text">请选择规格数量</span>
              </template>
            </van-cell>
            <van-cell v-if="couponListOne.bargainStatus" title="限制：特价商品不可与优惠卷叠加使用" />
            <van-cell v-if="couponList.length>0 && !couponListOne.bargainStatus && detatil.goodsType =='RETAIL'" is-link @click="go_collar_center()" class="coupon" >
              <template slot="title">
                <!-- <img v-lazy="'1'" :style="handlePX('width',112)+handlePX('height',26)"/> -->

                <span class="van-cell-text" v-if="couponListOne.couponList && couponListOne.couponList.length>0">领券:</span>
               
                <span class="full_bg" v-for="(item,index) in couponList" :key="index" v-if="index<2">
                   满{{item.fullDenomination}}减{{item.couponDenomination}}
                </span>
                <span style="color: #ffc630;
    font-weight: 600;">...</span>
                <!-- <span class="full_bg" v-if="couponListOne.couponList&& couponListOne.couponList.length>0">
                  {{couponListOne.couponList[0].couponName}}
                </span> -->

              </template>
            </van-cell>
            <van-cell v-if="detatil.remark">
              <template slot="title" >
                <span class="van-cell-text">备注：</span>
                <span style="color:#ff6d72;" >{{detatil.remark}}</span>
              </template>
            </van-cell>
            <van-cell>
              <template slot="title">
                <span class="van-cell-text">服务：</span>
                <span style="" v-for="(item,index) in detatil.slogan.split(';')" style="margin-right:15px;"><span style="color: #ffc630;    font-weight: 600;margin:0 5px;">·</span>{{item}}</span>
              </template>
            </van-cell>          
          </van-cell-group>
        </div>

        <div class="userCommentList" id="detail" style="background-color:#ffffff;margin-top:10px;">


            <van-cell is-link @click="go_comment()" >
              <template slot="title">
                <span class="van-cell-text">用户评价<span style="margin-left:10px;">({{commentnum}})</span></span>
              </template>
              <template>
                <span>{{praise}}%好评</span>
              </template>
            </van-cell>


          <div  v-for="(item,index) in detatil.commentList" :key="index" v-if="index == 0">
            <div class="userComment" style="padding:10px 15px;">
              <div class="flex">
                <img v-if="item.user.userIcon" v-lazy="item.user.userIcon" :style="handlePX('width',45)+handlePX('height',45)" style="vertical-align:middle;border-radius:50%;"/>                
                <img v-else src="../../assets/image/userIcon.png" :style="handlePX('width',45)+handlePX('height',45)" style="vertical-align:middle;border-radius:50%;"/>
                <div class="textLabel" style="    max-width: 50%;">{{item.user.nickName}}</div>
                 <div class="star-box" style="margin:0 10px;">
        <img v-for="(star,index) in item.star" :key="index" :src="require('../../assets/image/星星.png')" style="margin-right:5px;" :style="handlePX('width',37)+handlePX('height',37)"/>
        <img v-for="(star,index) in 5-item.star" :key="index" :src="require('../../assets/image/灰色星星.png')" style="margin-right:5px;" :style="handlePX('width',37)+handlePX('height',37)"/>
      </div>
              </div>
                      <div style="color:#999999;font-size:14px;">{{item.createTime}}
              <span v-for="n in JSON.parse(item.skuKeyValue)" style="margin:0 5px;">{{n.key}}：{{n.value}}</span>
            </div>
            <div style="padding:5px 0;">{{item.commentContent}}</div>
              <div v-if="item.commentImg">
                <img v-if="item.commentImg.split(',')[0]" v-lazy="item.commentImg.split(',')[0]" :style="handlePX('width',100)+handlePX('height',100)"/>
                <img v-if="item.commentImg.split(',')[1]" v-lazy="item.commentImg.split(',')[1]" :style="handlePX('width',100)+handlePX('height',100)"/>
                <img v-if="item.commentImg.split(',')[2]" v-lazy="item.commentImg.split(',')[2]" :style="handlePX('width',100)+handlePX('height',100)"/>
                <img v-if="item.commentImg.split(',')[3]" v-lazy="item.commentImg.split(',')[3]" :style="handlePX('width',100)+handlePX('height',100)"/>
                <img v-if="item.commentImg.split(',')[4]" v-lazy="item.commentImg.split(',')[4]" :style="handlePX('width',100)+handlePX('height',100)"/>
              </div>
            </div>
          </div>
          <div v-if="detatil.commentList.length==0" class=" flex  flex-align-center flex-pack-center" style="text-align: center;padding: 15px;min-height: 145px;font-size:16px;color:#666;"><span>暂无用户评价</span></div>
        </div>
        
        <div class="recommend"  style="background-color:#ffffff;margin-top:10px;z-index:2;">
          <van-tabs @click="selecttablist" id="tab1">
            <van-tab v-for="(item,index) in tablist" :title="item" :key="index" >
              <div class="flex" style="overflow: auto;" v-if="index==tabindex">
                <div v-for="(items,index) in tabgoodslist" :key="index" @click="goProductDetail(items.goodsId)" :style="handlePX('padding-bottom',65)+handlePX('padding-top',20)+handlePX('padding-left',30)">
                  <div class="flex flex-pack-center flex-align-center" style="border: 1px #e5e5e5 solid;box-sizing: border-box;overflow:hidden;position:relative;" :style="handlePX('height', 410)+handlePX('width', 345)">
                      <img src="../../assets/image/热.png" v-if="items.hotStatus" style="width:-webkit-fill-available;position: absolute;top: 0;left:0;z-index:2;" :style="handlePX('width', 43)+handlePX('height', 49)"/>
                      <img v-lazy="items.goodsImg.split(',')[0]" style="width:-webkit-fill-available;position: absolute;top: 0;"/>
                      <div class="textLabel" style="position: absolute;bottom: 0;width: 100%;background-color:rgba(207,207,207,0.3);text-align:center;color:#A3A3A3" :style="handlePX('height', 70)+handlePX('line-height', 70)+handlePX('font-size', 28)">{{items.jingle}}</div>
                    </div>
                    <div class="flex flex-pack-center flex-v" style="width:-webkit-fill-available;" :style="handlePX('width', 345)">
                      <div>
                        <img src="../../assets/image/满减.png" :style="handlePX('width',52)+handlePX('height',25)" v-if="items.couponList"/>

                        <img src="../../assets/image/特价.png" :style="handlePX('width',52)+handlePX('height',25)" v-if="items.isBargain"/>
                      </div>
                      <div class="textLabel" :style="handlePX('font-size',28)+handlePX('line-height',40)">{{items.goodsName}}</div>
                      <div style="color:#E05459" :style="handlePX('font-size',30)+handlePX('line-height',40)">
                                    <span v-if="items.goodsType =='RETAIL'">
                                      ￥
                                      </span>
                                      {{items.marketPrice}}<span v-if="items.goodsType =='SCORE'">积分</span>
</div>
                    </div>
                </div>
              </div>
            </van-tab>
          </van-tabs>
        </div>

        <div class="shopDetail">
          <div class="xq_video" v-if="detatil.videoUrl">
            <video id="video" autoplay="autoplay" style="width:100%;height:300px; background-color: #000;" controls="controls" :src="detatil.videoUrl">
                <source type="video/mp4" />
              Your browser does not support the video tag.
              </video>
          </div>

        <!-- <div style="background-color:#ffffff;margin-top:10px;padding:10px 15px;">
          <div style="display:flex;border-bottom:1px solid #ededed;">
            <div style="color:#a3a3a3;" :style="handlePX('width',150)">颜色</div>
            <div style="flex:1;padding-left:10px;">
              <div :style="handlePX('line-height',50)">酒红，白色</div>
            </div>
          </div>
          <div style="display:flex;border-bottom:1px solid #ededed;">
            <div style="color:#a3a3a3;" :style="handlePX('width',150)">主要材质</div>
            <div style="flex:1;padding-left:10px;" >
              <div :style="handlePX('line-height',50)">外枕套：60%聚酯纤维，40%莱赛尔纤维</div>
              <div :style="handlePX('line-height',50)">外枕套：60%聚酯纤维，40%莱赛尔纤维</div>
            </div>
          </div>
          <div style="display:flex;border-bottom:1px solid #ededed;">
            <div style="color:#a3a3a3;" :style="handlePX('width',150)">温馨提示</div>
            <div style="flex:1;padding-left:10px;">
              <div :style="handlePX('line-height',50)">1、双层内外枕套配有拉链可拆洗，可直接打开看到</div>
              <div :style="handlePX('line-height',50)">1、双层内外枕套配有拉链可拆洗，可直接打开看到</div>
              <div :style="handlePX('line-height',50)">外枕套：60%聚酯纤维，40%莱赛尔纤维</div>
            </div>
          </div>
        </div> -->
    

    
      

        <div style="background-color:#ffffff;margin-top:10px;">
                <van-cell >
              <template slot="title">
                <span class="van-cell-text">商品详情</span>
              </template>
         
            </van-cell>
<div style="min-height:100px;">
  
<div v-html="detatil.detail.detail" style="width:100%" ref="detail"></div>

        </div>

        </div>
      </div>
        
<van-goods-action style="z-index:9998;background-color: #ffffff;">
  <van-goods-action-mini-btn icon="chat"  onclick="showMeiQia()" class="flex flex-pack-center flex-align-center flex-v" style="border-top:1px #e5e5e5 solid;padding:0 10px;font-size:22px"/>
  <van-goods-action-mini-btn icon="cart"  @click="onClickMiniBtn_cart" class="flex flex-pack-center flex-align-center flex-v" style="border-top:1px #e5e5e5 solid;padding:0 10px;font-size:22px;"/>
  <van-goods-action-mini-btn icon="like"  @click="onClickMiniBtn_collection" :class="{collection_color:isCollection}" class="flex flex-pack-center flex-align-center flex-v" style="border-top:1px #e5e5e5 solid;font-size:22px;padding:0 10px;"/>
  <van-goods-action-big-btn text="立即购买" @click="changeModel('pay')" class="flex-1"/>
  <van-goods-action-big-btn text="加入购物车" @click="changeModel('cart')" primary class="flex-1" v-if="detatil.goodsType =='RETAIL'"/>
</van-goods-action>
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
          <span style='font-size:18px;color:rgb(229, 28, 35)'>
            <!-- ￥{{skuItem.marketPrice?skuItem.marketPrice:detatil.marketPrice}} -->
            <span v-if="detatil.goodsType =='RETAIL'">￥</span>{{skuItem.marketPrice?skuItem.marketPrice.toFixed(2):detatil.marketPrice.toFixed(2)}}<span v-if="detatil.goodsType =='SCORE'">积分</span>
            </span>
          <span class="labelPrice" v-if="detatil.goodsType =='RETAIL' && skuItem['labelPrice'] &&  skuItem['labelPrice'] !== 0" >￥{{skuItem['labelPrice'].toFixed(2)}}</span>
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
    <van-stepper v-model="num" :style="handlePX('margin-top',20)" />
    </div>
  <div>
      <van-goods-action class="vangoods" style="z-index:1;background-color: #ffffff;">
        <van-goods-action-mini-btn icon="chat" onclick="showMeiQia()" class="flex flex-pack-center flex-align-center flex-v" style="border-top:1px #e5e5e5 solid;font-size:22px;padding:0 10px;"/>
        <van-goods-action-mini-btn icon="cart"  @click="onClickMiniBtn_cart" class="flex flex-pack-center flex-align-center flex-v" style="border-top:1px #e5e5e5 solid;font-size:22px;padding:0 10px;"/>
        <van-goods-action-mini-btn icon="like" @click="onClickMiniBtn_collection" :class="{collection_color:isCollection}" class="flex flex-pack-center flex-align-center flex-v" style="border-top:1px #e5e5e5 solid;font-size:22px;padding:0 10px;"/>
        <van-goods-action-big-btn text="立即购买" @click="addCar()" class="flex-1"/>
        <van-goods-action-big-btn text="加入购物车" @click="addCart()" primary class="flex-1" v-if="detatil.goodsType =='RETAIL'"/>
      </van-goods-action>
    </div>
  </div>
</div>
      </div>

<div style="height:50px;"></div>


  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import mixin from "../../config/mixin";
import comhead from "../../components/Comhead.vue";
import { Toast } from "vant";
import { Action } from "vuex-class";
import scrollwatch from "vue-scrollwatch";

import { Cell, CellGroup, ImagePreview } from "vant";

@Component({
  components: {
    comhead
  },
  mixins: [mixin]
})

//  handleHeight(){
//         return document.getElementsByClassName("bodyItem")[0].offsetWidth + 'px'
//     }
export default class ProductDetail extends Vue {
  @Action("setPrepareId") setPrepareId;
  @Action("setlabelActive") setlabelActive;

  //  spyDomChange(node) {
  //           if (this.activeMenu != node.name)
  //               this.activeMenu = node.name
  //       }
  //       scrollTo(name){
  //           scrollwatch.scrollTo(name)
  //       }

  stars = [
    {
      src: require("../../assets/image/灰色星星.png"),
      active: false
    },
    {
      src: require("../../assets/image/灰色星星.png"),
      active: false
    },
    {
      src: require("../../assets/image/灰色星星.png"),
      active: false
    },
    {
      src: require("../../assets/image/灰色星星.png"),
      active: false
    },
    {
      src: require("../../assets/image/灰色星星.png"),
      active: false
    }
  ];

  tablist = ["大家还看了", "新品推荐"];
  tabgoodslist = [];
  likeList = [];
  newList = [];
  couponList = [];
  couponListOne = [];
  tabindex = 0;
  isCollection = false;

  goodsList = [];
  goodsId = "";
  commentnum = 0;
  praise = "0";
  detatil = {
    commentList: [],
    //    costPrice
    // createTime
    detail: {
      imageList: []
    },
    // favNum
    // favStatus
    // goodsCode
    // goodsId
    goodsImg: "",
    goodsName: "",
    jingle: "",
    labelPrice: 0,
    marketPrice: 0,
    onlineStatus: "",
    // saleNum
    // singleStatus
    sku: [],
    skuKey: [],
    storageNum: 0
    // weight
  };
  num = 1;
  keepModel = false;
  skuattr = [];
  chosenList = [];
  chosensku = [];
  skuItem = {};
  activeMenu = 1;
  onScroll(e) {
    // console.log(this.$refs);
  }

  go_comment() {
    this.$router.push({
      path: "/goodscomment",
      query: {
        goodsId: this.goodsId
      }
    });
  }
  onItemChanged(event, currentItem, lastActiveItem) {
    // your logic
    console.log(event, currentItem, lastActiveItem);
  }
  onClickMiniBtn_service() {
    Toast("跳转到客服");
  }
  onClickMiniBtn_cart() {
    this.$router.push("/cart");
  }
  imagePreview(img) {
    ImagePreview([img], 0);
  }
  onClickMiniBtn_collection() {
    if (this.isCollection == false) {
      Vue.prototype.$reqFormPost(
        "/fav/add",
        {
          userId: this.$store.getters[Vue.prototype.MutationTreeType.TOKEN_INFO]
            .userId,
          token: this.$store.getters[Vue.prototype.MutationTreeType.TOKEN_INFO]
            .token,
          goodsId: this.goodsId
        },
        res => {
          if (res == null) {
            console.log("网络请求错误！");
            return;
          }
          if (res.data.status != 200) {
            console.log(
              "需控制错误码" +
                res.data.status +
                ",错误信息：" +
                res.data.message
            );
            Toast(res.data.message);
            return;
          }
          Toast("已收藏");
          this.collection_query();
        }
      );
    } else if (this.isCollection == true) {
      Vue.prototype.$reqFormPost(
        "/fav/delete",
        {
          userId: this.$store.getters[Vue.prototype.MutationTreeType.TOKEN_INFO]
            .userId,
          token: this.$store.getters[Vue.prototype.MutationTreeType.TOKEN_INFO]
            .token,
          goodsIds: this.goodsId
        },
        res => {
          if (res == null) {
            console.log("网络请求错误！");
            return;
          }
          if (res.data.status != 200) {
            console.log(
              "需控制错误码" +
                res.data.status +
                ",错误信息：" +
                res.data.message
            );
            Toast(res.data.message);
            return;
          }
          Toast("已取消");
          this.collection_query();
        }
      );
    }
  }
  collection_query() {
    Vue.prototype.$reqFormPost(
      "/fav/query",
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
          // Toast(res.data.message);
          return;
        }
        for (let i = 0; i < res.data.data.goodsList.length; i++) {
          if (res.data.data.goodsList[i].goodsId.indexOf(this.goodsId) !== -1) {
            this.isCollection = true;
            return;
          }
        }
        this.isCollection = false;
      }
    );
  }
  addCar() {
    if (
      this.$store.getters[Vue.prototype.MutationTreeType.TOKEN_INFO].userId !=
        "" &&
      this.$store.getters[Vue.prototype.MutationTreeType.TOKEN_INFO].token != ""
    ) {
    } else {
      this.$router.push({ name: "login" });
    }

    if (!this.skuItem["skuId"]) {
      Toast("请选择规格属性");
      return;
    }
    Vue.prototype.$reqFormPost(
      "/prepare/direct",
      {
        userId: this.$store.getters[Vue.prototype.MutationTreeType.TOKEN_INFO]
          .userId,
        token: this.$store.getters[Vue.prototype.MutationTreeType.TOKEN_INFO]
          .token,
        goodsId: this.goodsId,
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
  changeModel(type) {
    if (this.keepModel && type) {
      if (type == "pay") {
        this.addCar();
      }
      if (type == "cart") {
        this.addCart();
      }
    } else {
      this.keepModel = !this.keepModel;
    }
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

    this.detatil.skuKey.forEach((keyItem, keyIndex) => {
      keyItem.valueList.forEach((valueItem, valueIndex) => {
        valueItem.disable = true;
        for (let i = 0; i < this.detatil.sku.length; i++) {
          if (
            this.detatil.sku[i].attrs[keyIndex].valueId != valueItem.skuValueId
          ) {
            continue;
          }
          let tag = true;
          for (let j = 0; j < this.detatil.sku[i].attrs.length; j++) {
            if (keyIndex == j) {
              continue;
            }
            if (
              (this.chosenList[j] || "") != "" &&
              this.chosenList[j] != this.detatil.sku[i].attrs[j].valueId
            ) {
              tag = false;
              break;
            }
          }
          if (tag) {
             if(this.detatil.sku[i].storageNum>0){
            valueItem.disable = false;
            }
            break;
          }
        }
      });
    });
    if (this.chosenList.length === this.detatil.skuKey.length) {
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
        for (let i = 0; i < this.detatil.sku.length; i++) {
          let count = 0;
          for (let j = 0; j < this.chosenList.length; j++) {
            if (this.chosenList[j] === this.detatil.sku[i].attrs[j].valueId) {
              console.log(
                this.chosenList[j] === this.detatil.sku[i].attrs[j].valueId,
                this.detatil.sku[i].attrs[j]
              );
              count += 1;
              if (count === this.chosenList.length) {
                this.skuItem = this.detatil.sku[i];
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

  addCart() {
    if (
      this.$store.getters[Vue.prototype.MutationTreeType.TOKEN_INFO].userId !=
        "" &&
      this.$store.getters[Vue.prototype.MutationTreeType.TOKEN_INFO].token != ""
    ) {
    } else {
      this.$router.push({ name: "login" });
    }
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
        goodsId: this.goodsId,
        skuId: this.skuItem["skuId"],
        num: this.num
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
        this.getCartList();

        Toast("加入成功");
        this.keepModel = false;

        // var div = document.getElementById("cartLen");
        // if (!document.getElementById("cartLen")) {
        //   div = document.createElement("div");
        //   div.setAttribute("id", "cartLen");
        //   div.className = "messageFexid";
        //   div.style.right = "18px";
        //   div.style.top = "11px";
        //   div.style.zIndex = "200";

        //   var diva = document.getElementsByClassName(
        //     "van-goods-action__mini-btn van-hairline"
        //   )[1];

        //   if(diva ){

        //   diva.appendChild(div);

        //   }

        // }

        // if (res.data.data.carts.length > 0) {
        //   div.innerHTML = this.getNumber(res.data.data.carts);
        // } else {
        //   div.style.display = "none";
        // }
      }
    );
  }
  getProductDetail() {
    Vue.prototype.$reqFormPost(
      "/goods/front/detail",
      {
        userId: this.$store.getters[Vue.prototype.MutationTreeType.TOKEN_INFO]
          .userId,
        token: this.$store.getters[Vue.prototype.MutationTreeType.TOKEN_INFO]
          .token,
        goodsId: this.goodsId
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
          // Toast(res.data.message);
          return;
        }
        console.log("res.data", res.data);

        if (
          this.$store.getters[Vue.prototype.MutationTreeType.TOKEN_INFO]
            .userId == "" &&
          this.$store.getters[Vue.prototype.MutationTreeType.TOKEN_INFO]
            .token == ""
        ) {
          this.couponList = res.data.data.couponList;
        }
        if (res.data.data.singleStatus) {
          this.skuItem = res.data.data.sku[0];
        }
        this.detatil = res.data.data;

        if (this.detatil.detail["detail"]) {
          this.detatil.detail["detail"] = this.detatil.detail["detail"].replace(
            `<img`,
            `<img style="width:100%"`
          );
        }

        // 评论数量
        this.commentnum = res.data.data.commentNum;
        // 好评计算
        if (res.data.data.commentList.length > 0) {
          let total = 0;
          for (let i = 0; i < res.data.data.commentList.length; i++) {
            total = res.data.data.commentList[i].star + total;
          }
          total = total / (res.data.data.commentList.length * 5) * 100;
          const praisenum = total.toFixed(0);
          this.praise = praisenum;
        }

        this.tabgoodslist = res.data.data.likeList;
        this.likeList = res.data.data.likeList;
        this.newList = res.data.data.newList;

        this.couponListOne = res.data.data;

        this.detatil.skuKey.forEach((keyItem, keyIndex) => {
          keyItem.valueList.forEach((valueItem, valueIndex) => {
            let opt = { disable: true, chosen: false };
            this.detatil.sku.forEach((skuItem, skuIndex) => {
              if (
                valueItem.skuValueId === skuItem.attrs[keyIndex].valueId &&
                skuItem.storageNum > 0
              ) {
                opt.disable = false;
                return false;
              }
            });
            (<any>Object).assign(valueItem, opt);
          });
        });
      }
    );
  }
  selecttablist(index) {
    this.tabgoodslist = [];
    if (index == 0) {
      this.tabgoodslist = this.likeList;
      this.tabindex = 0;
    }
    if (index == 1) {
      this.tabgoodslist = this.newList;
      this.tabindex = 1;
    }
  }
  goProductDetail(goodsId) {
    this.$router.push({
      path: "/productdetail",
      query: {
        goodsId: goodsId
      }
    });
  }
  go_collar_center() {
    if (
      this.$store.getters[Vue.prototype.MutationTreeType.TOKEN_INFO].userId !=
        "" &&
      this.$store.getters[Vue.prototype.MutationTreeType.TOKEN_INFO].token != ""
    ) {
      this.$router.push({
        path: "/collar_center",
        query: {
          goodsId: this.goodsId
        }
      });
    } else {
      this.$router.push({ name: "login" });
    }
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
  created() {
    if (this.$route.query.availWidth && this.$route.query.availHeight) {
      this.setlabelActive({
        availWidth: this.$route.query.availWidth,
        availHeight: this.$route.query.availHeight
      });
    }
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
        if (res.data.status != 200 && (res.data.message || "") !== "") {
          Toast(res.data.message);
          return;
        }

        var div = document.getElementById("cartLen");

        if (!document.getElementById("cartLen")) {
          div = document.createElement("div");
          div.setAttribute("id", "cartLen");
          div.className = "messageFexid";
          div.style.right = "18px";
          div.style.top = "11px";
          div.style.zIndex = "200";
          this.getDomCenter(div);
        }

        if (res.data.data.carts.length > 0) {
          div.innerHTML = this.getNumber(res.data.data.carts);
          div.style.display = "block";
        } else {
          div.style.display = "none";
        }
      }
    );
  }

  getDomCenter(div) {
    let timer = setInterval(() => {
      if (
        document.getElementsByClassName(
          "van-goods-action__mini-btn van-hairline"
        ).length > 0
      ) {
        let a = document.getElementsByClassName(
          "van-goods-action__mini-btn van-hairline"
        );

        a[1].appendChild(div);
        //    document.getElementsByClassName(
        //   "van-goods-action__mini-btn van-hairline"
        // )[4].appendChild(div);
        clearInterval(timer);
      }
    }, 100);
  }

  getNumber(cartList = []) {
    let num = 0;
    cartList.forEach((item, index) => {
      num += item.num;
    });
    return num.toString();
  }
  returnTop() {
    document.querySelector(".xq_video").scrollIntoView(true);
  }

  getCouponList() {
    Vue.prototype.$reqFormPost(
      "/coupon/goods/list",
      {
        userId: this.$store.getters[Vue.prototype.MutationTreeType.TOKEN_INFO]
          .userId,
        token: this.$store.getters[Vue.prototype.MutationTreeType.TOKEN_INFO]
          .token,
        goodsId: this.goodsId
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

        console.log(res.data);

        this.couponList = res.data.data;
      }
    );
  }

  mounted() {
    this.goodsId = this.$route.query.goodsId;
    this.getProductDetail();
    this.collection_query();

    if (
      this.$store.getters[Vue.prototype.MutationTreeType.TOKEN_INFO].userId !=
        "" &&
      this.$store.getters[Vue.prototype.MutationTreeType.TOKEN_INFO].token != ""
    ) {
      this.getCartList();
      this.getCouponList();
    }
  }
}
</script>
<style>
.coupon .van-cell__title,
.van-cell__value {
  overflow: hidden;
  white-space: nowrap;
}
</style>
<style lang="scss" scoped>
@import "../../style/utils.scss";

.bodyContent {
  display: flex;
}
.bodyItem {
  width: 100%;
}
.goodsTitle {
  background-color: #fff;
  display: flex;
  font-size: 16px;
  padding: 10px;
  .goodstitle {
    flex: 1;
    line-height: 25px;
  }
  .pricebox {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .comment {
    display: flex;
    align-items: flex-end;
    div {
      display: flex;
      flex-direction: column;
      align-items: center;
      span {
        color: #ffc200;
      }
    }
  }
}

.bodyLabel {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
.bg_sku {
  height: -webkit-fill-available;
  width: -webkit-fill-available;
  background-color: rgba(0, 0, 0, 0.498039);
  position: fixed;
  top: 0;
}
.num_box {
  font-size: 16px;
  padding: 20px;
}

.num_small_box {
  border: solid 1px #ddd;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.num_box1 {
  background-color: #ebebe4;
  font-size: 14px;
  border-top: solid 1px #ddd;
  border-bottom: solid 1px #ddd;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.num_small_box_dis {
  background-color: #f8f8f8;
}

.modiaBoxDown2 {
  position: absolute;
  bottom: -100%;
  animation: myfirst0001 0.5s;
}

.collection_color {
  color: red;
}

.vangoods {
  position: inherit;
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

.basisInfo {
  margin: 20px 15px;
  border: 1px solid #e5e5e5;
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
.btm_box {
  font-size: 12px;
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 50px;
  display: flex;
  background-color: #f8f8f8;
}

.leftbox {
  width: 7em;
  background-color: #f5f5f5;
  color: #999;
  border-right: solid 1px #e5e5e5;
  padding: 7px 5px 7px 7px;
}

.rightbox {
  flex: 1;
  display: flex;
  align-items: center;
  padding-left: 2em;
  word-break: break-all;
}
.updateInfo {
  border-top: solid 1px #e5e5e5;
  border-bottom: solid 1px #e5e5e5;

  background-color: #f5f5f5;
  padding: 5px 10px;
  font-size: 14px;
}

.skuKeyBox {
  display: flex;
  flex-wrap: wrap;
}
.dialog {
  position: fixed;
  top: 0;
  height: 100%;
  width: 100%;
  z-index: 9999;
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
  max-width: 200px;
}
.full_bg {
  background: url(../../assets/image/满减背景.png) no-repeat;
  padding: 0 18px;
  background-size: 100% 100%;
  height: 24px;
  line-height: 24px;
  color: #ffc630;
  margin-right: 5px;
  font-size: 10px;
}
</style>
