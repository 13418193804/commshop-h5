<template>
  <div class="tab-contents" style="background-color:#f8f8f8;height:-webkit-fill-available;">
    <comhead ref="comhead" isLeftIcon="icon-zuo" leftIconName="angle-left" @leftClick="false"  :title="addressModel=='add'?'新增收货地址':'编辑收货地址'" isRightIcon="true"  ></comhead>

<van-address-edit
  :area-list="areaList" 
  :show-delete="addressModel=='edit'"
  :show-set-default="!contents.is_default"
 :address-info="contents"
 :is-saving="isSave"
  @save="onSave"
  @delete="onDelete"
  @change-area="addlist"
/>

  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import mixin from "../../config/mixin";
import { Action } from "vuex-class";
import { Toast, AddressList } from "vant";
// import { recommendList } from '../../service/getData';
import comhead from "../../components/Comhead.vue";
import areaList from "./addressUtils";

@Component({
  components: {
    comhead
  },
  mixins: [mixin]
})
export default class Address  extends Vue  {
  get addressModel() {
    return this.$route.query.addressModel;
  }
get editItem(){
  return this.$store.getters[Vue.prototype.MutationTreeType.ADDRESS_ITEM]
}
// addressModel="add"
  contents = {
    address_detail: "",
    area_code: "",
    city: "",
    county: "",
    is_default: false,
    name: "",
    postal_code: "",
    province: "",
    tel: ""
  };

  areaList = areaList;
  isSave = false;
  searchResult = [];
  getAddressId(provinceName, cityName, countryName) {
    Vue.prototype.$reqFormPost(
      "/address/querycityid",
      {
        provinceName: provinceName,
        cityName: cityName,
        countryName: countryName
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
        this.toolAddress(res.data.data);
      }
    );
  }

  toolAddress(address) {
    this.isSave = true;
    let data = [];
    if (this.addressModel === "add") {
      data = [
        "/address/add",
        {
          userId: this.$store.getters[Vue.prototype.MutationTreeType.TOKEN_INFO]
            .userId,
          token: this.$store.getters[Vue.prototype.MutationTreeType.TOKEN_INFO]
            .token,
          provinceId: address["province"].id,
          cityId: address["city"].id,
          countryId: address["country"].id,
          address: this.contents.address_detail,
          contactName: this.contents.name,
          contactMobile: this.contents.tel,
          isDefault: this.contents.is_default ? 1 : 0
        },

        res => {
          this.isSave = false;

          if (res == null) {
            console.log("网络请求错误！");
            return;
          }
          if (res.data.status != 200) {
            console.log(
              "需控制错误码" +
                res.data.status +
                ",错误信息：" +
                res.data.message
            );
            return;
          }
          Toast("保存成功");
          this.$router.go(-1);
          console.log("添加地址", res.data);
        }
      ];
    } else {
      data = [
        "/address/update",
        {
          userId: this.$store.getters[Vue.prototype.MutationTreeType.TOKEN_INFO]
            .userId,
          token: this.$store.getters[Vue.prototype.MutationTreeType.TOKEN_INFO]
            .token,
          addressId	:  this.contents['addressId']	,
               provinceId: address["province"].id,
          cityId: address["city"].id,
          countryId: address["country"].id,
          address: this.contents.address_detail,
          contactName: this.contents.name,
          contactMobile: this.contents.tel,
          isDefault: this.contents.is_default ? 1 : 0
        },

        res => {
          this.isSave = false;
          if (res == null) {
            console.log("网络请求错误！");
            return;
          }
          if (res.data.status != 200) {
            console.log(
              "需控制错误码" +
                res.data.status +
                ",错误信息：" +
                res.data.message
            );
            return;
          }
          Toast('保存成功')
          this.$router.go(-1);
        }
      ];
    }
    Vue.prototype.$reqFormPost(data[0], data[1], data[2]);
  }
  onSave(contents) {
    this.contents = contents;
    this.getAddressId(contents.province, contents.city, contents.county);
  }
  onDelete() {
   let data = [
        "/address/delete",
        {
          userId: this.$store.getters[Vue.prototype.MutationTreeType.TOKEN_INFO]
            .userId,
          token: this.$store.getters[Vue.prototype.MutationTreeType.TOKEN_INFO]
            .token,
          addressId	:  this.contents['addressId']	
        },

        res => {
          this.isSave = false;
          if (res == null) {
            console.log("网络请求错误！");
            return;
          }
          if (res.data.status != 200) {
            console.log(
              "需控制错误码" +
                res.data.status +
                ",错误信息：" +
                res.data.message
            );
            return;
          }
          Toast('保存成功')
          this.$router.go(-1);
        }
      ];
    Vue.prototype.$reqFormPost(data[0], data[1], data[2]);

  }
  addlist(params) {}
  


  mounted() {
    if (this.$route.query.addressModel == "edit") {
      let area_codeObj = "";
      for (let n in areaList.county_list) {
        if (
          areaList.county_list[n] ===
            this.editItem.country &&
          areaList.city_list[n.substring(0, 4) + "00"] ==
            this.editItem.city
        ) {
          area_codeObj = n;
        }
      }
   
   for(let n in this.editItem){
   this.contents[n] =  this.editItem[n]
   }
      this.contents.address_detail = this.editItem.readdress;
      this.contents.is_default = this.editItem.isdefault;
      this.contents.name = this.editItem.contactname;
      this.contents.tel = this.editItem.contactmobile;
      this.contents.area_code = area_codeObj;
    }else{
       this.contents = {
    address_detail: "",
    area_code: "",
    city: "",
    county: "",
    is_default: false,
    name: "",
    postal_code: "",
    province: "",
    tel: ""
  }
    }

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


