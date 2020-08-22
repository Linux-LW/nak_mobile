import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

Vue.prototype.axios=axios;
axios.defaults.baseURL='http://localhost:3001'

// 导入Mint UI
import MintUI from "mint-ui";
// 导入Mint UI 所需样式表
import "mint-ui/lib/style.min.css";
Vue.use(MintUI)


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
