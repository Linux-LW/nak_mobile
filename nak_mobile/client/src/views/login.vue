<template>
  <div class="login">
    <div class="userlog">
      <mt-header title="用户登录">
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
    <div class="logincontent">
      <mt-field label="用户名*:" placeholder="请输入用户名" v-model="username"></mt-field>
      <mt-field label="密码*:" placeholder="请输入密码" type="password" v-model="password"></mt-field>
      <mt-field label="验证码" placeholder="请输入验证码"></mt-field>
      <mt-button type="primary" size="large" @click.native="login">立即登录</mt-button>
      <p class="take">
        <span>忘记密码</span>
        <span @click="toRegist">免费注册</span>
      </p>
    </div>
  </div>
</template>

<script>
import { Header, Button, Field } from "mint-ui";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      tap: false,
      tapcount: 0,
      username: "",
      password: "",
    };
  },
  methods: {
    ...mapActions(["submit"]),
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
    myLogin() {
      this.submit({
        username: this.username,
        password: this.password,
      }).then(() => {
        //登陆之后把用户名保存在本地存储以及本地缓存
        localStorage.setItem("uname", this.username);
        sessionStorage.setItem("uname", this.username);
        localStorage.setItem("upwd", this.password);
        sessionStorage.setItem("upwd", this.password);
        localStorage.setItem("uid", this.id);
      });
    },
    login() {
      if (this.username == "" || this.password == "") {
        alert(`请输入账号或密码`);
      } else {
        this.myLogin();
      }
    },
    toRegist() {
      this.$router.push("/regist");
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
.take {
  text-align: end;
  font-size: 0.875rem;
  margin-top: 0.625rem;
  color: #555555;
}
.take > span:last-child {
  margin-left: 0.625rem;
}
.logincontent {
  width: 100%;
  box-sizing: border-box;
  padding: 0 0.5rem 0 0.5rem;
}
.mint-button {
  margin-top: 0.625rem;
}
.login {
  height: 100vh;
  background-color: #f7f7f7;
}
.mint-field {
  border: 1px solid #e3e3e3;
  margin-top: 0.625rem;
}
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