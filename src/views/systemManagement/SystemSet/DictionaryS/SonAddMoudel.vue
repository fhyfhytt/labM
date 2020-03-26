<template>
  <div class="DictionarysSonAdd">
    <p class="bkb" />
    <el-form ref="addForm" :model="addForm" label-width="120px" :rules="addFormRules" class="addtop">
      <el-row>
        <el-col :span="12">
          <el-form-item label="子项名称：" prop="name">
            <el-input v-model="addForm.name" placeholder="请输入字典子项名称" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="显示顺序：" prop="level">
            <el-input v-model="addForm.level" autocomplete="off" placeholder="请输入备注" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="描述：" prop="description">
            <el-input v-model="addForm.description" type="textarea" placeholder="请输入字典子项描述" />
          </el-form-item>
        </el-col>
      </el-row>

    </el-form>
    <div class="dialog-footer">
      <el-button size="medium" class="button-cancel" @click="addFormclose">取消</el-button>
      <el-button size="medium" class="button-sub" @click.native="submitForm('addForm')">确定</el-button>

    </div>
  </div>
</template>

<script>
// import { groupEdit } from '@/api/manage.js'
import { dictConnAdd } from '@/api/Dictionarys.js'
export default {
  props: {
    dictId: {
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
        callback(new Error('请输入1-20的整数'))
      } else {
        callback()
      }
    }
    return {
      // 新增界面数据
      addForm: { name: '', description: '', level: '' },
      addFormRules: {
        name: [{ required: true, message: '请输入字典子项名称', trigger: 'blur' }],
        description: [{ required: true, message: '请输入字典子项描述', trigger: 'blur' }],
        level: [{ required: true, validator: validatelevel, trigger: 'blur' }]
      }
    }
  },
  mounted() {
  },
  methods: {
    // 取消新增
    addFormclose() {
      this.$emit('Sonaddclose')
      this.addForm = {}
    },
    // 提交新增
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const param = {}
          param.dictId = this.dictId
          param.dictItemList = [{ name: this.addForm.name, description: this.addForm.description, level: this.addForm.level }]
          dictConnAdd(param).then(response => {
            if (response.success === true) {
              this.$message.success(response.msg)
              this.addFormclose()
              this.$emit('resGetSontable')
            } else {
              this.$message.error(response.msg)
            }
          }).catch(response => {
            this.$message.error(response.msg)
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
