<template>
  <div id="home">
    <h3 class="head-title">首页</h3>
    <div class="logo">
      <img src="../../assets/img/nav/home-logo.png" class="home-img">
      <div class="logo-text">欢迎进入二手平台管理系统</div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'home'
}
</script>
<style lang="less" scoped>
#home {
  width: 100%;
  height: 100%;
  .head-title {
    height: 82px;
    padding-left: 20px;
    font-size: 28px;
    font-weight: 600;
    line-height: 82px;
    color: #333;
    border-bottom: 1px solid #d8d8d8;
  }
  .logo {
    position: absolute;
    top: 50%;
    left: 58%;
    font-size: 37px;
    transform: translate(-50%, -50%);
    .logo-text {
      padding-top: 30px;
      font-weight: 600;
      letter-spacing: 3.6px;
    }
    .home-img {
      width: 669px;
    }
  }
}
</style>
