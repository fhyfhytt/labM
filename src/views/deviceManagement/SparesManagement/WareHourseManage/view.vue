<template>
  <div class="pageRow">
    <div class="page-title">
      <el-form ref="form1" :model="filters" size="small" label-width="110px">
        <el-row style="margin-top: 34px">
          <el-col :xl="{span:5}" :lg="{span:6}">
            <el-form-item label="关键字：">
              <el-input v-model="filters.keyword" style="background:transparent" placeholder="请输入关键字" />
            </el-form-item>
          </el-col>
          <el-col :xl="{span:5}" :lg="{span:6}">
            <el-form-item label="入库类型：">
              <el-select v-model="filters.storageType" placeholder="请选择入库类型">
                <el-option label="全部" value="" />
                <el-option v-for="item in houseType" :key="item.code" :label="item.name" :value="item.name" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xl="{span:5}" :lg="{span:6}">
            <el-form-item label="入库状态：">
              <el-select v-model="filters.inventStatus" placeholder="请选择入库状态">
                <el-option label="全部" value="" />
                <el-option v-for="item in houseStatus" :key="item.code" :label="item.name" :value="item.name" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xl="{span:5}" :lg="{span:6}">
            <el-form-item label="所属库房：">
              <el-select v-model="filters.subWareHouse" multiple clearable placeholder="-请选择所属库房-" @change="chooseHourse($event)">
                <el-option v-for="item in houseList" :key="item.id" :label="item.name" :value="item.code" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row style="margin: 24px 0 34px 0">
          <el-col :xl="{span:7}" :lg="{span:6}">
            <el-form-item label="编辑时间：">
              <el-date-picker v-model="filters.bindTime" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" />
            </el-form-item>
          </el-col>
          <el-col :xl="{span:4}" :lg="{span:6}">
            <el-form-item label-width="50px">
              <el-button v-permission="'attachmentSearch'" size="small" class="button-sub" @click="getDataList()">查询</el-button>
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
            <el-button v-permission="'attachmentDeleteMore'" icon="iconfont iconxingzhuang1 " size="small" @click="handleDelAll">批量删除</el-button>
          </span>
        </div>
        <el-table ref="assetsParameter" v-loading="loading" :data="tableData" height="568" @row-click="selectRow" @selection-change="handleSelectRow">
          <el-table-column type="selection" width="60" />
          <el-table-column type="index" label="编号" />
          <el-table-column label="入库单编码">
            <template slot-scope="scope">
              <a style="cursor:pointer;color: #01AAED;text-decoration: underline;" @click.stop="handleEdit(scope.$index, scope.row)">{{ scope.row.no }}</a>
            </template>
          </el-table-column>
          <el-table-column prop="type" label="入库类型" />
          <el-table-column prop="deliverer" label="交付人" />
          <el-table-column prop="house" label="所属库房" />
          <el-table-column prop="num" label="设备总数" />
          <el-table-column prop="status" label="入库状态" />
          <el-table-column prop="operator" label="操作人" />
          <el-table-column prop="gmtCreate" label="入库时间" />
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
      <el-dialog v-model="addFormVisible" :title="dialogName" :close-on-click-modal="false" :visible.sync="addFormVisible" :before-close="handleClose" class="addRoleDialog" width="45%" center>
        <addMoudel ref="addEditRole" :house-list="houseList" :house-type="houseType" :source-parts="Sourceparts" style="height: 628px;" @closeAddMol="closeAddMol" />
      </el-dialog>
      <el-dialog title="提示" :visible.sync="CloseAddFormVisible" class="baseMove">
        <confirmDialog title="关闭后所填写的数据将不会保存，是否关闭" @sureMsg="addClose" @confireMsg="addNoClose" />
      </el-dialog>
      <el-dialog :title="detailName" :close-on-click-modal="false" :visible.sync="isShowDetail" class="addRoleDialog" width="45%" center>
        <detailModule ref="isShowDetail" :item-ware-hourse="itemWareHourse" style="height: 600px;" @closeAddMol="closeShowDetail" />
      </el-dialog>
    </div>
  </div>
