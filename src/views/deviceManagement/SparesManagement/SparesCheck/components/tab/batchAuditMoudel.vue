<template>
  <div v-loading="loading" class="dialgAddform1">
    <el-form ref="batchForm" :model="batchForm" label-width="120px" :rules="batchFormRules" class="formAdd">
      <el-row class="addtop">
        <el-col :span="24" style="border-bottom: 2px solid #1890ff;color:#1890ff;margin-bottom:20px;">
          <h3>审核备注</h3>
        </el-col>
        <el-col :span="24">
          <el-form-item label="审核状态">
            <el-select v-model="batchForm.checkStatus" value-key="checkStatus" popper-class="select-option" placeholder="-请选择-">
              <el-option label="审核通过" value="1" />
              <el-option label="审核未通过" value="2" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="备注:" prop="checkNote">
            <el-input v-model="batchForm.checkNote" type="textarea" placeholder="请输入备注" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="dialog-footer">
      <el-button size="medium " class="button-cancel" @click="handelbatchAuditVisible">取消</el-button>
      <el-button size="medium " class="button-sub" @click.native="submitForm('batchForm')">确定</el-button>
    </div>
  </div>

</template>

<script>
import { sparesCheck } from '@/api/deviceManage.js'
export default {
  props: {
    auditTableById: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      batchForm: { checkStatus: '', checkNote: '', ids: '' },
      batchAuditVisible: false,
      batchFormRules: {
        checkStatus: [{ required: true, message: '请选择状态', trigger: 'blur' }]
      },
      selecthouseType: [],
      selecthouseState: [],
      loading: false,
      primaryKey: '' // 查询参数
    }
  },

  created() {
  },
  methods: {
    // 取消批量审核
    handelbatchAuditVisible(batchAuditVisible) {
      this.$emit('handelbatchAuditVisible', this.batchAuditVisible)
      this.batchForm = {}
    },
    // 提交批量审核
    submitForm(batchform) {
      this.batchForm.ids = this.auditTableById.join(',')
      this.$refs[batchform].validate((valid) => {
        if (valid) {
          this.loading = true
          const param = this.batchForm
          sparesCheck(param).then(response => {
            this.loading = false
            if (response.success === true) {
              this.$message.success('批量审核成功')
              this.$emit('handleGetTree1')
              this.handelbatchAuditVisible()
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
