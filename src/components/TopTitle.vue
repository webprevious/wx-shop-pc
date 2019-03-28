<template>
  <h1 :class="{'border-bottom': isNeedBorderBottom}">{{title}}</h1>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  props: {
    title: {
      type: String,
      required: true
    },
    isNeedBorderBottom: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style lang="less" scoped>
h1 {
  height: 82px;
  padding-left: 20px;
  font-size: 28px;
  font-weight: 600;
  line-height: 82px;
  color: #333;
}
.border-bottom {
  border-bottom: 1px solid #EBEEF5;
}
</style>
