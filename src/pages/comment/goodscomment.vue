<template>
  <div class="tab-contents" style="height:-webkit-fill-available;background-color:#fafafa;">
        <comhead ref="comhead" isLeftIcon="icon-zuo" leftIconName="angle-left"  @leftClick="false"  title="评论"  ></comhead>
  <div style="margin-bottom:10px;background-color:#ffffff;">
    <div class="flex" style="padding: 15px;">
      <span>评分</span>
      <div class="star-box" style="margin:0 10px;">
        <img v-for="(star,index) in stars" :key="index" :src="star.src" :style="handlePX('width',43)+handlePX('height',43)"/>
      </div>
      <span>{{praise}}%好评</span>
    </div>  
    <div class="flex" style="padding-left: 15px;">
      <div @click="tab(0)" :class="status==0?'tabConactive':'tabCon'">全部</div>  
      <div @click="tab(1)" :class="status==1?'tabConactive':'tabCon'" style="margin-left:10px;">有图</div>  
    </div>  
  </div>
  <div v-for="(item,index) in commentList" :key="index">
    <div style="padding:10px 15px;background-color:#ffffff;border-bottom:1px solid #fafafa;">
            <div>
              <img v-if="item.user.userIcon" v-lazy="item.user.userIcon" :style="handlePX('width',65)+handlePX('height',65)" style="vertical-align:middle;border-radius:50%;"/>              
              <img v-else src="../../assets/image/userIcon.png" :style="handlePX('width',65)+handlePX('height',65)" style="vertical-align:middle;border-radius:50%;"/>
              <span>{{item.user.nickName}}</span>
            </div>
            <div style="color:#999999;">{{item.createTime}}</div>
            <div>{{item.commentContent}}</div>
            <div v-if="item.commentImg" >
              <img v-if="item.commentImg.split(',')[0]" v-lazy="item.commentImg.split(',')[0]" :style="handlePX('width',148)+handlePX('height',148)"/>
              <img v-if="item.commentImg.split(',')[1]" v-lazy="item.commentImg.split(',')[1]" :style="handlePX('width',148)+handlePX('height',148)"/>
              <img v-if="item.commentImg.split(',')[2]" v-lazy="item.commentImg.split(',')[2]" :style="handlePX('width',148)+handlePX('height',148)"/>
              <img v-if="item.commentImg.split(',')[3]" v-lazy="item.commentImg.split(',')[3]" :style="handlePX('width',148)+handlePX('height',148)"/>
              <img v-if="item.commentImg.split(',')[4]" v-lazy="item.commentImg.split(',')[4]" :style="handlePX('width',148)+handlePX('height',148)"/>
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
  praise="0";
  stars=[{
                            src: require('../../assets/image/灰色星星.png'),
                            active: false
                        }, {
                            src: require('../../assets/image/灰色星星.png'),
                            active: false
                        }, {
                            src: require('../../assets/image/灰色星星.png'),
                            active: false
                        },
                        {
                            src: require('../../assets/image/灰色星星.png'),
                            active: false
                        }, {
                            src: require('../../assets/image/灰色星星.png'),
                            active: false
                        }
                    ];
  
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

          Toast(res.data.message);
          return;
        }
        this.commentList = res.data.data.commentList;
        
        if(this.status==0){
          var total = 0;
          for (let i = 0; i < res.data.data.commentList.length; i++) {
            total = res.data.data.commentList[i].star + total
          }
          total=total/(res.data.data.commentList.length*5);
          if(total==1){
            this.getstars(5);
          }else if(0.8<=total&&total<1){
            this.getstars(4);
          }else if(0.6<=total&&total<0.8){
            this.getstars(3);
          }else if(0.4<=total&&total<0.6){
            this.getstars(2);
          }else if(0.2<=total&&total<0.4){
            this.getstars(1);
          }else{
            this.getstars(0);            
          }
          total = total* 100;
          total.toFixed(2)
          const praisenum = total.toFixed(0)
          if(res.data.data.commentList.length>0){
            this.praise = praisenum;
          }
        }
        }
      ); 
  }
  getstars(num){
    for(var i = 0; i < num; i++) {
      this.stars[i].src = require('../../assets/image/星星.png');
      this.stars[i].active = true;
    }
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