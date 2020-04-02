<template>
  <div class="outManage-add">
    <el-steps :active="active" finish-status="success" simple>
      <el-step title="出库基本信息"><span slot="icon" class="icontext">1</span></el-step>
      <el-step title="添加设备"><span slot="icon" class="icontext">2</span></el-step>
    </el-steps>
    <el-tabs v-model="activeName" stretch>
      <!--出库基本信息 :disabled="disabled"-->
      <el-tab-pane label="出库基本信息" name="0" :disabled="disabled">
        <div>
          <el-form ref="baseInfo" :model="baseInfo" label-width="105px" :rules="baseInfoRule" :validate-on-rule-change="false" class="addtop">
            <el-row>
              <el-col :span="11">
                <el-form-item label="出库类型" prop="type">
                  <el-select v-model="baseInfo.type" popper-class="select-option" clearable placeholder="-请选择-" default-first-option>
                    <el-option v-for="item in outboundTypeList" :key="item.code" :label="item.name" :value="item.name" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="11" :offset="2">
                <el-form-item label="备件去处" prop="fromorgo">
                  <el-select v-model="baseInfo.fromorgo" popper-class="select-option" clearable placeholder="-请选择-">
                    <el-option v-for="item in sparesGoWhereList" :key="item.code" :label="item.name" :value="item.name" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="操作人" prop="operator">
                  <el-input v-model="baseInfo.operator" disabled />
                </el-form-item>
              </el-col>
              <el-col :span="11" :offset="2">
                <el-form-item label="替换区域">
                  <el-input v-model="baseInfo.area" placeholder="-请选择-" @focus="showAddArea"><i slot="suffix" class="el-input__icon el-icon-more" /></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="所属库房" prop="houseId">
                  <el-select v-model="baseInfo.houseId" popper-class="select-option" filterable clearable placeholder="-请选择-" @change="getHousrPerson">
                    <el-option v-for="item in houseList" :key="item.id" :label="item.name" :value="item.id" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="11" :offset="2">
                <el-form-item label="接收人">
                  <el-input v-model="baseInfo.deliverer" placeholder="-请选择-" @focus="showSelectPerson"><i slot="suffix" class="el-input__icon el-icon-more" /></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="备注">
                  <el-input v-model="baseInfo.note" type="textarea" autocomplete="off" placeholder="请输入备注" />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <div class="dialog-footer">
            <el-button v-preventReClick="1000" size="small" class="button-sub" @click.native="nextStep('baseInfo')">下一步</el-button>
          </div>
        </div>
      </el-tab-pane>
      <!-- 添加设备 -->
      <el-tab-pane label="添加设备" name="1" :disabled="disabled">
        <div>
          <div v-show="baseInfo.type==='替换'" class="tableStyle">
            <div style="text-align:right;margin-bottom:10px;">
              <el-button icon="iconfont icontianjia1" size="small" @click="selectSiteMaterials"> 选择现场物资</el-button>
              <el-button icon="iconfont iconxingzhuang1 " size="small" @click="handleDelREplace">删除</el-button>
            </div>
            <el-table ref="equipmentTableR" v-loading="loading" border :data="tableDataReplace" max-height="500" @row-click="selectRowR" @selection-change="handleSelectRowR">
              <el-table-column label="替换资产信息">
                <el-table-column type="selection" width="60" />
                <el-table-column prop="no" label="资产编号" />
                <el-table-column prop="assetName" label="资产名称" />
                <el-table-column prop="unitType" label="资产型号" />
                <el-table-column prop="num" label="替换数量" />
                <el-table-column prop="statusName" label="资产状态" />
              </el-table-column>
              <el-table-column label="替换备件信息">
                <el-table-column prop="replaceAssetNo" label="替换备件编号" />
                <el-table-column prop="replaceAssetName" label="备件名称" />
                <el-table-column prop="replaceStatus" label="备件状态" />
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <span class="iconfont iconbianji1 scope-caozuo" style="color:#38a4ed;" @click.stop="selectReplaceMaterials(scope.$index, scope.row)" />
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div v-show="baseInfo.type !== '替换'">
            <div style="text-align:right;margin-bottom:10px;">
              <el-button icon="iconfont icontianjia1" size="small" @click="selectHouseMaterials"> 选择在库物资</el-button>
              <el-button icon="iconfont iconxingzhuang1 " size="small" @click="handleDelOther">删除</el-button>
            </div>
            <el-table ref="equipmentTableO" v-loading="loading" :data="tableDataOther" max-height="500" @row-click="selectRowO" @selection-change="handleSelectRowO">
              <el-table-column type="selection" width="50" />
              <el-table-column type="index" label="编号" />
              <el-table-column prop="assetNo" label="资产编号" />
              <el-table-column prop="assetName" label="资产名称" />
              <el-table-column prop="itemTypeName" label="资产分类" />
              <el-table-column prop="unitType" label="资产型号" />
              <el-table-column prop="num" label="设备总数(需编辑)" width="140">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.num" @click.stop="return ''" />
                </template>
              </el-table-column>
              <el-table-column prop="statusName" label="资产状态" />
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
          <div class="dialog-footer nextfooter">
            <el-button v-preventReClick="3000" size="small" class="button-cancel" @click.native="prev(0)">上一步</el-button>
            <el-button v-preventReClick="1000" size="small" class="button-sub" @click="completeWarehous('待出库')">保存</el-button>
            <el-button v-preventReClick="1000" size="small" class="button-sub" @click="completeWarehous('已出库')">完成入库</el-button>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
    <!-- 所属区域 -->
    <el-dialog title="选择所属区域" :append-to-body="true" :close-on-click-modal="false" :visible.sync="addArea" :before-close="filterClose" width="300px">
      <addFilters ref="addFilters" :is-radio="isRadio" :component-name="componentName" @filterRes="filterRes" />
    </el-dialog>
    <!-- 选人员 -->
    <el-dialog title="选择接收人" :append-to-body="true" :close-on-click-modal="false" :visible.sync="showReceivedBy" width="800px">
      <selectPerson @resPerson="resPerson" />
    </el-dialog>
    <!-- 选择在库物资 -->
    <el-dialog title="选择在库物资" :append-to-body="true" :close-on-click-modal="false" :visible.sync="showHouseMaterials" width="900px">
      <selectHouseMaterials ref="houseMaterials" :house-id="baseInfo.houseId" @houseMaterial="houseMaterialsRes" />
    </el-dialog>
    <!-- 选择现场物资 -->
    <el-dialog title="选择现场物资" :append-to-body="true" :close-on-click-modal="false" :visible.sync="showSiteMaterials" width="1000px">
      <selectSiteMaterials ref="siteMaterials" @siteMaterials="siteMaterialsRes" />
    </el-dialog>
    <!-- 选择替换物资（在库物资） -->
    <el-dialog title="选择替换物资" :append-to-body="true" :close-on-click-modal="false" :visible.sync="showReplaceMaterials" width="900px">
      <selectReplaceMaterials :asset-id="editRow.assetId" :house-id="baseInfo.houseId" @replaceMaterials="replaceMaterialsRes" />
    </el-dialog>
  </div>
