webpackJsonp([7],{QlWu:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=a("TToO"),n=a("7+uW"),s=a("c+8m"),i=a.n(s),l=a("DZ+H"),r=a("ipus"),c=a("ymRw"),d=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.loginName="13418193804",e.password="5164659",e}return o.c(e,t),e.prototype.clearLoginName=function(){console.log(111)},e.prototype.doLogin=function(){var t=this;""!=this.loginName&&""!=this.password&&n.default.prototype.$reqFormPost("/auth/user/login",{loginName:this.loginName,password:this.password},function(e){if(null!=e){if(console.log(e),200!=e.data.status)return console.log("需控制错误码"+e.data.status+",错误信息："+e.data.message),void Object(c.Toast)(e.data.message);t.setTokenInfo(e.data.data),localStorage.setItem(n.default.prototype.MutationTreeType.TOKEN_INFO,JSON.stringify(e.data.data)),t.$router.push("/")}else console.log("网络请求错误！")})},e.prototype.mounted=function(){},o.b([Object(r.a)("setTokenInfo")],e.prototype,"setTokenInfo",void 0),e=o.b([i()({components:{},mixins:[l.a]})],e)}(n.default),u={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"tab-contents"},[a("div",{staticClass:"bodyLabel"},[a("div",{staticStyle:{"text-align":"center"}},[a("img",{directives:[{name:"lazy",rawName:"v-lazy",value:"1",expression:"'1'"}],staticStyle:{width:"100px",height:"100px","border-radius":"50px",margin:"20px 0"}}),t._v(" "),a("van-field",{attrs:{label:"用户名",placeholder:"请输入用户名"},model:{value:t.loginName,callback:function(e){t.loginName=e},expression:"loginName"}}),t._v(" "),a("van-field",{attrs:{type:"password",label:"密码",placeholder:"请输入密码"},model:{value:t.password,callback:function(e){t.password=e},expression:"password"}}),t._v(" "),a("van-button",{staticStyle:{margin:"20px 0"},attrs:{size:"normal",block:!0},on:{click:function(e){t.doLogin()}}},[t._v("登陆")])],1)])])},staticRenderFns:[]};var p=a("VU/8")(d,u,!1,function(t){a("zA16")},"data-v-5c672a36",null);e.default=p.exports},zA16:function(t,e){}});
//# sourceMappingURL=7.1919f6270858c5f0defa.js.map