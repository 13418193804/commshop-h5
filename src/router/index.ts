// declare function require(moduleName: string): any;
import Vue from 'vue';
import Router from 'vue-router';
import NavHeader from '../components/NavHeader.vue';
import App from '../App.vue';
import recommend from '../pages/recommend/recommend.vue';

// ts 按需加载需要@types/webpack-env 这个包
const search = r => require.ensure([], () => r(require('../pages/search/search')), 'search');
const test = r => require.ensure([], () => r(require('../pages/test/test')), 'test');
const index = r => require.ensure([], () => r(require('../pages/index/Index')), 'Index');

const TabContainer = r => require.ensure([], () => r(require('../components/TabContainer')), 'tabContainer');

Vue.use(Router);

export default new Router({
    routes: [

        {
            path: '/',
            component: TabContainer,
            children: [
                {
                    path: '/',
                    component: index
                },
                {
                    path: '/category',
                    component:  r => require.ensure([], () => r(require('../pages/index/category')), 'category')
                },
                {
                    path: '/cart',
                    component:  r => require.ensure([], () => r(require('../pages/index/Cart')), 'cart')
                },
                {
                    path: '/user',
                    component:  r => require.ensure([], () => r(require('../pages/index/User')), 'user')
                }
            ]
        },
        {
            path: '/productlist',
            name: 'productlist',
            component:  r => require.ensure([], () => r(require('../pages/product/productList')), 'user')
        },
        {
            path: '/login',
            name: 'login',
            component:  r => require.ensure([], () => r(require('../pages/login/login')), 'login')
        },
        {
            path: '/sign',
            name: 'sign',
            component:  r => require.ensure([], () => r(require('../pages/login/sign')), 'user')
        },
        {
            path: '/productdetail',
            name: 'productdetail',
            component:  r => require.ensure([], () => r(require('../pages/product/productDetail')), 'productdetail')
        },
        {
            path: '/settle',
            name: 'settle',
            component:  r => require.ensure([], () => r(require('../pages/order/settle')), 'settle')
        },
        {
            path: '/addresslist',
            name: 'addresslist',
            component:  r => require.ensure([], () => r(require('../pages/address/addresslist')), 'addresslist')
        },
        {
            path: '/address',
            name: 'address',
            component:  r => require.ensure([], () => r(require('../pages/address/address')), 'address')
        },
        {
            path: '/selectaddress',
            name: 'selectaddress',
            component:  r => require.ensure([], () => r(require('../pages/address/selectaddress')), 'selectaddress')
        },
        {
            path: '/orderlist',
            name: 'orderlist',
            component:  r => require.ensure([], () => r(require('../pages/order/orderlist')), 'orderlist')
        },
        {
            path: '/pay',
            name: 'pay',
            component:  r => require.ensure([], () => r(require('../pages/order/pay')), 'pay')
        },
        {
            path: '/paysuccess',
            name: 'paysuccess',
            component:  r => require.ensure([], () => r(require('../pages/order/paysuccess')), 'paysuccess')
        },
        {
            path: '/orderdetail',
            name: 'orderdetail',
            component:  r => require.ensure([], () => r(require('../pages/order/orderdetail')), 'orderdetail')
        },
        {
            path: '/ship',
            name: 'ship',
            component:  r => require.ensure([], () => r(require('../pages/order/ship')), 'ship')
        }
        
    ]
});
