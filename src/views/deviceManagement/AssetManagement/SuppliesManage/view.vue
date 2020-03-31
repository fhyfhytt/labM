<template>
  <div class="pageRow">
    <el-row>
      <!--树结构-->
      <el-col :xl="{span:3}" :lg="{span:5}">
        <div class="tree-div">
          <div class="inline-div">
            <el-tree ref="tree" v-loading="treeloading" :data="treedata" node-key="id" default-expand-all :props="defaultProps" :highlight-current="true" :expand-on-click-node="false" @node-click="handleNodeClick">
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
      <!--表格-->
      <el-col :xl="{span:21}" :lg="{span:19}" class="right-page">
        <el-row>
          <el-col>
            <div class="right-page-title">
              <el-form ref="form1" :model="formSupplies" size="small" label-width="110px" :inline="true">
                <el-row>
                  <el-form-item label="关键字：">
                    <el-input v-model="formSupplies.assetName" style="background:transparent;width:150px;" placeholder="请输入物资名称" />
                  </el-form-item>
                  <el-form-item>
                    <el-button v-permission="'regionSearch'" size="small" class="button-sub" @click="searchData">查询</el-button>
                  </el-form-item>
                </el-row>
              </el-form>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <div class="right-page-table">
              <tableManageParent :show="show" :table-loading="tableloading" :supplies-type="suppliesType" :table-date="tableData" :tree-id="treeId" :total-num="totalNum" @refresh="getTreeData" @handleGetTableData="handleGetTableData" />
            </div>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { classifyTree } from '@/api/classify.js'
import { getSupplies } from '@/api/deviceManage.js'
import { setTreeData } from '@/utils/utils.js'
import tableManageParent from './components/tab/table.vue'
export default {
  name: '',
  components: {
    tableManageParent
  },
  data() {
    return {
      tableManageParent: true, // 组织管理下父级管理中心是否显示
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
      show: true,
      totalNum: 0,
      param: {
        pageSize: 10,
        pageNum: 1
      },
      treeloading: true,
      tableloading: true,
      formSupplies: {
        assetName: '' // 关键字
      },
      itemType: '', // 物资分类id
      suppliesType: '' // 物资分类名称
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
      classifyTree().then(response => {
        this.treeloading = false
        if (response.code === 0) {
          this.treedata = setTreeData(response.data)
          if (response.data.length > 0) {
            if (this.treeId === '') {
              this.treeId = this.treedata[0].id// 当前的Id
            }
            this.currentNodekey = this.treeId
            this.expandedkeys.push(this.treeId)
            this.$nextTick(() => {
              this.$refs.tree.setCurrentKey(this.currentNodekey)
            })
            this.param.itemType = this.treeId
            this.getTableData()
            this.suppliesType = this.treedata[0].name
          }
        } else {
          this.$message.error(response.msg)
        }
      }).catch(response => {
        this.loading = false
        this.$message.error(response.msg)
      })
    },

    // 点击tree树获取table表格的数据
    getTableData() {
      getSupplies(this.param)
        .then(response => {
          this.tableloading = false
          if (response.code === 0) {
            this.tableData = response.data.assetList
            this.totalNum = Number(response.data.count)
          } else {
            this.tableData = []
            this.totalNum = 0
            this.$message.error(response.msg)
          }
        })
        .catch(response => {
          this.tableData = []
          this.totalNum = 0
          this.$message.error(response.msg)
        })
    },
    // 分页掉接口
    handleGetTableData(value) {
      if (value) {
        this.tableloading = value.loading
        this.pageSize = value.pageSize
        this.pageNum = value.pageNumber
        this.getTableData()
      }
    },
    // 点击tree树
    handleNodeClick(data) {
      this.param.itemType = data.id
      this.treeId = data.id
      this.suppliesType = data.name
      this.getTableData()
    },
    // 点击查询，重新渲染数据域列表
    searchData() {
      this.currentPage = 1
      this.param = this.formSupplies
      this.getTableData()
    }
  }
}
</script>

<style lang="scss">
@import '~@/styles/mixin.scss';
@import '~@/styles/variables.scss';
.origanmanage {
  .title-content {
    margin: 1%;
    background-size: 100% 100%;
    border-radius: 5px;
    border: 1px solid #50dcf5;
    height: 50px;
    color: #fff;
    padding-top: 12px;
    font-size: 14px;
  }
  .contener {
    margin-left: 1%;
    margin-right: 1%;
    background-size: 100% 100%;
    border-radius: 5px;
    border: 1px solid #50dcf5;
    height: 735px;
  }
  // .el-tree .el-tree-node>.el-tree-node__children {
  //   overflow: none;
  // }
}
</style>

<style lang="scss" scoped>
  .span-ellipsis {
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
</style>
