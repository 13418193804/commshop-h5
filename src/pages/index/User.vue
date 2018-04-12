<template>
  <div class="tab-contents">
      <div class="user-background">
          <div class="user-tool">
             <div style="padding: 10px;">
                  <i class="iconfont icon-setting" style="color:#fff;font-size:25px;"></i>
             </div>
   <div style="line-height:47px;">
     <span style="padding: 10px;">
<i class="iconfont icon-icon-p_xinfeng" style="color:#fff;font-size:25px;"></i>
     </span>
               <span style="padding: 10px;">
                  <i class="iconfont icon-erweima" style="color:#fff;font-size:25px;"></i>
     </span>    
             </div>
          </div>

            

<div style="font-size:16px;">
    <img  v-lazy="'1'" style="width:100px;height:100px;border-radius: 100px;"/>
    <div>普通用户名称</div>
</div>
      </div>



<div class="orderTitle">
<span>我的订单</span>   
    <i class="iconfont icon-youjiantou" style="font-size:20px;"></i>
</div>

<div class="order-content" >
<div style="text-align:center;padding:10px 0;width:20%;" v-for="n in orderList" @click="getOrderList()">
    <div><img v-lazy="'1'" alt="" style="width:40px;height:40px;"></div>
    <div>{{n.name}}</div>
</div>


</div>

<div style="background-color:#f7f7f7;height:10px;"></div>


<div class="orderTitle">
<span>个人中心</span>   
</div>



<div class="order-content" style="border-bottom:solid 1px #e5e5e5;">
<div style="text-align:center;padding:10px;width:25%;" v-for="n in 4" @click="tools(n)">
    <div><img v-lazy="'1'" alt="" style="width:60px;height:60px;"></div>
    <div>代付款</div>
</div>
</div>


<div class="order-content" >
<div style="text-align:center;padding:10px;width:25%;" v-for="n in 3">
    <div><img v-lazy="'1'" alt="" style="width:60px;height:60px;"></div>
    <div>代付款</div>
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
  orderList=[
    {
      name:"待付款",
      url:"",
      img:""
    }, {
      name:"待发货",
      url:"",
      img:""
    }, {
      name:"待收货",
      url:"",
      img:""
    }, {
      name:"待评价",
      url:"",
      img:""
    }, {
      name:"退换/售后",
      url:"",
      img:""
    },
  ]
  getOrderList(){
    this.$router.push({
      name:'orderlist'
    })
  }
  tools(n) {
    if (n == 2) {
      this.$router.push({name:"addresslist"})
    }
  }
  mounted() {
    this.setTabIndex(3);
    console.log("个人中心加载");
  }
}
</script>

<style lang="scss" scoped>
@import "../../style/utils.scss";
.user-background {
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
  display: flex;
  border-bottom: solid 1px #e5e5e5;
  align-items: center;
  height: 35px;
  line-height: 35px;
  justify-content: space-between;
  padding: 5px 10px;
  font-size: 14px;
}
.order-content {
  display: flex;
  justify-content: flex-start;
  font-size: 14px;
}
</style>
