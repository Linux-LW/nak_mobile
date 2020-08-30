<template>
  <div class="addAddress">
    <MyHeader :title="title"></MyHeader>
    <van-address-edit
      :area-list="areaList"
      show-postal
      show-delete
      show-set-default
      show-search-result
      :search-result="searchResult"
      :area-columns-placeholder="['请选择', '请选择']"
      @save="onSave"
      @delete="onDelete"
      @change-detail="onChangeDetail"
      :columns-num="2"
    />
  </div>
</template>

<script>
import { AddressEdit, Toast, Area, AddressList } from "vant";
import MyHeader from "../components/my-header";
import qs from "qs";
export default {
  data() {
    return {
      areaList: {
        province_list: {
          110000: "北京市",
          120000: "天津市",
          130000: "四川省",
          140000: "湖北省",
          150000: "湖南省",
          160000: "安徽省",
          170000: "广东省",
          180000: "甘肃省",
        },
        city_list: {
          110100: "北京市",
          120100: "天津市",
          130100: "成都市",
          130101: "绵阳市",
          140100: "武汉市",
          150100: "长沙市",
          150100: "株洲市",
          160100: "合肥市",
          170100: "广州市",
          180100: "兰州市",
        },
      },
      searchResult: [],
      title:'添加地址'
    };
  },
  methods: {
    onSave(content) {
      let AddressInfo = {
        Aname: content.name, //获取收货人姓名
        Atel: content.tel, //获取收货人的电话号码
        Aprovince: content.province, //获取收货人的省份
        Acity: content.city,
        addressDetail: content.addressDetail, //获取详细地址
        areaCode: content.areaCode,
        postalCode: content.postalCode,
        userId: localStorage.getItem("uid"),
      };
      console.dir(AddressInfo);
      this.axios
        .post(
          "/addr/add",
          qs.stringify({
            Aname: AddressInfo.Aname, //传输收货人姓名
            Atel: AddressInfo.Atel, //传输收货人的电话号码
            Aprovince: AddressInfo.Aprovince, //插传输收货人的省份
            Acity: AddressInfo.Acity,
            addressDetail: AddressInfo.addressDetail, //传输详细地址
            areaCode: AddressInfo.areaCode,
            postalCode: AddressInfo.postalCode,
            userId: AddressInfo.userId,
          }),
          { header: { "Content-Type": "application/x-www-form-urlencoded" } }
        )
        .then((res) => {
          // console.log(res)
          if (res.data != 0) {
            //如果插入数据成功，那么返回1并显示保存成功
            Toast("保存成功");
            this.$router.push("/position");
          }
        });
    },
    onDelete() {
      Toast("delete");
    },
    onChangeDetail(val) {
      this.searchResult = [];
    },
  },
  components: {
    MyHeader
  },
};
</script>
