<template>
  <el-row class="user-manage">
    <search placeholderText="请输入用户名" :isNeedExportBtn="true" @search="search" @exportExcel="exportExcel"></search>
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
        label="注册日期"
        align="center">
        <span slot-scope="scope">{{scope.row.createAt.slice(0, 10)}}</span>
      </el-table-column>
      <el-table-column
        prop="nickName"
        label="用户名"
        align="center">
      </el-table-column>
      <el-table-column
        label="性别"
        align="center">
        <span slot-scope="scope">{{scope.row.gender === '1' ? '男' : '女'}}</span>
      </el-table-column>
      <el-table-column
        prop="country"
        label="国家"
        align="center">
      </el-table-column>
      <el-table-column
        prop="province"
        label="省份"
        align="center">
      </el-table-column>
      <el-table-column
        prop="city"
        label="市"
        align="center">
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
</template>

<script>
import Search from '@/components/Search.vue'
import XLSX from 'xlsx'
export default {
  name: 'mini-user-manage',
  data () {
    return {
      page: {
        currentPage: 1,
        pageSize: 10,
        total: 0
      },
      tableData: [],
      // 搜索关键字
      keyword: ''
    }
  },
  components: {
    Search
  },
  methods: {
    // 分页
    handleCurrentPageChange () {
      this.getUserList()
    },
    // 获取用户列表分页
    async getUserList () {
      let reqData = {
        currentPage: this.page.currentPage,
        pageSize: this.page.pageSize
      }
      if (this.keyword) {
        reqData.keyword = this.keyword
      }
      const res = await this.$axios('/manageGetUserList', reqData)
      // console.log(res)
      if (res.code) {
        this.tableData = res.data
        this.page.total = res.total
      } else {
        this.tableData = []
        this.page.total = 0
      }
    },
    // 搜索请求
    search (keyword) {
      this.keyword = keyword
      this.page.currentPage = 1
      this.page.pageSize = 10
      this.getUserList()
    },
    // 导出请求
    async exportExcel (keyword) {
      console.log(keyword)
      this.keyword = keyword
      this.page.currentPage = 1
      this.page.pageSize = 9999
      // 导出做成单独请求
      let reqData = {
        currentPage: this.page.currentPage,
        pageSize: this.page.pageSize
      }
      if (this.keyword) {
        reqData.keyword = this.keyword
      }
      const res = await this.$axios('/manageGetUserList', reqData)
      console.log(res)
      if (res.code) {
        console.log(res.data)
        let exportData = res.data
        let json = exportData.map((item, index) => {
          return {
            '序号': String(index),
            '注册日期': item.createAt,
            '用户名': item.nickName,
            '性别': item.gender === '1' ? '男' : '女',
            '国家': item.country,
            '省份': item.province,
            '市区': item.city
          }
        })
        this.downloadExl(json)
      } else {
        this.$message.error('网络错误，请稍后再试')
      }
    },
    /**
     * [downloadExl excel组装核心函数包括表格样式调整]
     * @param {Object} data 要导出的数据对象
     * @param {Object} type 类型对象
     */
    downloadExl (data, type) {
      let wopts = { bookType: 'xlsx', bookSST: true, type: 'binary' }
      let wb = { SheetNames: ['Sheet1'], Sheets: {}, Props: {} }
      data = XLSX.utils.json_to_sheet(data)
      data['!cols'] = [{ wpx: 100 }, { wpx: 160 }, { wpx: 100 }, { wpx: 100 }, { wpx: 100 }, { wpx: 100 }, { wpx: 100 }, { wpx: 100 }, { wpx: 100 }, { wpx: 100 }, { wpx: 100 }]
      wb.Sheets['Sheet1'] = data
      this.saveAs(new Blob([this.s2ab(XLSX.write(wb, wopts))], { type: 'application/octet-stream' }), '用户表' + '.' + (wopts.bookType === 'biff2' ? 'xls' : wopts.bookType))
    },
    /**
     * [s2ab excel组装辅助函数]
     * @param {Object} s
     */
    s2ab (s) {
      if (typeof ArrayBuffer !== 'undefined') {
        let buf = new ArrayBuffer(s.length)
        let view = new Uint8Array(buf)
        for (let i = 0; i !== s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF
        return buf
      } else {
        let buf = new Array(s.length)
        for (let i = 0; i !== s.length; ++i) buf[i] = s.charCodeAt(i) & 0xFF
        return buf
      }
    },
    /**
     * [saveAs excel下载辅助函数]
     * @param {Object} obj 传入的要保存的对象
     * @param {String} fileName 传入的要保存的文件的文件名
     */
    saveAs (obj, fileName) {
      let tmpa = document.createElement('a')
      tmpa.download = fileName || '下载'
      tmpa.href = URL.createObjectURL(obj)
      tmpa.click()
      setTimeout(function () {
        URL.revokeObjectURL(obj)
      }, 100)
    }
  },
  created () {
    this.getUserList()
  }
}
</script>
