<template>
  <el-row id="app">
    <router-view></router-view>
  </el-row>
</template>

<script>
// import Navigator from '@/components/Navigator.vue'
export default {
  name: 'app',
  components: {
    // Navigator
  }
}
</script>

<style lang="less">
#app {
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  min-width: 1000px;
}
// 全局样式，避免样式穿透
.carousel,
.category,
.user-manage,
.verify {
  // 表格表头
  .el-table th {
    background-color: #FAFAFA!important;
  }
  // 表格分页右对齐
  .el-pagination {
    text-align: right;
    padding: 20px 20px 10px 0;
  }
  // 修改字段样式
  .update {
    color: #1d6abe;
    cursor: pointer;
    & + span {
      padding-left: 10px;
    }
  }
  // 删除字段样式
  .delete {
    color: #f40;
    cursor: pointer;
    padding-left: 10px;
  }
  // 修改和新增按钮样式
  .confirm-btn {
    width: 100%;
    margin-top: 30px;
  }
  .cancel-btn {
    width: 100%;
    margin-top: 30px;
    margin-bottom: 100px;
    margin-left: 0!important;
  }
  // 用户管理，新增用户弹框
  .el-dialog {
    width: 410px!important;
  }
}
</style>
