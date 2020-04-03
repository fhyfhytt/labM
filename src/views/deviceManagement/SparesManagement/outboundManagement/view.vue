<template>
  <div class="pageRow">
    <div class="page-title">
      <el-form ref="form1" :model="filters" size="small" label-width="110px">
        <el-row style="margin-bottom:15px;margin-right:10px;">
          <el-col :xl="{span:5}" :lg="{span:6}">
            <el-form-item label="关键字：">
              <el-input v-model="filters.no" placeholder="请输入关键字" />
            </el-form-item>
          </el-col>
          <el-col :xl="{span:5, offset:1}" :lg="{span:6}">
            <el-form-item label="出库类型：">
              <el-select v-model="filters.type" popper-class="select-option" clearable placeholder="-请选择-">
                <el-option v-for="item in outboundTypeList" :key="item.code" :label="item.name" :value="item.code" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xl="{span:5, offset:1}" :lg="{span:6}">
            <el-form-item label="出库状态：">
              <el-select v-model="filters.status" popper-class="select-option" clearable placeholder="-请选择-">
                <el-option v-for="item in outboundStatusList" :key="item.code" :label="item.name" :value="item.name" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xl="{span:5, offset:1}" :lg="{span:6}">
            <el-form-item label="所属库房：" class="selfStyle">
              <el-select v-model="filters.houseIds" popper-class="select-option" multiple filterable clearable placeholder="-请选择-">
                <el-option v-for="item in houseList" :key="item.id" :label="item.name" :value="item.id" />
              </el-select>
            </el-form-item>
            <!-- <el-form-item label="所属库房：" class="selfStyle">
              <el-select ref="selectReport" v-model="welcomeReport.reportName" placeholder="请选择报表路径">
                <el-option :value="welcomeReport.reportId" :label="welcomeReport.reportName" style="height:200px;overflow: auto;background-color:#fff">
                  <el-tree
                    :data="data"
                    :props="defaultProps"
                    show-checkbox
                    default-expand-all
                    node-key="id"
                    highlight-current
                    @node-click="handleNodeClick"
                  />
                </el-option>
              </el-select>
            </el-form-item> -->
          </el-col>
        </el-row>
        <el-row>
          <el-col :xl="{span:9}" :lg="{span:12}" class="dateChoose">
            <el-form-item label="出库时间：">
              <el-date-picker
                v-model="filters.startTime"
                style="display: inline-block;"
                type="date"
                placeholder="选择开始日期"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                :default-value="defaultStartTime"
              />
              <span class="timeText">至</span>
              <el-date-picker
                v-model="filters.endTime"
                style="display: inline-block;"
                type="date"
                placeholder="选择结束日期"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                :default-value="defaultEndTime"
              />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label-width="10px">
              <el-button v-permission="'attachmentSearch'" size="small" class="button-sub" @click="searchData">查询</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="page-table">
      <div class="page-table-content">
        <div class="button-tool">
          <span class="fr">
            <el-button v-permission="'attachmentAdd'" icon="iconfont icontianjia1" size="small" @click="handleAdd">新增</el-button>
            <el-button v-permission="'attachmentDeleteMore'" icon="iconfont iconxingzhuang1 " size="small" @click="handleDelAll">删除</el-button>
          </span>
        </div>
        <el-table ref="assetsParameter" v-loading="loading" :data="tableData" height="568" @row-click="selectRow" @selection-change="handleSelectRow">
          <el-table-column type="selection" width="60" />
          <el-table-column type="index" label="编号" />
          <el-table-column label="出库单编号">
            <template slot-scope="scope">
              <a v-if="scope.row.status === '已出库'" style="cursor:pointer;color: #01AAED;text-decoration: underline;}" @click.stop="handleDetail(scope.$index, scope.row)">{{ scope.row.no }}</a>
              <a v-if="scope.row.status === '待出库'" style="cursor:pointer;color: #01AAED;text-decoration: underline;}" @click.stop="handleEdit(scope.$index, scope.row)">{{ scope.row.no }}</a>
            </template>
          </el-table-column>
          <el-table-column prop="type" label="出库类型" />
          <el-table-column prop="deliverer" label="交付人" />
          <el-table-column prop="house" label="所属库房" />
          <el-table-column prop="num" label="设备总数" />
          <el-table-column prop="status" label="出库状态" />
          <el-table-column prop="operator" label="操作人" />
          <el-table-column prop="createTime" label="出库时间" />
        </el-table>
        <div class="numListJup margin-jump">
          <el-pagination
            :page-size="pageSize"
            :page-sizes="[10, 20, 50, 100]"
            layout="total,sizes,prev, pager, next, jumper"
            :total="totalCount"
            :pager-count="5"
            :current-page.sync="currentPage"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
      </div>
    </div>
    <div class="childrenlog">
      <!--新增/编辑界面-->
      <el-dialog v-model="addFormVisible" :title="dialogName" :close-on-click-modal="false" :visible.sync="addFormVisible" class="addRoleDialog" width="900px">
        <addMoudel ref="addEditRole" @reset-save-flag="resetSaveFlag" @closeAddRole="closeAddRole" @addSuccess="addSuccess" />
      </el-dialog>
      <!-- 弹出框 -->
      <el-dialog title="批量删除" :visible.sync="confirmAllVisible" class="baseMove">
        <confirmDialog title="将同时删除该角色与权限的关系，是否删除？" @sureMsg="confirmAllBtn" @confireMsg="cancelAllBtn" />
      </el-dialog>
    </div>
  </div>
