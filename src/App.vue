<template>
  <div id="app">
    <!-- <nav-header></nav-header> -->
    <!-- <keep-alive> -->
      <router-view/>
    <!-- </keep-alive> -->
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

  mount(){

  }

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

</style>
<style>
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
  background-color: #ffc630;
  left: 22px;
  width: 36px !important;
  bottom: 20px;
  border-radius: 30px;
}
.van-field{
  width:620px;
  height:90px;
  padding:0 0 0 30px;
  font-size: 30px;
  line-height: 88px;
  vertical-align:baseline;
  color: #000000;
  box-sizing:border-box;
  border: 1px solid #d2d2d2;
  border-radius: 8px;
}
.van-button{
  width:620px;
  height:90px;
  font-size: 34px;
  color: #FFFFFF;
  background-color: #F4C542;
  border-radius: 8px;
}
</style>
