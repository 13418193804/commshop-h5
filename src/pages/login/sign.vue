<template>
  <div class="tab-contents">

        <div class="bodyLabel">

<div style="text-align:center;">
<van-field v-model="loginName"  label="用户名" placeholder="请输入用户名" />

<van-field v-model="password" type="password"  label="密码" placeholder="输入6-12位密码" />
<van-field v-model="repassword" type="password"  label="密码" placeholder="确认密码" />


<van-cell-group>
  <van-field
    center
    v-model="code"
    label="　"
    placeholder="请输入验证码"
    icon="clear"
    @click-icon="code = ''"
  >
    <van-button slot="button" size="small" type="primary" @click="getVistyCode()">{{vistyText()}}</van-button>
  </van-field>
</van-cell-group>


<van-button size="normal" :block="true" style="margin:20px 0;" @click="doSign()">立即注册</van-button>

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

// import { recommendList } from '../../service/getData';

@Component({
  components: {},
  mixins: [mixin]
}) 
export default class Sign extends Vue {
         @Action("setLoginVerifyCode") setLoginVerifyCode;
        loginName=""
          password=""
        repassword=""
        code=""
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
          Vue.prototype.$reqFormPost("/auth/getsmscode",{mobile:this.loginName	},res => {
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
 doSign(){
    //验证

     Vue.prototype.$reqFormPost("/auth/register",{
       mobile:this.loginName,
       password:this.password,
       code:this.code,
       recommontId:"001"//推荐者ID
       },res => {
        if (res == null) {
          console.log("网络请求错误！");
          return;
        }
        if (res.data.status != 200) {
         
Toast(res.data.message)

          return;
        }
        Toast("注册成功")
        this.$router.push("/login")
      })
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
     padding:90px 20px;
}
</style>


