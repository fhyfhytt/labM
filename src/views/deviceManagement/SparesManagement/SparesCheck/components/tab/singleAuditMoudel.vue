<template>
  <div v-loading="loading" class="dialgEditform1">
    <el-form ref="AuditForm" :model="AuditForm" :rules="batchFormRules" label-width="80px" class="formAdd">
      <h3 class="title">基本信息</h3>
      <el-row class="addtop">
        <el-col :span="8">
          <el-form-item label="资产编码:" prop="assetNo">
            <el-input v-model="AuditForm.assetInfo.assetNo" autocomplete="off" readonly />
          </el-form-item>
          <el-form-item label="设备型号:" prop="unitType">
            <el-input v-model="AuditForm.unitType" autocomplete="off" readonly />
          </el-form-item>
          <el-form-item label="资产分类:" prop="itemType">
            <el-input v-model="AuditForm.itemType" autocomplete="off" readonly />
          </el-form-item>
          <el-form-item label="维保状态:" prop="maintranStatusS">
            <el-input v-model="AuditForm.maintranStatusS" autocomplete="off" readonly />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="资产名称:" prop="assetName">
            <el-input v-model="AuditForm.assetInfo.assetName" autocomplete="off" />
          </el-form-item>
          <el-form-item label="设备厂商:" prop="factory">
            <el-input v-model="AuditForm.assetInfo.factory" autocomplete="off" readonly />
          </el-form-item>
          <el-form-item label="数量:" prop="num">
            <el-input v-model="AuditForm.num" autocomplete="off" readonly />
          </el-form-item>
          <el-form-item label="维保时间:" prop="maintranDate">
            <el-input v-model="AuditForm.maintranDate" autocomplete="off" readonly />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="资产状态:" prop="statusS">
            <el-input v-model="AuditForm.statusS" autocomplete="off" readonly />
          </el-form-item>
          <el-form-item label="所属库房:" prop="house">
            <el-input v-model="AuditForm.house" autocomplete="off" readonly />
          </el-form-item>
          <el-form-item label="采购价:" prop="price">
            <el-input v-model="AuditForm.price" autocomplete="off" readonly />
          </el-form-item>
          <el-form-item label="存放位置:" prop="location">
            <el-input v-model="AuditForm.location" autocomplete="off" readonly />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <h3 class="title" style="">审核备注</h3>
        <el-col :span="24">
          <el-form-item label="审核状态:">
            <el-select v-model="AuditForm.checkStatus" value-key="checkStatus" popper-class="select-option" placeholder="-请选择-">
              <el-option label="审核通过" value="1" />
              <el-option label="审核未通过" value="0" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="备注:" prop="checkNote">
            <el-input v-model="AuditForm.checkNote" type="textarea" placeholder="请输入备注" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="dialog-footer">
      <el-button size="medium " class="button-cancel" @click="handelsingleAuditVisible('AuditForm')">取消</el-button>
      <el-button size="medium " class="button-sub" @click.native="submitForm('AuditForm')">确定</el-button>
    </div>
  </div>

</template>

<script>
import { sparesCheck } from '@/api/deviceManage.js'
// import common from '@/utils/common'
export default {
  props: {
    row: {
      type: Object,
      default: () => { }
    }
  },
  data() {
    return {
      AuditForm: { id: '', assetInfo: '', itemType: '', dataFrom: '', statusS: '', checkStatus: '', house: '', checkNote: '', maintranStatusS: '', maintranDate: '', num: '', area: '', price: '' },
      singleAuditVisible: false,
      loading: false,
      addUserVisible: false,
      batchFormRules: {
        checkStatus: [{ required: true, message: '请选择状态', trigger: 'blur' }]
      }
      // primaryKey: '' // 查询参数
    }
  },

  created() {
  },
  mounted() {
    this.AuditForm = Object.assign({}, this.row)
  },
  methods: {
    // 取消审核
    handelsingleAuditVisible(singleAuditVisible) {
      this.$emit('handelsingleAuditVisible', this.singleAuditVisible)
      this.AuditForm = {}
    },
    // 提交审核
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true
          const param = {}
          param.checkStatus = this.AuditForm.checkStatus
          param.checkNote = this.AuditForm.checkNote
          param.ids = this.AuditForm.id

          sparesCheck(param).then(response => {
            this.loading = false
            if (response.success === true) {
              this.$message.success(response.msg)
              this.$emit('handleGetTree1')
              this.handelsingleAuditVisible()
            } else {
              this.$message.error(response.msg)
            }
          }).catch(response => {
            this.loading = false
            this.$message.error(response.msg)
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss">
@import '~@/styles/modul.scss';
</style>
<style lang="scss" scoped>
  .dialgEditform1 .addtop {
    .el-form-item {
      margin-bottom: 10px;
      border-bottom: 1px solid #c7cbd6;
    }
  }
  /deep/.addtop .el-input__inner {
    border: none!important;
  }
  .dialgEditform1 .title {
    border-bottom: 2px solid #c7cbd6;color:#1890ff;height:30px;
  }
  .el-form-item__content {
    margin-left:80px;
  }
  .dialgEditform1 /deep/.el-form-item__label{
    color:#292929 !important;
  }
</style>
