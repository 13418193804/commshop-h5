webpackJsonp([15],{B94D:function(t,e,i){var o;"undefined"!=typeof self&&self,o=function(){return function(t){function e(o){if(i[o])return i[o].exports;var s=i[o]={i:o,l:!1,exports:{}};return t[o].call(s.exports,s,s.exports,e),s.l=!0,s.exports}var i={};return e.m=t,e.c=i,e.d=function(t,i,o){e.o(t,i)||Object.defineProperty(t,i,{configurable:!1,enumerable:!0,get:o})},e.n=function(t){var i=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(i,"a",i),i},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="/dist/",e(e.s=0)}([function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=i(1),s=i.n(o),a=[],n=document.querySelector("html"),l="",r=[.5,0,.35,1],c=null,d=function(){var t=u(n),e=null;a.forEach(function(i){p(i.el)-i.offset<=t&&(e=i)}),v(e)},u=function(t){return l?t.scrollTop:0==document.documentElement.scrollTop?document.body.scrollTop:document.documentElement.scrollTop},p=function(t){return f(t)-f(n)},f=function(t){for(var e=0,i=t;i;)e+=i.offsetTop,i=i.offsetParent;return e},v=function(t){t&&t.callback&&t.callback(t)},m=function(t){l?n.scrollTo?n.scrollTo(0,t):n.scrollTop=t:(document.documentElement.scrollTop=t,document.body.scrollTop=t)},h={install:function(t){t.directive("scrollWatch",{inserted:function(t,e,i){l&&(n=document.querySelector(l));var o=l?n:window;if(o){0==a.length&&o.addEventListener("scroll",d);var s=e.value,r=s.name,c=s.offset,u=void 0===c?0:c,p=s.callback;a.push({name:r,offset:u,top:t.offsetTop-u,el:t,callback:p}),a.sort(function(t,e){return t.top-e.top})}else console.error("[vue-scrollwatch] Element '"+l+"' was not found. ")},unbind:function(t,e,i){var o=l?n:window;0==(a=a.filter(function(t){return t.name!=e.value.name})).length&&n&&(o.removeEventListener("scroll",d),l=""),cancelAnimationFrame(c)}})},scrollTo:function(t){var e=a.find(function(e){return e.name==t}),i=u(n),o=p(e.el)-i,l=s.a.apply(void 0,r),d=null;window.requestAnimationFrame(function t(s){d||(d=s);var a=s-d>=600?600:s-d,n=i+l(a/600)*(o-e.offset);m(n),a<600&&(c=window.requestAnimationFrame(t))})},setContainer:function(t){l=t}};e.default=h},function(t,e){function i(t,e){return 1-3*e+3*t}function o(t,e){return 3*e-6*t}function s(t){return 3*t}function a(t,e,a){return((i(e,a)*t+o(e,a))*t+s(e))*t}function n(t,e,a){return 3*i(e,a)*t*t+2*o(e,a)*t+s(e)}function l(t,e,i,o,s){var n,l,r=0;do{(n=a(l=e+(i-e)/2,o,s)-t)>0?i=l:e=l}while(Math.abs(n)>d&&++r<u);return l}function r(t,e,i,o){for(var s=0;s<c;++s){var l=n(e,i,o);if(0===l)return e;e-=(a(e,i,o)-t)/l}return e}var c=4,d=1e-7,u=10,p=11,f=1/(p-1),v="function"==typeof Float32Array;t.exports=function(t,e,i,o){function s(e){for(var o=0,s=1,a=p-1;s!==a&&c[s]<=e;++s)o+=f;var d=o+(e-c[--s])/(c[s+1]-c[s])*f,u=n(d,t,i);return u>=.001?r(e,d,t,i):0===u?d:l(e,o,o+f,t,i)}if(!(0<=t&&t<=1&&0<=i&&i<=1))throw new Error("bezier x values must be in [0, 1] range");var c=v?new Float32Array(p):new Array(p);if(t!==e||i!==o)for(var d=0;d<p;++d)c[d]=a(d*f,t,i);return function(n){return t===e&&i===o?n:0===n?0:1===n?1:a(s(n),e,o)}}}])},t.exports=o()},emNy:function(t,e){},k6mo:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=i("TToO"),s=i("7+uW"),a=i("c+8m"),n=i.n(a),l=i("DZ+H"),r=i("TJML"),c=i("ymRw"),d=i("ipus"),u=i("B94D"),p=i.n(u),f=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.tablist=["大家还看了","新品推荐"],e.tabgoodslist=[],e.likeList=[],e.newList=[],e.couponList=[],e.tabindex=0,e.isCollection=!1,e.goodsList=[],e.goodsId="",e.commentnum=0,e.praise="0",e.detatil={commentList:[],detail:{imageList:[]},goodsImg:"",goodsName:"",jingle:"",labelPrice:0,marketPrice:0,onlineStatus:"",sku:[],skuKey:[],storageNum:0},e.num=1,e.keepModel=!1,e.skuattr=[],e.chosenList=[],e.chosensku=[],e.skuItem={},e.activeMenu=1,e}return o.c(e,t),e.prototype.onScroll=function(t){},e.prototype.go_comment=function(){this.$router.push({path:"/goodscomment",query:{goodsId:this.goodsId}})},e.prototype.onItemChanged=function(t,e,i){console.log(t,e,i)},e.prototype.onClickMiniBtn_service=function(){Object(c.Toast)("跳转到客服")},e.prototype.onClickMiniBtn_cart=function(){this.$router.push("/cart")},e.prototype.imagePreview=function(t){Object(c.ImagePreview)([t],0)},e.prototype.onClickMiniBtn_collection=function(){var t=this;0==this.isCollection?s.default.prototype.$reqFormPost("/fav/add",{userId:this.$store.getters[s.default.prototype.MutationTreeType.TOKEN_INFO].userId,token:this.$store.getters[s.default.prototype.MutationTreeType.TOKEN_INFO].token,goodsId:this.goodsId},function(e){if(null!=e){if(200!=e.data.status)return console.log("需控制错误码"+e.data.status+",错误信息："+e.data.message),void Object(c.Toast)(e.data.message);Object(c.Toast)("已收藏"),t.collection_query()}else console.log("网络请求错误！")}):1==this.isCollection&&s.default.prototype.$reqFormPost("/fav/delete",{userId:this.$store.getters[s.default.prototype.MutationTreeType.TOKEN_INFO].userId,token:this.$store.getters[s.default.prototype.MutationTreeType.TOKEN_INFO].token,goodsIds:this.goodsId},function(e){if(null!=e){if(200!=e.data.status)return console.log("需控制错误码"+e.data.status+",错误信息："+e.data.message),void Object(c.Toast)(e.data.message);Object(c.Toast)("已取消"),t.collection_query()}else console.log("网络请求错误！")})},e.prototype.collection_query=function(){var t=this;s.default.prototype.$reqFormPost("/fav/query",{userId:this.$store.getters[s.default.prototype.MutationTreeType.TOKEN_INFO].userId,token:this.$store.getters[s.default.prototype.MutationTreeType.TOKEN_INFO].token},function(e){if(null!=e)if(200==e.data.status){for(var i=0;i<e.data.data.goodsList.length;i++)if(-1!==e.data.data.goodsList[i].goodsId.indexOf(t.goodsId))return void(t.isCollection=!0);t.isCollection=!1}else console.log("需控制错误码"+e.data.status+",错误信息："+e.data.message);else console.log("网络请求错误！")})},e.prototype.addCar=function(){var t=this;this.skuItem.skuId?s.default.prototype.$reqFormPost("/prepare/order/direct",{userId:this.$store.getters[s.default.prototype.MutationTreeType.TOKEN_INFO].userId,token:this.$store.getters[s.default.prototype.MutationTreeType.TOKEN_INFO].token,goodsId:this.goodsId,skuId:this.skuItem.skuId,num:this.num},function(e){if(null!=e){if(console.log(e),200!=e.data.status)return console.log("需控制错误码"+e.data.status+",错误信息："+e.data.message),void Object(c.Toast)(e.data.message);t.setPrepareId(e.data.data.prepareId),t.$router.push({path:"/settle"}),console.log("预支付订单ID",e.data.data.prepareId)}else console.log("网络请求错误！")}):Object(c.Toast)("请选择规格属性")},e.prototype.changeModel=function(){this.keepModel=!this.keepModel},e.prototype.selectSku=function(t,e){var i=this;if(!e.disable){""!=(this.chosenList[t]||"")&&this.chosenList[t]===e.skuValueId?(this.chosenList[t]="",this.chosensku[t]="",this.chosensku.splice(0,this.chosensku.length)):(this.chosenList[t]=e.skuValueId,this.chosensku[t]=e.skuValueName),this.chosenList=this.chosenList,this.skuItem={};if(this.detatil.skuKey.forEach(function(t,e){t.valueList.forEach(function(t,o){t.disable=!0;for(var s=0;s<i.detatil.sku.length;s++)if(i.detatil.sku[s].attrs[e].valueId==t.skuValueId){for(var a=!0,n=0;n<i.detatil.sku[s].attrs.length;n++)if(e!=n&&""!=(i.chosenList[n]||"")&&i.chosenList[n]!=i.detatil.sku[s].attrs[n].valueId){a=!1;break}if(a){t.disable=!1;break}}})}),this.chosenList.length===this.detatil.skuKey.length){if(function(){var t=!0;return i.chosenList.forEach(function(e,i){if(""===e)return t=!1,!1}),t})for(var o=0;o<this.detatil.sku.length;o++)for(var s=0,a=0;a<this.chosenList.length;a++)if(this.chosenList[a]===this.detatil.sku[o].attrs[a].valueId&&(console.log(this.chosenList[a]===this.detatil.sku[o].attrs[a].valueId,this.detatil.sku[o].attrs[a]),(s+=1)===this.chosenList.length)){this.skuItem=this.detatil.sku[o];break}}this.chosenList.push(),this.chosensku.push()}},e.prototype.addCart=function(){var t=this;this.skuItem.skuId?s.default.prototype.$reqFormPost("/shop/cart/add",{userId:this.$store.getters[s.default.prototype.MutationTreeType.TOKEN_INFO].userId,token:this.$store.getters[s.default.prototype.MutationTreeType.TOKEN_INFO].token,goodsId:this.goodsId,skuId:this.skuItem.skuId},function(e){if(null!=e){if(200!=e.data.status)return console.log("需控制错误码"+e.data.status+",错误信息："+e.data.message),void Object(c.Toast)(e.data.message);Object(c.Toast)("加入成功"),t.keepModel=!1,console.log("加入购物车",e.data)}else console.log("网络请求错误！")}):Object(c.Toast)("请选择规格属性")},e.prototype.getProductDetail=function(){var t=this;s.default.prototype.$reqFormPost("/goods/front/detail",{userId:this.$store.getters[s.default.prototype.MutationTreeType.TOKEN_INFO].userId,token:this.$store.getters[s.default.prototype.MutationTreeType.TOKEN_INFO].token,goodsId:this.goodsId},function(e){if(null!=e)if(200==e.data.status){if(console.log("res.data",e.data),e.data.data.singleStatus&&(t.skuItem=e.data.data.sku[0]),t.detatil=e.data.data,console.log("-----------"),t.commentnum=e.data.data.commentNum,e.data.data.commentList.length>0){for(var i=0,o=0;o<e.data.data.commentList.length;o++)i=e.data.data.commentList[o].star+i;var s=(i=i/(5*e.data.data.commentList.length)*100).toFixed(0);t.praise=s}t.tabgoodslist=e.data.data.likeList,t.likeList=e.data.data.likeList,t.newList=e.data.data.newList,t.couponList=e.data.data.couponList,t.detatil.skuKey.forEach(function(e,i){e.valueList.forEach(function(e,o){var s={disable:!0,chosen:!1};t.detatil.sku.forEach(function(t,o){if(e.skuValueId===t.attrs[i].valueId)return s.disable=!1,!1}),Object.assign(e,s)})})}else console.log("需控制错误码"+e.data.status+",错误信息："+e.data.message);else console.log("网络请求错误！")})},e.prototype.selecttablist=function(t){this.tabgoodslist=[],0==t&&(this.tabgoodslist=this.likeList,this.tabindex=0),1==t&&(this.tabgoodslist=this.newList,this.tabindex=1)},e.prototype.goProductDetail=function(t){this.$router.push({path:"/productdetail",query:{goodsId:t}})},e.prototype.go_collar_center=function(){this.$router.push("/collar_center")},e.prototype.handlePX=function(t,e){return t+":"+this.$store.getters[s.default.prototype.MutationTreeType.SYSTEM].availWidth/750*e+"px;"},e.prototype.created=function(){},e.prototype.mounted=function(){if(p.a.setContainer("#scrollDom"),this.$route.query.availWidth&&this.$route.query.availHeight)this.setlabelActive({availWidth:this.$route.query.availWidth,availHeight:this.$route.query.availHeight});else if(""==this.$store.getters[s.default.prototype.MutationTreeType.TOKEN_INFO].userId&&""==this.$store.getters[s.default.prototype.MutationTreeType.TOKEN_INFO].token)return void this.$router.push({name:"login"});this.goodsId=this.$route.query.goodsId,this.getProductDetail(),this.collection_query()},o.b([Object(d.a)("setPrepareId")],e.prototype,"setPrepareId",void 0),o.b([Object(d.a)("setlabelActive")],e.prototype,"setlabelActive",void 0),e=o.b([n()({components:{comhead:r.a},mixins:[l.a]})],e)}(s.default),v={render:function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{ref:"logo",staticClass:"tab-contents",staticStyle:{width:"100%","background-color":"#e4e4e4",overflow:"auto"},on:{"&scroll":function(e){return t.onScroll(e)}}},[t.$route.query.availWidth&&t.$route.query.availHeight?o("div",{staticClass:"dialog"}):t._e(),t._v(" "),o("comhead",{ref:"comhead",attrs:{isLeftIcon:"icon-zuo",leftIconName:"angle-left",contextIndex:!0,isRightIcon:"true"},on:{leftClick:!1}}),t._v(" "),o("van-swipe",{style:"height:"+t.$store.getters[t.MutationTreeType.SYSTEM].availWidth+"px",attrs:{autoplay:3e3}},t._l(t.detatil.goodsImg.split(","),function(t,e){return o("van-swipe-item",{key:e,staticClass:"flex"},[o("img",{directives:[{name:"lazy",rawName:"v-lazy",value:t,expression:"image"}],staticStyle:{width:"100%"}})])})),t._v(" "),o("div",{staticClass:"goodsTitle"},[o("div",{staticClass:"goodstitle"},[o("div",[t._v(t._s(t.detatil.goodsName))]),t._v(" "),o("div",{staticStyle:{"font-size":"14px",color:"#666"}},[t._v(t._s(t.detatil.jingle))]),t._v(" "),o("div",{staticClass:"pricebox"},[o("div",[o("span",{staticClass:"marketPrice"},[t._v("  ￥"+t._s(t.detatil.marketPrice))]),t._v(" "),o("span",{staticClass:"labelPrice",staticStyle:{margin:"0 10px","font-size":"14px"}},[t._v("原价:"+t._s(t.detatil.labelPrice))])]),t._v(" "),o("div",{staticClass:"comment",on:{click:function(e){t.go_comment()}}},[o("div",{staticStyle:{"font-size":"15px",color:"#666"}},[t._v("用户评价")]),t._v(" "),o("div",[o("i",{staticClass:"iconfont icon-pingjia",staticStyle:{color:"#ffc630","font-size":"22px"}}),t._v(" "),o("span",[t._v(t._s(t.commentnum))])])])])])]),t._v(" "),o("div",{staticClass:"functionList",staticStyle:{"margin-top":"10px"}},[o("van-cell-group",[o("van-cell",{attrs:{title:"请选择规格数量","is-link":""},on:{click:function(e){t.changeModel()}}},[o("template",{slot:"title"},[t.chosensku.length>0?o("span",{staticClass:"van-cell-text"},[t._v("已选择:\n                  "),t._l(t.chosensku,function(e,i){return o("span",{key:i},[0!==i?o("span",[t._v("，")]):t._e(),t._v(t._s(e))])})],2):o("span",{staticClass:"van-cell-text"},[t._v("请选择规格数量")])])],2),t._v(" "),t.couponList.length>0?o("van-cell",{attrs:{title:"限制：特价商品不可与优惠卷叠加使用"}}):t._e(),t._v(" "),t.couponList.length>0?o("van-cell",{attrs:{"is-link":""},on:{click:function(e){t.go_collar_center()}}},[o("template",{slot:"title"},[o("span",{staticClass:"van-cell-text"},[t._v("领卷：")]),t._v(" "),t._l(t.couponList,function(e,i){return o("span",{key:i,staticStyle:{color:"#FFC630"}},[t._v(t._s(e.couponName))])})],2)],2):t._e(),t._v(" "),o("van-cell",[o("template",{slot:"title"},[o("span",{staticClass:"van-cell-text"},[t._v("备注：")]),t._v(" "),o("span",{staticStyle:{color:"#ff6d72"}},[t._v(t._s(t.detatil.remark))])])],2),t._v(" "),o("van-cell",[o("template",{slot:"title"},[o("span",{staticClass:"van-cell-text"},[t._v("服务：")]),t._v(" "),t._l(t.detatil.slogan.split(";"),function(e,i){return o("span",{staticStyle:{margin:"0 15px"},attrs:{style:"margin:0 15px;"}},[o("span",{staticStyle:{color:"#ffc630","font-weight":"600",margin:"0 5px"}},[t._v("·")]),t._v(t._s(e))])})],2)],2)],1)],1),t._v(" "),o("div",{staticClass:"userCommentList",staticStyle:{"background-color":"#ffffff","margin-top":"10px"},attrs:{id:"detail"}},[o("van-cell-group",[o("van-cell",{attrs:{"is-link":""},on:{click:function(e){t.go_comment()}}},[o("template",{slot:"title"},[o("span",{staticClass:"van-cell-text"},[t._v("用户评价("+t._s(t.commentnum)+")")])]),t._v(" "),[o("span",[t._v(t._s(t.praise)+"%好评")])]],2)],1),t._v(" "),t._l(t.detatil.commentList,function(e,s){return 0==s?o("div",{key:s},[o("div",{staticClass:"userComment",staticStyle:{padding:"10px 15px"}},[o("div",[e.user.userIcon?o("img",{directives:[{name:"lazy",rawName:"v-lazy",value:e.user.userIcon,expression:"item.user.userIcon"}],staticStyle:{"vertical-align":"middle","border-radius":"50%"},style:t.handlePX("width",45)+t.handlePX("height",45)}):o("img",{staticStyle:{"vertical-align":"middle","border-radius":"50%"},style:t.handlePX("width",45)+t.handlePX("height",45),attrs:{src:i("nqO4")}}),t._v(" "),o("span",[t._v(t._s(e.user.nickName))])]),t._v(" "),o("div",{staticStyle:{color:"#999999","font-size":"14px"}},[t._v(t._s(e.createTime)+"\n              "),t._l(JSON.parse(e.skuKeyValue),function(e){return o("span",{staticStyle:{margin:"0 5px"}},[t._v(t._s(e.key)+"："+t._s(e.value))])})],2),t._v(" "),o("div",{staticStyle:{padding:"5px 0"}},[t._v(t._s(e.commentContent))]),t._v(" "),e.commentImg?o("div",[e.commentImg.split(",")[0]?o("img",{directives:[{name:"lazy",rawName:"v-lazy",value:e.commentImg.split(",")[0],expression:"item.commentImg.split(',')[0]"}],style:t.handlePX("width",100)+t.handlePX("height",100)}):t._e(),t._v(" "),e.commentImg.split(",")[1]?o("img",{directives:[{name:"lazy",rawName:"v-lazy",value:e.commentImg.split(",")[1],expression:"item.commentImg.split(',')[1]"}],style:t.handlePX("width",100)+t.handlePX("height",100)}):t._e(),t._v(" "),e.commentImg.split(",")[2]?o("img",{directives:[{name:"lazy",rawName:"v-lazy",value:e.commentImg.split(",")[2],expression:"item.commentImg.split(',')[2]"}],style:t.handlePX("width",100)+t.handlePX("height",100)}):t._e(),t._v(" "),e.commentImg.split(",")[3]?o("img",{directives:[{name:"lazy",rawName:"v-lazy",value:e.commentImg.split(",")[3],expression:"item.commentImg.split(',')[3]"}],style:t.handlePX("width",100)+t.handlePX("height",100)}):t._e(),t._v(" "),e.commentImg.split(",")[4]?o("img",{directives:[{name:"lazy",rawName:"v-lazy",value:e.commentImg.split(",")[4],expression:"item.commentImg.split(',')[4]"}],style:t.handlePX("width",100)+t.handlePX("height",100)}):t._e()]):t._e()])]):t._e()}),t._v(" "),0==t.detatil.commentList.length?o("div",{staticClass:" flex  flex-align-center flex-pack-center",staticStyle:{"text-align":"center",padding:"15px","min-height":"145px","font-size":"16px",color:"#666"}},[o("span",[t._v("暂无用户评价")])]):t._e()],2),t._v(" "),o("div",{staticClass:"recommend",staticStyle:{"background-color":"#ffffff","margin-top":"10px","z-index":"2"}},[o("van-tabs",{attrs:{id:"tab1"},on:{click:t.selecttablist}},t._l(t.tablist,function(e,s){return o("van-tab",{key:s,attrs:{title:e}},[s==t.tabindex?o("div",{staticClass:"flex",staticStyle:{overflow:"auto"}},t._l(t.tabgoodslist,function(e,s){return o("div",{key:s,style:t.handlePX("padding-bottom",65)+t.handlePX("padding-top",20)+t.handlePX("padding-left",30),on:{click:function(i){t.goProductDetail(e.goodsId)}}},[o("div",{staticClass:"flex flex-pack-center flex-align-center",staticStyle:{border:"1px #e5e5e5 solid","box-sizing":"border-box",overflow:"hidden",position:"relative"},style:t.handlePX("height",410)+t.handlePX("width",345)},[o("img",{staticStyle:{width:"-webkit-fill-available",position:"absolute",top:"0",left:"0","z-index":"2"},style:t.handlePX("width",43)+t.handlePX("height",49),attrs:{src:i("HORy")}}),t._v(" "),o("img",{directives:[{name:"lazy",rawName:"v-lazy",value:e.goodsImg.split(",")[0],expression:"items.goodsImg.split(',')[0]"}],staticStyle:{width:"-webkit-fill-available",position:"absolute",top:"0"}}),t._v(" "),o("div",{staticClass:"textLabel",staticStyle:{position:"absolute",bottom:"0",width:"100%","background-color":"rgba(207,207,207,0.3)","text-align":"center",color:"#A3A3A3"},style:t.handlePX("height",70)+t.handlePX("line-height",70)+t.handlePX("font-size",28)},[t._v(t._s(e.jingle))])]),t._v(" "),o("div",{staticClass:"flex flex-pack-center flex-v",staticStyle:{width:"-webkit-fill-available"},style:t.handlePX("width",345)},[o("div",[o("img",{style:t.handlePX("width",52)+t.handlePX("height",25),attrs:{src:i("ILWi")}}),t._v(" "),o("img",{style:t.handlePX("width",52)+t.handlePX("height",25),attrs:{src:i("tp/U")}})]),t._v(" "),o("div",{staticClass:"textLabel",style:t.handlePX("font-size",28)+t.handlePX("line-height",40)},[t._v(t._s(e.goodsName))]),t._v(" "),o("div",{staticStyle:{color:"#E05459"},style:t.handlePX("font-size",30)+t.handlePX("line-height",40)},[t._v("￥"+t._s(e.marketPrice))])])])})):t._e()])}))],1),t._v(" "),o("div",{staticClass:"xq_video"},[o("video",{staticStyle:{width:"100%",height:"300px","background-color":"#000"},attrs:{id:"video",autoplay:"autoplay",controls:"controls",src:t.detatil.videoUrl}},[o("source",{attrs:{src:"https://rtmp.myappcc.com/factoryintroduction0510.m4",type:"video/mp4"}}),t._v("\n            Your browser does not support the video tag.\n            ")])]),t._v(" "),o("div",{staticStyle:{height:"10px"}}),t._v(" "),o("div",{staticStyle:{"background-color":"#ffffff","margin-top":"10px"}},t._l(t.detatil.detail.imageList,function(t,e){return o("div",{key:e},[o("img",{directives:[{name:"lazy",rawName:"v-lazy",value:t,expression:"item"}],staticStyle:{width:"100%"}})])})),t._v(" "),o("van-goods-action",{staticStyle:{"z-index":"90","background-color":"#ffffff"}},[o("van-goods-action-mini-btn",{staticClass:"flex flex-pack-center flex-align-center flex-v",staticStyle:{"border-top":"1px #e5e5e5 solid",padding:"0 10px","font-size":"22px"},attrs:{icon:"chat",onclick:"showMeiQia()"}}),t._v(" "),o("van-goods-action-mini-btn",{staticClass:"flex flex-pack-center flex-align-center flex-v",staticStyle:{"border-top":"1px #e5e5e5 solid",padding:"0 10px","font-size":"22px"},attrs:{icon:"cart"},on:{click:t.onClickMiniBtn_cart}}),t._v(" "),o("van-goods-action-mini-btn",{staticClass:"flex flex-pack-center flex-align-center flex-v",class:{collection_color:t.isCollection},staticStyle:{"border-top":"1px #e5e5e5 solid","font-size":"22px",padding:"0 10px"},attrs:{icon:"like"},on:{click:t.onClickMiniBtn_collection}}),t._v(" "),o("van-goods-action-big-btn",{staticClass:"flex-1",attrs:{text:"立即购买"},on:{click:function(e){t.changeModel()}}}),t._v(" "),o("van-goods-action-big-btn",{staticClass:"flex-1",attrs:{text:"加入购物车",primary:""},on:{click:function(e){t.changeModel()}}})],1),t._v(" "),o("div",{class:t.keepModel?"bg_shop1":"bg_shop_none1",staticStyle:{"background-color":"rgba(0, 0, 0, 0.498039)",height:"100%",width:"100%"},on:{click:function(e){t.changeModel()}}},[o("div",{staticStyle:{position:"relative",width:"100%",height:"100%"}},[o("div",{class:t.keepModel?"modiaBoxUp2":"modiaBoxDown2",staticStyle:{"background-color":"#fff",width:"100%"},on:{click:function(t){t.stopPropagation()}}},[o("div",{staticClass:"flex flex-pack-justify"},[o("div",{staticClass:"flex",staticStyle:{"border-radius":"2px","background-color":"#fff",margin:"10px 10px 10px 20px"}},[o("img",{directives:[{name:"lazy",rawName:"v-lazy",value:t.skuItem.skuImgUrl?t.skuItem.skuImgUrl:t.detatil.goodsImg.split(",")[0],expression:"skuItem.skuImgUrl?skuItem.skuImgUrl :detatil['goodsImg'].split(',')[0]"}],staticStyle:{width:"80px",height:"80px"},on:{click:function(e){t.imagePreview(t.skuItem.skuImgUrl?t.skuItem.skuImgUrl:t.detatil.goodsImg.split(",")[0])}}})]),t._v(" "),o("div",{staticClass:"flex-1",staticStyle:{"font-size":"13px",padding:"10px 0 0 0"}},[o("div",{staticStyle:{"font-size":"16px"}},[t._v(t._s(t.detatil.goodsName))]),t._v(" "),o("div",{staticStyle:{overflow:"hidden"},style:t.handlePX("margin-top",20)},[o("span",{staticStyle:{"font-size":"18px",color:"rgb(229, 28, 35)"}},[t._v("￥"+t._s(t.skuItem.marketPrice?t.skuItem.marketPrice:t.detatil.marketPrice))]),t._v(" "),o("span",{staticClass:"labelPrice"},[t._v("￥"+t._s(t.detatil.labelPrice))])]),t._v(" "),o("div",{staticStyle:{"font-size":"14px"},style:t.handlePX("margin-top",10)},[t.chosensku.length>0?o("span",{staticClass:"van-cell-text"},[t._v("已选择:\n                  "),t._l(t.chosensku,function(e,i){return o("span",{key:i},[0!==i?o("span"):t._e(),t._v(t._s(e))])})],2):o("span",{staticClass:"van-cell-text",staticStyle:{color:"#585858"}},[t._v("请选择规格属性")])])])]),t._v(" "),o("div",{staticStyle:{"font-size":"14px","max-height":"300px",overflow:"auto"}},t._l(t.detatil.skuKey,function(e,i){return o("div",{key:i},[o("div",{staticStyle:{padding:"5px 20px 0",color:"#585858"}},[t._v(t._s(e.skuKeyIdName))]),t._v(" "),o("div",{staticClass:"skuKeyBox"},t._l(e.valueList,function(e,s){return o("div",{key:s},[o("div",{class:t.chosenList[i]===e?"sku_box_select":"sku_box",style:e.disable?"color:#ccc;":""+t.chosenList[i]===e.skuValueId?"border-color:#f4c542;color:#f4c542":"",on:{click:function(o){o.stopPropagation(),t.selectSku(i,e)}}},[t._v(t._s(e.skuValueName))])])}))])})),t._v(" "),o("div",{staticClass:"num_box"},[o("div",{staticClass:"flex flex-align-center",staticStyle:{color:"#585858"}},[t._v("数量")]),t._v(" "),o("van-stepper",{style:t.handlePX("margin-top",20),model:{value:t.num,callback:function(e){t.num=e},expression:"num"}})],1),t._v(" "),o("div",[o("van-goods-action",{staticClass:"vangoods",staticStyle:{"z-index":"90","background-color":"#ffffff"}},[o("van-goods-action-mini-btn",{staticClass:"flex flex-pack-center flex-align-center flex-v",staticStyle:{"border-top":"1px #e5e5e5 solid","font-size":"22px",padding:"0 10px"},attrs:{icon:"chat",onclick:"showMeiQia()"}}),t._v(" "),o("van-goods-action-mini-btn",{staticClass:"flex flex-pack-center flex-align-center flex-v",staticStyle:{"border-top":"1px #e5e5e5 solid","font-size":"22px",padding:"0 10px"},attrs:{icon:"cart"},on:{click:t.onClickMiniBtn_cart}}),t._v(" "),o("van-goods-action-mini-btn",{staticClass:"flex flex-pack-center flex-align-center flex-v",class:{collection_color:t.isCollection},staticStyle:{"border-top":"1px #e5e5e5 solid","font-size":"22px",padding:"0 10px"},attrs:{icon:"like"},on:{click:t.onClickMiniBtn_collection}}),t._v(" "),o("van-goods-action-big-btn",{staticClass:"flex-1",attrs:{text:"立即购买"},on:{click:function(e){t.addCar()}}}),t._v(" "),o("van-goods-action-big-btn",{staticClass:"flex-1",attrs:{text:"加入购物车",primary:""},on:{click:function(e){t.addCart()}}})],1)],1)])])]),t._v(" "),o("div",{staticClass:"flex flex-warp-justify"},t._l(t.detatil.imageList,function(t,e){return o("div",{key:e,staticStyle:{"line-height":"0"}},[o("img",{directives:[{name:"lazy",rawName:"v-lazy",value:t,expression:"item"}],staticStyle:{width:"100%"}})])})),t._v(" "),o("div",{staticStyle:{height:"50px"}})],1)},staticRenderFns:[]};var m=i("VU/8")(f,v,!1,function(t){i("emNy")},"data-v-65df442a",null);e.default=m.exports}});
//# sourceMappingURL=15.ecb088f0c2f04414bd1d.js.map