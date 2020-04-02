<template>
  <div v-loading="loading" class="dialgAddform1">
    <el-form ref="addForm" :model="addForm" label-width="120px" :rules="addFormRules" class="formAdd">
      <el-row class="addtop">
        <el-col :span="12">

          <el-form-item label="库位名称:" prop="name">
            <el-input v-model="addForm.name" autocomplete="off" placeholder="请输入库位名称" />
          </el-form-item>

          <el-form-item label="实际位置" prop="position">
            <el-input v-model="addForm.position" autocomplete="off" placeholder="请输入实际位置" />
          </el-form-item>
          <el-form-item label="库位重量" prop="weight">
            <el-input v-model="addForm.weight" autocomplete="off" placeholder="请输入库位重量" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="库位编号" prop="code">
            <el-input v-model="addForm.code" autocomplete="off" placeholder="请输入库位编号" />
          </el-form-item>
          <el-form-item label="库位体积" prop="volume">
            <el-input v-model="addForm.volume" autocomplete="off" placeholder="请输入库位体积" />
          </el-form-item>

        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="描述:" prop="memo">
            <el-input v-model="addForm.memo" type="textarea" placeholder="请输入描述" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="dialog-footer">
      <el-button size="medium " class="button-cancel" @click="handeladdFormVisible">取消</el-button>
      <el-button size="medium " class="button-sub" @click.native="submitForm()">确定</el-button>

    </div>
  </div>

</template>

<script>
export default {
  data() {
    return {
      addForm: {
        name: '',
        position: '',
        weight: '',
        code: '',
        volume: ''
      },
      addFormRules: {
        code: [{ required: true, message: '请输入编号', trigger: 'blur' }],
        name: [{ required: true, message: '请输入库位名称', trigger: 'blur' }],
        position: [{ required: true, message: '请输入状态', trigger: 'blur' }],
        weight: [{ required: true, message: '请输入库位重量', trigger: 'blur' }],
        volume: [{ required: true, message: '请输入体积', trigger: 'blur' }]
      }
    }
  },

  created() {
  },
  methods: {
    // 取消新增
    handeladdFormVisible(addFormVisible) {
      this.$emit('formVisible')
    },
    // 新增
    submitForm() {
      this.$emit('updateWarehourse', this.addForm)
    }
  }
}
</script>

<style lang="scss">
@import '~@/styles/modul.scss';
</style>
