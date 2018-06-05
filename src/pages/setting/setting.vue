 <template>
  <div class="tab-contents" style="height:-webkit-fill-available;background-color:#f3f3f3;">
    <comhead ref="comhead" isLeftIcon="icon-zuo" leftIconName="angle-left" @leftClick="false"  title="设置" isRightIcon="true" ></comhead>
    <van-cell-group>
        <van-cell title="基本信息" is-link @click="go_info()"/>
        <van-cell title="修改密码" is-link @click="modify_pw()"/>
        <van-cell title="意见反馈" is-link @click="go_feedback()"/>
        <van-cell title="关于我们" is-link @click="aboutus()"/>
    </van-cell-group>

    <div style="margin-top:20px;">
        <van-button size="large" @click="exit_logon()">退出登录</van-button>
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
export default class setting extends Vue {
  @Action("setTokenInfo") setTokenInfo;

  go_info(){
    this.$router.push("/essential_information");
  }
  go_feedback(){
    this.$router.push("/feedback");
  }
  aboutus(){
    this.$router.push("/about_us");
  }
  modify_pw(){
    this.$router.push({
      path: "/update_info",
      query: {
        updatename: 'password'
      }
    });
  }
  exit_logon(){
      Dialog.confirm({
      title: "提示",
      message: "是否退出登陆?"
    })
      .then(() => {
                this.setTokenInfo({   userId: "",
        token: ""});
    localStorage.removeItem(Vue.prototype.MutationTreeType.TOKEN_INFO);
    this.$router.replace("/login");

     })
      .catch(() => {
        // on cancel
      });
  }
  handlePX(CssName, PxNumber) {
    return CssName +":" +this.$store.getters[Vue.prototype.MutationTreeType.SYSTEM].availWidth /750 * PxNumber +"px;";
  }
  mounted() {
      console.log("收藏页面")
  }

}
</script>

<style lang="scss" scoped>
@import "../../style/utils.scss";
</style>