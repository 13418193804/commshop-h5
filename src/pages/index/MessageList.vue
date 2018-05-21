<template>
  <div class="messagePage">

    <comhead ref="comhead" isLeftIcon="icon-zuo" leftIconName="angle-left" @leftClick="false"  title="消息中心" isRightIcon="true"  ></comhead>

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

// //MD5加密
// export const md5Encrypt = (encryptString) => {
//     let md5 = crypto.createHash('md5').update(encryptString).digest('hex');
//     return md5;
// };

@Component({
  components: {
          comhead
  },
  mixins: [mixin]
})
export default class shopIndex extends Vue {
  
  mounted() {
    
  }
}
</script>

<style lang="scss" scoped>
@import "../../style/utils.scss";

.messagePage{
    background-color:#f7f7f7;
    height:100vh;
    width:100%;
}
</style>


