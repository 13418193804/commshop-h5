webpackJsonp([33],{"7w8z":function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=o("TToO"),i=o("7+uW"),a=o("c+8m"),c=o.n(a),r=o("DZ+H"),l=o("ipus"),u=o("ymRw"),s=o("TJML"),f=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return n.c(e,t),e.prototype.go_info=function(){this.$router.push("/essential_information")},e.prototype.go_feedback=function(){this.$router.push("/feedback")},e.prototype.aboutus=function(){this.$router.push("/about_us")},e.prototype.modify_pw=function(){this.$router.push({path:"/update_info",query:{updatename:"password"}})},e.prototype.exit_logon=function(){var t=this;u.Dialog.confirm({title:"提示",message:"是否退出登陆?"}).then(function(){t.setTokenInfo({userId:"",token:""}),localStorage.removeItem(i.default.prototype.MutationTreeType.TOKEN_INFO),t.$router.push("/login")}).catch(function(){})},e.prototype.handlePX=function(t,e){return t+":"+this.$store.getters[i.default.prototype.MutationTreeType.SYSTEM].availWidth/750*e+"px;"},e.prototype.mounted=function(){console.log("收藏页面")},n.b([Object(l.a)("setTokenInfo")],e.prototype,"setTokenInfo",void 0),e=n.b([c()({components:{comhead:s.a},mixins:[r.a]})],e)}(i.default),p={render:function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"tab-contents",staticStyle:{height:"-webkit-fill-available","background-color":"#f3f3f3"}},[o("comhead",{ref:"comhead",attrs:{isLeftIcon:"icon-zuo",leftIconName:"angle-left",title:"设置",isRightIcon:"true"},on:{leftClick:!1}}),t._v(" "),o("van-cell-group",[o("van-cell",{attrs:{title:"基本信息","is-link":""},on:{click:function(e){t.go_info()}}}),t._v(" "),o("van-cell",{attrs:{title:"修改密码","is-link":""},on:{click:function(e){t.modify_pw()}}}),t._v(" "),o("van-cell",{attrs:{title:"意见反馈","is-link":""},on:{click:function(e){t.go_feedback()}}}),t._v(" "),o("van-cell",{attrs:{title:"关于我们","is-link":""},on:{click:function(e){t.aboutus()}}})],1),t._v(" "),o("div",{staticStyle:{"margin-top":"20px"}},[o("van-button",{attrs:{size:"large"},on:{click:function(e){t.exit_logon()}}},[t._v("退出登录")])],1)],1)},staticRenderFns:[]};var d=o("VU/8")(f,p,!1,function(t){o("ZYo7")},"data-v-1f60871d",null);e.default=d.exports},ZYo7:function(t,e){}});
//# sourceMappingURL=33.4779ca33f8d8fcc61beb.js.map