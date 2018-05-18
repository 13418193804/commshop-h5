<template>
  <div class="tab-contents" >
    <comhead ref="comhead" title="购物车" isRightIcon="true"  rightTitle="删除" @rightClick="deleteshopCart()"></comhead>
<van-checkbox-group v-model="result" @change="checkchange()">

<van-cell-swipe :right-width="130" v-for="(item,index) in cartList" :key="index">
  <van-cell-group>
    
<div class="cartItem">
<van-checkbox   :name="item.id" >
  </van-checkbox>

<img v-lazy="item.goodsImg.split(',')[0]" style="width:90px;height:90px;"/>

<div style="flex:1;padding:0 10px;">
<div>{{item.goodsName}}</div>
<div style="font-size:14px;color:#666">{{item.goodsName}}</div>
                <div style="color:red">￥{{item.price}}</div>
<van-stepper v-model="item.num" @plus="pluscart(item.id,item.num)" @minus="minuscart(item.id,item.num)" style="float: right;"/>
</div>
</div>
    
  </van-cell-group>
  <span slot="right" class="van-cell-swipe__right" @click="deleteCart(index)" >删除</span>
  <div slot="right" @click="collect(index)" class="collect" style="background-color: #f90;width: 100%;
    height: 100%; display: flex;
    align-items: center;
    justify-content: center;">收藏</div>
    <div style="background-color:#f7f7f7;height:10px;"></div>
</van-cell-swipe>

<div :style="maxHeightdiv()" style="width:100%;background-color:#f7f7f7;    display: flex;
    justify-content: center;
    align-items: center;" v-if="!cartList || cartList.length==0">
    <div>
  <img src="../../assets/cart/空购物车拷贝.png" :style="handleImageWidth1()"/>
  <div style="text-align:center;color:#ffc630;font-size:17px;" @click="goindex()">立即逛逛>></div>
  </div>
</div> 
</van-checkbox-group>


<div style="height:99px"></div>

<van-submit-bar  :price="totalPrice()" button-text="结算" @submit="onSubmit" style="margin-bottom:50px;">
  <van-checkbox v-if="cartList.length>0" v-model="checked" @change="allSelect">全选</van-checkbox>
</van-submit-bar>


  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import Swipe from "../../components/Swipe.vue";
import mixin from "../../config/mixin";
import { Action } from "vuex-class";
import comhead from "../../components/Comhead.vue";
import { Toast } from "vant";

@Component({
  components: {
    Swipe,
    comhead
  },
  mixins: [mixin]
})
export default class Cart extends Vue {
  @Action("setPrepareId") setPrepareId;

