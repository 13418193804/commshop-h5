webpackJsonp([38],{Q444:function(t,e){},xJzD:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n("TToO"),a=n("7+uW"),c=n("c+8m"),l=n.n(c),s=n("DZ+H"),r=n("Fd2+"),i=n("TJML"),u=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.content="",e}return o.c(e,t),e.prototype.feedback=function(){var t=this;""!=this.content?this.content.length>500?Object(r.c)("反馈内容不可大于500字"):a.default.prototype.$reqFormPost("/feedback/add",{userId:this.$store.getters[a.default.prototype.MutationTreeType.TOKEN_INFO].userId,token:this.$store.getters[a.default.prototype.MutationTreeType.TOKEN_INFO].token,content:this.content},function(e){if(null!=e){if(console.log(e),200!=e.data.status)return console.log("需控制错误码"+e.data.status+",错误信息："+e.data.message),void Object(r.c)(e.data.message);Object(r.c)("反馈意见成功，谢谢您"),console.log("res.data",e.data),t.$router.go(-1)}else console.log("网络请求错误！")}):Object(r.c)("请输入反馈内容")},e.prototype.handlePX=function(t,e){return t+":"+this.$store.getters[a.default.prototype.MutationTreeType.SYSTEM].availWidth/750*e+"px;"},e.prototype.mounted=function(){console.log("收藏页面")},e=o.b([l()({components:{comhead:i.a},mixins:[s.a]})],e)}(a.default),d={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"tab-contents",staticStyle:{height:"-webkit-fill-available","background-color":"#f3f3f3"}},[n("comhead",{ref:"comhead",attrs:{isLeftIcon:"icon-zuo",leftIconName:"angle-left",title:"意见反馈",isRightIcon:"true"},on:{leftClick:!1}}),t._v(" "),n("van-cell-group",[n("van-field",{style:t.handlePX("padding",30),attrs:{type:"textarea",placeholder:"请输入反馈意见",rows:"7",autosize:""},model:{value:t.content,callback:function(e){t.content=e},expression:"content"}}),t._v(" "),n("div",{staticStyle:{"text-align":"right",padding:"10px",color:"#666"}},[n("span",{style:t.content.length>500?"color:red":""},[t._v(t._s(t.content.length))]),t._v("/500")])],1),t._v(" "),n("div",{staticStyle:{"margin-top":"20px"}},[n("van-button",{attrs:{size:"large"},on:{click:function(e){t.feedback()}}},[t._v("提交")])],1)],1)},staticRenderFns:[]};var f=n("VU/8")(u,d,!1,function(t){n("Q444")},"data-v-1e461672",null);e.default=f.exports}});
//# sourceMappingURL=38.1f2e88425835c7250dca.js.map