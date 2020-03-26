<template>
  <div id="tags-view-container" class="tags-view-container">
    <scroll-pane ref="scrollPane" class="tags-view-wrapper">
      <router-link v-for="tag in visitedViews" ref="tag" :key="tag.path" :class="isActive(tag)?'active':''" :to="{ path: tag.path, query: tag.query, fullPath: tag.fullPath }" tag="span" class="tags-view-item" @click.middle.native="closeSelectedTag(tag)" @contextmenu.prevent.native="openMenu(tag,$event)">
        <span style="display:inline-block;width:10px" />
        <span class="titleTag" :title="tag.title">{{ tag.title }}</span>
        <span v-if="!tag.meta.affix" class="el-icon-close" :class="isActive(tag)?'addNewClass':''" @click.prevent.stop="closeSelectedTag(tag)" /></router-link>
    </scroll-pane>
    <ul v-show="visible" :style="{left:left+'px',top:top+'px'}" class="contextmenu">
      <li @click="refreshSelectedTag(selectedTag)">
        刷新
      </li>
      <li v-if="!(selectedTag.meta&&selectedTag.meta.affix)" @click="closeSelectedTag(selectedTag)">
        关闭
      </li>
      <li @click="closeOthersTags">
        关闭其他
      </li>
      <li @click="closeAllTags(selectedTag)">
        关闭全部
      </li>
    </ul>
  </div>
</template>

<script>
import ScrollPane from './ScrollPane'
import path from 'path'
import { removeFJ } from '@/api/message'
export default {
  components: { ScrollPane },
  data() {
    return {
      visible: false,
      top: 0,
      left: 0,
      selectedTag: {},
      affixTags: []
    }
  },
  computed: {
    visitedViews() {
      return this.$store.state.tagsView.visitedViews
    },
    routes() {
      return this.$store.state.permission.routes
    }
  },
  watch: {
    $route() {
      this.addTags()
      this.moveToCurrentTag()
    },
    visible(value) {
      if (value) {
        document.body.addEventListener('click', this.closeMenu)
      } else {
        document.body.removeEventListener('click', this.closeMenu)
      }
    }
  },
  mounted() {
    this.initTags()
    this.addTags()
  },
  methods: {
    isActive(route) {
      return route.path === this.$route.path
    },
    filterAffixTags(routes, basePath = '/') {
      let tags = []
      routes.forEach(route => {
        if (route.meta && route.meta.affix) {
          const tagPath = path.resolve(basePath, route.path)
          tags.push({
            fullPath: tagPath,
            path: tagPath,
            name: route.name,
            meta: { ...route.meta }
          })
        }
        if (route.children) {
          const tempTags = this.filterAffixTags(route.children, route.path)
          if (tempTags.length >= 1) {
            tags = [...tags, ...tempTags]
          }
        }
      })
      return tags
    },
    initTags() {
      const affixTags = this.affixTags = this.filterAffixTags(this.routes)
      for (const tag of affixTags) {
        // Must have tag name
        if (tag.name) {
          this.$store.dispatch('tagsView/addVisitedView', tag)
        }
      }
    },
    addTags() {
      const { name } = this.$route
      if (name) {
        this.$store.dispatch('tagsView/addView', this.$route)
      }
      return false
    },
    moveToCurrentTag() {
      const tags = this.$refs.tag
      this.$nextTick(() => {
        for (const tag of tags) {
          if (tag.to.path === this.$route.path) {
            this.$refs.scrollPane.moveToTarget(tag)
            // when query is different then update
            if (tag.to.fullPath !== this.$route.fullPath) {
              this.$store.dispatch('tagsView/updateVisitedView', this.$route)
            }
            break
          }
        }
      })
    },
    refreshSelectedTag(view) {
      this.$store.dispatch('tagsView/delCachedView', view).then(() => {
        const { fullPath } = view
        this.$nextTick(() => {
          this.$router.replace({
            path: '/redirect' + fullPath
          })
        })
      })
    },
    closeSelectedTag(view) {
      this.$store.dispatch('tagsView/delView', view).then(({ visitedViews }) => {
        if (this.isActive(view)) {
          if (view.name === 'Sendnotice') {
            if (this.$store.state.dashord.imgIdPath.id) {
              const param = {
                'id': this.$store.state.dashord.imgIdPath.id
              }
              removeFJ(param).then(res => {
                if (res.success) {
                  console.log(1)
                  // return
                }
              }).catch(res => {
                this.$message.error(res.msg)
                return
              })
            }
            if (this.$store.state.dashord.fjIdPath.id) {
              this.$store.state.dashord.fjIdPath.id.forEach(item => {
                const param = {
                  'id': item
                }
                removeFJ(param).then(res => {
                  if (res.success) {
                  // return
                  }
                }).catch(res => {
                  this.$message.error(res.msg)
                  return
                })
              })
            }
          }
          this.toLastView(visitedViews, view)
        }
      })
    },
    closeOthersTags() {
      this.$router.push(this.selectedTag)
      this.$store.dispatch('tagsView/delOthersViews', this.selectedTag).then(() => {
        this.moveToCurrentTag()
      })
    },
    closeAllTags(view) {
      this.$store.dispatch('tagsView/delAllViews').then(({ visitedViews }) => {
        if (this.affixTags.some(tag => tag.path === view.path)) {
          return
        }
        this.toLastView(visitedViews, view)
      })
    },
    toLastView(visitedViews, view) {
      const latestView = visitedViews.slice(-1)[0]
      if (latestView) {
        this.$router.push(latestView)
      } else {
        // now the default is to redirect to the home page if there is no tags-view,
        // you can adjust it according to your needs.
        if (view.name === 'Dashboard') {
          // to reload home page
          this.$router.replace({ path: '/redirect' + view.fullPath })
        } else {
          this.$router.push('/')
        }
      }
    },
    openMenu(tag, e) {
      const menuMinWidth = 105
      const offsetLeft = this.$el.getBoundingClientRect().left // container margin left
      const offsetWidth = this.$el.offsetWidth // container width
      const maxLeft = offsetWidth - menuMinWidth // left boundary
      const left = e.clientX - offsetLeft + 15 // 15: margin right

      if (left > maxLeft) {
        this.left = maxLeft
      } else {
        this.left = left
      }
      this.top = e.clientY - 60
      this.visible = true
      this.selectedTag = tag
    },
    closeMenu() {
      this.visible = false
    }
  }
}
</script>

