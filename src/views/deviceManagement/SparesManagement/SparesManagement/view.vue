<template>
  <div class="pageRow">
    <div class="page-title">
      <el-form ref="form1" :model="filters" size="small" label-width="110px">
        <el-row>
          <el-col :xl="{span:5}" :lg="{span:6}">
            <el-form-item label="关键字：">
              <el-input v-model="filters.assetNo" style="background:transparent" placeholder="请输入角色名称" />
            </el-form-item>
          </el-col>
          <el-col :xl="{span:5}" :lg="{span:6}">
            <el-form-item label="备件分类">
              <el-input v-model="itemTypes" placeholder="-请选择-" clearable @focus="showAddFiltersType" />
            </el-form-item>
          </el-col>
          <el-col :xl="{span:5}" :lg="{span:6}">
            <el-form-item label="所属库房：">
              <el-select v-model="filters.houseIds" popper-class="select-option" multiple clearable placeholder="-请选择-">
                <el-option v-for="item in houseList" :key="item.code" :label="item.name" :value="item.name" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xl="{span:4}" :lg="{span:6}">
            <el-form-item label-width="50px">
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
            <!-- <input v-show="false" id="toLeadId" type="file" accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" @change="importf(this)"> -->
            <input v-show="false" id="toLeadId" type="file" accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" @change="importFile(this)">
            <el-button icon="attachmentImport" size="small" @click="toLead">导入</el-button>
            <el-button v-permission="'attachmentExport'" icon="iconfont " size="small" @click="exportExcel('1')">导出</el-button>
            <el-button v-permission="'attachmentMoudle'" icon="iconfont " size="small" @click="exportExcel('2')">模板</el-button>
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
              <a style="cursor:pointer;color: #01AAED;text-decoration: underline;}" @click.stop="handleEdit(scope.$index, scope.row)">{{ scope.row.assetNo }}</a>
            </template>
          </el-table-column>
          <el-table-column prop="assetName" label="备件名称" />
          <el-table-column prop="itemType" label="备件分类" />
          <el-table-column prop="status" label="所属状态" />
          <el-table-column prop="house" label="所属库房" />
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
      <el-table-column prop="no" label="资产代码" />
      <el-table-column prop="assetName" label="资产名称" />
      <el-table-column prop="itemType" label="资产分类" />
      <el-table-column prop="status" label="资产状态" />
      <el-table-column prop="factory" label="生产厂商" />
      <el-table-column prop="unitType" label="设备型号" />
      <el-table-column prop="area" label="所属区域" />
      <el-table-column prop="price" label="采购价(元)" />
      <el-table-column prop="num" label="数量" />
    </el-table>
    <!-- 导出数据模板 -->
    <el-table v-show="false" id="exportExcelMould" :data="tableExport">
      <el-table-column prop="code" label="操作编码" />
      <el-table-column prop="assetName" label="资产名称" />
      <el-table-column prop="itemType" label="资产分类" />
      <el-table-column prop="unitType" label="设备型号" />
      <el-table-column prop="factory" label="设备厂商" />
      <el-table-column prop="status" label="资产状态" />
      <el-table-column prop="area" label="所属区域" />
      <el-table-column prop="location" label="分布位置" />
      <el-table-column prop="price" label="采购价(元)" />
      <el-table-column prop="maintranStatus" label="维保状态" />
      <el-table-column prop="maintranDate" label="维保日期" />
      <el-table-column prop="note" label="备注" />
    </el-table>
    <div class="childrenlog">
      <!--新增/编辑界面-->
      <el-dialog v-model="addFormVisible" :title="dialogName" :close-on-click-modal="false" :visible.sync="addFormVisible" :before-close="handleClose" class="addRoleDialog" width="45%">
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
      <addFilters ref="addFilters" :filters-type-id="filtersTypeId" @filterRes="filterRes" />
    </el-dialog>
  </div>
