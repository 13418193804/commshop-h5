webpackJsonp([13],{"7czF":function(t,e){},Mdtb:function(t,e){},eZIo:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a("TToO"),i=a("7+uW"),c=a("c+8m"),n=a.n(c),o=a("gN+L"),l=a("DZ+H"),r=a("ipus"),d=a("ymRw"),u=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.catList=[],e.selectIndex=0,e.catContent=[],e.value="",e}return s.c(e,t),e.prototype.mounted=function(){this.setTabIndex(1),console.log(this.$store.getters[i.default.prototype.MutationTreeType.TAB_INDEX]),this.getCatList(),console.log("分类页加载")},e.prototype.filterProduct=function(){this.$router.push("/filterproduct")},e.prototype.goProductList=function(t,e,a){this.$router.push({path:"/productlist",query:{catId:t,parentCatId:e,selectIndex:a,title:this.catList[this.selectIndex].catName}})},e.prototype.selectCategoyItem=function(t){this.selectIndex=t,this.catContent=this.catList[t].children},e.prototype.getCatList=function(){var t=this;i.default.prototype.$reqFormPost("/user/cat/querytree",{},function(e){if(null!=e){if(200!=e.data.status)return console.log("需控制错误码"+e.data.status+",错误信息："+e.data.message),void Object(d.Toast)(e.data.message);console.log("selectCategoyItem",e.data.data.children),t.catList=e.data.data.children,t.selectCategoyItem(t.selectIndex)}else console.log("网络请求错误！")})},s.b([Object(r.a)("setTabIndex")],e.prototype,"setTabIndex",void 0),e=s.b([n()({components:{Swipe:o.a},mixins:[l.a]})],e)}(i.default),p={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"tab-contents"},[a("div",{staticClass:"searchbox",staticStyle:{display:"flex"}},[a("van-search",{staticStyle:{flex:"1","background-color":"#fafafa"},attrs:{placeholder:"搜索商品"},on:{click:function(e){t.filterProduct()}},model:{value:t.value,callback:function(e){t.value=e},expression:"value"}})],1),t._v(" "),a("div",{staticClass:"contentBody"},[a("div",{staticClass:"leftTitle"},t._l(t.catList,function(e,s){return a("div",{key:s,staticClass:"left-box-item",class:s==t.selectIndex?"active":"fontcolor",on:{click:function(e){t.selectCategoyItem(s)}}},[a("div",{staticStyle:{display:"flex",position:"relative","justify-content":"center","align-items":"center"}},[a("div",{staticClass:"activeItem"}),t._v("\n            "+t._s(e.label))])])})),t._v(" "),a("div",{staticClass:"rightContent"},[t._l(t.catList,function(e,s){return s==t.selectIndex?a("div",{key:s,staticStyle:{"text-align":"center","margin-top":"15px","font-size":"16px"}},[t._v(t._s(e.catName))]):t._e()}),t._v(" "),a("div",{staticClass:"catList"},t._l(t.catContent,function(e,s){return a("div",{key:s,staticStyle:{width:"33%",padding:"15px",overflow:"hidden"},on:{click:function(a){t.goProductList(e.catId,e.parentId,s)}}},[a("div",{staticClass:"cat-item"},[a("div",[a("img",{directives:[{name:"lazy",rawName:"v-lazy",value:e.catIcon,expression:"item.catIcon"}],staticStyle:{"border-radius":"50px"},attrs:{alt:""}})]),t._v(" "),a("div",[t._v(t._s(e.catName))])])])}))],2)])])},staticRenderFns:[]};var f=a("VU/8")(u,p,!1,function(t){a("Mdtb"),a("7czF")},"data-v-2d6317e3",null);e.default=f.exports}});
//# sourceMappingURL=13.29964a663e60040d2f63.js.map