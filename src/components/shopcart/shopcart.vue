<template>
  <div class="shopcart">
    <div class="content">
      <div class="content-left">
        <div class="logo-wrapper">
          <div class="logo" :class="{'highlight':totalCount>0}">
            <i class="icon-shopping_cart" :class="{'highlight':totalCount>0}"></i>
          </div>
          <div class="num" v-show="totalCount>0">{{totalCount}}</div>
        </div>
        <div class="price" :class="{'highlight':totalPrice>0}">￥{{totalPrice}}元</div>
        <div class="desc">另需配送费￥{{deliveryPrice}}元</div>
      </div>
      <div class="content-right">
        <div class="pay" :class="payClass">{{payDesc}}</div>
      </div>
    </div>
    <div class="ball-container">
      <transition-group class="drop">
        <div class="ball" v-for="ball in balls" v-show="ball.show" :key="'ball'+ parseInt(Math.random()*100)">
          <div class="inner inner-hook"></div>
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script>
export default {
  //接收从父组件传递来的数据
  props: {
    selectFoods: {
      type: Array,
      default() {
        return [
          // { price: 20, count: 2 },
        ]
      }
    },
    deliveryPrice: {
      type: Number,
      default: 0
    },
    minPrice: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      balls: [
        {
          show: false
        }, {
          show: false
        }, {
          show: false
        }, {
          show: false
        }, {
          show: false
        }
      ],
      dropBalls: []
    }
  },
  computed: {
    totalPrice() {
      let total = 0
      this.selectFoods.forEach((food) => {
        total += food.price * food.count
      })
      return total
    },
    totalCount() {
      let count = 0
      this.selectFoods.forEach((food) => {
        count += food.count
      })
      return count
    },
    payDesc() {
      if (this.totalPrice === 0) {
        return '￥' + this.minPrice + '元起送'
      } else if (this.totalPrice < this.minPrice) {
        let diff = this.minPrice - this.totalPrice
        return `还差${diff}元起送` //es6字符串拼接
      } else {
        return '去结算'
      }
    },
    payClass() {
      if (this.totalPrice >= this.minPrice) {
        return 'enough'
      } else {
        return 'not-enough'
      }
    }
  },
  methods: {
    drop(el) {
      // console.log(el)
      for (let i = 0; i < this.balls.length; i++) {
        let ball = this.balls[i]
        if (!ball.show) {
          ball.show = true
          ball.el = el
          this.dropBalls.push(ball)
          return
        }
      }
    },
    transitions: {
      drop: {
        beforeEnter(el) {
          let count = this.balls.length
          while (count--) {
            let ball = this.balls[count]
            if (ball.show) {
              let rect = ball.el.getBoundingClientRect() //获得元素距离视口上下左右的位置
              let x = rect.left - 32
              let y = -(window.innerHeight - rect.top - 22)
              el.style.display = ''
              el.style.transform = `translate3d(0,${y}px,0)`
              let inner = el.getElementsByClassName('inner-hook')[0]
              inner.style.transform = `translate3d(${x}px,0,0)`
            }
          }
        },
        enter(el) {
          /* eslint-disable no-unused-vars */
          let rf = el.offsetHeight
          this.$nextTice(() => {
            el.style.display = ''
            el.style.transform = 'translate3d(0,0,0)'
            let inner = el.getElementsByClassName('inner-hook')[0]
            inner.style.transform = 'translate3d(0,0,0)'
          })
        },
        afterEnter(el) {
          let ball = this.dropBalls.shift()
          if (ball) {
            ball.show = false
            el.style.display = 'none'
          }
        }
      }
    }
  }
}
</script>

<style lang="stylus">
  .shopcart
    position:fixed
    left:0
    bottom:0
    z-index:50
    width:100%
    height:48px
    .content
      display:flex
      background-color:#141d27
      color:rgba(255,255,255,.4)
      .content-left
        flex:1
        .logo-wrapper
          display:inline-block
          vertical-align:top
          position:relative
          top:-10px
          margin:0 4px
          padding:6px
          width:56px
          height:56px
          box-sizing:border-box
          border-radius:50%
          background:#141d27
          .num
            position:absolute
            top:0
            right:0
            width:24px
            height:16px
            line-height:16px
            text-align:center
            border-radius:16px
            font-size:9px
            font-weight:700
            color:#fff
            background:#FF1600
            box-shadow:0 4px 8px 0 rgba(0,0,0,.4)
          .logo
            width:100%
            height:100%
            border-radius:50%
            text-align:center
            background-color:#2b343c
            &.highlight
              background:rgb(0,160,220)
            .icon-shopping_cart
              font-size:24px
              color:#80858a
              line-height:44px
              &.highlight
                color:#fff
        .price
          display:inline-block
          vertical-align:top
          margin-top:12px
          margin-left:-3px //消除inline-block 4px间距
          line-height:24px
          padding-right:4px
          box-sizing:border-box
          border-right:1px solid rgba(255,255,255,.1)
          font-size:15px
          font-weight:700
          &.highlight
            color:#fff
        .desc
          display:inline-block
          vertical-align:top
          width:78px
          margin:12px 0
          margin-left:-3px //消除inline-block 4px间距
          line-height:24px
          color:rgba(255,255,255,.4)
          -webkit-text-size-adjust:none;
          font-size:10px
      .content-right
        flex:0 0 105px
        width:105px
        .pay
          height:48px
          line-height:48px
          text-align:center
          font-size:12px
          font-weight:700
          &.not-enough
            background:#2b333b
          &.enough
            background:#00b43c
            color:#fff
    .ball-container
      .drop-enter,.drop-leave-active,.drop-leave,.drop-enter-active
        transition:all .4s
      .drop-enter,
      .drop-enter-active
      .drop-leave-active
        opacity:0
      .drop-leave,

      .ball
        position:fixed
        left:32px
        bottom:22px
        z-index:200
        .inner
          width:16px
          height:16px
          border-radius:50%
          background:rgb(0,160,220)
          transition:all .4s

</style>
