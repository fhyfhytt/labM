<template>
  <div class="dialgEditform1">
    <p class="bkb" />
    <el-form ref="editForm" :model="editForm" label-width="120px" :rules="editFormRules" class="formAdd">
      <el-row class="edittop">
        <el-col :span="12">
          <el-form-item label="物资编码:" prop="assetNo">
            <el-input v-model="editForm.assetNo" disabled />
          </el-form-item>
          <el-form-item label="设备名称:" prop="assetName">
            <el-input v-model="editForm.assetName" placeholder="请输入设备名称" />
          </el-form-item>
          <el-form-item label="设备厂商:" prop="factory">
            <el-select v-model="editForm.factory" popper-class="select-option" placeholder="-请选择-">
              <el-option v-for="item in factoryList" :key="item.name" :label="item.name" :value="item.name" />
            </el-select>
          </el-form-item>
          <el-form-item label="采购价:" prop="price">
            <el-input v-model="editForm.price" placeholder="请输入采购价" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="操作编码:" prop="code">
            <el-input v-model="editForm.code" disabled placeholder="请输入操作编码" />
          </el-form-item>
          <el-form-item label="设备型号:" prop="unitType">
            <el-input v-model="editForm.unitType" placeholder="请输入设备型号" />
          </el-form-item>
          <el-form-item label="资产分类:" prop="suppliesType">
            <el-input v-model="suppliesType" placeholder="请输入物资分类" disabled />
          </el-form-item>
          <el-form-item label="体积:" prop="size">
            <el-input v-model="editForm.size" placeholder="请输入体积" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="备注:" prop="note">
            <el-input v-model="editForm.note" type="textarea" placeholder="请输入备注" />
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
import { suppliesEdit } from '@/api/deviceManage.js'
export default {
  props: {
    treeId: {
      type: String,
      default: ''
    },
    row: {
      type: Object,
      default: () => {}
    },
    suppliesType: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      editForm: { id: '', assetName: '', factory: '', price: '', code: '', unitType: '', note: '', size: '', itemType: this.treeId },
      editFormRules: {
        code: [{ required: true, message: '请输入操作编号', trigger: 'blur' }],
        assetName: [{ required: true, message: '请输入设备名称', trigger: 'blur' }]
      },
      editFormVisible: false,
      factoryList: [{ name: '华为' }, { name: '思科' }, { name: 'IBM' }, { name: '戴尔' }, { name: 'EMC' }, { name: '惠普' }, { name: 'H3C' }]
    }
  },
  watch: {
    row(newValue, oldVal) {
      this.editForm = Object.assign({}, this.row)
      this.editForm.itemType = this.treeId
    },
    treeId: {
    }
  },
  mounted() {
    this.editForm = Object.assign({}, this.row)
    this.editForm.itemType = this.treeId
  },
  methods: {
    // 取消编辑
    handeleditFormVisible(formName) {
      this.$emit('handeleditFormVisible', this.editFormVisible)
      this.$refs[formName].resetFields()
    },
    // 提交编辑页面
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const param = this.editForm
          suppliesEdit(param).then(response => {
            if (response.success === true) {
              this.$message.success('修改成功')
              this.$emit('handleGetTree1')
              this.$emit('handeleditFormVisible', this.editFormVisible)
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

  }
}
</script>

 <style lang="scss">
 @import "~@/styles/modul.scss";
</style>
