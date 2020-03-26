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
          <el-col :span="24">
            <div class="right-page-title">
              <span style="margin-left:40px;margin-right:60px;"><span style="padding-right:10px;">组织编号:</span>{{ selectedCode }}</span>
              <span style="margin-right:100px;margin-left:40px;"><span style="padding-right:10px;">组织名称:</span>{{ selectedName }}</span>
              <span><span style="padding-right:10px;">描述:</span>{{ selectedDescription }}</span>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
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
import {
  getOrgTreeNew,
  getListSelectNew
} from '@/api/userManagement.js'
import { setTreeData } from '@/utils/utils.js'
import tableManageParent from './components/tab/table.vue'
export default {
  name: '',
  components: {
    tableManageParent
  },
  data() {
    return {
      selectedCode: '', // 组织编号
      selectedName: '', // 组织名称
      selectedDescription: '', // 描述
      // selectedCodeShow: false, // 组织编号是否显示
      tableManageParent: true, // 组织管理下父级管理中心是否显示
      // orgtype: '', // 区分是否是最后一级
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
      treeName: '', // 上级管理中心名称
      treeId: '', // 上级管理中心id
      show: true,
      totalNum: 0,
      param: {
        pageSize: 10,
        pageNumber: 1
      },
      // selectData: {} // 点击tree树获取整个节点对象
      // isDel: true // 最初默认标识可以删除
      treeloading: true,
      tableloading: true
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
      getOrgTreeNew().then(response => {
        this.treeloading = false
        if (response.code === 0) {
          this.treedata = setTreeData(response.data)
          if (response.data.length > 0) {
            if (this.treeId === '') {
              this.treeId = this.treedata[0].id// 当前的Id
              this.selectedCode = this.treedata[0].code
              this.selectedName = this.treedata[0].name
              this.selectedDescription = this.treedata[0].description
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
        this.$message.error(response.msg)
      })
    },
    // 点击tree树获取table表格的数据
    getTableData() {
      getListSelectNew(this.param)
        .then(response => {
          this.tableloading = false
          if (response.code === 0) {
            this.tableData = response.data.cfList
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
    // handleGetTree() {
    //   this.getTreeData()
    // },
    // 分页掉接口
    handleGetTableData(value) {
      if (value) {
        this.tableloading = value.loading
        this.pageSize = value.pageSize
        this.pageNumber = value.pageNumber
        this.getTableData()
      }
    },
    // 点击tree树
    handleNodeClick(data) {
      console.log(data)
      this.param.parentId = data.id
      this.param.pageSize = 10
      this.param.pageNumber = 1
      this.selectedCode = data.code
      this.selectedName = data.name
      this.selectedDescription = data.description
      this.treeId = data.id

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
