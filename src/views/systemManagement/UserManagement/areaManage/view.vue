<template>
  <div class="pageRow">
    <el-row>
      <!--树结构-->
      <el-col :xl="{span:3}" :lg="{span:5}">
        <div class="tree-div">
          <div class="inline-div">
            <el-tree
              ref="tree"
              v-loading="treeloading"
              :data="treedata"
              node-key="id"
              default-expand-all
              :props="defaultProps"
              :highlight-current="true"
              :expand-on-click-node="false"
              @node-click="handleNodeClick"
            >
              <span slot-scope="{ node, data }" class="custom-tree-node">
                <span v-if="data.children">
                  <i class="iconfont iconzuzhi" />{{ data.name }}
                </span>
                <span v-else style="paddingLeft:16px;">
                  <i class="iconfont iconbumen" />{{ data.name }}
                </span>
              </span>
            </el-tree>
          </div>
        </div>
      </el-col>
      <!--表格-->
      <el-col :xl="{span:21}" :lg="{span:19}" class="right-page">
        <el-row>
          <el-col>
            <div class="right-page-title">
              <span style="margin-left:40px;margin-right:60px;"><span style="padding-right:10px;">编号:</span>{{ selectedCode }}</span>
              <span style="margin-right:100px;margin-left:40px;"><span style="padding-right:10px;">区域编号:</span>{{ selectedName }}</span>
              <span style="margin-right:100px;margin-left:40px;"><span style="padding-right:10px;">区域名称:</span>{{ selectedState }}</span>
              <!-- <span><span style="padding-right:10px;">描述:</span>{{ selectedDescription }}</span> -->
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <div class="right-page-table">
              <tableManageParent :show="show" :table-loading="tableloading" :table-date="tableData" :tree-id="treeId" :total-num="totalNum" @refresh="getTreeData" @handleGetTableData="handleGetTableData" />
            </div>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>

import { areaTree, queryArea } from '@/api/area.js'
import { setTreeData } from '@/utils/utils.js'
import tableManageParent from './components/tab/table.vue'

export default {
  name: '',
  components: { tableManageParent },
  data() {
    return {
      selectedState: '', // 组织状态
      selectedName: '', // 组织名称
      selectedDescription: '', // 描述
      selectedCode: '',
      orgtype: '', // 区分是否是最后一级
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
      // treeName3: '', // 三四级的上级管理中心是一个管理中心
      treeId: '', // 父ID
      show: true,
      totalNum: 0,
      param: {
        pageSize: 10,
        pageNumber: 1,
        sortColumn: 'create_time',
        sortOrder: 'desc'
      },
      treeloading: true,
      tableloading: true
      // selectData: {} // 点击tree树获取整个节点对象
      // isDel: true // 最初默认标识可以删除
    }
  },
  mounted() {
    // 获取tree树
    this.getTreeData()
  },
  methods: {
    // 获取tree树数据
    getTreeData(value) {
      if (value) {
        this.treeloading = value.loading
      }
      areaTree().then(response => {
        this.treeloading = false
        if (response.code === 0) {
          this.treedata = setTreeData(response.data)
          if (response.data.length > 0) {
            if (this.treeId === '') {
              this.treeId = this.treedata[0].id// 当前的Id
              this.selectedName = this.treedata[0].name
              this.selectedState = this.treedata[0].status
              // this.selectedDescription = this.treedata[0].description
              this.selectedCode = this.treedata[0].code
            }
            this.param.parentId = this.treeId
            this.currentNodekey = this.treeId
            this.expandedkeys.push(this.treeId)
            this.$nextTick(() => {
              this.$refs.tree.setCurrentKey(this.currentNodekey)
            })
            this.getTableData()
          }
        } else {
          this.$message.error(response.msg)
        }
      }).catch(response => {
        this.loading = false
        this.$message.error(response.message)
      })
    },
    // 点击tree树获取table表格的数据
    getTableData() {
      queryArea(this.param).then(response => {
        this.tableloading = false
        if (response.code === 0) {
          this.tableData = response.data.list
          this.totalNum = Number(response.data.count)
        }
      }).catch(response => {
        this.tableData = []
        this.totalNum = 0
        this.$message.error(response.message)
      })
    },

    // 分页掉接口
    handleGetTableData(value) {
      if (value) {
        this.tableloading = value.loading
        this.param.pageSize = value.pageSize
        this.param.pageNumber = value.pageNumber
      }
      this.getTableData()
    },
    // 点击tree树
    handleNodeClick(data) {
      this.param.pageSize = 10
      this.param.pageNumber = 1
      this.selectedName = data.name
      this.param.id = data.id
      this.selectedCode = data.code
      this.selectedState = data.status === '1' ? '启用' : '不启用'
      // this.selectedDescription = data.description
      this.treeId = data.id
      this.tableloading = true
      this.getTableData()
    }

  }
}

</script>

<style lang="scss">
  @import "~@/styles/mixin.scss";
  @import "~@/styles/variables.scss";

</style>

