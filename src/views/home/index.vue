<template>
  <div id="home">
    <top-title :title="title"></top-title>
    <div class="logo">
      <img src="../../assets/img/nav/logo.png" class="home-img">
      <div class="logo-text">欢迎进入二手平台管理系统</div>
    </div>
  </div>
</template>
<script>
import TopTitle from '@/components/TopTitle.vue'
export default {
  name: 'home',
  data () {
    return {
      title: '首页'
    }
  },
  components: {
    TopTitle
  }
}
</script>
<style lang="less" scoped>
#home {
  width: 100%;
  height: 100%;
  .logo {
    position: absolute;
    top: 50%;
    left: 58%;
    font-size: 37px;
    transform: translate(-50%, -50%);
    .logo-text {
      padding-top: 30px;
      padding-left: 60px;
      font-weight: 600;
      letter-spacing: 8.6px;
    }
    .home-img {
      width: 669px;
    }
  }
}
</style>
