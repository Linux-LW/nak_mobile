<template>
  <div class="index">
    <!-- 头部搜索栏开始 -->
    <div class="index_header">
      <div class="menu" @click="toClass"></div>
      <input type="text" placeholder="简单搜" @focus="toSearch" />
    </div>
    <!-- 头部搜索栏结束 -->
    <!-- 头部导航栏开始 -->
    <div class="navbar">
      <ul>
        <li @click="toClass">
          <img src="../assets/icons/class.png" alt />
          <p>全部分类</p>
        </li>
        <li @click="toOrder">
          <img src="../assets/icons/order.png" alt />
          <p>我的订单</p>
        </li>
        <li @click="toMine">
          <img src="../assets/icons/self.png" alt />
          <p>会员中心</p>
        </li>
        <li @click="toCart">
          <img src="../assets/icons/cart.png" alt />
          <p>购物车</p>
        </li>
      </ul>
    </div>
    <!-- 头部导航结束 -->
    <!-- 内容区域开始 -->
    <div
      class="panl"
      infinite-scroll-distance="30"
      v-infinite-scroll="loop"
      infinite-scroll-disable="stop"
      infinite-scroll-immediate-check="true"
    >
      <mt-tab-container>
        <mt-tab-container-item>
          <div class="indexList" v-for="(i,k) of imgData" :key="k">
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
          </div>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
    <mt-spinner type="fading-circle" :size="60" v-if="page<pageCount"></mt-spinner>
    <div v-else class="bottom">全部加载完成····</div>

    <mt-tabbar fixed>
      <mt-tab-item @click.native="toHome">
        首页
        <img src="../assets/icons/home.png" slot="icon" alt />
      </mt-tab-item>
      <mt-tab-item @click.native="toClass">
        分类
        <img src="../assets/icons/menu.png" slot="icon" alt />
      </mt-tab-item>
      <mt-tab-item @click.native="toSearch">
        搜索
        <img src="../assets/icons/search.png" alt slot="icon" />
      </mt-tab-item>
      <mt-tab-item @click.native="toCart">
        购物车
        <img src="../assets/icons/cart.png" slot="icon" />
      </mt-tab-item>
      <mt-tab-item @click.native="toMine">
        个人中心
        <img src="../assets/icons/self.png" slot="icon" />
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imgData: [],
      stop: false,
      page: 1,
      pageCount: "",
    };
  },
  methods: {
    toOrder() {
      if (this.$store.state.uname != "") {
        this.$router.push("/order");
      } else {
        this.$router.push("/login");
      }
    },
    toDetails(id) {
      this.$router.push(`/details/${id}`);
    },
    toMine() {
      //这里如果用户已经登录，就可以访问个人中心页面
      this.$router.push("/self");
    },
    toCart() {
      this.$router.push("/cart");
    },
    toSearch() {
      this.$router.push("/search");
    },
    toClass() {
      this.$router.push("/class");
    },
    toHome() {
      this.$router.push("/");
    },
    loop() {
      this.stop = true;
      //让参数的page 每点击一次就加1
      this.page++;
      //并且设置 节流
      this.stop = false;
    },
    getData() {
      this.axios.get(`index/index?page=${this.page}`).then((res) => {
        // console.log(res.data)
        this.imgData = res.data.result;
        this.pageCount = res.data.pageCount;
      });
    },
  },
  watch: {
    page() {
      if (this.page < this.pageCount) {
        this.axios.get(`index/index?page=${this.page}`).then((res) => {
          res.data.result.forEach((item) => {
            setTimeout(() => {
              this.imgData.push(item);
            }, 2000);
          });
        });
      }
    },
  },
  created() {
    this.getData();
  },
};
</script>
<style>
.bottom {
  text-align: center;
  margin-bottom: 4.6875rem;
  position: relative;
  color: gray;
  font-size: 0.875rem;
}
.mint-spinner-fading-circle-circle {
  height: 1.25rem;
}
.mint-spinner-fading-circle {
  margin-bottom: 3.125rem;
  left: 50%;
  margin-left: -20px;
}
.pname {
  font-size: 16px;
  color: gray;
}

.mint-tab-item {
  height: 4.5rem;
  box-sizing: border-box;
  padding: 0.9375rem 0 0 0;
}
.mint-tab-item-label {
  font-size: 0.9375rem;
}
.mint-tabbar > .mint-tab-item.is-selected {
  color: #a0a0a0;
  background-color: #fcfcfc;
}
.pro_info > p + div > div {
  float: right;
  margin-right: 0.625rem;
  font-size: 0.75rem;
}
.pro_info {
  margin-left: 10px;
  width: 80%;
}
@media (max-width: 1200px) {
  .indexList > .pro_img {
    width: 15%;
    height: 7.5rem;
  }
}
@media (max-width: 760px) {
  .indexList > .pro_img {
    width: 15%;
    height: 7.5rem;
  }
}
@media (max-width: 576px) {
  .indexList > .pro_img {
    width: 30%;
    height: 6.125rem;
  }
}
.indexList > .pro_img > img {
  width: 100%;
}

.indexList {
  width: 100%;
  box-sizing: border-box;
  padding: 0.5rem;
  display: flex;
}
.indexList + .indexList {
  border-top: 0;
}
.navbar > ul > li > p {
  width: 100%;
  text-align: center;
  margin: 0 auto;
  margin-top: 0.3125rem;
  color: gray;
}
.navbar > ul > li > img {
  width: 3em;
  display: block;
  margin: 0 auto;
}
.navbar > ul {
  display: flex;
  box-sizing: border-box;
  width: 100%;
}
.navbar > ul > li + li {
  border-left: 0;
}
.navbar > ul > li {
  justify-content: space-between;
  box-sizing: border-box;
  padding-top: 0.625rem;
  flex: 20;
  height: 6rem;
  border: 0.0625rem solid #e3e3e3;
  margin-top: 0.125rem;
}
.menu + input {
  margin-left: 0.625rem;
  width: 80%;
  height: 2.5rem;
  border: 0;
  outline: 0;
  box-sizing: border-box;
  padding: 0.125rem 0 0.125rem 1.875rem;
  border-radius: 0.625rem;
  background-image: url("../assets/icons/search.png");
  background-position: 0;
  background-repeat: no-repeat;
}
.menu {
  width: 10vw;
  height: 2.5rem;
  margin-left: 0.625rem;
  background-image: url("../assets/icons/menu.png");
  background-position: 0;
  background-repeat: no-repeat;
  display: inline-block;
  vertical-align: middle;
}
.index_header {
  height: 2.5rem;
  background-color: #f7f7f7;
  padding: 0.625rem 0 0.625rem 0;
}
</style>