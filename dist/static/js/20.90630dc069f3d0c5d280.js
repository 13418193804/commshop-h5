webpackJsonp([20],{BYlC:function(t,s){},NcgL:function(t,s,e){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var i=e("TToO"),o=e("7+uW"),a=e("c+8m"),r=e.n(a),n=e("ipus"),c=e("VU/8")(null,null,!1,null,null,null).exports,h=function(t){function s(){var s=null!==t&&t.apply(this,arguments)||this;return s.hotkeys=null,s.data="",s.keyword="",s.getLastKeyword="",s.fetching=!1,s.isLoad=!0,s.page=1,s.isShowCancel=!1,s.isShowDelete=!1,s.isShowHistory=!1,s.isShowSearchResults=!1,s.songsObject={},s.searchResult=null,s.history=[],s.isGetHotKey=!1,s}return i.c(s,t),Object.defineProperty(s.prototype,"song",{get:function(){return this.$store.state.song},enumerable:!0,configurable:!0}),Object.defineProperty(s.prototype,"artist",{get:function(){return this.$store.state.artist},enumerable:!0,configurable:!0}),Object.defineProperty(s.prototype,"isShowPlayer",{get:function(){return this.$store.state.isShowPlayer},enumerable:!0,configurable:!0}),s.prototype.created=function(){},s.prototype.mounted=function(){window.addEventListener("scroll",this.onScroll.bind(this)),this.history=localStorage.getItem("SET_HISTORY_KEY")?localStorage.getItem("SET_HISTORY_KEY").split(","):[]},s.prototype.enter=function(t){this.keyword?this.isShowDelete=!0:(this.isShowDelete=!1,this.reset()),13===t.keyCode&&(this.isShowHistory=!1,this.isShowSearchResults=!0,this.addHistory(this.keyword),this.search(this.keyword))},s.prototype.onClick=function(t){if(t.target.matches("#search")&&(this.isShowCancel=!0,this.isShowHistory=!0),t.target.matches(".search-cancel")&&(this.isShowCancel=!1,this.isShowDelete=!1,this.isShowHistory=!1,this.reset()),t.target.matches(".icon-delete")&&(this.isShowDelete=!1,this.reset()),t.target.matches(".record-delete")&&(this.history=[],this.setLocalStorageData(this.history)),t.target.matches(".icon .icon-close")){var s=this.history.indexOf(t.target.previousElementSibling.innerHTML);this.history.splice(s,1),this.setLocalStorageData(this.history)}(t.target.matches(".tag-keyword")||t.target.matches(".record-con"))&&(this.keyword=t.target.innerHTML,this.isShowDelete=!0,this.isShowCancel=!0,this.isShowHistory=!1,this.isShowSearchResults=!0,this.addHistory(this.keyword),this.search(this.keyword))},s.prototype.search=function(t,s){void 0===t&&(t=""),""!==t&&(this.getLastKeyword===t&&this.songsObject[s||this.page]||(this.getLastKeyword!==t&&this.reset(),!this.fetching&&this.isLoad&&(this.getLastKeyword=t,this.loading())))},s.prototype.onScroll=function(t){if(!this.isLoad)return window.removeEventListener("scroll",this.onScroll.bind(this));document.documentElement.clientHeight+pageYOffset>document.body.scrollHeight-100&&this.search(this.keyword,this.page+1)},s.prototype.accomplish=function(){this.fetching=!1},s.prototype.loading=function(){this.fetching=!0},s.prototype.reset=function(){this.page=1,this.isLoad=!0,this.songsObject={},this.searchResult=null},s.prototype.addHistory=function(t){-1===this.history.indexOf(t)&&(this.history.unshift(t),this.setLocalStorageData(this.history))},s.prototype.shuffle=function(t,s){for(var e=[],i=Math.min(s,t.length),o=0;o<i;o++){var a=t,r=Math.floor(Math.random()*a.length);e[o]=a[r],t.splice(r,1)}return e},s.prototype.showPlayerDetail=function(t){this.showPlayer(),this.getSong(i.a({},t))},i.b([Object(n.a)("setLocalStorageData")],s.prototype,"setLocalStorageData",void 0),i.b([Object(n.a)("showPlayer")],s.prototype,"showPlayer",void 0),i.b([Object(n.a)("getSong")],s.prototype,"getSong",void 0),s=i.b([r()({components:{Player:c}})],s)}(o.default),l={render:function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"tab-contents"},[e("div",{staticClass:"search-view tab-content",on:{click:function(s){t.onClick(s)}}},[e("div",{staticClass:"search-bar"},[e("div",{staticClass:"input-wrap"},[e("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.keyword,expression:"keyword",modifiers:{trim:!0}}],attrs:{type:"text",id:"search",placeholder:"搜索歌曲、歌单、专辑"},domProps:{value:t.keyword},on:{keyup:function(s){t.enter(s)},input:function(s){s.target.composing||(t.keyword=s.target.value.trim())},blur:function(s){t.$forceUpdate()}}}),t._v(" "),e("span",{staticClass:"icon-search"}),t._v(" "),e("span",{directives:[{name:"show",rawName:"v-show",value:t.isShowDelete,expression:"isShowDelete"}],staticClass:"icon-delete"},[t._v("删除")])]),t._v(" "),e("div",{directives:[{name:"show",rawName:"v-show",value:t.isShowCancel,expression:"isShowCancel"}],staticClass:"search-cancel"},[t._v("取消")])]),t._v(" "),t.history.length>0&&t.isShowHistory?e("div",{staticClass:"record-keys"},[t._l(t.history,function(s){return e("li",[e("div",{staticClass:"record-main"},[e("span",{staticClass:"icon icon-clock"}),t._v(" "),e("span",{staticClass:"record-con ellipsis"},[t._v(t._s(s))]),t._v(" "),e("span",{staticClass:"icon icon-close"})])])}),t._v(" "),e("p",{staticClass:"record-delete"},[t._v("清除搜索记录")])],2):t._e(),t._v(" "),e("div",{directives:[{name:"show",rawName:"v-show",value:t.isShowSearchResults,expression:"isShowSearchResults"}],staticClass:"search-results"},[e("div",{staticClass:"song-list"},t._l(t.searchResult,function(s){return e("div",{key:s.songid,staticClass:"song-item",on:{click:function(e){t.showPlayerDetail(s)}}},[e("i",{staticClass:"icon icon-music"}),t._v(" "),e("div",{staticClass:"song-name",domProps:{innerHTML:t._s(s.songname)}}),t._v(" "),e("div",{staticClass:"song-artist"},t._l(s.singer,function(s){return e("span",{domProps:{innerHTML:t._s(s.name+"&nbsp;")}})}))])})),t._v(" "),e("div",{directives:[{name:"show",rawName:"v-show",value:t.fetching,expression:"fetching"}],staticClass:"search-loading show"},[e("i",{staticClass:"loading-icon"}),t._v(" "),e("div",{staticClass:"loading-text"},[t._v("正在载入更多...")])]),t._v(" "),e("div",{directives:[{name:"show",rawName:"v-show",value:!t.isLoad,expression:"!isLoad"}],staticClass:"search-loading show"},[e("div",{staticClass:"loading-done"},[t._v("已加载全部")])])]),t._v(" "),e("div",{directives:[{name:"show",rawName:"v-show",value:!t.isShowHistory&&!t.isShowSearchResults,expression:"!isShowHistory && !isShowSearchResults"}],staticClass:"mod-search-result",attrs:{id:"hot-keys"}},[e("h3",{staticClass:"result-tit"},[t._v("热门搜索")]),t._v(" "),t.isGetHotKey?e("div",{staticClass:"result-tags"},[t.data.special_url?e("a",{staticClass:"tag tag-hot",attrs:{href:t.data.special_url}},[t._v(t._s(t.data.special_key))]):t._e(),t._v(" "),t._l(t.hotkeys,function(s){return e("div",{key:s.n,staticClass:"tag tag-keyword"},[t._v(t._s(s.k))])})],2):t._e(),t._v(" "),e("div",{directives:[{name:"show",rawName:"v-show",value:!t.isGetHotKey,expression:"!isGetHotKey"}],staticClass:"search-loading show"},[e("i",{staticClass:"loading-icon"}),t._v(" "),e("div",{staticClass:"loading-text"},[t._v("正在加载...")])])])]),t._v(" "),t.isShowPlayer?e("player",{attrs:{song:t.song,artist:t.artist}}):t._e()],1)},staticRenderFns:[]};var d=e("VU/8")(h,l,!1,function(t){e("BYlC")},"data-v-c6713494",null);s.default=d.exports}});
//# sourceMappingURL=20.90630dc069f3d0c5d280.js.map