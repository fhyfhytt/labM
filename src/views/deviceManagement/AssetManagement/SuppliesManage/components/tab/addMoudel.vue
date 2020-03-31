<template>
  <div v-loading="loading" class="dialgAddform1">
    <p class="bkb" />
    <el-form ref="addForm" :model="addForm" label-width="120px" :rules="addFormRules" class="formAdd" style="margin-left:-10px;">
      <el-row class="addtop">
        <el-col :span="12">
          <el-form-item label="物资编码:" prop="assetNo">
            <el-input v-model="addForm.assetNo" disabled />
          </el-form-item>
          <el-form-item label="设备名称:" prop="assetName">
            <el-input v-model="addForm.assetName" placeholder="请输入设备名称" />
          </el-form-item>
          <el-form-item label="设备厂商:" prop="factory">
            <el-select v-model="addForm.factory" popper-class="select-option" placeholder="-请选择-">
              <el-option v-for="item in factoryList" :key="item.name" :label="item.name" :value="item.name" />
            </el-select>
          </el-form-item>
          <el-form-item label="采购价:" prop="price">
            <el-input v-model="addForm.price" placeholder="请输入采购价" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="操作编码:" prop="code">
            <el-input v-model="addForm.code" placeholder="请输入操作编码" />
          </el-form-item>
          <el-form-item label="设备型号:" prop="unitType">
            <el-input v-model="addForm.unitType" placeholder="请输入设备型号" />
          </el-form-item>
          <el-form-item label="资产分类:" prop="suppliesType">
            <el-input v-model="suppliesType" placeholder="请输入物资分类" disabled />
          </el-form-item>
          <el-form-item label="体积:" prop="size">
            <el-input v-model="addForm.size" placeholder="请输入体积" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="备注:" prop="note">
            <el-input v-model="addForm.note" type="textarea" placeholder="请输入备注" />
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
import { suppliesEdit, getSupplies } from '@/api/deviceManage.js'
export default {
  props: {
    treeId: {
      type: String,
      default: ''
    },
    suppliesType: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      addForm: { assetName: '', factory: '', price: '', code: '', unitType: '', note: '', size: '', itemType: this.treeId },
      addFormVisible: false,
      loading: false,
      addFormRules: {
        code: [{ required: true, message: '请输入操作编码', trigger: 'blur' }],
        assetName: [{ required: true, message: '请输入设备名称', trigger: 'blur' }]
      },
      factoryList: [{ name: '华为' }, { name: '思科' }, { name: 'IBM' }, { name: '戴尔' }, { name: 'EMC' }, { name: '惠普' }, { name: 'H3C' }]
    }
  },
  mounted() {
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
          getSupplies({ code: this.addForm.code }).then(response => {
            if (response.data.length !== 0) {
              this.$message.error('编号已存在，不可新增！')
              return false
            } else {
              const param = this.addForm
              suppliesEdit(param).then(response => {
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
