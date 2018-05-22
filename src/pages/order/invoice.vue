 <template>
  <div class="tab-contents" style="height:-webkit-fill-available;background-color:#f3f3f3;">
    <comhead ref="comhead" isLeftIcon="icon-zuo" leftIconName="angle-left" @leftClick="false"  title="发票信息"  rightTitle="保存" @rightClick="save()" ></comhead>

    <van-radio-group v-model="radio">
        <van-cell-group>
            <van-cell title="个人" clickable @click="radio = '1'">
            <van-radio name="1" />
            </van-cell>
            <van-cell title="单位" clickable @click="radio = '2'">
            <van-radio name="2" />
            </van-cell>
        </van-cell-group>
    </van-radio-group>
    <van-cell-group style="margin-top: 5px;">
        <van-cell title="抬头" v-if="radio=='1'">
            <template>
                <div style="text-align: right;">个人</div>
            </template>
        </van-cell>
        <van-cell title="抬头" v-if="radio=='2'">
            <template>
                <input type="text" class="van-field__control" v-model="invoiceTitle" style="text-align: right;"/>
            </template>
        </van-cell>
        <van-cell title="纳税人识别号" v-if="radio=='2'">
            <template>
                <input type="text" class="van-field__control" v-model="invoiceNo" style="text-align: right;"/>
            </template>
        </van-cell>
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
export default class invoice extends Vue {
    radio='1';
    invoiceTitle="";
    invoiceNo="";

  save(){
      if(this.radio=='1'){
        this.$router.replace({
            path: "/settle",
            query: {
                titleType: 'PERSON',
            }
        });
      }else if(this.radio=='2'){
          if(this.invoiceTitle==""){
              Toast("请输入抬头");
              return;
          }
          if(this.invoiceNo==""){
              Toast("请输入纳税人识别号");
              return;              
          }
          this.$router.replace({
            path: "/settle",
            query: {
                titleType: 'COMPANY',
                invoiceTitle:this.invoiceTitle,
                invoiceNo:this.invoiceNo,
            }
        });
      }
  }
  handlePX(CssName, PxNumber) {
    return CssName +":" +this.$store.getters[Vue.prototype.MutationTreeType.SYSTEM].availWidth /750 * PxNumber +"px;";
  }


  mounted() {
    
    console.log("发票信息")
  }

}
</script>

<style lang="scss" scoped>
@import "../../style/utils.scss";
</style>