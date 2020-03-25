<template>
  <div v-loading="loading" class="dialgAddform1">
    <p class="bkb" />
    <el-form ref="addForm" :model="addForm" label-width="120px" :rules="addFormRules" class="formAdd" style="margin-left:-10px;">
      <el-row class="addtop">
        <el-col :span="12">
          <el-form-item label="组织编号:" prop="code">
            <el-input v-model="addForm.code" placeholder="请输入组织编号" />
          </el-form-item>
          <el-form-item label="组织类型:" prop="type">
            <el-select v-model="addForm.type" popper-class="select-option" placeholder="-请选择-">
              <el-option v-for="item in selectDataTrue" :key="item.value" :label="item.name" :value="item.value" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="组织名称:" prop="name">
            <el-input v-model="addForm.name" placeholder="请输入组织名称" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="描述:" prop="description">
            <el-input v-model="addForm.description" type="textarea" placeholder="请输入备注" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="dialog-footer">
      <el-button size="medium " class="button-sub" @click.native="submitForm('addForm')">确定</el-button>
      <el-button size="medium " class="button-cancel" @click="handeladdFormVisible">取消</el-button>
    </div>
  </div>
</template>

<script>
import { managementCenterEditNew, getListSelectNew } from '@/api/userManagement.js'
export default {
  props: {
    treeId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      // 新增界面数据  state: '',
      addForm: { code: '', name: '', description: '', type: '', parentId: this.treeId },
      addFormVisible: false,
      loading: false,
      addFormRules: {
        code: [{ required: true, message: '请输入组织编号', trigger: 'blur' }],
        name: [{ required: true, message: '请输入组织名称', trigger: 'blur' }],
        type: [{ required: true, message: '请选择组织类型', trigger: ['blur', 'change'] }]
      },
      selectDataTrue: [{ name: '业务', value: '9cbf144f21044b1e8510f9e607addcbc' }, { name: '管理', value: '8baa547b59504e8cb25424446222ab8d' }]
    }
  },
  methods: {
    // 取消新增
    handeladdFormVisible(addFormVisible) {
      this.$emit('handeladdFormVisible', this.addFormVisible)
      this.addForm = {}
    },
    // 提交新增
    submitForm(formName) {
      var that = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          getListSelectNew({ code: this.addForm.code }).then(response => {
            if (response.data.count !== 0) {
              this.$message.error('编号已存在，不可新增！')
              return false
            } else {
              const param = this.addForm
              managementCenterEditNew(param).then(response => {
                that.loading = false
                if (response.success === true) {
                  this.$message.success('新增成功')
                  this.$emit('handleGetTree1')
                  this.handeladdFormVisible()
                } else {
                  this.$message.error(response.msg)
                }
              }).catch(response => {
                this.$message.error(response.message)
              })
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
@import '~@/styles/modul.scss';
</style>
