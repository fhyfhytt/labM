<template>
  <div class="registion">
    <!-- <el-tooltip class="item" popper-class="backimg" effect="dark" content="点击弹出巡检时间轴" placement="left">
      <span class="iconfont iconshouhui timeLine" @click="showTimeLine" />
    </el-tooltip> -->
    <span class="iconfont iconshouhui timeLine" title="点击弹出巡检时间轴" @click="showTimeLine" />
    <el-collapse v-model="activeNames" @change="handleChange">
      <div class="collapse show">
        <el-collapse-item name="1">
          <template slot="title">
            <i class="title-icon iconfont" :class="iconState.title1" />任务详情
            <span class="title-code">任务编号：<i>{{ conForm.code }}</i></span>
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
                <el-form-item label="任务名称：" prop="name">
                  <el-input v-model="conForm.name" disabled placeholder="请输入任务名称" />
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
                  <el-date-picker v-model="conForm.startTime" type="date" disabled placeholder="请选择开始时间" prefix-icon="iconfont iconrili" style="width:100%;" />
                </el-form-item>
              </el-col>
              <el-col :span="4" :offset="2">
                <el-form-item label="结束时间：" prop="endTime">
                  <el-date-picker v-model="conForm.endTime" type="date" disabled placeholder="请选择结束时间" prefix-icon="iconfont iconrili" style="width:100%;" />
                </el-form-item>
              </el-col>
              <el-col :span="4" :offset="3">
                <el-form-item label="责任人：" prop="principalPer">
                  <el-select v-model="conForm.principalPer" filterable remote reserve-keyword popper-class="select-option" disabled placeholder="请选择责任人">
                    <el-option v-for="item in personList" :key="item.id" :value="item.id" :label="item.name" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="4" :offset="2">
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
            <i class="title-icon iconfont" :class="iconState.title2" />巡检执行
          </template>
          <div class="table-div" style="margin: 0 56px;">
            <el-table
              ref="multipleTable"
              height="430"
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
                width="260"
                :sortable="true"
                show-overflow-tooltip
              />
              <el-table-column
                prop="mileage"
                label="位置"
                width="260"
                :sortable="true"
                show-overflow-tooltip
              />
              <el-table-column
                prop="factoryName"
                label="制造商"
                width="260"
                :sortable="true"
                show-overflow-tooltip
              />
              <el-table-column
                label="是否完成巡检"
                width="210"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  <el-button v-if="scope.row.isFinish==='0'" type="text" title="未完成" size="small">
                    <svg-icon style="font-size:16px;" icon-class="info" aria-hidden="true" />
                  </el-button>
                  <el-button v-if="scope.row.isFinish==='1'" type="text" title="已完成" size="small">
                    <svg-icon style="font-size:16px;" icon-class="success" aria-hidden="true" />
                  </el-button>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="200">
                <template slot-scope="scope">
                  <el-button type="text" title="查看明细" size="small" @click="showInfo(scope.row)"><i class="iconfont iconchakan" /></el-button>
                  <el-button type="text" title="维修" size="small" @click="repairInfo(scope.row)"><i class="iconfont iconshebeiweixiuguanli" /></el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-collapse-item>
      </div>
    </el-collapse>
    <!--添加明细弹框-->
    <el-dialog v-if="addDetailVisible" v-model="addDetailVisible" :title="titleName" :close-on-click-modal="false" :visible.sync="addDetailVisible" class="deviceAdd newAddDit" width="700px">
      <showInfo :id="detailId" @addclose="addclose" />
    </el-dialog>
    <el-drawer
      :visible.sync="drawer"
      direction="rtl"
      :show-close="false"
    >
      <el-timeline>
        <el-timeline-item
          v-for="(item, index) in optionFlows"
          :key="index"
          placement="top"
          :timestamp="item.sectionName"
        >
          <el-card>
            <p>操作人：{{ item.operator }}</p>
            <p>操作时间：{{ item.opTime }}</p>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </el-drawer>
  </div>
