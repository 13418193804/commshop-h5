webpackJsonp([28],{bYNF:function(t,e){},xJzD:function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=o("TToO"),a=o("7+uW"),s=o("c+8m"),c=o.n(s),l=o("DZ+H"),r=o("ymRw"),i=o("TJML"),u=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.content="",e}return n.c(e,t),e.prototype.feedback=function(){var t=this;""!=this.content?this.content.length>500?Object(r.Toast)("反馈内容不可大于500字"):a.default.prototype.$reqFormPost("/feedback/add",{userId:this.$store.getters[a.default.prototype.MutationTreeType.TOKEN_INFO].userId,token:this.$store.getters[a.default.prototype.MutationTreeType.TOKEN_INFO].token,content:this.content},function(e){if(null!=e){if(console.log(e),200!=e.data.status)return console.log("需控制错误码"+e.data.status+",错误信息："+e.data.message),void Object(r.Toast)(e.data.message);Object(r.Toast)("已提交"),console.log("res.data",e.data),t.$router.go(-1)}else console.log("网络请求错误！")}):Object(r.Toast)("请输入反馈内容")},e.prototype.handlePX=function(t,e){return t+":"+this.$store.getters[a.default.prototype.MutationTreeType.SYSTEM].availWidth/750*e+"px;"},e.prototype.mounted=function(){console.log("收藏页面")},e=n.b([c()({components:{comhead:i.a},mixins:[l.a]})],e)}(a.default),d={render:function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"tab-contents",staticStyle:{height:"-webkit-fill-available","background-color":"#f3f3f3"}},[o("comhead",{ref:"comhead",attrs:{isLeftIcon:"icon-zuo",leftIconName:"angle-left",title:"意见反馈",isRightIcon:"true"},on:{leftClick:!1}}),t._v(" "),o("van-cell-group",[o("van-field",{style:t.handlePX("padding",30),attrs:{type:"textarea",placeholder:"请输入反馈意见",rows:"7",autosize:""},model:{value:t.content,callback:function(e){t.content=e},expression:"content"}}),t._v(" "),o("div",{staticStyle:{"text-align":"right",padding:"10px",color:"#666"}},[o("span",{style:t.content.length>500?"color:red":""},[t._v(t._s(t.content.length))]),t._v("/500")])],1),t._v(" "),o("div",{staticStyle:{"margin-top":"20px"}},[o("van-button",{attrs:{size:"large"},on:{click:function(e){t.feedback()}}},[t._v("提交")])],1)],1)},staticRenderFns:[]};var f=o("VU/8")(u,d,!1,function(t){o("bYNF")},"data-v-732b5a74",null);e.default=f.exports}});
//# sourceMappingURL=28.99e1945b2afa4391b32b.js.map