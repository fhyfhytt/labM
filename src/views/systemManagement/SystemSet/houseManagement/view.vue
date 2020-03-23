<template>
  <div class="pageRow">
    <el-row>
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
      <el-col :xl="{span:21}" :lg="{span:19}" class="right-page">
        <el-row>
          <el-col>
            <div class="right-page-title">
              <el-form ref="form1" :model="formhouse" size="small" label-width="110px" class="searchform">
                <el-row>
                  <el-col :xl="{span:5}" :lg="{span:6}">
                    <el-form-item label="库房名称">
                      <el-input v-model="formhouse.name" placeholder="请输入内容" />
                    </el-form-item>
                  </el-col>
                  <el-col :xl="{span:5}" :lg="{span:6}">
                    <el-form-item label="库房类型">
                      <el-select v-model="formhouse.type" value-key="code" clearable placeholder="-请选择-">
                        <el-option v-for="item in houseClass" :key="item.code" :label="item.name" :value="item" />
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :xl="{span:5}" :lg="{span:6}">
                    <el-button v-permission="'houseSearch'" size="small" class="button-sub" style="margin-left:24px;" @click="searchHouse">查询</el-button>
                  </el-col>
                </el-row>
              </el-form>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <div class="right-page-table">
              <tableManageParent :table-loading="tableloading" :table-date="tableDate" :current-page="currentPage" :total-num="totalNum" @handleGetTableData="handleGetTableData" />
            </div>
          </el-col>
        </el-row>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import { setTreeData } from '@/utils/utils.js'
import { areaTree } from '@/api/area.js'
import { queryHouseList } from '@/api/house.js'
import common from '@/utils/common'
import tableManageParent from './components/tab/table.vue'
export default {
  name: '',
  components: {
    tableManageParent
  },
  data() {
    return {
      formhouse: { name: '', type: '' },

      defaultProps: {
        children: 'children',
        label: 'name'
      },
      houseClass: [],
      tableDate: [],
      totalNum: 0,
      currentPage: 1,
      treeloading: true,
      param: {
        pageSize: 10,
        pageNumber: 1,
        sortColumn: 'create_time',
        sortOrder: 'desc'
      },
      treedata: [],
      expandedkeys: [],
      input: '',
      tableloading: true,
      treeId: ''
      // selectData: {} // 点击tree树获取整个节点对象
      // isDel: true // 最初默认标识可以删除
    }
  },

  created() {
    common.getDictNameList({ dictName: '库房类型', dictNameIsLike: 0 }).then(res => {
      if (res.success === true) {
        this.$nextTick(() => {
          this.houseClass = res.data
        })
      } else {
        if (res.data !== '') {
          this.$message.error(res.data)
        } else {
          this.$message.error(res.msg)
        }
      }
    }).catch(res => {
      this.$message.error(res.message)
    })
  },
  mounted() {
    // 获取tree树
    this.getTreeData()
    // this.getTableData()
  },
  methods: {
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
            }
            this.param.areaId = this.treeId
            console.log(this.treeId)
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
      this.tableloading = true
      queryHouseList(this.param)
        .then(response => {
          this.tableloading = false
          if (response.code === 0) {
            this.tableDate = response.data.list instanceof Array ? response.data.list : []
            this.totalNum = Number(response.data.totalNum)
          } else {
            this.$message.error(response.msg)
          }
        })
        .catch(response => {
          this.tableloading = false
          this.$message.error(response.msg)
        })
    },
    searchHouse() {
      this.param.pageNumber = 1
      this.param.pageSize = 10
      this.currentPage = 1
      this.param = Object.assign(this.param, this.formhouse)
      this.getTableData()
    },
    // 分页掉接口
    handleGetTableData(value) {
      if (value) {
        this.param.pageSize = value.pageSize
        this.param.pageNumber = value.pageNumber
        this.currentPage = value.currentPage
      }
      this.getTableData()
    }, // 点击tree树
    handleNodeClick(data) {
      this.param.pageSize = 10
      this.param.pageNumber = 1
      this.selectedName = data.name
      this.param.areaId = data.id
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
@import '~@/styles/mixin.scss';
@import '~@/styles/variables.scss';
.searchform{
  width:100%
}
</style>

