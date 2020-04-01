<template>
  <div class="supplierAdd">
    <p class="bkb" />
    <el-form ref="addForm" :model="addForm" label-width="140px" size="small" class="addtop">
      <el-row>
        <el-col :span="10">
          <el-form-item label="设备类型：">
            <el-cascader v-model="addForm.type" :options="selectOptions" :show-all-levels="false" clearable placeholder="请选择设备类型" popper-class="select-option moreSelect" />
          </el-form-item>
        </el-col>
        <el-col :span="10" :offset="1">
          <el-form-item label="设备名称：">
            <el-input v-model="addForm.name" clearable placeholder="请输入设备名称" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10">
          <el-form-item label="桩号：">
            <el-input v-model="addForm.mileage" clearable placeholder="请输入桩号" />
          </el-form-item>
        </el-col>
        <el-col :span="10" :offset="3">
          <el-button class="button-sub" size="small" @click="queryTable">查询</el-button>
        </el-col>
      </el-row>
    </el-form>
    <div class="table-list">
      <el-table
        ref="multipleTable"
        height="280"
        :data="tableList"
        tooltip-effect="light"
        style="width: 97%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column
          label="序号"
          width="70"
          prop="id"
        >
          <template slot-scope="scope">{{ scope.$index + 1 }}</template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="设备名称"
          width="130"
          show-overflow-tooltip
        />
        <el-table-column
          prop="typeName"
          label="设备类型"
          width="130"
          show-overflow-tooltip
        />
        <el-table-column
          prop="mileage"
          label="桩号"
          width="120"
          show-overflow-tooltip
        />
        <el-table-column
          prop="factoryName"
          label="制造商"
          width="150"
          show-overflow-tooltip
        />
      </el-table>
    </div>
    <div class="dialog-footer">
      <el-button size="small" class="button-sub" @click.native="addDetailList">确定</el-button>
      <el-button size="small" class="button-cancle" @click="addFormclose">取消</el-button>
    </div>
  </div>
</template>

<script>
import common from '@/utils/common'
export default {
  props: {
    tunId: {
      type: String,
      default: ''
    },
    devFacIds: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      // 新增界面数据
      addForm: {},
      tableList: [],
      // 表格选择的数据
      selectedData: [],
      // 确定按钮传回的数据
      list: [],
      selectOptions: this.$store.state.projectManage.selectOptions
    }
  },
  mounted() {
    this.getDetailList()
  },
  methods: {
    // 巡检清单（库内添加设备）列表查询
    getDetailList() {
      var typeS = ''
      if (Array.isArray(this.addForm.type)) {
        typeS = this.addForm.type[this.addForm.type.length - 1]
      }
      const param = {
        tunId: this.tunId,
        typeS: typeS,
        mileage: this.addForm.mileage,
        name: this.addForm.name,
        devFacIds: this.devFacIds
      }
      common.selectDevToDetail(param).then(res => {
        if (res.success) {
          this.tableList = res.data
        } else {
          this.$message({
            showClose: true,
            message: res.msg,
            type: 'error'
          })
        }
      }).catch(res => {
        this.$message({
          showClose: true,
          message: res.msg,
          type: 'info'
        })
      })
    },
    // 表格勾选数据
    handleSelectionChange(value) {
      this.selectedData = value
    },
    // 查询
    queryTable() {
      this.getDetailList()
    },
    // 取消新增
    addFormclose() {
      this.$emit('addclose')
    },
    // 确定按钮
    addDetailList() {
      if (this.selectedData.length === 0) {
        this.$message({
          showClose: true,
          message: '请至少选择一条设备',
          type: 'error'
        })
        return
      } else {
        this.list = []
        this.selectedData.forEach((item, index) => {
          item.devFacType = '1'
          item.isInterior = '1'
          this.list.push(item)
        })
        this.$emit('addList', this.list)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.addtop {
    margin-left: -30px;
}
.registion .supplierAdd {
  >>> .el-form-item .el-input__suffix {
    left: 135px !important;
  }
}
.table-list {
    margin-left: 20px;
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
  }
  .el-form-item.is-success .el-input__inner{
    border-color: #00eeee;
  }
   .dialog-footer{
     margin-top: 10px;
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
