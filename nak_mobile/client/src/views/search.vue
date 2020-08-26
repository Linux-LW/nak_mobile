<template>
  <div class="search">
    <div class="searchnav">
      <span class="back" @click="back">&lt;</span>
      <span>搜索</span>
      <span>
        <router-link to="/">&times;</router-link>
      </span>
    </div>
    <div class="searchBox">
      <input type="text" placeholder="请输入关键词！" v-model="keyword" />
      <div @click="search"></div>
    </div>
    <p class="key">热门搜索:</p>
    <ul>
      <li v-for="(i,k) in type" :key="k" @click="toProList(i.ptype)">{{i.ptype}}</li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      type: [],
      keyword: "",
      page: 1,
    };
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    search() {
      this.$router.push(`/products/${this.keyword}`);
    },
    toProList(ptype) {
      this.$router.push(`/products/${ptype}`);
    },
    getType() {
      this.axios.get("pro/diffrent").then((res) => {
        this.type = res.data;
      });
    },
  },
  created() {
    this.getType();
  },
};
</script>
<style scoped>
.key + ul > li {
  margin: 0.625rem 0 0 0.625rem;
  float: left;
  box-sizing: border-box;
  padding: 0.625rem;
  background-color: #fff;
}
.key {
  font-size: 1.125rem;
  font-weight: 600;
  color: #555;
  margin: 0.625rem 0 0 0.625rem;
}
.searchBox > input {
  width: 80%;
  height: 2.5rem;
  margin-left: 0.625rem;
  margin-top: 0.9375rem;
  font-size: 1.25rem;
  box-sizing: border-box;
  padding-left: 1.25rem;
  border: 0;
}
.search {
  background-color: #f7f7f7;
  height: 100vh;
}
.searchBox > div {
  display: inline-block;
  vertical-align: middle;
  background-color: #e6e6e6;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 0.3125rem;
  margin-left: 0.3125rem;
  background-image: url("../assets/icons/search.png");
  background-position: center;
  background-repeat: no-repeat;
}
.searchnav > span:last-child {
  flex: 33%;
  text-align: end;
  box-sizing: border-box;
  padding-right: 1.25rem;
}
.searchnav > span:last-child > a {
  font-size: 1.875rem;
  color: white;
  text-decoration: none;
}
.searchnav > span {
  font-size: 1.3125rem;
  color: white;
}
.searchnav {
  background-color: #5babe6;
  height: 3.1875rem;
  display: flex;
}

.searchnav > span {
  flex: 33%;
  line-height: 3.125rem;
  text-align: center;
}
.searchnav > .back {
  flex: 33%;
  box-sizing: border-box;
  font-size: 1.875rem;
  text-decoration: none;
  color: #e5e5e5;
  font-weight: 600;
  line-height: 3.125rem;
  text-align: start;
  padding-left: 0.625rem;
  cursor: pointer;
}
</style>