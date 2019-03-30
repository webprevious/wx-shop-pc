<template>
  <el-row class="user-manage">
    <search placeholderText="请输入用户名" @search="search" :isNeedAddBtn="true" @add="addUser"></search>
    <el-table
      stripe
      :data="tableData"
      style="width: 100%">
      <el-table-column
        label="序号"
        align="center"
        width="80">
        <span slot-scope="scope">{{scope.$index+(page.currentPage - 1) * page.pageSize + 1}}</span>
      </el-table-column>
      <el-table-column
        label="创建日期"
        align="center">
        <span slot-scope="scope">{{scope.row.createAt.slice(0, 10)}}</span>
      </el-table-column>
      <el-table-column
        prop="userName"
        label="用户名"
        align="center">
      </el-table-column>
      <el-table-column
        label="角色"
        align="center">
        <span slot-scope="scope">{{roleChinese[scope.row.role]}}</span>
      </el-table-column>
      <el-table-column
        label="状态"
        align="center">
        <el-tag slot-scope="scope" :type="scope.row.isActive ? 'success' : 'danger'">{{scope.row.isActive ? '使用中' : '停用中'}}</el-tag>
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        min-width="160">
        <div class="operator" slot-scope="scope">
          <span class="update" @click="initPassword(scope.row._id)">初始化密码</span>
          <span class="delete" @click="updateUser(scope.row)">修改</span>
        </div>
      </el-table-column>
    </el-table>
    <el-pagination
      @current-change="handleCurrentPageChange"
      :current-page.sync="page.currentPage"
      :page-size="page.pageSize"
      layout="prev, pager, next, jumper"
      :total="page.total">
    </el-pagination>
    <el-dialog
      title="新增用户"
      :visible.sync="pcAddUserDialogVisible"
      center>
      <div class="add-user-wrap">
        <el-input v-model="addUserMsg.userName" placeholder="请输入用户名" clearable :disabled="addUserMsg.status==='update'"></el-input>
        <el-row class="add-user-wrap-select">
          <el-col :span="12">
            <div>权限选择</div>
            <el-radio-group class="role-radio" v-model="addUserMsg.role">
              <el-radio label="super-admin">超级管理员</el-radio>
              <el-radio label="system-manage">系统管理员</el-radio>
              <el-radio label="goods-manage">物品管理员</el-radio>
              <el-radio class="last" label="user-manage">用户管理员</el-radio>
            </el-radio-group>
          </el-col>
          <el-col :span="12">
            <div>是否激活</div>
            <el-radio-group class="is-active-radio" v-model="addUserMsg.isActive">
              <el-radio class="item" :label="true">激活</el-radio>
              <el-radio class="last" :label="false">不激活</el-radio>
            </el-radio-group>
          </el-col>
        </el-row>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelAddBtn">取 消</el-button>
        <el-button type="primary" @click="confirmAddBtn">确 定</el-button>
      </span>
    </el-dialog>
  </el-row>
</template>

<script>
import Search from '@/components/Search.vue'
export default {
  name: 'pc-user-manage',
  data () {
    return {
      page: {
        currentPage: 1,
        pageSize: 10,
        total: 0
      },
      tableData: [],
      // 搜索关键字
      keyword: '',
      // 管理员中文匹配对象
      roleChinese: {
        'super-admin': '超级管理员',
        'system-manage': '系统管理员',
        'goods-manage': '物品管理员',
        'user-manage': '用户管理员'
      },
      // pc管理端新增用户弹框
      pcAddUserDialogVisible: false,
      // 新增用户
      addUserMsg: {
        userName: '',
        role: 'super-admin',
        isActive: true,
        status: 'add'
      }
    }
  },
  components: {
    Search
  },
  methods: {
    // 搜索回调
    search (keyword) {
      console.log(keyword)
      this.keyword = keyword
      this.currentPage = 1
      this.manageGetPcUserList()
    },
    // 分页
    handleCurrentPageChange () {
      this.manageGetPcUserList()
    },
    // 获取管理端列表
    async manageGetPcUserList () {
      let reqData = {
        currentPage: this.page.currentPage,
        pageSize: this.page.pageSize
      }
      if (this.keyword) {
        reqData.keyword = this.keyword
      }
      const res = await this.$axios('/manageGetPcUserList', reqData)
      console.log(res)
      if (res.code) {
        this.tableData = res.data
        this.page.total = res.total
      } else {
        this.tableData = []
        this.page.total = 0
      }
    },
    // 新增用户弹框
    addUser () {
      console.log('新增用户')
      this.pcAddUserDialogVisible = true
      // 把状态改成新增
      this.addUserMsg.status = 'add'
    },
    // 确认添加
    async confirmAddBtn () {
      if (!this.addUserMsg.userName) {
        return this.$message.warning('请输入添加的用户名')
      }
      const res = await this.$axios('/manAddUpadteUser', this.addUserMsg, 'POST')
      // 如果是新增
      if (this.addUserMsg.status === 'add') {
        if (res.code) {
          this.$message.success('新增成功')
          this.manageGetPcUserList()
        } else {
          this.$message.success('新增失败，请稍后再试')
        }
        // 不管失败成功关闭弹框
        this.pcAddUserDialogVisible = false
      } else {
        if (res.code) {
          this.$message.success('修改成功')
          this.manageGetPcUserList()
        } else {
          this.$message.success('修改失败，请稍后再试')
        }
        // 不管失败成功关闭弹框
        this.pcAddUserDialogVisible = false
      }
    },
    // 取消添加
    cancelAddBtn () {
      this.pcAddUserDialogVisible = false
    },
    // 初始化密码
    initPassword (id) {
      console.log(id)
      this.$confirm('确认初始化密码为123456?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const res = await this.$axios('/manInitPassword', { id }, 'POST')
        if (res.code) {
          this.$message.success('初始化成功密码为123456')
        } else {
          this.$message.error('初始化密码失败，请稍后再试')
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 修改用户，共用新增弹框
    updateUser (userMsg) {
      // 把状态改成修改
      this.addUserMsg.status = 'update'
      this.addUserMsg.userName = userMsg.userName
      this.addUserMsg.isActive = userMsg.isActive
      this.addUserMsg.role = userMsg.role
      this.pcAddUserDialogVisible = true
    }
  },
  created () {
    this.manageGetPcUserList()
  }
}
</script>

<style lang="less" scoped>
.add-user-wrap {
  width: 100%;
  .add-user-wrap-select {
    display: flex;
    flex-direction: row;
    padding-top: 30px;
    .role-radio {
      display: flex;
      flex-direction: column;
      height: 200px;
      justify-content: space-around;
      align-items: center;
      .last {
        margin-right: 30px;
      }
    }
    .is-active-radio {
      display: flex;
      flex-direction: column;
      align-items: center;
      .item {
        padding-top: 16px;
      }
      .last {
        padding-top: 34px;
        margin-right: 16px;
      }
    }
  }
}
</style>
