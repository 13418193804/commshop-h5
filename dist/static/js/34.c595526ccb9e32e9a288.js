webpackJsonp([34],{Dvln:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=i("TToO"),o=i("7+uW"),s=i("c+8m"),l=i.n(s),n=i("DZ+H"),c=i("Fd2+"),d=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.value="",e.loading=!1,e.catModel=!1,e.catId="",e.sortName="",e.sortStatus="",e.pageindex=10,e.model=!1,e.goodsList=[],e.hotwordList=[],e.catList=[],e}return a.c(e,t),e.prototype.onCancel=function(){this.$router.go(-1)},e.prototype.goProductDetail=function(t){this.$router.push({path:"/productdetail",query:{goodsId:t}})},e.prototype.loadMore=function(){console.log("刷新"),this.loading=!0;var t=this;setTimeout(function(){t.loading||(t.pageindex=t.pageindex+10,t.onSearch(),t.loading=!1)},1e3)},e.prototype.doChange=function(){this.catModel=!1,this.catId="",this.sortName="",this.sortStatus="",this.model=!1},e.prototype.doCatFilter=function(t){this.catModel=!1,this.catId=t.catId,this.onSearch()},e.prototype.doPriceFitler=function(){switch(this.sortName="PRICE",this.sortStatus){case"":this.sortStatus=!0;break;case!0:this.sortStatus=!1;break;case!1:this.sortStatus=""}this.onSearch()},e.prototype.doSelect=function(t){this.value=t,this.onSearch()},e.prototype.onSearch=function(){var t=this;if(""!=(this.value||"")){var e={userId:this.$store.getters[o.default.prototype.MutationTreeType.TOKEN_INFO].userId,token:this.$store.getters[o.default.prototype.MutationTreeType.TOKEN_INFO].token,keyWord:this.value,catId:this.catId,page:0,pageSize:this.pageindex};""!=this.sortStatus&&Object.assign(e,{sortName:this.sortName,sortStatus:this.sortStatus}),o.default.prototype.$reqFormPost("/user/goods/list",e,function(e){if(null!=e){if(200!=e.data.status)return console.log("需控制错误码"+e.data.status+",错误信息："+e.data.message),void Object(c.c)(e.data.message);console.log("请求完成",e.data.data.goodsList),20==e.data.data.goodsList.length&&(t.loading=!1),t.goodsList=e.data.data.goodsList,t.model=!0}else console.log("网络请求错误！")})}},e.prototype.doFilter=function(){var t=this;o.default.prototype.$reqUrlGet("/hotword/query",{},function(e){if(null!=e)return 200!=e.data.status?(console.log("需控制错误码"+e.data.status+",错误信息："+e.data.message),void Object(c.c)(e.data.message)):void(t.hotwordList=e.data.data);console.log("网络请求错误！")})},e.prototype.gethotword=function(){var t=this;o.default.prototype.$reqUrlGet("/hotword/query",{},function(e){if(null!=e)return 200!=e.data.status?(console.log("需控制错误码"+e.data.status+",错误信息："+e.data.message),void Object(c.c)(e.data.message)):void(t.hotwordList=e.data.data);console.log("网络请求错误！")})},e.prototype.handlePX=function(t,e){return t+":"+this.$store.getters[o.default.prototype.MutationTreeType.SYSTEM].availWidth/750*e+"px;"},e.prototype.getCatList=function(){var t=this;o.default.prototype.$reqFormPost("/user/cat/querytree",{},function(e){if(null!=e){if(200!=e.data.status)return console.log("需控制错误码"+e.data.status+",错误信息："+e.data.message),void Object(c.c)(e.data.message);console.log("selectCategoyItem",e.data.data.children),t.catList=e.data.data.children}else console.log("网络请求错误！")})},e.prototype.mounted=function(){this.sortStatus,this.gethotword(),this.getCatList()},e=a.b([l()({components:{},mixins:[n.a]})],e)}(o.default),r={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"tab-contents"},[a("form",{attrs:{action:"/"}},[a("div",{staticClass:"searchbox1 flex   flex-align-center"},[a("div",{staticStyle:{"margin-top":"6px"},on:{click:t.onCancel}},[a("i",{staticClass:"iconfont icon-zuo",staticStyle:{color:"#101010",margin:"10px"}})]),t._v(" "),a("van-search",{staticClass:"flex-1",staticStyle:{"background-color":"#fafafa"},attrs:{placeholder:"搜索商品"},on:{search:t.onSearch,click:function(e){t.doChange()}},model:{value:t.value,callback:function(e){t.value=e},expression:"value"}})],1)]),t._v(" "),a("div",{staticClass:"box"},[a("div",{staticStyle:{height:"60px"}}),t._v(" "),t.model?a("div",{staticStyle:{height:"40px"}}):t._e(),t._v(" "),t.model?t._e():a("div",[a("div",{staticStyle:{height:"10px","background-color":"#f7f7f7"}}),t._v(" "),a("div",{staticClass:"btmTitle"},[t._v("\n    热门搜索\n  ")]),t._v(" "),a("div",{staticClass:"btmTitle flex "},t._l(t.hotwordList,function(e){return a("div",{staticClass:"hotwordItem flex",domProps:{textContent:t._s(e.word)},on:{click:function(i){t.doSelect(e.word)}}})}))]),t._v(" "),t.model?a("div",[t.goodsList.length>0?a("div",{staticClass:"filterHeader flex  "},[a("div",{staticClass:"filterItem flex flex-align-center flex-pack-center",on:{click:function(e){t.doPriceFitler()}}},[a("div",[t._v("价格")]),t._v(" "),a("div",{staticStyle:{"line-height":"10px"}},[a("div",[a("i",{staticClass:"iconfont icon-icon--",style:0==t.sortStatus&&"string"!=typeof t.sortStatus?"color:#ffc630":""})]),t._v(" "),a("div",[a("i",{staticClass:"iconfont icon-xiala",style:1==t.sortStatus&&""!=t.sortStatus?"color:#ffc630":""})])])]),t._v(" "),a("div",{staticClass:"filterItem  flex flex-align-center flex-pack-center",style:t.catModel||""!=t.catId?"color:#ffc630":"",on:{click:function(e){t.catModel=!t.catModel}}},[t._v("\n  分类\n")])]):t._e(),t._v(" "),a("div",{staticStyle:{position:"relative"}},[t.catModel?a("div",{staticStyle:{"background-color":"rgba(0, 0, 0, 0.498039)"}},[a("div",{staticClass:"AllClassification"},[a("div",{staticClass:"flex flex-pack-justify flex-align-center ClassificationTitle "},[a("span",[t._v("全部分类")]),t._v(" "),a("i",{staticClass:"iconfont icon-iconset0422",staticStyle:{"font-size":"20px",margin:"3px"},on:{click:function(e){t.catModel=!1}}})]),t._v(" "),a("div",{staticClass:"ClassificationName flex flex-warp-justify"},t._l(t.catList,function(e,i){return a("div",{key:i,staticStyle:{width:"25%"}},[a("div",{staticClass:"flex flex-pack-center flex-align-center Classification",class:e.catId==t.catId?"ClassificationActive":"ClassificationItem",on:{click:function(i){t.doCatFilter(e)}}},[t._v("\n"+t._s(e.catName)+"\n        ")])])}))])]):t._e()]),t._v(" "),a("ul",{directives:[{name:"infinite-scroll",rawName:"v-infinite-scroll",value:t.loadMore,expression:"loadMore"}],attrs:{"infinite-scroll-disabled":t.loading,"infinite-scroll-distance":"20"}},[a("li",[a("div",{staticClass:"flex flex-warp-justify"},t._l(t.goodsList,function(e,o){return a("div",{key:o,staticClass:"goodsItem",on:{click:function(i){t.goProductDetail(e.goodsId)}}},[a("div",{staticClass:"flex   flex-pack-center",staticStyle:{width:"-webkit-fill-available",padding:"5px 0"}},[a("div",{},[a("div",{staticClass:"flex flex-pack-center flex-align-center",staticStyle:{border:"1px #e5e5e5 solid","box-sizing":"border-box",overflow:"hidden",position:"relative"},style:t.handlePX("height",410)+t.handlePX("width",345)},[a("img",{staticStyle:{width:"-webkit-fill-available",position:"absolute",top:"0",left:"0","z-index":"99"},style:t.handlePX("width",43)+t.handlePX("height",49),attrs:{src:i("HORy")}}),t._v(" "),a("img",{directives:[{name:"lazy",rawName:"v-lazy",value:e.goodsImg.split(",")[0],expression:"goods.goodsImg.split(',')[0]"}],staticStyle:{width:"-webkit-fill-available",position:"absolute",top:"0"}}),t._v(" "),a("div",{staticClass:"textLabel",staticStyle:{position:"absolute",bottom:"0",width:"100%","background-color":"rgba(207,207,207,0.3)","text-align":"center",color:"#A3A3A3"},style:t.handlePX("height",70)+t.handlePX("line-height",70)+t.handlePX("font-size",28)},[t._v(t._s(e.jingle))])]),t._v(" "),a("div",{staticClass:"flex flex-pack-center flex-v",staticStyle:{margin:"5px auto",width:"-webkit-fill-available"},style:t.handlePX("width",345)},[a("div",[a("img",{style:t.handlePX("width",52)+t.handlePX("height",25),attrs:{src:i("ILWi")}}),t._v(" "),a("img",{style:t.handlePX("width",52)+t.handlePX("height",25),attrs:{src:i("tp/U")}})]),t._v(" "),a("div",{staticClass:"textLabel",style:t.handlePX("font-size",28)+t.handlePX("line-height",40)},[t._v(t._s(e.goodsName))]),t._v(" "),a("div",{staticStyle:{color:"#E05459"},style:t.handlePX("font-size",30)+t.handlePX("line-height",40)},[t._v("￥"+t._s(e.marketPrice))])])])])])}))])]),t._v(" "),0==t.goodsList.length?a("div",{staticClass:"flex  flex-align-center  flex-pack-center",staticStyle:{height:"100vh",position:"fixed",width:"100%",top:"0",color:"#999"}},[a("div",[t._v("你寻找的商品还未上架")])]):t._e(),t._v(" "),t.goodsList.length>0?a("div",{staticClass:"flex flex-pack-center flex-align-center",staticStyle:{"font-size":"14px",padding:"15px"}},[t.loading?a("div",[t._v("-")]):a("div",[t._v("加载中...")])]):t._e()]):t._e()])])},staticRenderFns:[]};var f=i("VU/8")(d,r,!1,function(t){i("lFQy")},null,null);e.default=f.exports},lFQy:function(t,e){}});
//# sourceMappingURL=34.c595526ccb9e32e9a288.js.map