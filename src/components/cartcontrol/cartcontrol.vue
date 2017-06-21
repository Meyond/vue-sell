<template>
  <div class="cartcontrol">
    <transition name="move" mode="">
      <div class="cart-decrease icon-remove_circle_outline" v-show="food.count>0" @click="decreaseCart">

      </div>
    </transition>
    <div class="cart-count" v-show="food.count>0">
      {{food.count}}
    </div>
    <div class="cart-add icon-add_circle" @click="addCart">

    </div>
  </div>
</template>

<script>
import Vue from 'vue'
export default {
  props: {
    food: {
      type: Object
    }
  },
  created() {

  },
  methods: {
    addCart(event) {
      if (!event._constructed) {
        return //过滤原生点击事件，防止重复执行
      }
      if (!this.food.count) {
        Vue.set(this.food, 'count', 1)
        // this.food.count = 1
        console.log(event.type)
      } else {
        this.food.count++
      }
      //触发父组件中的cartAdd方法，并传递事件对象
      this.$emit('cartAdd', event.target)
    },
    decreaseCart() {
      if (!event._constructed) {
        return
      }
      if (this.food.count) {
        this.food.count--
      }
    }

  }
}
</script>

<style lang="stylus">
  .cartcontrol
    font-size:0
    .move-enter,.move-enter-active,.move-leave-active,.move-leave
      transition:all .3s linear
    .move-enter,.move-leave-active
      opacity:0
      transform:translate3d(24px,0,0)
    .move-enter-active,.move-leave
      opacity:1
    .cart-decrease,.cart-add
      display:inline-block
      font-size:24px
      line-height:24px
      padding:6px
      color:rgb(0,160,220)
    .cart-decrease
      display:inline-block
    .cart-count
      display:inline-block
      vertical-align:top
      width:12px
      padding-top:6px
      line-height:24px
      text-align:center
      font-size:10px
      color:rgb(147,153,159)
    .cart-add
      display:inline-block
</style>
