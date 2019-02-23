<template>
  <div class="test-ie">
    <div>
      <el-button @click="getHost">发送请求</el-button>
    </div>
    <div>
      请求结果{{result}}
    </div>
  </div>
</template>

<script>
export default {
  name: 'test-ie',
  data () {
    return {
      result: ''
    }
  },
  methods: {
    async getHost () {
      this.result = await this.$axios('/business/common/get_host')
    }
  }
}
</script>

<style lang="less" scoped>
.test-ie {
  text-align: center;
}
</style>
