<template>
  <div class="roleManage-addRole">
    <el-row>
      <el-form ref="baseInfo" :model="baseInfo" label-width="140px" :rules="baseInfoRule" :validate-on-rule-change="false" class="addtop">
        <el-col :span="8">
          <el-form-item label="物资编码" prop="name">
            <el-input v-model="baseInfo.name" disabled />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="操作编码" prop="code">
            <el-input v-model="baseInfo.code" placeholder="-请选择-" :disabled="disabledFlg" @focus="chooseCode"><i slot="suffix" class="el-input__icon el-icon-more" /></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="物资名称：" prop="name">
            <el-input v-model="baseInfo.name" disabled />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="物资分类：" prop="name">
            <el-input v-model="baseInfo.name" disabled />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="设备型号" prop="name">
            <el-input v-model="baseInfo.name" disabled />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="设备厂商" prop="name">
            <el-input v-model="baseInfo.name" disabled />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="数量" prop="name">
            <el-input v-model="baseInfo.name" disabled />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="采购价(元)" prop="name">
            <el-input v-model="baseInfo.name" disabled />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="物资状态：" prop="status">
            <el-select v-model="baseInfo.status" popper-class="select-option" placeholder="-请选择状态-">
              <el-option value="1" label="启用" />
              <el-option value="0" label="未启用" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="所属区域" prop="area">
            <el-input v-model="baseInfo.area" placeholder="-请选择-" @focus="showAddArea"><i slot="suffix" class="el-input__icon el-icon-more" /></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="分布位置" prop="name">
            <el-input v-model="baseInfo.name" disabled />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="维保状态：" prop="status">
            <el-select v-model="baseInfo.status" popper-class="select-option" placeholder="-请选择状态-">
              <el-option value="1" label="启用" />
              <el-option value="0" label="未启用" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="维保日期" prop="name">
            <el-date-picker
              v-model="baseInfo.data"
              type="date"
              placeholder="选择日期"
            />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="备注：" prop="description">
            <el-input v-model="baseInfo.description" type="textarea" autocomplete="off" placeholder="请输入角色备注" />
          </el-form-item>
        </el-col>

      </el-form>
    </el-row>
    <div style="text-align:right">
      <el-button v-preventReClick="1000" class="button-sub" @click="saveBaseInfo('baseInfo')">确认</el-button>
      <el-button v-preventReClick="1000" class="button-cancel" @click="this.$parent.handleClose">取消</el-button>
    </div>

    <!-- 操作编码选择 -->
    <el-dialog title="操作编码选择" :append-to-body="true" :close-on-click-modal="false" :visible.sync="showCode" :before-close="codeClose" width="40%">
      <addCode @resCode="resCode" />
    </el-dialog>
    <!-- 所属区域 -->
    <el-dialog title="所属区域选择" :append-to-body="true" :close-on-click-modal="false" :visible.sync="addArea" :before-close="filterClose" width="300px">
      <addFilters :filters-type-id="filtersTypeId" @filterRes="filterRes" />
    </el-dialog>
  </div>
</template>

<script>
// import { saveRole } from '@/api/roleManage'

import addCode from './codeList'
import addFilters from '../../components/addFiltersType'
export default {
  name: 'AddRolePage',
  components: { addFilters, addCode },
  data() {
    var checkNull = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error('请选择区域'))
      } else {
        callback()
      }
    }
    return {
      loading: '0',
      baseInfo: {}, // 基本信息
      baseInfoRule: {
        name: [{ required: true, message: '请输入角色名', trigger: ['blur'] }],
        status: [{ required: true, message: '请选择状态', trigger: ['blur'] }],
        code: [
          { required: true, validator: checkNull, trigger: 'change' }
        ],
        area: [
          { required: true, validator: checkNull, trigger: 'change' }
        ]
      },
      disabledFlg: false,
      filtersTypeId: [],
      addArea: false,

      showCode: false

    }
  },
  mounted() {

  },
  methods: {

    saveBaseInfo() {
      const that = this
      if (this.disabledFlg) {
        // 新增提交
        that.$refs['baseInfo'].validate((valid) => {
          if (valid) {
            // getListSelectNew({ code: this.addForm.code }).then(response => {
            //   if (response.data.count !== 0) {
            //     that.$message.error('编号已存在，不可新增！')
            //     return false
            //   } else {
            //     const param = that.baseInfo
            //     saveRole(param).then(response => {
            //       that.loading = false
            //       if (response.success === true) {
            //         that.$message.success('新增成功')
            //         // that.$emit('handleGetTree1')
            //         // that.handeladdFormVisible()
            //       } else {
            //         that.$message.error(response.msg)
            //       }
            //     }).catch(response => {
            //       that.$message.error(response.message)
            //     })
            //   }
            // }).catch(response => {
            //   that.$message.error(response.message)
            // })
          } else {
            return false
          }
        })
      } else {
        // 修改提交

      }
    },
    addEditRoleDialog(data) {
      if (data) {
        this.disabledFlg = true
        this.baseInfo = data
        console.log(data)
      } else {
        this.$refs['baseInfo'].resetFields()
        this.disabledFlg = false
        this.baseInfo = {}
      }
    },

    // 选编码
    chooseCode() {
      this.showCode = true
      // this.$nextTick(() => {
      //   this.$refs.addEditRole.addEditRoleDialog()
      //   this.$refs.addEditRole.clearContent()
      // })
    },
    codeClose() {
      this.showCode = false
    },
    // 条件选择返回
    resCode(res) {
      if (res) {
        this.showCode = false
        console.log('res:', res)
        this.baseInfo.code = res.code
      }
    },

    // 选择区域
    showAddArea() {
      this.dialogName = '所属区域选择'
      this.addArea = true
      // this.$nextTick(() => {
      //   this.$refs.addEditRole.addEditRoleDialog()
      //   this.$refs.addEditRole.clearContent()
      // })
    },

    filterClose() {
      this.addArea = false
    },
    // 条件选择返回
    filterRes(res) {
      if (res && res.length > 0) {
        this.addArea = false
        this.filtersTypeId = []
        console.log('res:', res)
        const valueArr = []
        for (const value of res) {
          valueArr.push(value.label)
          this.filtersTypeId = value.id
        }
        this.baseInfo.area = valueArr.join(',')
      }
    }

  }
}
</script>

