<template>
  <div class="tab-contents" >
    <comhead ref="comhead" title="购物车"   :rightTitle="isLogin() && cartList.length >0?'删除':false" @rightClick="deleteshopCart()"></comhead>
<van-checkbox-group v-model="result" @change="checkchange()">

<van-cell-swipe :right-width="130" v-for="(item,index) in cartList" :key="index">
  <van-cell-group>
    
<div class="cartItem">
<van-checkbox   :name="item.id" >
  </van-checkbox>

<img v-lazy="item.goodsImg.split(',')[0]" style="width:90px;height:90px;"/>

<div class="flex-1" style="flex:1;padding:0 10px;">
<div>{{item.goodsName}}</div>
<div style="font-size:14px;color:#666">{{item.jingle}}</div>
                <div style="color:red;margin-top">￥{{item.price.toFixed(2)}}</div>
<van-stepper v-model="item.num" @plus="pluscart(item.id,item.num)" @minus="minuscart(item.id,item.num)" style="float: right;"/>
</div>
</div>
    
  </van-cell-group>
  <span slot="right" class="van-cell-swipe__right" @click="deleteCart(index)" >删除</span>
  <div class="collect flex flex-pack-center flex-align-center" slot="right" @click="collect(index)" style="background-color: #f90;width: 100%;
    height: 100%;">移至收藏夹</div>
    <div style="background-color:#f7f7f7;height:10px;"></div>
</van-cell-swipe>

<div class="flex flex-pack-center flex-align-center" :style="maxHeightdiv()" style="width:100%;background-color:#f7f7f7;" v-if="!cartList || cartList.length==0">
    <div>
      <div v-if="$store.getters[MutationTreeType.TOKEN_INFO] && $store.getters[MutationTreeType.TOKEN_INFO].userId !=='' && $store.getters[MutationTreeType.TOKEN_INFO].token !==''">
  <img src="../../assets/cart/空购物车拷贝.png"  :style="handleImageWidth1()"/>
  <div style="font-size:14px;color:#666;">您购物车内还没有商品</div>
  <div style="text-align:center;color:#ffc630;font-size:17px;margin-top:10px;" @click="goindex()">立即逛逛>></div>
  </div>
<div v-else>
  <div style="margin:10px; color:#666">您还未登录</div>
  <div  style="text-align:center;color:#ffc630;font-size:17px;" @click="$router.push({name:'login'})">登录</div>
</div>

  </div>
</div> 
</van-checkbox-group>

<div style="height:50px; " :style="isLogin() &&  cartList.length >0?'':'background-color:#f7f7f7'"></div>

<div style="height:49px;"></div>
<van-submit-bar v-if="isLogin() &&  cartList.length >0"  :price="totalPrice()" button-text="结算" @submit="onSubmit" style="margin-bottom:50px;">
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
import { Toast,Dialog } from "vant";

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
  totalMoney = 0.0; //总金额
  maxHeightdiv() {
    return (
      "height:" +
      (this.$store.getters[Vue.prototype.MutationTreeType.SYSTEM].availHeight -
        152) +
      "px;"
    );
  }
  handleImageWidth1() {
    return (
      "width:" +
      this.$store.getters[Vue.prototype.MutationTreeType.SYSTEM].availWidth *
        0.35+
      "px;height:" +
      this.$store.getters[Vue.prototype.MutationTreeType.SYSTEM].availWidth *
        0.35 +
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
    } else if (this.cartList.length == this.result.length) {
      this.result = [];
    }
  }
  totalPrice() {
    var totalMoney = 0;
    for (var i = 0; i < this.cartList.length; i++) {
      if (this.result.indexOf(this.cartList[i].id) !== -1) {
        totalMoney = totalMoney + this.cartList[i].price * this.cartList[i].num;
      }
    }
    totalMoney = totalMoney * 100;
    totalMoney.toString();
    return totalMoney;
  }
  checkchange() {
    if (this.result.length == this.cartList.length) {
      this.checked = true;
    } else {
      this.checked = false;
    }
  }
  onSubmit() {
    if (this.result.length <= 0) {
      Toast("您还没选择商品");
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
  deleteCart(index, collect) {
      Dialog.confirm({
      title: "提示",
      message: "你确定将这些商品从购物车中移除吗?"
    })
      .then(() => {
      
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
        if (!collect) {
          Toast("已删除");
        }
        this.getCartList();
      }
    );

     })
      .catch(() => {
        // on cancel
      });



   
  }
  deleteshopCart() {
    if (this.result.length <= 0) {
      Toast("您还没选择商品");
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
        this.deleteCart(index, true);
        Toast("已移至收藏夹");
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
          div.innerHTML = this.getNumber(this.cartList);
        } else {
          div.style.display = "none";
        }
      }
    );
  }
  pluscart(id, num) {
    Vue.prototype.$reqFormPost(
      "/shop/cart/updatenum",
      {
        userId: this.$store.getters[Vue.prototype.MutationTreeType.TOKEN_INFO]
          .userId,
        token: this.$store.getters[Vue.prototype.MutationTreeType.TOKEN_INFO]
          .token,
        cartId: id,
        num: num
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
        this.getCartList();
      }
    );
  }
  isLogin() {
    return (
      this.$store.getters[Vue.prototype.MutationTreeType.TOKEN_INFO] &&
      this.$store.getters[Vue.prototype.MutationTreeType.TOKEN_INFO].userId !==
        "" &&
      this.$store.getters[Vue.prototype.MutationTreeType.TOKEN_INFO].token !==
        ""
    );
  }
  minuscart(id, num) {
    Vue.prototype.$reqFormPost(
      "/shop/cart/updatenum",
      {
        userId: this.$store.getters[Vue.prototype.MutationTreeType.TOKEN_INFO]
          .userId,
        token: this.$store.getters[Vue.prototype.MutationTreeType.TOKEN_INFO]
          .token,
        cartId: id,
        num: num
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
        this.getCartList();
      }
    );
  }

  goindex() {
    this.$router.push("/");
  }
  getNumber(cartList = []) {
    let num = 0;
    cartList.forEach((item, index) => {
      num += item.num;
    });
    return num.toString();
  }
  mounted() {
    this.setTabIndex(2);

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
.van-submit-bar__bar {
  border-top: 1px solid #e5e5e5;
  box-sizing: border-box;
}

.van-button--danger {
  background-color: #ffc630;
  border: 1px solid #ffc630;
}
.van-checkbox--checked {
  border-color: #f44;
  background-color: #f44;
}
</style>
