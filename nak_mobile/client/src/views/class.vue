<template>
  <div class="class">
    <mt-header title="所有分类">
      <router-link to="/" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
      <mt-button icon="search" slot="right" @click="goto"></mt-button>
    </mt-header>

    <!-- 中间内容部分 -->
    <div class="panl">
      <mt-tab-container>
        <mt-tab-container-item>
          <ul class="type">
            <li v-for="(item,key) in type" :key="key" @click="toProList(item.ptype)">{{item.ptype}}</li>
          </ul>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
  </div>
</template>
<style scoped>
.type > li + li {
  border-top: 0;
}
.type > li {
  box-sizing: border-box;
  padding: 0.625rem 0px 0.625rem 0.9375rem;
  border: 1px solid lightgray;
  font-size: 1.25rem;
  color: gray;
}
.mint-header {
  background-color: #f7f7f7;
  color: #555555;
  font-size: 1em;
}
</style>

<script>
export default {
  data() {
    return {
      type: [],
    };
  },
  methods: {
    toProList(ptype) {
      this.$router.push(`/products/${ptype}`);
    },
    goto() {
      this.$router.push("/search");
    },
  },
  created() {
    this.axios.get("pro/diffrent").then((res) => {
      this.type = res.data;
    });
  },
};
</script>