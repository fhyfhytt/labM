<template>
  <div class="pageRow">
    <div class="page-title">
      <iframe id="ifra" ref="iframe" :src="url" frameborder="0" width="100%" height="100%" scrolling="auto" />
    </div>

  </div>

</template>

<script type="text/ecmascript-6">
export default {
  name: 'Docview',
  components: {

  },
  data() {
    return {
      url: this.$route.query.url
    }
  },
  computed: {

  },
  watch: {
  },
  mounted() {
    const iframe = document.querySelector('#ifra')
    // 处理兼容行问题
    if (iframe.attachEvent) {
      iframe.attachEvent('onload', function(e) {
        // iframe加载完毕以后执行操作
        if (e.returnValue === false) {
          this.$message.error('加载失败')
          this.$router.go(-1)
        }
      })
    } else {
      iframe.onload = function(e) {
        // iframe加载完毕以后执行操作
        if (e.returnValue === false) {
          this.$message.error('加载失败')
          this.$router.go(-1)
        }
      }
    }
  },
  methods: {

  }
}
</script>

<style scoped lang='scss'>
.page-title{
  margin-bottom: 16px;
  border-radius: 8px;
  overflow: auto;
}
</style>
