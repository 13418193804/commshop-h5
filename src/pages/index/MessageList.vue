<template>
  <div class="messagePage" style="background-color: #f3f3f3;">

    <comhead ref="comhead" isLeftIcon="icon-zuo" leftIconName="angle-left" @leftClick="false"  title="消息中心" isRightIcon="true"  ></comhead>
     <ul
  v-infinite-scroll="loadMore"
  :infinite-scroll-disabled="loading"
  infinite-scroll-distance="20" >
    
        <!-- 积分消息 -->
        <li v-for="(item,index) in messagelist" :key="index"   @click="goCenter(item)">
          <div class="flex flex-pack-justify" style="border-bottom:1px solid #f4f4f4;background-color: #fff;" :style="handlePX('padding',20)+(item.status==false?'font-size: 14px;color:#000':'font-size: 14px;color:#a9a9a9')">
            <div style="font-size:12px;">{{item.content}}</div>
            <div style="font-size:12px;text-align: right;vertical-align: middle;" :style="handlePX('width',300)">{{item.updateTime}}</div> 
          </div>
        </li>
 </ul>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import mixin from "../../config/mixin";
import { Action } from "vuex-class";
import { Toast } from "vant";
import comhead from "../../components/Comhead.vue";

// import { recommendList } from '../../service/getData';

// //MD5加密
// export const md5Encrypt = (encryptString) => {
//     let md5 = crypto.createHash('md5').update(encryptString).digest('hex');
//     return md5;
// };

@Component({
  components: {
          comhead
  },
  mixins: [mixin]
})
export default class shopIndex extends Vue {
  orderId="";
  loading=false
  pageSize = 20;
  messagelist=[];
  page=0;
  loadMore(){
    let self = this;
    
    setTimeout(() => {
      if(!self.loading){
    self.loading=true;
       console.log('guolu')  
        self.pageSize+=20;
        self.getList();
        self.loading = false;
      }
    }, 1000);
  }

goCenter(item){

  if(item.type=='ORDER_MSG'){
this.goOrderDetail(item);
  }
  if(item.type=='AWARD_MSG'){
this.goReward()
  }
}

  // 消息订单详情
   goOrderDetail(item) {
   console.log('查看详情')
    this.$router.push({
      name: "orderdetail",
      query: {
        orderId: item.actionValue
      }
    });
  }
  //消息积分详情
    goReward(){
    console.log('积分详情')
    this.$router.push({
      name:"my_reward"
    })
  }
  getList() {
 Vue.prototype.$reqFormPost("/message/list", {
   
      userId: this.$store.getters[Vue.prototype.MutationTreeType.TOKEN_INFO]
        .userId,
      token: this.$store.getters[Vue.prototype.MutationTreeType.TOKEN_INFO]
        .token,
      page: 0,
      pageSize: this.pageSize
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
      console.log(this.messagelist.length ,  res.data.data.messageList.length)
      if(this.messagelist.length !=    res.data.data.messageList.length){
    this.messagelist = res.data.data.messageList;
          this.loading = false;
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
    this.getList();
  }
}
</script>

<style lang="scss" scoped>
@import "../../style/utils.scss";

.messagePage{
    background-color:#f7f7f7;
    height:100vh;
    width:100%;
}
</style>


