 <template>
  <div class="tab-contents" style="height:-webkit-fill-available;background-color:#f3f3f3;">
    <comhead ref="comhead" isLeftIcon="icon-zuo" leftIconName="angle-left" @leftClick="false"  title="意见反馈" isRightIcon="true" ></comhead>

    <van-cell-group>
      <van-field v-model="content" type="textarea" placeholder="请输入反馈意见" rows="7" autosize :style="handlePX('padding',30)"/>
    </van-cell-group>
    
    <div style="margin-top:20px;">
        <van-button size="large" @click="feedback()">提交</van-button>
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
export default class feedback extends Vue {

  content="";
  feedback() {
    if(this.content==""){
      Toast('请输入反馈内容');
      return
    }
    Vue.prototype.$reqFormPost(
      "/feedback/add",
      {
        userId: this.$store.getters[
            Vue.prototype.MutationTreeType.TOKEN_INFO
        ].userId,
        token: this.$store.getters[
            Vue.prototype.MutationTreeType.TOKEN_INFO
        ].token,
        content:this.content
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
        Toast('已提交');        
        console.log('res.data',res.data)
        this.$router.go(-1);
      }
    );
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