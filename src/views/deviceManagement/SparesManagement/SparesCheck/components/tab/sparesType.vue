<template>
  <div class="dialgAddform1">
    <div class="pageRow">
      <el-row>
        <el-col>
          <div class="tree-div">
            <div class="inline-div">
              <el-tree
                ref="tree"
                v-loading="treeloading"
                show-checkbox
                :data="treedata"
                node-key="id"
                default-expand-all
                :props="defaultProps"
                :highlight-current="true"
                :expand-on-click-node="false"
              >
                <span slot-scope="{ node, data }" class="custom-tree-node span-ellipsis">
                  <span v-if="data.children" :title="data.name">
                    <i class="iconfont iconzuzhi" />{{ data.name }}
                  </span>
                  <span v-else style="paddingLeft:16px;" :title="data.name">
                    <i class="iconfont iconbumen" />{{ data.name }}
                  </span>
                </span>
              </el-tree>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="dialog-footer">
      <el-button size="medium " class="button-sub" @click="getCheckedNodes">确定</el-button>
      <el-button size="medium " class="button-cancel" @click="handelsparesTypeVisible">取消</el-button>
    </div>
  </div>
</template>
<script>
import { classifyTree } from '@/api/classify.js'
import { setTreeData } from '@/utils/utils.js'
export default {
  data() {
    return {
      treedata: [], // tree树
      currentNodekey: '', // 默认高亮修改
      expandedkeys: [], // 默认高亮修改
      id: '', // 获取tree树的id
      selectTree: {}, // 获取点击tree树的的整个对象数据
      type: '', // 点击tree传参type
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      tableData: [],
      treeName: '', // 上级节点名称
      treeId: '', // 上级节点id
      treeloading: true,
      allCheckedData: [], // 所有选中节点数据
      sparesTypeVisible: false // 关闭备件分类页面
    }
  },
  mounted() {
    // 获取tree树
    this.getTreeData()
  },
  methods: {
    // 获取tree树数据
    getTreeData(value) {
      classifyTree().then(response => {
        this.treeloading = false
        if (response.code === 0) {
          this.treedata = setTreeData(response.data)
          console.log(setTreeData(response.data))
          if (response.data.length > 0) {
            if (this.treeId === '') {
              this.treeId = this.treedata[0].id// 当前的Id
            }
            this.currentNodekey = this.treeId
            this.expandedkeys.push(this.treeId)
            this.$nextTick(() => {
              this.$refs.tree.setCurrentKey(this.currentNodekey)
            })
          }
        } else {
          this.$message.error(response.msg)
        }
      }).catch(response => {
        this.loading = false
        this.$message.error(response.message)
      })
    },
    // 赋值备件分类input框
    getCheckedNodes() {
      this.allCheckedData = this.$refs.tree.getCheckedNodes() // 获取所有选中节点数据
      this.$emit('getData', this.allCheckedData)
      this.$emit('handelsparesTypeVisible')
    },
    // 取消，关闭弹框
    handelsparesTypeVisible(sparesTypeVisible) {
      this.$emit('handelsparesTypeVisible', this.sparesTypeVisible)
      this.addForm = {}
    }
  }
}
</script>
<style lang="scss">
@import '~@/styles/mixin.scss';
@import '~@/styles/variables.scss';
</style>
<style lang="scss" scoped>
  .span-ellipsis {
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .pageRow{
    height:400px;
  }
</style>
