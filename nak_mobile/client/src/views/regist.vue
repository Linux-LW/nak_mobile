<template>
  <div class="regist">
    <div class="userlog">
      <mt-header title="用户注册">
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
    <!-- 输入框开始内容 -->
    <div class="registform">
      <mt-field label="用户名*：" placeholder="请输入用户名" v-model="username"></mt-field>
      <mt-field label="密码*：" placeholder="请输入登录密码" type="password" v-model="password"></mt-field>
      <mt-field label="密码*：" placeholder="请输入确认密码" type="password" v-model="repassword"></mt-field>
      <mt-field label="邮箱*：" placeholder="请输入电子邮箱" type="email" v-model="email"></mt-field>
      <mt-field label="验证码*：" placeholder="请输入验证码"></mt-field>
      <dd>
        <input type="checkbox" @click="checked" :checked="ischeck" class="agree" /> 我已看过并接受《
        <span style="color:blue">用户协议</span>》
      </dd>
      <mt-button type="primary" size="large" @click.native="regist">同意注册</mt-button>
    </div>
  </div>
</template>

<script>
import { Header, Button, Field, Toast } from "mint-ui";
import qs from "qs";
export default {
  data() {
    return {
      tap: false,
      tapcount: 0,
      username: "",
      password: "",
      repassword: "",
      email: "",
      ischeck: false,
      checkCount: 0,
      unameState: "",
      upwdState: "",
      reupwdState: "",
      emailState: "",
    };
  },
  methods: {
    toMine() {
      if (this.$store.state.uname != "") {
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
    regist() {
      this.uname_check();
      this.upwd_check();
      this.reupwd_check();
      this.email_check();
      // console.log(
      //   this.unameState,
      //   this.upwdState,
      //   this.reupwdState,
      //   this.emailState,
      //   this.ischeck
      // );
      if (!this.ischeck) {
        Toast({
          message: "请勾选用户同意",
          position: "center",
          duration: 1000,
        });
      }
      if (
        this.unameState &&
        this.upwdState &&
        this.reupwdState &&
        this.emailState &&
        this.ischeck
      ) {
        this.axios
          .post(
            "/user/regist",
            qs.stringify({
              uname: this.username,
              upwd: this.password,
              uemail: this.email,
            }),
            { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
          )
          .then((res) => {
            if (res.data.code == 200) {
              alert("注册成功");
              this.$router.push("/login");
            } else {
              Toast({
                message: "注册失败",
                position: "center",
                duration: 1000,
              });
            }
          });
      } else {
        // Toast({
        //         message: "注册失败",
        //         position: "center",
        //         duration: 1000,
        //       });
      }
    },
    uname_check() {
      //检验用户名的格式是否正确
      let unameReg = /^[0-9a-zA-Z]{2,10}$|^[\u4E00-\u9FA5]{2,6}$/g;
      //如果正则表达式通过，才回去发送请求，看是否有这个用户了
      if (unameReg.test(this.username)) {
        this.axios
          .get("user/check", {
            params: {
              uname: this.username,
            },
          })
          .then((res) => {
            // console.log(res.data,this.uname)
            //如果后端返回结果是1.
            if (res.data == "1") {
              //提示该用户已存在
              Toast({
                message: "该用户已存在",
                position: "center",
                duration: 1000,
              });
              //并把这个函数的返回结果设为false
              this.unameState = false;
            } else {
              this.unameState = true;
            }
          });
        //如果没有通过，就说明不能进去验证
      } else {
        Toast({
          message: "用户名格式错误",
          position: "center",
          duration: 1000,
        });
        this.unameState = false;
      }
    },
    upwd_check() {
      let upwd = this.password;
      let pwdRegExp = /^[0-9a-zA-Z]{6,15}$/;
      if (!pwdRegExp.test(upwd)) {
        Toast({
          message: "密码格式错误，请输入6~15位",
          position: "center",
          duration: 1000,
        });
        this.upwdState = false;
      } else {
        this.upwdState = true;
      }
    },
    reupwd_check() {
      if (this.password !== this.repassword) {
        Toast({
          message: "两次密码不一致",
          position: "center",
          duration: 1000,
        });
        this.reupwdState = false;
      } else {
        this.reupwdState = true;
      }
    },
    email_check() {
      //进行邮箱的正则表达式验证
      let emReg = /^[0-9a-zA-Z]{3,}@[0-9a-zA-Z]{2,4}.\w{2,}$/g;
      if (emReg.test(this.email)) {
        this.emailState = true;
      } else {
        Toast({
          message: "邮箱格式错误",
          position: "center",
          duration: 1000,
        });
        this.emailState = false;
      }
    },
    checked() {
      if (this.ischeck == false) {
        this.ischeck = true;
      } else {
        this.ischeck = false;
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

<style socped>
.registform > dd {
  margin-top: 10px;
  margin-bottom: 15px;
}
.mint-field {
  border-top: 1px solid #f7f7f0;
  border-bottom: 1px solid #e7e7e7;
}
.registform {
  padding: 0 10px;
}
.mint-header {
  height: 51px;
  font-size: 18px;
}
.show {
  height: 60px !important;
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
  padding: 5px 0 10px 0;
}
.nav > ul > li {
  justify-content: space-around;
  flex: 20;
  text-align: center;
}
.nav > ul > li > a,
.nav > ul > li {
  color: #949494;
  text-decoration: none;
}
</style>