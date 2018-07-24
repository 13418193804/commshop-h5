<template>
  <div id="app">
    <!-- <nav-header></nav-header> -->
     <keep-alive>
    <router-view v-if="$route.meta.keepAlive"></router-view>
</keep-alive>
<router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

// @Component({
//     components: {
//         NavHeader
//     }
// })
export default class App extends Vue {



}
</script>

<style lang="scss">
@import './style/_var';
@import './style/reset';




.lineTwo{
   overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp:2;
  -webkit-box-orient:vertical;
}
.textLabel{
  overflow:hidden;white-space:nowrap;text-overflow:ellipsis;
}
.marketPrice{
  color:red;    
  // font-weight: 600;
}
.labelPrice{
  color:#969696;text-decoration:line-through;
}
.noscroll {
    overflow: hidden;
}
.messageFexid {
  background-color: #fe4747;
  border-radius: 10px;
  color: #fff;
  display: inline-block;
  font-size: 12px;
  height: 18px;
  line-height: 18px;
  padding: 0 6px;
  text-align: center;
  white-space: nowrap;
  position: absolute;
  top: 0;
  right: 30px;
  transform: translateY(-50%) translateX(100%);
}
</style>
<style>
*{
  font-size: 14px;
}
  p,h5,h6{
    margin: 0;
  }
</style>

<style>
.van-tabbar-item__text{
  position: relative;
}
.van-dialog__footer{
  display: flex;
}
.van-search{
  padding:12px 15px;
}
.van-tabbar{
  z-index:200;
}
.van-tabbar-item--active{
  color: #ffc630;
}
.van-hairline--top-bottom::after {
  border-width: 0;
}
.van-tab--active {
  color: #ffc630;
}
.van-tabs__nav-bar {
  background-color: rgb(255, 198, 48);
  left: 22px;
  width: 36px !important;
  bottom: 20px;
  border-radius: 30px;
}
.van-tabs__nav{
  -webkit-overflow-scrolling: touch;
  overflow-x: auto ;
  overflow-y: hidden ;
  
}
.van-tab{
  min-width: 79px;
}
.van-tabs__wrap{
  z-index: 79;
}

.van-submit-bar__price-interger{
color:#f44!important;
}
.flex {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
}

.flex-v {
  -webkit-box-orient: vertical;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
}

.flex-1 {
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  -ms-flex: 1;
  flex: 1;
}

.flex-align-center {
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
}
.flex-align-flex-end {
  -webkit-box-align: flex-end;
  -webkit-align-items: flex-end;
  -ms-flex-align: flex-end;
  align-items: flex-end;
}
.flex-pack-center {
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
}
.flex-flex-start-center {
  -webkit-box-pack: flex-start;
  -webkit-justify-content: flex-start;
  -ms-flex-pack: flex-start;
  justify-content: flex-start;
}
.flex-pack-justify {
  -webkit-box-pack: justify;
  -webkit-justify-content: space-between;
  -ms-flex-pack: justify;
  justify-content: space-between;
}
.flex-around-justify {
  -webkit-box-pack: justify;
  -webkit-justify-content: space-around;
  -ms-flex-pack: justify;
  justify-content: space-around;
}
.flex-end-justify {
  -webkit-box-pack: flex-end;
  -webkit-justify-content: flex-end;
  -ms-flex-pack: flex-end;
  justify-content: flex-end;
}
.flex-warp-justify {
  -webkit-flex-wrap: wrap;
  -moz-flex-wrap: wrap;
  -ms-flex-wrap: wrap;
  -o-flex-wrap: wrap;
}
.flex-nowrap-justify {
  -webkit-flex-wrap: nowrap;
  -moz-flex-wrap: nowrap;
  -ms-flex-wrap: nowrap;
  -o-flex-wrap: nowrap;
}




</style>

<style>
.index_tabs .van-tabs__wrap {
  margin-right: 36px;
}

.index_tabs .van-swipe__indicators > i {
  width: 8px;
  height: 8px;
  background-color: #d0d0d0;
  margin: 0 5px;
  border-radius: 100px;
}
.index_tabs .van-swipe__indicators > .van-swipe__indicator--active {
  background-color: #ffc630;
}
.van-tabs__wrap {
  overflow-x: auto;
}
</style>
