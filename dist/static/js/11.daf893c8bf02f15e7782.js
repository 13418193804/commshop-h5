webpackJsonp([11],{PrvB:function(t,e){},Zrtv:function(t,e){},afYQ:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=a("TToO"),s=a("7+uW"),o=a("c+8m"),r=a.n(o),n=a("DZ+H"),l=a("ymRw"),d=a("TJML"),c=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.prepareId="",e.pageType="",e.titlevalue="",e.couponId="",e.titleType="",e.invoiceTitle="",e.invoiceNo="",e.remark="",e.shopCartList=[],e.address=null,e.totalPrice=0,e.freight=0,e.goodsSum=0,e}return i.c(e,t),e.prototype.goSelectAddress=function(){this.$router.push({name:"selectaddress"})},e.prototype.goinvoice=function(){this.$router.push({name:"invoice"})},e.prototype.getPreInfo=function(t){var e=this;s.default.prototype.$reqFormPost("/prepare/order/query",{userId:this.$store.getters[s.default.prototype.MutationTreeType.TOKEN_INFO].userId,token:this.$store.getters[s.default.prototype.MutationTreeType.TOKEN_INFO].token,prepareId:t},function(t){if(null!=t){if(200!=t.data.status)return console.log("需控制错误码"+t.data.status+",错误信息："+t.data.message),void Object(l.Toast)(t.data.message);console.log(t.data.data),e.shopCartList=t.data.data.shopCartList,e.address=t.data.data.address,e.totalPrice=t.data.data.totalPrice,e.goodsSum=t.data.data.goodsSum,e.freight=t.data.data.freight}else console.log("网络请求错误！")})},e.prototype.onSubmit=function(){var t=this;this.address?s.default.prototype.$reqFormPost("/prepare/order/submit",{userId:this.$store.getters[s.default.prototype.MutationTreeType.TOKEN_INFO].userId,token:this.$store.getters[s.default.prototype.MutationTreeType.TOKEN_INFO].token,couponId:this.couponId,titleType:this.titleType,invoiceTitle:this.invoiceTitle,invoiceNo:this.invoiceNo,prepareId:this.prepareId,remark:this.remark},function(e){if(null!=e){if(200!=e.data.status)return console.log("需控制错误码"+e.data.status+",错误信息："+e.data.message),void Object(l.Toast)(e.data.message);t.$router.replace({name:"pay",query:{contactname:t.address.contactname,contactmobile:t.address.contactmobile,address:t.address.province+t.address.city+t.address.country+t.address.address,body:e.data.data.body,payId:e.data.data.payId,payTotal:e.data.data.payTotal}}),console.log(e.data.data)}else console.log("网络请求错误！")}):Object(l.Toast)("请选择一个收货地址")},e.prototype.mounted=function(){this.prepareId=this.$store.getters[s.default.prototype.MutationTreeType.PREPAREID],this.getPreInfo(this.$store.getters[s.default.prototype.MutationTreeType.PREPAREID]),this.$route.query.titleType&&("PERSON"==this.$route.query.titleType?(this.titleType="PERSON",this.titlevalue="个人"):"COMPANY"==this.$route.query.titleType&&(this.titleType="COMPANY",this.titlevalue="单位",this.invoiceTitle=this.$route.query.invoiceTitle,this.invoiceNo=this.$route.query.invoiceNo))},e=i.b([r()({components:{comhead:d.a},mixins:[n.a]})],e)}(s.default),p={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"tab-contents",staticStyle:{height:"-webkit-fill-available"}},[a("comhead",{ref:"comhead",attrs:{isLeftIcon:"icon-zuo",leftIconName:"angle-left",title:"确认订单",isRightIcon:"true"},on:{leftClick:!1}}),t._v(" "),a("div",{staticClass:"addressbox",on:{click:function(e){t.goSelectAddress()}}},[a("div",{staticStyle:{display:"flex","align-items":"center",padding:"10px"}},[t.address?a("div",{staticStyle:{flex:"1"}},[a("div",{staticStyle:{"font-size":"16px",display:"flex","justify-content":"space-between"}},[a("span",[t._v("收货人:"+t._s(t.address.contactname))]),t._v(" "),a("span",{staticStyle:{"margin-right":"10px"}},[t._v(t._s(t.address.contactmobile))])]),t._v(" "),a("div",{staticStyle:{display:"flex","align-items":"center",padding:"5px"}},[t._m(0),t._v(" "),a("div",{staticClass:"lineTwo"},[t._v("\n                     收货地址：    "+t._s(t.address.province)+t._s(t.address.city)+t._s(t.address.country)+t._s(t.address.address)+"\n                    ")])])]):a("div",{staticStyle:{flex:"1"}},[t._v("\n              请选择一个收货地址\n            ")]),t._v(" "),a("i",{staticClass:"iconfont icon-youjiantou",staticStyle:{"font-size":"20px"}})])]),t._v(" "),t._m(1),t._v(" "),a("div",{staticStyle:{"background-color":"#fff","margin-bottom":"10px"}},[t._l(t.shopCartList,function(e,i){return a("div",{key:i},[a("div",{staticClass:"product"},[a("div",{staticStyle:{display:"flex","align-items":"center"}},[a("img",{directives:[{name:"lazy",rawName:"v-lazy",value:e.goodsImg,expression:"item.goodsImg"}],staticStyle:{height:"70px",width:"70px"}})]),t._v(" "),a("div",{staticStyle:{flex:"1",padding:"0 10px"}},[a("div",{staticClass:"lineTwoType",staticStyle:{flex:"1"}},[t._v(t._s(e.goodsName))]),t._v(" "),a("div",{staticClass:"lineTwoType",staticStyle:{flex:"1",color:"#666","font-size":"14px"}},[t._v(t._s(e.jingle))]),t._v(" "),a("div",[a("span",{staticClass:"marketPrice"},[t._v("￥"+t._s(e.price))]),t._v(" "),a("span",{staticClass:"labelPrice",staticStyle:{"font-size":"12px"}},[t._v("￥"+t._s(e.labelPrice))])])]),t._v(" "),a("div",[t._v("X "+t._s(e.num))])])])}),t._v(" "),a("div",{staticStyle:{height:"10px","background-color":"#f7f7f7"}}),t._v(" "),a("van-cell-group",[a("van-cell",{attrs:{title:"配送方式",value:"快递"}}),t._v(" "),a("van-cell",{attrs:{title:"运费",value:t.freight.toFixed(2)}}),t._v(" "),a("van-cell",{attrs:{title:"发票抬头","is-link":"",value:t.titlevalue},on:{click:function(e){t.goinvoice()}}}),t._v(" "),a("van-field",{attrs:{label:"卖家留言选填：",type:"textarea",placeholder:"选填内容已和卖家协商确认",rows:"1",autosize:""},model:{value:t.remark,callback:function(e){t.remark=e},expression:"remark"}})],1),t._v(" "),a("div",{staticStyle:{margin:"0 10px","text-align":"right",padding:"10px"}},[a("span",{staticStyle:{margin:"0 10rpx"}},[t._v("\n        共"+t._s(t.goodsSum)+"件商品\n     ")]),t._v(" "),a("span",[t._v("小计："),a("span",{staticClass:"marketPrice"},[t._v("￥"+t._s(t.totalPrice.toFixed(2)))])])]),t._v(" "),a("div",{staticStyle:{height:"10px","background-color":"#f7f7f7"}})],2),t._v(" "),a("van-submit-bar",{attrs:{price:100*t.totalPrice,"button-text":"立即支付"},on:{submit:t.onSubmit}})],1)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",[e("i",{staticClass:"iconfont icon-location",staticStyle:{"margin-right":"10px","font-size":"22px"}})])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticStyle:{display:"flex",height:"5px"}},[e("img",{staticStyle:{width:"100%"},attrs:{src:a("AQsh")}})])}]};var u=a("VU/8")(c,p,!1,function(t){a("PrvB"),a("Zrtv")},"data-v-5e4267a6",null);e.default=u.exports}});
//# sourceMappingURL=11.daf893c8bf02f15e7782.js.map