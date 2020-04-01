<template>
  <div class="supplierAdd">
    <p class="bkb" />
    <el-form ref="addForm" :model="addForm" label-width="140px" size="small" :rules="addFormRules" class="addtop">
      <el-row>
        <el-col :span="12">
          <el-form-item label="设备名称：" prop="name" :rules="filter_rules({required:true, maxLength:30, name: '设备名称'})">
            <el-input v-model="addForm.name" clearable placeholder="请输入设备名称" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="设备类型：" prop="type">
            <el-cascader v-model="addForm.type" :options="selectOptions" :show-all-levels="false" clearable placeholder="请选择设备类型" popper-class="select-option moreSelect" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="位置：" prop="mileage" :rules="filter_rules({maxLength:20, name: '位置'})">
            <el-input v-model="addForm.mileage" clearable placeholder="请输入位置" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="制造商：" prop="factoryName" :rules="filter_rules({maxLength:30, name: '制造商'})">
            <el-input v-model="addForm.factoryName" clearable placeholder="请输入制造商" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="dialog-footer">
      <el-button v-preventReClick size="small" class="button-sub" @click.native="addDevice">确定</el-button>
      <el-button size="small" class="button-cancle" @click="addFormclose">取消</el-button>
    </div>
  </div>
</template>

<script>
import { handleDeviceName } from '@/utils/threeTunnel'
export default {
  props: {
  },
  data() {
    return {
      // 新增界面数据
      addForm: {},
      addFormRules: {
        type: [{ required: true, type: 'array', message: '请选择设备类型', trigger: 'change' }]
      },
      selectOptions: this.$store.state.projectManage.selectOptions
    }
  },
  mounted() {
  },
  methods: {
    // 取消新增
    addFormclose() {
      this.$emit('addclose')
    },
    // 确定按钮 将所添加的设备插入到表格中
    addDevice() {
      this.$refs['addForm'].validate((valid) => {
        if (valid) {
          this.addForm.typeName = handleDeviceName(this.addForm.type[this.addForm.type.length - 1])
          this.list = [this.addForm]
          this.$emit('addListOut', this.list)
        } else {
          return false
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.addtop {
    margin-left: 75px;
}
.registion .supplierAdd {
  >>> .el-form-item .el-input__suffix {
    left: 135px !important;
  }
}
</style>
<style lang="scss">
.supplierAdd{
  .el-row {
    height: 50px;
  }
   .el-input--small {
     .el-input__inner {
      height: 30px;
      width: 166px !important;
    }
     .el-textarea__inner {
       width: 503px !important;
     }
   }
   .el-form-item__label{
     color:#00eeee;
   }
   //input框间隔
   .el-form-item {
    margin-bottom: 0px;
    .el-input{
      font-size: 12px;
    }
  }
  .el-form-item__error{
    top:76%;
    width: 120px;
  }
  .el-form-item.is-success .el-input__inner{
    border-color: #00eeee;
  }
   .dialog-footer{
     text-align: center;
   }
   input::-webkit-input-placeholder {
      opacity: 0.5;
   }
   .el-textarea.el-input--medium .el-textarea__inner {
      height: 70px;
   }
   textarea::-webkit-input-placeholder {
      opacity: 0.5;
    }
}
</style>
