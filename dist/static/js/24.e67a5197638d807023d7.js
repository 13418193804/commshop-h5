webpackJsonp([24],{ZQ92:function(t,e){},zHOx:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=s("TToO"),i=s("7+uW"),a=s("c+8m"),n=s.n(a),r=s("DZ+H"),l=s("ipus"),d=s("Fd2+"),c=s("TJML"),p=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.loginName="",e.password="",e.repassword="",e.smsCode="",e.isGetverify=!0,e.timerNum=60,e.timer=60,e}return o.c(e,t),e.prototype.timelop=function(){var t=this;console.log("获取验证码"),t.timer=setInterval(function(){t.isGetverify=!0,t.timerNum>=1?t.timerNum--:(clearInterval(t.timer),t.timerNum=60),t.setLoginVerifyCode(t.timerNum),console.log(t.timerNum)},1e3)},e.prototype.getVistyCode=function(){var t=this;""!=this.loginName?this.isGetverify&&i.default.prototype.$reqFormPost("/auth/getsmscode",{mobile:this.loginName,type:"FINDPASSWORD"},function(e){if(null!=e){if(200!=e.data.status)return console.log("需控制错误码"+e.data.status+",错误信息："+e.data.message),void Object(d.c)(e.data.message);Object(d.c)("发送成功"),t.timelop()}else console.log("网络请求错误！")}):Object(d.c)("请输入手机号码")},e.prototype.vistyText=function(){return this.$store.getters[i.default.prototype.MutationTreeType.VERCODE]<60?(this.isGetverify=!1,this.$store.getters[i.default.prototype.MutationTreeType.VERCODE]+"s"):(this.isGetverify=!0,"获取验证码")},e.prototype.doforget=function(){var t=this;""!=this.loginName?""!=this.smsCode?""!=this.repassword?""!=this.password?this.password.length<6||this.repassword.length<6?Object(d.c)("最低字符为6位"):this.password==this.repassword?i.default.prototype.$reqFormPost("/user/password/find",{mobile:this.loginName,password:s("VI/i").createHash("md5").update(this.password).digest("hex"),smsCode:this.smsCode},function(e){null!=e?200==e.data.status?(Object(d.c)("保存成功"),t.$router.push("/login")):Object(d.c)(e.data.message):console.log("网络请求错误！")}):Object(d.c)("两次输入密码不一致 "):Object(d.c)("请输入新密码"):Object(d.c)("请输入确认密码"):Object(d.c)("请输入验证码"):Object(d.c)("请输入手机号码")},e.prototype.handlePX=function(t,e){return t+":"+this.$store.getters[i.default.prototype.MutationTreeType.SYSTEM].availWidth/750*e+"px;"},e.prototype.mounted=function(){this.$store.getters[i.default.prototype.MutationTreeType.VERCODE]<60&&(this.timerNum=this.$store.getters[i.default.prototype.MutationTreeType.VERCODE],this.timelop())},o.b([Object(l.a)("setLoginVerifyCode")],e.prototype,"setLoginVerifyCode",void 0),e=o.b([n()({components:{comhead:c.a},mixins:[r.a]})],e)}(i.default),u={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"tab-contents"},[s("comhead",{ref:"comhead",attrs:{isLeftIcon:"icon-zuo",leftIconName:"angle-left",title:"密码找回",isRightIcon:"true"},on:{leftClick:!1}}),t._v(" "),s("div",{staticClass:"bodyLabel"},[s("div",{staticStyle:{"text-align":"center"},style:t.handlePX("margin-top",80)},[s("van-field",{staticClass:"sign-input",style:t.handlePX("width",620)+t.handlePX("margin-bottom",36)+t.handlePX("height",90),attrs:{type:"number",placeholder:"请输入手机号码"},model:{value:t.loginName,callback:function(e){t.loginName=e},expression:"loginName"}}),t._v(" "),s("div",{staticClass:"sign-code-group"},[s("van-field",{staticClass:"sign-input",style:t.handlePX("width",295)+t.handlePX("height",90),attrs:{placeholder:"请输入验证码"},model:{value:t.smsCode,callback:function(e){t.smsCode=e},expression:"smsCode"}}),t._v(" "),s("van-button",{staticClass:"sign-mini-button",style:t.handlePX("width",295)+t.handlePX("height",90),attrs:{slot:"button",size:"small",type:"primary"},on:{click:function(e){t.getVistyCode()}},slot:"button"},[t._v(t._s(t.vistyText()))])],1),t._v(" "),s("van-field",{staticClass:"sign-input",style:t.handlePX("width",620)+t.handlePX("margin-top",36)+t.handlePX("height",90),attrs:{type:"password",placeholder:"请输入新密码"},model:{value:t.password,callback:function(e){t.password=e},expression:"password"}}),t._v(" "),s("van-field",{staticClass:"sign-input",style:t.handlePX("width",620)+t.handlePX("margin-top",36)+t.handlePX("height",90),attrs:{type:"password",placeholder:"请再一次输入新密码"},model:{value:t.repassword,callback:function(e){t.repassword=e},expression:"repassword"}}),t._v(" "),s("van-button",{staticClass:"sign-button",staticStyle:{margin:"20px 0"},style:t.handlePX("width",620)+t.handlePX("margin-top",390)+t.handlePX("height",90),attrs:{size:"normal",block:!0},on:{click:function(e){t.doforget()}}},[t._v("保存")])],1)])],1)},staticRenderFns:[]};var h=s("VU/8")(p,u,!1,function(t){s("ZQ92")},"data-v-8119350a",null);e.default=h.exports}});
//# sourceMappingURL=24.e67a5197638d807023d7.js.map