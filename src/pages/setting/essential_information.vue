 <template>
  <div class="tab-contents" style="height:-webkit-fill-available;background-color:#FFFFFF;">
        <comhead ref="comhead" isLeftIcon="icon-zuo" leftIconName="angle-left" @leftClick="false"  title="基本信息" isRightIcon="true" ></comhead>

    <van-cell-group>
        <van-cell is-link>
            <template slot="title">
              <span class="van-cell-text" :style="handlePX('line-height',60)">头像</span>
            </template>
            <div :style="handlePX('height',60)">
                <img v-lazy="'1'" :style="handlePX('width',60)+handlePX('height',60)" style="border-radius:50%;"/>
            </div>
        </van-cell>
        <van-cell title="用户名" is-link :value="userinfo.nickName" />
        <van-cell title="性别" is-link :value="userinfo.sex" />
        <van-cell title="手机" is-link :value="userinfo.mobile" />
    </van-cell-group>
    



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
export default class essential_information extends Vue {

    userinfo="";

  queryuser() {
    Vue.prototype.$reqFormPost(
      "/user/query",
      {
        userId: this.$store.getters[
            Vue.prototype.MutationTreeType.TOKEN_INFO
        ].userId,
        token: this.$store.getters[
            Vue.prototype.MutationTreeType.TOKEN_INFO
        ].token,
      },
      res => {
        if (res == null) {
          console.log("网络请求错误！");
          return;
        }
        console.log(res);

        if (res.data.status != 200) {
          console.log(
            "需控制错误码" + res.data.status + ",错误信息：" + res.data.message
          );
          Toast(res.data.message);
          return;
        }
        console.log('res.data',res.data)
        this.userinfo=res.data;
      }
    );
  }

  handlePX(CssName, PxNumber) {
    return CssName +":" +this.$store.getters[Vue.prototype.MutationTreeType.SYSTEM].availWidth /750 * PxNumber +"px;";
  }


  mounted() {
      this.queryuser();
      console.log("收藏页面")
  }

}
</script>

<style lang="scss" scoped>
@import "../../style/utils.scss";
</style>