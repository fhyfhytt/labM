<template>
  <div :class="classObj" class="app-wrapper">
    <div class="wapper-top hidden-sm-and-down">
      <navbar v-if="device!=='mobile'" />
    </div>
    <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside" />
    <sidebar class="sidebar-container" />
    <div :class="{hasTagsView:needTagsView}" class="main-container">
      <div :class="{'fixed-header':fixedHeader}" :style="device==='mobile'?top1:top2">
        <navbar v-if="device==='mobile'" />
        <tags-view v-if="needTagsView" />
      </div>
      <app-main />
    </div>
  </div>
</template>

<script>
import { AppMain, Navbar, Sidebar, TagsView } from './components'
import ResizeMixin from './mixin/ResizeHandler'
import { mapState } from 'vuex'

export default {
  name: 'Layout',
  components: {
    AppMain,
    Navbar,
    Sidebar,
    TagsView

  },
  mixins: [ResizeMixin],
  data() {
    return {
      top1: {
        top: '0px'
      },
      top2: {
        // top: '64px'
      }
    }
  },
  computed: {
    ...mapState({
      sidebar: state => state.app.sidebar,
      device: state => state.app.device,
      showSettings: state => state.settings.showSettings,
      needTagsView: state => state.settings.tagsView,
      fixedHeader: state => state.settings.fixedHeader
    }),
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  },
  mounted() {
    // var data = {
    //   tunnelIds: ''
    // }
    // getTunnelTree(data).then(res => {
    //   this.treeData = res.data
    // })

    document.addEventListener('mouseup', function() {
      $(document).unbind('mousemove')
    }, true)
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
    }
    // ceshi() {
    //   this.$store.commit('dashord/setWarnThrees', true)
    // }
  }
}
</script>

<style lang="scss" scoped>
  @import "~@/styles/mixin.scss";
  @import "~@/styles/variables.scss";

  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;

    &.mobile.openSidebar {
      position: fixed;
      top: 0;
    }
  }
  .wapper-top{
    z-index: 999;
    width: 100%;
    position: fixed;
    background:rgba(255,255,255,1);
  }
  .drawer-bg {
    // background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 99;
  }

  .fixed-header {
    position: fixed;

    right: 0;
    z-index: 9;
    width: calc(100% - #{$sideBarWidth});
    transition: width 0.28s;
  }

  .hideSidebar .fixed-header {
    width: calc(100% - 54px)
  }

  .mobile .fixed-header {
    width: 100%;
  }

</style>
