 <template>
  <div class="tab-contents" style="height:-webkit-fill-available;background-color:#f3f3f3;">
        <comhead ref="comhead" isLeftIcon="icon-zuo" leftIconName="angle-left" @leftClick="false"  title="基本信息" isRightIcon="true" ></comhead>

    <van-cell-group>
        <van-uploader :after-read="onRead" style="width: 100%;height: 100%;" accept="image/jpg,image/png, image/jpeg" >
          <van-cell is-link>
              <template slot="title">
                <span class="van-cell-text" :style="handlePX('line-height',60)">头像</span>
              </template>
              <div :style="handlePX('height',60)">
                  <img v-if="userIcon" v-lazy="userIcon" :style="handlePX('width',60)+handlePX('height',60)" style="border-radius:50%;"/>
                  <img v-else src="../../assets/image/userIcon.png" :style="handlePX('width',60)+handlePX('height',60)" style="border-radius:50%;"/>
              </div>
          </van-cell>
        </van-uploader>
        <van-cell title="用户名" is-link :value="nickName" @click="go_updatenickName()"/>
        <van-cell title="性别" is-link :value="sex" @click="go_updatesex()"/>
        <van-cell title="手机" is-link :value="loginName"/>
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
export default class essential_information extends Vue {

  userIcon="";
  nickName="";
  sex="";
  loginName="";

  queryuser() {
    Vue.prototype.$reqFormPost(
      "/user/query",
      {
        userId: this.$store.getters[
            Vue.prototype.MutationTreeType.TOKEN_INFO
        ].userId,
        token: this.$store.getters[
            Vue.prototype.MutationTreeType.TOKEN_INFO
        ].token,
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
        this.userIcon=res.data.data.userIcon;
        this.nickName=res.data.data.nickName;
        this.sex=res.data.data.sex;
        this.loginName=res.data.data.loginName;
      }
    );
  }
  go_updatenickName(){
    this.$router.push({
      path: "/update_info",
      query: {
        updatename: 'nickName',
        nickName:this.nickName
      }
    });
  }
  go_updatesex(){
    this.$router.push({
      path: "/update_info",
      query: {
        updatename: 'sex',
        sex:this.sex
      }
    });
  }
  onRead(file) {
    let form = new FormData();
    form.append("file", file.file);
    Vue.prototype.$reqFormUpload("/fileupload", form, res => {
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
      console.log("文件上传", res.data.data.filename);
      this.updateuserinfo(res.data.data.filename)
    });
  }
  updateuserinfo(userIcon){
    Vue.prototype.$reqFormPost(
      "/user/update",
      {
        userId: this.$store.getters[
            Vue.prototype.MutationTreeType.TOKEN_INFO
        ].userId,
        token: this.$store.getters[
            Vue.prototype.MutationTreeType.TOKEN_INFO
        ].token,
        userIcon:userIcon
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
        console.log('updateuserinfo',res.data)
        this.queryuser();
      });
  }
  handlePX(CssName, PxNumber) {
    return CssName +":" +this.$store.getters[Vue.prototype.MutationTreeType.SYSTEM].availWidth /750 * PxNumber +"px;";
  }


  mounted() {
      this.queryuser();
      console.log("收藏页面")
  }

}
</script>

<style lang="scss" scoped>
@import "../../style/utils.scss";
</style>