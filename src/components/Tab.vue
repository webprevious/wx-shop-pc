<template>
  <div class="tab">
    <div class="tab-item" v-for="(item,index) in tabList" :key="index" @click="toggleTab(item)">
      <span :class="{'active': item.value === currentTab}">{{item.name}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'tab',
  data () {
    return {
      currentTab: this.tabList[0].value
    }
  },
  props: {
    tabList: {
      type: Array,
      required: true
    }
  },
  methods: {
    toggleTab (item) {
      // 节流当前tab
      if (this.currentTab === item.value) {
        return false
      }
      this.currentTab = item.value
      this.$emit('currentTabChange', this.currentTab)
    }
  },
  mounted () {
    console.log(this.currentTab)
  }
}
</script>

<style lang="less" scoped>
.tab {
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid #EBEEF5;
  .tab-item {
    height: 82px;
    line-height: 82px;
    width: 140px;
    text-align: center;
    cursor: pointer;
  }
  .active {
    color: #1d6abe;
    font-weight: bold;
    border-bottom: 4px solid #1d6abe;
    padding-bottom: 29px;
  }
}
</style>
