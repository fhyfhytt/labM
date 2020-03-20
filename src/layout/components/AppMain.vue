<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <keep-alive :include="cachedViews">
        <router-view :key="key" />
      </keep-alive>
      <!-- <keep-alive>
        <router-view v-if="$route.meta.KeepAlive" :key="key" />
      </keep-alive>
      <router-view v-if="!$route.meta.KeepAlive" /> -->
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    cachedViews() {
      // console.log(this.$store.state.tagsView.cachedViews)
      return this.$store.state.tagsView.cachedViews
    },
    key() {
      return this.$route.path
    }
  }
}
</script>

<style lang="scss" scoped>
.app-main {
  /* 50= navbar  50  */
  @media screen and(min-width: 1900px) {
    min-height: calc(100% - 64px);
  }
  @media screen and(min-width: 1600px) and(max-width: 1900px) {
    min-height: calc(100% -60px);
  }
  @media screen and(min-width: 1400px) and(max-width: 1600px) {
    min-height: calc(100% - 55px);
  }
  @media screen and(min-width: 1100px) and(max-width: 1400px) {
    min-height: calc(100% - 50px);
  }
  width: 100%;
  position: relative;
  overflow: hidden;
  padding: 0 16px;
}
@media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {
  /* IE10+ specific styles go here */
  .app-main {
    width: calc(100% + 17px);
  }
}
/*样式改变代码-----------------------------------------------------*/
/* 滚动条整体部分 */
.app-main::-webkit-scrollbar {
  width: 5px;
  background-color: transparent;
}

/* 滚动条中能上下移动的小块 */
.app-main::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.45);
  border-radius: 5px;
}
/* scroll轨道背景 */
.app-main::-webkit-scrollbar-track {
  border-radius: 5px;
  background-color: transparent;
}

.fixed-header + .app-main {
  padding-top: 47px;
  background: #f1f2f3;
  @media screen and(min-width: 1900px) {
    height: calc(100% - 64px);
  }
  @media screen and(min-width: 1600px) and(max-width: 1900px) {
    height: calc(100% -60px);
  }
  @media screen and(min-width: 1400px) and(max-width: 1600px) {
    height: calc(100% - 55px);
  }
  @media screen and(min-width: 1100px) and(max-width: 1400px) {
    height: calc(100% - 50px);
  }
  overflow: auto;
}

.hasTagsView {
  .app-main {
    /* 84 = navbar + tags-view = 50 + 34 */
    background: #f1f2f3;
    @media screen and(min-width: 1900px) {
      min-height: calc(100% - 64px);
    }
    @media screen and(min-width: 1600px) and(max-width: 1900px) {
      min-height: calc(100% -60px);
    }
    @media screen and(min-width: 1400px) and(max-width: 1600px) {
      min-height: calc(100% - 55px);
    }
    @media screen and(min-width: 1100px) and(max-width: 1400px) {
      min-height: calc(100% - 50px);
    }
  }

  .fixed-header + .app-main {
    padding-top: 47px;
    overflow-x: hidden;
  }
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
