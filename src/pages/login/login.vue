<template>
  <div class="tab-contents">

        <div class="bodyLabel">

<div style="text-align:center;">
<img v-lazy="'1'" style="width:100px;height:100px;    border-radius: 50px;margin:20px 0;">
<van-field v-model="loginName"  label="用户名" placeholder="请输入用户名" />

<van-field v-model="password" type="password"  label="密码" placeholder="请输入密码" />

<van-button size="normal" :block="true" style="margin:20px 0;" @click="doLogin()">登陆</van-button>

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
export default class shopIndex extends Vue {




 loginName="13418193804"
 password="5164659"
         @Action("setTokenInfo") setTokenInfo;
 
 clearLoginName(){
    //  this.loginName = ""
    console.log(111)
 }
 doLogin(){
if(this.loginName == "" || this.password == ""){
    return 
}
   Vue.prototype.$reqFormPost("/auth/user/login",{
        loginName:this.loginName,
 password:this.password
   },res => {
        if (res == null) {
          console.log("网络请求错误！");
          return;
        }
        console.log(res);
        
        if (res.data.status != 200) {
          console.log(
            "需控制错误码" + res.data.status + ",错误信息：" + res.data.message
          );
            Toast(res.data.message)
          return;
        }

        this.setTokenInfo(res.data.data)
        localStorage.setItem(Vue.prototype.MutationTreeType.TOKEN_INFO, JSON.stringify(res.data.data))
        this.$router.push("/")


      })
      

 }
  mounted() {
   
  }
}
</script>

<style lang="scss" scoped>
@import "../../style/utils.scss";
.bodyLabel{
    width:100%;
    height:100vh;
    display:flex;
     align-items: center;justify-content: center;
}
</style>