  @Action("setTabIndex") setTabIndex;
  result = [];
  checked = false;
  cartList = [];
  totalMoney = 0.00; //总金额
  maxHeightdiv(){
    return "height:" +(this.$store.getters[Vue.prototype.MutationTreeType.SYSTEM].availHeight-152 )+"px;"
  }
 handleImageWidth1() {
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
  allSelect() {   
    if (this.checked) {
      let result = [];
      this.cartList.forEach((item, index) => {
        console.log();
        result.push(item.id);
      });
      this.result = result;
    }else{
      this.result=[];
    }
  }
  totalPrice() {
    var totalMoney = 0;
    for (var i = 0; i < this.cartList.length; i++) {
      if (this.result.indexOf(this.cartList[i].id)!== -1) {
        totalMoney = totalMoney+(this.cartList[i].price * this.cartList[i].num);
      } 
    }
    totalMoney=totalMoney*100;
    totalMoney.toString();
   return totalMoney;
  }
  checkchange(){
    if(this.result.length == this.cartList.length){
      this.checked = true;
    }else{
      this.checked = false;
    }
 
  }
  onSubmit() {
    if (this.result.length <= 0) {
      Toast('您还没选择商品');
      return;
    }

    Vue.prototype.$reqFormPost(
      "/prepare/order/add",
      {
        userId: this.$store.getters[Vue.prototype.MutationTreeType.TOKEN_INFO]
          .userId,
        token: this.$store.getters[Vue.prototype.MutationTreeType.TOKEN_INFO]
          .token,
        cartIdList: this.result.join(",")
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
        console.log("预支付订单ID", res.data.prepareId);
      }
    );
  }
  deleteCart(index) {
    Vue.prototype.$reqFormPost(
      "/shop/cart/delete",
      {
        userId: this.$store.getters[Vue.prototype.MutationTreeType.TOKEN_INFO]
          .userId,
        token: this.$store.getters[Vue.prototype.MutationTreeType.TOKEN_INFO]
          .token,
        cartIds: this.cartList[index].id
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
        Toast("已删除");
        this.getCartList();
      }
    );
  }
  deleteshopCart() {
    if (this.result.length <= 0) {
      Toast('您还没选择商品');
      return;
    }
    Vue.prototype.$reqFormPost(
      "/shop/cart/delete",
      {
        userId: this.$store.getters[Vue.prototype.MutationTreeType.TOKEN_INFO]
          .userId,
        token: this.$store.getters[Vue.prototype.MutationTreeType.TOKEN_INFO]
          .token,
        cartIds: this.result.join(",")
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
        Toast("已删除");
        this.getCartList();
      }
    );
  }
  collect(index) {
    Vue.prototype.$reqFormPost(
      "/fav/add",
      {
        userId: this.$store.getters[Vue.prototype.MutationTreeType.TOKEN_INFO]
          .userId,
        token: this.$store.getters[Vue.prototype.MutationTreeType.TOKEN_INFO]
          .token,
        goodsId: this.cartList[index].goodsId
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
        Toast("收藏成功");
        this.deleteCart(index);
      }
    );
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
        console.log("查询购物车", res.data);
        this.cartList = res.data.data.carts;
      }
    );
  }
  pluscart(id,num){
    Vue.prototype.$reqFormPost(
      "/shop/cart/updatenum",
      {
        userId: this.$store.getters[Vue.prototype.MutationTreeType.TOKEN_INFO]
          .userId,
        token: this.$store.getters[Vue.prototype.MutationTreeType.TOKEN_INFO]
          .token,
        cartId:id,  
        num:num,
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
        console.log("加1", res.data);
        this.cartList = res.data.data.carts;
      }
    );
  }
  minuscart(id,num){
    Vue.prototype.$reqFormPost(
      "/shop/cart/updatenum",
      {
        userId: this.$store.getters[Vue.prototype.MutationTreeType.TOKEN_INFO]
          .userId,
        token: this.$store.getters[Vue.prototype.MutationTreeType.TOKEN_INFO]
          .token,
        cartId:id,  
        num:num,
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
        console.log("减1", res.data);
        this.cartList = res.data.data.carts;
      }
    );
  }

  goindex(){
    this.$router.push("/");
  }
  mounted() {
    this.setTabIndex(2);
     if(this.$store.getters[
          Vue.prototype.MutationTreeType.TOKEN_INFO
        ].userId != '' && this.$store.getters[
          Vue.prototype.MutationTreeType.TOKEN_INFO
        ].token!= ''){
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
</style>
<style>
.van-cell-swipe__right {
  color: #fff;
  font-size: 15px;
  width: 65px;
  display: inline-block;
  text-align: center;
  background-color: #f44;
  display: flex;
  align-items: center;
  justify-content: center;
}
.cartItem {
  padding: 10px;
  display: flex;
  align-items: center;
}
.van-checkbox {
  padding: 0 10px;
}
.van-submit-bar__bar{
  border-top:1px solid #e5e5e5; 
  box-sizing: border-box;
  }
  .van-submit-bar__price-text{
    visibility: hidden;
    
  }
 .van-button--danger{
      background-color:#ffc630;
    border: 1px solid #ffc630;
}
.van-checkbox--checked{
      border-color: #f44;
    background-color: #f44;
}
  
</style>
