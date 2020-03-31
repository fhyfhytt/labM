<template>
  <div class="roleManage-addRole">
    <el-row>
      <el-form ref="baseInfo" :model="baseInfo" label-width="105px" :rules="baseInfoRule" :validate-on-rule-change="false">
        <el-col :span="8">
          <el-form-item label="物资编码">
            <el-input v-model="baseInfo.no" disabled />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="操作编码" prop="code">
            <el-input v-model="baseInfo.code" placeholder="-请选择-" :disabled="disabledFlg" @focus="chooseCode"><i slot="suffix" class="el-input__icon el-icon-more" /></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="物资名称" prop="assetName">
            <el-input v-model="baseInfo.assetName" disabled />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="物资分类">
            <el-input v-model="baseInfo.itemType" disabled />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="设备型号">
            <el-input v-model="baseInfo.unitType" disabled />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="设备厂商">
            <el-input v-model="baseInfo.factory" disabled />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="数量" prop="num">
            <el-input v-model="baseInfo.num" disabled />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="采购价(元)">
            <el-input v-model="baseInfo.price" disabled />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="物资状态" prop="status">
            <el-select v-model="baseInfo.status" popper-class="select-option" clearable placeholder="-请选择-">
              <el-option v-for="item in statuesList" :key="item.code" :label="item.name" :value="item.name" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="所属区域" prop="area">
            <el-input v-model="baseInfo.area" placeholder="-请选择-" @focus="showAddArea"><i slot="suffix" class="el-input__icon el-icon-more" /></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="分布位置">
            <el-input v-model="baseInfo.location" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="维保状态">
            <el-select v-model="baseInfo.maintranStatus" popper-class="select-option" placeholder="-请选择状态-">
              <el-option v-for="item in maintranStatusList" :key="item.code" :label="item.name" :value="item.code" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="维保日期">
            <el-date-picker
              v-model="baseInfo.maintran_date"
              type="date"
              placeholder="选择日期"
            />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="备注">
            <el-input v-model="baseInfo.note" type="textarea" autocomplete="off" placeholder="请输入备注" />
          </el-form-item>
        </el-col>

      </el-form>
    </el-row>
    <div style="text-align:right">
      <el-button v-preventReClick="1000" class="button-sub" @click="saveBaseInfo">确认</el-button>
      <el-button v-preventReClick="1000" class="button-cancel" @click="this.$parent.handleClose">取消</el-button>
    </div>

    <!-- 操作编码选择 -->
    <el-dialog title="操作编码选择" :append-to-body="true" :close-on-click-modal="false" :visible.sync="showCode" :before-close="codeClose" width="800px">
      <addCode @resCode="resCode" />
    </el-dialog>
    <!-- 所属区域 -->
    <el-dialog title="所属区域选择" :append-to-body="true" :close-on-click-modal="false" :visible.sync="addArea" :before-close="filterClose" width="300px">
      <addFilters ref="addFilters" :is-radio="isRadio" :filters-type-id="filtersTypeId" @filterRes="filterRes" />
    </el-dialog>
  </div>
</template>

<script>
import { addAssets, assetsUpdate } from '@/api/asstesManagement'
import common from '@/utils/common'
import addCode from './codeList'
import addFilters from '../../components/addFiltersType'
export default {
  name: 'AddAssetsPage',
  components: { addFilters, addCode },
  props: {
    statuesList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    var checkNull = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error('请选择区域'))
      } else {
        callback()
      }
    }
    return {
      loading: '0',
      isRadio: true,
      baseInfo: {}, // 基本信息
      baseInfoRule: {
        num: [{ required: true, message: '请输入数量', trigger: ['blur'] }],
        assetName: [{ required: true, message: '请输入物资名称', trigger: ['blur'] }],
        status: [{ required: true, message: '请选择物资状态', trigger: ['blur'] }],
        code: [
          { required: true, validator: checkNull, trigger: 'change' }
        ],
        area: [
          { required: true, validator: checkNull, trigger: 'change' }
        ]
      },
      maintranStatusList: [], // 维保状态

      disabledFlg: false,
      filtersTypeId: [],
      addArea: false,

      showCode: false

    }
  },
  created() {
    common.getDictNameList({ dictName: '维保状态', dictNameIsLike: 0 }).then(res => {
      if (res.success === true) {
        this.$nextTick(() => {
          this.maintranStatusList = res.data
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

  },
  methods: {
    saveBaseInfo() {
      const that = this
      if (!that.disabledFlg) {
        // 新增提交
        that.$refs['baseInfo'].validate((valid) => {
          if (valid) {
            const param = that.baseInfo
            param.checkStatus = '未审核'
            addAssets(param).then(response => {
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
            param.checkStatus = '未审核'
            assetsUpdate(param).then(response => {
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
      if (data) {
        this.disabledFlg = true
        this.baseInfo = data
      } else {
        this.$refs['baseInfo'].resetFields()
        this.disabledFlg = false
        this.baseInfo = {}
      }
    },

    // 选编码
    chooseCode() {
      this.showCode = true
      // this.$nextTick(() => {
      //   this.$refs.addEditRole.addEditRoleDialog()
      //   this.$refs.addEditRole.clearContent()
      // })
    },
    codeClose() {
      this.showCode = false
    },
    // 条件选择返回
    resCode(res) {
      this.showCode = false
      this.baseInfo.no = res.assetNo
      this.baseInfo.code = res.code
      this.baseInfo.assetName = res.assetName
      this.baseInfo.itemType = res.itemType
      this.baseInfo.unitType = res.unitType
      this.baseInfo.factory = res.factory
      this.baseInfo.price = res.price
      this.baseInfo.assetId = res.id
      this.baseInfo.num = 1
    },

    // 选择区域
    showAddArea() {
      this.dialogName = '所属区域选择'
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
        this.filtersTypeId = []
        const valueArr = []
        for (const value of res) {
          valueArr.push(value.name)
        }
        this.baseInfo.area = valueArr.join(',')
      }
    }

  }
}
</script>

