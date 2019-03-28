<template>
  <div class="carousel">
    <search placeholderText="请输入广告名" @search="search"></search>
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
        prop="adName"
        label="广告名"
        align="center">
      </el-table-column>
      <el-table-column
        label="是否在线"
        align="center">
        <span slot-scope="scope">{{scope.row.isActive ? '是' : '否'}}</span>
      </el-table-column>
      <el-table-column
        prop="goodsId"
        label="商品ID"
        align="center">
      </el-table-column>
      <el-table-column
        label="广告图"
        min-width="200"
        align="center">
        <img slot-scope="scope" class="img-ad" :src="scope.row.adImgUrl" alt="">
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
    <div class="update-add-wrap">
      <carousel-add-update :updateData="updateData" @updateOrAddSuccess="updateOrAddSuccess"></carousel-add-update>
    </div>
  </div>
</template>

<script>
import Search from '@/components/Search.vue'
import CarouselAddUpdate from '@/components/carousel/CarouselAddUpdate.vue'
export default {
  name: 'carousel',
  data () {
    return {
      page: {
        currentPage: 1,
        pageSize: 3,
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
    CarouselAddUpdate
  },
  methods: {
    // 获取轮播图列表
    async getCarouselList () {
      let reqData = {
        currentPage: this.page.currentPage,
        pageSize: this.page.pageSize
      }
      if (this.keyword) {
        reqData.keyword = this.keyword
      }
      const res = await this.$axios('/manageGetAdCarousel', reqData)
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
      this.getCarouselList()
    },
    // 点击操作列修改把数据以props传入新增修改组件
    update (scope) {
      this.updateData = scope.row
    },
    // 点击删除操作
    delCarousel (scope) {
      this.$confirm('确认删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 确定
      }).catch(err => {
        // 取消
        console.log(err)
      })
    },
    // 新增或者修改成功回调
    updateOrAddSuccess () {
      this.getCarouselList()
    },
    // 搜索按钮
    search (keyword) {
      this.keyword = keyword
      this.page.currentPage = 1
      this.getCarouselList()
    }
  },
  mounted () {
    this.getCarouselList()
  }
}
</script>

<style lang="less" scoped>
.carousel {
  // 广告图样式
  .img-ad {
    width: 200px;
    margin-top: 7px;
  }
  // 新增修改部分
  .update-add-wrap {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
}
</style>
