<template>
  <div class="tab-contents">
      <div class="user-background">
          <div class="user-tool">
             <div style="padding: 10px;">
                  <i class="iconfont icon-setting1" style="font-size:25px;" @click="go_setting()"></i>
             </div>
   <div style="line-height:47px;">

     <span style="padding: 10px;    position: relative;" @click="goMessageList()">

<i class="iconfont icon-icon-p_xinfeng" style="font-size:25px;"></i>
      <div v-if="messageCount && messageCount!=0" class="messageFexid" style="right: 25px;top: 5px;">{{messageCount}}</div>
     </span>
               <span style="padding: 10px;" @click="goshare()">
                  <i class="iconfont icon-erweima" style="font-size:25px;"></i>
     </span>    
             </div>
          </div>

            

<div style="font-size:16px;margin:5px 0;    text-align: center;" @click="go_essential()">
    <img v-if="userIcon" v-lazy="userIcon" style="width:80px;height:80px;border-radius: 80px;"/>
     <img v-else src="../../assets/image/userIcon.png" style="width:80px;height:80px;border-radius: 80px;"/>
    
    <div style="max-width:250px
    margin: 0 auto;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;" v-if="user.loginName||user.nickName">
      {{user.nickName?user.nickName:user.loginName}}
      </div>
       <div  v-else> 
          <p style="text-align: center;margin-top: 2px;">登录/注册</p>
    </div>
</div>
      </div>


<div style="height:10px;background-color:#f7f7f7;"></div>
<div class="orderTitle" @click="getOrderList('')">
<span>我的订单</span>   
    <i class="iconfont icon-youjiantou" style="font-size:20px;"></i>
</div>

<div class="order-content" >
<div style="text-align:center;padding:10px 0;width:20%;position: relative;" v-for="(n,index) in orderList" :key="index" @click="getOrderList(n.status)">
    <div style="position: relative;">
      <div>
        <img src="../../assets/image/未付款.png" alt="" class="orderIcon" v-if="index == 0">
        <img src="../../assets/image/未发货.png" alt="" class="orderIcon" v-if="index == 1">
        <img src="../../assets/image/待收货.png" alt="" class="orderIcon" v-if="index == 2">
        <img src="../../assets/image/待评价.png" alt="" class="orderIcon" v-if="index ==3">
        <img src="../../assets/image/退换售后.png" alt="" class="orderIcon" v-if="index == 4">
        </div>
      <div>{{n.name}}</div>
      <div v-if="index == 0&&user.waitPayCount!==0&&user.waitPayCount" class="messageFexid">{{user.waitPayCount}}</div>
      <div v-if="index == 1&&user.waitSendCount!==0&&user.waitSendCount" class="messageFexid">{{user.waitSendCount}}</div>
      <div v-if="index == 2&&user.waitRecvgCount!==0&&user.waitRecvgCount" class="messageFexid">{{user.waitRecvgCount}}</div>
      <div v-if="index == 3&&user.waitReviewCount!==0&&user.waitReviewCount" class="messageFexid">{{user.waitReviewCount}}</div>
      <div v-if="index == 4&&user.waitRefundCount!==0&&user.waitRefundCount" class="messageFexid">{{user.waitRefundCount}}</div>
    </div>
</div>


</div>

<div style="background-color:#f7f7f7;height:10px;"></div>


<div class="orderTitle">
<span>个人中心</span>   
</div>



<div class="order-content" style="border-bottom:solid 1px #e5e5e5;">
<div style="text-align:center;padding:10px;width:25%;" v-for="(n,index) in toolsList" :key="index" @click="tools(n)">
    <div>
    <img src="../../assets/image/我的收藏.png" alt="" class="moreIcon" v-if="index == 0">
      <img src="../../assets/image/地址管理.png" alt="" class="moreIcon" v-if="index == 1">
      <img src="../../assets/image/优惠卷.png" alt="" class="moreIcon" v-if="index == 2">
      <img src="../../assets/image/我的成员.png" alt="" class="moreIcon" v-if="index ==3">
      </div>
    <div>{{n.name}}</div>
</div>
</div>


<div class="order-content" style="border-bottom:solid 1px #e5e5e5;">

<div style="text-align:center;padding:10px;width:25%;" @click="myreward()">
    <div>
      <img src="../../assets/image/我的奖励.png" alt="" class="moreIcon" >
</div>
    <div>我的积分</div>
</div>


<!-- <div style="text-align:center;padding:10px;width:25%;" @click="mybankcard()">
    <div>
      <img src="../../assets/image/我的银行卡.png" alt="" class="moreIcon" >
</div>
    <div>我的银行卡</div>
