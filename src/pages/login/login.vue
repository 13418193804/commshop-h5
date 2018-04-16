<template>
  <div class="tab-contents">

    <div class="bodyLabel">

      <div :style="handlePX('margin-top',230)" style="text-align:center;">
        <img v-lazy="'1'" :style="handlePX('width',200)+handlePX('height',200)" style="border-radius: 50%;margin-bottom:30px">
        <van-field class="login-input" v-model="loginName"  placeholder="请输入用户名" :style="handlePX('width',620)+handlePX('height',90)+handlePX('font-size',30)" style="margin:0 0 16px;"/>

        <van-field class="login-input" v-model="password" type="password"  placeholder="请输入密码" :style="handlePX('width',620)+handlePX('height',90)+handlePX('font-size',30)"/>

        <van-button class="login-button" size="normal" :block="true"  :style="handlePX('width',620)+handlePX('height',90)+handlePX('line-height',88)+handlePX('font-size',34)" @click="doLogin()" style="margin:35px 0 15px;">登录</van-button>

        <div class="tips">
          <div>
            <img v-lazy="'1'" :style="handlePX('width',35)+handlePX('height',35)">
            <a url="#" :style="handlePX('line-height',35)+handlePX('font-size',28)">注册新用户</a>
          </div>
          <div :style="handlePX('width',4)+handlePX('height',25)" style="background-color:#A3A3A3;margin:5px 15px;"></div>
          <div>
            <img v-lazy="'1'" :style="handlePX('width',35)+handlePX('height',35)">
            <a url="#" :style="handlePX('line-height',35)+handlePX('font-size',28)">忘记密码?</a>
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
// import { recommendList } from '../../service/getData';

@Component({
  components: {},
  mixins: [mixin]
})
export default class shopIndex extends Vue {
  loginName = "13418193804";
  password = "5164659";
  @Action("setTokenInfo") setTokenInfo;

  clearLoginName() {
    //  this.loginName = ""
    console.log(111);
  }
  doLogin() {
    if (this.loginName == "" || this.password == "") {
      return;
    }
    Vue.prototype.$reqFormPost(
      "/auth/user/login",
      {
        loginName: this.loginName,
        password: this.password
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
        this.$router.push("/");
      }
    );
  }

  handlePX(CssName, PxNumber) {
    return CssName +":" +this.$store.getters[Vue.prototype.MutationTreeType.SYSTEM].availWidth /750 * PxNumber +"px;";
  }
  methods:{

  }
}
</script>

<style lang="scss" scoped>
@import "../../style/utils.scss";
.bodyLabel {
  width: 100%;
  // height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.tips {
  display: flex;
  flex-direction: row;
  justify-content: center;
  div img {
    vertical-align: top;
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
.login-input {
  padding-left:15px;
  vertical-align: baseline;
  color: #000000;
  box-sizing: border-box;
  border: 1px solid #d2d2d2;
  border-radius: 8px;
}
</style>


