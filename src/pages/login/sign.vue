<template>
  <div class="tab-contents">
<comhead ref="comhead" isLeftIcon="icon-zuo"  @leftClick="false"  title="用户注册"   ></comhead>
        <div class="bodyLabel" :style="handlePX('padding-top',80)">

<div style="text-align:center;">
<van-field class="sign-input" v-model="loginName" type="number"  placeholder="请输入手机号码"  :style="handlePX('width',620)+handlePX('margin-bottom',36)+handlePX('height',90)" />

<!-- <van-cell-group>
  <van-field
    center
    v-model="code"
    placeholder="请输入验证码"
    icon="clear"
    @click-icon="code = ''"
  >
    <van-button class="sign-mini-button" slot="button" size="small" type="primary" @click="getVistyCode()">{{vistyText()}}</van-button>
  </van-field>
</van-cell-group> -->
<div class="sign-code-group">
<van-field class="sign-input" v-model="code" placeholder="请输入验证码" :style="handlePX('width',295)+handlePX('height',90)"/>
<van-button class="sign-mini-button" slot="button" size="small" type="primary" @click="getVistyCode()" :style="handlePX('width',295)+handlePX('height',90)">{{vistyText()}}</van-button>
</div>

<van-field class="sign-input" v-model="password" type="password" placeholder="请输入6位以上密码" :style="handlePX('width',620)+handlePX('margin-top',36)+handlePX('height',90)"/>
<van-field class="sign-input" v-model="repassword" type="password" placeholder="请确认密码" :style="handlePX('width',620)+handlePX('margin-top',36)+handlePX('height',90)"/>

<van-button class="sign-button" size="normal" :block="true" style="margin:20px 0;" @click="doSign()" :style="handlePX('width',620)+handlePX('margin-top',390)+handlePX('height',90)">立即注册</van-button>
<div><p style="color:#d2d2d2;">注册表示您同意<a href="#" style="color:#f4c542;" @click="$router.push('/signtext')">《用户协议》</a></p></div>  
</div>
        </div>

<div style=" position: relative;">
  <div style="background-color:rgba(0, 0, 0, 0.498039);    z-index: 99999;position: fixed;width: 100%;height: 100vh;top:0;" class="flex  flex-align-center flex-pack-center" v-show="keepModel" >
<div style="width: 70%;">

      <div class="sign_success flex  flex-align-center flex-pack-center">
        <div style="text-align:center;">
          <div style="font-size:22px;">账号注册成功</div>
            <img  src="../../assets/image/图案@2x.png" style="margin:20px 0;width: 55%;"/>
<div class="openApp" @click="openApp">打开App</div>
</div>

      </div>

<div class="flex  flex-align-center flex-pack-center" style="margin-top: 45px;" >
            <img  src="../../assets/image/关闭@2x.png" style="width:22px;" @click="keepModel = false"/>
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
import comhead from "../../components/Comhead.vue";

// import { recommendList } from '../../service/getData';

@Component({
  components: {
    comhead
  },
  mixins: [mixin]
})
export default class Sign extends Vue {
  @Action("setLoginVerifyCode") setLoginVerifyCode;
  loginName = "";
  password = "";
  repassword = "";
  code = "";
  isGetverify = true; //当前允许发送验证码
  timerNum = 60;
  timer = 60;
  recommontId = "";
  keepModel = false
  timelop() {
    let self = this;
    self.timer = setInterval(function() {
      self.isGetverify = true;
      if (self.timerNum >= 1) {
        self.timerNum--;
      } else {
        clearInterval(self.timer);
        self.timerNum = 60;
      }
      // let verInfo={
      //       type : 'setsign',
      //       num : self.timerNum
      //   }
      self.setLoginVerifyCode(self.timerNum);
    }, 1000);
  }

  getVistyCode() {
    //验证手机号码
    if ((this.loginName || "") == "") {
      Toast("请输入手机号码");
      return;
    }
    if (this.loginName.length != 11) {
      Toast("手机号码格式不对");
      return;
    }

    if (!this.isGetverify) {
      return;
    }

    //getCode
    Vue.prototype.$reqFormPost(
      "/auth/getsmscode",
      { mobile: this.loginName, type: "REGISTER" },
      res => {
        if (res == null) {
          console.log("网络请求错误！");
          return;
        }
        if (res.data.status != 200) {
          console.log(
            "需控制错误码" + res.data.status + ",错误信息：" + res.data.message
          );
          Toast(res.data.message);

          return;
        }
        Toast("发送成功");
        this.timelop();
      }
    );
  }
  openApp(){
    window.location.href = "https://m.yourhr.com.cn/transmit.html"
  }
  vistyText() {
    if (this.$store.getters[Vue.prototype.MutationTreeType.VERCODE] < 60) {
      this.isGetverify = false;
      return this.$store.getters[Vue.prototype.MutationTreeType.VERCODE] + "s";
    } else {
      this.isGetverify = true;
      return "获取验证码";
    }
  }
  doSign() {
   if ((this.loginName || "") == "") {
      Toast("请输入手机号码");
      return;
    }
       if ((this.code || "") == "") {
      Toast("请输入验证码");
      return;
    }
       if ((this.code || "") == "") {
      Toast("请输入密码");
      return;
    }
    //验证
    if (this.password.length < 6) {
      Toast("请输入最少6位的密码");
      return;
    }
    if(this.password != this.repassword){
      Toast('两次输入密码不一致 ')
      return
    }
    Vue.prototype.$reqFormPost(
      "/auth/register",
      {
        loginName: this.loginName,
        password: require("crypto")
          .createHash("md5")
          .update(this.password)
          .digest("hex"),
        code: this.code,
        recommontId: this.recommontId //推荐者ID
      },
      res => {
        if (res == null) {
          console.log("网络请求错误！");
          return;
        }
        if (res.data.status != 200) {
          Toast(res.data.message);

          return;
        }

      if((this.recommontId||'')===''){
        Toast("注册成功");
        this.$router.push("/login");

      }else{
        this.keepModel = true
      }



      }
    );
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
    this.recommontId = this.$route.query.recommontId
      ? this.$route.query.recommontId
      : "";
    if (this.$store.getters[Vue.prototype.MutationTreeType.VERCODE] < 60) {
      this.timerNum = this.$store.getters[
        Vue.prototype.MutationTreeType.VERCODE
      ];
      // this.isGetverify= true;
      this.timelop();
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../style/utils.scss";
.bodyLabel {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: flex-start;
  justify-content: center;
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
.sign-mini-button {
  background-color: #fff;
  color: #f4c542;
  border: 1px solid #f4c542;
  border-radius: 8px;
}
.sign-code-group {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.sign_success{
  background-color: #fff;
        padding:20px;
    border-radius: 14px;
}
.openApp{
    background-color: rgb(254, 197, 47);
    color:#fff;
    border-radius: 2px;
    padding: 10px;margin:10px;
}
</style>


