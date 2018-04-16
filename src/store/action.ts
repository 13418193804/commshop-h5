import {MutationTreeType} from './mutation-types';

import { ActionTree, Action } from 'vuex';

const setUserName: Action<any, any> = ({ commit }, userName) => {
    commit(MutationTreeType.USER_NAME, userName);
};

const setTabIndex: Action<any, any> = ({ commit }, tabIndex) => {
    commit(MutationTreeType.TAB_INDEX, tabIndex);
};

const setTokenInfo: Action<any, any> = ({ commit }, tokenInfo) => {
    commit(MutationTreeType.TOKEN_INFO, tokenInfo);
};

const setLoginVerifyCode: Action<any, any> = ({ commit }, obj) => {
    commit(MutationTreeType.VERCODE, obj);
};

const setAddressItem: Action<any, any> = ({ commit }, obj) => {
    commit(MutationTreeType.ADDRESS_ITEM, obj);
};

const setPrepareId: Action<any, any> = ({ commit }, obj) => {
    commit(MutationTreeType.PREPAREID, obj);
};


// get 对外抛出  @Active 取值
const actions: ActionTree<any, any> = {
    setUserName,
    setTabIndex,
    setTokenInfo,
    setLoginVerifyCode,
    setAddressItem,
    setPrepareId,

};
export default actions;
