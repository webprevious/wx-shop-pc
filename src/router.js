import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '@/views/index'
import Login from '@/views/login'
import Home from '@/views/home'
import SystemManage from '@/views/system-manage'
import GoodsVerify from '@/views/goods-verify'
import UserManage from '@/views/user-manage'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: '/',
      component: Index,
      redirect: '/home',
      children: [
        {
          path: '/home',
          name: 'Home',
          component: Home,
          meta: {
            role: ['super-admin', 'system-manage', 'goods-manage', 'user-manage']
          }
        },
        {
          path: '/system',
          name: 'SystemManage',
          component: SystemManage,
          meta: {
            role: ['super-admin', 'system-manage']
          }
        },
        {
          path: '/goods',
          name: 'GoodsVerify',
          component: GoodsVerify,
          meta: {
            role: ['super-admin', 'goods-manage']
          }
        },
        {
          path: '/user',
          name: 'UserManage',
          component: UserManage,
          meta: {
            role: ['super-admin', 'user-manage']
          }
        }
      ]
    },
    {
      path: '/login',
      component: Login,
      name: 'Login'
    }
  ]
})