</template>
<script>
import { getAllWarehouse, selectOuthouse, deleteOuthouse } from '@/api/asstesManagement'
import common from '@/utils/common'
import confirmDialog from '@/views/baseComponents/baseConfirm'
import addMoudel from './components/addMoudel'
export default {
  components: { addMoudel, confirmDialog },
  data() {
    return {
      welcomeReport: {},
      addFiltersVisible: false,
      filters: { startTime: '', endTime: '', status },
      houseList: [], // 所属库房
      outboundStatusList: [], // 出库状态
      outboundTypeList: [], // 出库类型
      itemTypes: '',
      areas: '',
      tableData: [],
      totalCount: 0,
      pageNumber: 1,
      pageSize: 10,
      currentPage: 1, // 直接前往第几页
      addFormVisible: false, // 新增界面是否显示
      loading: true,

      saveShow: false, // 未保存提示
      saveShowFlag: true, // 子组件标识
      flag: true,
      dialogName: '',
      confirmAllVisible: false,
      addFlag: false, // 新增完成标识
      multipleSelection: [], // 选择的table数据的对象组成的数组
      defaultStartTime: '',
      defaultEndTime: '',
      data: [{
        id: 1,
        label: '一级 1',
        children: [{
          id: 4,
          label: '二级 1-1',
          children: [{
            id: 9,
            label: '三级 1-1-1'
          }, {
            id: 10,
            label: '三级 1-1-2'
          }]
        }]
      }, {
        id: 2,
        label: '一级 2',
        children: [{
          id: 5,
          label: '二级 2-1'
        }, {
          id: 6,
          label: '二级 2-2'
        }]
      }, {
        id: 3,
        label: '一级 3',
        children: [{
          id: 7,
          label: '二级 3-1'
        }, {
          id: 8,
          label: '二级 3-2'
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  computed: {
    itemTypesArr: function() {
      return this.itemTypes.length > 0 ? this.itemTypes.split(',') : ''
    }
  },
  created() {
    common.getDictNameList({ dictName: '出库类型', dictNameIsLike: 0 }).then(res => {
      if (res.success === true) {
        this.$nextTick(() => {
          this.outboundTypeList = res.data
        })
      } else {
        if (res.data !== '') {
          this.$message.error(res.data)
        } else {
          this.$message.error(res.msg)
        }
      }
    }).catch(res => {
      this.$message.error(res.msg)
    })
    common.getDictNameList({ dictName: '出库状态', dictNameIsLike: 0 }).then(res => {
      if (res.success === true) {
        this.$nextTick(() => {
          this.outboundStatusList = res.data
        })
      } else {
        if (res.data !== '') {
          this.$message.error(res.data)
        } else {
          this.$message.error(res.msg)
        }
      }
    }).catch(res => {
      this.$message.error(res.msg)
    })
    getAllWarehouse({}).then(res => {
      if (res.success === true) {
        this.$nextTick(() => {
          this.houseList = res.data
        })
      } else {
        if (res.data !== '') {
          this.$message.error(res.data)
        } else {
          this.$message.error(res.msg)
        }
      }
    }).catch(res => {
      this.$message.error(res.msg)
    })
    this.getList()
  },
  mounted() {
    this.getNowMonthDate()
  },
  methods: {
    // handleNodeClick: function(node) {
    //   console.log(node, 'node')
    //   if (node.children) {

    //   } else {
    //     this.welcomeReport.reportId = node.url
    //     this.welcomeReport.reportName = node.label
    //     this.$refs.selectReport.blur()
    //     console.log(this.welcomeReport.reportName, 'this.welcomeReport.reportName')
    //   }
    // },
    getNowMonthDate() {
      var date = new Date()
      var year = date.getFullYear() + ''
      var month = (date.getMonth() + 1) + ''
      // 本月第一天日期
      this.filters.startTime = year + '-' + month + '-01 00:00:00'
      // 本月最后一天日期
      var lastDateOfCurrentMonth = new Date(year, month, 0)
      this.filters.endTime = year + '-' + month + '-' + lastDateOfCurrentMonth.getDate() + ' 59:59:59'
    },
    // 新增成功返回
    addSuccess(res) {
      this.addFormVisible = false
      this.getList()
    },
    resetSaveFlag(flag) {
      if (flag === true) {
        this.saveShowFlag = true
      } else {
        this.saveShowFlag = false
      }
    },
    // 点击行选中
    selectRow(row) {
      this.$refs.assetsParameter.toggleRowSelection(row)
    },
    handleSelectRow(val) {
      this.multipleSelection = val
    },
    searchData() {
      this.pageNumber = 1
      this.pageSize = 10
      this.currentPage = 1
      this.getList()
    },
    // 查询
    getList() {
      if (this.filters.hasOwnProperty('houseIds') && this.filters['houseIds'].length === 0) {
        this.filters.houseIds = ''
      }
      const param = Object.assign({}, this.filters)
      param.pageNumber = this.pageNumber
      param.pageSize = this.pageSize
      param.itsmUserid = localStorage.getItem('login-id')
      if (param.status === '') this.$delete(param, 'status')
      this.loading = true
      selectOuthouse(param).then(response => {
        this.loading = false
        if (response.success === true) {
          this.tableData = response.data.list
          this.totalCount = Number(response.data.totalNum)
        } else {
          this.$message.error(response.msg)
        }
      }).catch(e => {
        this.loading = false
        this.$message.error(e.msg)
      })
    },
    // 点击新增弹出新增页面moudel框
    handleAdd() {
      this.dialogName = '新增出库单'
      this.addFormVisible = true
      this.addFlag = false
      this.$nextTick(() => {
        this.$refs.addEditRole.addEditRoleDialog()
      })
    },
    closeAddRole() {
      this.addFormVisible = false
      this.getList()
    },
    // 批量删除确认
    confirmAllBtn() {
      this.confirmAllVisible = false
      var idList = []
      this.multipleSelection.map(item => {
        idList.push(item.id)
      })
      const params = {
        ids: idList
      }
      deleteOuthouse(params).then(res => {
        if (res.success === true) {
          this.$message.success('删除成功')
          this.getList()
        } else {
          this.$message.error(res.msg)
        }
      }).catch(e => {})
    },
    cancelAllBtn() {
      this.confirmAllVisible = false
    },
    // 出库单详情
    handleDetail(index, row) {
      this.$router.push({
        path: '/deviceManagement/sparesManagement/outboundDetail',
        query: {
          type: row.type,
          no: row.no
        }
      })
    },
    // 编辑弹出编辑页面moudel框
    handleEdit(index, row) {
      var data = JSON.parse(JSON.stringify(row))
      this.dialogName = '出库单编辑'
      this.addFormVisible = true
      this.addFlag = true
      this.$nextTick(function() {
        this.$refs.addEditRole.addEditRoleDialog(data)
      })
    },
    // 批量删除
    handleDelAll() {
      if (this.multipleSelection.length === 0) {
        this.$message.error('请至少选择一条数据')
      } else {
        this.confirmAllVisible = true
      }
    },
    // 分页
    handleSizeChange(val) {
      this.pageSize = val
      this.pageNumber = 1
      this.getList()
    },
    // 分页  点击哪一页跳到哪一页
    handleCurrentChange(val) {
      this.pageNumber = val
      this.getList()
    }
  }
}
</script>
<style lang="scss" scoped>
  .dateChoose {
    .timeText {display: inline-block;width: 20px;text-align: center;}
    .el-input {width: calc(50% - 24px);}
  }
  .el-select {width: 100%;}
</style>
<style lang="scss">
  .selfStyle .el-select__tags {height: 32px;flex-wrap: nowrap;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;left: 4px;}
</style>

