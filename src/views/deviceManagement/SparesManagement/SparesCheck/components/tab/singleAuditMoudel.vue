<template>
  <div v-loading="loading" class="dialgEditform1">
    <el-form ref="AuditForm" :model="AuditForm" label-width="80px" class="formAdd">
      <h3 class="title">基本信息</h3>
      <el-row class="addtop">
        <el-col :span="8">
          <el-form-item label="资产编码:" prop="assetNo">
            <el-input v-model="AuditForm.assetInfo.assetNo" autocomplete="off" readonly />
          </el-form-item>
          <el-form-item label="设备型号:" prop="unitType">
            <el-input v-model="AuditForm.unitType" autocomplete="off" readonly />
          </el-form-item>
          <el-form-item label="资产分类:" prop="itemType">
            <el-input v-model="AuditForm.itemType" autocomplete="off" readonly />
          </el-form-item>
          <el-form-item label="维保状态:" prop="maintranStatusS">
            <el-input v-model="AuditForm.maintranStatusS" autocomplete="off" readonly />
          </el-form-item>

        </el-col>
        <el-col :span="8">
          <el-form-item label="资产名称:" prop="assetName">
            <el-input v-model="AuditForm.assetInfo.assetName" autocomplete="off" />
          </el-form-item>
          <el-form-item label="设备厂商:" prop="factory">
            <el-input v-model="AuditForm.assetInfo.factory" autocomplete="off" readonly />
          </el-form-item>
          <el-form-item label="数量:" prop="num">
            <el-input v-model="AuditForm.num" autocomplete="off" readonly />
          </el-form-item>
          <el-form-item label="维保时间:" prop="maintranDate">
            <el-input v-model="AuditForm.maintranDate" autocomplete="off" readonly />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="资产状态:" prop="status">
            <el-input v-model="AuditForm.status" autocomplete="off" readonly />
          </el-form-item>
          <el-form-item label="所属库房:" prop="house">
            <el-input v-model="AuditForm.house" autocomplete="off" readonly />
          </el-form-item>
          <el-form-item label="采购价:" prop="price">
            <el-input v-model="AuditForm.price" autocomplete="off" readonly />
          </el-form-item>
          <el-form-item label="存放位置:" prop="location">
            <el-input v-model="AuditForm.location" autocomplete="off" readonly />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <h3 class="title" style="">审核备注</h3>
        <el-col :span="24">
          <el-form-item label="审核状态:">
            <el-select v-model="AuditForm.checkStatus" value-key="checkStatus" popper-class="select-option" placeholder="-请选择-">
              <el-option v-for="item in selectAuditState" :key="item.checkStatus" :label="item.checkStatusS" :value="item.checkStatusS" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="备注:" prop="checkNote">
            <el-input v-model="AuditForm.checkNote" type="textarea" placeholder="请输入备注" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="dialog-footer">
      <el-button size="medium " class="button-cancel" @click="handelsingleAuditVisible('AuditForm')">取消</el-button>
      <el-button size="medium " class="button-sub" @click.native="submitForm('AuditForm')">确定</el-button>
    </div>
  </div>

</template>

<script>
import { dictUpdate } from '@/api/house.js'
// import common from '@/utils/common'
export default {
  props: {
    row: {
      type: Object,
      default: () => { }
    }
  },
  data() {
    return {
      AuditForm: { assetInfo: '', itemType: '', dataFrom: '', house: '', maintranStatusS: '', maintranDate: '', num: '', area: '', price: '' },
      singleAuditVisible: false,
      // dataFrom: [],
      selectAuditState: [
        {
          checkStatus: 0,
          checkStatusS: '审核未通过'
        },
        {
          checkStatus: 1,
          checkStatusS: '审核通过'
        }
      ], // 审核状态
      loading: false,
      addUserVisible: false,
      primaryKey: '' // 查询参数
    }
  },

  created() {
    // common.getDictNameList({ dictName: '库房状态', dictNameIsLike: 0 }).then(res => {
    //   if (res.success === true) {
    //     this.$nextTick(() => {
    //       this.selectAuditState = res.data
    //     })
    //   } else {
    //     if (res.data !== '') {
    //       this.$message.error(res.data)
    //     } else {
    //       this.$message.error(res.msg)
    //     }
    //   }
    // }).catch(res => {
    //   this.$message.error(res.msg)
    // })
    // common.getDictNameList({ dictName: '库房类型', dictNameIsLike: 0 }).then(res => {
    //   if (res.success === true) {
    //     this.$nextTick(() => {
    //       this.selecthouseType = res.data
    //     })
    //   } else {
    //     if (res.data !== '') {
    //       this.$message.error(res.data)
    //     } else {
    //       this.$message.error(res.msg)
    //     }
    //   }
    // }).catch(res => {
    //   this.$message.error(res.msg)
    // })
  },
  mounted() {
    this.AuditForm = Object.assign({}, this.row)
    this.AuditForm.personMobile = this.AuditForm.personMobile
    this.AuditForm.type = { name: this.row.type }// 传入对象
    this.AuditForm.state = { name: this.row.state }// 传入对象
  },
  methods: {
    // 取消新增
    handelsingleAuditVisible(singleAuditVisible) {
      this.$emit('handelsingleAuditVisible', this.singleAuditVisible)
      this.AuditForm = {}
    },
    // 提交新增
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true
          const param = Object.assign({}, this.AuditForm)
          param.type = this.AuditForm.type.code
          param.state = this.AuditForm.state.code
          dictUpdate(param).then(response => {
            this.loading = false
            if (response.success === true) {
              this.$message.success('修改成功')
              this.$emit('handleGetTree1')
              this.handelsingleAuditVisible()
            } else {
              this.$message.error(response.msg)
            }
          }).catch(response => {
            this.loading = false
            this.$message.error(response.msg)
          })
        } else {
          return false
        }
      })
    },
    selectUserInfoRow(row) {
      this.AuditForm.person = row.name
      this.AuditForm.personMobile = row.personMobile
      this.AuditForm.personId = row.id
      this.addUserVisible = false
    }
  }
}
</script>

<style lang="scss">
@import '~@/styles/modul.scss';
</style>
<style lang="scss" scoped>
  .dialgEditform1 .addtop {
    .el-form-item {
      margin-bottom: 10px;
      border-bottom: 1px solid #c7cbd6;
    }
  }
  /deep/.addtop .el-input__inner {
    border: none!important;
  }
  .dialgEditform1 .title {
    border-bottom: 2px solid #c7cbd6;color:#1890ff;height:30px;
  }
  .el-form-item__content {
    margin-left:80px;
  }
  .dialgEditform1 /deep/.el-form-item__label{
    color:#292929 !important;
  }
</style>
