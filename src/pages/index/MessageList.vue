<template>
  <div class="messagePage" style="background-color: #f3f3f3;">

    <comhead ref="comhead" isLeftIcon="icon-zuo" leftIconName="angle-left" @leftClick="false"  title="消息中心" isRightIcon="true"  ></comhead>
     <ul
  v-infinite-scroll="loadMore"
  :infinite-scroll-disabled="loading"
  infinite-scroll-distance="20" >
        <li v-for="(item,index) in messagelist" :key="index">
          <div style="display:flex;justify-content: space-between;border-bottom:1px solid #f4f4f4;background-color: #fff;" :style="handlePX('padding',20)">
            <div style="font-size:12px;color:#a9a9a9;">{{item.content}}</div>
            <div style="font-size:12px;color:#a9a9a9;text-align: right;vertical-align: middle;" :style="handlePX('width',300)">{{item.updateTime}}</div> 
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
}
</style>