</div> -->


<div style="text-align:center;padding:10px;width:25%;" onclick="showMeiQia()">
    <div>
      <img src="../../assets/image/联系客服.png" alt="" class="moreIcon" >
</div>
    <div>联系客服</div>
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
export default class User extends Vue {
  @Action("setTabIndex") setTabIndex;
  // ORDER_WAIT_PAY
  // ORDER_CANCEL_PAY
  // ORDER_WAIT_SENDGOODS
  // ORDER_WAIT_RECVGOODS
  // ORDER_WAIT_REVIEW
  // ORDER_END_GOODS
  // ORDER_FINISH
  userIcon = "";
  user = {};
  orderList = [
    {
      name: "待付款",
      url: "",
      status: "ORDER_WAIT_PAY"
    },
    {
      name: "待发货",
      url: "",
      status: "ORDER_WAIT_SENDGOODS"
    },
    {
      name: "待收货",
      url: "",
      status: "ORDER_WAIT_RECVGOODS"
    },
    {
      name: "待评价",
      url: "",
      status: "ORDER_WAIT_REVIEW"
    },
    {
      name: "退换/售后",
      url: "",
      status: "REFUND"
    }
  ];
  toolsList = [
    {
      name: "我的收藏",
      url: ""
    },
    {
      name: "地址管理",
      url: ""
    },
    {
      name: "优惠券",
      url: ""
    },
    {
      name: "我的成员",
      url: ""
    }
  ];
  goMessageList() {
    Vue.prototype.$confirmLogin("/messagelist");
  }
  goshare() {
    Vue.prototype.$confirmLogin("/share_code");
  }
  getOrderList(status) {
    Vue.prototype.$confirmLogin({
      name: "orderlist",
      query: {
        orderStatus: status
      }
    });
  }
  messageCount = 0;
  getMessageCount() {
    Vue.prototype.$reqFormPost(
      "/message/unread/count",
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
        this.messageCount = res.data.data.count;
        console.log("消息条数", res.data.data);
      }
    );
  }
  queryuserinfo() {
    Vue.prototype.$reqFormPost(
      "/user/query",
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
        this.user = res.data.data;
        this.userIcon = res.data.data.userIcon;
        // localStorage.userIcon = res.data.data.userIcon
        //   ? res.data.data.userIcon
        //   : "";

        console.log("userIcon", res.data.data.userIcon);
      }
    );
  }

  tools(n) {
    if (n.name == "我的收藏") {
      Vue.prototype.$confirmLogin({ name: "collection" });
    }
    if (n.name == "地址管理") {
      Vue.prototype.$confirmLogin({ name: "addresslist" });
    }
    if (n.name == "优惠券") {
      Vue.prototype.$confirmLogin({ name: "coupon" });
    }
    if (n.name == "我的成员") {
      Vue.prototype.$confirmLogin({ name: "my_member" });
    }
  }

  go_setting() {
    Vue.prototype.$confirmLogin("/setting");
  }
  go_essential() {
    Vue.prototype.$confirmLogin("/essential_information");
  }
  mybankcard() {
    Vue.prototype.$confirmLogin("/my_bankcard");
  }
  myreward() {
    Vue.prototype.$confirmLogin("/my_reward");
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
        if (res.data.status != 200 && (res.data.message ||'') !=='') {
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
    this.setTabIndex(3);
    if (
      this.$store.getters[Vue.prototype.MutationTreeType.TOKEN_INFO].userId !=
        "" &&
      this.$store.getters[Vue.prototype.MutationTreeType.TOKEN_INFO].token != ""
    ) {
      this.getMessageCount();
      this.queryuserinfo();
      this.getCartList();
    }
    console.log("个人中心加载");
  }
}
</script>

<style lang="scss" scoped>
@import "../../style/utils.scss";
.user-background {
  background-image: url("../../assets/image/顶部底图.png");
  background-size: 100% 101%;
  width: 100%;
  height: 30vh;
  background-color: #eee;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}
.user-tool {
  display: flex;
  justify-content: space-between;

  position: absolute;
  top: 0;
  width: -webkit-fill-available;
}
.orderTitle {
  margin-left: 10px;

  display: flex;
  border-bottom: solid 1px #e5e5e5;
  align-items: center;
  height: 40px;
  line-height: 40px;
  justify-content: space-between;
  padding: 10px 10px 10px 0;
  font-size: 14px;
}
.order-content {
  margin-left: 10px;
  display: flex;
  justify-content: flex-start;
  font-size: 14px;
}
.orderIcon {
  width: 30px;
  height: 30px;
}
.moreIcon {
  width: 25px;
  height: 25px;
}
</style>
