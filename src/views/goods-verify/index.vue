<template>
  <div class="verify">
    <top-title :title="title"></top-title>
    <search placeholderText="请输入物品标题" @search="search"></search>
    <el-table
      stripe
      :data="tableData"
      style="width: 100%"
      class="verify-table">
      <el-table-column
        label="序号"
        align="center"
        width="80">
        <span slot-scope="scope">{{scope.$index+(page.currentPage - 1) * page.pageSize + 1}}</span>
      </el-table-column>
      <el-table-column
        label="发布日期"
        align="center">
        <span slot-scope="scope">{{scope.row.publishAt.slice(0, 10)}}</span>
      </el-table-column>
      <el-table-column
        prop="publisherId.nickName"
        label="发布者"
        align="center">
      </el-table-column>
      <el-table-column
        prop="goodsTitle"
        label="物品标题"
        align="center"
        min-width="200">
      </el-table-column>
      <el-table-column
        prop="goodsPrice"
        label="价格"
        align="center">
      </el-table-column>
      <el-table-column
        label="交易方式"
        align="center">
        <span slot-scope="scope">{{judgeBussPath(scope.row.goodsBussPath)}}</span>
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        min-width="150">
        <div slot-scope="scope" class="operator">
          <span class="update" @click="imgsDetail(scope.row.goodsPics)">查看详情</span>
          <span class="update" @click="passVerify(scope.row._id)">通过审核</span>
          <span class="delete" @click="denyVerify(scope.row._id)">退回订单</span>
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
      title="详情图片"
      :visible.sync="imgDialogVisible"
      width="30%">
      <div class="imgs-wrap">
        <img v-for="(item,index) in currentImgs" :key="index" :src="item + '!man'">
      </div>
    </el-dialog>
  </div>
</template>

<script>
import TopTitle from '@/components/TopTitle.vue'
import Search from '@/components/Search.vue'
export default {
  name: 'user-manage',
  data () {
    return {
      title: '物品审核',
      page: {
        currentPage: 1,
        pageSize: 4,
        total: 0
      },
      tableData: [],
      // 搜索关键字
      keyword: '',
      // 工具对象用于交易方式匹配中文
      bussPath: {
        byboth: '面交',
        byexpress: '邮寄',
        byself: '自提'
      },
      // 查看详情图片弹框
      imgDialogVisible: false,
      // 存储当前查看图片的url
      currentImgs: []
    }
  },
  components: {
    TopTitle,
    Search
  },
  methods: {
    // 搜索回调
    search (keyword) {
      console.log(keyword)
      this.keyword = keyword
      this.page.currentPage = 1
      this.getWaitViewList()
    },
    // 分页
    handleCurrentPageChange () {
      this.getWaitViewList()
    },
    // 获取待审核列表
    async getWaitViewList () {
      let reqData = {
        currentPage: this.page.currentPage,
        pageSize: this.page.pageSize
      }
      if (this.keyword) {
        reqData.keyword = this.keyword
      }
      const res = await this.$axios('/manGetWaitViewList', reqData)
      // console.log(res)
      if (res.code) {
        this.tableData = res.data
        this.page.total = res.total
      } else {
        this.tableData = []
        this.page.total = 0
      }
    },
    // 计算交易方式
    judgeBussPath (value) {
      let arr = value[0].split(',')
      return arr.map(item => this.bussPath[item]).join('、')
    },
    // 查看图片详情
    imgsDetail (imgs) {
      console.log(imgs)
      this.currentImgs = imgs[0].split(',')
      this.imgDialogVisible = true
    },
    // 通过审核
    passVerify (goodsId) {
      this.$confirm('确认通过审核?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        let reqData = {
          goodsId,
          goodsStatus: 'pass_verify'
        }
        const res = await this.$axios('manVerifyGoods', reqData, 'POST')
        if (res.code) {
          this.$message.success('审核成功')
          this.getWaitViewList()
        } else {
          this.$message.error('审核失败，请稍后再试！')
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '审核取消'
        })
      })
    },
    // 退回订单，审核失败
    denyVerify (goodsId) {
      this.$confirm('确认退回订单?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        let reqData = {
          goodsId,
          goodsStatus: 'not_verify'
        }
        const res = await this.$axios('manVerifyGoods', reqData, 'POST')
        if (res.code) {
          this.getWaitViewList()
          this.$message.success('退回成功')
        } else {
          this.$message.success('退回失败，请稍后再试！')
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '退回取消'
        })
      })
    }
  },
  created () {
    this.getWaitViewList()
  }
}
</script>

<style lang="less">
.verify {
  .verify-table tbody tr {
    height: 100px;
  }
  .el-dialog {
    width: 410px!important;
  }
  .imgs-wrap {
    height: 600px!important;
    margin: -33px -20px;
    overflow-y: auto;
    &::-webkit-scrollbar {
      width: 10px; /*对垂直流动条有效*/
      height: 10px; /*对水平流动条有效*/
    }
    /*定义滚动条的轨道颜色、内阴影及圆角*/
    &::-webkit-scrollbar-track{
      -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
      background-color: #fff;
      border-radius: 3px;
    }
    /*定义滑块颜色、内阴影及圆角*/
    &::-webkit-scrollbar-thumb{
      border-radius: 7px;
      -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
      background-color: #C0C4CC;
    }
    /*定义两端按钮的样式*/
    &::-webkit-scrollbar-button {
      display: none !important;
    }
    img {
      width: 400px;
    }
  }
}
</style>
