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
                <div style="text-align: right;">个人</div>
            </template>
        </van-cell>
        <van-cell title="抬头" v-if="titleType=='COMPANY'">
            <template>
                <input type="text" class="van-field__control" v-model="invoiceTitle" style="text-align: right;"/>
            </template>
        </van-cell>
        <van-cell title="纳税人识别号" v-if="titleType=='COMPANY'">
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
    titleType='1';
    invoiceTitle="";
    invoiceNo="";

  save(){
      if(this.titleType=='PERSON'){
        this.$router.replace({
            path: "/settle",
            query: {
                titleType: 'PERSON',
            }
        });
      }else if(this.titleType=='COMPANY'){
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

  console.log(  this.$route.query )
    
this.titleType =  this.$route.query.titleType

if( this.$route.query.titleType =='COMPANY'){
            this.invoiceTitle=this.$route.query.invoiceTitle;
        this.invoiceNo=this.$route.query.invoiceNo;
}else{
                this.invoiceTitle="";
        this.invoiceNo="";
}

    //  this.titleType='COMPANY';
        // this.titlevalue='单位';        

  }

}
</script>

<style lang="scss" scoped>
@import "../../style/utils.scss";
</style>