webpackJsonp([23],{k6mo:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=i("TToO"),o=i("7+uW"),a=i("c+8m"),n=i.n(a),l=i("DZ+H"),c=i("TJML"),d=i("ymRw"),r=i("ipus"),u=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.tablist=["大家还看了","新品推荐"],e.tabgoodslist=[],e.likeList=[],e.newList=[],e.couponList=[],e.tabindex=0,e.isCollection=!1,e.goodsList=[],e.goodsId="",e.commentnum=0,e.praise="0",e.detatil={commentList:[],detail:{imageList:[]},goodsImg:"",goodsName:"",jingle:"",labelPrice:0,marketPrice:0,onlineStatus:"",sku:[],skuKey:[],storageNum:0},e.num=1,e.keepModel=!1,e.skuattr=[],e.chosenList=[],e.chosensku=[],e.skuItem={},e}return s.c(e,t),e.prototype.go_comment=function(){this.$router.push({path:"/goodscomment",query:{goodsId:this.goodsId}})},e.prototype.onClickMiniBtn_service=function(){Object(d.Toast)("跳转到客服")},e.prototype.onClickMiniBtn_cart=function(){this.$router.push("/cart")},e.prototype.imagePreview=function(t){Object(d.ImagePreview)([t],0)},e.prototype.onClickMiniBtn_collection=function(){var t=this;0==this.isCollection?o.default.prototype.$reqFormPost("/fav/add",{userId:this.$store.getters[o.default.prototype.MutationTreeType.TOKEN_INFO].userId,token:this.$store.getters[o.default.prototype.MutationTreeType.TOKEN_INFO].token,goodsId:this.goodsId},function(e){if(null!=e){if(200!=e.data.status)return console.log("需控制错误码"+e.data.status+",错误信息："+e.data.message),void Object(d.Toast)(e.data.message);Object(d.Toast)("已收藏"),t.collection_query()}else console.log("网络请求错误！")}):1==this.isCollection&&o.default.prototype.$reqFormPost("/fav/delete",{userId:this.$store.getters[o.default.prototype.MutationTreeType.TOKEN_INFO].userId,token:this.$store.getters[o.default.prototype.MutationTreeType.TOKEN_INFO].token,goodsIds:this.goodsId},function(e){if(null!=e){if(200!=e.data.status)return console.log("需控制错误码"+e.data.status+",错误信息："+e.data.message),void Object(d.Toast)(e.data.message);Object(d.Toast)("已取消"),t.collection_query()}else console.log("网络请求错误！")})},e.prototype.collection_query=function(){var t=this;o.default.prototype.$reqFormPost("/fav/query",{userId:this.$store.getters[o.default.prototype.MutationTreeType.TOKEN_INFO].userId,token:this.$store.getters[o.default.prototype.MutationTreeType.TOKEN_INFO].token},function(e){if(null!=e){if(200!=e.data.status)return console.log("需控制错误码"+e.data.status+",错误信息："+e.data.message),void Object(d.Toast)(e.data.message);for(var i=0;i<e.data.data.goodsList.length;i++)if(-1!==e.data.data.goodsList[i].goodsId.indexOf(t.goodsId))return void(t.isCollection=!0);t.isCollection=!1}else console.log("网络请求错误！")})},e.prototype.addCar=function(){var t=this;this.skuItem.skuId?o.default.prototype.$reqFormPost("/prepare/order/direct",{userId:this.$store.getters[o.default.prototype.MutationTreeType.TOKEN_INFO].userId,token:this.$store.getters[o.default.prototype.MutationTreeType.TOKEN_INFO].token,goodsId:this.goodsId,skuId:this.skuItem.skuId,num:this.num},function(e){if(null!=e){if(console.log(e),200!=e.data.status)return console.log("需控制错误码"+e.data.status+",错误信息："+e.data.message),void Object(d.Toast)(e.data.message);t.setPrepareId(e.data.data.prepareId),t.$router.push({path:"/settle"}),console.log("预支付订单ID",e.data.data.prepareId)}else console.log("网络请求错误！")}):Object(d.Toast)("请选择规格属性")},e.prototype.changeModel=function(){this.keepModel=!this.keepModel},e.prototype.selectSku=function(t,e){var i=this;if(!e.disable){""!=(this.chosenList[t]||"")&&this.chosenList[t]===e.skuValueId?(this.chosenList[t]="",this.chosensku[t]="",this.chosensku.splice(0,this.chosensku.length)):(this.chosenList[t]=e.skuValueId,this.chosensku[t]=e.skuValueName),this.chosenList=this.chosenList,this.skuItem={};if(this.detatil.skuKey.forEach(function(t,e){t.valueList.forEach(function(t,s){t.disable=!0;for(var o=0;o<i.detatil.sku.length;o++)if(i.detatil.sku[o].attrs[e].valueId==t.skuValueId){for(var a=!0,n=0;n<i.detatil.sku[o].attrs.length;n++)if(e!=n&&""!=(i.chosenList[n]||"")&&i.chosenList[n]!=i.detatil.sku[o].attrs[n].valueId){a=!1;break}if(a){t.disable=!1;break}}})}),this.chosenList.length===this.detatil.skuKey.length){if(function(){var t=!0;return i.chosenList.forEach(function(e,i){if(""===e)return t=!1,!1}),t})for(var s=0;s<this.detatil.sku.length;s++)for(var o=0,a=0;a<this.chosenList.length;a++)if(this.chosenList[a]===this.detatil.sku[s].attrs[a].valueId&&(console.log(this.chosenList[a]===this.detatil.sku[s].attrs[a].valueId,this.detatil.sku[s].attrs[a]),(o+=1)===this.chosenList.length)){this.skuItem=this.detatil.sku[s];break}}this.chosenList.push(),this.chosensku.push()}},e.prototype.addCart=function(){var t=this;this.skuItem.skuId?o.default.prototype.$reqFormPost("/shop/cart/add",{userId:this.$store.getters[o.default.prototype.MutationTreeType.TOKEN_INFO].userId,token:this.$store.getters[o.default.prototype.MutationTreeType.TOKEN_INFO].token,goodsId:this.goodsId,skuId:this.skuItem.skuId},function(e){if(null!=e){if(200!=e.data.status)return console.log("需控制错误码"+e.data.status+",错误信息："+e.data.message),void Object(d.Toast)(e.data.message);Object(d.Toast)("加入成功"),t.keepModel=!1,console.log("加入购物车",e.data)}else console.log("网络请求错误！")}):Object(d.Toast)("请选择规格属性")},e.prototype.getProductDetail=function(){var t=this;o.default.prototype.$reqFormPost("/goods/front/detail",{userId:this.$store.getters[o.default.prototype.MutationTreeType.TOKEN_INFO].userId,token:this.$store.getters[o.default.prototype.MutationTreeType.TOKEN_INFO].token,goodsId:this.goodsId},function(e){if(null!=e){if(200!=e.data.status)return console.log("需控制错误码"+e.data.status+",错误信息："+e.data.message),void Object(d.Toast)(e.data.message);if(console.log("res.data",e.data),e.data.data.singleStatus&&(t.skuItem=e.data.data.sku[0]),t.detatil=e.data.data,t.commentnum=e.data.data.commentList.length,e.data.data.commentList.length>0){for(var i=0,s=0;s<e.data.data.commentList.length;s++)i=e.data.data.commentList[s].star+i;var o=(i=i/(5*e.data.data.commentList.length)*100).toFixed(0);t.praise=o}t.tabgoodslist=e.data.data.likeList,t.likeList=e.data.data.likeList,t.newList=e.data.data.newList,t.couponList=e.data.data.couponList,t.detatil.skuKey.forEach(function(e,i){e.valueList.forEach(function(e,s){var o={disable:!0,chosen:!1};t.detatil.sku.forEach(function(t,s){if(e.skuValueId===t.attrs[i].valueId)return o.disable=!1,!1}),Object.assign(e,o)})})}else console.log("网络请求错误！")})},e.prototype.selecttablist=function(t){this.tabgoodslist=[],0==t&&(this.tabgoodslist=this.likeList,this.tabindex=0),1==t&&(this.tabgoodslist=this.newList,this.tabindex=1)},e.prototype.goProductDetail=function(t){this.$router.push({path:"/productdetail",query:{goodsId:t}})},e.prototype.go_collar_center=function(){this.$router.push("/collar_center")},e.prototype.handlePX=function(t,e){return t+":"+this.$store.getters[o.default.prototype.MutationTreeType.SYSTEM].availWidth/750*e+"px;"},e.prototype.mounted=function(){if(this.$route.query.availWidth&&this.$route.query.availHeight)this.setlabelActive({availWidth:this.$route.query.availWidth,availHeight:this.$route.query.availHeight});else if(""==this.$store.getters[o.default.prototype.MutationTreeType.TOKEN_INFO].userId&&""==this.$store.getters[o.default.prototype.MutationTreeType.TOKEN_INFO].token)return void this.$router.push({name:"login"});this.goodsId=this.$route.query.goodsId,this.getProductDetail(),this.collection_query()},s.b([Object(r.a)("setPrepareId")],e.prototype,"setPrepareId",void 0),s.b([Object(r.a)("setlabelActive")],e.prototype,"setlabelActive",void 0),e=s.b([n()({components:{comhead:c.a},mixins:[l.a]})],e)}(o.default),p={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"tab-contents",staticStyle:{width:"100%","background-color":"#e4e4e4",overflow:"auto",height:"100vh"}},[s("comhead",{ref:"comhead",attrs:{isLeftIcon:"icon-zuo",leftIconName:"angle-left",contextIndex:!0,isRightIcon:"true"},on:{leftClick:!1}}),t._v(" "),s("van-swipe",{style:"height:"+t.$store.getters[t.MutationTreeType.SYSTEM].availWidth+"px",attrs:{autoplay:3e3}},t._l(t.detatil.goodsImg.split(","),function(t,e){return s("van-swipe-item",{key:e,staticClass:"flex"},[s("img",{directives:[{name:"lazy",rawName:"v-lazy",value:t,expression:"image"}],staticStyle:{width:"100%"}})])})),t._v(" "),s("div",{staticClass:"goodsTitle"},[s("div",{staticClass:"goodstitle"},[s("div",[t._v(t._s(t.detatil.goodsName))]),t._v(" "),s("div",{staticStyle:{"font-size":"14px",color:"#666"}},[t._v(t._s(t.detatil.jingle))]),t._v(" "),s("div",[s("span",{staticClass:"marketPrice"},[t._v("  ￥"+t._s(t.detatil.marketPrice))]),t._v(" "),s("span",{staticClass:"labelPrice",staticStyle:{margin:"0 10px","font-size":"14px"}},[t._v("原价:"+t._s(t.detatil.labelPrice))])])]),t._v(" "),s("div",{staticClass:"comment",on:{click:function(e){t.go_comment()}}},[s("div",{staticStyle:{"font-size":"15px",color:"#666"}},[t._v("用户评价")]),t._v(" "),s("div",[s("i",{staticClass:"iconfont icon-pingjia",staticStyle:{color:"#ffc630","font-size":"22px"}}),t._v(" "),s("span",[t._v(t._s(t.commentnum))])])])]),t._v(" "),s("div",{staticClass:"functionList",staticStyle:{"margin-top":"10px"}},[s("van-cell-group",[s("van-cell",{attrs:{title:"请选择规格数量","is-link":""},on:{click:function(e){t.changeModel()}}},[s("template",{slot:"title"},[t.chosensku.length>0?s("span",{staticClass:"van-cell-text"},[t._v("已选择:\n                  "),t._l(t.chosensku,function(e,i){return s("span",{key:i},[0!==i?s("span",[t._v("，")]):t._e(),t._v(t._s(e))])})],2):s("span",{staticClass:"van-cell-text"},[t._v("请选择规格数量")])])],2),t._v(" "),t.couponList.length>0?s("van-cell",{attrs:{title:"限制：特价商品不可与优惠卷叠加使用"}}):t._e(),t._v(" "),t.couponList.length>0?s("van-cell",{attrs:{"is-link":""},on:{click:function(e){t.go_collar_center()}}},[s("template",{slot:"title"},[s("span",{staticClass:"van-cell-text"},[t._v("领卷：")]),t._v(" "),t._l(t.couponList,function(e,i){return s("span",{key:i,staticStyle:{color:"#FFC630"}},[t._v(t._s(e.couponName))])})],2)],2):t._e(),t._v(" "),s("van-cell",[s("template",{slot:"title"},[s("span",{staticClass:"van-cell-text"},[t._v("备注：")]),t._v(" "),s("span",{staticStyle:{color:"#ff6d72"}},[t._v("【新货促销，1周内发货】")])])],2),t._v(" "),s("van-cell",[s("template",{slot:"title"},[s("span",{staticClass:"van-cell-text"},[t._v("服务：")]),t._v(" "),s("span",[t._v("7天无忧退换货")]),t._v(" "),s("span",[t._v("24小时快速退款")]),t._v(" "),s("span",[t._v("中宜自营严选")])])],2)],1)],1),t._v(" "),s("div",{staticClass:"userCommentList",staticStyle:{"background-color":"#ffffff","margin-top":"10px"},attrs:{id:"detail"}},[s("van-cell-group",[s("van-cell",{attrs:{"is-link":""},on:{click:function(e){t.go_comment()}}},[s("template",{slot:"title"},[s("span",{staticClass:"van-cell-text"},[t._v("用户评价("+t._s(t.commentnum)+")")])]),t._v(" "),[s("span",[t._v(t._s(t.praise)+"%好评")])]],2)],1),t._v(" "),t._l(t.detatil.commentList,function(e,o){return 0==o?s("div",{key:o},[s("div",{staticClass:"userComment",staticStyle:{padding:"10px 15px"}},[s("div",[e.user.userIcon?s("img",{directives:[{name:"lazy",rawName:"v-lazy",value:e.user.userIcon,expression:"item.user.userIcon"}],staticStyle:{"vertical-align":"middle","border-radius":"50%"},style:t.handlePX("width",45)+t.handlePX("height",45)}):s("img",{staticStyle:{"vertical-align":"middle","border-radius":"50%"},style:t.handlePX("width",45)+t.handlePX("height",45),attrs:{src:i("nqO4")}}),t._v(" "),s("span",[t._v(t._s(e.user.nickName))])]),t._v(" "),s("div",{staticStyle:{color:"#999999","font-size":"14px"}},[t._v(t._s(e.createTime)+"\n              "),t._l(JSON.parse(e.skuKeyValue),function(e){return s("span",{staticStyle:{margin:"0 5px"}},[t._v(t._s(e.key)+"："+t._s(e.value))])})],2),t._v(" "),s("div",{staticStyle:{padding:"5px 0"}},[t._v(t._s(e.commentContent))]),t._v(" "),e.commentImg?s("div",[e.commentImg.split(",")[0]?s("img",{directives:[{name:"lazy",rawName:"v-lazy",value:e.commentImg.split(",")[0],expression:"item.commentImg.split(',')[0]"}],style:t.handlePX("width",100)+t.handlePX("height",100)}):t._e(),t._v(" "),e.commentImg.split(",")[1]?s("img",{directives:[{name:"lazy",rawName:"v-lazy",value:e.commentImg.split(",")[1],expression:"item.commentImg.split(',')[1]"}],style:t.handlePX("width",100)+t.handlePX("height",100)}):t._e(),t._v(" "),e.commentImg.split(",")[2]?s("img",{directives:[{name:"lazy",rawName:"v-lazy",value:e.commentImg.split(",")[2],expression:"item.commentImg.split(',')[2]"}],style:t.handlePX("width",100)+t.handlePX("height",100)}):t._e(),t._v(" "),e.commentImg.split(",")[3]?s("img",{directives:[{name:"lazy",rawName:"v-lazy",value:e.commentImg.split(",")[3],expression:"item.commentImg.split(',')[3]"}],style:t.handlePX("width",100)+t.handlePX("height",100)}):t._e(),t._v(" "),e.commentImg.split(",")[4]?s("img",{directives:[{name:"lazy",rawName:"v-lazy",value:e.commentImg.split(",")[4],expression:"item.commentImg.split(',')[4]"}],style:t.handlePX("width",100)+t.handlePX("height",100)}):t._e()]):t._e()])]):t._e()}),t._v(" "),0==t.detatil.commentList.length?s("div",{staticClass:" flex  flex-align-center flex-pack-center",staticStyle:{"text-align":"center",padding:"15px","min-height":"145px","font-size":"16px",color:"#666"}},[s("span",[t._v("暂无用户评价")])]):t._e()],2),t._v(" "),s("div",{staticClass:"recommend",staticStyle:{"background-color":"#ffffff","margin-top":"10px","z-index":"2"}},[s("van-tabs",{on:{click:t.selecttablist}},t._l(t.tablist,function(e,o){return s("van-tab",{key:o,attrs:{title:e}},[o==t.tabindex?s("div",{staticStyle:{display:"flex",overflow:"auto"}},t._l(t.tabgoodslist,function(e,o){return s("div",{key:o,style:t.handlePX("padding-bottom",65)+t.handlePX("padding-top",20)+t.handlePX("padding-left",30),on:{click:function(i){t.goProductDetail(e.goodsId)}}},[s("div",{staticStyle:{border:"1px #e5e5e5 solid","box-sizing":"border-box",display:"flex","align-items":"center","justify-content":"center",overflow:"hidden",position:"relative"},style:t.handlePX("height",410)+t.handlePX("width",345)},[s("img",{staticStyle:{width:"-webkit-fill-available",position:"absolute",top:"0",left:"0","z-index":"2"},style:t.handlePX("width",43)+t.handlePX("height",49),attrs:{src:i("HORy")}}),t._v(" "),s("img",{directives:[{name:"lazy",rawName:"v-lazy",value:e.goodsImg.split(",")[0],expression:"items.goodsImg.split(',')[0]"}],staticStyle:{width:"-webkit-fill-available",position:"absolute",top:"0"}}),t._v(" "),s("div",{staticClass:"textLabel",staticStyle:{position:"absolute",bottom:"0",width:"100%","background-color":"rgba(207,207,207,0.3)","text-align":"center",color:"#A3A3A3"},style:t.handlePX("height",70)+t.handlePX("line-height",70)+t.handlePX("font-size",28)},[t._v(t._s(e.jingle))])]),t._v(" "),s("div",{staticStyle:{display:"flex","justify-content":"center","flex-direction":"column",width:"-webkit-fill-available"},style:t.handlePX("width",345)},[s("div",[s("img",{style:t.handlePX("width",52)+t.handlePX("height",25),attrs:{src:i("ILWi")}}),t._v(" "),s("img",{style:t.handlePX("width",52)+t.handlePX("height",25),attrs:{src:i("tp/U")}})]),t._v(" "),s("div",{staticClass:"textLabel",style:t.handlePX("font-size",28)+t.handlePX("line-height",40)},[t._v(t._s(e.goodsName))]),t._v(" "),s("div",{staticStyle:{color:"#E05459"},style:t.handlePX("font-size",30)+t.handlePX("line-height",40)},[t._v("￥"+t._s(e.marketPrice))])])])})):t._e()])}))],1),t._v(" "),s("div",{staticStyle:{height:"10px"}}),t._v(" "),s("van-goods-action",{staticStyle:{"z-index":"90","background-color":"#ffffff"}},[s("van-goods-action-mini-btn",{staticStyle:{"border-top":"1px #e5e5e5 solid",display:"flex","flex-direction":"column","justify-content":"center","align-items":"center",padding:"0 10px","font-size":"22px"},attrs:{icon:"chat"},on:{click:t.onClickMiniBtn_service}}),t._v(" "),s("van-goods-action-mini-btn",{staticStyle:{"border-top":"1px #e5e5e5 solid",display:"flex","flex-direction":"column","justify-content":"center","align-items":"center",padding:"0 10px","font-size":"22px"},attrs:{icon:"cart"},on:{click:t.onClickMiniBtn_cart}}),t._v(" "),s("van-goods-action-mini-btn",{class:{collection_color:t.isCollection},staticStyle:{"border-top":"1px #e5e5e5 solid",display:"flex","flex-direction":"column","justify-content":"center","font-size":"22px","align-items":"center",padding:"0 10px"},attrs:{icon:"like"},on:{click:t.onClickMiniBtn_collection}}),t._v(" "),s("van-goods-action-big-btn",{staticStyle:{flex:"1"},attrs:{text:"立即购买"},on:{click:function(e){t.changeModel()}}}),t._v(" "),s("van-goods-action-big-btn",{staticStyle:{flex:"1"},attrs:{text:"加入购物车",primary:""},on:{click:function(e){t.changeModel()}}})],1),t._v(" "),s("div",{class:t.keepModel?"bg_shop1":"bg_shop_none1",staticStyle:{"background-color":"rgba(0, 0, 0, 0.498039)",height:"100%",width:"100%"},on:{click:function(e){t.changeModel()}}},[s("div",{staticStyle:{position:"relative",width:"100%",height:"100%"}},[s("div",{class:t.keepModel?"modiaBoxUp2":"modiaBoxDown2",staticStyle:{"background-color":"#fff",width:"100%"},on:{click:function(t){t.stopPropagation()}}},[s("div",{staticStyle:{"border-bottom":"1px solid #e5e5e5",display:"flex","margin-left":"15px","justify-content":"space-between"}},[s("div",{staticStyle:{padding:"6px","border-radius":"5px","background-color":"#fff",border:"1px solid #e5e5e5",display:"flex",margin:"10px"}},[s("img",{directives:[{name:"lazy",rawName:"v-lazy",value:t.skuItem.skuImgUrl?t.skuItem.skuImgUrl:t.detatil.goodsImg.split(",")[0],expression:"skuItem.skuImgUrl?skuItem.skuImgUrl :detatil['goodsImg'].split(',')[0]"}],staticStyle:{width:"80px",height:"80px"},on:{click:function(e){t.imagePreview(t.skuItem.skuImgUrl?t.skuItem.skuImgUrl:t.detatil.goodsImg.split(",")[0])}}})]),t._v(" "),s("div",{staticStyle:{"font-size":"13px",flex:"1",padding:"10px 0 0 0"}},[s("div",{staticStyle:{"font-size":"16px"}},[t._v(t._s(t.detatil.goodsName))]),t._v(" "),s("div",{staticStyle:{color:"#666"}},[t._v(t._s(t.detatil.jingle))]),t._v(" "),s("div",{staticStyle:{margin:"10px",height:"40px",overflow:"hidden","font-size":"14px"}},[t._v("单价:\n          "),s("span",{staticStyle:{"font-size":"18px",color:"rgb(229, 28, 35)"}},[t._v("￥"+t._s(t.skuItem.marketPrice?t.skuItem.marketPrice:t.detatil.marketPrice))])])]),t._v(" "),s("div",{staticStyle:{padding:"10px"}},[s("i",{staticClass:"iconfont icon-shanchu3",staticStyle:{color:"#000",height:"17px","line-height":"17px"},on:{click:function(e){e.stopPropagation(),t.changeModel()}}})])]),t._v(" "),s("div",{staticStyle:{"font-size":"14px","max-height":"300px",overflow:"auto"}},t._l(t.detatil.skuKey,function(e,i){return s("div",{key:i},[s("div",{staticStyle:{padding:"5px 20px 0"}},[t._v(t._s(e.skuKeyIdName))]),t._v(" "),s("div",{staticClass:"skuKeyBox"},t._l(e.valueList,function(e,o){return s("div",{key:o},[s("div",{class:t.chosenList[i]===e?"sku_box_select":"sku_box",style:e.disable?"color:#ccc;":""+t.chosenList[i]===e.skuValueId?"background-color:#E41C24;color:#fff":"",on:{click:function(s){s.stopPropagation(),t.selectSku(i,e)}}},[t._v(t._s(e.skuValueName))])])}))])})),t._v(" "),s("div",{staticClass:"num_box"},[s("div",{staticStyle:{display:"flex","align-items":"center"}},[t._v("数量：")]),t._v(" "),s("van-stepper",{staticStyle:{float:"right"},model:{value:t.num,callback:function(e){t.num=e},expression:"num"}})],1),t._v(" "),s("div",[s("van-goods-action",{staticClass:"vangoods",staticStyle:{"z-index":"90","background-color":"#ffffff"}},[s("van-goods-action-mini-btn",{staticStyle:{"border-top":"1px #e5e5e5 solid","font-size":"22px",display:"flex","flex-direction":"column","justify-content":"center","align-items":"center",padding:"0 10px"},attrs:{icon:"chat"},on:{click:t.onClickMiniBtn_service}}),t._v(" "),s("van-goods-action-mini-btn",{staticStyle:{"border-top":"1px #e5e5e5 solid","font-size":"22px",display:"flex","flex-direction":"column","justify-content":"center","align-items":"center",padding:"0 10px"},attrs:{icon:"cart"},on:{click:t.onClickMiniBtn_cart}}),t._v(" "),s("van-goods-action-mini-btn",{class:{collection_color:t.isCollection},staticStyle:{"border-top":"1px #e5e5e5 solid","font-size":"22px",display:"flex","flex-direction":"column","justify-content":"center","align-items":"center",padding:"0 10px"},attrs:{icon:"like"},on:{click:t.onClickMiniBtn_collection}}),t._v(" "),s("van-goods-action-big-btn",{staticStyle:{flex:"1"},attrs:{text:"立即购买"},on:{click:function(e){t.addCar()}}}),t._v(" "),s("van-goods-action-big-btn",{staticStyle:{flex:"1"},attrs:{text:"加入购物车",primary:""},on:{click:function(e){t.addCart()}}})],1)],1)])])]),t._v(" "),s("div",{staticStyle:{display:"flex","flex-wrap":"wrap"}},t._l(t.detatil.imageList,function(t,e){return s("div",{key:e,staticStyle:{"line-height":"0"}},[s("img",{directives:[{name:"lazy",rawName:"v-lazy",value:t,expression:"item"}],staticStyle:{width:"100%"}})])})),t._v(" "),s("div",{staticStyle:{height:"50px"}})],1)},staticRenderFns:[]};var h=i("VU/8")(u,p,!1,function(t){i("sXU2")},"data-v-6ec512ee",null);e.default=h.exports},sXU2:function(t,e){}});
//# sourceMappingURL=23.c78edc2ca99f349041e1.js.map