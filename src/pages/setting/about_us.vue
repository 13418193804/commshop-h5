 <template>
  <div class="tab-contents" style="height:-webkit-fill-available;background-color:#f4f4f4;">
    <comhead ref="comhead" isLeftIcon="icon-zuo" leftIconName="angle-left" @leftClick="false"  title="关于我们" isRightIcon="true" ></comhead>

    <div :style="handlePX('padding-top',40)+handlePX('padding-bottom',60)" style="display: flex;flex-direction: column;align-items: center;">
        <img v-lazy="'1'" :style="handlePX('width',120)+handlePX('height',120)"/>
        <div :style="handlePX('margin-top',35)">版本号 V1.0.0</div>
    </div>
    
    <van-cell-group>
        <van-cell title="版本号" value="V1.0.0" />
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
export default class about_us extends Vue {

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