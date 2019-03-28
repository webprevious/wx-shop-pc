<template>
  <div class="carousel-add-update">
    <div class="add-or-update">{{title}}</div>
    <el-input class="ad-name" v-model="adName" placeholder="请输入广告名" clearable></el-input>
    <el-input class="ad-id" v-model="goodsId" placeholder="请输入广告物品ID" clearable></el-input>
    <el-radio-group v-model="isActive">
      <el-radio :label="true">激活</el-radio>
      <el-radio :label="false">不激活</el-radio>
    </el-radio-group>
    <el-upload
      class="upload-demo"
      :action="upyun.host"
      :data="upyun"
      :before-upload="checkFile"
      :on-success="uploadSuccess"
      :on-error="uploadFail"
      :auto-upload="true"
      accept="image/*"
      :show-file-list="false"
      :limit="1">
      <img class="upload-success" :src="adImgUrl" v-if="adImgUrl">
      <div class="upload-origin" v-else>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">只能上传jpg/png文件</div>
      </div>
    </el-upload>
    <el-button type="primary" class="confirm-btn" @click="confirmBtn">确认{{title}}</el-button>
    <el-button type="info" class="cancel-btn" @click="cancelBtn">取消</el-button>
  </div>
</template>

<script>
export default {
  name: 'carousel-add-or-update',
  data () {
    return {
      status: 'add',
      adName: '',
      goodsId: '',
      isActive: true,
      adImgUrl: '',
      // 又拍云信息
      upyun: {
        host: 'http://v0.api.upyun.com/shopdev',
        authorization: '',
        policy: ''
      },
      // 修改操作时记录唯一id
      carouselId: ''
    }
  },
  computed: {
    title () {
      return this.status === 'add' ? '新增' : '修改'
    }
  },
  watch: {
    updateData (newValue) {
      // console.log(newValue, 'new')
      this.status = 'update'
      this.adName = newValue.adName
      this.goodsId = newValue.goodsId
      this.isActive = newValue.isActive
      this.adImgUrl = newValue.adImgUrl
      this.carouselId = newValue._id
    }
  },
  props: {
    updateData: Object
  },
  methods: {
    // 上传文件前校验文件，现在只允许上传图片
    checkFile (file) {
      this.uploadFileName = file.name
      const types = file.name.split('.')[1]
      console.log(types)
      if (types === 'png' || types === 'jpg') {
        return true
      } else {
        this.$message.error('格式错误！请重新选择')
        return false
      }
    },
    /**
     * [uploadSuccess 合同文件上传成功回掉函数]
     * @param {Object} response 发送ajax请求成功的res对象
     * @param {Object} file 上传成功的文件对象的相关信息
     * @param {Object} fileList 文件列表
     */
    uploadSuccess (response, file, fileList) {
      console.log(response.url)
      this.adImgUrl = 'http://shopdev.test.upcdn.net/' + response.url
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
      if (res.code) {
        this.upyun.authorization = res.data.authorization
        this.upyun.policy = res.data.policy
      } else {
        this.$message.error('系统错误')
      }
    },
    // 输入检查
    inputCheck () {
      let err = ''
      if (!this.adName) {
        err = '请输入广告名'
      } else if (!this.goodsId) {
        err = '请输入广告商品ID'
      } else if (!this.adImgUrl) {
        err = '请上传广告图片'
      }
      return err
    },
    // 收集上传参数
    createReqData () {
      let data = {
        adName: this.adName,
        goodsId: this.goodsId,
        isActive: this.isActive,
        adImgUrl: this.adImgUrl,
        status: this.status
      }
      if (this.status === 'update') {
        data._id = this.carouselId
      }
      return data
    },
    // 确认修改和新增按钮
    confirmBtn () {
      // 收集之前检查输入
      let result = this.inputCheck()
      if (result) {
        return this.$message.error(result)
      }
      console.log(this.createReqData())
      let reqData = this.createReqData()
      this.addCarousel(reqData)
    },
    // 新增和修改请求函数
    async addCarousel (reqData) {
      const res = await this.$axios('/addAdCarousel', reqData, 'POST')
      console.log(res)
      if (res.code) {
        if (this.status === 'add') {
          this.$message.success('新增成功')
        } else {
          this.$message.success('修改成功')
        }
        // 初始化输入
        this.initInput()
        this.$emit('updateOrAddSuccess')
      } else {
        if (this.status === 'add') {
          this.$message.error('新增失败,请稍后再试')
        } else {
          this.$message.error('修改失败,请稍后再试')
        }
      }
    },
    // 取消
    cancelBtn () {
      this.initInput()
    },
    // 新增或者修改成功，初始化输入框
    initInput () {
      this.status = 'add'
      this.adName = ''
      this.goodsId = ''
      this.isActive = true
      this.adImgUrl = ''
      this.carouselId = ''
    }
  },
  created () {
    this.getUpyun()
  }
}
</script>

<style lang="less" scoped>
.carousel-add-update {
  width: 420px;
  display: flex;
  flex-direction: column;
  align-items: center;
  // 新增还是添加标题
  .add-or-update {
    height: 60px;
    line-height: 60px;
  }
  // 输入框
  .ad-name,
  .ad-id {
    margin-bottom: 30px;
  }
  // 上传样式
  .upload-demo {
    .upload-origin {
      width: 200px;
      height: 98px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      border: 1px solid #EBEEF5;
      margin-top: 30px;
    }
    .upload-success {
      width: 200px;
      height: 98px;
      margin-top: 30px;
    }
  }
}
</style>
