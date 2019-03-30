<template>
  <el-row class="index">
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
  name: 'index',
  components: {
    Navigator
  }
}
</script>

<style lang="less">
.index {
  .view-nav {
    min-width: 200px;
  }
  .view-page {
    min-width: 800px;
    height: 100vh;
    overflow-x: auto;
  }
}
</style>
