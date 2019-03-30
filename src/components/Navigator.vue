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
          :router="true"
          @select="handleSelect">
          <el-menu-item index="/home">
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
import { mapState } from 'vuex'
export default {
  name: 'navigator',
  data () {
    return {
      activeIndex: '/home',
      path: this.$route
    }
  },
  watch: {
    path (newValue) {
      console.log(newValue, '0000000')
    }
  },
  computed: {
    // 根据用户是否登录得到用户名
    userName () {
      return this.userInfo ? this.userInfo.userName : '未登录'
    },
    // 处理tab打开时element-ui样式不一问题
    isOrderTab () {
      return this.$route.path === '/order'
    },
    // 判断是否选中了概况，选中了样式不变，没有选中就整体上推
    isSelectHome () {
      return this.$route.path !== '/home'
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
      this.$router.push('/home')
      location.reload()
    },
    // [logout 退出]
    logout () {
      this.$confirm('此操作将退出本系统, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 清理缓存
        sessionStorage.clear()
        this.$router.replace('/login')
      }).catch(err => {
        console.log(err)
      })
    },
    // 当前选中index
    handleSelect (index) {
      this.activeIndex = this.$route.path
    }
  },
  created () {
    this.activeIndex = this.$route.path
  }
}
</script>

<style lang="less" scoped>
@import "~@/assets/css/navigator.less";
</style>
