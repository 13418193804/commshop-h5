<template>
  <div class="tab-contents" style="height:-webkit-fill-available;background-color:#fafafa;">
        <comhead ref="comhead" isLeftIcon="icon-zuo" leftIconName="angle-left"  @leftClick="false"  title="评论"  ></comhead>
  <div style="margin-bottom:10px;background-color:#ffffff;">
    <div>评分非常满意</div>  
    <div style="display:flex;">
      <div @click="tab(0)" :class="status==0?'tabConactive':'tabCon'">全部</div>  
      <div @click="tab(1)" :class="status==1?'tabConactive':'tabCon'">有图</div>  
    </div>  
  </div>
  <div v-for="(item,index) in commentList" :key="index">
    <div style="padding:10px 15px;background-color:#ffffff;">
            <div>
              <img src="../../assets/image/头像.png" :style="handlePX('width',65)+handlePX('height',65)" style="vertical-align:middle;border-radius:50%;"/>
              <span>{{item.user.nickName}}</span>
              <img v-lazy="'1'" :style="handlePX('width',32)+handlePX('height',32)" style="vertical-align:middle;"/>
            </div>
            <div style="color:#999999;">{{item.createTime}}</div>
            <div>{{item.commentContent}}</div>
            <div v-if="item.commentImg" v-for="(itemimg,imgindex) in item.commentImg" :key="imgindex">
              <img v-lazy="'1'" :style="handlePX('width',148)+handlePX('height',148)"/>
            </div>
          </div>
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


@Component({
  components: { comhead },
  mixins: [mixin]
})
export default class goodscomment extends Vue {
  goodsId="";
  status=0;
  commentList=[];
  
  tab(index){
    this.status=index;
    this.getcommentlist();
  }
  getcommentlist(){
    Vue.prototype.$reqFormPost(
      "/comment/list",
      {
        goodsId: this.goodsId,
        status:this.status
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
        this.commentList = res.data.data.commentList;
        console.log(res.data.data.commentList)
        }
      ); 
  }

  handlePX(CssName, PxNumber) {
    return CssName +":" +this.$store.getters[Vue.prototype.MutationTreeType.SYSTEM].availWidth /750 * PxNumber +"px;";
  }


  mounted() {
    this.goodsId = this.$route.query.goodsId;
    this.getcommentlist();
      console.log("商品评论页")
  }

}
</script>

<style lang="scss" scoped>
@import "../../style/utils.scss";
.tabConactive{
  border:1px solid #f4c542;
  color:#f4c542;
  width:100px;
  height:30px;
  line-height:30px;
  text-align:center;
  border-radius: 6px;
}
.tabCon{
  border:1px solid #000000;
  color:#000000;
  width:100px;
  height:30px;
  line-height:30px;
  text-align:center;
  border-radius: 6px;
}
</style>