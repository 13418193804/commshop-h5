import Vue from 'vue';
import Vuex from 'vuex';
import mutations from './mutations';
import actions from './action';
import getters from './getters'

Vue.use(Vuex);

const state = {
    isShowPlayer: false, // 是否显示 player
    song: {}, // 歌的信息
    artist: '', // 歌的作者
    isPlay: false, // 是否播放
    userName: "userName",
    tabIndex: 1,
    tokenInfo: {
        userId: "",
        token: ""
    },
    codeObj: 60,
    addressItem: {

    },
    prepareId: "",
    labelActive:{
        availWidth: window.screen.availWidth,
        availHeight: window.screen.availHeight
    }


};
export default new Vuex.Store({
    state,
    actions,
    getters,
    mutations
});
