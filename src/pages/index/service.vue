<template>
  <div class="messagePage" style="background-color: #f3f3f3;">

    <comhead ref="comhead" isLeftIcon="icon-zuo" leftIconName="angle-left" @leftClick="false"  title="客服" isRightIcon="true"  ></comhead>
    <!-- <ul
  v-infinite-scroll="loadMore"
  :infinite-scroll-disabled="loading"
  infinite-scroll-distance="20" >
        <li v-for="(item,index) in messagelist" :key="index">
          <div class="flex flex-pack-justify" style="border-bottom:1px solid #f4f4f4;background-color: #fff;" :style="handlePX('padding',20)">
            <div style="font-size:12px;color:#a9a9a9;">{{item.content}}</div>
            <div style="font-size:12px;color:#a9a9a9;text-align: right;vertical-align: middle;" :style="handlePX('width',300)">{{item.updateTime}}</div> 
          </div>
        </li>
    </ul> -->
    <div class="sev_box">
        <h5>热点问题</h5>
         <ul class="sev_list">
           <li><div class="li_icon"><i class="iconfont icon-youjiantou"></i></div>1.什么时候发货?</li>
           <li><div class="li_icon"><i class="iconfont icon-youjiantou"></i></div>2.我获得了商品，还需要支付其他费用吗?</li>
           <li><div class="li_icon"><i class="iconfont icon-youjiantou"></i></div>3.当我获得商品之后我该做什么？</li>
         </ul>
          <div class="sev_phone">
            <h5>联系方式</h5>
            <p>如以上问题未能帮助您，请采取一下方式联系我们。</p>
            <div class="phone">
                <div>客服热线</div>
                <div>
                  <p>020-84105800</p>
                  <p>020-84105815</p>
                </div>
            </div>
            
            <div>微信公众号：zhongyiglt</div>

            <h6>(客服时间是看看会发生想念那时候 i 懂)</h6>
          </div>
    </div>
   <div class="van-hairline--top-bottom van-tabbar van-tabbar--fixed" style="z-index: 2;">
     <div class="van-tabbar-item">意见反馈</div>
     <div class="van-tabbar-item">在线客服</div>
   </div>

   
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
  loading=false
  pageSize = 20;
  messagelist=[];
  page=0;
  loadMore(){
    let self = this;
    self.loading=true;    
    setTimeout(() => {
      if(!self.loading){
        self.page+=1;
        self.getList();
        self.loading = false;
      }
    }, 1000);
  }
  getList() {
 Vue.prototype.$reqFormPost("/message/list", {
   
      userId: this.$store.getters[Vue.prototype.MutationTreeType.TOKEN_INFO]
        .userId,
      token: this.$store.getters[Vue.prototype.MutationTreeType.TOKEN_INFO]
        .token,
      page: this.page,
      pageSize: 20
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
    console.log(res)
    this.messagelist = res.data.data.messageList;
       if (res.data.data.messageList.length == 20) {
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
    font-size: 14px;
}
.sev_box{
  h5{
    font-size: 14px;padding-left:10px;margin:0;line-height: 40px;color: #808080;font-weight: normal;
  }
  ul.sev_list{
    background: #fff;padding-left:10px;
    li{
      height: 45px;line-height:45px;border-bottom: 1px solid #f5f5f5;font-size: 13px;align-items: center;
      color: #808080;position: relative;
      .li_icon{
        position: absolute;right: 10px;color: #fdca17;
      }
    }
  }
  .sev_phone{
    background: #fff;padding-left:10px;padding-bottom:10px;color:#808080;
    h5{
      font-size: 14px;padding-left:0;
    }
    p{
      color: #808080;margin-bottom: 10px;font-size:13px;
    }
    .phone{
      overflow: hidden;
      div{
        float: left;color: #808080;font-size:13px;
        p{
          color: #b5b2b2;font-size:13px;
        }
      }
      div:nth-of-type(1){
        width: 20%;
      }
    }
    h6{
        font-weight: normal;font-size: 10px;margin-top:10px;color:#d3d3d3;
      }
  }
}
</style>


