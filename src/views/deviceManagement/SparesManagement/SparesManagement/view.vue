<template>
  <div class="pageRow">
    <div class="page-title">
      <el-form ref="form1" :model="filters" size="small" label-width="110px">
        <el-row>
          <el-col :xl="{span:4}" :lg="{span:6}">
            <el-form-item label="关键字：">
              <el-input v-model="filters.code" style="background:transparent" placeholder="请输入备件编码" />
            </el-form-item>
          </el-col>
          <el-col :xl="{span:4}" :lg="{span:6}">
            <el-form-item label="备件分类">
              <el-input v-model="itemTypes" placeholder="-请选择-" clearable @focus="showAddFiltersType" />
            </el-form-item>
          </el-col>
          <el-col :xl="{span:4}" :lg="{span:6}">
            <el-form-item label="所属库房：" class="selfStyle">
              <el-select v-model="filters.houseIds" popper-class="select-option" multiple filterable clearable placeholder="-请选择-">
                <el-option v-for="item in houseList" :key="item.id" :label="item.name" :value="item.id" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xl="{span:4}" :lg="{span:6}">
            <el-form-item label-width="30px">
              <el-button v-permission="'attachmentSearch'" size="small" class="button-sub" @click="searchData">查询</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="page-table">
      <div class="page-table-content">
        <div class="button-tool">
          <span class="fl">
            <el-button-group class="buttonGroup">
              <input v-show="false" id="toLeadId" type="file" accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" @change="importFile(this)">
              <el-button v-permission="'attachmentImport'" icon="iconfont icondaoru" class="firstB" @click="toLead" />
              <el-button v-permission="'attachmentExport'" icon="iconfont icondaochu" @click="exportExcel('1')" />
              <el-button v-permission="'attachmentMoudle'" icon="iconfont iconbaocunbeifen" @click="exportExcel('2')" />
            </el-button-group>
          </span>
          <span class="fr">
            <el-button v-permission="'attachmentAdd'" icon="iconfont icontianjia1" size="small" @click="handleAdd">新增</el-button>
            <el-button v-permission="'attachmentDeleteMore'" icon="iconfont iconxingzhuang1 " size="small" @click="handleDelAll">批量删除</el-button>
          </span>
        </div>
        <el-table ref="assetsParameter" v-loading="loading" :data="tableData" height="568" @row-click="selectRow" @selection-change="handleSelectRow">
          <el-table-column type="selection" width="60" />
          <el-table-column type="index" label="编号" />
          <el-table-column label="备件编码">
            <template slot-scope="scope">
              <a style="cursor:pointer;color: #01AAED;text-decoration: underline;}" @click.stop="handleEdit(scope.$index, scope.row)">{{ scope.row.code }}</a>
            </template>
          </el-table-column>
          <el-table-column prop="assetInfo.assetName" label="备件名称" />
          <el-table-column prop="assetInfo.itemType" label="备件分类" />
          <el-table-column prop="statusS" label="所属状态" />
          <el-table-column prop="houseInfo.name" label="所属库房" />
          <el-table-column prop="num" label="数量" />
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
    <!-- 导出数据 -->
    <el-table v-show="false" id="exportExcelTable" :data="tableExport">
      <el-table-column prop="assetInfo.assetNo" label="备件编码" />
      <el-table-column prop="assetInfo.assetName" label="备件名称" />
      <el-table-column prop="assetInfo.itemType" label="备件分类" />
      <el-table-column prop="statusS" label="所属状态" />
      <el-table-column prop="house" label="所属库房" />
      <el-table-column prop="num" label="数量" />
    </el-table>
    <!-- 导出数据模板 -->
    <el-table v-show="false" id="exportExcelMould" :data="tableExport">
      <el-table-column prop="code" label="操作编码" />
      <el-table-column prop="assetName" label="物资名称" />
      <el-table-column prop="itemType" label="物资分类" />
      <el-table-column prop="unitType" label="设备型号" />
      <el-table-column prop="factory" label="设备厂商" />
      <el-table-column prop="price" label="采购价(元)" />
      <el-table-column prop="status" label="物资状态" />
      <el-table-column prop="house" label="所属库房" />
      <el-table-column prop="location" label="分布位置" />
      <el-table-column prop="maintranStatus" label="维保状态" />
      <el-table-column prop="maintranDate" label="维保日期" />
      <el-table-column prop="note" label="备注" />
    </el-table>
    <div class="childrenlog">
      <!--新增/编辑界面-->
      <el-dialog v-model="addFormVisible" :title="dialogName" :close-on-click-modal="false" :visible.sync="addFormVisible" :before-close="handleClose" class="addRoleDialog" width="800px">
        <addMoudel ref="addEditRole" @reset-save-flag="resetSaveFlag" @closeAddRole="closeAddRole" @addSuccess="addSuccess" />
      </el-dialog>
      <!-- 弹出框 -->
      <el-dialog title="提示" :visible.sync="saveShow" class="baseMove">
        <confirmDialog title="关闭后所填写的数据将不会保存，是否关闭" @sureMsg="sureMsg" @confireMsg="confireMsg" />
      </el-dialog>
      <el-dialog title="批量删除" :visible.sync="confirmAllVisible" class="baseMove">
        <confirmDialog title="将同时删除该角色与权限的关系，是否删除？" @sureMsg="confirmAllBtn" @confireMsg="cancelAllBtn" />
      </el-dialog>
    </div>
    <!-- 树 -->
    <el-dialog :title="dialogName" :close-on-click-modal="false" :visible.sync="addFiltersVisible" :before-close="filterClose" width="300px">
      <addFilters ref="addFilters" :component-name="dialogName" :filters-type-id="filtersTypeId" @filterRes="filterRes" />
    </el-dialog>
  </div>
