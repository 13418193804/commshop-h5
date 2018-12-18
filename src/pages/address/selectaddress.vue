<template>
  <div class="tab-contents" style="background-color:#f8f8f8;height:-webkit-fill-available;">
    <comhead ref="comhead" isLeftIcon="icon-zuo" leftIconName="angle-left" @leftClick="false"  title="地址管理" isRightIcon="true"  ></comhead>

    <img src="../../assets/jiange.png" style="width:100%;vertical-align:text-top;"/>


    <div v-for="(item,index) in addressList" :key="index" @click="selectDefault(item)" style="background-color:#ffffff;margin-bottom:15px;">
      <div :style="handlePX('padding', 30)" style="border-bottom:1px solid #efefef;">
        <div class="flex flex-pack-justify">
          <div>收货人：{{item.contactname}}</div>
          <div>{{item.tel}}</div>  
        </div>
        <div :style="handlePX('padding-top', 20)" class="flex">
          <img src="../../assets/image/收货地址.png" :style="handlePX('width', 34)+handlePX('height', 42)"/>
          <div style="padding-left:5px;">{{item.address}}</div>
        </div>
      </div>
      <div :style="handlePX('height', 80)+handlePX('padding-left', 30)+handlePX('padding-right', 30)" class="flex flex-pack-justify flex-align-center">
        <div class="flex">
          <van-radio-group v-model="chosenAddressId" @click.stop="selectDefault1(item)">
            <van-radio :name="item.id">{{chosenAddressId==item.id?'默认地址':'设置默认'}}</van-radio>
          </van-radio-group>
          <!-- <img v-lazy="'1'" :style="handlePX('width', 40)+handlePX('height',40)"/>
          <div>默认地址</div> -->
        </div>
        <div class="flex">
          <div class="flex" @click.stop="onEdit(item,index)">
            <img :src="bianji" :style="handlePX('width', 40)+handlePX('height',40)"/>
            <div style="color:#949494;">编辑</div>
          </div>
          <div class="flex" style="margin-left:10px;" @click.stop="onDelete(item)">
            <img src="../../assets/image/删除.png" :style="handlePX('width', 40)+handlePX('height',40)"/>
            <div style="color:#949494;">删除</div>
          </div>
        </div>
      </div>
    </div>

    
<div v-if="addressList.length==0" class="flex  flex-align-center  flex-pack-center" style="height:100vh; height: 100vh;position: fixed;width: 100%;
    top: 0;
"><div>暂无地址</div></div>
    <div @click="onAdd()" :style="handlePX('line-height', 100)+handlePX('height',100)" style="width:100%;position:fixed;bottom:0;background-color:#fff;text-align:center;border-top:1px solid #dadada;color:#707070;">新增收货地址</div>


<!-- 
<van-address-list
  v-model="chosenAddressId"
  :list="addressList"
  @add="onAdd"
  @edit="onEdit"
  @select="selectDefault"
/> -->



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
    selectDefault1(params) {
    Vue.prototype.$reqFormPost(
      "/address/setdefault",
      {
        userId: this.$store.getters[Vue.prototype.MutationTreeType.TOKEN_INFO]
          .userId,
        token: this.$store.getters[Vue.prototype.MutationTreeType.TOKEN_INFO]
          .token,
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
          Toast(res.data.message);
          return;
        }
        Toast("设置默认地址成功");
        console.log("设置默认地址", res.data.data);
        this.getDefault();
      }
    );
  }

  selectDefault(params) {
    Vue.prototype.$reqFormPost(
      "/prepare/update",
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
          Toast(res.data.message);
          return;
        }
        this.$router.go(-1);
      }
    );
  }

  onDelete(params) {
    console.log(params);
    Vue.prototype.$reqFormPost(
      "/address/delete",
      {
        userId: this.$store.getters[Vue.prototype.MutationTreeType.TOKEN_INFO]
          .userId,
        token: this.$store.getters[Vue.prototype.MutationTreeType.TOKEN_INFO]
          .token,
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
          Toast(res.data.message);
          return;
        }
        Toast("删除地址成功");
        console.log("删除地址", res.data.data);
        this.getAddressList();
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
          Toast(res.data.message);
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
  bianji = require('../../assets/image/编辑.png');

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
          Toast(res.data.message);
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

  handlePX(CssName, PxNumber) {
    return CssName +":" +this.$store.getters[Vue.prototype.MutationTreeType.SYSTEM].availWidth /750 * PxNumber +"px;";
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
<style>

</style>


