webpackJsonp([36],{UJnz:function(t,e){},Xzhj:function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=o("TToO"),n=o("7+uW"),i=o("c+8m"),s=o.n(i),l=o("DZ+H"),d=o("ymRw"),c=o("TJML"),r=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.loading=!1,e.pageSize=20,e.couponList=[],e.page=0,e}return a.c(e,t),e.prototype.handlePX=function(t,e){return t+":"+this.$store.getters[n.default.prototype.MutationTreeType.SYSTEM].availWidth/750*e+"px;"},e.prototype.loadMore=function(){var t=this;t.loading=!0,setTimeout(function(){t.loading||(t.page+=1,t.getList(),t.loading=!1)},1e3)},e.prototype.getList=function(){var t=this;n.default.prototype.$reqFormPost("/coupon/center/list",{userId:this.$store.getters[n.default.prototype.MutationTreeType.TOKEN_INFO].userId,token:this.$store.getters[n.default.prototype.MutationTreeType.TOKEN_INFO].token,page:this.page,pageSize:20},function(e){if(null!=e){if(200!=e.data.status)return console.log("需控制错误码"+e.data.status+",错误信息："+e.data.message),Object(d.Toast)(e.data.message),void t.$router.push({name:"login"});console.log(e),t.couponList=e.data.data.couponList,20==e.data.data.couponList.length&&(t.loading=!1)}else console.log("网络请求错误！")})},e.prototype.addcoupon=function(t){var e=this;n.default.prototype.$reqFormPost("/coupon/user/linkadd",{userId:this.$store.getters[n.default.prototype.MutationTreeType.TOKEN_INFO].userId,token:this.$store.getters[n.default.prototype.MutationTreeType.TOKEN_INFO].token,couponId:t},function(t){if(null!=t){if(200!=t.data.status)return console.log("需控制错误码"+t.data.status+",错误信息："+t.data.message),void Object(d.Toast)(t.data.message);Object(d.Toast)("领卷成功"),e.getList()}else console.log("网络请求错误！")})},e.prototype.mounted=function(){this.getList(),console.log("领卷中心")},e=a.b([s()({components:{comhead:c.a},mixins:[l.a]})],e)}(n.default),p={render:function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"tab-contents"},[o("comhead",{ref:"comhead",attrs:{isLeftIcon:"icon-zuo",leftIconName:"angle-left",title:"领卷中心",isRightIcon:"true"},on:{leftClick:!1}}),t._v(" "),o("ul",{directives:[{name:"infinite-scroll",rawName:"v-infinite-scroll",value:t.loadMore,expression:"loadMore"}],attrs:{"infinite-scroll-disabled":t.loading,"infinite-scroll-distance":"20"}},[o("li",[o("div",{staticClass:"coupon_list"},t._l(t.couponList,function(e,a){return o("div",{key:a},[0==e.getStatus&&1==e.status?o("div",{staticClass:"coupon_collar",style:t.handlePX("width",702)+t.handlePX("height",248)+t.handlePX("margin-top",20)},[o("div",{staticClass:"coupon_cardbox",style:t.handlePX("padding-top",30)},[o("div",{staticClass:"coupon_car_left",style:t.handlePX("padding-left",60)},[o("div",{staticStyle:{color:"#fff"},style:t.handlePX("font-size",65)},[t._v(t._s(e.couponDenomination)),o("span",{style:t.handlePX("font-size",42)},[t._v("元")])]),t._v(" "),o("div",{staticStyle:{color:"rgba(255,255,255,0.8)"}},[t._v("满"+t._s(e.fullDenomination)+"减"+t._s(e.couponDenomination))])]),t._v(" "),o("div",{staticClass:"coupon_car_right",style:t.handlePX("padding-right",42)+t.handlePX("padding-top",30)},[o("van-button",{staticStyle:{border:"0","background-color":"rgba(255,255,255,0.5)",color:"#DAA000"},style:t.handlePX("width",135)+t.handlePX("height",40),attrs:{size:"mini"},on:{click:function(o){t.addcoupon(e.id)}}},[t._v("领卷")]),t._v(" "),o("div",{staticStyle:{color:"rgba(255,255,255,0.8)"},style:t.handlePX("font-size",26)},[t._v(t._s(e.createTime.split(" ")[0])+"-"+t._s(e.endDate.split(" ")[0]))])],1)]),t._v(" "),o("div",{staticClass:"coupon_car_bottom",style:t.handlePX("line-height",52)+t.handlePX("font-size",20)+t.handlePX("padding-left",40)},[t._v("全场通用；特价商品或其他优惠活动商品不可叠加使用")])]):t._e(),t._v(" "),1==e.getStatus&&1==e.status?o("div",{staticClass:"coupon_notused",style:t.handlePX("width",702)+t.handlePX("height",248)+t.handlePX("margin-top",20)},[o("div",{staticClass:"coupon_cardbox",style:t.handlePX("padding-top",30)},[o("div",{staticClass:"coupon_car_left",style:t.handlePX("padding-left",60)},[o("div",{staticStyle:{color:"#fff"},style:t.handlePX("font-size",65)},[t._v(t._s(e.couponDenomination)),o("span",{style:t.handlePX("font-size",42)},[t._v("元")])]),t._v(" "),o("div",{staticStyle:{color:"rgba(255,255,255,0.8)"}},[t._v("满"+t._s(e.fullDenomination)+"减"+t._s(e.couponDenomination))])]),t._v(" "),o("div",{staticClass:"coupon_car_right",style:t.handlePX("padding-right",42)+t.handlePX("padding-top",30)},[o("van-button",{staticStyle:{border:"0","background-color":"rgba(255,255,255,0.9)",color:"#fd5f61"},style:t.handlePX("width",135)+t.handlePX("height",40),attrs:{size:"mini"}},[t._v("已领取")]),t._v(" "),o("div",{staticStyle:{color:"rgba(255,255,255,0.8)"},style:t.handlePX("font-size",26)},[t._v(t._s(e.endDate))])],1)]),t._v(" "),o("div",{staticClass:"coupon_car_bottom",style:t.handlePX("line-height",52)+t.handlePX("font-size",20)+t.handlePX("padding-left",40)},[t._v("全场通用；特价商品或其他优惠活动商品不可叠加使用")])]):t._e(),t._v(" "),0==e.status?o("div",{staticClass:"coupon_overdue",style:t.handlePX("width",702)+t.handlePX("height",248)+t.handlePX("margin-top",20)},[o("div",{staticClass:"coupon_cardbox",style:t.handlePX("padding-top",30)},[o("div",{staticClass:"coupon_car_left",style:t.handlePX("padding-left",60)},[o("div",{staticStyle:{color:"#fff"},style:t.handlePX("font-size",65)},[t._v(t._s(e.couponDenomination)),o("span",{style:t.handlePX("font-size",42)},[t._v("元")])]),t._v(" "),o("div",{staticStyle:{color:"rgba(255,255,255,0.8)"}},[t._v("满"+t._s(e.fullDenomination)+"减"+t._s(e.couponDenomination))])]),t._v(" "),o("div",{staticClass:"coupon_car_right",staticStyle:{"align-self":"flex-end"},style:t.handlePX("padding-right",42)+t.handlePX("padding-top",30)},[o("div",{staticStyle:{color:"rgba(255,255,255,0.8)"},style:t.handlePX("font-size",26)},[t._v(t._s(e.endDate))])])]),t._v(" "),o("div",{staticClass:"coupon_car_bottom",style:t.handlePX("line-height",52)+t.handlePX("font-size",20)+t.handlePX("padding-left",40)},[t._v("全场通用；特价商品或其他优惠活动商品不可叠加使用")])]):t._e()])}))])]),t._v(" "),o("div",{staticClass:"flex flex-pack-center flex-align-center",staticStyle:{"font-size":"14px",padding:"15px"}},[t.loading?o("div",[t._v("-")]):o("div",[t._v("加载中...")])])],1)},staticRenderFns:[]};var u=o("VU/8")(r,p,!1,function(t){o("UJnz")},"data-v-3a241844",null);e.default=u.exports}});
//# sourceMappingURL=36.f23989397b44992c4acc.js.map