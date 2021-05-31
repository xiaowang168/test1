import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/login.vue'
import Home from '../components/home.vue'
import Welcome from '../components/welcome.vue'
import Users from '../views/user/users.vue'
import Rights from '../views/power/rights.vue'
import Roles from '../views/power/roles.vue'
import Shops from '../views/shop/shops.vue'
Vue.use(VueRouter)

const routes = [
  // {
  //   path: '/',
  //   name: 'Login',
  //   component: Login
  // },
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: '登录',
    component: Login
  },
  {
    path: '/home',
    name: '首页',
    component: Home,
    redirect: '/welcome',
    children: [
      { path: '/welcome', name: '欢迎页', component: Welcome },
      { path: '/users', name: '用户列表', component: Users, meta: { bread: [{ path: '/home', name: '首页' }, { name: '用户管理' }, { path: '/users', name: '用户列表' }] } },
      { path: '/rights', name: '权限列表', component: Rights, meta: { bread: [{ path: '/home', name: '首页' }, { name: '权限管理' }, { path: '/rights', name: '权限列表' }] } },
      { path: '/roles', name: '角色列表', component: Roles, meta: { bread: [{ path: '/home', name: '首页' }, { name: '权限管理' }, { path: '/roles', name: '角色列表' }] } },
      { path: '/shops', name: '商品分类', component: Shops, meta: { bread: [{ path: '/home', name: '首页' }, { name: '商品管理' }, { path: '/shops', name: '商品分类' }] } }
    ]
  }
  // {
  //   path: '/about',
  //   name: 'About',
  //   component: () => import('../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router
router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next()
  const token = sessionStorage.getItem('token')
  if (!token) return next('/login')
  next()
})
