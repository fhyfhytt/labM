<template>
  <div v-loading="loading" class="dialgEditform1">
    <el-form ref="editForm" :model="editForm" label-width="120px" :rules="addFormRules" class="formAdd">
      <div class="minTitle">基本信息</div>
      <el-row>
        <el-col :span="8">
          <el-form-item label="资产编号：" prop="type">
            <span>{{ editForm.code }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="资产名称" prop="person">
            <span>{{ editForm.name }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="资产分类" prop="name">
            <span>{{ editForm.name }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="设备型号" prop="state">
            <span>{{ editForm.name }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="设备厂商" prop="personMobile">
            <span>{{ editForm.personMobile }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="所属区域" prop="personMobile">
            <span>{{ editForm.personMobile }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="资产分类" prop="personMobile">
            <span>{{ editForm.personMobile }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="数量" prop="personMobile">
            <span>{{ editForm.personMobile }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="采购价（元）" prop="personMobile">
            <span>{{ editForm.personMobile }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="维保状态" prop="personMobile">
            <span>{{ editForm.personMobile }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="维保日期" prop="personMobile">
            <span>{{ editForm.personMobile }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="分布位置" prop="personMobile">
            <span>{{ editForm.personMobile }}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <div class="minTitle">审核备注</div>
      <el-row>
        <el-col :span="8">
          <el-form-item label="分布位置" prop="personMobile">
            <el-select v-model="editForm.state" value-key="name" popper-class="select-option" placeholder="-请选择库房状态-">
              <el-option v-for="item in selecthouseState" :key="item.code" :label="item.name" :value="item" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="备注:" prop="memo">
            <el-input v-model="editForm.memo" type="textarea" placeholder="请输入备注" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="dialog-footer">
      <el-button size="medium " class="button-cancel" @click="handeleditFormVisible('editForm')">取消</el-button>
      <el-button size="medium " class="button-sub" @click.native="submitForm('editForm')">确定</el-button>
    </div>
  </div>

</template>

<script>
import { searchRoleUsers } from '@/api/roleManage'
import { dictUpdate } from '@/api/house.js'
import common from '@/utils/common'
export default {
  props: {
    row: {
      type: Object,
      default: () => { }
    }
  },
  data() {
    return {
      // 新增界面数据  state: '',
      editForm: { code: '', name: '', person: '', state: '', type: '', memo: '', typecode: '', statecode: '' },
      editFormVisible: false,
      addFormRules: {
        code: [{ required: true, message: '请输入库房编号', trigger: 'blur' }],
        name: [{ required: true, message: '请输入库房名称', trigger: 'blur' }],
        person: [{ required: true, message: '请选择库房管理员', trigger: 'change' }],
        state: [{ required: true, message: '请选择库房状态', trigger: 'blur' }],
        type: [{ required: true, message: '请选择库房类型', trigger: 'blur' }]
      },
      selecthouseType: [],
      selecthouseState: [],
      loading: false,
      addUserVisible: false,
      userloading: true,
      userUnselectedInfo: [],
      userTotalCount: 0, // 未选择人数页数
      userPageSize: 10, // 选择人员每页个数
      selectUserPage: 1, // 为选择人员页数
      primaryKey: '' // 查询参数
    }
  },

  created() {
    common.getDictNameList({ dictName: '库房状态', dictNameIsLike: 0 }).then(res => {
      if (res.success === true) {
        this.$nextTick(() => {
          this.selecthouseState = res.data
        })
      } else {
        if (res.data !== '') {
          this.$message.error(res.data)
        } else {
          this.$message.error(res.msg)
        }
      }
    }).catch(res => {
      this.$message.error(res.msg)
    })
    common.getDictNameList({ dictName: '库房类型', dictNameIsLike: 0 }).then(res => {
      if (res.success === true) {
        this.$nextTick(() => {
          this.selecthouseType = res.data
        })
      } else {
        if (res.data !== '') {
          this.$message.error(res.data)
        } else {
          this.$message.error(res.msg)
        }
      }
    }).catch(res => {
      this.$message.error(res.msg)
    })
  },
  mounted() {
    this.editForm = Object.assign({}, this.row)
    this.editForm.personMobile = this.editForm.personMobile
    this.editForm.type = { name: this.row.type }// 传入对象
    this.editForm.state = { name: this.row.state }// 传入对象
  },
  methods: {
    // 取消新增
    handeleditFormVisible(editFormVisible) {
      this.$emit('handeleditFormVisible', this.editFormVisible)
      this.editForm = {}
    },
    // 提交新增
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true
          const param = Object.assign({}, this.editForm)
          param.type = this.editForm.type.code
          param.state = this.editForm.state.code
          dictUpdate(param).then(response => {
            this.loading = false
            if (response.success === true) {
              this.$message.success('修改成功')
              this.$emit('handleGetTree1')
              this.handeleditFormVisible()
            } else {
              this.$message.error(response.msg)
            }
          }).catch(response => {
            this.loading = false
            this.$message.error(response.msg)
          })
        } else {
          // console.log('error submit!!')
          return false
        }
      })
    }, selectUserInfoRow(row) {
      this.editForm.person = row.name
      this.editForm.personMobile = row.personMobile
      this.editForm.personId = row.id
      this.addUserVisible = false
    }, handleUserSizeChange(val) {
      this.userPageSize = val
      this.handleGetUnselectRoleUsers()
    }, // 未添加人员信息列表
    handleSelectUserChange() {
      this.handleGetUnselectRoleUsers()
    }, // 获取未选择的人员
    handleGetUnselectRoleUsers(data) {
      searchRoleUsers({ pageSize: this.userPageSize, pageNumber: this.selectUserPage, name: data }).then(res => {
        this.userloading = false
        if (res.success === true) {
          this.userUnselectedInfo = res.data.rows
          this.userTotalCount = res.data.totalCount
        } else {
          this.$message.error(res.msg)
        }
      }).catch(e => {
        this.userloading = false
        this.$message.error(e.msg)
      })
    // 清空新增数据
    // clearDate() {
    //   this.editForm = {}
    // }
    }, // 添加新成员
    addNewUser() {
      this.editForm.person = ''
      this.editForm.personMobile = ''
      this.addUserVisible = true
      this.handleGetUnselectRoleUsers()
    }, // 查询要新添加的用户
    searchNewUsers() {
      this.selectUserPage = 1
      this.handleGetUnselectRoleUsers(this.primaryKey)
    }
  }
}
</script>

<style lang="scss">
@import '~@/styles/modul.scss';
.el-form-item--medium .el-form-item__label {
  line-height: 34px;
}
.minTitle {margin:0 0 10px 0;color: #38a4ed;padding-bottom: 10px;font-weight: bold;border-bottom: 2px solid #ddd;}
</style>
