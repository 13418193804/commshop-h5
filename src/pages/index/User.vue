<template>
  <div class="tab-contents">
      <div class="user-background">
          <div class="user-tool">
             <div style="padding: 10px;">
                  <i class="iconfont icon-setting1" style="font-size:25px;" @click="go_setting()"></i>
             </div>
   <div style="line-height:47px;">
     <span style="padding: 10px;">
<i class="iconfont icon-icon-p_xinfeng" style="font-size:25px;"></i>
     </span>
               <span style="padding: 10px;">
                  <i class="iconfont icon-erweima" style="font-size:25px;"></i>
     </span>    
             </div>
          </div>

            

<div style="font-size:16px;" @click="go_essential()">
    <img v-if="userIcon" v-lazy="userIcon" style="width:100px;height:100px;border-radius: 100px;"/>
    <img v-else src="../../assets/image/头像.png" style="width:100px;height:100px;border-radius: 100px;"/>
    <div>普通用户名称</div>
</div>
      </div>


<div style="height:10px;background-color:#f7f7f7;"></div>
<div class="orderTitle" @click="getOrderList('')">
<span>我的订单</span>   
    <i class="iconfont icon-youjiantou" style="font-size:20px;"></i>
</div>

<div class="order-content" >
<div style="text-align:center;padding:10px 0;width:20%;" v-for="(n,index) in orderList" :key="index" @click="getOrderList(n.status)">
    <div>
      <img src="../../assets/image/未付款.png" alt="" style="width:40px;height:40px;" v-if="index == 0">
      <img src="../../assets/image/未发货.png" alt="" style="width:40px;height:40px;" v-if="index == 1">
      <img src="../../assets/image/待收货.png" alt="" style="width:40px;height:40px;" v-if="index == 2">
      <img src="../../assets/image/待评价.png" alt="" style="width:40px;height:40px;" v-if="index ==3">
      <img src="../../assets/image/退换售后.png" alt="" style="width:40px;height:40px;" v-if="index == 4">
      </div>
    
    <div>{{n.name}}</div>
</div>


</div>

<div style="background-color:#f7f7f7;height:10px;"></div>


<div class="orderTitle">
<span>个人中心</span>   
</div>



<div class="order-content" style="border-bottom:solid 1px #e5e5e5;">
<div style="text-align:center;padding:10px;width:25%;" v-for="(n,index) in toolsList" :key="index" @click="tools(n)">
    <div>
    <img src="../../assets/image/我的收藏.png" alt="" style="width:30px;height:30px;" v-if="index == 0">
      <img src="../../assets/image/地址管理.png" alt="" style="width:30px;height:30px;" v-if="index == 1">
      <img src="../../assets/image/优惠卷.png" alt="" style="width:30px;height:30px;" v-if="index == 2">
      <img src="../../assets/image/我的成员.png" alt="" style="width:30px;height:30px;" v-if="index ==3">
      </div>
    <div>{{n.name}}</div>
</div>
</div>


<div class="order-content" style="border-bottom:solid 1px #e5e5e5;">

<div style="text-align:center;padding:10px;width:25%;" @click="myreward()">
    <div>
      <img src="../../assets/image/我的奖励.png" alt="" style="width:30px;height:30px;" >
</div>
    <div>我的奖励</div>
</div>


<div style="text-align:center;padding:10px;width:25%;" @click="mybankcard()">
    <div>
      <img src="../../assets/image/我的银行卡.png" alt="" style="width:30px;height:30px;" >
</div>
    <div>我的银行卡</div>
</div>


<div style="text-align:center;padding:10px;width:25%;" >
    <div>
      <img src="../../assets/image/联系客服.png" alt="" style="width:30px;height:30px;" >
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
  userIcon="";
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
  getOrderList(status) {
    this.$router.push({
      name: "orderlist",
      query: {
        orderStatus: status
      }
    });
  }
  queryuserinfo(){
    Vue.prototype.$reqFormPost(
      "/user/query",
      {
        userId: this.$store.getters[
          Vue.prototype.MutationTreeType.TOKEN_INFO
        ].userId,
        token: this.$store.getters[
          Vue.prototype.MutationTreeType.TOKEN_INFO
        ].token,
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
        
        this.userIcon = res.data.data.userIcon;
        console.log('userIcon',res.data.data.userIcon);
      }
    );
  }
  tools(n) {
    if (n.name == '我的收藏') {
      this.$router.push({ name: "collection" });
    }
    if (n.name == '地址管理') {
      this.$router.push({ name: "addresslist" });
    }
    if (n.name == '优惠券') {
      this.$router.push({ name: "coupon" });
    }
    if (n.name == '我的成员') {
      this.$router.push({ name: "my_member" });
    }
  }
  go_setting(){
    this.$router.push("/setting");
  }
  go_essential(){
    this.$router.push("/essential_information");    
  }
  mybankcard(){ 
    this.$router.push("/my_bankcard");
  }
  myreward(){
    this.$router.push("/my_reward");
  }
  mounted() {
    this.setTabIndex(3);
    this.queryuserinfo();
    console.log("个人中心加载");
  }
}
</script>

<style lang="scss" scoped>
@import "../../style/utils.scss";
.user-background {
  background-image: url('../../assets/image/顶部底图.png') ;
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
  margin-left:10px;
  
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
  margin-left:10px;
  display: flex;
  justify-content: flex-start;
  font-size: 14px;
}
</style>
