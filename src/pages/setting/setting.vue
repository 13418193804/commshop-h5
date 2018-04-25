 <template>
  <div class="tab-contents" style="height:-webkit-fill-available;background-color:#f3f3f3;">
    <comhead ref="comhead" isLeftIcon="icon-zuo" leftIconName="angle-left" @leftClick="false"  title="设置" isRightIcon="true" ></comhead>
    <van-cell-group>
        <van-cell title="清除缓存" value="20M" />
        <van-cell title="基本信息" is-link  />
        <van-cell title="修改密码" is-link />
        <van-cell title="意见反馈" is-link />
        <van-cell title="分享APP" is-link />
        <van-cell title="关于我们" is-link />
    </van-cell-group>

    <div style="margin-top:20px;">
        <van-button size="large">退出登录</van-button>
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
export default class setting extends Vue {

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