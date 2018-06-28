import axios from 'axios';
import Vue from 'vue';
import { Toast } from "vant";
import { MutationTreeType } from '../store/mutation-types';

const bizUrl = "http://sr.cncloud.com/qichang";
// const bizUrl = "https://m.yourhr.com.cn/zhongyi";

//this.axios.post("http://119.23.44.223:8080/game/ssq/bet?token=3883e10d01054a6996e9b601dc4d368f&userid=cyl45dbcb75d39b4e47aaccf77d1bde22ef",

const querystring = require('querystring');



export function json2Query(json) {
    let str = [];
    for (var p in json) {
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(json[p]));
    }
    return str.join("&");
}

export const reqOrderId = () => {
    return "orderid";
};


export const reqFormUpload = (url, form, callBack) => {
    axios.post(bizUrl + url, form, {
        method: 'post',
        headers: { 'Content-Type': 'multipart/form-data' }
    })
        .then(res => {
            callBack(res);

            if (res == null || res.data == null) {
                console.error('网络请求失败');
                callBack(null);
                return;
            }
        }
        )
        .catch(error => {
            console.log(error);
        });
};

export const reqFormPost = (url, data, callBack, headers) => {
    if (!headers) {
        headers = {
            "Content-Type": "application/x-www-form-urlencoded"
        }
        data = querystring.encode(data);
    }
    axios.post(bizUrl + url, data,
        {
            headers: headers
        })
        .then(res => {
            if (res.data.status == 400 && res.data.message == "账号已在其他设备登录") {
                Toast(res.data.message);
                window['myvue'].$store.commit(MutationTreeType.TOKEN_INFO, {
                    userId: "",
                    token: ""
                })
                localStorage.removeItem(MutationTreeType.TOKEN_INFO);
                // window['myvue'].$router.push({ name: 'login' });
                return;
            }
            callBack(res);

            if (res == null || res.data == null) {
                console.error('网络请求失败');
                callBack(null);
                return;
            }
        }
        )
        .catch(error => {
            Toast(error.toString())
        });
};

export const reqUrlGet = (url, data, callBack) => {
    axios.get(bizUrl + url + '?' + querystring.encode(data))
        .then(res => {
            if (res.data.status == 400 && res.data.message == "账号已在其他设备登录") {
                Toast(res.data.message);

                // window['myvue'].$store.commit(MutationTreeType.TOKEN_INFO, {
                //     userId: "",
                //     token: ""
                // })
                localStorage.removeItem(MutationTreeType.TOKEN_INFO);

                if (window.confirm('账号已在其他设备登录,是否重新登录?')) {
                    window['myvue'].$router.push({ name: 'login' });
                    return true;
                }
                return;
            }
            callBack(res);
            if (res == null || res.data == null) {
                console.error('网络请求失败');
                callBack(null);
                return;
            }
        }
        )
        .catch(error => error);

};

export const confirmLogin = (obj: any) => {

    if ((window['myvue'].$store.getters[MutationTreeType.TOKEN_INFO].userId || '') == '' || (window['myvue'].$store.getters[MutationTreeType.TOKEN_INFO].token || '') == '') {
        obj = { name: 'login' };
    }
    window['myvue'].$router.push(obj);

};
export default {
    install(Vue) {
        Vue.prototype.$reqUrlGet = reqUrlGet
        Vue.prototype.$reqFormPost = reqFormPost
        Vue.prototype.$confirmLogin = confirmLogin
        Vue.prototype.$reqFormUpload = reqFormUpload
    }
    // reqUrlGet:reqUrlGet,
    // reqFormPost:reqFormPost,
    // reqFormUpload:reqFormUpload
}
