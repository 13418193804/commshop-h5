<template>
  <div class="tab-contents" style="background-color:#f8f8f8;height:-webkit-fill-available;">
    <comhead ref="comhead" isLeftIcon="icon-zuo" leftIconName="angle-left" @leftClick="false"  title="地址列表" isRightIcon="true"  ></comhead>


<van-address-list
  v-model="chosenAddressId"
  :list="addressList"
  @add="onAdd"
  @edit="onEdit"
  @select="selectDefault"
/>



  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import mixin from "../../config/mixin";
import { Action } from "vuex-class";
import { Toast } from "vant";
// import { recommendList } from '../../service/getData';
import comhead from "../../components/Comhead.vue";

@Component({
  components: {
    comhead
  },
  mixins: [mixin]
})
export default class AddressList extends Vue {
  @Action("setAddressItem") setAddressItem;

  chosenAddressId = [];
  addressList = [];
  selectDefault(params) {
    Vue.prototype.$reqFormPost(
      "/prepare/order/update",
      {
        userId: this.$store.getters[Vue.prototype.MutationTreeType.TOKEN_INFO]
          .userId,
        token: this.$store.getters[Vue.prototype.MutationTreeType.TOKEN_INFO]
          .token,
          prepareId:this.$store.getters[Vue.prototype.MutationTreeType.PREPAREID],
        addressId: params.addressId
      },
      res => {
        if (res == null) {
          console.log("网络请求错误！");
          return;
        }
        if (res.data.status != 200) {
          console.log(
            "需控制错误码" + res.data.status + ",错误信息：" + res.data.message
          );
          return;
        }
        this.$router.go(-1);
      }
    );
  }

  getDefault() {
    Vue.prototype.$reqFormPost(
      "/address/defaultaddress",
      {
        userId: this.$store.getters[Vue.prototype.MutationTreeType.TOKEN_INFO]
          .userId,
        token: this.$store.getters[Vue.prototype.MutationTreeType.TOKEN_INFO]
          .token
      },
      res => {
        if (res == null) {
          console.log("网络请求错误！");
          return;
        }
        if (res.data.status != 200) {
          console.log(
            "需控制错误码" + res.data.status + ",错误信息：" + res.data.message
          );
          return;
        }
        if (!res.data.data.addressId && this.addressList.length > 0) {
          this.selectDefault(this.addressList[0]);
          return;
        }
        this.chosenAddressId = res.data.data.addressId;
      }
    );
  }

  onAdd() {
    this.$router.push({
      name: "address",
      query: {
        addressModel: "add"
      }
    });
  }
  onEdit(item, index) {
    this.setAddressItem(this.addressList[index]);
    this.$router.push({
      name: "address",
      query: {
        addressModel: "edit"
      }
    });
  }
  getAddressList() {
    Vue.prototype.$reqFormPost(
      "/address/list",
      {
        userId: this.$store.getters[Vue.prototype.MutationTreeType.TOKEN_INFO]
          .userId,
        token: this.$store.getters[Vue.prototype.MutationTreeType.TOKEN_INFO]
          .token
      },
      res => {
        if (res == null) {
          console.log("网络请求错误！");
          return;
        }
        if (res.data.status != 200) {
          console.log(
            "需控制错误码" + res.data.status + ",错误信息：" + res.data.message
          );
          return;
        }
        console.log("地址列表", res.data.data.addressList);
        this.addressList = res.data.data.addressList;
        this.addressList.forEach((item, index) => {
          item["id"] = item.addressId;
          item["name"] = item.contactname;
          item["tel"] = item.contactmobile;
          item["readdress"] = item.address;
          item["address"] =
            item.province + item.city + item.country + item.address;
        });
        this.getDefault();
      }
    );
  }

  mounted() {
    console.log("list mount");

    this.getAddressList();
  }
}
</script>

<style lang="scss" scoped>
@import "../../style/utils.scss";
.bodyLabel {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>


