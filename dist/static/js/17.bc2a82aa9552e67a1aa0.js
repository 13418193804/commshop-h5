webpackJsonp([17],{"6taJ":function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=o("TToO"),a=o("7+uW"),s=o("c+8m"),i=o.n(s),n=o("DZ+H"),d=o("ymRw"),l=o("TJML"),u=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.loading=!1,e.finished=!1,e.orderList={orderList:{orderList:[],pageSize:10,loading:!0},orderList_pay:{orderList:[],pageSize:10,loading:!0},orderList_send:{orderList:[],pageSize:10,loading:!0},orderList_reacv:{orderList:[],pageSize:10,loading:!0},orderList_finish:{orderList:[],pageSize:10,loading:!0},orderList_refund:{orderList:[],pageSize:10,loading:!0}},e.active=0,e.orderTitleList=[{name:"全部",status:""},{name:"待付款",status:"ORDER_WAIT_PAY"},{name:"待发货",status:"ORDER_WAIT_SENDGOODS"},{name:"待收货",status:"ORDER_WAIT_RECVGOODS"},{name:"待评价",status:"ORDER_WAIT_REVIEW"},{name:"退换/售后",status:"REFUND"}],e}return r.c(e,t),e.prototype.onLoad=function(){setTimeout(function(){},500)},e.prototype.doDeleteOrder=function(t){var e=this;d.Dialog.confirm({title:"提示",message:"删除订单?"}).then(function(){a.default.prototype.$reqFormPost("/order/delete",{userId:e.$store.getters[a.default.prototype.MutationTreeType.TOKEN_INFO].userId,token:e.$store.getters[a.default.prototype.MutationTreeType.TOKEN_INFO].token,orderId:t},function(t){if(null!=t)return 200!=t.data.status?(console.log("需控制错误码"+t.data.status+",错误信息："+t.data.message),void Object(d.Toast)(t.data.message)):void e.getOrderList(e.orderTitleList[e.active].status,!0);console.log("网络请求错误！")})}).catch(function(){})},e.prototype.payOrder=function(t){this.$router.push({name:"pay",query:{body:t.orderTitle,payId:t.payNo,payTotal:t.payTotal}})},e.prototype.loadMore=function(){var t=this;this.loading=!0;setTimeout(function(){t.orderList[t.returnKey()].pageSize+=10,t.getOrderList(t.orderTitleList[t.active].status)},1e3)},e.prototype.doCancel=function(t){var e=this;a.default.prototype.$reqFormPost("/order/cancel",{userId:this.$store.getters[a.default.prototype.MutationTreeType.TOKEN_INFO].userId,token:this.$store.getters[a.default.prototype.MutationTreeType.TOKEN_INFO].token,orderId:t.orderId},function(t){if(null!=t){if(200!=t.data.status)return console.log("需控制错误码"+t.data.status+",错误信息："+t.data.message),void Object(d.Toast)(t.data.message);e.getOrderList(e.orderTitleList[e.active].status,!0),console.log("取消订单")}else console.log("网络请求错误！")})},e.prototype.doRefund=function(t){console.log(t.orderId),this.$router.push({name:"refund",query:{orderId:t.orderId}})},e.prototype.formatStatusColor=function(t){switch(t){case"ORDER_WAIT_SENDGOODS":case"ORDER_WAIT_RECVGOODS":case"ORDER_CANCEL_PAY":case"ORDER_WAIT_PAY":return"color:red";case"ORDER_WAIT_REVIEW":return"color:#ffc630";case"ORDER_FINISH":return"color:#ffc630;";case"ORDER_END_GOODS":return"color:#ffc630"}},e.prototype.getShip=function(t){this.$router.push({name:"ship",query:t})},e.prototype.buyAgain=function(t){var e=this;a.default.prototype.$reqFormPost("/order/buyagain",{userId:this.$store.getters[a.default.prototype.MutationTreeType.TOKEN_INFO].userId,token:this.$store.getters[a.default.prototype.MutationTreeType.TOKEN_INFO].token,orderId:t},function(t){if(null!=t)return 200!=t.data.status?(console.log("需控制错误码"+t.data.status+",错误信息："+t.data.message),void Object(d.Toast)(t.data.message)):void e.$router.push({name:"cart"});console.log("网络请求错误！")})},e.prototype.recvgoods=function(t){var e=this;d.Dialog.confirm({title:"提示",message:"确认收货?"}).then(function(){a.default.prototype.$reqFormPost("/order/recvgoods",{userId:e.$store.getters[a.default.prototype.MutationTreeType.TOKEN_INFO].userId,token:e.$store.getters[a.default.prototype.MutationTreeType.TOKEN_INFO].token,orderId:t},function(t){if(null!=t)return 200!=t.data.status?(console.log("需控制错误码"+t.data.status+",错误信息："+t.data.message),void Object(d.Toast)(t.data.message)):void e.getOrderList(e.orderTitleList[e.active].status,!0);console.log("网络请求错误！")})}).catch(function(){})},e.prototype.formatButtonColor=function(){return"border-color:#ffc630;color:#ffc630"},e.prototype.formatStatus=function(t){switch(t){case"ORDER_WAIT_PAY":return"未付款";case"ORDER_CANCEL_PAY":return"已取消";case"ORDER_WAIT_SENDGOODS":return"未发货";case"ORDER_WAIT_RECVGOODS":return"未收货";case"ORDER_END_GOODS":return"已评论";case"ORDER_WAIT_REVIEW":return"待评价";case"ORDER_FINISH":return"交易完成"}},e.prototype.returnKey=function(){switch(this.active){case 0:return"orderList";case 1:return"orderList_pay";case 2:return"orderList_send";case 3:return"orderList_reacv";case 4:return"orderList_finish";case 5:return"orderList_refund"}},e.prototype.getOrderList=function(t,e){var o=this;void 0===e&&(e=!1);var r=this.returnKey();a.default.prototype.$reqFormPost("REFUND"!=t?"/order/queryorder":"/refund/order/query",{userId:this.$store.getters[a.default.prototype.MutationTreeType.TOKEN_INFO].userId,token:this.$store.getters[a.default.prototype.MutationTreeType.TOKEN_INFO].token,orderStatus:t,page:0,pageSize:this.orderList[r].pageSize},function(t){if(null!=t)return 200!=t.data.status?(console.log("需控制错误码"+t.data.status+",错误信息："+t.data.message),void Object(d.Toast)(t.data.message)):void((o.orderList[r].loading||e)&&(o.orderList[r].orderList=t.data.data.orderList,t.data.data.orderList.length!=o.orderList[r].pageSize&&(o.orderList[r].loading=!1)));console.log("网络请求错误！")})},e.prototype.goDetail=function(t){this.$router.push({name:"orderdetail",query:{orderId:t.orderId}})},e.prototype.gocomment=function(t){this.$router.push({name:"addcomment",query:{orderId:t.orderId}})},e.prototype.changePage=function(t){this.active=t,this.getOrderList(this.orderTitleList[t].status,!0)},e.prototype.mounted=function(){var t=this;this.orderTitleList.forEach(function(e,o){t.$route.query.orderStatus!=e.status||(t.active=o)}),"REFUND"!==this.$route.query.orderStatus&&this.getOrderList(this.orderTitleList[this.active].status)},e=r.b([i()({components:{comhead:l.a},mixins:[n.a]})],e)}(a.default),c={render:function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"tab-contents"},[o("comhead",{ref:"comhead",attrs:{isLeftIcon:"icon-zuo",leftIconName:"angle-left",title:"我的订单",isRightIcon:"true"},on:{leftClick:!1}}),t._v(" "),o("van-tabs",{attrs:{active:t.active,sticky:!0},on:{click:t.changePage}},[o("ul",{directives:[{name:"infinite-scroll",rawName:"v-infinite-scroll",value:t.loadMore,expression:"loadMore"}],attrs:{"infinite-scroll-disabled":t.loading,"infinite-scroll-distance":"20"}},[t._l(t.orderTitleList,function(e,r){return o("van-tab",{key:r,attrs:{title:e.name}},[t.active==r?o("div",t._l(t.orderList[t.returnKey()].orderList,function(e,r){return o("li",{key:r,on:{click:function(o){t.goDetail(e)}}},[o("div",[o("div",{staticClass:"orderTitle textLabel"},[o("div",{staticStyle:{"padding-left":"10px"}},[t._v("\n                订单号:"+t._s(e.orderId)+"\n              ")]),t._v(" "),o("div",{staticClass:"flex flex-align-center"},["5"!=t.active?o("span",{style:t.formatStatusColor(e.orderStatus)},[t._v(t._s(t.formatStatus(e.orderStatus)))]):t._e(),t._v(" "),"5"==t.active?o("span",["APPLY_REFUND"==e.detailList[0].refundStatus?o("span",{staticStyle:{color:"red"}},[t._v("退款中")]):t._e(),t._v(" "),"SUCCEED_REFUND"==e.detailList[0].refundStatus?o("span",{staticStyle:{color:"red"}},[t._v("退款完成")]):t._e(),t._v(" "),"WAIT_GOODS_BACK"==e.detailList[0].refundStatus?o("span",{staticStyle:{color:"red"}},[t._v("退款中")]):t._e(),t._v(" "),"WAIT_RECVGOODS"==e.detailList[0].refundStatus?o("span",{staticStyle:{color:"red"}},[t._v("退款中")]):t._e(),t._v(" "),"FAIL_REFUND"==e.detailList[0].refundStatus?o("span",{staticStyle:{color:"red"}},[t._v("已拒绝")]):t._e()]):t._e(),t._v(" "),"ORDER_WAIT_REVIEW"!==e.orderStatus&&"ORDER_END_GOODS"!==e.orderStatus&&"ORDER_FINISH"!==e.orderStatus||"WITHOUT_REFUND"!=e.detailList[0].refundStatus?o("div",{staticStyle:{width:"10px"}}):o("div",{staticStyle:{padding:"0 15px",position:"relative"},on:{click:function(o){o.stopPropagation(),t.doDeleteOrder(e.orderId)}}},[o("div",{staticClass:"deleteBorder"}),t._v(" "),o("i",{staticClass:"iconfont icon-iconfontshanchu3"})])])]),t._v(" "),o("div",{staticClass:"detailBody"},t._l(e.detailList,function(e){return o("div",[o("div",{staticClass:"product1"},[o("div",{staticClass:"flex flex-align-center"},[o("img",{directives:[{name:"lazy",rawName:"v-lazy",value:e.goodsImg,expression:"items.goodsImg"}],staticStyle:{height:"80px",width:"80px"}})]),t._v(" "),o("div",{staticClass:"flex-1",staticStyle:{"font-size":"12px",overflow:"hidden",padding:"0 10px"}},[o("div",{staticClass:"lineTwoType"},[t._v(t._s(e.goodsName))]),t._v(" "),o("div",{staticStyle:{overflow:"hidden","text-overflow":"ellipsis",color:"#999"}},[o("div",[t._v(" "+t._s(e.jingle))])])]),t._v(" "),o("div",{staticStyle:{"text-align":"center","font-size":"14px"}},[o("div",[t._v("￥"+t._s(e.goodsPrice))]),t._v(" "),e.labelPrice?o("div",{staticClass:"labelPrice"},[t._v("￥"+t._s(e.labelPrice))]):t._e(),t._v(" "),o("div",[t._v("X "+t._s(e.goodsNum))])])])])})),t._v(" "),o("div",{staticStyle:{"text-align":"right","font-size":"15px",padding:"5px 10px"}},[o("span",{staticStyle:{margin:"0 10rpx"}},[t._v("共"),o("span",{staticStyle:{margin:"0 10rpx"}},[t._v("\n          "+t._s(e.orderGoodsNum)+"\n        ")]),t._v("件商品")]),t._v(" "),o("span",[t._v("合计："),o("span",[t._v("￥"+t._s(e.orderTotalPrice.toFixed(2)))]),t._v(" "),o("span",[t._v("(含运费"+t._s(e.transportPrice.toFixed(2))+")")])])]),t._v(" "),"ORDER_WAIT_PAY"===e.orderStatus?o("div",{staticClass:"settingBody"},[o("van-button",{staticStyle:{"margin-right":"10px"},attrs:{size:"small"},on:{click:function(o){o.stopPropagation(),t.doCancel(e)}}},[t._v("取消订单")]),t._v(" "),o("van-button",{staticStyle:{"margin-right":"10px"},style:t.formatButtonColor(),attrs:{size:"small"},on:{click:function(o){o.stopPropagation(),t.payOrder(e)}}},[t._v("支付订单")])],1):t._e(),t._v(" "),"ORDER_WAIT_SENDGOODS"===e.orderStatus?o("div",{staticClass:"settingBody"},["APPLY_REFUND"==e.detailList[0].refundStatus&&"FAIL_REFUND"!==e.detailList[0].refundStatus?o("van-button",{staticStyle:{"margin-right":"10px"},style:t.formatButtonColor(),attrs:{size:"small"},on:{click:function(o){o.stopPropagation(),t.goDetail(e)}}},[t._v("取消退款")]):t._e(),t._v(" "),"WITHOUT_REFUND"==e.detailList[0].refundStatus||"FAIL_REFUND"==e.detailList[0].refundStatus?o("van-button",{staticStyle:{"margin-right":"10px"},style:t.formatButtonColor(),attrs:{size:"small"},on:{click:function(o){o.stopPropagation(),t.doRefund(e)}}},[t._v("申请退款")]):t._e()],1):t._e(),t._v(" "),"ORDER_WAIT_RECVGOODS"===e.orderStatus?o("div",{staticClass:"settingBody"},["WITHOUT_REFUND"==e.detailList[0].refundStatus||"FAIL_REFUND"==e.detailList[0].refundStatus?o("div",[o("van-button",{staticStyle:{"margin-right":"10px"},attrs:{size:"small"},on:{click:function(o){o.stopPropagation(),t.getShip(e)}}},[t._v("查看物流")]),t._v(" "),o("van-button",{staticStyle:{"margin-right":"10px"},attrs:{size:"small"},on:{click:function(o){o.stopPropagation(),t.doRefund(e)}}},[t._v("退货/退款")]),t._v(" "),o("van-button",{staticStyle:{"margin-right":"10px"},style:t.formatButtonColor(),attrs:{size:"small"},on:{click:function(o){o.stopPropagation(),t.recvgoods(e.orderId)}}},[t._v("确认收货")])],1):t._e(),t._v(" "),"APPLY_REFUND"==e.detailList[0].refundStatus&&"FAIL_REFUND"!==e.detailList[0].refundStatus?o("div",["WITHOUT_REFUND"!==e.detailList[0].refundStatus&&"FAIL_REFUND"!==e.detailList[0].refundStatus?o("van-button",{staticStyle:{"margin-right":"10px"},style:t.formatButtonColor(),attrs:{size:"small"},on:{click:function(o){o.stopPropagation(),t.goDetail(e)}}},[t._v("取消退款")]):t._e()],1):t._e()]):t._e(),t._v(" "),"ORDER_WAIT_REVIEW"===e.orderStatus||"ORDER_FINISH"===e.orderStatus?o("div",{staticClass:"settingBody"},["WITHOUT_REFUND"==e.detailList[0].refundStatus||"FAIL_REFUND"==e.detailList[0].refundStatus?o("div",[o("van-button",{staticStyle:{"margin-right":"10px"},style:t.formatButtonColor(),attrs:{size:"small"},on:{click:function(o){o.stopPropagation(),t.buyAgain(e.orderId)}}},[t._v("再次购买")]),t._v(" "),"ORDER_WAIT_REVIEW"===e.orderStatus?o("van-button",{staticStyle:{"margin-right":"10px"},attrs:{size:"small"},on:{click:function(o){o.stopPropagation(),t.doRefund(e)}}},[t._v("退换/售后")]):t._e(),t._v(" "),"ORDER_WAIT_REVIEW"===e.orderStatus?o("van-button",{staticStyle:{"margin-right":"10px"},style:t.formatButtonColor(),attrs:{size:"small"},on:{click:function(o){o.stopPropagation(),t.gocomment(e)}}},[t._v("评价商品")]):t._e()],1):t._e(),t._v(" "),"APPLY_REFUND"==e.detailList[0].refundStatus&&"FAIL_REFUND"!==e.detailList[0].refundStatus?o("div",["APPLY_REFUND"==e.detailList[0].refundStatus&&"FAIL_REFUND"!==e.detailList[0].refundStatus?o("van-button",{staticStyle:{"margin-right":"10px"},style:t.formatButtonColor(),attrs:{size:"small"},on:{click:function(o){o.stopPropagation(),t.goDetail(e)}}},[t._v("取消退款")]):t._e()],1):t._e()]):t._e(),t._v(" "),"ORDER_END_GOODS"===e.orderStatus?o("div",{staticClass:"settingBody"},["WITHOUT_REFUND"==e.detailList[0].refundStatus||"FAIL_REFUND"==e.detailList[0].refundStatus?o("div",[o("van-button",{staticStyle:{"margin-right":"10px"},attrs:{size:"small"},on:{click:function(o){o.stopPropagation(),t.doRefund(e)}}},[t._v("退换/售后")]),t._v(" "),o("van-button",{staticStyle:{"margin-right":"10px"},style:t.formatButtonColor(),attrs:{size:"small"},on:{click:function(o){o.stopPropagation(),t.getShip(e)}}},[t._v("查看物流")])],1):t._e(),t._v(" "),"APPLY_REFUND"==e.detailList[0].refundStatus&&"FAIL_REFUND"!==e.detailList[0].refundStatus?o("div",["APPLY_REFUND"==e.detailList[0].refundStatus&&"FAIL_REFUND"!==e.detailList[0].refundStatus?o("van-button",{staticStyle:{"margin-right":"10px"},style:t.formatButtonColor(),attrs:{size:"small"},on:{click:function(o){o.stopPropagation(),t.goDetail(e)}}},[t._v("取消退款")]):t._e()],1):t._e()]):t._e(),t._v(" "),"ORDER_CANCEL_PAY"===e.orderStatus?o("div",{staticClass:"settingBody"},[o("van-button",{staticStyle:{"margin-right":"10px"},style:t.formatButtonColor(),attrs:{size:"small"},on:{click:function(o){o.stopPropagation(),t.buyAgain(e.orderId)}}},[t._v("再次购买")])],1):t._e(),t._v(" "),o("div",{staticStyle:{"background-color":"#f7f7f7",height:"10px"}})])])})):t._e()])}),t._v(" "),o("div",{staticClass:"flex flex-align-center flex-pack-center",staticStyle:{"font-size":"14px",padding:"15px"}},[t.orderList[t.returnKey()].loading?o("div",[t._v("加载中...")]):o("div",[t._v("-")])])],2)])],1)},staticRenderFns:[]};var _=o("VU/8")(u,c,!1,function(t){o("jwDZ"),o("Eh0T")},"data-v-563fada0",null);e.default=_.exports},Eh0T:function(t,e){},jwDZ:function(t,e){}});
//# sourceMappingURL=17.bc2a82aa9552e67a1aa0.js.map