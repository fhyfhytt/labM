<template>
  <div class="dialgEditform1">
    <p class="bkb" />
    <el-form ref="editForm" :model="editForm" label-width="120px" :rules="editFormRules" class="formAdd">
      <el-row class="edittop">
        <el-col :span="12">
          <el-form-item label="物资编码:" prop="code">
            <el-input v-model="editForm.code" disabled />
          </el-form-item>
          <el-form-item label="设备名称:" prop="name">
            <el-input v-model="editForm.name" placeholder="请输入设备名称" />
          </el-form-item>
          <el-form-item label="设备厂商:" prop="type">
            <el-select v-model="editForm.type" popper-class="select-option" placeholder="-请选择-">
              <el-option v-for="item in selectDataTrue" :key="item.value" :label="item.name" :value="item.value" />
            </el-select>
          </el-form-item>
          <el-form-item label="采购价:" prop="name">
            <el-input v-model="editForm.name" placeholder="请输入组织名称" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="操作编码:" prop="code">
            <el-input v-model="editForm.code" disabled placeholder="请输入操作编码号" />
          </el-form-item>
          <el-form-item label="设备型号:" prop="type">
            <el-select v-model="editForm.type" popper-class="select-option" placeholder="-请选择-">
              <el-option v-for="item in selectDataTrue" :key="item.value" :label="item.name" :value="item.value" />
            </el-select>
          </el-form-item>
          <el-form-item label="资产分类:" prop="type">
            <el-select v-model="editForm.type" popper-class="select-option" placeholder="-请选择-" disabled>
              <el-option v-for="item in selectDataTrue" :key="item.value" :label="item.name" :value="item.value" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="备注:" prop="description">
            <el-input v-model="editForm.description" type="textarea" placeholder="请输入备注" />
          </el-form-item>
        </el-col>
      </el-row>

    </el-form>
    <div class="dialog-footer">
      <el-button size="medium" class="button-sub" @click.native="submitForm('editForm')">确定</el-button>
      <el-button size="medium" class="button-cancel" @click="handeleditFormVisible('editForm')">取消</el-button>
    </div>
  </div>
</template>

<script>
import { managementCenterEditNew } from '@/api/userManagement.js'
export default {
  props: {
    row: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      // 编辑界面数据 state: '',
      editForm: { code: '', name: '', type: '', description: '' },
      editFormRules: {
        code: [{ required: true, message: '请输入组织编号', trigger: 'blur' }],
        name: [{ required: true, message: '请输入组织名称', trigger: 'blur' }],
        type: [{ required: true, message: '请输入组织类型', trigger: 'blur' }]
      },
      selectDataTrue: [{ name: '业务', value: '9cbf144f21044b1e8510f9e607addcbc' }, { name: '管理', value: '8baa547b59504e8cb25424446222ab8d' }],
      editFormVisible: false
    }
  },
  watch: {
    row(newValue, oldVal) {
      // this.editForm = this.row
      this.editForm = Object.assign({}, this.row)
    }
  },
  mounted() {
    this.editForm = Object.assign({}, this.row)
  },
  methods: {
    // 取消编辑
    handeleditFormVisible(formName) {
      this.$emit('handeleditFormVisible', this.editFormVisible)
      // this.$parent.visible = false
      this.$refs[formName].resetFields()
    },
    // 提交编辑页面
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const param = this.editForm
          managementCenterEditNew(param).then(response => {
            if (response.success === true) {
              this.$message.success('修改成功')
              this.$emit('handleGetTree1')
              this.$emit('handeleditFormVisible', this.editFormVisible)
            } else {
              this.$message.error(response.msg)
            }
          }).catch(response => {
            this.$message.error(response.message)
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
 @import "~@/styles/modul.scss";
</style>