</template>
<script>
import { queryByWarehouseAsset, deleteById, importExcel } from '@/api/asstesManagement'
import common from '@/utils/common'
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
      houseList: [], // 状态列表
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
    common.getDictNameList({ dictName: '所属库房', dictNameIsLike: 0 }).then(res => {
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
      this.$message.error(res.message)
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
        pageNumber: this.pageNumber,
        pageSize: this.pageSize,
        no: this.filters.no,
        itemTypes: this.itemTypesArr,
        status: this.filters.name,
        areas: this.arearArr,
        itsmUserid: localStorage.getItem('login-id'),
        checkStatus: '审核通过'
      }
      queryByWarehouseAsset(param).then(response => {
        this.loading = false
        if (response.success === true) {
          this.tableData = response.data.list || []
          this.totalCount = Number(response.data.totalNum)
        } else {
          this.$message.error(response.msg)
        }
      }).catch(e => {
        this.loading = false
        this.$message.error(e.msg)
      })
      // 用于导出
      const param2 = {
        pageNumber: 1,
        pageSize: 9999,
        no: this.filters.no,
        itemTypes: this.itemTypesArr,
        status: this.filters.name,
        areas: this.arearArr,
        itsmUserid: localStorage.getItem('login-id'),
        checkStatus: '审核通过'
      }
      queryByWarehouseAsset(param2).then(response => {
        if (response.success === true) {
          this.tableDataExport = response.data.list || []
          console.log('tableDataExport:', this.tableDataExport)
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
        // this.$refs.addEditRole.clearContent()
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
        // if (!/.(xls)$/.test(files[0].name)) {
        //   this.$message.error("导入文件格式不正确");
        // } else {
        importExcel(formData).then(res => {
          if (res.data.code === '0') {
            that.visibleImportRole = false
            this.$message.success('导入成功')
            this.getList()
          } else {
            this.$message.error(res.data.msg)
          }
        }).catch(() => {
          this.$message.error('导入失败，请核对文档格式是否正确', 'error')
        })
        // }
      }
    },

    importf(obj) {
      // const _this = this
      // // const inputDOM = this.$refs.inputer
      // _this.file = event.currentTarget.files[0];
      // var rABS = false;//是否将文件读取为二进制字符串
      // var f = _this.file;
      // var reader = new FileReader()
      // FileReader.prototype.readAsBinaryString = function(f) {
      //   var binary = ''
      //   var rABS = false // 是否将文件读取为二进制字符串
      //   var wb // 读取完成的数据
      //   var outdata
      //   var reader = new FileReader()
      //   reader.onload = function(e) {
      //     var bytes = new Uint8Array(reader.result)
      //     var length = bytes.byteLength
      //     for (var i = 0; i < length; i++) {
      //       binary += String.fromCharCode(bytes[i])
      //     }
      //     var XLSX = require('xlsx')
      //     if (rABS) {
      //       wb = XLSX.read(btoa(fixdata(binary)), { // 手动转化
      //         type: 'base64'
      //       })
      //     } else {
      //       wb = XLSX.read(binary, {
      //         type: 'binary'
      //       })
      //     }
      //     // outdata就是你想要的东西 excel导入的数据
      //     outdata = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);
      //     //excel数据再处理
      //     const arr = []
      //     outdata.map(v => {
      //       const obj = {}
      //       obj.name0 = v['资产代码']
      //       obj.name1 = v['资产名称']
      //       obj.name2 = v['资产分类']
      //       obj.name3 = v['资产状态']
      //       obj.name4 = v['生产厂商']
      //       obj.name5 = v['设备型号']
      //       obj.name6 = v['所属区域']
      //       obj.name7 = v['采购价(元)']
      //       obj.name8 = v['数量']
      //       obj.name9 = v['状态']
      //       arr.push(obj)
      //     })
      //     console.log('测试：', arr)
      //     _this.tableData = arr
      //   }
      //   reader.readAsArrayBuffer(f)
      // }
      // if (rABS) {
      //   reader.readAsArrayBuffer(f)
      // } else {
      //   reader.readAsBinaryString(f)
      // }
    },
    // 导出表格
    exportExcel(type) {
      let excelName = ''
      if (type === '2') {
        this.tableExport = []
        excelName = '资产模板'
      } else {
        this.tableExport = this.tableDataExport
        excelName = '资产台账'
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
</style>

