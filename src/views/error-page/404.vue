<template>
  <div class="wscn-http404-container pageRow">
    <!-- <div class="wscn-http404"> -->
    <div class="bullshit">
      <div class="bullshit__headline">抱歉,{{ message }}</div>
      <a href="javascript:;" class="bullshit__return-home" @click="returnBefore">返回首页</a>
    </div>
    <!-- </div> -->
  </div>
</template>

<script>

export default {
  name: 'Page404',
  computed: {
    message() {
      return '你访问的页面不存在'
    }
  },
  methods: {
    returnBefore() {
      this.$router.push('/')
    }
  }
}
</script>

<style lang="scss" scoped>
.wscn-http404-container{
  min-width:calc(100% + 32px);
  margin-left: -16px;
  background-image:url('../../assets/err-picture/404_new.png');
  background-size:cover;
  background-position:50% 90%;
  position:relative;
  .bullshit {
    position: absolute;
    top: 60%;
    left: 51%;
    &__headline {
      font-size: 16px;
      line-height: 24px;
      color: #A3B1BF;
      // font-weight: bold;
      opacity: 0;
      margin-bottom: 20px;
      margin-top:10px;
      animation-name: slideUp;
      animation-duration: 0.5s;
      animation-delay: 0.1s;
      animation-fill-mode: forwards;
    }
    &__return-home {
      display: block;
      margin: 0 auto;
      width: 90px;
      height: 32px;
      background: #1482f0;
      // border-radius: 100px;
      text-align: center;
      color: #ffffff;
      opacity: 0;
      font-size: 14px;
      line-height: 32px;
      cursor: pointer;
      animation-name: slideUp;
      animation-duration: 0.5s;
      animation-delay: 0.3s;
      animation-fill-mode: forwards;
    }
    @keyframes slideUp {
      0% {
        transform: translateY(60px);
        opacity: 0;
      }
      100% {
        transform: translateY(0);
        opacity: 1;
      }
    }
  }
}
</style>
