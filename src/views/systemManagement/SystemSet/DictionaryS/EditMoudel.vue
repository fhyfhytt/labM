<template>
  <div class="DictionarysEdit">
    <p class="bkb" />
    <el-form ref="editForm" :model="editForm" label-width="140px" :rules="editFormRules" class="edittop">
      <el-form-item label="字典名称：" prop="name">
        <el-input v-model="editForm.name" placeholder="请输入字典名称" />
      </el-form-item>
      <el-form-item label="字典描述：" prop="description">
        <el-input v-model="editForm.description" type="textarea" placeholder="请输入字典描述" />
      </el-form-item>
      <el-form-item label="备注：" prop="remark">
        <el-input v-model="editForm.remark" type="textarea" autocomplete="off" placeholder="请输入备注" />
      </el-form-item>
    </el-form>
    <div class="dialog-footer">
      <el-button size="medium" class="button-sub" @click.native="submitForm('editForm')">确定</el-button>
      <el-button size="medium" class="button-cancel" @click="addFormclose('editForm')">取消</el-button>
    </div>
  </div>
</template>

<script>
// import { groupEdit } from '@/api/manage.js'
import { dictUpdate } from '@/api/Dictionarys.js'
export default {
  props: {
    row: {
      type: Object,
      default: () => {}
    },
    dictId: {
      type: String,
      default: () => ''
    }
  },
  data() {
    return {
      // 新增界面数据
      editForm: { name: '', description: '', remark: '' },
      editFormRules: {
        name: [{ required: true, message: '请输入字典名称', trigger: 'blur' }],
        description: [{ required: true, message: '请输入字典描述', trigger: 'blur' }]
      }
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
    addFormclose(formName) {
      this.$emit('editclose')
      this.$refs[formName].resetFields()
    },
    // 提交编辑
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const param = {
            dictName: this.editForm.name,
            description: this.editForm.description,
            remark: this.editForm.remark,
            dictId: this.dictId,
            flag: '1'
          }
          dictUpdate(param).then(response => {
            if (response.success === true) {
              this.$message.success(response.msg)
              this.$emit('editclose')
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

<style lang="scss" >
.DictionarysEdit{
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
     color:#5B92FF;
   }
   //input框间隔
   .el-form-item {
     margin-bottom:22px;
    .el-input{
      font-size: 12px;
    }
  }

   .dialog-footer{
     text-align: center;
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
