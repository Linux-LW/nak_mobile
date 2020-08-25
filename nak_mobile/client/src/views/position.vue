<template>
  <div class="position">
    <posited></posited>
    <div v-if="address">
      <div class="addInfo" v-for="(i,k) in addInfo" :key="k">
        <dd>
          {{i.Aname}}
          <span style="color:#e87e04;">{{i.Atel}}</span>
        </dd>
        <dd>{{i.addressDetail}}，{{i.Acity}}，{{i.Aprovince}}</dd>
      </div>
    </div>
    <div class="putNewAddress" @click="addAddr">
      <mt-button type="primary" size="large">新增收货地址+</mt-button>
    </div>
  </div>
</template>

<script>
import posited from "../components/posited";
export default {
  data() {
    return {
      address: true,
      addInfo:[]
    };
  },
  methods: {
    addAddr() {
      this.$router.push("/addAddress");
    },
  },
  components: {
    posited,
  },
  created() {
    this.axios
      .get(`/addr/watch?userId=${localStorage.getItem("uid")}`)
      .then((res) => {
        // console.log(res.data);
        this.addInfo=res.data
      });
  },
};
</script>

<style scoped>
.addInfo {
  color: #575757;
  font-size: 15px;
  box-sizing: border-box;
  padding: 5px 10px;
  border-bottom: 1px solid #e5e5e5;
  border-top: 1px solid #e5e5e5;
  background-color: #fff;
  margin-bottom: 5px;
}
.addInfo>dd:last-child{
  font-size: 12px;
}
.position {
  background-color: #f7f7f7;
  height: 100vh;
}
.putNewAddress {
  box-sizing: border-box;
  padding: 0 5px;
  margin-top: 15px;
}
</style>