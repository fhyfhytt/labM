<template>
  <div v-loading="loading" class="assetsAudit">
    <el-form ref="editForm" :model="editForm" label-width="110px" :rules="addFormRules" class="formAdd">
      <div class="minTitle">基本信息</div>
      <el-row class="dis-info">
        <el-col :span="8">
          <el-form-item label="资产编号：">
            <span class="con-name">{{ editForm.no }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="资产名称：">
            <span class="con-name">{{ editForm.assetName }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="资产状态：">
            <span class="con-name">{{ editForm.status }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="设备型号：">
            <span class="con-name">{{ editForm.unitType }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="设备厂商：">
            <span class="con-name">{{ editForm.factory }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="所属区域：">
            <span class="con-name">{{ editForm.area }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="资产分类：">
            <span class="con-name">{{ editForm.itemType }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="数量：">
            <span class="con-name">{{ editForm.num }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="采购价(元)：" prop="price">
            <span class="con-name">{{ editForm.price }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="维保状态：">
            <span class="con-name">{{ editForm.maintranStatus }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="维保日期：">
            <span class="con-name">{{ editForm.maintranDate }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="分布位置：">
            <span class="con-name">{{ editForm.location }}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <div class="minTitle" style="margin-top:10px;">审核备注</div>
      <el-row>
        <el-col :span="8">
          <el-form-item label="审核状态：">
            <el-select v-model="editForm.checkStatus" placeholder="-请选择审核状态-">
              <el-option label="审核通过" value="审核通过" />
              <el-option label="审核未通过" value="审核未通过" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="备注：">
            <el-input v-model="editForm.note" type="textarea" placeholder="请输入备注" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="dialog-footer">
      <el-button size="medium " class="button-cancel" @click="handeleditFormVisible('editForm')">取消</el-button>
      <el-button size="medium " class="button-sub" @click.native="submitForm('editForm')">确定</el-button>
    </div>
  </div>
</template>

<script>
import { updateCheckMore } from '@/api/asstesManagement'
export default {
  props: {
    row: {
      type: Object,
      default: () => { }
    }
  },
  data() {
    return {
      // 新增界面数据  state: '',
      editForm: {},
      editFormVisible: false,
      addFormRules: {
        price: [{ required: true, message: '价格必填项', trigger: 'blur' }]
      },
      loading: false
    }
  },
  mounted() {
    this.editForm = Object.assign({}, this.row)
    this.editForm.checkStatus = '审核通过'
  },
  methods: {
    // 取消编辑
    handeleditFormVisible(editFormVisible) {
      this.$emit('handeleditFormVisible', this.editFormVisible)
      this.editForm = {}
    },
    // 提交编辑
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true
          const param = {
            'ids': [this.editForm.id],
            'checkStatus': this.editForm.checkStatus,
            'checkNote': this.editForm.note || ''
          }
          updateCheckMore(param).then(response => {
            this.loading = false
            if (response.success === true) {
              this.$message.success('修改成功')
              this.$emit('handleGetTree1')
              this.handeleditFormVisible()
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
  .assetsAudit {
    .el-form-item--medium .el-form-item__label {
      line-height: 34px;
    }
    .dis-info .el-form-item {margin-bottom: 10px;}
    .minTitle {
      margin:0 0 10px 27px;color: #292929;padding-bottom: 10px;font-weight: bold;padding-left: 15px;position: relative;font-size: 16px;
      &::before {
        content: '';background:#379EFC;width: 4px;height: 17px;border-radius: 3px;position: absolute;left: 0;top: 0;
      }
    }
    .con-name {color: #909399;}
  }
</style>
