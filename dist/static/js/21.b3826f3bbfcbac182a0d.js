webpackJsonp([21],{ab8u:function(e,t){},bUHp:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=i("TToO"),o=i("7+uW"),a=i("c+8m"),s=i.n(a),l=i("DZ+H"),r=i("ymRw"),d=i("TJML"),c=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.a="13418193804",t.pageindex=0,t.memberList=[],t.isLoading=!1,t.list=[],t.loading=!1,t.finished=!1,t}return n.c(t,e),t.prototype.getMemberList=function(){var e=this;o.default.prototype.$reqFormPost("/member/list",{userId:this.$store.getters[o.default.prototype.MutationTreeType.TOKEN_INFO].userId,token:this.$store.getters[o.default.prototype.MutationTreeType.TOKEN_INFO].token,page:this.pageindex,pageSize:20},function(t){if(null!=t){if(200!=t.data.status)return console.log("需控制错误码"+t.data.status+",错误信息："+t.data.message),void Object(r.Toast)(t.data.message);console.log("请求完成",t.data.data.memberList);for(var i=e.memberList?e.memberList:[],n=0;n<t.data.data.memberList.length;n++)i.push(t.data.data.memberList[n]);20==t.data.data.memberList.length&&(e.loading=!1),e.memberList=i,console.log(e.finished)}else console.log("网络请求错误！")})},t.prototype.onRefresh=function(){setTimeout(function(){},500)},t.prototype.onLoad=function(){var e=this,t=this;setTimeout(function(){console.log("加载"),console.log("this.finished",e.finished),console.log("this.loading",e.loading),e.finished||(t.pageindex=t.pageindex+1,t.getMemberList())},500)},t.prototype.loadMore=function(){console.log("刷新"),this.loading=!0;var e=this;setTimeout(function(){e.loading||(e.pageindex=e.pageindex+1,e.getMemberList(),e.loading=!1)},1e3)},t.prototype.handlePX=function(e,t){return e+":"+this.$store.getters[o.default.prototype.MutationTreeType.SYSTEM].availWidth/750*t+"px;"},t.prototype.mounted=function(){console.log("mount"),this.getMemberList(),console.log("我的成员")},t=n.b([s()({components:{comhead:d.a},mixins:[l.a]})],t)}(o.default),u={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"tab-contents"},[n("comhead",{ref:"comhead",attrs:{isLeftIcon:"icon-zuo",leftIconName:"angle-left",title:"我的成员",isRightIcon:"true"},on:{leftClick:!1}}),e._v(" "),n("ul",{directives:[{name:"infinite-scroll",rawName:"v-infinite-scroll",value:e.loadMore,expression:"loadMore"}],attrs:{"infinite-scroll-disabled":e.loading,"infinite-scroll-distance":"20"}},e._l(e.memberList,function(t,o){return n("li",{key:o},[n("div",{staticClass:"van-cell van-hairline",staticStyle:{"justify-content":"space-between"}},[n("div",[t.userIcon?n("img",{directives:[{name:"lazy",rawName:"v-lazy",value:t.userIcon,expression:"item.userIcon"}],staticStyle:{"vertical-align":"middle","border-radius":"100%"},style:e.handlePX("width",85)+e.handlePX("height",85)}):n("img",{staticStyle:{"vertical-align":"middle","border-radius":"100%"},style:e.handlePX("width",85)+e.handlePX("height",85),attrs:{src:i("nqO4")}}),e._v(" "),n("span",[e._v(e._s(t.nickName))])]),e._v(" "),n("div",{},[n("span",{style:e.handlePX("line-height",85)},[e._v(" "+e._s(t.mobile.substring(0,3))+"****"+e._s(t.mobile.substring(7,13))+" ")])])])])})),e._v(" "),n("div",{staticClass:"flex flex-pack-center flex-align-center",staticStyle:{"font-size":"14px",padding:"15px"}},[e.loading?n("div",[0==e.memberList.length?n("p",{staticStyle:{"padding-top":"120px",color:"#818181"}},[e._v("暂无成员")]):e._e()]):n("div",[e._v("加载中...")])])],1)},staticRenderFns:[]};var m=i("VU/8")(c,u,!1,function(e){i("ab8u")},"data-v-ff472660",null);t.default=m.exports}});
//# sourceMappingURL=21.b3826f3bbfcbac182a0d.js.map