webpackJsonp([29],{YUFY:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n("TToO"),c=n("7+uW"),a=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return i.c(e,t),Object.defineProperty(e.prototype,"active",{get:function(){return this.$store.getters[c.default.prototype.MutationTreeType.TAB_INDEX]},enumerable:!0,configurable:!0}),e.prototype.selectTab=function(t){0===t&&this.$router.push("/"),1===t&&this.$router.push("/category"),2===t&&this.$router.push("/cart"),3===t&&this.$router.push("/user")},e.prototype.mounted=function(){console.log(111)},e}(c.default),o={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"tab-contents"},[n("div",{staticClass:"content"},[n("transition",{attrs:{name:"move",mode:"out-in"}},[n("router-view")],1)],1),t._v(" "),n("van-tabbar",{model:{value:t.active,callback:function(e){t.active=e},expression:"active"}},[n("van-tabbar-item",{on:{click:function(e){t.selectTab(0)}}},[n("div",{staticStyle:{"text-align":"center"}},[n("i",{staticClass:"iconfont icon-shouye",staticStyle:{"font-size":"22px"}})]),t._v("\n    首页")]),t._v(" "),n("van-tabbar-item",{on:{click:function(e){t.selectTab(1)}}},[n("div",{staticStyle:{"text-align":"center"}},[n("i",{staticClass:"iconfont icon-fenleifill",staticStyle:{"font-size":"22px"}})]),t._v("\n    分类")]),t._v(" "),n("van-tabbar-item",{on:{click:function(e){t.selectTab(2)}}},[n("div",{staticStyle:{"text-align":"center"}},[n("i",{staticClass:"iconfont icon-gouwucheman",staticStyle:{"font-size":"22px"}})]),t._v("\n    购物车")]),t._v(" "),n("van-tabbar-item",{on:{click:function(e){t.selectTab(3)}}},[n("div",{staticStyle:{"text-align":"center"}},[n("i",{staticClass:"iconfont icon-iconuser",staticStyle:{"font-size":"22px"}})]),t._v("\n    个人")])],1)],1)},staticRenderFns:[]};var s=n("VU/8")(a,o,!1,function(t){n("pVK2")},null,null);e.default=s.exports},pVK2:function(t,e){}});
//# sourceMappingURL=29.1f154b22f7bb15ed5bbb.js.map