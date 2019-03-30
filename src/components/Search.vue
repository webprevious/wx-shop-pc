<template>
  <div class="search">
    <el-input class="input" v-model="keyword" :placeholder="placeholderText" clearable></el-input>
    <el-button type="primary" @click="search">搜索</el-button>
    <el-button type="primary" @click="exportExcel" v-if="isNeedExportBtn">导出</el-button>
    <el-button type="primary" @click="addUser" v-if="isNeedAddBtn">新增</el-button>
  </div>
</template>

<script>
export default {
  name: 'search',
  data () {
    return {
      keyword: ''
    }
  },
  props: {
    placeholderText: {
      type: String,
      default: '请输入'
    },
    isNeedExportBtn: {
      type: Boolean,
      default: false
    },
    isNeedAddBtn: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    // 点击搜索按钮
    search () {
      this.$emit('search', this.keyword)
    },
    // 点击导出按钮
    exportExcel () {
      this.$emit('exportExcel', this.keyword)
    },
    // 点击新增
    addUser () {
      this.$emit('add')
    }
  }
}
</script>

<style lang="less" scoped>
.search {
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 20px 0;
  .input {
    width: 320px;
    margin-right: 10px;
  }
}
</style>
