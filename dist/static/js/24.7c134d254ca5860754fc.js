webpackJsonp([24],{BG2h:function(t,e){},YkY1:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=i("TToO"),s=i("7+uW"),a=i("c+8m"),n=i.n(a),r=i("DZ+H"),l=i("ymRw"),d=i("TJML"),c=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.shipInfoList=[],e}return o.c(e,t),e.prototype.getShipInfoList=function(){var t=this;s.default.prototype.$reqFormPost("/transport/info",{com:this.$route.query.transportCode,nu:this.$route.query.transportNo},function(e){if(null!=e){if(200!=e.data.status)return console.log("需控制错误码"+e.data.status+",错误信息："+e.data.message),void Object(l.Toast)(e.data.message);t.shipInfoList=e.data.data,console.log("查看物流信息",e.data.data)}else console.log("网络请求错误！")})},e.prototype.mounted=function(){console.log(this.$route.query),this.getShipInfoList()},e=o.b([n()({components:{comhead:d.a},mixins:[r.a]})],e)}(s.default),u={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"tab-contents",staticStyle:{height:"-webkit-fill-available","background-color":"#f7f7f7"}},[i("comhead",{ref:"comhead",attrs:{isLeftIcon:"icon-zuo",leftIconName:"angle-left",title:"物流信息",isRightIcon:"true"},on:{leftClick:!1}}),t._v(" "),i("div",{staticClass:"detailBody"},t._l(t.$route.query.detailList,function(e){return i("div",[i("div",{staticClass:"product1"},[i("div",{staticStyle:{display:"flex","align-items":"center"}},[i("img",{directives:[{name:"lazy",rawName:"v-lazy",value:e.goodsImg,expression:"items.goodsImg"}],staticStyle:{height:"80px",width:"80px"}})]),t._v(" "),i("div",{staticStyle:{"font-size":"12px",flex:"1",overflow:"hidden",padding:"0 10px"}},[i("div",{staticClass:"lineTwoType"},[t._v(t._s(e.goodsName))]),t._v(" "),i("div",{staticStyle:{overflow:"hidden","text-overflow":"ellipsis","white-space":"nowrap",color:"#999"}},[i("div",[t._v(" "+t._s(e.jingle))])])]),t._v(" "),i("div",{staticStyle:{"text-align":"center","font-size":"14px"}},[i("div",[t._v("￥"+t._s(e.goodsPrice))]),t._v(" "),e.labelPrice?i("div",{staticClass:"labelPrice"},[t._v("原价:"+t._s(e.labelPrice))]):t._e(),t._v(" "),i("div",[t._v("X "+t._s(e.goodsNum))])])])])})),t._v(" "),i("div",[i("div",[t._v("物流公司："+t._s(t.$route.query.transportName)+" ")]),t._v(" "),i("div",[t._v("物流电话："+t._s(t.$route.query.transportMobile)+" ")]),t._v(" "),i("div",[t._v("物流单号："+t._s(t.$route.query.transportNo)+" ")])])],1)},staticRenderFns:[]};var v=i("VU/8")(c,u,!1,function(t){i("BG2h")},"data-v-11384a03",null);e.default=v.exports}});
//# sourceMappingURL=24.7c134d254ca5860754fc.js.map