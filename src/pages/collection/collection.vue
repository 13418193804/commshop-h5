<template>
  <div class="tab-contents" style="height:-webkit-fill-available;background-color:#FFFFFF;">
        <comhead ref="comhead" isLeftIcon="icon-zuo" leftIconName="angle-left" @leftClick="false"  title="我的收藏" isRightIcon="true" ></comhead>

    <div @click="toggle()" v-show="!isShow">编辑</div>
    <div @click="toggle()" v-show="isShow">删除</div>

    <div v-for="(item, index) in goodsList" :key="index" style="display:flex;flex-direction:row;align-items:center;">
        <div>
          <input type="checkbox" :id="item.goodsId" :value="item.goodsId" v-model="checkedGoods" v-show="isShow">
        </div>
        <label :for="item.goodsId" style="display:flex;border-bottom:1px solid #e5e5e5;">
            <div style="width:-webkit-fill-available;padding:10px;display:flex;">
                <div style="display:flex;align-items:center;justify-content:center;overflow:hidden;" :style="handlePX('height', 200)+handlePX('width', 200)">
                  <img v-lazy="item.goodsImg.split(',')[0]" style="width:100%"/>
                </div>
                <div style="padding-left:10px;flex:1;" class="textLabel" :style="handlePX('padding-top', 30)+handlePX('line-height', 48)">
                  <div>
                    <img src="../../assets/image/新品特价.png" :style="handlePX('width',92)+handlePX('height',30)" style="vertical-align: middle;"/>
                    <span class="textLabel" style="color:#000000;" :style="handlePX('font-size',28)">{{item.goodsName}}</span>
                  </div>
                  <div class="textLabel"  style="color:#A3A3A3;" :style="handlePX('font-size',28)+handlePX('line-height',44)">{{item.jingle}}</div>
                  <div>
                    <span style="color:#E05459" :style="handlePX('font-size',34)">￥{{item.marketPrice}}</span>
                    <span style="color:#C5C4C4;text-decoration:line-through;margin-left:5px;" :style="handlePX('font-size',24)">原价:{{item.labelPrice}}</span>
                  </div>
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