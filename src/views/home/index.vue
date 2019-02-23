<template>
  <div class="home">
    <div class="text">hello world</div>
    <div class="input-wrap">
      <el-input v-model="userName" placeholder="请输入用户名"></el-input>
      <el-button @click="saveUserInfoToVuex" type="primary">保存用户名到vuex</el-button>
    </div>
    <div>
      <el-button type="default" @click="goTo">去关于页面</el-button>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'home',
  data () {
    return {
      userName: ''
    }
  },
  methods: {
    saveUserInfoToVuex () {
      let userInfo = {
        userName: this.userName
      }
      this.saveUserInfo(userInfo)
    },
    goTo () {
      this.$router.push('/about')
    },
    ...mapActions(['saveUserInfo'])
  }
}
</script>

<style lang="less" scoped>
.home {
  text-align: center;
  .text {
    color: red;
  }
  .input-wrap {
    display: flex;
    padding: 100px;
    text-align: center;
  }
}
</style>
