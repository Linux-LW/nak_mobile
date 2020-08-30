import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import Top from './components/backTop.vue'
import qs from 'qs'

Vue.component("Top", Top)

Vue.prototype.axios = axios;
axios.defaults.baseURL = 'http://localhost:3001'

// 导入Mint UI
import MintUI from "mint-ui";
// 导入Mint UI 所需样式表
import "mint-ui/lib/style.min.css";
Vue.use(MintUI)

import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);

Vue.config.productionTip = false

//配置全局路由守卫
router.beforeEach((to, from, next) => {
  if (to.meta.guard) { store.state.uname == '' ? next('/login') : next() } else { next() }
})


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
