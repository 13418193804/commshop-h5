webpackJsonp([17],{"90dd":function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=o("TToO"),s=o("7+uW"),a=o("c+8m"),l=o.n(a),n=o("DZ+H"),c=o("Fd2+"),d=o("TJML"),r=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.goodsList=[],e.checkedGoods=[],e.isShow=!1,e}return i.c(e,t),e.prototype.toggle=function(){this.isShow=!this.isShow},e.prototype.favdelete=function(){var t=this;0!=this.checkedGoods.length?c.a.confirm({title:"提示",message:"确定要取消收藏吗？"}).then(function(){s.default.prototype.$reqFormPost("/fav/delete",{userId:t.$store.getters[s.default.prototype.MutationTreeType.TOKEN_INFO].userId,token:t.$store.getters[s.default.prototype.MutationTreeType.TOKEN_INFO].token,goodsIds:t.checkedGoods},function(e){if(null!=e)return 200!=e.data.status?(console.log("需控制错误码"+e.data.status+",错误信息："+e.data.message),void Object(c.c)(e.data.message)):void t.getProductList();console.log("网络请求错误！")})}).catch(function(){}):Object(c.c)("没有选商品")},e.prototype.allchange=function(){if(this.goodsList.length==this.checkedGoods.length)this.checkedGoods=[];else{var t=[];this.goodsList.forEach(function(e,o){console.log(),t.push(e.goodsId)}),this.checkedGoods=t}},e.prototype.getProductList=function(){var t=this;s.default.prototype.$reqFormPost("/fav/query",{userId:this.$store.getters[s.default.prototype.MutationTreeType.TOKEN_INFO].userId,token:this.$store.getters[s.default.prototype.MutationTreeType.TOKEN_INFO].token,page:0,pageSize:20},function(e){if(null!=e){if(200!=e.data.status)return console.log("需控制错误码"+e.data.status+",错误信息："+e.data.message),void Object(c.c)(e.data.message);t.goodsList=e.data.data.goodsList,console.log(e.data.data.goodsList)}else console.log("网络请求错误！")})},e.prototype.goProductDetail=function(t){this.$router.push({path:"/productdetail",query:{goodsId:t}})},e.prototype.handlePX=function(t,e){return t+":"+this.$store.getters[s.default.prototype.MutationTreeType.SYSTEM].availWidth/750*e+"px;"},e.prototype.mounted=function(){this.getProductList(),console.log("收藏页面")},e=i.b([l()({components:{comhead:d.a},mixins:[n.a]})],e)}(s.default),h={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"tab-contents",staticStyle:{height:"-webkit-fill-available","background-color":"#FFFFFF"}},[t.goodsList.length>0?i("comhead",{ref:"comhead",attrs:{isLeftIcon:"icon-zuo",leftIconName:"angle-left",rightTitle:t.isShow?"取消":"编辑",title:"我的收藏"},on:{rightClick:function(e){t.toggle()},leftClick:!1}}):t._e(),t._v(" "),0==t.goodsList.length?i("comhead",{ref:"comhead",attrs:{isLeftIcon:"icon-zuo",leftIconName:"angle-left",title:"我的收藏"},on:{leftClick:!1}}):t._e(),t._v(" "),t._l(t.goodsList,function(e,s){return i("div",{key:s,staticClass:"flex flex-align-center",staticStyle:{"flex-direction":"row","border-bottom":"1px solid #e5e5e5"}},[i("div",[i("van-checkbox-group",{model:{value:t.checkedGoods,callback:function(e){t.checkedGoods=e},expression:"checkedGoods"}},[i("van-checkbox",{directives:[{name:"show",rawName:"v-show",value:t.isShow,expression:"isShow"}],staticStyle:{"margin-left":"5px"},attrs:{name:e.goodsId}})],1)],1),t._v(" "),i("div",{staticClass:"flex",style:t.handlePX("width",720),attrs:{for:e.goodsId},on:{click:function(o){t.goProductDetail(e.goodsId)}}},[i("div",{staticClass:"flex flex-1",staticStyle:{padding:"10px"}},[i("div",{staticClass:"flex flex-pack-center flex-align-center",staticStyle:{overflow:"hidden"},style:t.handlePX("height",200)+t.handlePX("width",200)},[i("img",{directives:[{name:"lazy",rawName:"v-lazy",value:e.goodsImg.split(",")[0],expression:"item.goodsImg.split(',')[0]"}],staticStyle:{width:"100%"}})]),t._v(" "),i("div",{staticClass:"textLabel flex-1",staticStyle:{"padding-left":"10px"},style:t.handlePX("line-height",48)},[i("div",{staticClass:"flex flex-align-center",staticStyle:{"max-width":"calc"}},[e.isBargain?i("img",{staticStyle:{"vertical-align":"middle"},style:t.handlePX("width",92)+t.handlePX("height",30),attrs:{src:o("mdn+")}}):t._e(),t._v(" "),i("div",{staticClass:"textLabel",staticStyle:{color:"#000000","white-space":"nowrap",overflow:"hidden","text-overflow":"ellipsis"},style:t.handlePX("font-size",28)+t.handlePX("width",320)},[t._v(t._s(e.goodsName))])]),t._v(" "),i("div",{staticClass:"textLabel",staticStyle:{color:"#A3A3A3"},style:t.handlePX("font-size",28)+t.handlePX("line-height",44)+t.handlePX("width",t.isShow?"370":"460")},[t._v(t._s(e.jingle))]),t._v(" "),i("div",{staticStyle:{"padding-top":"5px"}},[i("span",{staticStyle:{color:"#E05459"},style:t.handlePX("font-size",34)},[t._v("￥"+t._s(e.marketPrice))]),t._v(" "),i("span",{staticStyle:{color:"#C5C4C4","text-decoration":"line-through","margin-left":"5px"},style:t.handlePX("font-size",24)},[t._v("原价:"+t._s(e.labelPrice))])])])])])])}),t._v(" "),0==t.goodsList.length?i("div",{staticStyle:{position:"fixed",left:"50%",top:"50%","-webkit-transform":"translate(-50%, -50%)",transform:"translate(-50%, -50%)"}},[t._v("\n    暂无收藏\n  ")]):t._e(),t._v(" "),t.goodsList.length>0&&1==t.isShow?i("div",{staticClass:"flex",staticStyle:{position:"fixed","z-index":"100",bottom:"0",left:"0",right:"0","background-color":"#fafafa"}},[i("div",{staticClass:"flex-1",staticStyle:{color:"#a3a3a3","text-align":"center",padding:"10px 0"},on:{click:function(e){t.allchange()}}},[t._v(t._s(t.goodsList.length==t.checkedGoods.length?"取消全选":"全选"))]),t._v(" "),i("div",{staticClass:"flex-1",staticStyle:{color:"#e05459","text-align":"center",padding:"10px 0"},on:{click:function(e){t.favdelete()}}},[t._v("删除")])]):t._e()],2)},staticRenderFns:[]};var g=o("VU/8")(r,h,!1,function(t){o("uGQs")},"data-v-2a967f70",null);e.default=g.exports},"mdn+":function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFwAAAAeCAYAAAChf3k/AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkI0RUFENjU4MzNDOTExRTg5MTcxQzc4RjMyRTZBMTkzIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkI0RUFENjU5MzNDOTExRTg5MTcxQzc4RjMyRTZBMTkzIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QjRFQUQ2NTYzM0M5MTFFODkxNzFDNzhGMzJFNkExOTMiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QjRFQUQ2NTczM0M5MTFFODkxNzFDNzhGMzJFNkExOTMiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6SOI1EAAAEZklEQVR42uxaPYgTQRTeHOEsFFzB5hB0LQXhoiiWtymOAxUuQRtFuLXTQry0IiSxl+QqvSo5EK68nJYW2SsF8VY4sLxY2QbUQgvjG/wGnsPs7kw2e9fsg48ssz8z881733uz2dKflRUHNk94RLhHuEw45RSWxX4QDgjbhNeE36JxDifPET4QlgnPCAuEUoFMWACXy+BWcOyUyMPn0bBDeFE4Zi72nHCXcEMQ/oQOhK7cLnjJ1d4S3gtJuU94WfCRu3UE14Lwq4SPFjcK6Tm0uN4jtAjuEUyqQhjiN87E+cDweeuEmqbdxXPWLcYmOL5SRnXy3eLGBgj3CaFmwh5+L+BXTj4iDDTPm1j0XYpp9/F8F8dJiyvO7xn29xRzHGi8Vc6tTxgbPEtwfKJs2PEQA1XbuFUJTQwiQtsuoY1BJw1KDHor4fxagld6GEs15nyA+9XnLSlOFCnX1PDsXc2CBehPEN8j1E09pmzh1S4GMFJCy0VbxDy5aikFXzXRok4ySbIcLKjOs0eKR/uatnGMd48U73ZBcB/jfUjYh7R0Z0l4BB0WnnFR0bgm2sbO8ZjLwpwfj7HwobKYTZDdSllgH4Sq+Us6oOSlwfrrpw12zmJiXXhTTQnNwTGSLfPGrPtvsuiQ1kNfdaW/LojumSRRUYdPEpKRtBYjWIbjaXTQhyTITr0EPe4rk5BJc6RpV2XDixmn9Lo6vHLIPLvFyDNNyOvwWJmXIvQhPT7Oi3vQ9j68XucEE1NJWVJWvInjkJExYOTETTLUENs26H8vJfzbCQscWkZLEyTL6mofUlVn5WBVuaeDts9MXhpZNLyq8cqtGB0M2fXS40oG0TOtfm8kkJoUOR1Fj7kjNVgV1sYCyDzma8bgM3kJk6K17ByPBay6iJMdP6E6GbH6t5WSTCsplY/PHGVD8W7HJBFqCozMVYquDm8q0lGyGNRaApkhIzxJmvopSU8muKHB3OT4w7w9zbYO54NM26ykWRgjVWnXDDUJ1Uee8TWbmaqFpGT24FnW4RWUhC22WXHR3mJhvHvE8iSTWoQFCtjuVi7IqmY3OGaLamqLWUvQOUsZWI0JXzfHmtgkoZ8RL4ZiIi6C53dm0JeX1cNtCA803juA3gZK8jlKi1IWOUL9HPfmz4bsCkq/3CUlgBfrEtUAnr+ovFMxKen8Ka5xp4iiAUq2LNEX4P5B3oS7kI1+TH0pNx2HKKtsNhnDKa+ZJooaGeRBbojaWSXTJmm2nf9fdY7Zb8AKfxspaKRUILprsmjxjiIrGxb3RZbzy/Quha90DSR3NRuJUONFgWZzUokpsXymyR6rPkzu5f3FRaOnbLjCBL3mz0nqU1ZqJlE3EYT/ooOzjt2/PoXZm/jO55uoUj4RrhV85G7XCQeC8O0pdluFTZe0twXhm4Tzzr+PVQrLxwS34k/1TUG40PBbhDuEd9i5nSw4ymwnwaX4AEh8dXVTcF1SPuZ8THhAuFSQntl+Er4Q3hBeOfiY868AAwDTFiW0iVOcbAAAAABJRU5ErkJggg=="},uGQs:function(t,e){}});
//# sourceMappingURL=17.2609c8563e2b894eb759.js.map