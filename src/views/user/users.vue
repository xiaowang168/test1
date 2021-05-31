<template>
  <div>
    <!-- 面包屑导航区 -->
    <!-- <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb> -->
    <myBread />
    <!-- 卡片区域 -->
    <el-card>
      <!-- 搜索与添加区域 -->
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入内容"
                    v-model="params.query"
                    clearable
                    @clear="getUserList">
            <el-button slot="append"
                       icon="el-icon-search"
                       @click="getUserList"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary"
                     @click="addDialogVisible = true">添加用户</el-button>
        </el-col>
      </el-row>
      <!-- 表格区域 -->
      <el-table :data="userList"
                border
                stripe>
        <el-table-column label="序号"
                         type="index"></el-table-column>
        <el-table-column label="姓名"
                         prop="username"></el-table-column>
        <el-table-column label="邮箱"
                         prop="email"></el-table-column>
        <el-table-column label="电话"
                         prop="mobile"></el-table-column>
        <el-table-column label="角色"
                         prop="role_name"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.state"
                       @change="userStateChange(scope.row)">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作"
                         width="180px">
          <template v-slot="scope">
            <!-- 修改按钮 -->
            <el-button type="primary"
                       icon="el-icon-edit"
                       size="mini"></el-button>
            <!-- 删除按钮 -->
            <el-button type="danger"
                       icon="el-icon-delete"
                       size="mini"
                       @click="handleDelete(scope.row.id)"></el-button>
            <!-- 分配角色按钮 -->
            <el-tooltip effect="dark"
                        content="分配权限"
                        placement="top"
                        :enterable="false">
              <el-button type="warning"
                         icon="el-icon-setting"
                         size="mini"></el-button>
            </el-tooltip>

          </template>
        </el-table-column>
      </el-table>
      <!-- 分页功能 -->
      <!-- <el-pagination @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :current-page="params.pagenum"
                     hide-on-single-page
                     :page-sizes="[1, 2, 3, 4]"
                     :page-size="params.pagesize"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="4">
      </el-pagination> -->
      <pagination :page="params.pagenum"
                  :pageSize="params.pagesize"
                  :total="4"
                  @pageSizeChange="pageSizeChange"
                  @currentChange="currentChange" />
    </el-card>
    <!-- 添加用户的对话框 -->
    <el-dialog title="添加用户"
               :visible.sync="addDialogVisible"
               width="50%"
               @close="addDialogClose">
      <!-- 内容 -->
      <el-form :model="addForm"
               :rules="addFormRules"
               ref="addFormRef"
               label-width="70px"
               class="demo-ruleForm">
        <el-form-item label="用户名"
                      prop="username">
          <el-input v-model="addForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码"
                      prop="password">
          <el-input type="password"
                    v-model="addForm.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱"
                      prop="email">
          <el-input v-model="addForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机"
                      prop="mobile">
          <el-input v-model="addForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部 -->
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="addUser">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// 引入手机号 邮箱自定义校验规则
import { checkMobile, checkEmail } from '../../utils/verification'
// 引入面包屑公用组件
import myBread from '../../components/bread'
// 引入分页公用组件
import pagination from '../../components/pagination'
export default {
  components: {
    myBread,
    pagination
  },
  data () {
    return {
      // 模拟后台表格数据
      userList: [
        { id: 100, username: '小王', email: '228897680@qq.com', mobile: '18580028773', role_name: '管理员', state: true },
        { id: 101, username: '小李', email: '228897685@qq.com', mobile: '18580028774', role_name: '炒鸡管理员', state: false },
        { id: 102, username: '小安', email: '228897686@qq.com', mobile: '18580028775', role_name: '炒鸡管理员', state: true },
        { id: 103, username: '小花', email: '228897687@qq.com', mobile: '18580028776', role_name: '管理员', state: false }

      ],
      // 获取数据的参数
      params: {
        // 搜索内容
        query: '',
        // 当前页数
        pagenum: 1,
        // 每页有多少条数据
        pagesize: 3
      },
      // 添加用户对话框boolean值
      addDialogVisible: false,
      // 添加用户表单数据
      addForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      // 添加用户表单数据校验规则
      addFormRules: {
        username: [
          { required: true, message: '必填', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '必填', trigger: 'blur' },
          { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '必填', trigger: 'blur' },
          { validator: checkEmail, trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '必填', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }
        ]
      }
      // 后台真实数据
      // usersList: [],
      // 总条数
      // total: 0
    }
  },
  created () {
    // 页面加载调用
    // this.getUserList()
    console.log(this.$route)
  },
  methods: {
    // 获取表格数据
    async getUserList () {
      // cosnt { data: res } = await this.$http.get('users', { params: this.params })
      // if (res.code !== 200) this.$message.error('获取数据失败')
      // this.usersList = res.data
      // this.total = res.total
    },
    // switch按钮改变事件
    userStateChange (row) {
      console.log(row)
    },
    // 关闭添加用户弹窗重置表单
    addDialogClose () {
      this.$refs.addFormRef.resetFields()
    },
    // 点击按钮添加用户
    addUser () {
      this.$refs.addFormRef.validate(valid => {
        console.log(valid)
        if (!valid) return false
      })
    },
    // 删除用户
    async handleDelete (id) {
      console.log(id)
      const fors = await this.$confirm('你确定要删除吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      // 点击确定返回的是字符串（confirm）
      // 点击取消返回的是字符串（cancel）
      console.log(fors)
      if (fors !== 'confirm') return this.$message.info('已经取消删除')
      console.log('确认删除')
    },
    // 页面pageSize改变的事件
    // handleSizeChange (newSize) {
    //   console.log(newSize)
    //   this.params.pagesize = newSize
    //   // this.getUserList()
    // },
    // 监听页码值改变的事件
    // handleCurrentChange (newPage) {
    //   console.log(newPage)
    //   this.params.pagenum = newPage
    //   // this.getUserList()
    // }
    // 页面pageSize改变的事件
    pageSizeChange (e) {
      // console.log(e)
      //   this.params.pagesize = newSize
      //   // this.getUserList()
    },
    // 监听页码值改变的事件
    currentChange (e) {
      // console.log(e)
      //   this.params.pagenum = newPage
      //   // this.getUserList()
    }
  }
}
</script>
