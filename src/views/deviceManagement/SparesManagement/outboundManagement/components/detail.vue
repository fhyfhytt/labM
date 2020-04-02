<template>
  <div class="outHouseDetail pageRow">
    <div class="page-title">
      <el-form ref="detailForm" :model="detailForm" label-width="110px">
        <div class="minTitle">基本信息</div>
        <el-row class="dis-info">
          <el-col :span="8">
            <el-form-item label="出库单编号：">
              <span class="con-name">{{ detailForm.no }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="出库单时间：">
              <span class="con-name">{{ detailForm.createTime }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="出库单类型：">
              <span class="con-name">{{ detailForm.type }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="备件来源：">
              <span class="con-name">{{ detailForm.fromorgo }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="所属库房：">
              <span class="con-name">{{ detailForm.house }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="交付人：">
              <span class="con-name">{{ detailForm.deliverer }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="所属区域：">
              <span class="con-name">{{ detailForm.area }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="设备总数：">
              <span class="con-name">{{ detailForm.num }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="操作人：" prop="price">
              <span class="con-name">{{ detailForm.operator }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="备注：">
              <span class="con-name">{{ detailForm.note }}</span>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="page-table">
      <div class="detailTableTitle">资产列表</div>
      <div v-if="type !== '替换'" class="page-table-content">
        <el-table ref="detailTable" v-loading="loading" :data="tableData" max-height="450">
          <el-table-column type="index" label="编号" />
          <el-table-column prop="code" label="物资编码" />
          <el-table-column prop="assetName" label="物资名称" />
          <el-table-column prop="itemTypeName" label="物资分类" />
          <el-table-column prop="statusName" label="物资状态" />
          <el-table-column prop="unitType" label="设备型号" />
          <el-table-column prop="factory" label="生产厂商" />
          <el-table-column prop="num" label="数量" width="80" />
          <el-table-column v-if="type !== '领用'" prop="checkStatus" :formatter="checkStatus" label="审核状态" />
          <el-table-column v-if="type === '领用'" label="操作">
            <template slot-scope="scope">
              <i class="iconfont iconchakan- scope-caozuo" title="查看资产" @click="lookDetail(scope.row)" />
            </template>
          </el-table-column>
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
      <div v-if="type === '替换'" class="page-table-content tableStyle">
        <el-table ref="equipmentTableR" v-loading="loading" border :data="tableDataReplace" max-height="450">
          <el-table-column label="替换资产信息">
            <el-table-column type="index" label="序号" width="60" />
            <el-table-column prop="no" label="资产编号" />
            <el-table-column prop="assetName1" label="资产名称" />
            <el-table-column prop="unitType1" label="资产型号" />
            <el-table-column prop="num1" label="替换数量" />
            <el-table-column prop="status1" label="资产状态" />
          </el-table-column>
          <el-table-column label="替换备件信息">
            <el-table-column prop="assetNo2" label="替换备件编号" />
            <el-table-column prop="assetName2" label="备件名称" />
            <el-table-column prop="status2" label="备件状态" />
          </el-table-column>
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
    <!-- 查看详情 -->
    <el-dialog title="领用资产表" :close-on-click-modal="false" :visible.sync="showDetail" width="1000px">
      <receiveAssetDtail ref="receiveAssetDtail" :no="detailForm.no" :warehouse-asset-id="warehouseAssetId" />
    </el-dialog>
  </div>
</template>

<script>
import { selectByNo, selectByWarehouse, selectTHAsset } from '@/api/asstesManagement'
import receiveAssetDtail from './receiveAssetDtail'
export default {
  name: 'OutHousePage',
  components: { receiveAssetDtail },
  data() {
    return {
      totalCount: 0,
      pageNumber: 1,
      pageSize: 10,
      currentPage: 1, // 直接前往第几页
      loading: false,
      detailForm: {},
      tableData: [{}],
      tableDataReplace: [],
      type: '',
      no: '',
      showDetail: false,
      warehouseAssetId: ''

    }
  },
  mounted() {
    this.type = this.$route.query.type
    this.no = this.$route.query.no
    console.log(this.type, this.no)
    this.getBaseInfo()
    this.getAssetList()
  },
  methods: {
    checkStatus(row, column) {
      if (row.checkStatus) {
        if (row.checkStatus === '0') {
          return '未审核'
        } else if (row.checkStatus === '1') {
          return '审核通过'
        } else if (row.checkStatus === '2') {
          return '审核未通过'
        }
      }
    },
    lookDetail(row) {
      this.showDetail = true
      this.warehouseAssetId = row.id
      this.$nextTick(function() {
        this.$refs.receiveAssetDtail.getList()
      })
    },
    getBaseInfo() {
      selectByNo(this.no).then(response => {
        if (response.code === 0) {
          this.loading = false
          this.detailForm = response.data
        } else {
          this.$message.error(response.msg)
        }
      }).catch(response => {
        this.loading = false
        this.$message.error(response.msg)
      })
    },
    getAssetList() {
      const params = {
        pageSize: this.pageSize,
        pageNumber: this.pageNumber,
        no: this.no
      }
      if (this.type === '替换') {
        selectTHAsset(params).then(response => {
          if (response.code === 0) {
            this.loading = false
            this.tableDataReplace = response.data.list
            this.totalCount = Number(response.data.totalNum)
          } else {
            this.$message.error(response.msg)
          }
        }).catch(response => {
          this.loading = false
          this.$message.error(response.msg)
        })
      } else {
        selectByWarehouse(params).then(response => {
          if (response.code === 0) {
            this.loading = false
            this.tableData = response.data.list
            this.totalCount = Number(response.data.totalNum)
          } else {
            this.$message.error(response.msg)
          }
        }).catch(response => {
          this.loading = false
          this.$message.error(response.msg)
        })
      }
    },
    // 分页
    handleSizeChange(val) {
      this.pageSize = val
      this.pageNumber = 1
      this.getAssetList()
    },
    // 分页  点击哪一页跳到哪一页
    handleCurrentChange(val) {
      this.pageNumber = val
      this.getAssetList()
    }

  }
}
</script>
<style lang="scss">
  .outHouseDetail {
    .el-form-item--medium .el-form-item__label {
      line-height: 34px;
    }
    .el-form-item__content {height: 36px;}
    .el-form-item {margin-bottom: 6px;}
    .minTitle {
      margin:20px 0 10px 27px;color: #292929;padding-bottom: 10px;font-weight: bold;padding-left: 15px;position: relative;font-size: 16px;
      &::before {
        content: '';background:#379EFC;width: 4px;height: 17px;border-radius: 3px;position: absolute;left: 0;top: 0;
      }
    }
    .con-name {color: #909399;}
    .detailTableTitle {text-align: center;margin: 15px;font-size: 16px;font-weight: bold;}
    .tableStyle{
      .el-table th, .el-table th.is-leaf {border-right: 1px solid #dfe6ec;border-bottom: 1px solid #dfe6ec;}
    }
  }
</style>

