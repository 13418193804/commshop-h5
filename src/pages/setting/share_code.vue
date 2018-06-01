 <template>
  <div class="tab-contents" style="height:-webkit-fill-available;background-color:#fff;">
    <comhead ref="comhead" isLeftIcon="icon-zuo" leftIconName="angle-left" @leftClick="false"  title="邀请伙伴" ></comhead>
    
    <div class="flex flex-align-center flex-v" style="font-size:16px;" @click="go_essential()">
        <img v-if="userIcon" v-lazy="userIcon" style="width:80px;height:80px;border-radius: 80px;"/>
        <img v-else src="../../assets/image/userIcon.png" style="width:80px;height:80px;border-radius: 80px;"/>
        <div v-if="user">{{user.nickName}}</div>
    </div>

    <div :style="handlePX('margin-top',60)+handlePX('margin-bottom',46)" class="flex flex-align-center flex-v">
        <div :style="handlePX('font-size',36)+handlePX('margin-bottom',25)">邀请你去"中宜商城"</div>
        <div :style="handlePX('font-size',26)" style="color:#a3a3a3;">在这里，有你和我都想要的东西，<span style="color:#dd4949;">优惠多多哦！</span></div>
    </div>

    <div class="flex flex-align-center flex-v">
        <img  v-lazy="user.qrCode" :style="handlePX('width',270)+handlePX('height',270)"/>
    </div>

    <div class="flex flex-align-center flex-v">
        <div :style="handlePX('width',580)+handlePX('height',90)+handlePX('line-height',90)+handlePX('margin-top',80)" style="text-align:center;color:#fff;border-radius:8px;background-color:#f4c542;">分享</div>
    </div>


  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import mixin from "../../config/mixin";
import { Action } from "vuex-class";
import { Toast,Dialog } from "vant";
// import { recommendList } from '../../service/getData';
import comhead from "../../components/Comhead.vue";

@Component({
  components: { comhead },
  mixins: [mixin]
})
export default class share_code extends Vue {
  @Action("setTokenInfo") setTokenInfo;
  userIcon = "";
  user = {};
  queryuserinfo() {
    Vue.prototype.$reqFormPost(
      "/user/query",
      {
        userId: this.$store.getters[Vue.prototype.MutationTreeType.TOKEN_INFO]
          .userId,
        token: this.$store.getters[Vue.prototype.MutationTreeType.TOKEN_INFO]
          .token
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
        this.user = res.data.data;
        this.userIcon = res.data.data.userIcon;
      }
    );
  }
  handlePX(CssName, PxNumber) {
    return CssName +":" +this.$store.getters[Vue.prototype.MutationTreeType.SYSTEM].availWidth /750 * PxNumber +"px;";
  }
  mounted() {
      console.log("分享");
      this.queryuserinfo();
  }

}
</script>

<style lang="scss" scoped>
@import "../../style/utils.scss";
</style>