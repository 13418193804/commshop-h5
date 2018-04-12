<template>
  <div class="alter-container">
  
    <div class="vhead"  align="center">
  
      <div style="width: 12%;">
  
        <!-- <span v-if="leftTitle" style="font-size:14px">{{leftTitle}}</span> -->
        
        <span @click="leftClick">
           <span v-if="leftTitle" style="font-size:14px">{{leftTitle}}</span>
          <i v-if="isLeftIcon"  class="iconfont " :class="isLeftIcon" style="color:#101010;margin-top:-5px;margin:10px"></i>
        </span>
      </div>
  
      <div style="width: 76%;">
        {{title}}
      </div>
  
      <div style="width: 12%;display: flex;align-items: center;visibility:hidden">
        <span @click="rightClick">
        <span v-if="rightTitle" style="font-size:14px">{{rightTitle}}</span>
          <!-- <icon v-if="isRightIcon" :name="rightIconName" scale="1.5" style="color:#101010;margin: 10px 10px"></icon> -->
        </span>
      </div>
    </div>
  <div class="baseLine" v-if="!lineShow"></div>
  </div>
  <!-- end container -->
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from 'vue-property-decorator';

@Component
export default class Comhead extends Vue {
    @Prop({ required: false })
    isRightIcon: any;
    @Prop({ required: false })
    title: any;
    @Prop({ required: false })
    isLeftIcon: any;
    @Prop({ required: false })
    rightTitle: any;
    @Prop({ required: false })
    leftTitle: any;
    @Prop({ required: false })
    leftIconName: any;
    @Prop({ required: false })
    rightIconName: any;
    @Prop({ required: false })
    lineShow: any;
    @Prop({ required: false })
    skin: any;
    

  type = "H5";
  leftScale = "1.5";
  rightClick() {
    this.$emit("rightClick");
  }
  leftClick() {
    if(this.isLeftIcon == 'icon-zuo'){
      this.$router.go(-1);
      return
    }
    this.$emit("leftClick");
  }

  getBgColor() {}
  mounted() {
    console.log(this.title)
    console.log(this.isRightIcon)
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.vhead {
  border-bottom: solid 1px #e5e5e5;
  justify-content: flex-end;
  height: 52px;
  background-color: #f8f8f8;
  display: flex;
  align-items: center;
  position: fixed;
  z-index: 100;

  top: 0;
  padding: 0px;
  width: 100%;
  max-width: 640px;
  color: #101010;
}
.baseLine {
  width: 100%;
  height: 52px;
  margin-top: 0px;
  color: white;
}
</style>