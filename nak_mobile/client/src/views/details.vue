<template>
  <div class="details">
    <div class="detailshead">
      <mt-header title="商品详情">
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
    <div class="canner">
      <mt-swipe :auto="4000">
        <mt-swipe-item v-for="(i,k) in small" :key="k">
          <img id="img" :src="small[k]" alt />
        </mt-swipe-item>
      </mt-swipe>
    </div>
    <div class="content">
      <div class="goods">
        <span>
          <span class="name">{{pname}}</span>
          <span class="care">
            <img src="../assets/icons/care.png" alt />
            <p>收藏</p>
          </span>
        </span>
      </div>
      <p>货号：{{pnumber}}</p>
      <p>销量：{{sellCount}}件</p>
      <p>店铺价：{{price}}元</p>
      <p>库存：{{isHas?'有货':'暂无'}}</p>
    </div>
    <div class="addCount">
      <div>
        <span>购买数量:</span>
        <button @click="minus">-</button>
        <input type="text" v-model="addCount" />
        <button @click="add">+</button>
      </div>
      <mt-button type="primary" size="large" @click.native="collect">加入购物车</mt-button>
      <div class="bottomnav">
        <ul class="btn-title">
          <li @click="check" data-check="1" :class="{active:intro1}">商品描述</li>
          <li @click="check" data-check="2" :class="{active:intro2}">商品评价</li>
          <li @click="check" data-check="3" :class="{active:intro3}">商品咨询</li>
        </ul>
      </div>
      <!-- 商品描述的大图 -->
      <div class="info1 hide" :class="{appear:intro1}">
        <img :src="pdetails" alt />
      </div>
      <!-- 商品评价的div -->
      <div class="hide" :class="{appear:intro2}">
        <span style="font-size:15px">该商品暂无评价!</span>
      </div>
      <!-- 商品咨询的div -->
      <div class="hide" :class="{appear:intro3}">
        <textarea
          id
          style="width:100%"
          cols="40"
          rows="10"
          placeholder="您有任何问题，可以通过这里向卖家咨询"
          class="desc"
        ></textarea>
        <button
          style="width:100%; height:40px; color:white; font-size:18px; background-color:#26a2ff;margin-bottom:50px;margin-top:10px;border-radius:5px"
        >提交咨询</button>
      </div>
    </div>
  </div>
</template>

