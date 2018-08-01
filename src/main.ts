// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Vuex from 'vuex';
import App from './App.vue';
import router from './router/index';
import store from './store/';
import VueLazyload from 'vue-lazyload';
import Vant from 'vant';
// import 'vant/lib/vant-css/index.css';
import Api from './config/fetch';
import MutationTreeType from './store/mutation-types';
import MintUI from 'mint-ui';

Vue.use(MutationTreeType);
Vue.use(VueLazyload, {
    preLoad: 1.3,
    error: require('./assets/default_pic.jpg'),
    loading: require('./assets/default_pic.jpg'),
    attempt: 1
});
Vue.use(MintUI);
Vue.use(Vuex);
Vue.use(Api);
Vue.use(Vant);

router.beforeEach((to, from, next) => {
    if (navigator.userAgent.toLowerCase().match(/MicroMessenger/i) &&  navigator.userAgent.toLowerCase().match(/MicroMessenger/i)[0] == "micromessenger") {
        if (localStorage.master !== 'true') {
            if (!localStorage.openId || !localStorage.timeStamp || !localStorage.nonceStr || !localStorage.package) {
                window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx2e2d97a4e10ef2b6&redirect_uri=https://m.yourhr.com.cn/zhongyi/wechat/enter/bind?action=viewtest&response_type=code&scope=snsapi_userinfo&state=${window.location.href}#wechat_redirect`
                next();
            } else {
                next();
            }
        } else {
            next();
        }
    } else {
        next();
    }
});

Vue.config.productionTip = false;
const init = new Vue({
    router,
    store,
    components: { App },
    template: '<App/>'
}).$mount('#app');

window['myvue'] = init;
