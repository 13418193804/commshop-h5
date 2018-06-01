<template>
  <div class="tab-contents" style="height:-webkit-fill-available;background-color:#fafafa;">
        <comhead ref="comhead" isLeftIcon="icon-zuo" leftIconName="angle-left"  @leftClick="false"  title="评价"  ></comhead>
  <div style="margin-bottom:10px;background-color:#ffffff;">
    <div :style="handlePX('margin-top',30)+handlePX('margin-left',30)" class="flex">
        <div>
            <img v-lazy="detailList.goodsImg" :style="handlePX('width',150)+handlePX('height',150)"/>
        </div>
        <div :style="handlePX('margin-left',30)">
            <div>{{detailList.goodsName}}</div>
            <div style="color:#8b8b8b;">颜色：</div>
        </div>
    </div>
    <div class="flex" :style="handlePX('padding',30)">
      <span>评分</span>
      <div class="star-box" style="margin:0 10px;">
        <img v-for="(star,index) in stars" :key="index" :src="star.src" :style="handlePX('width',43)+handlePX('height',43)" @click="getstars(index+1)"/>
      </div>
    </div>  

    <van-cell-group>
        <van-field :style="handlePX('margin',30)" style="width:auto;border:1px solid #c5c4c4;border-radius:4px;" v-model="commentContent" type="textarea" placeholder="填写评价，即可参加抽奖哦~" rows="5" autosize />
    </van-cell-group>
    
    <div :style="handlePX('padding',30)" class="flex flex-warp-justify">
        <div v-for="(imgname,index) in filename" :key="index" :style="handlePX('margin-right',20)" style="position: relative;">
            <img  v-lazy="imgname" :style="handlePX('width',150)+handlePX('height',150)"/>
            <img  src="../../assets/image/关闭按钮.png" :style="handlePX('width',40)+handlePX('height',40)" style="position: absolute;top:0;right:0;" @click="delimg(index)"/>
        </div>
        <van-uploader v-if="filename.length<5" :after-read="onRead" accept="image/jpg,image/png, image/jpeg" >
          <img src="../../assets/image/添加图片.png" :style="handlePX('width',150)+handlePX('height',150)"/>
        </van-uploader>
    </div>

    <div :style="handlePX('padding',30)" class="flex flex-end-justify" style="border-top:1px solid #f3f3f3;">
        <van-button :style="handlePX('width',170)" style="border:1px solid #797979;border-radius:6px;" @click="subcomment()">提交</van-button>
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


@Component({
  components: { comhead },
  mixins: [mixin]
})
export default class addcomment extends Vue {
  orderId="";
  orderdetail=[];
  detailList={goodsId:"",orderId:"",skuId:"",skuKeyValue:"",id:""};
  commentContent="";
  starsnum=0;
  filename=[];
  stars=[{
                            src: require('../../assets/image/灰色星星.png'),
                            active: false
                        }, {
                            src: require('../../assets/image/灰色星星.png'),
                            active: false
                        }, {
                            src: require('../../assets/image/灰色星星.png'),
                            active: false
                        },
                        {
                            src: require('../../assets/image/灰色星星.png'),
                            active: false
                        }, {
                            src: require('../../assets/image/灰色星星.png'),
                            active: false
                        }
                    ];
  getorderdetail(){
    Vue.prototype.$reqFormPost(
      "/order/queryorderdetail",
      {
        userId: this.$store.getters[Vue.prototype.MutationTreeType.TOKEN_INFO]
          .userId,
        token: this.$store.getters[Vue.prototype.MutationTreeType.TOKEN_INFO]
          .token,
        orderId: this.orderId,
      },
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
        this.orderdetail = res.data.data;
        this.detailList = res.data.data.detailList[0]
        console.log(res.data.data)
        }
      ); 
  }
  getstars(num){
    this.starsnum=num;
    for(var j = 0; j < 5; j++) {
      this.stars[j].src = require('../../assets/image/灰色星星.png');
      this.stars[j].active = false;
    }
    for(var i = 0; i < num; i++) {
      this.stars[i].src = require('../../assets/image/星星.png');
      this.stars[i].active = true;
    }
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
      this.filename.push(res.data.data.filename);
    });
  }
  delimg(index){
    this.filename.splice(index,1);
  }
  subcomment(){
      if(this.commentContent==""){
          Toast("请填写评价");
      }
      let commentImg = this.filename.toString()
      Vue.prototype.$reqFormPost(
      "/comment/add",
      {
        // commentModel:{
            "customCommentList": [
                {
                "commentContent": this.commentContent,
                "commentImg": commentImg,
                "goodsId": this.detailList.goodsId,
                "orderDetailId": this.detailList.id,
                "skuId": this.detailList.skuId,
                "skuKeyValue": this.detailList.skuKeyValue,
                "star": this.starsnum
                }
            ],
            "orderId": this.orderId,
            "token": this.$store.getters[Vue.prototype.MutationTreeType.TOKEN_INFO].token,
            "userId": this.$store.getters[Vue.prototype.MutationTreeType.TOKEN_INFO].userId
            // }
      },
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
          this.$router.go(-1);        


        console.log(res.data)
        },
        {
        "Content-Type": "application/json"
    }     

      ); 
  }
  handlePX(CssName, PxNumber) {
    return CssName +":" +this.$store.getters[Vue.prototype.MutationTreeType.SYSTEM].availWidth /750 * PxNumber +"px;";
  }


  mounted() {
    this.orderId = this.$route.query.orderId;
    this.getorderdetail();
    console.log("评价");
  }

}
</script>

<style lang="scss" scoped>
@import "../../style/utils.scss";
.tabConactive{
  border:1px solid #f4c542;
  color:#f4c542;
  width:100px;
  height:30px;
  line-height:30px;
  text-align:center;
  border-radius: 6px;
}
.tabCon{
  border:1px solid #000000;
  color:#000000;
  width:100px;
  height:30px;
  line-height:30px;
  text-align:center;
  border-radius: 6px;
}
</style>