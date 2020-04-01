<template>
  <div class="registion">
    <el-collapse v-model="activeNames" @change="handleChange">
      <div class="collapse show">
        <el-collapse-item name="1">
          <template slot="title">
            <i class="title-icon iconfont" :class="iconState.title1" />基础信息
            <span class="title-code">任务编号：<i>{{ conForm.code }}</i></span>
          </template>
          <el-form ref="form1" :model="conForm" :rules="rules1" size="small" label-width="120px">
            <el-row style="margin: 0 56px;">
              <el-col :span="4">
                <el-form-item label="所属隧道：" prop="tunId">
                  <el-select v-model="conForm.tunId" popper-class="select-option" clearable placeholder="请选择隧道">
                    <el-option v-for="item in tunIdList" :key="item.code" :value="item.code" :label="item.name" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="4" :offset="2">
                <el-form-item label="任务名称：" prop="name" :rules="filter_rules({required:true, maxLength:30, name: '任务名称'})">
                  <el-autocomplete
                    v-model="conForm.name"
                    popper-class="select-option"
                    clearable
                    :fetch-suggestions="querySearch"
                    placeholder="请输入任务名称"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="4" :offset="3">
                <el-form-item label="巡检单位：" prop="unit">
                  <el-select v-model="conForm.unit" popper-class="select-option" clearable placeholder="请选择巡检单位">
                    <el-option v-for="item in unitList" :key="item.code" :value="item.code" :label="item.name" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="4" :offset="2">
                <el-form-item label="巡检类型：" prop="type">
                  <el-select v-model="conForm.type" placeholder="请选择巡检类型" clearable popper-class="select-option">
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
                    placeholder="请选择开始时间"
                    value-format="yyyy-MM-dd"
                    prefix-icon="iconfont iconrili"
                    style="width:100%;"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="4" :offset="2">
                <el-form-item label="结束时间：" prop="endTime">
                  <el-date-picker
                    v-model="conForm.endTime"
                    type="date"
                    placeholder="请选择结束时间"
                    value-format="yyyy-MM-dd"
                    prefix-icon="iconfont iconrili"
                    style="width:100%;"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="4" :offset="3">
                <el-form-item label="责任人：" prop="principalPer">
                  <el-select v-model="conForm.principalPer" filterable remote reserve-keyword popper-class="select-option" clearable placeholder="请选择责任人" @change="getPhone">
                    <el-option v-for="item in personList" :key="item.id" :value="item.id" :label="item.name" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="4" :offset="2">
                <el-form-item label="联系电话：" prop="phone">
                  <el-input v-model="conForm.phone" clearable placeholder="请输入联系电话" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row style="margin: 0 56px;">
              <el-col :span="10">
                <el-form-item label="巡检说明：" prop="content" :rules="filter_rules({maxLength:100, name: '巡检说明'})">
                  <el-input v-model="conForm.content" type="textarea" clearable placeholder="请输入巡检说明" />
                </el-form-item>
              </el-col>
              <el-col :span="10" :offset="3">
                <el-form-item label="备注：" prop="remark" :rules="filter_rules({maxLength:100, name: '备注'})">
                  <el-input v-model="conForm.remark" type="textarea" clearable placeholder="请输入备注" />
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
          <div class="button-tool" style="margin: 0 32px;">
            <el-button icon="iconfont icontianjiaruzhishiku" size="small" @click="addDeviceIn">添加设备（库内）</el-button>
            <el-button icon="iconfont iconxinzeng" size="small" @click="addDeviceOut">添加设备（库外）</el-button>
            <el-button icon="iconfont iconshanchu" size="small" @click="delDevice">批量删除</el-button>
          </div>
          <div class="table-div" style="margin: 0 56px;">
            <el-table
              ref="multipleTable"
              height="340"
              :data="tableData"
              tooltip-effect="light"
              style="width: 100%"
              class="tableShow"
              @selection-change="selectionChange"
            >
              <el-table-column
                type="selection"
                width="55"
              />
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
                width="350"
                :sortable="true"
                show-overflow-tooltip
              />
              <el-table-column
                prop="mileage"
                label="位置"
                width="350"
                :sortable="true"
                show-overflow-tooltip
              />
              <el-table-column
                prop="factoryName"
                label="制造商"
                width="350"
                :sortable="true"
                show-overflow-tooltip
              />
            </el-table>
          </div>
        </el-collapse-item>
      </div>
    </el-collapse>
    <div class="submit-div">
      <el-button v-preventReClick class="button-sub" size="small" @click.prevent="onSubmit">提交</el-button>
      <el-button class="button-cancle" size="small" @click="closeTab">取消</el-button>
    </div>
    <!--添加设备（库外）弹框-->
    <el-dialog v-if="addOutVisible" v-model="addOutVisible" :title="titleName" :close-on-click-modal="false" :visible.sync="addOutVisible" class="deviceAdd newAddDit" width="540px">
      <addDeviceOut style="height:270px;" @addclose="addOutclose" @addListOut="addListOut" />
    </el-dialog>
    <!--添加设备（库内）弹框-->
    <el-dialog v-if="addInVisible" v-model="addInVisible" :title="titleName2" :close-on-click-modal="false" :visible.sync="addInVisible" class="deviceAdd newAddDit" width="700px">
      <addDeviceIn style="height:450px;" :tun-id="tunIds" :dev-fac-ids="devFacIds" @addclose="addInclose" @addList="addList" />
    </el-dialog>
    <el-dialog title="删除" :visible.sync="moveShow" class="baseMove">
      <removeDialog @sureMsg="sureMsg" @confireMsg="confireMsg" />
    </el-dialog>
  </div>
