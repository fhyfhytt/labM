<template>
  <div class="dialgEditform1" :loading="loading">
    <el-form ref="editForm" :model="editForm" label-width="120px" :rules="editFormRules" class="formAdd">
      <el-row class="edittop">
        <el-col :span="12">
          <el-form-item label="编号:" prop="code" aria-disabled="true">
            <el-input v-model="editForm.code" autocomplete="off" placeholder="请输入编号" />
          </el-form-item>

          <!-- <el-form-item label="启用状态:" prop="status">

            <el-select v-model="editForm.status" popper-class="select-option" placeholder="-请选择状态-">
              <el-option v-for="item in selectDataTrue" :key="item.id" :label="item.name" :value="item.id" />
            </el-select>
          </el-form-item> -->
        </el-col>
        <el-col :span="12">
          <el-form-item label="名称" prop="name">
            <el-input v-model="editForm.name" autocomplete="off" placeholder="请输入名称" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="描述:" prop="description">
            <el-input v-model="editForm.description" type="textarea" placeholder="请输入备注" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="dialog-footer">
      <el-button size="medium" class="button-cancel" @click="handeleditFormVisible('editForm')">取消</el-button>
      <el-button size="medium" class="button-sub" @click.native="submitForm('editForm')">确定</el-button>

    </div>
  </div>
</template>

<script>
import { editArea } from '@/api/area.js'
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
      editForm: { code: '', name: '', description: '', status: '', statusstr: '' },
      editFormRules: {
        code: [{ required: true, message: '请输入分类编号', trigger: 'blur' }],
        name: [{ required: true, message: '请输入分类名称', trigger: 'blur' }],
        status: [{ required: true, message: '请选择分类状态', trigger: ['blur', 'change'] }]
      },
      loading: false,
      editFormVisible: false,
      selectDataTrue: [{ name: '启用', id: '1' }, { name: '未启用', id: '0' }]
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
      var that = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          that.loading = true
          const param = this.editForm
          editArea(param).then(response => {
            that.loading = false
            if (response.success === true) {
              this.$message.success('修改成功')
              this.$emit('handleGetTree1')
              this.$emit('handeleditFormVisible', this.editFormVisible)
              // this.handeleditFormVisible()
            } else {
              this.$message.error(response.msg)
            }
          }).catch(response => {
            this.$message.error(response.msg)
          })
        } else {
          // console.log('error submit!!')
          return false
        }
      })
    }
    // 清空数据
    // clearDate() {
    //   console.log('11', this.editForm)
    //   this.editForm = {}
    //   console.log('22', this.editForm)
    // }

  }
}
</script>

<style lang="scss">
@import "~@/styles/modul.scss";
</style>
