webpackJsonp([40],{V90a:function(t,e){},XY0f:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=i("TToO"),s=i("7+uW"),r=i("c+8m"),o=i.n(r),d=i("DZ+H"),n=i("ymRw"),l=i("TJML"),c=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.orderId="",e.detail="",e}return a.c(e,t),e.prototype.inputTransNo=function(){console.log("填写单号"),this.$router.push({name:"refundbackgoods",query:{refundId:this.detail.detailList[0].refundOrderList[0].refundId}})},e.prototype.formatButtonColor=function(){return"border-color:#ffc630;color:#ffc630"},e.prototype.buyAgain=function(){var t=this;s.default.prototype.$reqFormPost("/order/buyagain",{userId:this.$store.getters[s.default.prototype.MutationTreeType.TOKEN_INFO].userId,token:this.$store.getters[s.default.prototype.MutationTreeType.TOKEN_INFO].token,orderId:this.orderId},function(e){if(null!=e)return 200!=e.data.status?(console.log("需控制错误码"+e.data.status+",错误信息："+e.data.message),void Object(n.Toast)(e.data.message)):void t.$router.push({name:"cart"});console.log("网络请求错误！")})},e.prototype.formatStatus=function(t){switch(t){case"ORDER_WAIT_PAY":return"未付款";case"ORDER_CANCEL_PAY":return"已取消";case"ORDER_WAIT_SENDGOODS":return"未发货";case"ORDER_WAIT_RECVGOODS":return"未收货";case"ORDER_END_GOODS":return"交易结束";case"ORDER_WAIT_REVIEW":return"交易完成"}},e.prototype.doCancel=function(){var t=this;n.Dialog.confirm({title:"提示",message:"是否取消订单?"}).then(function(){s.default.prototype.$reqFormPost("/order/cancel",{userId:t.$store.getters[s.default.prototype.MutationTreeType.TOKEN_INFO].userId,token:t.$store.getters[s.default.prototype.MutationTreeType.TOKEN_INFO].token,orderId:t.detail.orderId},function(e){if(null!=e){if(200!=e.data.status)return console.log("需控制错误码"+e.data.status+",错误信息："+e.data.message),void Object(n.Toast)(e.data.message);t.queryDetail(),console.log("取消订单")}else console.log("网络请求错误！")})}).catch(function(){})},e.prototype.cancelRefund=function(){var t=this;n.Dialog.confirm({title:"提示",message:"是否取消申请退款?"}).then(function(){s.default.prototype.$reqFormPost("/order/refund/delete",{userId:t.$store.getters[s.default.prototype.MutationTreeType.TOKEN_INFO].userId,token:t.$store.getters[s.default.prototype.MutationTreeType.TOKEN_INFO].token,refundId:t.detail.detailList[0].refundOrderList[0].refundId},function(e){if(null!=e){if(200!=e.data.status)return console.log("需控制错误码"+e.data.status+",错误信息："+e.data.message),void Object(n.Toast)(e.data.message);Object(n.Toast)("取消成功"),t.queryDetail()}else console.log("网络请求错误！")})}).catch(function(){}),console.log("取消退款")},e.prototype.queryDetail=function(){var t=this;s.default.prototype.$reqFormPost("/order/queryorderdetail",{userId:this.$store.getters[s.default.prototype.MutationTreeType.TOKEN_INFO].userId,token:this.$store.getters[s.default.prototype.MutationTreeType.TOKEN_INFO].token,orderId:this.orderId},function(e){if(null!=e){if(200!=e.data.status)return console.log("需控制错误码"+e.data.status+",错误信息："+e.data.message),void Object(n.Toast)(e.data.message);t.detail=e.data.data,console.log(e.data.data)}else console.log("网络请求错误！")})},e.prototype.formatStatusColor=function(t){switch(t){case"ORDER_WAIT_SENDGOODS":case"ORDER_WAIT_RECVGOODS":case"ORDER_CANCEL_PAY":case"ORDER_WAIT_PAY":return"color:red";case"ORDER_WAIT_REVIEW":return"color:#ffc630";case"ORDER_FINISH":return"color:#ffc630;"}},e.prototype.doRefund=function(){console.log("申请退款"),this.$router.push({name:"refund",query:{orderId:this.detail.orderId}})},e.prototype.payOrder=function(){this.$router.push({name:"pay",query:{body:this.detail.orderTitle,payId:this.detail.payNo,payTotal:this.detail.payTotal}})},e.prototype.mounted=function(){this.orderId=this.$route.query.orderId,this.queryDetail()},e=a.b([o()({components:{comhead:l.a},mixins:[d.a]})],e)}(s.default),u={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"tab-contents",staticStyle:{height:"-webkit-fill-available"}},[i("comhead",{ref:"comhead",attrs:{isLeftIcon:"icon-zuo",leftIconName:"angle-left",title:"订单详情",isRightIcon:"true"},on:{leftClick:!1}}),t._v(" "),i("div",{staticStyle:{"background-color":"#f7f7f7",display:"flex","justify-content":"space-between",padding:"10px","font-size":"16px","align-items":"center"}},[i("div",{staticStyle:{"font-size":"16px"}},[t._v("订单金额（含运费）：￥"+t._s(t.detail.orderTotalPrice.toFixed(2)))]),t._v(" "),"APPLY_REFUND"==t.detail.detailList[0].refundStatus||"WAIT_GOODS_BACK"==t.detail.detailList[0].refundStatus||"WAIT_RECVGOODS"==t.detail.detailList[0].refundStatus?i("span",{staticStyle:{color:"red"}},[t._v("退款中")]):t._e(),t._v(" "),"WITHOUT_REFUND"==t.detail.detailList[0].refundStatus?i("span",{style:t.formatStatusColor(t.detail.orderStatus)},[t._v(t._s(t.formatStatus(t.detail.orderStatus)))]):t._e(),t._v(" "),"SUCCEED_REFUND"==t.detail.detailList[0].refundStatus?i("span",{staticStyle:{color:"#ffc630"}},[t._v("已退款")]):t._e()]),t._v(" "),t._m(0),t._v(" "),i("div",{staticStyle:{display:"flex","align-items":"center",padding:"10px"}},[i("div",{staticStyle:{flex:"1"}},[i("div",{staticStyle:{"font-size":"16px",display:"flex","justify-content":"space-between"}},[i("span",[t._v("收货人："+t._s(t.detail.contactName))]),t._v(" "),i("span",{staticStyle:{"margin-right":"10px"}},[t._v(t._s(t.detail.contactPhone))])]),t._v(" "),i("div",{staticStyle:{display:"flex","align-items":"center",padding:"5px","font-size":"14px"}},[t._m(1),t._v(" "),i("div",{staticClass:"lineTwo"},[t._v("\n                     收货地址：    "+t._s(t.detail.provinceName)+t._s(t.detail.cityName)+t._s(t.detail.countryName)+t._s(t.detail.address)+"\n                    ")])])])]),t._v(" "),i("div",{staticStyle:{height:"10px","background-color":"#f7f7f7"}}),t._v(" "),i("div",{},t._l(t.detail.detailList,function(e,a){return i("div",[i("div",{staticClass:"product"},[i("div",{staticStyle:{display:"flex","align-items":"center"}},[i("img",{directives:[{name:"lazy",rawName:"v-lazy",value:e.goodsImg,expression:"item.goodsImg"}],staticStyle:{height:"70px",width:"70px"}})]),t._v(" "),i("div",{staticStyle:{"font-size":"16px",flex:"1",overflow:"hidden",padding:"0 10px"}},[i("div",{staticStyle:{height:"100%"}},[i("div",{staticClass:"lineTwoType"},[t._v(t._s(e.goodsName))]),t._v(" "),i("div",{staticStyle:{overflow:"hidden","text-overflow":"ellipsis","white-space":"nowrap",color:"#999"}},[i("div",{staticStyle:{"font-size":"14px",color:"#666"}},[t._v(t._s(e.jingle))])])])]),t._v(" "),i("div",{staticStyle:{"text-align":"center","font-size":"14px"}},[i("div",[t._v("￥"+t._s(e.goodsPrice))]),t._v(" "),i("div",{staticClass:"labelPrice"},[t._v("￥"+t._s(e.goodsPrice))]),t._v(" "),i("div",[t._v("X "+t._s(e.goodsNum))])])])])})),t._v(" "),i("div",{},[i("div",{staticStyle:{"margin-left":"10px","border-bottom":"1px #e5e5e5 solid",display:"flex","justify-content":"space-between",padding:"10px"}},[i("div",[t._v("运费")]),t._v(" "),i("div",{staticStyle:{"margin-right":"10px"}},[t._v("￥"+t._s(t.detail.transportPrice.toFixed(2)))])]),t._v(" "),i("div",{staticStyle:{margin:"0 0 0 10px",display:"flex","justify-content":"space-between",padding:"10px","border-bottom":"1px #e5e5e5 solid"}},[i("div",[t._v("订单总价")]),t._v(" "),i("div",{staticClass:"marketPrice",staticStyle:{"margin-right":"10px"}},[t._v("￥"+t._s(t.detail.orderTotalPrice.toFixed(2)))])]),t._v(" "),i("div",{staticStyle:{margin:"0 0 0 10px",display:"flex","justify-content":"flex-end",padding:"10px"}},["ORDER_WAIT_PAY"===t.detail.orderStatus?i("div",{staticClass:"settingBody"},[i("van-button",{staticStyle:{"margin-right":"10px"},attrs:{size:"small"},on:{click:function(e){t.doCancel()}}},[t._v("取消订单")]),t._v(" "),i("van-button",{staticStyle:{"margin-right":"10px"},style:t.formatButtonColor(),attrs:{size:"small"},on:{click:function(e){t.payOrder()}}},[t._v("支付订单")])],1):t._e(),t._v(" "),"WITHOUT_REFUND"==t.detail.detailList[0].refundStatus&&"ORDER_CANCEL_PAY"!==t.detail.orderStatus?i("van-button",{staticStyle:{"margin-right":"10px"},style:t.formatButtonColor(),attrs:{size:"small"},on:{click:function(e){t.doRefund()}}},[t._v("申请退款")]):t._e(),t._v(" "),"APPLY_REFUND"==t.detail.detailList[0].refundStatus?i("van-button",{staticStyle:{"margin-right":"10px"},style:t.formatButtonColor(),attrs:{size:"small"},on:{click:function(e){t.cancelRefund()}}},[t._v("取消退款")]):t._e(),t._v(" "),"ORDER_CANCEL_PAY"===t.detail.orderStatus?i("div",{staticClass:"settingBody"},[i("van-button",{staticStyle:{"margin-right":"10px"},style:t.formatButtonColor(),attrs:{size:"small"},on:{click:function(e){t.buyAgain()}}},[t._v("再次购买")])],1):t._e()],1)]),t._v(" "),i("div",{staticStyle:{height:"10px","background-color":"#f7f7f7"}}),t._v(" "),i("div",{staticStyle:{padding:"10px","line-height":"24px",color:"#999"}},[t.detail.orderId?i("div",[t._v("\n        订单编号："+t._s(t.detail.orderId)+"\n    ")]):t._e(),t._v(" "),t.detail.createTime?i("div",[t._v("\n        创建时间："+t._s(t.detail.createTime)+"\n    ")]):t._e(),t._v(" "),t.detail.payTime?i("div",[t._v("\n        支付时间："+t._s(t.detail.payTime)+"\n    ")]):t._e(),t._v(" "),t.detail.shipTime?i("div",[t._v("\n        发货时间："+t._s(t.detail.shipTime)+"\n    ")]):t._e(),t._v(" "),t.detail.detailList[0].refundOrderList[0]?i("div",[t._v("\n        申请退款时间："+t._s(t.detail.detailList[0].refundOrderList[0].createTime)+"\n    ")]):t._e()]),t._v(" "),i("div",{staticStyle:{height:"10px","background-color":"#f7f7f7"}}),t._v(" "),i("div",{staticStyle:{display:"flex","align-items":"center","justify-content":"space-between",padding:"10px","font-size":"14px"}},[i("div",[t._v("服务时间：9:00 - 22:00")]),t._v(" "),i("van-button",{attrs:{size:"small",onclick:"showMeiQia()"}},[t._v("联系客服")])],1),t._v(" "),t.detail.detailList[0].refundOrderList[0]?i("div",[i("div",{staticStyle:{height:"10px","background-color":"#f7f7f7"}}),t._v(" "),i("div",{staticStyle:{margin:"0 0 0 10px",display:"flex","justify-content":"space-between",padding:"10px","border-bottom":"1px #e5e5e5 solid"}},[i("div",[t._v("售后类型")]),t._v(" "),i("div",{staticStyle:{"margin-right":"10px"}},[t._v(t._s("REFUND"==t.detail.detailList[0].refundOrderList[0].refundType?"退款":"退货/退款")+" ")])]),t._v(" "),i("div",{staticStyle:{margin:"0 0 0 10px",padding:"10px"}},[i("div",[t._v("\n        售后原因\n      ")]),t._v(" "),i("p",{staticStyle:{color:"#999"}},[t._v("\n        "+t._s(t.detail.detailList[0].refundOrderList[0].refundReason)+"\n      ")])]),t._v(" "),i("div",{staticStyle:{display:"flex"}},t._l(t.detail.detailList[0].refundOrderList[0].refundImg?t.detail.detailList[0].refundOrderList[0].refundImg.split(","):[],function(t){return i("div",[i("img",{staticStyle:{width:"80px",height:"80px",padding:"10px"},attrs:{src:t}})])})),t._v(" "),"WAIT_GOODS_BACK"==t.detail.detailList[0].refundStatus||"WAIT_RECVGOODS"==t.detail.detailList[0].refundStatus?i("div",[i("div",{staticStyle:{height:"10px","background-color":"#f7f7f7"}}),t._v(" "),t._m(2),t._v(" "),i("div",{staticStyle:{margin:"0 0 0 10px",display:"flex","justify-content":"space-between",padding:"10px"}},[i("span",[t._v(t._s(t.detail.detailList[0].refundOrderList[0].contactName))]),t._v(" "),i("span",{staticStyle:{"margin-right":"10px"}},[t._v(t._s(t.detail.detailList[0].refundOrderList[0].contactMobile))])]),t._v(" "),i("div",{staticStyle:{display:"flex",margin:"0 0 0 10px","align-items":"center",padding:"5px","font-size":"14px","border-bottom":"1px #e5e5e5 solid"}},[t._m(3),t._v(" "),i("div",{staticClass:"lineTwo"},[t._v("\n                         "+t._s(t.detail.detailList[0].refundOrderList[0].provinceName)+t._s(t.detail.detailList[0].refundOrderList[0].cityName)+t._s(t.detail.detailList[0].refundOrderList[0].countryName)+t._s(t.detail.detailList[0].refundOrderList[0].address))])])]):t._e()]):t._e(),t._v(" "),"WAIT_GOODS_BACK"==t.detail.detailList[0].refundStatus||"WAIT_RECVGOODS"==t.detail.detailList[0].refundStatus?i("div",{staticStyle:{margin:"0 0 0 10px",display:"flex","justify-content":"space-between",padding:"10px","border-bottom":"1px #e5e5e5 solid"}},[i("div",[t._v("物流单号:"),t.detail.detailList[0].refundOrderList[0].transNo?i("span",{staticStyle:{color:"#999"}},[t._v(t._s(t.detail.detailList[0].refundOrderList[0].transNo))]):i("span",[t._v("未填写")])]),t._v(" "),t.detail.detailList[0].refundOrderList[0].transNo?t._e():i("van-button",{style:t.formatButtonColor(),attrs:{size:"small"},on:{click:function(e){t.inputTransNo()}}},[t._v("填写")])],1):t._e()],1)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticStyle:{display:"flex",height:"5px"}},[e("img",{staticStyle:{width:"100%"},attrs:{src:i("AQsh")}})])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",[e("i",{staticClass:"iconfont icon-location",staticStyle:{"margin-right":"10px","font-size":"22px"}})])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticStyle:{margin:"0 0 0 10px",display:"flex","justify-content":"space-between",padding:"10px","border-bottom":"1px #e5e5e5 solid"}},[e("div",[this._v("请在七天内将商品寄回一下地址并填写物流单号：")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",[e("i",{staticClass:"iconfont icon-location",staticStyle:{"margin-right":"10px","font-size":"22px"}})])}]};var p=i("VU/8")(c,u,!1,function(t){i("V90a")},"data-v-0e266c78",null);e.default=p.exports}});
//# sourceMappingURL=40.d039d39ecb89f29c77ee.js.map