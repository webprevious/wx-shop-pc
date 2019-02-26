<template>
  <div>
    <el-upload
      class="upload-demo"
      :action="upyun.host"
      :data="upyun"
      :before-upload="checkFile"
      :on-success="uploadSuccess"
      :on-error="uploadFail"
      :auto-upload="true"
      :file-list="fileList">
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>
  </div>
</template>

<script>
export default {
  data () {
    return {
      fileList: [],
      upyun: {
        host: 'http://v0.api.upyun.com/shopdev',
        authorization: '',
        policy: ''
      }
    }
  },
  methods: {
    // 上传文件前校验文件，现在只允许上传pdf
    checkFile (file) {
      this.uploadFileName = file.name
      const types = file.name.split('.')[1]
      if (types !== 'pdf') {
        this.$message.error('格式错误！请重新选择')
        return false
      } else {
        return true
      }
    },
    /**
     * [uploadSuccess 合同文件上传成功回掉函数]
     * @param {Object} response 发送ajax请求成功的res对象
     * @param {Object} file 上传成功的文件对象的相关信息
     * @param {Object} fileList 文件列表
     */
    uploadSuccess (response, file, fileList) {
      console.log(response)
    },
    /**
     * [uploadFail 合同文件上传失败回掉函数]
     * @param {Object} response 发送ajax请求失败的res对象
     * @param {Object} file 上传失败的文件对象的相关信息
     * @param {Object} fileList 文件列表
     */
    uploadFail (response, file, fileList) {
      console.log(response)
    },
    async getUpyun () {
      const res = await this.$axios('/getUpyun')
      if (res.code === 0) {
        this.upyun.authorization = res.data.authorization
        this.upyun.policy = res.data.policy
      } else {
        this.$message.error('系统错误')
      }
    }
  },
  created () {
    this.getUpyun()
  }
}
</script>
