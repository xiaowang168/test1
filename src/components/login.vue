<template>
  <!-- 登录页 -->
  <div class="login">
    <div class="login_box">
      <!-- 头像区域 -->
      <div class="avatar_box">
        <img src="../assets/logo.png"
             alt="" />
      </div>
      <!-- 登录表单区域 -->
      <el-form :model="loginForm"
               :rules="loginRules"
               ref="loginRef"
               label-width="0px"
               class="login_form">
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input prefix-icon="iconfont icon-tubiao211"
                    v-model="loginForm.username"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input type="password"
                    prefix-icon="iconfont icon-zu"
                    v-model="loginForm.password"></el-input>
        </el-form-item>
        <!-- 按钮 -->
        <el-form-item class="btns">
          <el-button type="primary"
                     @click="login">登录</el-button>
          <el-button type="info"
                     @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [
          { required: true, message: '请输入登录账号', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入登录密码', trigger: 'blur' },
          { min: 6, max: 10, message: '长度在 6 到 10 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    resetLoginForm () {
      console.log(this)
      this.$refs.loginRef.resetFields()
    },
    login () {
      this.$refs.loginRef.validate(async valid => {
        console.log(valid)
        if (!valid) return
        // const data = await this.$http.post('login', this.loginForm)
        // console.log(data)
        var flag = true
        if (!flag) return this.$message.error('登录失败')
        this.$message.success('登录成功')
        // localStorage持久化的存储机制，sessionStorage会话期间的存储机制
        localStorage.setItem('token', 'rwerasf123dweq')
        sessionStorage.setItem('token', 'rwerasf123dweqsess')
        this.$router.push('/home')
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login {
  background: #2d4d6d;
  height: 100%;
  .login_box {
    width: 450px;
    height: 300px;
    background: #fff;
    border-radius: 3px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    .avatar_box {
      height: 130px;
      width: 130px;
      border: 1px solid #eee;
      border-radius: 50%;
      padding: 10px;
      box-shadow: 0 0 10px #ddd;
      position: absolute;
      left: 50%;
      transform: translate(-50%, -50%);
      background: #fff;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background: #eee;
      }
    }
    .login_form {
      box-sizing: border-box;
      position: absolute;
      bottom: 0;
      width: 100%;
      padding: 0 20px;
      /deep/ .el-input__inner {
        border: none;
        border-bottom: 1px solid #dcdfe6;
        border-radius: 0px;
      }
      .btns {
        display: flex;
        justify-content: flex-end;
      }
    }
  }
}
</style>
