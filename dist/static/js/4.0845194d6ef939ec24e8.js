webpackJsonp([4],{"1jXR":function(t,e){},kmra:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var d=s("TToO"),o=s("7+uW"),a=s("c+8m"),r=s.n(a),n=s("DZ+H"),i=s("ipus"),l=s("ymRw"),u=s("TJML"),c=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.chosenAddressId=[],e.addressList=[],e}return d.c(e,t),e.prototype.selectDefault=function(t){var e=this;console.log(t),o.default.prototype.$reqFormPost("/address/setdefault",{userId:this.$store.getters[o.default.prototype.MutationTreeType.TOKEN_INFO].userId,token:this.$store.getters[o.default.prototype.MutationTreeType.TOKEN_INFO].token,addressId:t.addressId},function(t){null!=t?200==t.data.status?(Object(l.Toast)("设置默认地址成功"),console.log("设置默认地址",t.data.data),e.getDefault()):console.log("需控制错误码"+t.data.status+",错误信息："+t.data.message):console.log("网络请求错误！")})},e.prototype.getDefault=function(){var t=this;o.default.prototype.$reqFormPost("/address/defaultaddress",{userId:this.$store.getters[o.default.prototype.MutationTreeType.TOKEN_INFO].userId,token:this.$store.getters[o.default.prototype.MutationTreeType.TOKEN_INFO].token},function(e){null!=e?200==e.data.status?!e.data.data.addressId&&t.addressList.length>0?t.selectDefault(t.addressList[0]):t.chosenAddressId=e.data.data.addressId:console.log("需控制错误码"+e.data.status+",错误信息："+e.data.message):console.log("网络请求错误！")})},e.prototype.onAdd=function(){this.$router.push({name:"address",query:{addressModel:"add"}})},e.prototype.onEdit=function(t,e){this.setAddressItem(this.addressList[e]),this.$router.push({name:"address",query:{addressModel:"edit"}})},e.prototype.getAddressList=function(){var t=this;o.default.prototype.$reqFormPost("/address/list",{userId:this.$store.getters[o.default.prototype.MutationTreeType.TOKEN_INFO].userId,token:this.$store.getters[o.default.prototype.MutationTreeType.TOKEN_INFO].token},function(e){null!=e?200==e.data.status?(console.log("地址列表",e.data.data.addressList),t.addressList=e.data.data.addressList,t.addressList.forEach(function(t,e){t.id=t.addressId,t.name=t.contactname,t.tel=t.contactmobile,t.readdress=t.address,t.address=t.province+t.city+t.country+t.address}),t.getDefault()):console.log("需控制错误码"+e.data.status+",错误信息："+e.data.message):console.log("网络请求错误！")})},e.prototype.mounted=function(){console.log("list mount"),this.getAddressList()},d.b([Object(i.a)("setAddressItem")],e.prototype,"setAddressItem",void 0),e=d.b([r()({components:{comhead:u.a},mixins:[n.a]})],e)}(o.default),p={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"tab-contents",staticStyle:{"background-color":"#f8f8f8",height:"-webkit-fill-available"}},[s("comhead",{ref:"comhead",attrs:{isLeftIcon:"icon-zuo",leftIconName:"angle-left",title:"地址列表",isRightIcon:"true"},on:{leftClick:!1}}),t._v(" "),s("van-address-list",{attrs:{list:t.addressList},on:{add:t.onAdd,edit:t.onEdit,select:t.selectDefault},model:{value:t.chosenAddressId,callback:function(e){t.chosenAddressId=e},expression:"chosenAddressId"}})],1)},staticRenderFns:[]};var f=s("VU/8")(c,p,!1,function(t){s("1jXR")},"data-v-d9c784d2",null);e.default=f.exports}});
//# sourceMappingURL=4.0845194d6ef939ec24e8.js.map