<template>
  <div :class="{ 'has-logo': showLogo }">
    <!-- <logo v-if="showLogo" :collapse="isCollapse" /> -->
    <div class="bgChange">
      <el-scrollbar wrap-class="scrollbar-wrapper">
        <el-menu
          :default-active="activeMenu"
          :collapse="isCollapse"
          :text-color="variables.menuText"
          :unique-opened="true"
          :active-text-color="variables.menuActiveText"
          :collapse-transition="false"
          mode="vertical"
        >
          <sidebar-item
            v-for="route in permission_routes"
            :key="route.path"
            :item="route"
            :base-path="route.path"
          />
        </el-menu>
      </el-scrollbar>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
// import Logo from './Logo'
import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.scss'

export default {
  components: { SidebarItem },
  data() {
    return {
      defaultProps: {
        children: 'children',
        label: 'name'
      }
    }
  },
  computed: {
    ...mapGetters(['permission_routes', 'sidebar']),
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo
    },
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
    }

  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    // 树节点被点击时触发事件   div弹框隐藏

    renderContent(h, { node, data, store }) {
      if (node.level === 1) {
        // el-icon-minus
        // el-icon-plus
        return (
          <span style='flex: 1; display: flex; align-items: center; justify-content: space-between; font-size: 14px; padding-right: 8px;'>
            <span style='display:flex;'>
              <i class='tunnel'></i>
              <span>{node.label}</span>
            </span>
          </span>
        )
      } else {
        return (
          <span style='flex: 1; display: flex; align-items: center; justify-content: space-between; font-size: 14px; padding-right: 8px;'>
            <span style='margin-left:50px;'>
              <span class='childrenNode'>{node.label}</span>
            </span>
          </span>
        )
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.bgChange {
  background:linear-gradient(180deg,rgba(58,136,253,1) 0%,rgba(53,175,251,1) 100%);
  box-shadow:0px 2px 13px 0px rgba(0,0,0,0.35);
  width: 100%;
  height: 100%;
  font-size:16px;
  font-family:"PingFangSC-Medium,PingFang SC";
  font-weight:500;
  color:rgba(177,207,255,1);
  padding: 10px 0;
}

</style>
