    //  VueX 
    // commit :  配合 @Action + this.setUserName('11')
    // console.log :   console.log(this.$store.getters[Vue.prototype.MutationTreeType.USER_NAME])
    // pageShow : {{$store.getters[MutationTreeType.USER_NAME]}}


    // Promiss
    //   Vue.prototype.$reqFormPost(
    //   "address/querycity",
    //   {
    //     provinceId: 2
    //   },
    //   res => {
    //     if (res == null) {
    //       console.log("网络请求错误！");
    //       return;
    //     }
    //     if (res.data.status != 200) {
    //       console.log("需控制错误码"+res.data.status+",错误信息："+res.data.message);
    //       return;
    //     }
    //     console.log(res);
    //   }
    // );