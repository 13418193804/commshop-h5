// export const getCount = state => {
//     return state.count
// }

// export const getBallOrderList = state => {
//     return state.ballOrderList;
// }
// export const getMerchant = state => {
//     let storage = window.localStorage;
//     if ((storage.merchantInfo || '') != '') {
//         state.merchantInfo = JSON.parse(storage.merchantInfo)
//         return state.merchantInfo;
//     } else {
//         return state.merchantInfo;
//     }

// }

// export const getLoginStatus = state => {
//     let storage = window.localStorage;
//     if ((storage.LoginStatus || '') != '') {
//         state.LoginStatus = JSON.parse(storage.LoginStatus)
//         return state.LoginStatus;
//     } else {
//         return state.LoginStatus;
//     }

// }

import { MutationTreeType } from './mutation-types';

export default {

    [MutationTreeType.USER_NAME](state) {
        return state.userName;
    },
    [MutationTreeType.TAB_INDEX](state) {
        return state.tabIndex;
    },
    [MutationTreeType.TOKEN_INFO](state) {
        if ((localStorage[MutationTreeType.TOKEN_INFO] || '') !== '') {
            state.tokenInfo = JSON.parse(localStorage[MutationTreeType.TOKEN_INFO]);
            return state.tokenInfo;
        } else {
            return state.tokenInfo;
        }
    },
    [MutationTreeType.VERCODE](state) {
        return state.codeObj;
    },

    [MutationTreeType.ADDRESS_ITEM](state) {
        return state.addressItem;
    },
    [MutationTreeType.PREPAREID](state) {
        return state.prepareId;
    },
    [MutationTreeType.PREPAREID](state) {
        return state.prepareId;
    },
    [MutationTreeType.SYSTEM](state) {
        return state.labelActive;
    }
};
