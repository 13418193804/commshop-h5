webpackJsonp([2],{"3vSQ":function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=i("TToO"),s=i("7+uW"),l=i("c+8m"),n=i.n(l),o=i("DZ+H"),d=i("ipus"),c=i("ymRw"),h=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.images=["https://img.yzcdn.cn/1.jpg","https://img.yzcdn.cn/2.jpg"],e.indexList=[],e.active=0,e.value="",e.isShow=!1,e}return a.c(e,t),e.prototype.initIndex=function(){var t=this;s.default.prototype.$reqUrlGet("/page/list",{},function(e){if(null!=e){if(200!=e.data.status)return console.log("需控制错误码"+e.data.status+",错误信息："+e.data.message),void Object(c.Toast)(e.data.message);t.indexList=e.data.data,t.indexList.length>0&&t.changeTab(t.active)}else console.log("网络请求错误！")})},e.prototype.changeTab=function(t){var e=this;this.active=t,this.isShow=!1,this.indexList[t].children||s.default.prototype.$reqFormPost("/page/info",{pageId:this.indexList[t].pageId},function(i){null!=i?200==i.data.status?(console.log("---------"),Object.assign(e.indexList[t],{children:i.data.data}),console.log(e.indexList[t]),e.indexList.push()):Object(c.Toast)(i.data.message):console.log("网络请求错误！")})},e.prototype.toggle=function(){this.isShow=!this.isShow},e.prototype.handleImageWidth=function(){return"width:"+.45*this.$store.getters[s.default.prototype.MutationTreeType.SYSTEM].availWidth+"px;height:"+.45*this.$store.getters[s.default.prototype.MutationTreeType.SYSTEM].availWidth+"px;"},e.prototype.handleImageWidth1=function(){return"width:"+.35*this.$store.getters[s.default.prototype.MutationTreeType.SYSTEM].availWidth+"px;height:"+.35*this.$store.getters[s.default.prototype.MutationTreeType.SYSTEM].availWidth+"px;"},e.prototype.handlePX=function(t,e){return t+":"+this.$store.getters[s.default.prototype.MutationTreeType.SYSTEM].availWidth/750*e+"px;"},e.prototype.mounted=function(){this.setTabIndex(0),this.initIndex()},a.b([Object(d.a)("setTabIndex")],e.prototype,"setTabIndex",void 0),e=a.b([n()({components:{},mixins:[o.a]})],e)}(s.default),r={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"tab-contents"},[a("div",{staticStyle:{display:"flex"}},[a("van-search",{staticStyle:{flex:"1"},attrs:{placeholder:"搜索商品"},model:{value:t.value,callback:function(e){t.value=e},expression:"value"}}),t._v(" "),t._m(0)],1),t._v(" "),a("div",{staticStyle:{position:"relative"}},[a("div",{directives:[{name:"show",rawName:"v-show",value:t.isShow,expression:"isShow"}],staticClass:"AllClassification"},[a("div",{staticClass:"ClassificationTitle"},[a("span",[t._v("全部分类")]),a("img",{directives:[{name:"lazy",rawName:"v-lazy",value:"1",expression:"'1'"}],staticStyle:{width:"20px",height:"20px"},on:{click:function(e){t.toggle()}}})]),t._v(" "),a("div",{staticClass:"ClassificationName"},t._l(t.indexList,function(e,i){return a("div",{key:i},[a("div",{class:i==t.active?"ClassificationActive":"",on:{click:function(e){t.changeTab(i)}}},[t._v(t._s(e.pageName))])])}))]),t._v(" "),a("van-tabs",{staticClass:"index_tabs",staticStyle:{flex:"1"},attrs:{active:t.active},on:{click:t.changeTab}},t._l(t.indexList,function(e,s){return a("van-tab",{attrs:{title:e.pageName}},[t._l(e.children,function(e){return a("div",["COMPONENT_TYPE_SCROLL_HEADER"===e.componentType?a("div",[a("van-swipe",{staticStyle:{height:"200px","z-index":"999"},attrs:{autoplay:3e3}},t._l(e.items,function(t,e){return a("van-swipe-item",[a("img",{directives:[{name:"lazy",rawName:"v-lazy",value:t.itemImgUrl,expression:"image.itemImgUrl"}],staticStyle:{width:"100%"}})])}))],1):t._e(),t._v(" "),"COMPONENT_TYPE_QUICK_BAR"===e.componentType?a("div",[a("div",{staticClass:"tab_box"},t._l(e.items,function(e,i){return a("div",{staticStyle:{width:"25%"}},[a("div",{staticStyle:{width:"-webkit-fill-available",padding:"10px"}},[a("div",[a("img",{directives:[{name:"lazy",rawName:"v-lazy",value:e.itemImgUrl,expression:"tab.itemImgUrl"}],staticStyle:{"border-radius":"50%"},style:t.handlePX("width",100)+t.handlePX("height",100)})]),t._v(" "),a("div",[t._v(t._s(e.itemName))])])])}))]):t._e(),t._v(" "),"COMPONENT_TYPE_GOODS_TAG"===e.componentType?a("div",[a("div",{staticClass:"goodsTitleTab"},[a("div",{},[a("span",{staticStyle:{color:"#ffc630",margin:"0 3px"}},[t._v("C")]),t._v(" "),a("span",[t._v(t._s(e.name))]),t._v(" "),a("div",{staticStyle:{"font-size":"12px",color:"#999"}},[t._v("\n                    CUSTOM RECOMMENDATION\n                  ")])])]),t._v(" "),1===e.columnNum?a("div",{staticClass:"goodsBody"},t._l(e.items,function(e,s){return a("div",{staticClass:"goodsItem",staticStyle:{width:"-webkit-fill-available","border-top":"1px solid #e5e5e5"}},[a("div",{staticStyle:{width:"-webkit-fill-available",padding:"10px",display:"flex"}},[a("div",{staticStyle:{display:"flex","align-items":"center","justify-content":"center",overflow:"hidden"},style:t.handlePX("height",270)+t.handlePX("width",270)},[a("img",{directives:[{name:"lazy",rawName:"v-lazy",value:e.goodsImg.split(",")[0],expression:"goods.goodsImg.split(',')[0]"}],staticStyle:{width:"100%"}})]),t._v(" "),a("div",{staticClass:"textLabel",staticStyle:{"padding-left":"10px",flex:"1"},style:t.handlePX("line-height",48)},[a("div",[a("img",{staticStyle:{"vertical-align":"middle"},style:t.handlePX("width",92)+t.handlePX("height",30),attrs:{src:i("mdn+")}}),t._v(" "),a("span",{staticClass:"textLabel",staticStyle:{color:"#000000"},style:t.handlePX("font-size",28)},[t._v(t._s(e.goodsName))])]),t._v(" "),a("div",{staticClass:"textLabel",staticStyle:{color:"#A3A3A3"},style:t.handlePX("font-size",28)+t.handlePX("line-height",44)},[t._v(t._s(e.jingle))]),t._v(" "),a("div",[a("span",{staticStyle:{color:"#E05459"},style:t.handlePX("font-size",34)},[t._v("￥"+t._s(e.marketPrice))]),t._v(" "),a("span",{staticStyle:{color:"#C5C4C4","text-decoration":"line-through"},style:t.handlePX("font-size",24)},[t._v("原价:"+t._s(e.labelPrice))])]),t._v(" "),a("van-button",{staticStyle:{"border-radius":"4%","background-color":"#F4C542",color:"#FFFFFF",border:"#F4C542"},style:t.handlePX("width",200)+t.handlePX("height",55)+t.handlePX("line-height",55)},[t._v("立即抢购")])],1)])])})):t._e(),t._v(" "),2===e.columnNum?a("div",{staticClass:"goodsBody",staticStyle:{padding:"10px 0","border-top":"1px #e5e5e5 solid"}},t._l(e.items,function(e,s){return a("div",{staticClass:"goodsItem"},[a("div",{staticStyle:{width:"-webkit-fill-available"}},[a("div",{staticStyle:{border:"1px #e5e5e5 solid","box-sizing":"border-box",display:"flex","align-items":"center","justify-content":"center",overflow:"hidden",position:"relative",margin:"5px auto"},style:t.handlePX("height",410)+t.handlePX("width",345)},[a("img",{staticStyle:{width:"-webkit-fill-available",position:"absolute",top:"0",left:"0"},style:t.handlePX("width",43)+t.handlePX("height",49),attrs:{src:i("HORy")}}),t._v(" "),a("img",{directives:[{name:"lazy",rawName:"v-lazy",value:e.goodsImg.split(",")[0],expression:"goods.goodsImg.split(',')[0]"}],staticStyle:{width:"-webkit-fill-available",position:"absolute",top:"0","z-index":"-1"}}),t._v(" "),a("div",{staticClass:"textLabel",staticStyle:{position:"absolute",bottom:"0",width:"100%","background-color":"rgba(207,207,207,0.3)","text-align":"center",color:"#A3A3A3"},style:t.handlePX("height",70)+t.handlePX("line-height",70)+t.handlePX("font-size",28)},[t._v(t._s(e.jingle))])]),t._v(" "),a("div",{staticStyle:{margin:"5px auto",display:"flex","justify-content":"center","flex-direction":"column",width:"-webkit-fill-available"},style:t.handlePX("width",345)},[a("div",[a("img",{style:t.handlePX("width",52)+t.handlePX("height",25),attrs:{src:i("ILWi")}}),t._v(" "),a("img",{style:t.handlePX("width",52)+t.handlePX("height",25),attrs:{src:i("tp/U")}})]),t._v(" "),a("div",{staticClass:"textLabel",style:t.handlePX("font-size",28)+t.handlePX("line-height",40)},[t._v(t._s(e.goodsName))]),t._v(" "),a("div",{staticStyle:{color:"#E05459"},style:t.handlePX("font-size",30)+t.handlePX("line-height",40)},[t._v("￥"+t._s(e.labelPrice))])])])])})):t._e(),t._v(" "),a("div",{staticStyle:{height:"10px","background-color":"#f7f7f7"}})]):t._e()])}),t._v(" "),a("div",{staticStyle:{height:"50px"}})],2)})),t._v(" "),a("div",{staticStyle:{position:"absolute",top:"0",right:"0",height:"44px","line-height":"44px",padding:"0 5px"}},[a("i",{staticClass:"iconfont icon-icon-arrow-bottom2",on:{click:function(e){t.toggle()}}})])],1)])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",[e("div",{staticStyle:{"font-size":"12px","text-alig":"center","background-color":"rgb(242, 242, 242)",color:"#666",padding:"2px 10px 4px 0"}},[e("div",{staticStyle:{display:"flex","justify-content":"center","align-items":"center"}},[e("i",{staticClass:"iconfont icon-xiaoxitianchong",staticStyle:{"font-size":"16px",margin:"3px"}})]),this._v(" "),e("div",{staticStyle:{"line-height":"15px"}},[this._v("消息")])])])}]};var v=i("VU/8")(h,r,!1,function(t){i("fvWz"),i("4ce2")},"data-v-4e9f42fc",null);e.default=v.exports},"4ce2":function(t,e){},fvWz:function(t,e){},"mdn+":function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFwAAAAeCAYAAAChf3k/AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkI0RUFENjU4MzNDOTExRTg5MTcxQzc4RjMyRTZBMTkzIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkI0RUFENjU5MzNDOTExRTg5MTcxQzc4RjMyRTZBMTkzIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QjRFQUQ2NTYzM0M5MTFFODkxNzFDNzhGMzJFNkExOTMiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QjRFQUQ2NTczM0M5MTFFODkxNzFDNzhGMzJFNkExOTMiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6SOI1EAAAEZklEQVR42uxaPYgTQRTeHOEsFFzB5hB0LQXhoiiWtymOAxUuQRtFuLXTQry0IiSxl+QqvSo5EK68nJYW2SsF8VY4sLxY2QbUQgvjG/wGnsPs7kw2e9fsg48ssz8z881733uz2dKflRUHNk94RLhHuEw45RSWxX4QDgjbhNeE36JxDifPET4QlgnPCAuEUoFMWACXy+BWcOyUyMPn0bBDeFE4Zi72nHCXcEMQ/oQOhK7cLnjJ1d4S3gtJuU94WfCRu3UE14Lwq4SPFjcK6Tm0uN4jtAjuEUyqQhjiN87E+cDweeuEmqbdxXPWLcYmOL5SRnXy3eLGBgj3CaFmwh5+L+BXTj4iDDTPm1j0XYpp9/F8F8dJiyvO7xn29xRzHGi8Vc6tTxgbPEtwfKJs2PEQA1XbuFUJTQwiQtsuoY1BJw1KDHor4fxagld6GEs15nyA+9XnLSlOFCnX1PDsXc2CBehPEN8j1E09pmzh1S4GMFJCy0VbxDy5aikFXzXRok4ySbIcLKjOs0eKR/uatnGMd48U73ZBcB/jfUjYh7R0Z0l4BB0WnnFR0bgm2sbO8ZjLwpwfj7HwobKYTZDdSllgH4Sq+Us6oOSlwfrrpw12zmJiXXhTTQnNwTGSLfPGrPtvsuiQ1kNfdaW/LojumSRRUYdPEpKRtBYjWIbjaXTQhyTITr0EPe4rk5BJc6RpV2XDixmn9Lo6vHLIPLvFyDNNyOvwWJmXIvQhPT7Oi3vQ9j68XucEE1NJWVJWvInjkJExYOTETTLUENs26H8vJfzbCQscWkZLEyTL6mofUlVn5WBVuaeDts9MXhpZNLyq8cqtGB0M2fXS40oG0TOtfm8kkJoUOR1Fj7kjNVgV1sYCyDzma8bgM3kJk6K17ByPBay6iJMdP6E6GbH6t5WSTCsplY/PHGVD8W7HJBFqCozMVYquDm8q0lGyGNRaApkhIzxJmvopSU8muKHB3OT4w7w9zbYO54NM26ykWRgjVWnXDDUJ1Uee8TWbmaqFpGT24FnW4RWUhC22WXHR3mJhvHvE8iSTWoQFCtjuVi7IqmY3OGaLamqLWUvQOUsZWI0JXzfHmtgkoZ8RL4ZiIi6C53dm0JeX1cNtCA803juA3gZK8jlKi1IWOUL9HPfmz4bsCkq/3CUlgBfrEtUAnr+ovFMxKen8Ka5xp4iiAUq2LNEX4P5B3oS7kI1+TH0pNx2HKKtsNhnDKa+ZJooaGeRBbojaWSXTJmm2nf9fdY7Zb8AKfxspaKRUILprsmjxjiIrGxb3RZbzy/Quha90DSR3NRuJUONFgWZzUokpsXymyR6rPkzu5f3FRaOnbLjCBL3mz0nqU1ZqJlE3EYT/ooOzjt2/PoXZm/jO55uoUj4RrhV85G7XCQeC8O0pdluFTZe0twXhm4Tzzr+PVQrLxwS34k/1TUG40PBbhDuEd9i5nSw4ymwnwaX4AEh8dXVTcF1SPuZ8THhAuFSQntl+Er4Q3hBeOfiY868AAwDTFiW0iVOcbAAAAABJRU5ErkJggg=="}});
//# sourceMappingURL=2.5be27f33622c44d5a45e.js.map