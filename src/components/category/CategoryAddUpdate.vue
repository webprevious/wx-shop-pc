<template>
  <div class="category-add-update">
    <div class="add-or-update">{{title}}</div>
    <el-input class="category-name" v-model="categoryName" placeholder="请输入广告名" clearable></el-input>
    <el-radio-group v-model="isActive">
      <el-radio :label="true">激活</el-radio>
      <el-radio :label="false">不激活</el-radio>
    </el-radio-group>
    <el-button type="primary" class="confirm-btn" @click="confirmBtn">确认{{title}}</el-button>
    <el-button type="info" class="cancel-btn" @click="cancelBtn">取消</el-button>
  </div>
</template>

<script>
export default {
  name: 'category-add-or-update',
  data () {
    return {
      status: 'add',
      categoryName: '',
      isActive: true,
      // 修改操作时记录唯一id
      categoryId: ''
    }
  },
  computed: {
    title () {
      return this.status === 'add' ? '新增' : '修改'
    }
  },
  watch: {
    updateData (newValue) {
      console.log(newValue, 'new')
      this.status = 'update'
      this.categoryName = newValue.title
      this.isActive = newValue.isActive
      this.categoryId = newValue._id
    }
  },
  props: {
    updateData: Object
  },
  methods: {
    // 输入检查
    inputCheck () {
      let err = ''
      if (!this.categoryName) {
        err = '请输入分类名'
      }
      return err
    },
    // 收集上传参数
    createReqData () {
      let data = {
        categoryName: this.categoryName,
        isActive: this.isActive,
        status: this.status
      }
      if (this.status === 'update') {
        data._id = this.categoryId
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
      this.addcategory(reqData)
    },
    // 新增和修改请求函数
    async addcategory (reqData) {
      const res = await this.$axios('/addGoodsCateory', reqData, 'POST')
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
      this.categoryName = ''
      this.isActive = true
      this.categoryId = ''
    }
  },
  created () {
  }
}
</script>

<style lang="less" scoped>
.category-add-update {
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
  .category-name {
    margin-bottom: 30px;
  }
  // 上传样式
  .confirm-btn {
    width: 100%;
    margin-top: 30px;
  }
  .cancel-btn {
    width: 100%;
    margin-top: 30px;
    margin-bottom: 100px;
    margin-left: 0;
  }
}
</style>
