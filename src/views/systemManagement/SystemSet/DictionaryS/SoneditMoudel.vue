<template>
  <div class="DictionarysSonedit">
    <p class="bkb" />
    <el-form ref="editForm" :model="editForm" label-width="120px" :rules="editFormRules" class="addtop">
      <el-row>
        <el-col :span="12">
          <el-form-item label="子项名称：" prop="name">
            <el-input v-model="editForm.name" placeholder="请输入字典子项名称" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="显示顺序：" prop="level">
            <el-input v-model="editForm.level" autocomplete="off" placeholder="请输入备注" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="描述：" prop="description">
            <el-input v-model="editForm.description" type="textarea" placeholder="请输入字典子项描述" />
          </el-form-item>
        </el-col>
      </el-row>

    </el-form>
    <div class="dialog-footer">
      <el-button size="medium" class="button-cancel" @click="editFormclose('editForm')">取消</el-button>
      <el-button size="medium" class="button-sub" @click.native="submitForm('editForm')">确定</el-button>

    </div>
  </div>
</template>

<script>
// import { groupEdit } from '@/api/manage.js'
import { dictUpdate } from '@/api/Dictionarys.js'
export default {
  props: {
    looklist: {
      type: Object,
      default: () => { }
    },
    dictId: {
      type: String,
      default: () => ''
    },
    parentName: {
      type: String,
      default: () => ''
    }
  },
  data() {
    var validatelevel = (rule, value, callback) => {
      var myreg = /^(0?[1-9]|1[0-9]|20)$/
      if (value === '') {
        callback(new Error('请输入显示顺序'))
      } else if (!myreg.test(value)) {
        callback(new Error('请输入1-20的整数显示'))
      } else {
        callback()
      }
    }
    return {
      // 新增界面数据
      editForm: { name: '', description: '', level: '' },
      editFormRules: {
        name: [{ required: true, message: '请输入字典子项名称', trigger: 'blur' }],
        description: [{ required: true, message: '请输入字典子项描述', trigger: 'blur' }],
        level: [{ required: true, validator: validatelevel, trigger: 'blur' }]
      }
    }
  },
  watch: {
    looklist(newValue, oldValue) {
      this.editForm = Object.assign({}, newValue)
      //   console.log('editroe', this.editForm)
    }
  },
  mounted() {
    // this.editForm = this.looklist
    this.editForm = Object.assign({}, this.looklist)
  },
  methods: {
    // 取消编辑
    editFormclose(formName) {
      this.$emit('Soneditclose')
      this.$refs[formName].resetFields()
    },
    // 提交编辑
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //   const param = this.addForm
          //   const param = {}
          //   param.ids = this.editForm.id
          //   param.flag = '2'
          //   param.dictItemList = [{ name: this.editForm.name, description: this.editForm.description, level: this.editForm.level }]
          const param = {
            dictName: this.editForm.name,
            description: this.editForm.description,
            level: this.editForm.level,
            ids: this.editForm.id,
            flag: '2'
            // dictName: this.parentName
          }
          dictUpdate(param).then(response => {
            if (response.success === true) {
              this.$message.success(response.msg)
              this.$emit('Soneditclose')
              this.$emit('resGetSontable')
            } else {
              this.$message.error(response.msg)
            }
          }).catch(response => {
            this.$message.error(response.message)
          })
        } else {
          //   console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss">
   .scope-caozuo {
        margin-left: 12px;
        margin-right: 8px;
        font-size: 19px;
        cursor: pointer;
        color:#379EFC;
        &:hover{
          color:#B3CCFF
        }
        &:active{
          color:#4B7BDB
        }
      }
</style>
