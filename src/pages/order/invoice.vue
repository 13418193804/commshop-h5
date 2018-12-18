 <template>
  <div class="tab-contents" style="height:-webkit-fill-available;background-color:#f3f3f3;">
    <comhead ref="comhead" isLeftIcon="icon-zuo" leftIconName="angle-left" @leftClick="false"  title="发票信息"  rightTitle="保存" @rightClick="save()" ></comhead>
    <van-radio-group v-model="titleType">
        <van-cell-group>
            <van-cell title="个人" clickable @click="titleType = 'PERSON'">
            <van-radio name="PERSON" />
            </van-cell>
            <van-cell title="单位" clickable @click="titleType = 'COMPANY'">
            <van-radio name="COMPANY" />
            </van-cell>
        </van-cell-group>
    </van-radio-group>
    <van-cell-group style="margin-top: 5px;">
        <van-cell title="抬头" v-if="titleType=='PERSON'">
            <template>
                <input type="text" class="van-field__control" v-model="PERSON_invoiceTitle" style="text-align: right;"/>
            </template>
        </van-cell>
        <van-cell title="抬头" v-if="titleType=='COMPANY'">
            <template>
                <input type="text" class="van-field__control" v-model="COMPANY_invoiceTitle" style="text-align: right;"/>
            </template>
        </van-cell>
        <van-cell title="纳税人识别号" v-if="titleType=='COMPANY'">
            <template>
                <input type="text" class="van-field__control" v-model="COMPANY_invoiceNo" style="text-align: right;"/>
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
  titleType = "PERSON";
  PERSON_invoiceTitle = "个人";
  invoiceNo = "";
  COMPANY_invoiceTitle = "";
  COMPANY_invoiceNo = "";
  save() {
    sessionStorage.handleSave = "true";
    if (
      (this.titleType == "PERSON" && this.PERSON_invoiceTitle == "") ||
      (this.titleType == "COMPANY" && this.COMPANY_invoiceTitle == "")
    ) {
      Toast("请输入抬头");
      return;
    }
    if (this.titleType == "COMPANY" && this.COMPANY_invoiceNo == "") {
      Toast("请输入纳税人识别号");
      return;
    }

    this.$router.replace({
      path: "/settle",
      query: {
        titleType: this.titleType,
        PERSON_invoiceTitle: this.PERSON_invoiceTitle,
        COMPANY_invoiceTitle: this.COMPANY_invoiceTitle,
        COMPANY_invoiceNo: this.COMPANY_invoiceNo
      }
    });
  }

  handlePX(CssName, PxNumber) {
    return (
      CssName +
      ":" +
      this.$store.getters[Vue.prototype.MutationTreeType.SYSTEM].availWidth /
        750 *
        PxNumber +
      "px;"
    );
  }

  mounted() {
    console.log("发票信息");
    console.log(this.$route.query);
    this.titleType = this.$route.query.titleType;
    this.COMPANY_invoiceTitle = this.$route.query.COMPANY_invoiceTitle;
    this.COMPANY_invoiceNo = this.$route.query.COMPANY_invoiceNo;
    this.PERSON_invoiceTitle = this.$route.query.PERSON_invoiceTitle ||'个人';

    //  this.titleType='COMPANY';
    // this.titlevalue='单位';
  }
}
</script>

<style lang="scss" scoped>
@import "../../style/utils.scss";
</style>