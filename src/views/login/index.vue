<template>
  <div class="login-wrap">
    <div class="login">
      <div class="title">登录</div>
      <el-input class="user-name" v-model="userName" placeholder="请输入用户名" clearable></el-input>
      <el-input type="password" class="password" v-model="password" placeholder="请输入密码" clearable></el-input>
       <el-button type="primary" class="login-btn" @click="login">登录</el-button>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'login',
  data () {
    return {
      userName: '',
      password: ''
    }
  },
  methods: {
    // 输入检查
    inputCheck () {
      let err = ''
      if (!this.userName) {
        err = '请输入用户名'
      } else if (!this.password) {
        err = '请输入密码'
      }
      return err
    },
    async login () {
      let errData = this.inputCheck()
      if (errData) {
        return this.$message.warning(errData)
      }
      let reqData = {
        userName: this.userName,
        password: this.password
      }
      const res = await this.$axios('/manLogin', reqData, 'POST')
      if (res.code) {
        console.log(res.data)
        this.saveUserInfo(res.data)
        this.$router.push('/home')
      } else {
        this.$message.error(res.data)
      }
    },
    ...mapActions(['saveUserInfo'])
  }
}
</script>

<style lang="less" scoped>
.login-wrap {
  width: 100vw;
  height: 100vh;
  background: #EEE;
  position: relative;
  .login {
    width: 400px;
    height: 300px;
    padding: 30px;
    background: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-200px,-200px);
    .title {
      text-align: center;
    }
    .user-name {
      margin: 30px 0;
    }
    .login-btn {
      width: 100%;
      margin-top: 30px;
    }
  }
}
</style>
