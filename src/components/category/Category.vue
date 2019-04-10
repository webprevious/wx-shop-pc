<template>
  <div class="category">
    <search placeholderText="请输入分类名" @search="search"></search>
    <el-row class="category-box">
      <el-col :span="12">
        <el-row>
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
              prop="title"
              label="分类名称"
              align="center">
            </el-table-column>
            <el-table-column
              label="激活状态"
              align="center">
              <span slot-scope="scope">{{scope.row.isActive ? '是' : '否'}}</span>
            </el-table-column>
            <el-table-column
              label="操作"
              align="center">
              <div class="operator" slot-scope="scope">
                <span class="update" @click="update(scope)">修改</span>
                <!-- <span class="delete" @click="delCarousel(scope)">删除</span> -->
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
        </el-row>
      </el-col>
      <el-col :span="12" class="category-add-update-wrap">
        <category-add-update :updateData="updateData" @updateOrAddSuccess="updateOrAddSuccess"></category-add-update>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Search from '@/components/Search.vue'
import CategoryAddUpdate from '@/components/category/CategoryAddUpdate.vue'
export default {
  name: 'category',
  data () {
    return {
      page: {
        currentPage: 1,
        pageSize: 10,
        total: 0
      },
      tableData: [],
      // 传入修改新增组件
      updateData: {},
      // 搜索关键字，搜索接口共用普通分页接口
      keyword: ''
    }
  },
  components: {
    Search,
    CategoryAddUpdate
  },
  methods: {
    // 获取分类列表
    async getCategoryList () {
      let reqData = {
        currentPage: this.page.currentPage,
        pageSize: this.page.pageSize
      }
      if (this.keyword) {
        reqData.keyword = this.keyword
      }
      const res = await this.$axios('/manageGetGoodsCateory', reqData)
      // console.log(res)
      if (res.code) {
        this.tableData = res.data
        this.page.total = res.total
      } else {
        this.tableData = []
        this.page.total = 0
      }
    },
    // 分页请求
    handleCurrentPageChange () {
      this.getCategoryList()
    },
    // 修改点击
    update (scope) {
      // console.log(scope)
      this.updateData = scope.row
    },
    // 新增或者修改成功回调
    updateOrAddSuccess () {
      this.getCategoryList()
    },
    // 搜索按钮
    search (keyword) {
      this.keyword = keyword
      this.page.currentPage = 1
      this.getCategoryList()
    }
  },
  created () {
    this.getCategoryList()
  }
}
</script>

<style lang="less" scoped>
.category {
  .category-box {
    .category-add-update-wrap {
      display: flex;
      flex-direction: row;
      justify-content: center;
      padding-top: 60px;
    }
  }
}
</style>
