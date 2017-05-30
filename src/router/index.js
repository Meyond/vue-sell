import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import goods from '@/components/goods/goods.vue'
import seller from '@/components/seller/seller.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'goods',
      component: goods
    },{
      path: '/',
      name: 'seller',
      component: seller
    }
  ]
})

