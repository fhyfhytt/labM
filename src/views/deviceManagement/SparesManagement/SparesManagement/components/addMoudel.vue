<template>
  <div class="roleManage-addRole">
    <el-row>
      <el-form ref="baseInfo" :model="baseInfo" label-width="105px" :rules="baseInfoRule" :validate-on-rule-change="false" class="addtop">
        <el-col :span="8">
          <el-form-item label="物资编码">
            <el-input v-model="baseInfo.assetNo" disabled />
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
              <el-option v-for="item in goodsStatusList" :key="item.code" :label="item.name" :value="item.code" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="所属库房" prop="houseId">
            <el-select v-model="baseInfo.houseId" popper-class="select-option" clearable placeholder="-请选择-">
              <el-option v-for="item in houseList" :key="item.id" :label="item.name" :value="item.id" />
            </el-select>
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
              <el-option v-for="item in maintranStatusList" :key="item.value" :label="item.name" :value="item.value" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="维保日期">
            <el-date-picker
              v-model="baseInfo.maintranDate"
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
import { addOrUpdateWarehouseAsset, getAllWarehouse } from '@/api/asstesManagement'
import common from '@/utils/common'
import addCode from './codeList'
import addFilters from '../../components/addFiltersType'
export default {
  name: 'AddAssetsPage',
  components: { addFilters, addCode },
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
        status: [{ required: true, message: '请选择物资状态', trigger: ['blur'] }],
        assetName: [{ required: true, message: '请选择物资名称', trigger: ['blur'] }],
        code: [
          { required: true, validator: checkNull, trigger: 'change' }
        ],
        houseId: [
          { required: true, validator: checkNull, trigger: 'change' }
        ]
      },
      houseList: [], // 所属库房
      maintranStatusList: [
        { name: '在保中', value: '1' },
        { name: '已过保', value: '2' }
      ], // 维保状态
      goodsStatusList: [], // 物资状态
      disabledFlg: false,
      filtersTypeId: [],
      addArea: false,
      showCode: false

    }
  },
  created() {
    common.getDictNameList({ dictName: '物资状态', dictNameIsLike: 0 }).then(res => {
      if (res.success === true) {
        this.$nextTick(() => {
          this.goodsStatusList = res.data
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
      if (data) {
        this.disabledFlg = true
        this.baseInfo = {
          id: data.id,
          assetId: data.assetId,
          code: data.code,
          num: data.num,
          status: data.status,
          houseId: data.houseId,
          house: data.house,
          note: data.assetInfo.note,
          dataFrom: data.dataFrom,
          checkStatus: data.checkStatus,
          checkNote: data.checkNote,
          maintranDate: data.maintranDate,
          maintranStatus: data.maintranStatus,
          areaId: data.areaId,
          area: data.area,
          location: data.location,
          price: data.price,
          itemType: data.assetInfo.itemType,
          assetName: data.assetInfo.assetName,
          assetNo: data.assetInfo.assetNo,
          unitType: data.assetInfo.unitType,
          factory: data.assetInfo.factory
        }
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
      this.baseInfo.assetNo = res.assetNo
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

