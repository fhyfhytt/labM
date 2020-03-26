<template>
  <div v-loading="loading" class="dialgAddform1">
    <el-form ref="addForm" :model="addForm" label-width="120px" :rules="addFormRules" class="formAdd">
      <el-row class="addtop">
        <el-col :span="12">

          <el-form-item label="编号:" prop="code">
            <el-input v-model="addForm.code" autocomplete="off" placeholder="请输入编号" />
          </el-form-item>

          <el-form-item label="启用状态:" prop="status">
            <el-select v-model="addForm.status" popper-class="select-option" placeholder="-请选择-">
              <el-option v-for="item in selectDataTrue" :key="item.value" :label="item.name" :value="item.value" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="名称" prop="name">
            <el-input v-model="addForm.name" autocomplete="off" placeholder="请输入名称" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="描述:" prop="description">
            <el-input v-model="addForm.description" type="textarea" placeholder="请输入描述" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="dialog-footer">
      <el-button size="medium " class="button-cancel" @click="handeladdFormVisible">取消</el-button>
      <el-button size="medium " class="button-sub" @click.native="submitForm('addForm')">确定</el-button>

    </div>
  </div>
</template>

<script>
import { editClass } from '@/api/classify.js'
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
      addForm: { code: '', name: '', status: '', description: '', parentId: this.treeId },
      addFormVisible: false,
      loading: false,
      addFormRules: {
        code: [{ required: true, message: '请输入编号', trigger: 'blur' }],
        name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
        status: [{ required: true, message: '请输入状态', trigger: ['blur', 'change'] }]
      },
      selectDataTrue: [{ name: '启用', value: 1 }, { name: '未启用', value: 0 }]
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
          that.loading = true
          const param = this.addForm
          editClass(param).then(response => {
            that.loading = false
            if (response.success === true) {
              this.$message.success('新增成功')
              this.$emit('handleGetTree1')
              this.handeladdFormVisible()
            } else {
              this.$message.error(response.msg)
            }
          }).catch(response => {
            this.$message.error(response.msg)
          })
        } else {
          return false
        }
      })
    }
    // 清空新增数据
    // clearDate() {
    //   this.addForm = {}
    // }
  }
}
</script>

<style lang="scss">
@import "~@/styles/modul.scss";
</style>
