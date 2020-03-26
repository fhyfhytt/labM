<template>
  <div class="DictionarysAdd">
    <p class="bkb" />
    <el-form ref="addForm" :model="addForm" label-width="140px" :rules="addFormRules" class="addtop">
      <el-form-item label="字典编码：" prop="code">
        <el-input v-model="addForm.code" placeholder="请输入字典编码" />
      </el-form-item>
      <el-form-item label="字典名称：" prop="dictName">
        <el-input v-model="addForm.dictName" placeholder="请输入字典名称" />
      </el-form-item>
      <el-form-item label="字典描述：" prop="description">
        <el-input v-model="addForm.description" type="textarea" placeholder="请输入字典描述" />
      </el-form-item>
      <el-form-item label="备注：" prop="remark">
        <el-input v-model="addForm.remark" type="textarea" autocomplete="off" placeholder="请输入备注" />
      </el-form-item>
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
  data() {
    const validatePass2 = (rule, value, callback) => {
      var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>《》/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？ ]")
      var myreg = /^[a-zA-Z]\w{3,15}$/
      if (value === '') {
        callback(new Error('请输入字典编码'))
      } else if (pattern.test(value)) {
        callback(new Error('字典编码不含除-符号以外的符号'))
      } else if (!myreg.test(value)) {
        callback(new Error('字典编码以字母开头的4-16位字母或数字组成'))
      } else {
        callback()
      }
    }
    return {
      // 新增界面数据
      addForm: { code: '', dictName: '', description: '', remark: '' },
      addFormRules: {
        code: [{ required: true, validator: validatePass2, trigger: 'blur' }],
        dictName: [{ required: true, message: '请输入字典名称', trigger: 'blur' }],
        description: [{ required: true, message: '请输入字典描述', trigger: 'blur' }]
      }
    }
  },
  mounted() {
  },
  methods: {
    // 取消新增
    addFormclose() {
      this.$emit('addclose')
      this.addForm = {}
    },
    // 提交新增
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const param = this.addForm
          dictConnAdd(param).then(response => {
            if (response.success === true) {
              this.$message.success(response.msg)
              this.addFormclose()
              this.$emit('resgetDiction')
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
.DictionarysAdd{
   .addtop{
      padding-top:18px;
      margin-left:-13px;
   }
   .el-input__inner {
    // cursor: pointer;
    height: 34px;
    width: 166px;
   }
   .el-form-item__label{
     color:#379EFC;
   }
   //input框间隔
   .el-form-item {
     margin-bottom:22px;
    .el-input{
      font-size: 12px;
    }
  }

   .dialog-footer{
     margin-top: 5px;
   }
   input::-webkit-input-placeholder {
      opacity: 0.5;
   }

   .el-textarea.el-input--medium{
      .el-textarea__inner {
     width:300px;
     margin-left:0px;
     max-height: 70px
   }

   }
   textarea::-webkit-input-placeholder {
      opacity: 0.5;
    }
}
</style>
