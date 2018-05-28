<template>
  <div class="tab-contents" style="height:-webkit-fill-available;background-color:#FFFFFF;">
        <comhead v-if="goodsList.length>0" ref="comhead" isLeftIcon="icon-zuo" leftIconName="angle-left" @rightClick="toggle()" :rightTitle="!isShow?'编辑':'取消'" @leftClick="false"  title="我的收藏"  ></comhead>
        <comhead v-if="goodsList.length==0" ref="comhead" isLeftIcon="icon-zuo" leftIconName="angle-left" @leftClick="false"  title="我的收藏"  ></comhead>


    <div v-for="(item, index) in goodsList" :key="index" style="display:flex;flex-direction:row;align-items:center;border-bottom:1px solid #e5e5e5;">
        <div>
          <van-checkbox-group v-model="checkedGoods">
            <van-checkbox  :name="item.goodsId" v-show="isShow" style="margin-left:5px;"></van-checkbox>
          </van-checkbox-group>
        </div>
        <div :for="item.goodsId" :style="handlePX('width', 720)" style="display:flex;" @click="goProductDetail(item.goodsId)">
            <div style="padding:10px;display:flex;flex:1;">
                <div style="display:flex;align-items:center;justify-content:center;overflow:hidden;" :style="handlePX('height', 200)+handlePX('width', 200)">
                  <img v-lazy="item.goodsImg.split(',')[0]" style="width:100%"/>
                </div>
                <div style="padding-left:10px;flex:1;" class="textLabel" :style="handlePX('line-height', 48)">
                  <div style="max-width:calc;display: flex;align-items: center;">
                    <img src="../../assets/image/新品特价.png" :style="handlePX('width',92)+handlePX('height',30)" style="vertical-align: middle;"/>
                    <div class="textLabel" style="color:#000000;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;" :style="handlePX('font-size',28)+handlePX('width',320)">{{item.goodsName}}</div>
                  </div>
                  <div class="textLabel"  style="color:#A3A3A3;" :style="handlePX('font-size',28)+handlePX('line-height',44)+handlePX('width',!isShow?'460':'370')">{{item.jingle}}</div>
                  <div style="padding-top:5px;">
                    <span style="color:#E05459" :style="handlePX('font-size',34)">￥{{item.marketPrice}}</span>
                    <span style="color:#C5C4C4;text-decoration:line-through;margin-left:5px;" :style="handlePX('font-size',24)">原价:{{item.labelPrice}}</span>
                  </div>
              </div>
            </div>
        </div>
    </div>
    <div v-if="goodsList.length==0" style="position: fixed;left: 50%;top: 50%;-webkit-transform: translate(-50%, -50%);transform: translate(-50%, -50%);}">
      暂无收藏
    </div>
    <div v-if="goodsList.length>0&&isShow==true" style="position: fixed;z-index: 100;bottom: 0;display:flex;left:0;right:0;background-color: #fafafa;">
      <div style="color:#a3a3a3;flex: 1;text-align: center;padding:10px 0;" @click="allchange()">{{goodsList.length==checkedGoods.length?'取消全选':'全选'}}</div>
      <div style="color:#e05459;flex: 1;text-align: center;padding:10px 0;" @click="favdelete()">删除</div>
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
export default class collection extends Vue {
  goodsList = [];
  checkedGoods=[];
  isShow=false;

  toggle(){
    this.isShow = !this.isShow;
  }
  favdelete(){
        if(this.checkedGoods.length==0){
          Toast('没有选商品')
          return
        }
        Vue.prototype.$reqFormPost(
        "/fav/delete",
        {
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
            Toast(res.data.message);
            return;
          }        
          this.getProductList();
          }
          );
  }
  allchange(){
    if (this.goodsList.length==this.checkedGoods.length) {
      this.checkedGoods=[];
    }else{
      let result = [];
      this.goodsList.forEach((item, index) => {
        console.log();
        result.push(item.goodsId);
      });
      this.checkedGoods = result;
    }
  }
  getProductList() {
    Vue.prototype.$reqFormPost(
      "/fav/query",
      {
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
          Toast(res.data.message);
          return;
        }        
        this.goodsList = res.data.data.goodsList;
        console.log(res.data.data.goodsList)
      }
    );
  }

  goProductDetail(goodsId){
    this.$router.push({
      path: "/productdetail",
      query: {
        goodsId: goodsId
      }
    });
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