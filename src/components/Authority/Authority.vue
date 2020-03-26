<template>
  <div />
</template>
<script>
export default {
  props: {
    titles: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      sureDioag: false
    }
  },
  methods: {
    sureClick() {
      this.sureDioag = false
      this.$store.dispatch('user/logout')
      this.$router.push(`/login`)
    },
    confireClick() {
      this.sureDioag = false
    }
  }
}
</script>
<style lang='scss'>

</style>
