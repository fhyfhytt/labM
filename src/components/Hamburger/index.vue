<template>
  <div style="margin: 0 40px;" @click="toggleClick">
    <i v-show="showImg" class="iconfont icontubiao1" />
    <i v-show="!showImg" class="iconfont iconjiantou1" />
  </div>
</template>

<script>
export default {
  name: 'Hamburger',
  props: {
    isActive: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      showImg: true
    }
  },
  methods: {
    toggleClick() {
      this.showImg = !this.showImg
      this.$emit('toggleClick')
    }
  }
}
</script>

<style scoped>
.hamburger {
  display: inline-block;
  vertical-align: middle;
  width: 20px;
  height: 20px;
}
.icontubiao1{
  color:#379EFC;
}
.iconfont{
  font-weight: 100
}
.hamburger.is-active {
  transform: rotate(180deg);
}
span{
  cursor: pointer;
  color:rgba(255,255,255,.4);
}
</style>
