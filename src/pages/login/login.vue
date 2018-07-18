<template>
  <div class="tab-contents">

    <div class="bodyLabel" :style="handlePX('padding-left',65)+handlePX('padding-right',65)">

      <div style="text-align:center;">
        <img src="../../assets/image/LOGO.png" :style="handlePX('width',200)+handlePX('height',200)" style="margin-bottom:30px">
        <van-field class="login-input" v-model="loginName" type="number"   placeholder="请输入用户名" :style="handlePX('width',620)+handlePX('font-size',30)+handlePX('padding-left',30)+handlePX('height',90)" style="margin:0 0 16px;"/>
        <van-field class="login-input" v-model="password" type="password"    placeholder="请输入密码" :style="handlePX('width',620)+handlePX('font-size',30)+handlePX('padding-left',30)+handlePX('height',90)"/>

        <van-button class="login-button" size="normal" :block="true"  :style="handlePX('width',620)+handlePX('line-height',88)+handlePX('font-size',34)+handlePX('height',90)" @click="doLogin()" style="margin:35px 0 15px;">登录</van-button>
        <van-button class="login-button-cancel" size="normal" :block="true"  :style="handlePX('width',620)+handlePX('line-height',88)+handlePX('font-size',34)+handlePX('height',90)" @click="goback()" style="margin:5px 0 15px;">取消</van-button>

        <div class="tips">
          <div @click="gosign()">
            <img src="../../assets/image/新用户注册.png" :style="handlePX('width',35)+handlePX('height',35)">
            <span  :style="handlePX('line-height',35)+handlePX('font-size',28)">注册新用户</span>
          </div>
          <div :style="handlePX('width',4)+handlePX('height',25)" style="background-color:#A3A3A3;margin:5px 15px;"></div>
          <div @click="goforget()">
            <img src="../../assets/image/忘记密码.png" :style="handlePX('width',35)+handlePX('height',35)">
            <span  :style="handlePX('line-height',35)+handlePX('font-size',28)">忘记密码?</span>
          </div>
        </div>

</div>

        </div>

  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import mixin from "../../config/mixin";
import { Action } from "vuex-class";
import { Toast } from "vant";
import axios from "axios";

// import { recommendList } from '../../service/getData';

// //MD5加密
// export const md5Encrypt = (encryptString) => {
//     let md5 = crypto.createHash('md5').update(encryptString).digest('hex');
//     return md5;
// };

@Component({
  components: {},
  mixins: [mixin]
})
export default class shopIndex extends Vue {
  loginName = "";
  password = "";
  @Action("setTokenInfo") setTokenInfo;

  clearLoginName() {
    console.log(111);
  }
  doLogin() {
    if (this.loginName == "" ) {
      Toast('请输入手机号码')
      return;
    }
    if( this.password == ""){
      Toast('请输入密码')
      return
    }
    Vue.prototype.$reqFormPost(
      "/auth/user/login",
      {
        loginName: this.loginName,
        password: require('crypto').createHash('md5').update(this.password).digest('hex')
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

        this.setTokenInfo(res.data.data);
        localStorage.setItem(
          Vue.prototype.MutationTreeType.TOKEN_INFO,
          JSON.stringify(res.data.data)
        );

        if(this.isWeixinBrowser()){
          // 跨域
    // axios.get('https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx2e2d97a4e10ef2b6&redirect_uri=http://sr.cncloud.com/qichang/wechat/enter/bind?action=viewtest&response_type=code&scope=snsapi_base&state=UI5ad94ae15b065d55ac86ae0d#wechat_redirect')
    //     .then(res => {
        
    //      console.log(res.data)
    //     }
    //     )
    //     .catch(error => error);

        }
        this.$router.push("/");
      }
      
    );
  }
  gosign() {
    this.$router.push("/sign");
  }
  goforget() {
    this.$router.push("/forget");
  }
  goback() {
    this.$router.go(-1);
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

    isWeixinBrowser() {
  　var ua = navigator.userAgent.toLowerCase();
　　var isWeixin = ua.indexOf('micromessenger') != -1;
　　if (isWeixin) {
   　　 return true;
　　}else{
   　　 return false;      
　　}
}

  mounted() {

  }
}
</script>

<style lang="scss" scoped>
@import "../../style/utils.scss";
.bodyLabel {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.tips {
  display: flex;
  flex-direction: row;
  justify-content: center;
  div img {
    vertical-align: middle;
  }
  div a {
    color: #a3a3a3;
    display: inline-block;
  }
}
.login-button {
  color: #ffffff;
  background-color: #f4c542;
  border-radius: 8px;
}
.login-button-cancel {
  border-color: #f4c542;
  color: #f4c542;
  background-color: #ffffff;
  border-radius: 8px;
}
.login-input {
  vertical-align: baseline;
  color: #000000;
  box-sizing: border-box;
  border: 1px solid #d2d2d2;
  border-radius: 8px;
}
</style>


