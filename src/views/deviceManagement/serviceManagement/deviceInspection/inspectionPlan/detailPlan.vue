<template>
  <div class="registion">
    <el-collapse v-model="activeNames" @change="handleChange">
      <div class="collapse show">
        <el-collapse-item name="1">
          <template slot="title">
            <i class="title-icon iconfont" :class="iconState.title1" />基础信息
            <span class="title-code">计划编号：<i>{{ conForm.code }}</i></span>
          </template>
          <el-form ref="form1" :model="conForm" size="small" label-width="120px">
            <el-row style="margin: 0 56px;">
              <el-col :span="4">
                <el-form-item label="所属隧道：" prop="tunId">
                  <el-select v-model="conForm.tunId" popper-class="select-option" disabled placeholder="请选择隧道">
                    <el-option v-for="item in tunIdList" :key="item.code" :value="item.code" :label="item.name" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="4" :offset="2">
                <el-form-item label="计划名称：" prop="name">
                  <el-input v-model="conForm.name" disabled placeholder="请输入计划名称" />
                </el-form-item>
              </el-col>
              <el-col :span="4" :offset="3">
                <el-form-item label="巡检单位：" prop="unit">
                  <el-select v-model="conForm.unit" popper-class="select-option" disabled placeholder="请选择巡检单位">
                    <el-option v-for="item in unitList" :key="item.code" :value="item.code" :label="item.name" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="4" :offset="2">
                <el-form-item label="巡检类型：" prop="type">
                  <el-select v-model="conForm.type" placeholder="请选择巡检类型" disabled popper-class="select-option">
                    <el-option label="日常巡检" value="0" />
                    <el-option label="定期巡检" value="1" />
                    <el-option label="专项巡检" value="2" />
                    <el-option label="其他巡检" value="3" />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row style="margin: 0 56px;">
              <el-col :span="4">
                <el-form-item label="开始时间：" prop="startTime">
                  <el-date-picker
                    v-model="conForm.startTime"
                    type="date"
                    disabled
                    value-format="yyyy-MM-dd"
                    placeholder="请选择开始时间"
                    prefix-icon="iconfont iconrili"
                    style="width:100%;"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="4" :offset="2">
                <el-form-item label="结束时间：" prop="endTime">
                  <el-date-picker
                    v-model="conForm.endTime"
                    value-format="yyyy-MM-dd"
                    type="date"
                    disabled
                    placeholder="请选择结束时间"
                    prefix-icon="iconfont iconrili"
                    style="width:100%;"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="4" :offset="3">
                <el-form-item label="巡检频次：" prop="frequency" class="unitClass">
                  <el-input-number v-model="conForm.frequency" :min="1" :max="999" disabled class="inspectNumber" />
                  <el-select v-model="conForm.frequencyUnit" placeholder="请选择频次单位" disabled popper-class="select-option">
                    <el-option label="天" value="0" />
                    <el-option label="周" value="1" />
                    <el-option label="月" value="2" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="4" :offset="2">
                <el-form-item label="责任人：" prop="principalPer">
                  <el-select v-model="conForm.principalPer" filterable remote reserve-keyword popper-class="select-option" disabled placeholder="请选择责任人">
                    <el-option v-for="item in personList" :key="item.id" :value="item.id" :label="item.name" />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row style="margin: 0 56px;">
              <el-col :span="4">
                <el-form-item label="联系电话：" prop="phone">
                  <el-input v-model="conForm.phone" disabled placeholder="请输入联系电话" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row style="margin: 0 56px;">
              <el-col :span="10">
                <el-form-item label="巡检说明：">
                  <el-input v-model="conForm.content" type="textarea" disabled placeholder="请输入巡检说明" />
                </el-form-item>
              </el-col>
              <el-col :span="10" :offset="3">
                <el-form-item label="备注：">
                  <el-input v-model="conForm.remark" type="textarea" disabled placeholder="请输入备注" />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-collapse-item>
      </div>
      <div class="collapse show">
        <el-collapse-item name="2">
          <template slot="title">
            <i class="title-icon iconfont" :class="iconState.title2" />巡检清单
          </template>
          <div class="table-div" style="margin: 0 56px;">
            <el-table
              ref="multipleTable"
              height="380"
              :data="tableData"
              tooltip-effect="light"
              style="width: 100%"
              class="tableShow"
            >
              <el-table-column
                label="序号"
                prop="id"
                width="150"
              >
                <template slot-scope="scope">{{ scope.$index + 1 }}</template>
              </el-table-column>
              <el-table-column
                prop="name"
                label="设备名称"
                :sortable="true"
                show-overflow-tooltip
              />
              <el-table-column
                prop="typeName"
                label="设备类型"
                width="360"
                :sortable="true"
                show-overflow-tooltip
              />
              <el-table-column
                prop="mileage"
                label="位置"
                width="360"
                :sortable="true"
                show-overflow-tooltip
              />
              <el-table-column
                prop="factoryName"
                label="制造商"
                width="370"
                :sortable="true"
                show-overflow-tooltip
              />
            </el-table>
          </div>
        </el-collapse-item>
      </div>
    </el-collapse>
  </div>
