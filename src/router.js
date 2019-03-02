import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/home'
import SystemManage from '@/views/system-manage'
import GoodsVerify from '@/views/goods-verify'
import UserManage from '@/views/user-manage'
import Upload from '@/views/upload'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/system',
      name: 'SystemManage',
      component: SystemManage
    },
    {
      path: '/goods',
      name: 'GoodsVerify',
      component: GoodsVerify
    },
    {
      path: '/user',
      name: 'UserManage',
      component: UserManage
    },
    {
      path: '/upload',
      name: 'Upload',
      component: Upload
    }
  ]
})
