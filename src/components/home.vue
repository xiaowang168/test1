<template>
  <!-- 后台主体页面 -->
  <el-container class="home_container">
    <!-- 头部区域 -->
    <el-header>
      <div class="header_flex">
        <img src="../assets/logo.png"
             alt="">
        <span>电商后台管理系统</span>
      </div>
      <el-button type="info"
                 @click="loginOut">退出登录</el-button>
    </el-header>
    <!-- 内容区 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <!-- 点击实现菜单折叠与展开 -->
        <div class="toggle_button"
             @click="toggleCollapse">|||</div>
        <!-- 侧边栏内容区 -->
        <el-menu background-color="#333744"
                 text-color="#fff"
                 active-text-color="#409BFF"
                 unique-opened
                 router
                 :collapse="isCollapse"
                 :collapse-transition="false"
                 :default-active="activePath">
          <!-- 一级菜单 注意这里的index是唯一的，而且直接收字符串，不然会报错 -->
          <el-submenu :index="item.id+''"
                      v-for="item in asideData"
                      :key="item.id">
            <template slot="title">
              <i :class="iconObj[item.id]"></i>
              <span>{{item.title}}</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item :index="'/'+itemObj.path"
                          v-for="itemObj in item.children"
                          :key="itemObj.id"
                          @click="saveNavState('/'+itemObj.path)">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>{{itemObj.title}}</span>
              </template>
            </el-menu-item>
          </el-submenu>

        </el-menu>
      </el-aside>
      <!-- 右侧内容 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {
  data () {
    return {
      // 菜单默认是不折叠
      isCollapse: false,
      // 默认菜单地址为空
      activePath: '',
      // 模拟后端菜单列表数据
      asideData: [
        { id: 1, title: '用户管理', path: 'users', children: [{ id: 10, title: '用户列表', path: 'users' }] },
        { id: 2, title: '权限管理', path: 'rights', children: [{ id: 20, title: '角色列表', path: 'roles' }, { id: 21, title: '权限列表', path: 'rights' }] },
        { id: 3, title: '商品管理', path: 'goods', children: [{ id: 30, title: '商品列表', path: 'goods' }, { id: 31, title: '分类参数', path: 'types' }, { id: 32, title: '商品分类', path: 'shops' }] },
        { id: 4, title: '订单管理', path: 'orders', children: [{ id: 40, title: '订单列表', path: 'orders' }] },
        { id: 5, title: '数据统计', path: 'reports', children: [{ id: 50, title: '数据列表', path: 'reports' }] }
      ],
      // 图标后端没返回的情况下 我们可以定义一个对象，通过class对象的形式
      iconObj: {
        1: 'iconfont icon-yonghuguanli',
        2: 'iconfont icon-header-22',
        3: 'iconfont icon-shangpinguanli',
        4: 'iconfont icon-dingdanguanli',
        5: 'iconfont icon-shujutongji'
      }
    }
  },
  created () {
    this.activePath = sessionStorage.getItem('activePath')
  },
  methods: {
    // 退出登录
    loginOut () {
      sessionStorage.clear()
      this.$router.push('/login')
    },
    // 菜单折叠与展开
    toggleCollapse () {
      this.isCollapse = !this.isCollapse
    },
    // 保持链接激活的状态
    saveNavState (activePath) {
      // 保存到sessionStorage中
      sessionStorage.setItem('activePath', activePath)
      this.activePath = activePath
    }
  }
}
</script>
<style lang="less" scoped>
.home_container {
  height: 100%;
  .el-header {
    background: #373d41;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #fff;
    font-size: 20px;
    .header_flex {
      display: flex;
      align-items: center;
      img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }
      span {
        margin-left: 15px;
      }
    }
  }
  .el-aside {
    background: #333744;
    .toggle_button {
      background: #4a5064;
      height: 24px;
      line-height: 24px;
      font-size: 10px;
      color: #fff;
      text-align: center;
      letter-spacing: 0.9px;
      cursor: pointer;
    }
    .el-menu {
      border-right: none;
      transition: all 3s;
      .iconfont {
        margin-right: 10px;
      }
    }
  }
  .el-main {
    background: #eaedf1;
  }
}
</style>