</template>
<script>
import { queryByWarehouseAsset, deleteById, importWarehouseAsset, getAllWarehouse } from '@/api/asstesManagement'
import confirmDialog from '@/views/baseComponents/baseConfirm'
import addMoudel from './components/addMoudel'
import addFilters from '../components/addFiltersType'

import FileSaver from 'file-saver'
import XLSX from 'xlsx'
export default {
  components: { addMoudel, confirmDialog, addFilters },
  data() {
    return {
      addFiltersVisible: false,
      filters: {},
      filtersTypeId: [],
      componentName: '所属区域',
      tableExport: [], // 存放模板或导出数据
      tableDataExport: [], // 导出数据
      houseList: [], // 所属库房
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
      dialogName: '新建角色',
      confirmVisible: false,
      confirmAllVisible: false,
      alertText: '是否删除 ?',
      addFlag: false, // 新增完成标识
      CloseAddFormVisible: false, // 取消新增界面
      multipleSelection: [] // 选择的table数据的对象组成的数组
    }
  },
  computed: {
    itemTypesArr: function() {
      return this.itemTypes.length > 0 ? this.itemTypes.split(',') : ''
    },
    arearArr: function() {
      return this.areas.length > 0 ? this.areas.split(',') : ''
    }
  },
  created() {
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
    // 查询--进入页面显示table表格
    // this.getList()
  },
  methods: {
    // 选择筛选条件
    showAddFiltersType() {
      this.dialogName = '资产分类选择'
      this.addFiltersVisible = true
      this.$nextTick(() => {
        this.$refs.addFilters.getAssetsTreeData()
      })
    },
    showAddFiltersArea() {
      this.dialogName = '所属区域选择'
      this.addFiltersVisible = true
      this.$nextTick(() => {
        this.$refs.addFilters.getAreaTreeData()
      })
    },
    filterClose() {
      this.addFiltersVisible = false
    },
    // 条件选择返回
    filterRes(res) {
      if (res && res.length > 0) {
        this.addFiltersVisible = false
        this.filtersTypeId = []
        const valueArr = []
        for (const value of res) {
          valueArr.push(value.name)
        }
        if (this.dialogName === '资产分类选择') {
          this.itemTypes = valueArr.join(',')
        } else {
          this.areas = valueArr.join(',')
        }
      } else {
        this.addFiltersVisible = false
      }
    },
    // 新增成功返回
    addSuccess(res) {
      this.addFormVisible = false
      this.getList()
    },
    // 未保存弹出框
    sureMsg() {
      this.saveShow = false
      this.addFormVisible = false
    },
    confireMsg(flag) {
      this.saveShow = false
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
      const param = {
        pageNum: this.pageNumber,
        pageSize: this.pageSize,
        code: this.filters.code,
        assetItemType: this.itemTypesArr,
        checkStatus: '1',
        houseIds: this.filters.houseIds
      }
      this.loading = true
      queryByWarehouseAsset(param).then(response => {
        this.loading = false
        if (response.code === 0) {
          if (response.data === '') {
            this.tableData = []
            this.totalCount = 0
          } else {
            this.tableData = response.data.assetList.map(item => {
              if (item.assetInfo === undefined) item.assetInfo = {}
              return item
            }) || []
            this.totalCount = Number(response.data.count)
          }
        } else {
          this.$message.error(response.msg)
        }
      }).catch(e => {
        this.loading = false
        this.$message.error(e.msg)
      })
      // 用于导出
      const param2 = {
        pageNum: 1,
        pageSize: 9999,
        assetName: this.filters.assetNo,
        assetItemType: this.itemTypesArr,
        checkStatus: '1',
        houseIds: this.filters.houseIds
      }
      queryByWarehouseAsset(param2).then(response => {
        if (response.code === 0) {
          this.tableDataExport = response.data.assetList.map(item => {
            if (item.assetInfo === undefined) item.assetInfo = {}
            return item
          }) || []
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
      this.dialogName = '新增资产'
      this.addFormVisible = true
      this.addFlag = false
      this.$nextTick(() => {
        this.$refs.addEditRole.addEditRoleDialog()
      })
    },
    // 取消新增
    handleClose(done) {
      if (this.saveShowFlag) {
        this.saveShow = true
      } else {
        this.saveShow = false
        this.saveShowFlag = false
        done()
        this.getList()
      }
    },
    closeAddRole() {
      this.addFormVisible = false
      this.getList()
    },
    // 关闭新增页面  是 否
    addClose() {
      this.$refs.addEditRole.clearContent()
      this.CloseAddFormVisible = false
      this.addFormVisible = false
    },
    addNoClose() {
      this.CloseAddFormVisible = false
    },
    // 批量删除确认
    confirmAllBtn() {
      this.confirmAllVisible = false
      var idList = []
      this.multipleSelection.map(item => {
        idList.push(item.id)
      })
      const params = {
        ids: idList.join(',')
      }
      deleteById(params).then(res => {
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
    // 编辑弹出编辑页面moudel框
    handleEdit(index, row) {
      var data = JSON.parse(JSON.stringify(row))
      this.dialogName = '资产详情'
      this.addFormVisible = true
      this.addFlag = true
      this.$nextTick(() => {
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
    },
    // 导入
    toLead() {
      document.getElementById('toLeadId').click()
    },

    // 导入文件
    importFile() {
      const that = this
      const formData = new window.FormData()
      const files = document.querySelector('#toLeadId').files
      formData.append('file', files[0])
      if (files.length <= 0) {
        this.$message.error('请选择导入文件')
      } else {
        importWarehouseAsset(formData).then(res => {
          if (res.code === 0) {
            that.visibleImportRole = false
            this.$message.success('导入成功, 请在备件审核中查看')
            formData.delete('file')
            return false
          } else {
            this.$message.error(res.data.msg)
          }
        }).catch(() => {
          this.$message.error('导入失败，请核对文档格式是否正确', 'error')
        })
      }
    },
    // 导出表格
    exportExcel(type) {
      let excelName = ''
      if (type === '2') {
        this.tableExport = []
        excelName = 'SparesManage_template'
      } else {
        this.tableExport = this.tableDataExport
        excelName = 'SparesManage_table'
      }
      this.$nextTick(() => {
        var wb = null
        if (type === '2') {
          wb = XLSX.utils.table_to_book(document.querySelector('#exportExcelMould'))
        } else {
          wb = XLSX.utils.table_to_book(document.querySelector('#exportExcelTable'))
        }
        var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
        try {
          FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), excelName + '.xls')
        } catch (e) { if (typeof console !== 'undefined') console.log(e, wbout) }
        return wbout
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  .el-select {width: 100%;}
  .fl {float: left;}
  .fr {float: right;}
  .qrcodeBox {
    display: flex;
    flex-wrap: wrap;
    li {
      margin: 0 10px;list-style: none;
      p {text-align: center;color: #38a4ed;font-size: 16px;margin-top: 5px;}
    }
  }
  .buttonGroup .el-button {margin-left: 0;}
  .buttonGroup .el-button.firstB {border-top-left-radius: 4px;border-bottom-left-radius: 4px;}
</style>
<style lang="scss">
  .button-tool .buttonGroup .el-button i.icondaochu {font-size: 16px;position: relative;top: -1px;}
  .selfStyle .el-select__tags {height: 32px;flex-wrap: nowrap;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;left: 4px;}
</style>

