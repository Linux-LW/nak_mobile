<template>
  <div class="product">
    <div class="navbar">
      <div class="nav">
        <ul>
          <li>
            <router-link to="/">
              <img src="../assets/proIcons/home.png" />
              <br />首页
            </router-link>
          </li>
          <li>
            <router-link to="/class">
              <img src="../assets/proIcons/menu.png" />
              <br />分类
            </router-link>
          </li>
          <li>
            <router-link to="/search">
              <img src="../assets/proIcons/search.png" />
              <br />搜索
            </router-link>
          </li>
          <li @click="toCart">
            <img src="../assets/proIcons/cart.png" />
            <br />购物车
          </li>
          <li @click="toMine">
            <img src="../assets/proIcons/self.png" />
            <br />个人中心
          </li>
        </ul>
      </div>
      <div class="sort">
        <ul>
          <li>默认</li>
          <li @click="ascBy" data-flag="1" :class="{active:isChecked1}">
            价格
            <img src="../assets/proIcons/up.png" alt />
          </li>
          <li @click="ascBy" data-flag="2" :class="{active:isChecked2}">
            人气
            <img src="../assets/proIcons/up.png" alt />
          </li>
          <li @click="ascBy" data-flag="3" :class="{active:isChecked3}">
            时间
            <img src="../assets/proIcons/up.png" alt />
          </li>
        </ul>
      </div>
    </div>
    <table></table>
    <div class="panl">
      <ul>
        <li v-for="(i,k) in proData" :key="k">
          <div class="pro_img" @click="toDetails(i.id)">
            <img v-lazy="i.purl" />
          </div>
          <div class="pro_info">
            <p class="pname" @click="toDetails(i.id)">{{i.pname}}</p>
            <br />
            <p>
              <font style="font-size:14px">价格：</font>
              <span style="font-size:14px; color:orange">￥{{i.pprice.toFixed(2)}}元</span>
            </p>
            <div>
              <span style="font-size:12px;color:gray">❤ 0人喜欢</span>
              <div style="color:orange">销量{{i.sellCount}}</div>
            </div>
          </div>
        </li>
        <li style="display:flex; justify-content:center">已显示全部</li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.active {
  color: red;
}
.pro_info > p + div > div {
  float: right;
  margin-right: 0.625rem;
  font-size: 0.75rem;
}
.pro_info {
  margin-left: 0.625rem;
  width: 80%;
}
@media (max-width: 1200px) {
  .pro_img {
    width: 15%;
    height: 7.5rem;
  }
}
@media (max-width: 760px) {
  .pro_img {
    width: 15%;
    height: 7.5rem;
  }
}
@media (max-width: 576px) {
  .pro_img {
    width: 30%;
    height: 6.125rem;
  }
}
.pro_img > img {
  width: 100%;
}
.panl > ul > li + li {
  border-top: 0;
}
.panl > ul > li {
  box-sizing: border-box;
  padding: 0.625rem;
  display: flex;
  border: 0.5px solid #e5e5e5;
}
.panl {
  margin-top: 6.25rem;
  height: 6.25rem;
}
.sort > ul {
  display: flex;
  background-color: #fff;
}
.sort > ul > li > img {
  vertical-align: middle;
}
.sort > ul > li {
  flex: 25;
  border: 0.5px solid #e3e3e3;
  text-align: center;
  box-sizing: border-box;
  padding: 0.625rem 0 0.625rem 0;
}
.sort > ul > li + li {
  border-left: 0;
}
.navbar {
  position: fixed;
  width: 100%;
}
.navbar > .nav {
  height: 3.5625rem;
  box-sizing: border-box;
  background-color: #5babe6;
}
.nav > ul > li {
  color: white;
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
  color: white;
  text-decoration: none;
}
</style>
<script>
export default {
  props: ["ptype"],
  data() {
    return {
      page: 1,
      proData: [],
      isChecked1: false,
      isChecked2: false,
      isChecked3: false,
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
    toDetails(id) {
      this.$router.push(`/details/${id}`);
    },
    load() {
      this.axios
        .get(`pro/search?ptype=${this.ptype}&page=${this.page}`)
        .then((res) => {
          this.proData = res.data.result;
          this.pageCount = res.data.pageCount;
        });
    },
    ascBy(e) {
      //使用自定义属性传参，将每一个排序的方式用标识区分，传入服务器识别
      let kw = e.target.dataset.flag;
      this.axios.get(`pro/ascBy?ptype=${this.ptype}&kw=${kw}`).then((res) => {
        this.proData = res.data;
        if (kw == 1) {
          this.isChecked2 = false;
          this.isChecked3 = false;
          this.isChecked1 = true;
        } else if (kw == 2) {
          this.isChecked1 = false;
          this.isChecked3 = false;
          this.isChecked2 = true;
        } else {
          this.isChecked1 = false;
          this.isChecked2 = false;
          this.isChecked3 = true;
        }
      });
    },
  },
  created() {
    this.load();
  },
};
</script>