</template>
<script>
import addMoudel from './components/addMoudel'
import detailModule from './components/detailModule'
import confirmDialog from '@/views/baseComponents/baseConfirm'
import { getAllWarehouse } from '@/api/warehourse.js'
import { getTime } from '@/utils/time.js'
import { getGohousePage, deleteWarehouse } from '@/api/asstesManagement.js'
import common from '@/utils/common'
export default {
  components: {
    addMoudel, confirmDialog, detailModule
  },
  data() {
    return {
      filters: {
        keyword: '',
        storageType: '',
        inventStatus: '',
        subWareHouse: '',
        bindTime: ''
      }, // 查询参数
      houseType: [], // 入库类型
      houseStatus: [], // 入库状态
      houseList: [], // 所属库房列表
      tableData: [],
      totalCount: 0,
      pageNumber: 1,
      pageSize: 10,
      currentPage: 1, // 直接前往第几页
      addFormVisible: false, // 新增界面是否显示
      loading: false,
      dialogName: '入库新增',
      CloseAddFormVisible: false, // 关闭提示
      wareHourseParam: {
        sortColumn: 'create_time',
        sortOrder: 'desc',
        name: ''
      }, // 库房参数
      shouseId: '',
      dictCode: '',
      Sourceparts: [],
      // 入库单详情
      detailName: '入库单详情',
      isShowDetail: false,
      delList: [], // 要删除的对象
      itemWareHourse: {} // 详情数据
    }
  },
  computed: {
  },
  created() {
  },
  mounted() {
    // 查询字典表
    this.getDictName('rk_status')
    this.getDictName('rk_type')
    this.getDictName('rk_source')
    // 查询库房
    this.getWarehourse()
    this.getDataList()
  },
  methods: {
    // 查询字典表
    getDictName(param) {
      const params = {
        dictCode: param,
        dictNameIsLike: 0
      }
      common.getDictNameList(params).then((response) => {
        if (response.code === 0 && params.dictCode === 'rk_status') {
          this.houseStatus = response.data
          return
        } else if (response.code === 0 && params.dictCode === 'rk_type') {
          this.houseType = response.data
          return
        } else if (response.code === 0 && params.dictCode === 'rk_source') {
          this.Sourceparts = response.data
          return
        } else {
          this.$message.error(response.msg)
        }
      })
    },
    // 获取库房
    getWarehourse() {
      getAllWarehouse(this.wareHourseParam).then((response) => {
        if (response.code === 0) {
          this.houseList = response.data
        }
      })
    },
    chooseHourse(item) {
      console.log(item)
      // this.filters.subWareHouse = item.name
      // this.shouseId = item.id
    },
    // 查询首页数据
    getDataList() {
      let startTime, endTime
      if (this.filters.bindTime) {
        startTime = getTime(this.filters.bindTime[0].getTime(), 1)
        endTime = getTime(this.filters.bindTime[1].getTime(), 1)
      } else {
        startTime = ''
        endTime = ''
      }
      const params = {
        page: this.pageNumber,
        limit: this.pageSize,
        itsmUserid: -2,
        startTime: startTime,
        endTime: endTime,
        note: this.filters.keyword,
        type: this.filters.storageType,
        shouseId: this.shouseId,
        status: this.filters.inventStatus
      }
      getGohousePage(params).then((response) => {
        if (response.code === 0) {
          this.tableData = response.data
          this.totalCount = response.total
        }
      })
    },
    // 新增
    handleAdd() {
      this.addFormVisible = true
    },
    // 关闭新增弹框
    closeAddMol() {
      this.addFormVisible = false
      this.getDataList()
    },
    // 关闭详情弹框
    closeShowDetail() {
      this.isShowDetail = false
    },
    // 行信息
    selectRow(row, event, colomn) {
      console.log(row, event, colomn)
    },
    handleSelectRow(params) {
      this.delList = params
    },
    // 详情框弹出
    handleEdit(index, row) {
      if (row.status === '已入库') {
        this.isShowDetail = true
        this.itemWareHourse = row
      } else {
        this.addFormVisible = true
      }
    },
    // 关闭弹框
    handleClose() {
      this.CloseAddFormVisible = true
    },
    addClose() {
      this.CloseAddFormVisible = false
      this.addFormVisible = false
    },
    addNoClose() {
      this.CloseAddFormVisible = false
    },
    // 删除
    handleDelAll() {
      let delnoid = ''
      this.delList.forEach((item, i) => {
        delnoid += item.no + ','
      })
      const params = {
        nos: delnoid.substring(0, delnoid.length - 1)
      }
      deleteWarehouse(params).then((response) => {
        if (response.code === 0) {
          this.$message.success('删除成功')
          this.getDataList()
        } else {
          this.$message.error(response.msg)
        }
      })
    },
    // 分页
    handleSizeChange(val) {
      this.pageSize = val
      this.pageNumber = 1
      this.getList()
    },
    handleCurrentChange(val) {
      this.pageNumber = val
      this.getList()
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
