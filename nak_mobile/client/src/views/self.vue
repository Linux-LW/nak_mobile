<template>
  <div class="mine">
    <MyHeader :title="title"></MyHeader>
    <div class="user-header">
      <div class="user-info">
        <div class="avatar">
          <img src="../../public/userInfo/avatar.png" alt />
        </div>
        <div class="info">
          <dd class="name">
            <span>{{this.$store.state.uname}}&nbsp;&nbsp;|&nbsp;&nbsp;</span>
            <span @click="logout">退出</span>
          </dd>
          <dd class="level">您的等级:普通会员</dd>
          <dd>账户余额:￥0.00元</dd>
          <dd>积分信息:消费积分0 &nbsp; &nbsp; 等级积分0</dd>
          <dd>优惠券数:</dd>
        </div>
      </div>
    </div>
    <!-- 用户操作 -->
    <div class="user-take">
      <div>
        <img src="../../public/userInfo/order.png" alt />
        <p>用户订单</p>
      </div>
      <div @click="position">
        <img src="../../public/userInfo/position.png" alt />
        <p>位置</p>
      </div>
      <div @click="setpwd">
        <img src="../../public/userInfo/safe.png" alt />
        <p>修改密码</p>
      </div>
      <div>
        <img src="../../public/userInfo/self.png" alt />
        <p>修改资料</p>
      </div>
    </div>
    <!-- 最新订单，收藏，我的咨询，虚拟商品 -->
    <div class="aboutmine">
      <div>最新订单</div>
      <div>我的收藏</div>
      <div>我的咨询</div>
      <div>虚拟商品</div>
    </div>
  </div>
</template>

<style scoped>
.mine {
  height: 100vh;
  background-color: #f7f7f7;
}
.mine > .user-header {
  width: 100%;
  height: 8.125rem;
  background-image: url("../../public/userInfo/default.png");
  margin-top: -1px;
  padding: 1.25rem 0.625rem 0.625rem 0.625rem;
}
.user-header > .user-info {
  display: flex;
}
.avatar {
  flex: 25;
}
.avatar > img {
  width: 100%;
}
.info {
  flex: 70;
  color: white;
  margin-left: 4%;
}
.name {
  font-size: 1.125rem;
}
.name ~ dd {
  font-size: 0.875rem;
}
.user-take {
  display: flex;
}
.user-take > div,
.aboutmine > div {
  flex: 25;
  box-sizing: border-box;
  border-right: 1px solid#e3e3e3;
  border-bottom: 1px solid #e3e3e3;
  text-align: center;
  color: #ffa66e;
  padding: 0.625rem 0;
  font-size: 0.875rem;
  background-color: #fff;
}
.aboutmine {
  display: flex;
}
.aboutmine > div {
  border-top: 1px solid #e3e3e3;
  margin-top: 1.5625rem;
}
</style>

<script>
import MyHeader from '../components/my-header'
export default {
  data() {
    return {title:'个人中心'};
  },
  methods: {
    setpwd() {
      this.$router.push("/setpwd");
    },
    logout() {
      localStorage.clear();
      sessionStorage.clear();
      this.$store.commit("setUname", "");
      this.$store.state.car = [];
      this.$router.push("/");
    },
    position() {
      this.$router.push("/position");
    },
  },
  components: {
    MyHeader,
  },
};
</script>