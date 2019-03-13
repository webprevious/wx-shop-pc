<template>
  <el-row class="nav-wrap" v-if="isAccountEnable">
    <el-col :span="24">
      <!-- <img src="../assets/img/nav/logo.png" @click="goToIndex" class="logo"> -->
      <div @click="goToIndex" class="logo">二手交易管理平台</div>
      <el-row class="user-info">
        <el-col :span="12" class="username">{{userName}}</el-col>
        <el-col :span="12" class="logout" @click.native="logout">
          <img src="../assets/img/nav/logout.png" class="logout-icon">
          <span class="logout-text">退出登录</span>
        </el-col>
      </el-row>
      <el-row :class="{'nav-tab': isSelectHome}">
        <el-menu
          :default-active="activeIndex"
          class="el-menu-vertical-demo"
          text-color="#fff"
          ref="navigator"
          active-text-color="#fff"
          :router="true">
          <el-menu-item index="/">
            <img src="../assets/img/nav/home-icon.png" class="nav-icon">
            <span class="home-text">首页</span>
          </el-menu-item>
          <el-menu-item index="/system">
            <img src="../assets/img/nav/system-icon.png" class="nav-icon">
            <span class="home-text">系统管理</span>
          </el-menu-item>
          <el-menu-item index="/goods">
            <img src="../assets/img/nav/manage.png" class="nav-icon">
            <span class="home-text">物品管理</span>
          </el-menu-item>
          <el-menu-item index="/user">
            <img src="../assets/img/nav/user-manage-icon.png" class="nav-icon">
            <span class="home-text">用户管理</span>
          </el-menu-item>
        </el-menu>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'navigator',
  data () {
    return {
      activeIndex: '/'
    }
  },
  computed: {
    // 根据用户是否登录得到用户名
    userName () {
      return this.userInfo ? this.userInfo.name : '未登录'
    },
    // 处理tab打开时element-ui样式不一问题
    isOrderTab () {
      return this.$route.path === '/order'
    },
    // 判断是否选中了概况，选中了样式不变，没有选中就整体上推
    isSelectHome () {
      return this.$route.path !== '/'
    },
    // 判断是否有访问此系统的权限
    isAccountEnable () {
      return true
    },
    // 判断是否有客户信息管理权限
    isShowCustomerMsg () {
      return this.userInfo.permissions.includes('CUSTOMER_MANAGE_AUTH')
    },
    ...mapState({
      userInfo: state => state.userInfo.userInfo
    })
  },
  methods: {
    // [goToIndex 点击logo回到首页]
    goToIndex () {
      this.$router.push('/')
      location.reload()
    },
    // [logout 退出]
    logout () {
      this.$confirm('此操作将退出本系统, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        customClass: 'logout-alert',
        cancelButtonClass: 'cancel-btn',
        confirmButtonClass: 'confirm-btn'
      }).then(() => {
        // 记录退出
        this.saveLogoutRecord()
        this.userLogout().then(res => {
          sessionStorage.clear()
          window.location.href = process.env.VUE_APP_LOGOUT_URL
        }).catch(err => {
          this.$message.error(err)
        })
      })
    },
    ...mapActions(['userLogout', 'saveLogoutRecord'])
  },
  created () {
    this.activeIndex = this.$route.path
  }
}
</script>

<style lang="less" scoped>
@import "~@/assets/css/navigator.less";
</style>