</template>
<script>
import common from '@/utils/common'
import { selectPatrolDetail } from '@/api/projectManage'
export default {
  name: 'DetailPlan',
  data() {
    return {
      activeNames: ['1', '2'], // 默认展开第一个面板
      iconState: {
        title1: 'iconshouhui', // 基础信息  标题图标  默认展开状态
        title2: 'iconshouhui' // 巡检清单  标题图标  默认关闭状态
      },
      addOutVisible: false, // 添加设备（库外）弹框是否显示
      addInVisible: false, // 添加设备（库内）弹框是否显示
      selectedData: [], // 表格选择行
      // 基础信息
      conForm: {
        id: '',
        code: '',
        name: '', // 计划名称
        tunId: this.$route.query.tunId, // 所属隧道
        type: '', // 巡检类型
        startTime: '', // 开始时间
        endTime: '', // 结束时间
        frequency: '', // 巡检频次
        frequencyUnit: '0', // 频次单位
        principalPer: '', // 责任人
        phone: '', // 联系电话
        content: '', // 巡检说明
        remark: '' // 备注
      },
      // 巡检单位
      unitList: [],
      unitIds: [],
      // 删除提示框
      moveShow: false,
      // 隧道 下拉框
      tunIdList: [],
      tableData: [],
      // 负责人 下拉框
      personList: [],
      titleName: '', // 添加设备（库外）弹框的标题
      tunIds: '', // （库内）弹框的tunId
      titleName2: '' // 添加设备（库内）弹框的标题
    }
  },
  mounted() {
    this.getTunIds()
    this.getUnitList()
    this.getPersonList()
    this.selectPatrolDetail()
    this.getDetailList()
  },
  methods: {
    // 根据id查询巡检信息
    selectPatrolDetail() {
      const param = {
        id: this.$route.query.id
      }
      selectPatrolDetail(param).then(res => {
        if (res.success) {
          this.conForm = res.data
        } else {
          this.$message({
            showClose: true,
            message: res.msg,
            type: 'error'
          })
        }
      }).catch(res => {
        this.$message({
          showClose: true,
          message: res.msg,
          type: 'error'
        })
      })
    },
    // 清单列表查询
    getDetailList() {
      const param = {
        connId: this.$route.query.id
      }
      common.getDetailList(param).then(res => {
        if (res.success) {
          this.tableData = res.data
        } else {
          this.$message({
            showClose: true,
            message: res.msg,
            type: 'error'
          })
        }
      }).catch(res => {
        this.$message({
          showClose: true,
          message: res.msg,
          type: 'error'
        })
      })
    },
    // 获取巡检单位
    getUnitList() {
      var unitSelect = this.$store.state.dashord.allData.unitSelect
      unitSelect.forEach(item => {
        if (item.other === '4') {
          this.unitList.push(item)
        }
      })
      unitSelect.forEach(item => {
        if (item.other === '4') {
          this.unitIds.push(item.code)
        }
      })
    },
    // 责任人下拉列表查询
    getPersonList() {
      const param = {
        ids: this.unitIds
      }
      common.selectPrincipalPer(param).then(res => {
        if (res.success) {
          this.personList = res.data
        }
      }).catch(res => {
        this.$message({
          showClose: true,
          message: res.msg,
          type: 'error'
        })
      })
    },
    // 获取session中的隧道，做成下拉框
    getTunIds() {
      this.tunIdList = this.$store.state.dashord.allData.tunSelect
    },
    // 表格选择事件
    selectionChange(val) {
      this.selectedData = val
    },
    handleChange(val) {
      if (val.indexOf('1') === -1) {
        this.iconState.title1 = 'iconxiala1'
      } else {
        this.iconState.title1 = 'iconshouhui'
      }
      if (val.indexOf('2') === -1) {
        this.iconState.title2 = 'iconxiala1'
      } else {
        this.iconState.title2 = 'iconshouhui'
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~@/styles/registion.scss";
.table-div {
    margin-left: 20px;
}
.inspectNumber {
    width: 130px;
    >>> .el-input--small .el-input__inner{
        width: 125px;
    }
    >>> .el-input-number__increase {
        background: transparent;
        color: #ffffff;
        border-left: 1px solid rgba(80,220,245,0.7);
        width: 30px;
        right: 5px;
    }
    >>> .el-input-number__decrease {
        width: 30px;
        background: transparent;
        color: #ffffff;
        border-right: 1px solid rgba(80,220,245,0.7);
    }
}
.unitClass {
    >>> .el-select.el-select--small {
        position: absolute;
        left: 132px;
        .el-input__inner {
            width: 70px;
        }
        .el-input__suffix {
            left: 40px !important;
        }
    }
}
</style>
