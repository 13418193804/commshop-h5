webpackJsonp([6],{"+tWO":function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjZGQTkzMDhGMzY0OTExRThBMjhCRTBFNzUwMkY2RDA3IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjZGQTkzMDkwMzY0OTExRThBMjhCRTBFNzUwMkY2RDA3Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NkZBOTMwOEQzNjQ5MTFFOEEyOEJFMEU3NTAyRjZEMDciIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NkZBOTMwOEUzNjQ5MTFFOEEyOEJFMEU3NTAyRjZEMDciLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7/MeUmAAACNElEQVR42uyYyytEcRTHZ8ZzREoWXhsLoZBItshGYSMJEyVJkwX/AwuxnvIuZqZJdkqKvBasvMosaGRjScnCo8H43jpTP7d53Pub3+9nilOffvfcO937vefcc+bcaw2FQpZkNpslyS3pBaZG2ulyuexYOugGvhK8Rga4BcdRjjeBAqfT6TMsELYGugQHoxNs6vZVgn3a9plJcbuEbFXo/BZwxpVi2CMoAndgO4Fn1UopvgazzP4asEvHNfOYFRjuPUd4NpyxFOB5NSu6DpwyvheXcPBWcY7gNLeCQ8Z3Q1w/T4plmFYQO4y/CgaTpQ82AD/jrxgRp0pgM0UuXBBLYIh5hrNA1W+luAzs6SI3zPiZVOElzA0oi2AjuGT8H5EjKyZxylNcTX3OTv66LnL6dqZUYDk4B9nkL4CeOP1WmcBmasIpTCsZET7NcFqdriA2jLYSVRF0M9tzoFvaPMhpk2CM2sao1IGV07yE/Ik6zvSSjiUYpyKtMa4XlCIQwmqxzINS8M45G6ZRf9Qa9pvoCE7Qn36i1gumdMODEIEz1N/ywKeRJhshgjYSdiM8xRgsr7A4BEzUf+C9OEb1tmnvsJTieOd9BlvgSVWbmQbjJs+vvVbWq0qxn+P8J8pSjCJZRJoPsFlosGK1FF/IFhjSiQxgCQis4q9EU/wiuUjveSMYFt6CCHnod1bB4j5ALm2/mhWYz7zU9Clod3azApfBAEVN9jdi7RoPUQ/+f6P+F/jL9i3AAB7dd1VSYJvxAAAAAElFTkSuQmCC"},EbcR:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var d=s("TToO"),a=s("7+uW"),o=s("c+8m"),i=s.n(o),l=s("DZ+H"),n=s("ipus"),c=s("Fd2+"),r=s("TJML"),u=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.chosenAddressId=[],e.addressList=[],e.bianji=s("+tWO"),e}return d.c(e,t),e.prototype.selectDefault1=function(t){var e=this;a.default.prototype.$reqFormPost("/address/setdefault",{userId:this.$store.getters[a.default.prototype.MutationTreeType.TOKEN_INFO].userId,token:this.$store.getters[a.default.prototype.MutationTreeType.TOKEN_INFO].token,addressId:t.addressId},function(t){if(null!=t){if(200!=t.data.status)return console.log("需控制错误码"+t.data.status+",错误信息："+t.data.message),void Object(c.c)(t.data.message);Object(c.c)("设置默认地址成功"),console.log("设置默认地址",t.data.data),e.getDefault()}else console.log("网络请求错误！")})},e.prototype.selectDefault=function(t){var e=this;a.default.prototype.$reqFormPost("/prepare/update",{userId:this.$store.getters[a.default.prototype.MutationTreeType.TOKEN_INFO].userId,token:this.$store.getters[a.default.prototype.MutationTreeType.TOKEN_INFO].token,prepareId:this.$store.getters[a.default.prototype.MutationTreeType.PREPAREID],addressId:t.addressId},function(t){if(null!=t)return 200!=t.data.status?(console.log("需控制错误码"+t.data.status+",错误信息："+t.data.message),void Object(c.c)(t.data.message)):void e.$router.go(-1);console.log("网络请求错误！")})},e.prototype.onDelete=function(t){var e=this;console.log(t),a.default.prototype.$reqFormPost("/address/delete",{userId:this.$store.getters[a.default.prototype.MutationTreeType.TOKEN_INFO].userId,token:this.$store.getters[a.default.prototype.MutationTreeType.TOKEN_INFO].token,addressId:t.addressId},function(t){if(null!=t){if(200!=t.data.status)return console.log("需控制错误码"+t.data.status+",错误信息："+t.data.message),void Object(c.c)(t.data.message);Object(c.c)("删除地址成功"),console.log("删除地址",t.data.data),e.getAddressList()}else console.log("网络请求错误！")})},e.prototype.getDefault=function(){var t=this;a.default.prototype.$reqFormPost("/address/defaultaddress",{userId:this.$store.getters[a.default.prototype.MutationTreeType.TOKEN_INFO].userId,token:this.$store.getters[a.default.prototype.MutationTreeType.TOKEN_INFO].token},function(e){if(null!=e)return 200!=e.data.status?(console.log("需控制错误码"+e.data.status+",错误信息："+e.data.message),void Object(c.c)(e.data.message)):void(!e.data.data.addressId&&t.addressList.length>0?t.selectDefault(t.addressList[0]):t.chosenAddressId=e.data.data.addressId);console.log("网络请求错误！")})},e.prototype.onAdd=function(){this.$router.push({name:"address",query:{addressModel:"add"}})},e.prototype.onEdit=function(t,e){this.setAddressItem(this.addressList[e]),this.$router.push({name:"address",query:{addressModel:"edit"}})},e.prototype.getAddressList=function(){var t=this;a.default.prototype.$reqFormPost("/address/list",{userId:this.$store.getters[a.default.prototype.MutationTreeType.TOKEN_INFO].userId,token:this.$store.getters[a.default.prototype.MutationTreeType.TOKEN_INFO].token},function(e){if(null!=e){if(200!=e.data.status)return console.log("需控制错误码"+e.data.status+",错误信息："+e.data.message),void Object(c.c)(e.data.message);console.log("地址列表",e.data.data.addressList),t.addressList=e.data.data.addressList,t.addressList.forEach(function(t,e){t.id=t.addressId,t.name=t.contactname,t.tel=t.contactmobile,t.readdress=t.address,t.address=t.province+t.city+t.country+t.address}),t.getDefault()}else console.log("网络请求错误！")})},e.prototype.handlePX=function(t,e){return t+":"+this.$store.getters[a.default.prototype.MutationTreeType.SYSTEM].availWidth/750*e+"px;"},e.prototype.mounted=function(){console.log("list mount"),this.getAddressList()},d.b([Object(n.a)("setAddressItem")],e.prototype,"setAddressItem",void 0),e=d.b([i()({components:{comhead:r.a},mixins:[l.a]})],e)}(a.default),p={render:function(){var t=this,e=t.$createElement,d=t._self._c||e;return d("div",{staticClass:"tab-contents",staticStyle:{"background-color":"#f8f8f8",height:"-webkit-fill-available"}},[d("comhead",{ref:"comhead",attrs:{isLeftIcon:"icon-zuo",leftIconName:"angle-left",title:"地址管理",isRightIcon:"true"},on:{leftClick:!1}}),t._v(" "),d("img",{staticStyle:{width:"100%","vertical-align":"text-top"},attrs:{src:s("AQsh")}}),t._v(" "),t._l(t.addressList,function(e,a){return d("div",{key:a,staticStyle:{"background-color":"#ffffff","margin-bottom":"15px"},on:{click:function(s){t.selectDefault(e)}}},[d("div",{staticStyle:{"border-bottom":"1px solid #efefef"},style:t.handlePX("padding",30)},[d("div",{staticClass:"flex flex-pack-justify"},[d("div",[t._v("收货人："+t._s(e.contactname))]),t._v(" "),d("div",[t._v(t._s(e.tel))])]),t._v(" "),d("div",{staticClass:"flex",style:t.handlePX("padding-top",20)},[d("img",{style:t.handlePX("width",34)+t.handlePX("height",42),attrs:{src:s("IfWe")}}),t._v(" "),d("div",{staticStyle:{"padding-left":"5px"}},[t._v(t._s(e.address))])])]),t._v(" "),d("div",{staticClass:"flex flex-pack-justify flex-align-center",style:t.handlePX("height",80)+t.handlePX("padding-left",30)+t.handlePX("padding-right",30)},[d("div",{staticClass:"flex"},[d("van-radio-group",{on:{click:function(s){s.stopPropagation(),t.selectDefault1(e)}},model:{value:t.chosenAddressId,callback:function(e){t.chosenAddressId=e},expression:"chosenAddressId"}},[d("van-radio",{attrs:{name:e.id}},[t._v(t._s(t.chosenAddressId==e.id?"默认地址":"设置默认"))])],1)],1),t._v(" "),d("div",{staticClass:"flex"},[d("div",{staticClass:"flex",on:{click:function(s){s.stopPropagation(),t.onEdit(e,a)}}},[d("img",{style:t.handlePX("width",40)+t.handlePX("height",40),attrs:{src:t.bianji}}),t._v(" "),d("div",{staticStyle:{color:"#949494"}},[t._v("编辑")])]),t._v(" "),d("div",{staticClass:"flex",staticStyle:{"margin-left":"10px"},on:{click:function(s){s.stopPropagation(),t.onDelete(e)}}},[d("img",{style:t.handlePX("width",40)+t.handlePX("height",40),attrs:{src:s("ZQOb")}}),t._v(" "),d("div",{staticStyle:{color:"#949494"}},[t._v("删除")])])])])])}),t._v(" "),0==t.addressList.length?d("div",{staticClass:"flex  flex-align-center  flex-pack-center",staticStyle:{height:"100vh",position:"fixed",width:"100%",top:"0"}},[d("div",[t._v("暂无地址")])]):t._e(),t._v(" "),d("div",{staticStyle:{width:"100%",position:"fixed",bottom:"0","background-color":"#fff","text-align":"center","border-top":"1px solid #dadada",color:"#707070"},style:t.handlePX("line-height",100)+t.handlePX("height",100),on:{click:function(e){t.onAdd()}}},[t._v("新增收货地址")])],2)},staticRenderFns:[]};var g=s("VU/8")(u,p,!1,function(t){s("qBKY"),s("v/P+")},"data-v-522e94ac",null);e.default=g.exports},IfWe:function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAqCAYAAADWFImvAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjE0MDk2M0U4MzY0NjExRTg4NjRERDA1Rjk2Mjg3OTBGIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjE0MDk2M0U5MzY0NjExRTg4NjRERDA1Rjk2Mjg3OTBGIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MTQwOTYzRTYzNjQ2MTFFODg2NEREMDVGOTYyODc5MEYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MTQwOTYzRTczNjQ2MTFFODg2NEREMDVGOTYyODc5MEYiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7MqdX/AAAEJklEQVR42syYaUhVQRTHrw/NlMoWowiLIGmjBcqyTc00yzAr2/vQBy31S0TRahEVLUoW0UKLQkS0Q1GKUFa22GKSEkkbQYu2aKW2SZr2+o+cicNwt/d8Rgd+eOfeO/P+d+bMOWf0io2N1VywAWAuiAEhwEfnnc/gLjgDLoEqswHz8vKa/3rbFDAdrAfDbbzbBcQRP0EOWAHemHWyEtILHABTlPuvwBXwANSARuAHgsBoEA38QVswG8SDXSADfHFViJiFY6Adu3cY5BJOk75dQQKNMRn4grW0lCv1OjgMBkoC55mI+7QsKTTVTouZ/AgOAeGAi+neL3DclaWZB7JZeztI09w3MdZNUA9e2xUifOIkawsn26m13J5bvaAuzVV2vcdDIvRM+M1+kChveLE4soCtofCJ0FYS0YaWSVo3xJIqOSO+NAPSErXWM+G0e1l7N5+R+eAEPTgHZtocNIB2UyA5YpELgt6CHjQ7/nJGeMDabGOQQSCLApvwq9PgHngCNtkUcpGtxhwHXcTTzW/gkcUAIs+UgkWgo/KsP9hAPtbBYpwcdr1QCBnJOt0Bv006B1Iis0oNIygFmFk++EHXoULIEPawxOZ0SrtFszkBpIJqRcw6C6d9SNedhZCe7GG5ScdxlNCk3QDhNMUFFNKF49axd1IsPqycBzR/RaWRjWLXItcs03lHOO8WHiPE15qMWc+F8ODS3iIQSWsghzVae94nyGL7/xVSyR4EW6ypNB/aIXo2hl2LOuW9yZh9uRC+XSNNOpUoOUovD3UCG1m7ikoCPQui0lPYdwdt2QZWkwYYdBSBq4y1p1AUnkghQJQPxSRG2jGTD0vgH+mgIJbLbsabdJ6qtGeAyxTaRfnQhz0TUXaNyVj8d07JEM+Dzw6TzmJXTLMRvl/S1jY7DUSxHXjUwRJdI9tyqRZBLYyOC6pVU5E8FHwyGeMIuy5AGVAnQ3UlHRfSWWq+Dp4aDFRIpFGgE7GogoLcV4vZSlJqneVqYSRmp5bFkg+gtxJnWmoxlKukZWE2ktVSUSS78azdnXaJn4dERCsi3oElRjVriZKogimCDm6hiAgl4gqbpIZ41baBTNbuR9sz3E0RYmav6SxRmZ0DljiNLWVtP3LEWW4IKWa/U08ZPN/uSU8eJyKUe2dBsgsiLihJL4pKSs0VIRqd0IbRbpIm6o5VNkRkKNFTHFdu2z1g6VkpBbAK5UdWm/SJU8RmKidIt4Ro5FghytEx3eBM3FEpjAuN/gPgjhAZfQcqBdFWnXKwSAn5YXYGd7i4A5oo5fMz8kFWRmazYqdJx9k9JkRWXTHkyBo7hjyjPMKds6w1hch0EEH/tGvOWbzsg+0zyM4eF8Lr0xfKvcc8h/wrIRr5DPehse4M4u0BITVUt0ZSDVPrziBeTqdT+x/sjwADAI+85dSJsWSeAAAAAElFTkSuQmCC"},qBKY:function(t,e){},"v/P+":function(t,e){}});
//# sourceMappingURL=6.44cc87b74b94cd053fc4.js.map