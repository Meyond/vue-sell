import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import goods from '@/components/goods/goods'
import seller from '@/components/seller/seller'
import ratings from '@/components/ratings/ratings'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
      // redirect: { name: 'goods' } 重定向
    },
    {
      path: '/goods',
      name: 'goods',
      component: goods
    },
    {
      path: '/seller',
      name: 'seller',
      component: seller
    },
    {
      path: '/ratings',
      name: 'ratings',
      component: ratings
    }
  ],
  //linkActiveClass:'active' 将.router-link-active替换位.active
})


