<template>
  <div class="tab-contents" style="overflow: auto;height:-webkit-fill-available;background-color:#f5f5f5;">
    <comhead ref="comhead" isLeftIcon="icon-zuo" leftIconName="angle-left" @leftClick="false"  title="我的积分" isRightIcon="true"  ></comhead>
    <div class="flex flex-align-center" style="background-color:#ffffff;">
        <div :style="handlePX('height', 300)" class="flex flex-pack-center flex-align-center flex-1 flex-v">
            <div>
                <img src="../../assets/image/金币.png" :style="handlePX('width', 55)+handlePX('height', 55)" style="vertical-align: middle;"/>
                <span>积分余额</span>
            </div>
            <div :style="handlePX('margin-top', 20)" style="color:#ffc600;">￥{{award.awardBalance}}</div>
            <div style="color:#ababab; visibility: hidden;" @click="gogetreward()" >提现>></div>
            <van-button :style="handlePX('width', 220)+handlePX('height', 60)+handlePX('line-height', 60)+handlePX('margin-top', 20)" @click="gomember()">我的成员</van-button>
        </div>
        <div :style="handlePX('height', 300)" class="flex flex-pack-center flex-align-center flex-1 flex-v">
            <div>
                <img src="../../assets/image/金币.png" :style="handlePX('width', 55)+handlePX('height', 55)" style="vertical-align: middle;"/>
                <span >累计获取积分</span>
            </div>
            <div :style="handlePX('margin-top', 20)" style="color:#ffc600;">￥{{award.awardAmount}}</div>
            <div style="color:#ababab;visibility: hidden;" @click="gorewarddetail()" >明细>></div>
            <van-button :style="handlePX('width', 220)+handlePX('height', 60)+handlePX('line-height', 60)+handlePX('margin-top', 20)" @click="$router.push('/rewardtext')">积分规则</van-button>
        </div>
    </div>

    <div :style="handlePX('padding', 30)">
        <div style="color:#959595;">最新消息</div>
        <ul v-infinite-scroll="loadMore" :infinite-scroll-disabled="loading" infinite-scroll-distance="20" >
          <li v-for="(item, index) in awardList" :key="index" 
           style="border-bottom:1px solid #e7e7e7;font-size:12px;padding:10px 0;line-height: 22px;">
          {{item.member.nickName}}在{{item.createTime}}消费{{item.payTotal}}元，你获得{{item.awardAmount}}积分奖励</li>
        </ul>
        <div class="flex flex-pack-center flex-align-center" style="font-size:14px;padding:15px;">
          <div v-if="loading">加载中...</div>
          <div v-else>暂无记录</div>
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
  components: {
    comhead
  },
  mixins: [mixin]
})
export default class my_reward extends Vue {
    pageindex = 0;
    loading = false;
    award="";
    awardList=[];

    getreward(){
    Vue.prototype.$reqFormPost("/user/account/query", {
      userId: this.$store.getters[
            Vue.prototype.MutationTreeType.TOKEN_INFO
        ].userId,
        token: this.$store.getters[
            Vue.prototype.MutationTreeType.TOKEN_INFO
        ].token,
     }, res => {
      if (res == null) {
        console.log("网络请求错误！");
        return;
      }
      if (res.data.status != 200) {
        console.log(
          "需控制错误码" + res.data.status + ",错误信息：" + res.data.message
        );
        Toast(res.data.message)
        return;
      }
      this.award = res.data.data
      console.log("award",res.data.data);
    });
  }
  get_user_rewardlist(){
    Vue.prototype.$reqFormPost("/award/record/userquery", {
      userId: this.$store.getters[
          Vue.prototype.MutationTreeType.TOKEN_INFO
      ].userId,
      token: this.$store.getters[
          Vue.prototype.MutationTreeType.TOKEN_INFO
      ].token,
      page:this.pageindex,
      pageSize:20
     }, res => {
      if (res == null) {
        console.log("网络请求错误！");
        return;
      }
      if (res.data.status != 200) {
        console.log(
          "需控制错误码" + res.data.status + ",错误信息：" + res.data.message
        );
        Toast(res.data.message)
        return;
      }
      let awardList = this.awardList ? this.awardList : [];
        for (let i = 0; i < res.data.data.awardList.length; i++) {
          awardList.push(res.data.data.awardList[i]);
        }
        if (res.data.data.awardList.length == 20) {
          this.loading = false;
        }
        this.awardList = awardList;
      console.log("awardList",res.data.data.awardList);
    });
  }
    gogetreward(){
        this.$router.push("/reward");
    }
    gorewarddetail(){
    this.$router.push("/present_record");
  }
  gomember(){
    this.$router.push("/my_member");
  }
    handlePX(CssName, PxNumber) {
    return CssName +":" +this.$store.getters[Vue.prototype.MutationTreeType.SYSTEM].availWidth /750 * PxNumber +"px;";
  }
  loadMore() {
    console.log("刷新");
    this.loading = true;
    let self = this;
    setTimeout(() => {
      self.pageindex = self.pageindex + 1;
      self.get_user_rewardlist();
      self.loading = false;
    }, 1000);
  }
  mounted() {
    this.getreward();
    this.get_user_rewardlist();
    console.log("我的奖励");
  }
}
</script>


<style lang="scss" scoped>
@import "../../style/utils.scss";
</style>