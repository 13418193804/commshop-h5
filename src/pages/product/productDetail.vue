<template>
  <div class="tab-contents" style=" width: 100%;
    background-color: #e4e4e4;
    overflow: auto;
    height: 100vh;">
    <comhead ref="comhead" isLeftIcon="icon-zuo" leftIconName="angle-left" @leftClick="false"   :contextIndex="true" isRightIcon="true"  ></comhead>

        <van-swipe :autoplay="3000">
          <van-swipe-item v-for="(image, index) in detatil['goodsImg'].split(',')"  :key="index" >
            <img v-lazy="image" style="width:100%;" />
          </van-swipe-item>
        </van-swipe>
        
        <div class="goodsTitle">
            <div class="goodstitle">
                <div>{{detatil.goodsName}}</div>
                <div style="font-size:14px;color:#666">{{detatil.jingle}}</div>
                <div >
                  <span class="marketPrice">  ￥{{detatil.marketPrice}}</span>
<span class="labelPrice" style="margin:0 10px;font-size:14px;">原价:{{detatil.labelPrice}}</span>
                </div>
            </div>
            <div class="comment">
              <div>用户评价</div>
              <div>
                <img v-lazy="'1'" :style="handlePX('width',28)+handlePX('height',24)"/>
                <span>999</span>
              </div>
              
            </div>
        </div>
  
        <div class="functionList" style="margin-top:10px;">
          <van-cell-group>
            <van-cell title="请选择规格数量" is-link />
            <van-cell title="限制：特价商品不可与优惠卷叠加使用"/>
            <van-cell is-link>
              <template slot="title">
                <span class="van-cell-text">领卷：</span>
                <img v-lazy="'1'" :style="handlePX('width',112)+handlePX('height',26)"/>
              </template>
            </van-cell>
            <van-cell>
              <template slot="title">
                <span class="van-cell-text">备注：</span>
                <span style="color:#ff6d72;">【新货促销，1周内发货】</span>
              </template>
            </van-cell>
            <van-cell>
              <template slot="title">
                <span class="van-cell-text">服务：</span>
                <span>7天无忧退换货</span>
                <span>24小时快速退款</span>
                <span>中宜自营严选</span>
              </template>
            </van-cell>          
          </van-cell-group>
        </div>

        <div class="userCommentList" id="detail" style="background-color:#ffffff;margin-top:10px;">
          <van-cell-group>
            <van-cell title="用户评价" is-link value="99%好评" @click="go_comment()"/>
          </van-cell-group>
          <div  v-for="(item,index) in detatil.commentList" :key="index">
            <div class="userComment" style="padding:10px 15px;">
              <div>
                <img src="../../assets/image/头像.png" :style="handlePX('width',45)+handlePX('height',45)" style="vertical-align:middle;border-radius:50%;"/>
                <span>{{item.user.nickName}}</span>
                <img v-lazy="'1'" :style="handlePX('width',140)+handlePX('height',25)" style="vertical-align:middle;"/>
              </div>
              <div style="color:#999999;">{{item.createTime}}</div>
              <div>{{item.commentContent}}</div>
              <div v-if="item.commentImg" v-for="(itemimg,imgindex) in item.commentImg" :key="imgindex">
                <img v-lazy="'1'" :style="handlePX('width',100)+handlePX('height',100)"/>
              </div>
            </div>
          </div>
        </div>

        <div class="recommend"  style="background-color:#ffffff;margin-top:10px;z-index:2;">
          <van-tabs @click="selecttablist">
            <van-tab v-for="(item,index) in tablist" :title="item" :key="index" >
              <div style="display:flex;overflow: auto;" v-if="index==tabindex">
                <div v-for="(items,index) in tabgoodslist" :key="index" @click="goProductDetail(item.goodsId)" :style="handlePX('padding-bottom',65)+handlePX('padding-top',20)+handlePX('padding-left',30)">
                  <div style="border: 1px #e5e5e5 solid;box-sizing: border-box;display:flex;align-items: center;justify-content:center;overflow:hidden;position:relative;" :style="handlePX('height', 410)+handlePX('width', 345)">
                      <img src="../../assets/image/热.png" style="width:-webkit-fill-available;position: absolute;top: 0;left:0;z-index:2;" :style="handlePX('width', 43)+handlePX('height', 49)"/>
                      <img v-lazy="items.goodsImg.split(',')[0]" style="width:-webkit-fill-available;position: absolute;top: 0;"/>
                      <div class="textLabel" style="position: absolute;bottom: 0;width: 100%;background-color:rgba(207,207,207,0.3);text-align:center;color:#A3A3A3" :style="handlePX('height', 70)+handlePX('line-height', 70)+handlePX('font-size', 28)">{{items.jingle}}</div>
                    </div>
                    <div style="display:flex;justify-content: center;flex-direction: column;width:-webkit-fill-available;" :style="handlePX('width', 345)">
                      <div>
                        <img src="../../assets/image/满减.png" :style="handlePX('width',52)+handlePX('height',25)"/>
                        <img src="../../assets/image/特价.png" :style="handlePX('width',52)+handlePX('height',25)"/>
                      </div>
                      <div class="textLabel" :style="handlePX('font-size',28)+handlePX('line-height',40)">{{items.goodsName}}</div>
                      <div style="color:#E05459" :style="handlePX('font-size',30)+handlePX('line-height',40)">￥{{items.labelPrice}}</div>
                    </div>
                </div>
              </div>
            </van-tab>
          </van-tabs>
        </div>

        <div style="background-color:#ffffff;margin-top:10px;padding:10px 15px;">
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
        </div>

        <div style="background-color:#ffffff;margin-top:10px;">
          <div v-for="(item,index) in detatil.detail.imageList" :key="index">
            <img v-lazy="item" style="width:100%;"/>
          </div>
        </div>


