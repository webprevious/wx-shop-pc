<template>
  <el-row>
    <tab :tabList="tabList" @currentTabChange="tabChange"></tab>
    <component :is="currentTabComponent"></component>
  </el-row>
</template>

<script>
import Tab from '@/components/Tab.vue'
import MiniUser from '@/components/MiniUser.vue'
import PcUser from '@/components/PcUser.vue'
export default {
  name: 'user-manage',
  data () {
    return {
      tabList: [
        {
          name: '小程序用户管理',
          value: 'mini-user'
        },
        {
          name: '管理端用户管理',
          value: 'pc-user'
        }
      ],
      // 动态组件
      currentTabComponent: 'mini-user'
    }
  },
  components: {
    Tab,
    MiniUser,
    PcUser
  },
  methods: {
    tabChange (currentTab) {
      this.currentTabComponent = currentTab
    }
  }
}
</script>
