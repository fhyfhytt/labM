// isRadio 是否单选默认，布尔值，false
<template>
  <div v-loading="loading">
    <el-row style="height:440px;overflow: auto;">
      <el-tree
        ref="tree"
        :data="treedata"
        show-checkbox
        default-expand-all
        node-key="id"
        highlight-current
        :check-strictly="isRadio"
        :props="defaultProps"
        @check-change="handleClick"
      />
    </el-row>
    <div style="text-align:right;margin-top:20px;">
      <el-button v-preventReClick="1000" class="button-sub" @click="getCheckedNodes">确定</el-button>
    </div>
  </div>
</template>

<script>
import { getAssetsTypeTree, getAreaTypeTree } from '@/api/asstesManagement'
import { setTreeData } from '@/utils/utils.js'
export default {
  name: 'AddFilters',
  props: {
    filtersTypeId: {
      type: Array,
      default: () => []
    },
    isRadio: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      loading: true,

      treedata: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      treeId: '', // 父ID
      addFlag: false

    }
  },
  mounted() {
    this.$refs.tree.setCheckedKeys([])
  },
  methods: {
    handleClick(data, checked, node) {
      if (checked && this.isRadio) {
        this.$refs.tree.setCheckedNodes([data])
      }
    },
    getCheckedNodes() {
      // if (this.$refs.tree.getCheckedNodes().length === 0) {
      //   this.$message.warning('所属区域不能为空')
      // }
      this.$emit('filterRes', this.$refs.tree.getCheckedNodes())
    },
    // 获取资产分类tree树数据
    getAssetsTreeData() {
      this.treedata = []
      getAssetsTypeTree().then(response => {
        this.loading = false
        if (response.code === 0) {
          this.treedata = setTreeData(response.data).slice(2, 3)
        } else {
          this.$message.error(response.msg)
        }
      }).catch(response => {
        this.loading = false
        this.$message.error(response.message)
      })
    },
    // 获取区域分类tree树数据
    getAreaTreeData() {
      this.treedata = []
      getAreaTypeTree().then(response => {
        this.loading = false
        if (response.code === 0) {
          this.treedata = setTreeData(response.data)
        } else {
          this.$message.error(response.msg)
        }
      }).catch(response => {
        this.loading = false
        this.$message.error(response.message)
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