<style lang="scss" scoped>
.tags-view-container {
  height: 64px;
  width: 100%;
  // background: #fff;
  // border-bottom: 1px solid #d8dce5;
  // box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .12), 0 0 3px 0 rgba(0, 0, 0, .04);
  .tags-view-wrapper {
    >>> .el-scrollbar__view {
      background: #fff !important;
    }
    .tags-view-item {
      display: inline-block;
      position: relative;
      cursor: pointer;
      // width: 74px;
      margin: 0 4px;
      overflow: hidden;
      border-radius: 4px 4px 0px 0px;
      height: 38px;
      line-height: 38px;
      // border: 1px solid rgb(80,220,245);
      // color: #495060;
      background: #c1cee0;
      padding: 0 8px;
      font-size: 12px;
      // margin-left: 4px;
      margin-top: 11px;
      &:first-of-type {
        margin-left: 10px;
      }
      &:last-of-type {
        margin-right: 8px;
      }
      &.active {
        background: #379EFC;
        color: #fff;
        // border-color: #0099ff;
        .el-icon-close:hover {
          border-radius: 50%;
          background: #fff;
          color: #379EFC;
        }
      }
      &:hover {
        opacity: 0.8;
      }
      .titleTag {
        display: inline-block;
        // width: 84px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        word-break: break-all;
        font-size: 14px;
        text-align: center;
        color: #fff;
        padding: 0 10px;
      }
      span {
        &:first-of-type {
          width: 0 !important;
          display: none !important;
        }
      }
      i {
        vertical-align: top;
        width: 12px;
        height: 12px;
        display: inline-block;
        margin-top: 13px;
        margin-left: 2px;
        font-size: 14px;
      }
    }
  }
  .contextmenu {
    margin: 0;
    background: #fff;
    z-index: 3000;
    position: absolute;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
    li {
      margin: 0;
      padding: 7px 16px;
      cursor: pointer;
    }
  }
}
</style>

<style lang="scss">
//reset element css of el-icon-close
.tags-view-wrapper {
  .tags-view-item {
    .el-icon-close {
      color: #000;
      position: relative;
      width: 14px;
      height: 14px;
      vertical-align: 12px;
      text-align: center;
      transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      transform-origin: 100% 50%;
      color: #fff;
      &:before {
        transform: scale(0.6);
        display: inline-block;
        vertical-align: -3px;
        font-size: 20px;
        position: absolute;
        top: -3px;
        left: -3px;
      }
      &:hover {
        border-radius: 50%;
        background: #fff;
        color: #c1cee0;
      }
    }
  }
}
</style>
