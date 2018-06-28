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
                    component: index,
                    meta: {
                        keepAlive: false // 不需要被缓存
                    }
                },
                {
                    path: '/category',
                    component: r => require.ensure([], () => r(require('../pages/index/category')), 'category')
                    ,
                    meta: {
                        keepAlive: false // 不需要被缓存
                    }
                },
                {
                    path: '/cart',
                    name: 'cart',
                    component: r => require.ensure([], () => r(require('../pages/index/Cart')), 'cart')
                    ,
                    meta: {
                        keepAlive: false // 不需要被缓存
                    }
                },
                {
                    path: '/user',
                    component: r => require.ensure([], () => r(require('../pages/index/User')), 'user')
                    ,
                    meta: {
                        keepAlive: false // 不需要被缓存
                    }
                }
            ]
        },
        {
            path: '/signtext',
            name: 'signtext',
            component: r => require.ensure([], () => r(require('../pages/login/signtext')), 'signtext')
            ,
            meta: {
                keepAlive: false // 不需要被缓存
            }
        },
        {
            path: '/rewardtext',
            name: 'rewardtext',
            component: r => require.ensure([], () => r(require('../pages/reward/rewardtext')), 'rewardtext')
            ,
            meta: {
                keepAlive: false // 不需要被缓存
            }
        },
        {
            path: '/productlist',
            name: 'productlist',
            component: r => require.ensure([], () => r(require('../pages/product/productList')), 'user')
            ,
            meta: {
                keepAlive: false // 不需要被缓存
            }
        },
        {
            path: '/productlist',
            name: 'productlist',
            component: r => require.ensure([], () => r(require('../pages/product/productList')), 'user')
            ,
            meta: {
                keepAlive: false // 不需要被缓存
            }
        },
        {
            path: '/login',
            name: 'login',
            component: r => require.ensure([], () => r(require('../pages/login/login')), 'login')
            ,
            meta: {
                keepAlive: false // 不需要被缓存
            }
        },
        {
            path: '/sign',
            name: 'sign',
            component: r => require.ensure([], () => r(require('../pages/login/sign')), 'user')
            ,
            meta: {
                keepAlive: false // 不需要被缓存
            }
        },
        {
            path: '/productdetail',
            name: 'productdetail',
            component: r => require.ensure([], () => r(require('../pages/product/productDetail')), 'productdetail')
            ,
            meta: {
                keepAlive: false // 不需要被缓存
            }
        },
        {
            path: '/settle',
            name: 'settle',
            component: r => require.ensure([], () => r(require('../pages/order/settle')), 'settle')
            ,
            meta: {
                keepAlive: false // 不需要被缓存
            }
        },
        {
            path: '/addresslist',
            name: 'addresslist',
            component: r => require.ensure([], () => r(require('../pages/address/addresslist')), 'addresslist')
            ,
            meta: {
                keepAlive: false // 不需要被缓存
            }
        },
        {
            path: '/address',
            name: 'address',
            component: r => require.ensure([], () => r(require('../pages/address/address')), 'address')
            ,
            meta: {
                keepAlive: false // 不需要被缓存
            }
        },
        {
            path: '/selectaddress',
            name: 'selectaddress',
            component: r => require.ensure([], () => r(require('../pages/address/selectaddress')), 'selectaddress')
            ,
            meta: {
                keepAlive: false // 不需要被缓存
            }
        },
        {
            path: '/orderlist',
            name: 'orderlist',
            component: r => require.ensure([], () => r(require('../pages/order/orderlist')), 'orderlist')
            ,
            meta: {
                keepAlive: false // 不需要被缓存
            }
        },
        {
            path: '/pay',
            name: 'pay',
            component: r => require.ensure([], () => r(require('../pages/order/pay')), 'pay')
            ,
            meta: {
                keepAlive: false // 不需要被缓存
            }
        },
        {
            path: '/paysuccess',
            name: 'paysuccess',
            component: r => require.ensure([], () => r(require('../pages/order/paysuccess')), 'paysuccess')
            ,
            meta: {
                keepAlive: false // 不需要被缓存
            }
        },
        {
            path: '/orderdetail',
            name: 'orderdetail',
            component: r => require.ensure([], () => r(require('../pages/order/orderdetail')), 'orderdetail')
            ,
            meta: {
                keepAlive: false // 不需要被缓存
            }
        },
        {
            path: '/ship',
            name: 'ship',
            component: r => require.ensure([], () => r(require('../pages/order/ship')), 'ship')
            ,
            meta: {
                keepAlive: false // 不需要被缓存
            }
        },
        {
            path: '/forget',
            name: 'forget',
            component: r => require.ensure([], () => r(require('../pages/login/forget')), 'forget')
            ,
            meta: {
                keepAlive: false // 不需要被缓存
            }
        },
        {
            path: '/refund',
            name: 'refund',
            component: r => require.ensure([], () => r(require('../pages/order/refund')), 'refund')
            ,
            meta: {
                keepAlive: false // 不需要被缓存
            }
        },
        {
            path: '/collection',
            name: 'collection',
            component: r => require.ensure([], () => r(require('../pages/collection/collection')), 'collection')
            ,
            meta: {
                keepAlive: false // 不需要被缓存
            }
        },
        {
            path: '/add_bank_card',
            name: 'add_bank_card',
            component: r => require.ensure([], () => r(require('../pages/bank_card/add_bank_card')), 'add_bank_card')
            ,
            meta: {
                keepAlive: false // 不需要被缓存
            }
        },
        {
            path: '/my_bankcard',
            name: 'my_bankcard',
            component: r => require.ensure([], () => r(require('../pages/bank_card/my_bankcard')), 'my_bankcard')
            ,
            meta: {
                keepAlive: false // 不需要被缓存
            }
        },
        {
            path: '/about_us',
            name: 'about_us',
            component: r => require.ensure([], () => r(require('../pages/setting/about_us')), 'about_us')
            ,
            meta: {
                keepAlive: false // 不需要被缓存
            }
        },
        {
            path: '/essential_information',
            name: 'essential_information',
            component: r => require.ensure([], () => r(require('../pages/setting/essential_information')), 'essential_information')
            ,
            meta: {
                keepAlive: false // 不需要被缓存
            }
        },
        {
            path: '/feedback',
            name: 'feedback',
            component: r => require.ensure([], () => r(require('../pages/setting/feedback')), 'feedback')
            ,
            meta: {
                keepAlive: false // 不需要被缓存
            }
        },
        {
            path: '/update_info',
            name: 'update_info',
            component: r => require.ensure([], () => r(require('../pages/setting/update_info')), 'update_info')
            ,
            meta: {
                keepAlive: false // 不需要被缓存
            }
        },
        {
            path: '/setting',
            name: 'setting',
            component: r => require.ensure([], () => r(require('../pages/setting/setting')), 'setting')
            ,
            meta: {
                keepAlive: false // 不需要被缓存
            }
        },
        {
            path: '/reward',
            name: 'reward',
            component: r => require.ensure([], () => r(require('../pages/reward/reward')), 'reward')
            ,
            meta: {
                keepAlive: false // 不需要被缓存
            }
        },
        {
            path: '/my_member',
            name: 'my_member',
            component: r => require.ensure([], () => r(require('../pages/reward/my_member')), 'my_member')
            ,
            meta: {
                keepAlive: false // 不需要被缓存
            }
        },
        {
            path: '/my_reward',
            name: 'my_reward',
            component: r => require.ensure([], () => r(require('../pages/reward/my_reward')), 'my_reward')
            ,
            meta: {
                keepAlive: false // 不需要被缓存
            }
        },
        {
            path: '/present_record',
            name: 'present_record',
            component: r => require.ensure([], () => r(require('../pages/reward/present_record')), 'present_record')
            ,
            meta: {
                keepAlive: false // 不需要被缓存
            }
        },
        {
            path: '/select_bankcard',
            name: 'select_bankcard',
            component: r => require.ensure([], () => r(require('../pages/reward/select_bankcard')), 'select_bankcard')
            ,
            meta: {
                keepAlive: false // 不需要被缓存
            }
        },
        {
            path: '/coupon',
            name: 'coupon',
            component: r => require.ensure([], () => r(require('../pages/coupon/coupon')), 'coupon')
            ,
            meta: {
                keepAlive: false // 不需要被缓存
            }
        },
        {
            path: '/collar_center',
            name: 'collar_center',
            component: r => require.ensure([], () => r(require('../pages/coupon/collar_center')), 'collar_center')
            ,
            meta: {
                keepAlive: false // 不需要被缓存
            }
        },
        {
            path: '/refundbackgoods',
            name: 'refundbackgoods',
            component: r => require.ensure([], () => r(require('../pages/order/refundBackGoods.vue')))
            ,
            meta: {
                keepAlive: false // 不需要被缓存
            }
        },
        {
            path: '/goodscomment',
            name: 'goodscomment',
            component: r => require.ensure([], () => r(require('../pages/comment/goodscomment.vue')))
            ,
            meta: {
                keepAlive: false // 不需要被缓存
            }
        },
        {
            path: '/invoice',
            name: 'invoice',
            component: r => require.ensure([], () => r(require('../pages/order/invoice.vue')))
            ,
            meta: {
                keepAlive: false // 不需要被缓存
            }
        },
        {
            path: '/messagelist',
            name: 'messagelist',
            component: r => require.ensure([], () => r(require('../pages/index/MessageList.vue')))
            ,
            meta: {
                keepAlive: false // 不需要被缓存
            }
        },
        {
            path: '/addcomment',
            name: 'addcomment',
            component: r => require.ensure([], () => r(require('../pages/comment/addcomment.vue')))
            ,
            meta: {
                keepAlive: false // 不需要被缓存
            }
        },
        {
            path: '/filterproduct',
            name: 'filterproduct',
            component: r => require.ensure([], () => r(require('../pages/index/FilterProduct.vue')))
            ,
            meta: {
                keepAlive: true // 需要被缓存
            }
        },
        {
            path: '/share_code',
            name: 'share_code',
            component: r => require.ensure([], () => r(require('../pages/setting/share_code.vue')))
            ,
            meta: {
                keepAlive: false // 不需要被缓存
            }
        },
    ]
}
);
