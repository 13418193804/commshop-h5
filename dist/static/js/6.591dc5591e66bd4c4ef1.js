webpackJsonp([6],{AQsh:function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAu4AAAAKCAIAAABkNUwgAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjE4ODE0RENCMzY0NjExRTg5MDMxRERDM0U2MUUwMjgyIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjE4ODE0RENDMzY0NjExRTg5MDMxRERDM0U2MUUwMjgyIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MTg4MTREQzkzNjQ2MTFFODkwMzFEREMzRTYxRTAyODIiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MTg4MTREQ0EzNjQ2MTFFODkwMzFEREMzRTYxRTAyODIiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5YOBuGAAACLElEQVR42uzbz0sCURAH8Fk3TdiKfhzKjnmow/4TgqfwfzWqUx3DY8fQ6BCJJJilIpW7uvtqoaAfWPvcOczAdw7e3uPxcb4w4OgYY2hORZeXwcUF8VXe9/PVapYb7sd0O2J8Ee14VN6wOyKNRYIJZHThQAaB0tswSBNkfldu3pn4+ppXZGl3N1+pZLnh4YXZZbVAe+t2R6SxSDCBjC4cyCBQehsGaYKMxSgTdzqTszPGRzieVzg8JNdd+IbRhG4GnC4Flw62yHFsGkUYiwQTyOjCgQwCpbdhkCbIWIwyptcLTk4oithe4brFWo1WVha+4Dmk5hPN/ynM/ktyaH8z0Ulf0lgkmEBGFw5kECi9DYM0QeaP+jnKmOFwUq+bIGCcp4qVilMqLXx8MqOrPkUx54hXXqe1ZZtGEcYiwQQyunAgg0DpbRikCTJ/17dRxry+BkdH75+Mj8j7fs73Fz4+jROXKavLjkfbnk2jCGORYAIZXTiQQaD0NgzSBJl/68soE4bh8XE8HDI+IuMK3sxQs59MeYxlvVQljEWECWRU4UAGgVLcMEgTZFLU5ygTReHpadTtMj4i4wqeMdR6pHHI6WK9VCWMRYQJZFThQAaBUtwwSBNk0sl8jDLT8/NZu835isyrvjeDZAua80uyX6qSxiLBBDK6cCCDQOltGKQJMikrGWWiRmPaahFrZVz1vRsl/0rnLdulKmksEkwgowsHMgiU3oZBmiCTvt4EGACJesqmvBF1WwAAAABJRU5ErkJggg=="},XY0f:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=i("TToO"),s=i("7+uW"),l=i("c+8m"),n=i.n(l),d=i("DZ+H"),o=i("ymRw"),c=i("TJML"),r=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.orderId="",e.detail="",e}return a.c(e,t),e.prototype.formatStatus=function(t){switch(t){case"ORDER_WAIT_PAY":return"等待付款";case"ORDER_CANCEL_PAY":return"交易取消";case"ORDER_WAIT_SENDGOODS":return"等待发货";case"ORDER_WAIT_RECVGOODS":return"等待收货";case"ORDER_END_GOODS":return"交易结束";case"ORDER_WAIT_REVIEW":return"交易完成"}},e.prototype.queryDetail=function(){var t=this;s.default.prototype.$reqFormPost("/order/queryorderdetail",{userId:this.$store.getters[s.default.prototype.MutationTreeType.TOKEN_INFO].userId,token:this.$store.getters[s.default.prototype.MutationTreeType.TOKEN_INFO].token,orderId:this.orderId},function(e){if(null!=e){if(200!=e.data.status)return console.log("需控制错误码"+e.data.status+",错误信息："+e.data.message),void Object(o.Toast)(e.data.message);t.detail=e.data.data,console.log(e.data.data)}else console.log("网络请求错误！")})},e.prototype.formatStatusColor=function(t){switch(t){case"ORDER_WAIT_SENDGOODS":case"ORDER_WAIT_RECVGOODS":case"ORDER_CANCEL_PAY":case"ORDER_WAIT_PAY":return"color:red";case"ORDER_WAIT_REVIEW":return"color:#ffc630";case"ORDER_FINISH":return"color:#ffc630;"}},e.prototype.mounted=function(){this.orderId=this.$route.query.orderId,this.queryDetail()},e=a.b([n()({components:{comhead:c.a},mixins:[d.a]})],e)}(s.default),v={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"tab-contents",staticStyle:{height:"-webkit-fill-available"}},[i("comhead",{ref:"comhead",attrs:{isLeftIcon:"icon-zuo",leftIconName:"angle-left",title:"订单详情",isRightIcon:"true"},on:{leftClick:!1}}),t._v(" "),i("div",{staticStyle:{"background-color":"#f7f7f7",display:"flex","justify-content":"space-between",padding:"10px","font-size":"16px","align-items":"center"}},[i("div",[t._v("订单状态")]),t._v(" "),i("div",{style:t.formatStatusColor(t.detail.orderStatus)},[t._v(t._s(t.formatStatus(t.detail.orderStatus)))])]),t._v(" "),t._m(0),t._v(" "),i("div",{staticStyle:{display:"flex","align-items":"center",padding:"10px"}},[i("div",{staticStyle:{flex:"1"}},[i("div",{staticStyle:{"font-size":"16px",display:"flex","justify-content":"space-between"}},[i("span",[t._v("收货人："+t._s(t.detail.contactName))]),t._v(" "),i("span",{staticStyle:{"margin-right":"10px"}},[t._v(t._s(t.detail.contactPhone))])]),t._v(" "),i("div",{staticStyle:{display:"flex","align-items":"center",padding:"5px","font-size":"14px"}},[t._m(1),t._v(" "),i("div",{staticClass:"lineTwo"},[t._v("\n                     收货地址：    "+t._s(t.detail.provinceName)+t._s(t.detail.cityName)+t._s(t.detail.countryName)+t._s(t.detail.address)+"\n                    ")])])])]),t._v(" "),i("div",{staticStyle:{height:"10px","background-color":"#f7f7f7"}}),t._v(" "),i("div",{},t._l(t.detail.detailList,function(e,a){return i("div",[i("div",{staticClass:"product"},[i("div",{staticStyle:{display:"flex","align-items":"center"}},[i("img",{directives:[{name:"lazy",rawName:"v-lazy",value:e.goodsImg,expression:"item.goodsImg"}],staticStyle:{height:"70px",width:"70px"}})]),t._v(" "),i("div",{staticStyle:{"font-size":"16px",flex:"1",overflow:"hidden",padding:"0 10px"}},[i("div",{staticStyle:{height:"100%"}},[i("div",{staticClass:"lineTwoType"},[t._v(t._s(e.goodsName))]),t._v(" "),i("div",{staticStyle:{overflow:"hidden","text-overflow":"ellipsis","white-space":"nowrap",color:"#999"}},[i("div",{staticStyle:{"font-size":"14px",color:"#666"}},[t._v(t._s(e.jingle))])])])]),t._v(" "),i("div",{staticStyle:{"text-align":"center","font-size":"14px"}},[i("div",[t._v("￥"+t._s(e.goodsPrice))]),t._v(" "),i("div",{staticClass:"labelPrice"},[t._v("￥"+t._s(e.goodsPrice))]),t._v(" "),i("div",[t._v("X "+t._s(e.goodsNum))])])])])})),t._v(" "),i("div",{},[i("div",{staticStyle:{"margin-left":"10px","border-bottom":"1px #e5e5e5 solid",display:"flex","justify-content":"space-between",padding:"10px"}},[i("div",[t._v("运费")]),t._v(" "),i("div",{staticStyle:{"margin-right":"10px"}},[t._v("￥"+t._s(t.detail.transportPrice.toFixed(2)))])]),t._v(" "),i("div",{staticStyle:{margin:"0 0 0 10px",display:"flex","justify-content":"space-between",padding:"10px"}},[i("div",[t._v("订单总价")]),t._v(" "),i("div",{staticClass:"marketPrice",staticStyle:{"margin-right":"10px"}},[t._v("￥"+t._s(t.detail.orderTotalPrice.toFixed(2)))])])]),t._v(" "),i("div",{staticStyle:{height:"10px","background-color":"#f7f7f7"}}),t._v(" "),i("div",{staticStyle:{padding:"10px","line-height":"24px"}},[i("div",[t._v("\n        订单号："+t._s(t.detail.orderId)+"\n    ")]),t._v(" "),i("div",[t._v("\n        创建时间："+t._s(t.detail.createTime)+"\n    ")])]),t._v(" "),i("div",{staticStyle:{height:"10px","background-color":"#f7f7f7"}}),t._v(" "),i("div",{staticStyle:{display:"flex","align-items":"center","justify-content":"space-between",padding:"10px","font-size":"14px"}},[i("div",[t._v("服务时间：9:00 - 22:00")]),t._v(" "),i("van-button",{attrs:{size:"small"}},[t._v("联系客服")])],1)],1)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticStyle:{display:"flex",height:"5px"}},[e("img",{staticStyle:{width:"100%"},attrs:{src:i("AQsh")}})])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",[e("i",{staticClass:"iconfont icon-location",staticStyle:{"margin-right":"10px","font-size":"22px"}})])}]};var p=i("VU/8")(r,v,!1,function(t){i("wFwq")},"data-v-13072ad2",null);e.default=p.exports},wFwq:function(t,e){}});
//# sourceMappingURL=6.591dc5591e66bd4c4ef1.js.map