<van-goods-action style="z-index:90;background-color: #ffffff;">
  <van-goods-action-mini-btn icon="chat" text="客服" @click="onClickMiniBtn_service" style="display:flex;flex-direction:column;justify-content:center;align-items:center;padding:0 10px;"/>
  <van-goods-action-mini-btn icon="cart" text="购物车" @click="onClickMiniBtn_cart" style="display:flex;flex-direction:column;justify-content:center;align-items:center;padding:0 10px;"/>
  <van-goods-action-mini-btn icon="like" text="收藏" @click="onClickMiniBtn_collection" :class="{collection_color:isCollection}" style="display:flex;flex-direction:column;justify-content:center;align-items:center;padding:0 10px;"/>
  <van-goods-action-big-btn text="立即购买" @click="changeModel('pay')" style="flex:1;"/>
  <van-goods-action-big-btn text="加入购物车" @click="changeModel('cart')" primary style="flex:1;"/>
</van-goods-action>






<div :class="keepModel ?'bg_shop1' :'bg_shop_none1'" style='background-color: rgba(0, 0, 0, 0.498039);height: 100%;width: 100%;' @click='changeModel()'>
 
 <div style="position: relative;width:100%;height:100%;">

        <div  style=' background-color:#fff;width:100%;' :class="keepModel ?'modiaBoxUp2' :'modiaBoxDown2'" @click.stop="()=>{return }">
 <div style='border-bottom:1px solid #e5e5e5;display:flex;margin-left:15px;justify-content: space-between'>
      <div style='padding:6px;margin-top:-35px;border-radius:5px;background-color:#fff;border:1px solid #e5e5e5;margin-bottom:20px;display:flex;'>
        <img v-lazy="skuItem.skuImgUrl?skuItem.skuImgUrl :detatil['goodsImg'].split(',')[0]" style="width:80px;height:80px;"/>
      </div>
      <div style='font-size:13px;flex:1;'>
        <div style="font-size:16px;">{{detatil['goodsName']}}</div>
        <div  style="color:#666">{{detatil['jingle']}}</div>
        <div style='margin:10px  ;height:40px;overflow: hidden;font-size:14px;'>单价:
          <span style='font-size:18px;color:rgb(229, 28, 35)'>￥{{skuItem.marketPrice?skuItem.marketPrice:detatil.marketPrice}}</span>
        </div>
 
      </div>
      <div style='padding:10px;'>
        <!-- <img src='../../image/tl-3@2x.png' style='width:20px;height:20px'  @click.stop='changeModel()'/> -->
      </div>
    </div>



    <div style='font-size:14px;max-height:300px;overflow:auto;'>
      <div v-for='(item,indextop) in detatil.skuKey' :key="indextop">
      <div style='padding:5px 20px 0;'>{{item.skuKeyIdName}}</div>
      <div class='skuKeyBox'>
      <div v-for="(items,index) in  item.valueList" :key="index">
        <div  :class="chosenList[indextop] === items ?'sku_box_select':'sku_box' " 
        :style="items.disable?'color:#ccc;':''+ chosenList[indextop] === items.skuValueId?'background-color:#E41C24;color:#fff':'' " @click.stop='selectSku(indextop,items)'  >{{items.skuValueName}}</div>
      </div>
      </div>
     
      </div>
    </div>


    <div class='num_box'>
      <div style='display:flex;align-items:center'>数量：</div>

    <van-stepper v-model="num" style="    float: right;"/>
    </div>
  <div>
      <van-goods-action class="vangoods" style="z-index:90;background-color: #ffffff;">
        <van-goods-action-mini-btn icon="chat" text="客服" @click="onClickMiniBtn_service" style="display:flex;flex-direction:column;justify-content:center;align-items:center;padding:0 10px;"/>
        <van-goods-action-mini-btn icon="cart" text="购物车" @click="onClickMiniBtn_cart" style="display:flex;flex-direction:column;justify-content:center;align-items:center;padding:0 10px;"/>
        <van-goods-action-mini-btn icon="like" text="收藏" @click="onClickMiniBtn_collection" :class="{collection_color:isCollection}" style="display:flex;flex-direction:column;justify-content:center;align-items:center;padding:0 10px;"/>
        <van-goods-action-big-btn text="立即购买" @click="addCar()" style="flex:1;"/>
        <van-goods-action-big-btn text="加入购物车" @click="addCar()" primary style="flex:1;"/>
      </van-goods-action>
    </div>
      </div>
