<template>
  <div>
    <div class="userlog">
      <mt-header title="添加收货地址">
        <router-link to slot="left">
          <mt-button icon="back" @click="goback">返回</mt-button>
        </router-link>
        <mt-button icon="more" slot="right" @click.native="show"></mt-button>
      </mt-header>
    </div>
    <div class="nav" :class="{show:tap}">
      <ul>
        <li>
          <router-link to="/">
            <img src="../assets/detailIcons/home.png" />
            <br />首页
          </router-link>
        </li>
        <li>
          <router-link to="/class">
            <img src="../assets/detailIcons/menu.png" />
            <br />分类
          </router-link>
        </li>
        <li>
          <router-link to="/search">
            <img src="../assets/detailIcons/search.png" />
            <br />搜索
          </router-link>
        </li>
        <li @click="toCart">
          <img src="../assets/detailIcons/cart.png" />
          <br />购物车
        </li>
        <li @click="toMine">
          <img src="../assets/detailIcons/self.png" />
          <br />个人中心
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tap: false,
      tapcount: 0,
    };
  },
  methods: {
    toMine() {
      if (this.$store.state.uname != "") {
        //这里如果用户已经登录，就可以访问个人中心页面
        this.$router.push("/self");
      } else {
        this.$router.push("/login");
      }
    },
    toCart() {
      if (this.$store.state.uname != "") {
        //这里如果用户已经登录，就可以访问购物车页面
        this.$router.push("/cart");
      } else {
        this.$router.push("/login");
      }
    },
    goback() {
      this.$router.go(-1);
    },
    show() {
      this.tapcount++;
      console.log(this.tapcount);
      if (this.tapcount % 2 == 0) {
        this.tap = false;
      } else {
        this.tap = true;
      }
    },
  },
};
</script>

<style scoped>
.mint-header {
  height: 3.1875rem;
  font-size: 1.125rem;
}
.show {
  height: 3.75rem !important;
}
.nav {
  height: 0;
  overflow: hidden;
  background-color: white;
  border-bottom: 0.5px solid #e3e3e3;
}
.nav > ul {
  width: 100%;
  display: flex;
  box-sizing: border-box;
  padding: 0.3125rem 0 0.625rem 0;
}
.nav > ul > li {
  justify-content: space-around;
  flex: 20;
  text-align: center;
}
.nav > ul > li > a {
  color: #949494;
  text-decoration: none;
}
.nav > ul > li {
  color: #949494;
}
</style>