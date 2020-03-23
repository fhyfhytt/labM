<template>
  <div v-loading="loading" class="dialgAddform1">
    <el-form ref="addForm" :model="addForm" label-width="120px" :rules="addFormRules" class="formAdd">
      <el-row class="addtop">
        <el-col :span="24" style="border-bottom: 2px solid #1890ff;color:#1890ff;margin-bottom:20px;">
          <h3>审核备注</h3>
        </el-col>
        <el-col :span="24">
          <el-form-item label="审核状态" prop="state">
            <el-select v-model="addForm.state" value-key="code" popper-class="select-option" placeholder="-请选择-">
              <el-option v-for="item in selecthouseState" :key="item.code" :label="item.name" :value="item.code" />
            </el-select>
            <!-- <el-select popper-class="select-option" placeholder="-请选择-">
              <el-option label="审核通过" value="1" />
              <el-option label="审核未通过" value="0" />
            </el-select> -->
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="备注:" prop="memo">
            <el-input v-model="addForm.memo" type="textarea" placeholder="请输入备注" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="dialog-footer">
      <el-button size="medium " class="button-cancel" @click="handeladdFormVisible">取消</el-button>
      <el-button size="medium " class="button-sub" @click.native="submitForm('addForm')">确定</el-button>
    </div>
  </div>

</template>

<script>
import { searchRoleUsers } from '@/api/roleManage'
import { dictUpdate } from '@/api/house.js'
import common from '@/utils/common'
export default {
  data() {
    return {
      // 新增界面数据  state: '',
      addForm: { state: '', memo: '', personId: '' },
      addFormVisible: false,
      addFormRules: {
        state: [{ required: true, message: '请选择库房状态', trigger: 'blur' }]
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
  methods: {
    // 取消新增
    handeladdFormVisible(addFormVisible) {
      this.$emit('handeladdFormVisible', this.addFormVisible)
      this.addForm = {}
    },
    // 提交新增
    submitForm(addform) {
      this.$refs[addform].validate((valid) => {
        if (valid) {
          this.loading = true
          const param = this.addForm
          dictUpdate(param).then(response => {
            this.loading = false
            if (response.success === true) {
              this.$message.success('新增成功')
              this.$emit('handleGetTree1')
              this.handeladdFormVisible()
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
    },
    selectUserInfoRow(row) {
      console.log(row)
      this.addForm.person = row.name
      this.addForm.personMobile = row.personMobile
      this.addForm.personId = row.id
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
    //   this.addForm = {}
    // }
    }, // 添加新成员
    addNewUser() {
      this.addForm.person = ''
      this.addForm.personMobile = ''
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
</style>
