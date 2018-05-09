import { MutationTreeType } from './mutation-types';

import { Mutation, MutationTree } from 'vuex';

const mutations: MutationTree<any> = {
    [MutationTreeType.USER_NAME](state, username) {
        state.userName = username;
    },
    [MutationTreeType.TAB_INDEX](state, tabIndex) {
        state.tabIndex = tabIndex;
    },
    [MutationTreeType.TOKEN_INFO](state, tokenInfo) {
        state.tokenInfo = tokenInfo;
    },
    [MutationTreeType.VERCODE](state, codeObj) {
        state.codeObj = codeObj;
    },
    [MutationTreeType.ADDRESS_ITEM](state, addressItem) {
        state.addressItem = addressItem;
    },
    [MutationTreeType.PREPAREID](state, prepareId) {
        state.prepareId = prepareId;
    }
};
export default mutations;
