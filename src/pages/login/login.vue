<template>
  <div class="tab-contents">

    <div class="bodyLabel">

      <div style="text-align:center;margin-top:230px;">
        <img v-lazy="'1'"  style="width:200px;height:200px;border-radius: 50px;margin:0 0 70px;">
        <van-field v-model="loginName"  placeholder="请输入用户名" style="margin-bottom:36px;"/>

        <van-field v-model="password" type="password"  placeholder="请输入密码" style="margin-bottom:70px;"/>

        <van-button size="normal" :block="true" style="margin:70px 0 30px;" @click="doLogin()">登录</van-button>

        <div class="tips">
          <div>
            <img v-lazy="'1'">
            <a url="#">注册新用户</a>
          </div>
          <div style="width:4px;height:25px;background-color:#A3A3A3;margin:5px 15px;"></div>
          <div>
            <img v-lazy="'1'">
            <a url="#">忘记密码?</a>
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
  mounted() {}
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

.tips{
  display:flex;
  flex-direction:row;
  justify-content: center;
  div img{
    width:35px;
    height:35px;
    vertical-align:top;
  }
  div a{
    font-size:28px;
    color:#A3A3A3;
    line-height:35px;
    display: inline-block;
  }
}
</style>


