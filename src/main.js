import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
// 引入tree-table组件
import treeTable from 'vue-table-with-tree-grid'
// 引入全局样式
import './assets/css/global.css'
// 全局引入阿里字体图标
import './assets/fonts/iconfont.css'
// 全局引入axios,真实项目里应该单独封装一个axios
import axios from 'axios'
// 设置请求（接口）默认的根路径
// 全局注册tree-table组件
Vue.component('tree-table', treeTable)
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
// 设置请求拦截
// axios.interceptors.request(config => {
//   // 在请求头加上 token 进行验证
//   config.headers.Authorization = sessionStorage.getItem('token')
//   return config
// })
// 挂载到原型上
Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
