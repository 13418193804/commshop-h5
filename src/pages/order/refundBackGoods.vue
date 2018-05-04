<template>
  <div class="tab-contents" style="height:-webkit-fill-available;background-color:#f7f7f7;">
            <comhead ref="comhead" isLeftIcon="icon-zuo" @rightClick="save()" rightTitle="提交" leftIconName="angle-left" @leftClick="false"  title="物流单号填写"  ></comhead>
     
<div style="margin:20px ;text-align:center;">
<select v-model="form.item">
    <option v-for="(item,index) in tranSportList" :value="item" :label="item.transportName"></option>
</select>
</div>
 <van-field class="login-input" v-model="form.transNo"  placeholder="请输入物流单号" :style="handlePX('width',620)+handlePX('font-size',30)+handlePX('padding-left',30)+handlePX('height',90)" style="margin:0 auto;"/>

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
class form {
    transNo
    refundId
    item
    
    transName
    transCode
}
@Component({
  components: { comhead },
  mixins: [mixin]
})

export default class shopIndex extends Vue {
 form=new form;
tranSportList = []
  mounted() {
      this.getTranSportList()
      console.log("支付成功",this.$route.query.refundId	);
      this.form.refundId	 = this.$route.query.refundId	;
  }
    save(){
        if((this.form.transNo||'') ==''){
            Dialog.alert({
  title: '标题',
  message: '请填写单号'
}).then(() => {
  // on close
});
return

        }

    
if(!this.form.item){
            Dialog.alert({
  title: '标题',
  message: '请选择快递公司'
}).then(() => {
  // on close
});
return
        }


        this.form.transName = this.form.item.transportName ;
        this.form.transCode = this.form.item.transportId;
       
            
       
       

 Vue.prototype.$reqFormPost(
          "/order/refund/salesreturn",
          (<any>Object).assign(
        {
          userId: this.$store.getters[Vue.prototype.MutationTreeType.TOKEN_INFO]
            .userId,
          token: this.$store.getters[Vue.prototype.MutationTreeType.TOKEN_INFO]
            .token
        },
        this.form
      ),
          res => {
            if (res == null) {
              console.log("网络请求错误！");
              return;
            }
            if (res.data.status != 200) {
              console.log(
                "需控制错误码" +
                  res.data.status +
                  ",错误信息：" +
                  res.data.message
              );
              Toast(res.data.message);
              return;
            }
            this.$router.go(-1)

          }
        );
    }
    getTranSportList(){
         Vue.prototype.$reqFormPost(
          "/transport/cominfo",
          {},
          res => {
            if (res == null) {
              console.log("网络请求错误！");
              return;
            }
            if (res.data.status != 200) {
              console.log(
                "需控制错误码" +
                  res.data.status +
                  ",错误信息：" +
                  res.data.message
              );
              Toast(res.data.message);
              return;
            }
this.tranSportList =res.data.data
            console.log("物流信息",res.data.data);
          }
        );
    }
  handlePX(CssName, PxNumber) {
    return CssName +":" +this.$store.getters[Vue.prototype.MutationTreeType.SYSTEM].availWidth /750 * PxNumber +"px;";
  }

}
</script>

<style lang="scss" scoped>
@import "../../style/utils.scss";
.login-input {
  vertical-align: baseline;
  color: #000000;
  box-sizing: border-box;
  border: 1px solid #d2d2d2;
  border-radius: 8px;
}
</style>