</template>
<script>
import common from '@/utils/common'
import { insertTask, selectPatrolTaskName } from '@/api/projectManage'
import addDeviceOut from './addDeviceOut.vue'
import addDeviceIn from './addDeviceIn.vue'
import removeDialog from '@/views/baseComponents/baseRemove'
export default {
  name: 'AddTask',
  components: { addDeviceOut, addDeviceIn, removeDialog },
  data() {
    return {
      activeNames: ['1', '2'], // 默认展开第一个面板
      iconState: {
        title1: 'iconshouhui', // 基础信息  标题图标  默认展开状态
        title2: 'iconshouhui' // 巡检清单  标题图标  默认关闭状态
      },
      addOutVisible: false, // 添加设备（库外）弹框是否显示
      addInVisible: false, // 添加设备（库内）弹框是否显示
      // 抛洒物信息
      conForm: {
        id: '',
        code: '',
        name: '', // 计划名称
        tunId: '', // 所属隧道
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
      tableData: [],
      devFacIds: [],
      selectedData: [], // 表格选择行
      // 删除提示框
      moveShow: false,
      // 负责人 下拉框
      personList: [],
      restaurants: [], // 任务名称下拉框
      titleName: '', // 添加设备（库外）弹框的标题
      titleName2: '', // 添加设备（库内）弹框的标题
      rules1: {
        tunId: [{ required: true, message: '请选择所属隧道', trigger: 'blur' }],
        name: [{ required: true, message: '请输入计划名称', trigger: 'blur' }],
        unit: [{ required: true, message: '请选择巡检单位', trigger: 'change' }],
        type: [{ required: true, message: '请选择巡检类型', trigger: 'change' }],
        startTime: [{ required: true, message: '请选择开始时间', trigger: 'change' }],
        endTime: [{ required: true, message: '请选择结束时间', trigger: 'change' }],
        principalPer: [{ required: true, message: '请选择责任人', trigger: 'change' }],
        phone: [{ required: true, validator: common.phoneCheck, trigger: 'blur' }]
      }
    }
  },
  // 当前页面不销毁的情况下，点击页签切换到别的路由
  beforeRouteLeave(to, from, next) {
    this.$store.dispatch('projectManage/setSpoilRegistion', this.conForm)
    next()
  },
  activated() {
    if (this.$store.getters.spoilRegistion !== '') {
      this.conForm = this.$store.getters.spoilRegistion
    }
  },
  mounted() {
    // 生成编号
    this.loadCode()
    this.getTunIds()
    this.getSuperviseUnit()
    this.getUnitList()
    this.getPersonList()
  },
  methods: {
    // 获取任务名称下拉
    getSuperviseUnit() {
      selectPatrolTaskName().then(res => {
        if (res.success) {
          this.restaurants = []
          res.data.forEach(item => {
            if (item !== '') {
              this.restaurants.push({ 'value': item })
            }
          })
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
    querySearch(queryString, cb) {
      var restaurants = this.restaurants
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    createFilter(queryString) {
      return (restaurant) => {
        return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    },
    // 生成编号
    loadCode() {
      // this.conForm.code = 'XJJH' + common.initCode()
      common.getCode({ connType: 'XJRW', num: 1 }).then(res => {
        if (res.success) {
          this.conForm.code = res.data.returnCode
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
    // 根据责任人连带出电话
    getPhone(val) {
      this.personList.forEach(item => {
        if (val === item.id) {
          this.conForm.phone = item.other
        }
      })
    },
    // 获取session中的隧道，做成下拉框
    getTunIds() {
      this.tunIdList = this.$store.state.dashord.allData.tunSelect
    },
    // 添加设备（库外）
    addDeviceOut() {
      this.titleName = '添加设备（库外）'
      this.addOutVisible = true
    },
    // 取消添加（库外）
    addOutclose() {
      this.addOutVisible = false
    },
    // 添加设备（库内）
    addDeviceIn() {
      if (this.conForm.tunId === '') {
        this.$message({
          showClose: true,
          message: '请先选择所属隧道',
          type: 'error'
        })
      } else {
        this.devFacIds = []
        this.tableData.forEach(item => {
          this.devFacIds.push(item.devFacId)
        })
        this.tunIds = this.conForm.tunId
        this.titleName2 = '添加设备（库内）'
        this.addInVisible = true
      }
    },
    // 取消添加（库内）
    addInclose() {
      this.addInVisible = false
    },
    // 添加设备（库内）到列表里
    addList(val) {
      this.addInVisible = false
      val.map(row => {
        const tableList = this.tableData.filter(item => {
          return item.devFacId === row.devFacId
        })
        // length有两种情况  为0时说明不重复  为1时重复 不添加
        if (tableList.length === 0) {
          this.tableData.push(row)
        }
      })
    },
    // 添加设备（库外）到列表里
    addListOut(val) {
      this.addOutVisible = false
      this.tableData.push(val[0])
    },
    // 表格选择事件
    selectionChange(val) {
      this.selectedData = val
    },
    // 取消删除
    confireMsg(flag) {
      this.moveShow = flag
    },
    // 删除表格按钮
    delDevice() {
      if (this.selectedData.length === 0) {
        this.$message({
          showClose: true,
          message: '请选择至少一条数据',
          type: 'error'
        })
        return
      }
      this.moveShow = true
    },
    // 确认删除
    sureMsg(flag) {
      // 关闭弹框
      this.moveShow = flag
      this.selectedData.map(row => {
        this.tableData = this.tableData.filter(item => {
          if (row.id) {
            return row.id !== item.id
          } else {
            return row.name !== item.name
          }
        })
      })
    },
    // 取消按钮事件
    closeTab() {
      // 获取浏览过的页
      var visitedTab = this.$store.getters.visitedViews
      // 关闭当前页  回到上一个页面
      common.closeCurrentTab(visitedTab, this.$route)
    },
    // 提交按钮事件
    onSubmit() {
      this.$refs['form1'].validate((valid) => {
        if (valid) {
          if (this.tableData.length > 0) {
            if (this.judgeLength(this.conForm)) {
              const param = {
                ...this.conForm,
                tunDevFacDetailList: this.tableData
              }
              insertTask(param).then(res => {
                if (res.success) {
                  this.$message({
                    showClose: true,
                    message: res.msg,
                    type: 'success'
                  })
                  this.loadCode()
                }
              }).catch(res => {
                this.$message({
                  showClose: true,
                  message: res.msg,
                  type: 'error'
                })
              })
            }
          } else {
            this.$message({
              showClose: true,
              message: '巡检清单不能为空',
              type: 'error'
            })
          }
        }
      })
    },
    // 判断文本框字符串的长度  以及桩号格式
    judgeLength(param) {
      var time1 = param.startTime // 开始时间
      var time2 = param.endTime // 结束时间
      if (time1 > time2) {
        this.$message({
          showClose: true,
          message: '开始时间不能大于结束时间',
          type: 'error'
        })
        return false
      }
      if (param.content.length >= 100) {
        this.$message({
          showClose: true,
          message: '巡检说明的长度不能大于100',
          type: 'error'
        })
        return false
      }
      if (param.remark.length >= 100) {
        this.$message({
          showClose: true,
          message: '备注的长度不能大于100',
          type: 'error'
        })
        return false
      }
      return true
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
</style>
