<template>
  <div class="tab-contents">
<comhead ref="comhead" isLeftIcon="icon-zuo" leftIconName="angle-left" @leftClick="false"  title="密码找回" isRightIcon="true"  ></comhead>
        <div class="bodyLabel" >

<div style="text-align:center;" :style="handlePX('margin-top',80)">
<van-field class="sign-input" v-model="loginName" type="number"   placeholder="请输入手机号码"  :style="handlePX('width',620)+handlePX('margin-bottom',36)+handlePX('height',90)" />

<div class="sign-code-group">
<van-field class="sign-input" v-model="smsCode" placeholder="请输入验证码" :style="handlePX('width',295)+handlePX('height',90)"/>
<van-button class="sign-mini-button" slot="button" size="small" type="primary" @click="getVistyCode()" :style="handlePX('width',295)+handlePX('height',90)">{{vistyText()}}</van-button>
</div>

<van-field class="sign-input" v-model="password" type="password" placeholder="请输入新密码" :style="handlePX('width',620)+handlePX('margin-top',36)+handlePX('height',90)"/>
<van-field class="sign-input" v-model="repassword" type="password" placeholder="请再一次输入新密码" :style="handlePX('width',620)+handlePX('margin-top',36)+handlePX('height',90)"/>

<van-button class="sign-button" size="normal" :block="true" style="margin:20px 0;" @click="doforget()" :style="handlePX('width',620)+handlePX('margin-top',390)+handlePX('height',90)">保存</van-button>
 

</div>  

        </div>

  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import mixin from "../../config/mixin";
import { Action } from "vuex-class";
import { Toast } from 'vant';
import comhead from "../../components/Comhead.vue";

// import { recommendList } from '../../service/getData';

@Component({
  components: {
    comhead
  },
  mixins: [mixin]
}) 
export default class forget extends Vue {
         @Action("setLoginVerifyCode") setLoginVerifyCode;
        loginName=""
        password=""
        repassword=""
        smsCode=""
        isGetverify =true//当前允许发送验证码
        timerNum=60
        timer=60
        timelop(){
            let self = this;

            console.log('获取验证码')
            self.timer = setInterval(function(){
                    self.isGetverify =true
                if(self.timerNum >=1){
                    self.timerNum--;
                }else{
                    clearInterval(self.timer);
                    self.timerNum = 60;
                }
                  // let verInfo={
                  //       type : 'setsign',
                  //       num : self.timerNum
                  //   }
                self.setLoginVerifyCode(self.timerNum);                
           
                console.log(self.timerNum)
            },1000)
            
        }
    
  getVistyCode() {
//验证手机号码

            if (!this.isGetverify) {
              return 
            }
            
            //getCode
          Vue.prototype.$reqFormPost("/auth/getsmscode",{mobile:this.loginName	,type:'FINDPASSWORD'},res => {
        if (res == null) {
          console.log("网络请求错误！");
          return;
        }
        if (res.data.status != 200) {
          console.log(
            "需控制错误码" + res.data.status + ",错误信息：" + res.data.message
          );
Toast(res.data.message)

          return;
        }
        Toast("发送成功")
            this.timelop();
      })


        }
        vistyText() {

            if (this.$store.getters[Vue.prototype.MutationTreeType.VERCODE] < 60) {
                this.isGetverify = false
                return this.$store.getters[Vue.prototype.MutationTreeType.VERCODE] + 's'
            } else {
                this.isGetverify = true
                return '获取验证码'
            }
        }
 doforget(){
    //验证
    console.log('点击保存按钮')
    if (this.password == "" || this.repassword == "") {
        console.log('密码为空')
        
      return;
    }
    if(this.password != this.repassword){
        console.log('两次密码不正确')
        return;        
    }
    Vue.prototype.$reqFormPost("/user/password/find",{
       mobile:this.loginName,
       password:require('crypto').createHash('md5').update(this.loginName+this.password).digest('hex'),
       smsCode:this.smsCode,
       },res => {
        if (res == null) {
          console.log("网络请求错误！");
          return;
        }
        if (res.data.status != 200) {
         
            Toast(res.data.message)

          return;
        }
        Toast("保存成功")
        this.$router.push("/login")
      })
 }  
 handlePX(CssName, PxNumber) {
    return CssName +":" +this.$store.getters[Vue.prototype.MutationTreeType.SYSTEM].availWidth /750 * PxNumber +"px;";
  }
  mounted() {


    if(this.$store.getters[Vue.prototype.MutationTreeType.VERCODE] < 60){
            this.timerNum = this.$store.getters[Vue.prototype.MutationTreeType.VERCODE];
            // this.isGetverify= true;
            this.timelop();
            }
  }
}
</script>

<style lang="scss" scoped>
@import "../../style/utils.scss";
.bodyLabel{
    width:100%;
    height:100vh;
    display:flex;
     align-items: flex-start;justify-content: center;
}
.sign-button {
  color: #ffffff;
  background-color: #f4c542;
  border-radius: 8px;
}
.sign-input {
  vertical-align: baseline;
  color: #000000;
  box-sizing: border-box;
  border: 1px solid #d2d2d2;
  border-radius: 8px;
}
.sign-mini-button{
  background-color: #fff;
  color: #f4c542;
  border: 1px solid #f4c542;
  border-radius: 8px;
}
.sign-code-group{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>