</div>
      </div>
<div style="    display: flex;
    flex-wrap: wrap;">
<div v-for="(item,index) in detatil.imageList" :key="index" style="line-height: 0;">
<img  v-lazy="item"  style="width:100%;"/>
</div>
</div>
<div style="height:50px;"></div>


  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import Swipe from "../../components/Swipe.vue";
import mixin from "../../config/mixin";
import comhead from "../../components/Comhead.vue";
import { Toast } from "vant";
import { Action } from "vuex-class";
import { Cell, CellGroup } from 'vant';

@Component({
  components: {
    Swipe,
    comhead
  },
  mixins: [mixin]
})

//  handleHeight(){
//         return document.getElementsByClassName("bodyItem")[0].offsetWidth + 'px'
//     }
export default class ProductDetail extends Vue {
  @Action("setPrepareId") setPrepareId;
  
  tablist=['大家还看了','新品推荐'];
  tabgoodslist=[];
  likeList=[];
  newList=[];
  tabindex=0;
  isCollection=false;

  goodsList = [];
  goodsId = "";
  detatil = {
    commentList:[],
    //    costPrice
    // createTime
    detail:{
      imageList:[],
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
  pageType: string = "add";
  num = 1;
  keepModel = false;
  skuattr = [];
  chosenList = [];
  skuItem = {};
  go_comment(){
    this.$router.push({
      path: "/goodscomment",
      query: {
        goodsId: this.goodsId
      }
    });
  }
  onClickMiniBtn_service() {
    Toast('跳转到客服');
  }
  onClickMiniBtn_cart(){
    this.$router.push("/cart");
  }
  onClickMiniBtn_collection(){
    if(this.isCollection==false){
      Vue.prototype.$reqFormPost(
      "/fav/add",
      {
        userId: this.$store.getters[Vue.prototype.MutationTreeType.TOKEN_INFO]
          .userId,
        token: this.$store.getters[Vue.prototype.MutationTreeType.TOKEN_INFO]
          .token,
        goodsId: this.goodsId,
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
        Toast('已收藏');
        this.collection_query();
        }
      );  
    }else if(this.isCollection==true){
      Vue.prototype.$reqFormPost(
      "/fav/delete",
      {
        userId: this.$store.getters[Vue.prototype.MutationTreeType.TOKEN_INFO]
          .userId,
        token: this.$store.getters[Vue.prototype.MutationTreeType.TOKEN_INFO]
          .token,
        goodsIds: this.goodsId,
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
        Toast('已取消');
        this.collection_query();
        }
      );  
    }
  }
  collection_query(){
    Vue.prototype.$reqFormPost(
      "/fav/query",
      {
        userId: this.$store.getters[Vue.prototype.MutationTreeType.TOKEN_INFO]
          .userId,
        token: this.$store.getters[Vue.prototype.MutationTreeType.TOKEN_INFO]
          .token,
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
        for (let i = 0; i < res.data.data.goodsList.length; i++) {
          if(res.data.data.goodsList[i].goodsId.indexOf(this.goodsId)!== '-1'){
            this.isCollection=true;
            return;
          }
        }
            this.isCollection=false;        
        }
      );
  }
  addCar() {
    if (!this.skuItem["skuId"]) {
      Toast('请选择规格属性');
      return;
    }
    if (this.pageType === "pay") {
      Vue.prototype.$reqFormPost(
        "/prepare/order/direct",
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
              "需控制错误码" +
                res.data.status +
                ",错误信息：" +
                res.data.message
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
    }else{
      this.addCart()
    }
    console.log(this.pageType);
    // console.log(this.skuItem.skuId);
  }
  changeModel(type) {
    type ? (this.pageType = type) : "";
    this.keepModel = !this.keepModel;
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
    } else {
      this.chosenList[indextop] = main.skuValueId;
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
            valueItem.disable = false;
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
  }
 
  addCart() {
    Vue.prototype.$reqFormPost(
      "/shop/cart/add",
      {
        userId: this.$store.getters[Vue.prototype.MutationTreeType.TOKEN_INFO]
          .userId,
        token: this.$store.getters[Vue.prototype.MutationTreeType.TOKEN_INFO]
          .token,
        goodsId: this.goodsId,
        skuId: this.skuItem['skuId']
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
        Toast('加入成功')
        this.keepModel=false;
        console.log("加入购物车", res.data);
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
          return;
        }
        console.log('res.data',res.data)
        if (res.data.data.singleStatus) {
          this.skuItem = res.data.data.sku[0];
        }
        this.detatil = res.data.data;

        this.tabgoodslist = res.data.data.likeList;
        this.likeList = res.data.data.likeList;
        this.newList = res.data.data.newList;

        this.detatil.skuKey.forEach((keyItem, keyIndex) => {
          keyItem.valueList.forEach((valueItem, valueIndex) => {
            let opt = { disable: true, chosen: false };
            this.detatil.sku.forEach((skuItem, skuIndex) => {
              if (valueItem.skuValueId === skuItem.attrs[keyIndex].valueId) {
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
  selecttablist(index){
    this.tabgoodslist=[];
    if(index==0){
      this.tabgoodslist=this.likeList;
      this.tabindex=0
    }
    if(index==1){
      this.tabgoodslist=this.newList;
      this.tabindex=1
    }
  }
  goProductDetail(goodsId){
    this.$router.push({
      path: "/productdetail",
      query: {
        goodsId: goodsId
      }
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
  mounted() {
    console.log(this.$store.getters[Vue.prototype.MutationTreeType.TOKEN_INFO]);
    this.goodsId = this.$route.query.goodsId;
    this.getProductDetail();
    console.log("----------------------");
    this.collection_query();
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
.goodsTitle {
  background-color: #fff;
  display: flex;
  font-size: 16px;
  padding: 10px;
  .goodstitle {
    flex: 1;
    line-height: 25px;
  }
  .comment{
    display: flex;
    align-items: flex-end;
    div{
      display: flex;
      flex-direction: column;
      align-items: center;
      span{
        color:#ffc200;
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
  display: flex;
  justify-content: space-between;
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

.collection_color{
  color:red;
}

.vangoods{
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

.sku_box {
  margin: 10px 15px;
  padding: 3px 10px;
  border-radius: 5px;
  background-color: #e5e4e4;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 100px;
}

.num_box {
  font-size: 16px;
  display: flex;
  justify-content: space-between;
  padding: 20px;
}
</style>

