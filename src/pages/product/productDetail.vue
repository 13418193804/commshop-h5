<template>
  <div class="tab-contents" style=" width: 100%;
    background-color: #e4e4e4;
    overflow: auto;
    height: 100vh;">
    <comhead ref="comhead" isLeftIcon="icon-zuo" leftIconName="angle-left" @leftClick="false"  title="商品详情" isRightIcon="true"  ></comhead>

        <van-swipe :autoplay="3000">
  <van-swipe-item v-for="(image, index) in detatil['goodsImg'].split(',')" :key="index" style="height:300px;    display: flex;align-items: center;justify-content: center;">
    <img v-lazy="image" />
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
            </div>
        </div>
  
<van-goods-action>
  <van-goods-action-mini-btn icon="chat" text="客服" @click="onClickMiniBtn" />
  <van-goods-action-mini-btn icon="cart" text="购物车" @click="onClickMiniBtn" />
  <van-goods-action-big-btn text="加入购物车" @click="changeModel('cart')" />
  <van-goods-action-big-btn text="立即购买" @click="changeModel('pay')" primary />
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
      <div v-for='(item,indextop) in detatil.skuKey' >
      <div style='padding:5px 20px 0;'>{{item.skuKeyIdName}}</div>
      <div class='skuKeyBox'>
      <div v-for="(items,index) in  item.valueList" >
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

  <div style='display:flex;justify-content: center;align-items: center;width:100%;color:#fff;background-color:rgb(229, 28, 35);' @click='addCar'>
      <div style='margin:10px'>确定</div>
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
import comhead from "../../components/Comhead.vue";
import { Toast } from "vant";
import { Action } from "vuex-class";

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
  
  goodsList = [];
  goodsId = "";
  detatil = {
    //    costPrice
    // createTime
    // detail
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
  onClickMiniBtn() {}
  onClickBigBtn() {}
  addCar() {
    if (!this.skuItem["skuId"]) {
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
    console.log(this.skuItem);
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
        skuId: this.detatil.sku[0].skuId
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

        if (res.data.data.singleStatus) {
          this.skuItem = res.data.data.sku[0];
        }
        this.detatil = res.data.data;

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

  mounted() {
    console.log(this.$store.getters[Vue.prototype.MutationTreeType.TOKEN_INFO]);
    this.goodsId = this.$route.query.goodsId;
    this.getProductDetail();
    console.log("----------------------");
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
}
.goodstitle {
  padding: 10px;
  flex: 1;

  line-height: 25px;
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

