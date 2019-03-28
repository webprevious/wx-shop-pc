<template>
  <el-row class="system-manage">
    <tab :tabList="tabList" @currentTabChange="tabChange"></tab>
    <component :is="currentTabComponent"></component>
  </el-row>
</template>

<script>
import Tab from '@/components/Tab.vue'
import Carousel from '@/components/carousel/Carousel.vue'
import Category from '@/components/category/Category.vue'
export default {
  name: 'user-manage',
  data () {
    return {
      tabList: [
        {
          name: '轮播图管理',
          value: 'carousel'
        },
        {
          name: '物品分类管理',
          value: 'category'
        }
      ],
      // 动态组件
      currentTabComponent: 'carousel'
    }
  },
  components: {
    Tab,
    Carousel,
    Category
  },
  methods: {
    tabChange (currentTab) {
      console.log(currentTab)
      this.currentTabComponent = currentTab
    }
  }
}
</script>

<style lang="less" scoped>
.system-manage {
}
</style>
