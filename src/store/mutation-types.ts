

export const MutationTreeType = {
    USER_NAME: 'USER_NAME',
    TAB_INDEX: 'set_tab_index_Missing_Long_Store',//下标
    TOKEN_INFO: 'set_token_info',//用户登录信息
    VERCODE: "VERCODE",//验证码时间
    ADDRESS_ITEM: "address_item",//验证码时间
    PREPAREID: "PREPAREID",//验证码时间
    SYSTEM: "SYSTEM",//验证码时间
    labelActive: "labelActive",//验证码时间
    

}
export default {
    install(Vue) {
        Vue.prototype.MutationTreeType = MutationTreeType
    }

}