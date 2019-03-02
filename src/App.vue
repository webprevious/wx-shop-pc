<template>
  <el-row id="app">
    <el-col class="view-nav" :span="4">
      <navigator></navigator>
    </el-col>
    <el-col class="view-page" :span="20">
      <router-view></router-view>
    </el-col>
  </el-row>
</template>

<script>
import Navigator from '@/components/Navigator.vue'
export default {
  name: 'app',
  components: {
    Navigator
  }
}
</script>

<style lang="less">
#app {
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  min-width: 1000px;
  .view-nav {
    min-width: 200px;
  }
  .view-page {
    min-width: 800px;
  }
}
</style>
