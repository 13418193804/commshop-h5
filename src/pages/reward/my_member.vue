<template>
  <div class="tab-contents">
    <comhead ref="comhead" isLeftIcon="icon-zuo" leftIconName="angle-left" @leftClick="false"  title="我的成员" isRightIcon="true"  ></comhead>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
    <!-- <van-cell-group> -->
      <van-list v-model="loading" :finished="finished" @load="onLoad">
        <van-cell v-for="(item, index) in memberlist" :key="index">
            <template slot="title">
            <img v-if="item.userIcon" v-lazy="item.userIcon" :style="handlePX('width', 85)+handlePX('height', 85)" style="vertical-align: middle;border-radius: 100%;"/>
            <img v-else src="../../assets/image/头像.png" :style="handlePX('width', 85)+handlePX('height', 85)" style="vertical-align: middle;border-radius: 100%;"/>
            <span class="van-cell-text">{{item.nickName}}</span>
            </template>
            <template>
            <span class="van-cell-text" :style="handlePX('line-height', 85)">{{item.mobile}}</span>
            </template>
        </van-cell>
        </van-list>
    <!-- </van-cell-group> -->
    </van-pull-refresh>
<!-- <van-list v-model="loading" :finished="finished" @load="onLoad">
  <van-cell v-for="item in list" :key="item" :title="item + ''" />
</van-list> -->


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
  components: {
    comhead
  },
  mixins: [mixin]
})
export default class my_member extends Vue {
    pageindex=0;
    memberlist=[];
    isLoading= false;
    list=[];
    loading=false;
    finished=false;
    getMemberList(){
     Vue.prototype.$reqFormPost("/member/list", {
        userId: this.$store.getters[
            Vue.prototype.MutationTreeType.TOKEN_INFO
        ].userId,
        token: this.$store.getters[
            Vue.prototype.MutationTreeType.TOKEN_INFO
        ].token,
        page:this.pageindex,
        pageSize:20,
     }, res => {
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
      if(this.pageindex==0){
          this.memberlist = res.data.data.memberlist;
        }else{
          for (let i = 0; i < res.data.data.memberlist.length; i++) {
            this.memberlist.push(res.data.data.memberlist[i])
          }
        }
      this.pageindex = this.pageindex+1;

      
      if(!res.data.data.memberList){
        this.finished = true;
      }


    });
      
    }

  onRefresh() {

      setTimeout(() => {
        this.pageindex = 0;
        this.getMemberList();
        this.$toast('刷新成功');
        this.isLoading = false;
      }, 500);

    }

  onLoad() {
      setTimeout(() => {
        this.getMemberList();
        this.loading = false;
      }, 500);
    }

  handlePX(CssName, PxNumber) {
    return CssName +":" +this.$store.getters[Vue.prototype.MutationTreeType.SYSTEM].availWidth /750 * PxNumber +"px;";
  }
  mounted() {
      this.getMemberList();
    console.log("我的成员");
  }
}
</script>


<style lang="scss" scoped>
@import "../../style/utils.scss";
</style>