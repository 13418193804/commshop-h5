webpackJsonp([14],{"1r67":function(t,e){},Meru:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=a("TToO"),i=a("7+uW"),n=a("c+8m"),r=a.n(n),s=a("DZ+H"),l=a("ymRw"),c=a("TJML"),d=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.obj={},e.payActive="ali",e}return o.c(e,t),e.prototype.dopay=function(){"ali"==this.payActive&&i.default.prototype.$reqFormPost("/ali/pay/wap",{userId:this.$store.getters[i.default.prototype.MutationTreeType.TOKEN_INFO].userId,token:this.$store.getters[i.default.prototype.MutationTreeType.TOKEN_INFO].token,body:this.obj.body,outTradeNo:this.obj.payId,totalFee:.01},function(t){if(null!=t)return 200!=t.data.status?(console.log("需控制错误码"+t.data.status+",错误信息："+t.data.message),void Object(l.Toast)(t.data.message)):void(window.location.href="https://openapi.alipay.com/gateway.do?"+t.data.data.orderString);console.log("网络请求错误！")})},e.prototype.mounted=function(){console.log(),this.obj=this.$route.query},e=o.b([r()({components:{comhead:c.a},mixins:[s.a]})],e)}(i.default),u={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"tab-contents",staticStyle:{height:"-webkit-fill-available","background-color":"#f7f7f7"}},[a("comhead",{ref:"comhead",attrs:{isLeftIcon:"icon-zuo",leftIconName:"angle-left",title:"支付",isRightIcon:"true"},on:{leftClick:!1}}),t._v(" "),a("div",{staticStyle:{margin:"30px"}},[a("div",[t._v("\n                    订单提交成功，请尽快付款！\n                ")]),t._v(" "),a("div",[t._v("\n                    温馨提示：24小时内未付款将自动取消\n                ")]),t._v(" "),a("div",[a("span",{staticClass:"marketPrice"},[t._v("￥"+t._s(t.obj.payTotal))]),t._v("  元\n                ")])]),t._v(" "),a("div"),t._v(" "),a("div",{staticStyle:{margin:"30px"}},[a("van-radio-group",{model:{value:t.payActive,callback:function(e){t.payActive=e},expression:"payActive"}},[a("van-radio",{attrs:{name:"ali"}},[t._v("支付宝支付")])],1)],1),t._v(" "),a("div",{staticStyle:{margin:"30px"}},[a("van-button",{attrs:{size:"large"},on:{click:t.dopay}},[t._v("支付")])],1)],1)},staticRenderFns:[]};var p=a("VU/8")(d,u,!1,function(t){a("1r67")},"data-v-5167bd2b",null);e.default=p.exports}});
//# sourceMappingURL=14.e32f87510310ddca98c5.js.map