</template>
<script>
import common from '@/utils/common'
import { selectTaskDetail } from '@/api/projectManage'
import showInfo from './showInfo.vue'
export default {
  name: 'ShowTask',
  components: { showInfo },
  data() {
    return {
      activeNames: ['1', '2'], // 默认展开第一个面板
      iconState: {
        title1: 'iconshouhui', // 基础信息  标题图标  默认展开状态
        title2: 'iconshouhui' // 巡检清单  标题图标  默认关闭状态
      },
      addDetailVisible: false, // 添加明细 弹框是否显示
      drawer: false, // 时间轴抽屉
      // 抛洒物信息
      conForm: {
        id: '',
        code: '',
        name: '', // 计划名称
        tunId: '', // 路段
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
      // 隧道 下拉框
      tunIdList: [],
      tableData: [
        {
          'name': '1',
          'typeName': '2',
          'mileage': '3',
          'factoryName': '4',
          'isFinish': '5'
        }
      ],
      // 负责人 下拉框
      personList: [],
      // 时间轴内容
      optionFlows: [],
      detailId: '', // 查看明细传的参数
      titleName: '' // 添加明细 弹框的标题
    }
  },
  mounted() {
    this.getTunIds()
    this.getUnitList()
    this.getPersonList()
    this.selectTaskDetail()
    this.getDetailList()
  },
  methods: {
    // 根据id查询巡检信息
    selectTaskDetail() {
      const param = {
        id: this.$route.query.id
      }
      selectTaskDetail(param).then(res => {
        if (res.success) {
          this.conForm = res.data
          if (Array.isArray(res.data.sysOperateFlows)) {
            this.optionFlows = res.data.sysOperateFlows
          }
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
    // 显示与隐藏执行时间轴
    showTimeLine() {
      this.drawer = true
    },
    // 获取session中的隧道，做成下拉框
    getTunIds() {
      this.tunIdList = this.$store.state.dashord.allData.tunSelect
    },
    // 维修
    repairInfo(row) {
      this.$router.push({ path: '/projectManage/deviceRepairManage/repair', query: { tunId: this.conForm.tunId, deviceId: row.id }})
    },
    // 查看明细
    showInfo(row) {
      this.titleName = '查看明细'
      this.detailId = row.id
      this.addDetailVisible = true
    },
    // 取消添加（库内）
    addclose() {
      this.addDetailVisible = false
    },
    // 取消按钮事件
    closeTab() {
      // 获取浏览过的页
      var visitedTab = this.$store.getters.visitedViews
      // 关闭当前页  回到上一个页面
      common.closeCurrentTab(visitedTab, this.$route)
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
<style>
.backimg {
  /* background-image: url('../../../assets/tunnelTree/overbg.png') !important; */
  background-size: 100% 100% !important;
  background-color: transparent !important;
}
</style>
<style lang="scss" scoped>
@import "~@/styles/registion.scss";
.table-div {
    margin-left: 20px;
}
.timeLine {
    position: absolute;
    color: #00eeee;
    right: 16px;
    transform: rotate(-90deg);
    top: 360px;
    cursor: pointer;
}
// 右侧抽屉内的时间轴
    >>> .el-drawer.rtl {
      width: 15% !important;
      background:rgba(79,144,174,0.75);
      box-shadow:0px 3px 37px 9px rgba(0, 0, 0, 0.36);
    }
    >>> .el-timeline-item__tail {
      border-left: 2px solid #00EEEE;
    }
    >>> .el-timeline-item__node {
      border: 1px solid rgba(0,238,238,1);
      background: rgba(0,238,238,1);
    }
    >>> .el-timeline-item__timestamp {
      color: rgba(0,238,238,1);
      font-size: 14px;;
    }
    >>> .el-drawer__close-btn {
      color: rgba(255,255,255,1);
    }
    >>> .el-timeline-item {
      padding-bottom: 30px;
    }
    >>> .el-timeline-item__content {
      width: 90%;
      .el-card {
        background-color: rgba(0, 0, 0, 0.4);
        border: none;
        .el-card__body {
          padding-left: 10px;
          padding-top: 5px;
        }
        p {
          font-size: 12px;
          &:first-child {
            color: rgba(255,255,255,1);
          }
          &:last-child {
            color: rgba(255,255,255,0.4);
            margin: -10px 0 5px 0;
          }
        }
      }
    }
</style>
