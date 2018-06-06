 <template>
  <div class="tab-contents" style="height:-webkit-fill-available;background-color:#fff;position: relative;">
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
        <div :style="handlePX('width',580)+handlePX('height',90)+handlePX('line-height',90)+handlePX('margin-top',80)" style="text-align:center;color:#fff;border-radius:8px;background-color:#f4c542;" @click="toggle()">分享</div>
    </div>

    <div style="background-color:rgba(0, 0, 0, 0.5);z-index: 999;position: fixed;width: 100%;height: 100vh;top:0;" v-show="isShow">
      <div style="bottom: 0px;position: fixed;width: 100%;">
        <div style="background-color:#E9EFF2;">
          <div style="text-align: center;color:#717476;" :style="handlePX('padding-top',50)">选择要分享到的平台</div>
          <div class="flex flex-around-justify" style="padding:10px 0;" :style="handlePX('padding-top',50)+handlePX('padding-bottom',50)">
            <div class="flex flex-v flex-align-center">
              <img src="../../assets/image/分享微信.png" style="border-radius:8px;" :style="handlePX('width', 100)+handlePX('height', 100)"/>
              <div style="color: #7f7f7f;">微信</div>
            </div>
            <div class="flex flex-v flex-align-center">
              <img src="../../assets/image/分享微信朋友圈.png" style="border-radius:8px;" :style="handlePX('width', 100)+handlePX('height', 100)"/>
              <div style="color: #7f7f7f;">微信朋友圈</div>
            </div>
          </div>
        </div>
        <div style="background-color:#fff;color:#717476;text-align: center;" :style="handlePX('height',100)+handlePX('line-height',100)" @click="toggle()">取消分享</div>
      </div>
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
  isShow=false;
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
  toggle(){
    this.isShow = !this.isShow;
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