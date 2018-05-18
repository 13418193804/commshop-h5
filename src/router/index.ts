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
                    component: r => require.ensure([], () => r(require('../pages/index/category')), 'category')
                },
                {
                    path: '/cart',
                    name: 'cart',
                    component: r => require.ensure([], () => r(require('../pages/index/Cart')), 'cart')
                },
                {
                    path: '/user',
                    component: r => require.ensure([], () => r(require('../pages/index/User')), 'user')
                }
            ]
        },
        {
            path: '/productlist',
            name: 'productlist',
            component: r => require.ensure([], () => r(require('../pages/product/productList')), 'user')
        },
        {
            path: '/login',
            name: 'login',
            component: r => require.ensure([], () => r(require('../pages/login/login')), 'login')
        },
        {
            path: '/sign',
            name: 'sign',
            component: r => require.ensure([], () => r(require('../pages/login/sign')), 'user')
        },
        {
            path: '/productdetail',
            name: 'productdetail',
            component: r => require.ensure([], () => r(require('../pages/product/productDetail')), 'productdetail')
        },
        {
            path: '/settle',
            name: 'settle',
            component: r => require.ensure([], () => r(require('../pages/order/settle')), 'settle')
        },
        {
            path: '/addresslist',
            name: 'addresslist',
            component: r => require.ensure([], () => r(require('../pages/address/addresslist')), 'addresslist')
        },
        {
            path: '/address',
            name: 'address',
            component: r => require.ensure([], () => r(require('../pages/address/address')), 'address')
        },
        {
            path: '/selectaddress',
            name: 'selectaddress',
            component: r => require.ensure([], () => r(require('../pages/address/selectaddress')), 'selectaddress')
        },
        {
            path: '/orderlist',
            name: 'orderlist',
            component: r => require.ensure([], () => r(require('../pages/order/orderlist')), 'orderlist')
        },
        {
            path: '/pay',
            name: 'pay',
            component: r => require.ensure([], () => r(require('../pages/order/pay')), 'pay')
        },
        {
            path: '/paysuccess',
            name: 'paysuccess',
            component: r => require.ensure([], () => r(require('../pages/order/paysuccess')), 'paysuccess')
        },
        {
            path: '/orderdetail',
            name: 'orderdetail',
            component: r => require.ensure([], () => r(require('../pages/order/orderdetail')), 'orderdetail')
        },
        {
            path: '/ship',
            name: 'ship',
            component: r => require.ensure([], () => r(require('../pages/order/ship')), 'ship')
        },
        {
            path: '/forget',
            name: 'forget',
            component: r => require.ensure([], () => r(require('../pages/login/forget')), 'forget')
        },
        {
            path: '/refund',
            name: 'refund',
            component: r => require.ensure([], () => r(require('../pages/order/refund')), 'refund')
        },
        {
            path: '/collection',
            name: 'collection',
            component: r => require.ensure([], () => r(require('../pages/collection/collection')), 'collection')
        },
        {
            path: '/add_bank_card',
            name: 'add_bank_card',
            component: r => require.ensure([], () => r(require('../pages/bank_card/add_bank_card')), 'add_bank_card')
        },
        {
            path: '/my_bankcard',
            name: 'my_bankcard',
            component: r => require.ensure([], () => r(require('../pages/bank_card/my_bankcard')), 'my_bankcard')
        },
        {
            path: '/about_us',
            name: 'about_us',
            component: r => require.ensure([], () => r(require('../pages/setting/about_us')), 'about_us')
        },
        {
            path: '/essential_information',
            name: 'essential_information',
            component: r => require.ensure([], () => r(require('../pages/setting/essential_information')), 'essential_information')
        },
        {
            path: '/feedback',
            name: 'feedback',
            component: r => require.ensure([], () => r(require('../pages/setting/feedback')), 'feedback')
        },
        {
            path: '/update_info',
            name: 'update_info',
            component: r => require.ensure([], () => r(require('../pages/setting/update_info')), 'update_info')
        },
        {
            path: '/setting',
            name: 'setting',
            component: r => require.ensure([], () => r(require('../pages/setting/setting')), 'setting')
        },
        {
            path: '/reward',
            name: 'reward',
            component: r => require.ensure([], () => r(require('../pages/reward/reward')), 'reward')
        },
        {
            path: '/my_member',
            name: 'my_member',
            component: r => require.ensure([], () => r(require('../pages/reward/my_member')), 'my_member')
        },
        {
            path: '/my_reward',
            name: 'my_reward',
            component: r => require.ensure([], () => r(require('../pages/reward/my_reward')), 'my_reward')
        },
        {
            path: '/present_record',
            name: 'present_record',
            component: r => require.ensure([], () => r(require('../pages/reward/present_record')), 'present_record')
        },
        {
            path: '/select_bankcard',
            name: 'select_bankcard',
            component: r => require.ensure([], () => r(require('../pages/reward/select_bankcard')), 'select_bankcard')
        },
        {
            path: '/coupon',
            name: 'coupon',
            component: r => require.ensure([], () => r(require('../pages/coupon/coupon')), 'coupon')
        },
        {
            path: '/collar_center',
            name: 'collar_center',
            component: r => require.ensure([], () => r(require('../pages/coupon/collar_center')), 'collar_center')
        },
        {
            path: '/refundbackgoods',
            name: 'refundbackgoods',
            component: r => require.ensure([], () => r(require('../pages/order/refundBackGoods.vue')))
        },
        {
            path: '/goodscomment',
            name: 'goodscomment',
            component: r => require.ensure([], () => r(require('../pages/comment/goodscomment.vue')))
        },
        {
            path: '/invoice',
            name: 'invoice',
            component: r => require.ensure([], () => r(require('../pages/order/invoice.vue')))
        }
    ]
});