<script>
import { Header, Swipe, SwipeItem, Button } from "mint-ui";
export default {
  props: ["id"],
  data() {
    return {
      addCount: 1,
      detailList: [],
      ptype: "",
      pname: "",
      purl: "",
      pdetails: "",
      pnumber: "",
      pid: "",
      price: "",
      small: "",
      sellCount: "",
      isHas: true,
      intro1: true,
      intro2: false,
      intro3: false,
      tap: false,
      tapcount: 0,
    };
  },
  methods: {
    minus() {
      if (this.addCount > 1) {
        this.addCount--;
      }
    },
    add() {
      this.addCount++;
    },
    collect() {
      let goodInfo = {
        pid: this.pid,
        purl: this.purl,
        pname: this.pname,
        price: this.price,
        addCount: this.addCount,
      };
      this.$store.commit("addToCart", goodInfo);
      let message = "您需要现在去结算吗？";
      if (confirm(message)) {
        this.$router.push("/cart");
      }
    },
    toMine() {
      this.$router.push("/self");
    },
    toCart() {
      this.$router.push("/cart");
    },
    show() {
      this.tapcount++;
      // console.log(this.tapcount)
      if (this.tapcount % 2 == 0) {
        this.tap = false;
      } else {
        this.tap = true;
      }
    },
    check(e) {
      let mark = e.target.dataset.check;
      console.log(mark);
      //? 如果点击的是1== 商品详情，就让此标题变色，并且其他两个标题失去颜色
      if (mark == 1) {
        this.intro2 = false;
        this.intro3 = false;
        this.intro1 = true;
      } else if (mark == 2) {
        this.intro3 = false;
        this.intro1 = false;
        this.intro2 = true;
      } else {
        this.intro2 = false;
        this.intro1 = false;
        this.intro3 = true;
      }
    },
    goback() {
      this.$router.go(-1);
    },
  },
  created() {
    this.id = this.$route.params.id;
    this.axios
      .get("/de/details", {
        params: {
          id: this.id,
        },
      })
      .then((res) => {
        this.detailList = res.data;
        // console.log(this.detailList)
        //获取商品的类型
        this.ptype = this.detailList[0].ptype;
        //获取商品的id
        this.pid = this.detailList[0].id;
        //获取商品的编号
        this.pnumber = this.detailList[0].pnumber;
        //获取商品的路径
        this.purl = this.detailList[0].purl;
        //获取商品的价格
        this.price = this.detailList[0].pprice;
        //获取商品的名字
        this.pname = this.detailList[0].pname;
        //获取商品的详情大图
        this.pdetails = this.detailList[0].pdetails;
        //得到小图的数组信息
        this.smallPic = this.detailList[0].smallPic;
        this.sellCount = this.detailList[0].sellCount;
        //将得到的字符串用 | 切割成数组
        this.small = this.smallPic.split("|");

        //如果当前库存的状态，如果不等于0，那就是有货，返回true
        if (this.detailList[0].pishas != 0) {
          this.isHas = true;
        } else {
          //否则 返回false
          this.isHas = false;
        }
      });
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
.nav > ul > li {
  color: #949494;
}
.nav > ul > li > a {
  color: #949494;
  text-decoration: none;
}
.hide > span {
  padding: 0.625rem 0 3.125rem 0.625rem;
}
.btn-title {
  border-top: 1px solid #e3e3e3;
  border-bottom: 1px solid #e3e3e3;
  margin-top: 0.625rem;
  margin-bottom: 0.625rem;
}
.hide {
  display: none;
}
.appear {
  display: block;
}
.active {
  color: red;
}
.desc {
  box-sizing: border-box;
  margin-top: 1.25rem;
}
.info1 > img {
  width: 100%;
}
.canner #img {
  width: 100%;
}
.bottomnav > ul > li {
  border-left: 1px solid #e3e3e3;
  flex: 33;
  text-align: center;
  padding: 0.625rem 0 0.625rem 0;
}
.bottomnav > ul {
  display: flex;
}
.addCount > div > span {
  color: #555;
}
.addCount > div > input {
  width: 4.625rem;
  height: 2rem;
  box-sizing: border-box;
  padding-left: 1.875rem;
  border: 1px solid #eee;
}
.addCount > div > button {
  width: 2rem;
  height: 2rem;
  border: 0;
}
.addCount > div:first-child {
  border-top: 1px solid #e3e3e3;
  padding: 0.625rem;
}
.addCount {
  box-sizing: border-box;
}
.content > p:nth-child(3) {
  text-align: end;
}
.content > p {
  font-size: 0.875rem;
  margin-top: 0.625rem;
}
.care > p {
  color: #555;
  font-size: 0.75rem;
}
.care {
  float: left;
  width: 18%;
  height: 2.5rem;
  box-sizing: border-box;
  padding-left: 1.25rem;

  border-left: 1px solid #e5e5e5;
}
.content {
  box-sizing: border-box;
  padding-left: 0.9375rem;
  padding-bottom: 0.9375rem;
  border-bottom: 1px solid #e3e3e3;
  border-top: 1px solid #e3e3e3;
}
.goods > span > .name {
  width: 80%;
  font-size: 1.25rem;
  color: #555555;
  float: left;
}
.goods {
  margin-top: 0.625rem;
  width: 100%;
  height: 2.6875rem;
  box-sizing: border-box;
}
.canner {
  box-sizing: border-box;
  padding: 0.625rem;
}
.mint-swipe {
  height: 22.4375rem;
}
</style>