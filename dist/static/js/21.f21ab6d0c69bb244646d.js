webpackJsonp([21],{"G/+7":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=a("TToO"),i=a("7+uW"),s=a("c+8m"),n=a.n(s),l=a("DZ+H"),r=a("ymRw"),d=a("TJML"),c=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.loading=!1,e.pageSize=20,e.messagelist=[],e.page=0,e}return o.c(e,t),e.prototype.loadMore=function(){var t=this;t.loading=!0,setTimeout(function(){t.loading||(t.page+=1,t.getList(),t.loading=!1)},1e3)},e.prototype.getList=function(){var t=this;i.default.prototype.$reqFormPost("/message/list",{userId:this.$store.getters[i.default.prototype.MutationTreeType.TOKEN_INFO].userId,token:this.$store.getters[i.default.prototype.MutationTreeType.TOKEN_INFO].token,page:this.page,pageSize:20},function(e){if(null!=e){if(200!=e.data.status)return console.log("需控制错误码"+e.data.status+",错误信息："+e.data.message),void Object(r.Toast)(e.data.message);console.log(e),t.messagelist=e.data.data.messageList,20==e.data.data.messageList.length&&(t.loading=!1)}else console.log("网络请求错误！")})},e.prototype.handlePX=function(t,e){return t+":"+this.$store.getters[i.default.prototype.MutationTreeType.SYSTEM].availWidth/750*e+"px;"},e.prototype.mounted=function(){this.getList()},e=o.b([n()({components:{comhead:d.a},mixins:[l.a]})],e)}(i.default),u={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"messagePage",staticStyle:{"background-color":"#f3f3f3"}},[a("comhead",{ref:"comhead",attrs:{isLeftIcon:"icon-zuo",leftIconName:"angle-left",title:"消息中心",isRightIcon:"true"},on:{leftClick:!1}}),t._v(" "),a("ul",{directives:[{name:"infinite-scroll",rawName:"v-infinite-scroll",value:t.loadMore,expression:"loadMore"}],attrs:{"infinite-scroll-disabled":t.loading,"infinite-scroll-distance":"20"}},t._l(t.messagelist,function(e,o){return a("li",{key:o},[a("div",{staticStyle:{display:"flex","justify-content":"space-between","border-bottom":"1px solid #f4f4f4","background-color":"#fff"},style:t.handlePX("padding",20)},[a("div",{staticStyle:{"font-size":"12px",color:"#a9a9a9"}},[t._v(t._s(e.content))]),t._v(" "),a("div",{staticStyle:{"font-size":"12px",color:"#a9a9a9","text-align":"right","vertical-align":"middle"},style:t.handlePX("width",300)},[t._v(t._s(e.updateTime))])])])}))],1)},staticRenderFns:[]};var f=a("VU/8")(c,u,!1,function(t){a("aTse")},"data-v-a5774c78",null);e.default=f.exports},aTse:function(t,e){}});
//# sourceMappingURL=21.f21ab6d0c69bb244646d.js.map