</template>

<script>
import { getAllWarehouse, insertOuthouse, addOrUpdateWarehouseAsset, selectByWarehouse } from '@/api/asstesManagement'
import common from '@/utils/common'
import selectPerson from './selectPerson'
import addFilters from '../../components/addFiltersType'
import selectHouseMaterials from './selectHouseMaterials'
import selectSiteMaterials from './selectSiteMaterials'
import selectReplaceMaterials from './selectReplaceMaterials'
export default {
  name: 'AddAssetsPage',
  components: { addFilters, selectPerson, selectHouseMaterials, selectSiteMaterials, selectReplaceMaterials },
  data() {
    return {
      disabled: true, // tabs是否禁用
      activeName: 0, // tabs默认显示第一个用户基本信息
      active: 0,
      tableDataReplace: [],
      tableDataOther: [],
      totalCount: 0,
      pageNumber: 1,
      pageSize: 10,
      currentPage: 1, // 直接前往第几页
      loading: false,
      isRadio: true,
      componentName: '所属区域选择',
      baseInfo: {}, // 基本信息
      baseInfoRule: {
        type: [{ required: true, message: '请选择出库类型', trigger: 'change' }],
        fromorgo: [{ required: true, message: '请选择物备件去处', trigger: 'change' }],
        operator: [{ required: true, message: '操作人必填', trigger: 'change' }],
        houseId: [{ required: true, message: '请选择库房名称', trigger: 'change' }]
      },
      houseList: [], // 所属库房
      houseSiteList: [], // 所属库位
      outboundTypeList: [], // 出库类型
      sparesGoWhereList: [], // 备件去处
      disabledFlg: false,
      addArea: false,
      showReceivedBy: false,
      showHouseMaterials: false, // 显示选在库物资组件
      showSiteMaterials: false, // 显示选现场物资组件
      showReplaceMaterials: false, // 显示替换的物资
      editIndex: '',
      editRow: {},
      multipleSelectionR: [],
      multipleSelectionO: []

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
    common.getDictNameList({ dictName: '备件去处', dictNameIsLike: 0 }).then(res => {
      if (res.success === true) {
        this.$nextTick(() => {
          this.sparesGoWhereList = res.data
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
  },
  mounted() {

  },
  methods: {
    // 选择库房获取库房管理员
    getHousrPerson(val) {
      this.houseList.forEach((item) => {
        if (item.id === val) {
          this.baseInfo.deliverer = item.person
        }
        if (item.id === this.baseInfo.houseId) {
          this.house = item.name
        }
      })
    },
    // 新建人员基本信息下一步  根据用户ID查询所拥有的角色信息接口  第一步--1
    nextStep(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.activeName = '1'
          this.active = 1
          if (this.disabledFlg) {
            const params = {
              pageSize: this.pageSize,
              pageNumber: this.pageNumber,
              no: this.baseInfo.no
            }
            selectByWarehouse(params).then(response => {
              if (response.code === 0) {
                this.loading = false
                this.tableDataOther = response.data.list
                this.totalCount = Number(response.data.totalNum)
              } else {
                this.$message.error(response.msg)
              }
            }).catch(response => {
              this.loading = false
              this.$message.error(response.msg)
            })
          }
        } else {
          return false
        }
      })
    },
    // 上一步
    prev(e) {
      this.activeName = e + ''
      this.active = e
    },
    // 完成出库
    completeWarehous(status) {
      const that = this
      const ids = [] // 备件id
      const assetIds = [] // 物资id
      const nums = []
      const copyDate = that.baseInfo.type === '替换' ? that.tableDataReplace : that.tableDataOther
      console.log('subminC---:', copyDate)
      copyDate.forEach(item => {
        if (that.baseInfo.type === '替换') {
          ids.push(item.replaceId)
          assetIds.push(item.id)
        } else {
          ids.push(item.id)
          nums.push(item.num)
        }
      })
      const params = Object.assign({}, that.baseInfo)
      params.ids = ids
      params.assetIds = assetIds
      params.nums = nums
      params.status = status
      params.house = that.house
      insertOuthouse(params).then(response => {
        that.loading = false
        if (response.success === true) {
          that.$message.success('出库成功')
          that.$emit('addSuccess')
          that.activeName = '0'
          that.tableDataReplace = []
          that.tableDataOther = []
        } else {
          that.$message.error(response.msg)
        }
      }).catch(response => {
        that.$message.error(response.msg)
      })
    },
    saveBaseInfo() {
      const that = this
      if (!that.disabledFlg) {
        // 新增提交
        that.$refs['baseInfo'].validate((valid) => {
          if (valid) {
            const param = that.baseInfo
            param.checkStatus = '0'
            addOrUpdateWarehouseAsset(param).then(response => {
              that.loading = false
              if (response.success === true) {
                that.$message.success('新增成功')
                that.$emit('addSuccess')
              } else {
                that.$message.error(response.msg)
              }
            }).catch(response => {
              that.$message.error(response.msg)
            })
          } else {
            return false
          }
        })
      } else {
        // 修改提交
        that.$refs['baseInfo'].validate((valid) => {
          if (valid) {
            const param = that.baseInfo
            param.checkStatus = '0'
            addOrUpdateWarehouseAsset(param).then(response => {
              that.loading = false
              if (response.success === true) {
                that.$message.success('修改成功')
                that.$emit('addSuccess')
              } else {
                that.$message.error(response.msg)
              }
            }).catch(response => {
              that.$message.error(response.msg)
            })
          } else {
            return false
          }
        })
      }
    },
    addEditRoleDialog(data) {
      this.activeName = '0' // tabs默认显示第一个用户基本信息
      this.active = 0
      this.tableDataReplace = []
      this.tableDataOther = []
      if (data) {
        this.disabledFlg = true
        this.baseInfo = {
          id: data.id,
          fromorgo: data.fromorgo,
          operator: localStorage.getItem('login-user'),
          houseId: data.houseId,
          no: data.no,
          deliverer: data.deliverer,
          area: data.area,
          note: data.note,
          type: data.type
        }
      } else {
        this.$refs['baseInfo'].resetFields()
        this.disabledFlg = false
        this.baseInfo = {
          operator: localStorage.getItem('login-user')
        }
      }
    },
    // 显示选人员
    showSelectPerson() {
      this.showReceivedBy = true
    },
    // 返回人员选择信息
    resPerson(res) {
      if (res) {
        this.showReceivedBy = false
        this.baseInfo.deliverer = res.name
      }
    },
    // 显示选在库物资
    selectHouseMaterials() {
      this.showHouseMaterials = true
      this.$nextTick(() => {
        this.$refs.houseMaterials.getList()
      })
    },
    // 返回选在库物资
    houseMaterialsRes(res) {
      if (res && res.length > 0) {
        this.showHouseMaterials = false
        this.tableDataOther = JSON.parse(JSON.stringify(res))
      }
      console.log('--------house:', res)
    },
    // 显示选现场物资
    selectSiteMaterials() {
      this.showSiteMaterials = true
      this.$nextTick(() => {
        this.$refs.siteMaterials.getList()
        this.$refs.siteMaterials.clearMultipleSelection()
      })
    },
    // 返回选现场物资
    siteMaterialsRes(res) {
      if (res && res.length > 0) {
        const repetitionNo = []
        const newArr = []
        if (this.tableDataReplace.length === 0) {
          this.tableDataReplace = res
        } else {
          for (let i = 0; i < res.length; i++) {
            for (let j = 0; j < this.tableDataReplace.length; j++) {
              if (res[i].no === this.tableDataReplace[j].no) {
                repetitionNo.push(res[i].no)
                break
              } else if (j === this.tableDataReplace.length - 1 && res[i].no !== this.tableDataReplace[j].no) {
                newArr.push(res[i])
              }
            }
          }
        }
        this.$nextTick(() => {
          this.showSiteMaterials = false
          this.tableDataReplace = this.tableDataReplace.concat(newArr)
          if (repetitionNo.length > 0) {
            this.$message.info('资产编号为' + repetitionNo.join(',') + '已添加')
          }
        })
      }
    },
    // 显示选替换物资
    selectReplaceMaterials(index, row) {
      this.editIndex = index
      this.editRow = row
      this.$nextTick(() => {
        this.showReplaceMaterials = true
      })
    },
    // 返回选替换物资
    replaceMaterialsRes(res) {
      console.log('--------replace:', res)
      this.showReplaceMaterials = false
      this.editRow.replaceAssetNo = res.assetNo
      this.editRow.replaceAssetName = res.assetName
      this.editRow.replaceStatus = res.statusS
      this.editRow.replaceId = res.id
      this.tableDataReplace.splice(this.editIndex, 1, this.editRow)
    },
    // 选择区域
    showAddArea() {
      this.addArea = true
      this.$nextTick(() => {
        this.$refs.addFilters.getAreaTreeData()
      })
    },
    filterClose() {
      this.addArea = false
    },
    // 条件选择返回
    filterRes(res) {
      if (res && res.length > 0) {
        this.addArea = false
        const valueArr = []
        for (const value of res) {
          valueArr.push(value.name)
        }
        this.baseInfo.area = valueArr.join(',')
      }
    },
    // 删除替换
    selectRowR(row) {
      this.$refs.equipmentTableR.toggleRowSelection(row)
    },
    handleSelectRowR(val) {
      this.multipleSelectionR = val
    },
    handleDelREplace() {
      if (this.multipleSelectionR.length === 0) {
        this.$message.error('请至少选择一条数据')
      } else {
        for (let i = this.multipleSelectionR.length - 1; i >= 0; i--) {
          for (let k = this.tableDataReplace.length - 1; k >= 0; k--) {
            if (this.multipleSelectionR[i].no === this.tableDataReplace[k].no) {
              this.tableDataReplace.splice(k, 1)
            }
          }
        }
      }
    },
    // 删除其他
    selectRowO(row) {
      this.$refs.equipmentTableO.toggleRowSelection(row)
    },
    handleSelectRowO(val) {
      this.multipleSelectionO = val
    },
    handleDelOther() {
      if (this.multipleSelectionO.length === 0) {
        this.$message.error('请至少选择一条数据')
      } else {
        for (let i = this.multipleSelectionO.length - 1; i >= 0; i--) {
          for (let k = this.tableDataOther.length - 1; k >= 0; k--) {
            if (this.multipleSelectionO[i].id === this.tableDataOther[k].id) {
              this.tableDataOther.splice(k, 1)
            }
          }
        }
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
<style lang="scss">
  .outManage-add {
    .el-steps--simple {margin-bottom: 30px;}
    .el-tabs--top {
      .el-tabs__header.is-top {
        display: none !important;
        margin-top: 110px;
      }
    }
    .tableStyle{
      .el-table th, .el-table th.is-leaf {border-right: 1px solid #dfe6ec;border-bottom: 1px solid #dfe6ec;}
    }

  }
</style>

