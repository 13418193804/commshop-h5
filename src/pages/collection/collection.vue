<template>
  <div class="tab-contents" style="height:-webkit-fill-available;background-color:#f7f7f7;">
        <comhead ref="comhead" isLeftIcon="icon-zuo" leftIconName="angle-left" @leftClick="false"  title="我的收藏" isRightIcon="true" ></comhead>

    <div @click="toggle()" v-show="!isShow">编辑</div>
    <div @click="toggle()" v-show="isShow">删除</div>

    <div v-for="(item, index) in goodsList" :key="index">
        <input type="checkbox" :id="item.goodsId" :value="item.goodsId" v-model="checkedGoods" v-show="isShow">
        <label :for="item.goodsId" style="display:flex;">
            <div>
                <img  v-lazy="item.goodsImg.split(',')[0]"  :style="handlePX('width',200)+handlePX('height',200)"/>
            </div>
            <div>
                <div>
                    <span :style="handlePX('width',90)+handlePX('height',28)" style="border:1px solid #fe4747;color:#fe4747;border-radius:8%;">新品特价</span>
                    <span style="color:#575757;">{{item.goodsName}}</span>
                </div>          
                <span style="color:#989898;">{{item.jingle}}</span>
                <div>
                    <span style="color:#ff5359;">￥{{item.costPrice}}</span>
                    <span style="color:#c7c5c5;text-decoration:line-through;">原价￥{{item.marketPrice}}</span>
                </div>
            </div>
        </label>
    </div>

    



  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import mixin from "../../config/mixin";
import { Action } from "vuex-class";
import { Toast } from "vant";
// import { recommendList } from '../../service/getData';
import comhead from "../../components/Comhead.vue";

@Component({
  components: { comhead },
  mixins: [mixin]
})
export default class collection extends Vue {
  goodsList = [];
  checkedGoods=[];
  isShow=false;

  toggle(){
      if(this.isShow==true){
          Vue.prototype.$reqFormPost(
      "/fav/delete",
      {
        // token: '2c353ced5a3bb09cf7f05e57155999cd',
        // userId: 'UI5add43d15b065d5be5116746',
        userId: this.$store.getters[
            Vue.prototype.MutationTreeType.TOKEN_INFO
        ].userId,
        token: this.$store.getters[
            Vue.prototype.MutationTreeType.TOKEN_INFO
        ].token,
        goodsIds: this.checkedGoods,
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
        this.getProductList();
         }
        );
       }
      this.isShow = !this.isShow;
  }

  getProductList() {
    Vue.prototype.$reqFormPost(
      "/fav/query",
      {
        // token: '2c353ced5a3bb09cf7f05e57155999cd',
        // userId: 'UI5add43d15b065d5be5116746',
        userId: this.$store.getters[
          Vue.prototype.MutationTreeType.TOKEN_INFO
        ].userId,
        token: this.$store.getters[
          Vue.prototype.MutationTreeType.TOKEN_INFO
        ].token,
        page:0,
        pageSize:20,
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
        this.goodsList = res.data.data.goodsList;
        console.log(res.data.data.goodsList)
      }
    );
  }



  handlePX(CssName, PxNumber) {
    return CssName +":" +this.$store.getters[Vue.prototype.MutationTreeType.SYSTEM].availWidth /750 * PxNumber +"px;";
  }


  mounted() {
      this.getProductList();
      console.log("收藏页面")
  }

}
</script>

<style lang="scss" scoped>
@import "../../style/utils.scss";
</style>