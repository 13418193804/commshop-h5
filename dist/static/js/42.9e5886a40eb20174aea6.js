webpackJsonp([42],{Vl1s:function(t,e){},kmGg:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=s("TToO"),i=s("7+uW"),o=s("c+8m"),n=s.n(o),c=s("DZ+H"),l=s("Fd2+"),r=s("TJML"),v=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.loading=!1,e.pageSize=20,e.messagelist=[],e.page=0,e}return a.c(e,t),e.prototype.go_feedback=function(){this.$router.push("/feedback")},e.prototype.loadMore=function(){var t=this;t.loading=!0,setTimeout(function(){t.loading||(t.page+=1,t.getList(),t.loading=!1)},1e3)},e.prototype.getList=function(){var t=this;i.default.prototype.$reqFormPost("/message/list",{userId:this.$store.getters[i.default.prototype.MutationTreeType.TOKEN_INFO].userId,token:this.$store.getters[i.default.prototype.MutationTreeType.TOKEN_INFO].token,page:this.page,pageSize:20},function(e){if(null!=e){if(200!=e.data.status)return console.log("需控制错误码"+e.data.status+",错误信息："+e.data.message),void Object(l.c)(e.data.message);console.log(e),t.messagelist=e.data.data.messageList,20==e.data.data.messageList.length&&(t.loading=!1)}else console.log("网络请求错误！")})},e.prototype.handlePX=function(t,e){return t+":"+this.$store.getters[i.default.prototype.MutationTreeType.SYSTEM].availWidth/750*e+"px;"},e.prototype.mounted=function(){this.getList()},e=a.b([n()({components:{comhead:r.a},mixins:[c.a]})],e)}(i.default),d={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"messagePage",staticStyle:{"background-color":"#f3f3f3"}},[s("comhead",{ref:"comhead",attrs:{isLeftIcon:"icon-zuo",leftIconName:"angle-left",title:"客服",isRightIcon:"true"},on:{leftClick:!1}}),t._v(" "),t._m(0),t._v(" "),s("div",{staticClass:"van-hairline--top-bottom van-tabbar van-tabbar--fixed",staticStyle:{"z-index":"2"}},[s("div",{staticClass:"van-tabbar-item",on:{click:function(e){t.go_feedback()}}},[t._v("意见反馈")]),t._v(" "),s("div",{staticClass:"van-tabbar-item",attrs:{onclick:"showMeiQiasoMessage('')"}},[t._v("在线客服")])])],1)},staticRenderFns:[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"sev_box"},[s("h5",[t._v("热点问题")]),t._v(" "),s("ul",{staticClass:"sev_list"},[s("li",{attrs:{onclick:"showMeiQiasoMessage('什么时候发货?')"}},[s("div",{staticClass:"li_icon"},[s("i",{staticClass:"iconfont icon-youjiantou"})]),t._v("1.什么时候发货?")]),t._v(" "),s("li",{attrs:{onclick:"showMeiQiasoMessage('我获得了商品，还需要支付其他费用吗?')"}},[s("div",{staticClass:"li_icon"},[s("i",{staticClass:"iconfont icon-youjiantou"})]),t._v("2.我获得了商品，还需要支付其他费用吗?")]),t._v(" "),s("li",{attrs:{onclick:"showMeiQiasoMessage('当我获得商品之后我该做什么？')"}},[s("div",{staticClass:"li_icon"},[s("i",{staticClass:"iconfont icon-youjiantou"})]),t._v("3.当我获得商品之后我该做什么？")])]),t._v(" "),s("div",{staticClass:"sev_phone"},[s("h5",[t._v("联系方式")]),t._v(" "),s("p",[t._v("如以上问题未能帮助您，请采取一下方式联系我们。")]),t._v(" "),s("div",{staticClass:"phone"},[s("div",[t._v("客服热线")]),t._v(" "),s("div",[s("p",[t._v("020-84105800")]),t._v(" "),s("p",[t._v("020-84105815")])])]),t._v(" "),s("div",[t._v("微信公众号：zhongyiglt")]),t._v(" "),s("h6",[t._v("(客服工作时间为每天10:00-22:00,剩余时间咨询请将问题反馈至微信公众号，我们及时回复您。)")])])])}]};var u=s("VU/8")(v,d,!1,function(t){s("Vl1s")},"data-v-0fda34e2",null);e.default=u.exports}});
//# sourceMappingURL=42.9e5886a40eb20174aea6.js.map