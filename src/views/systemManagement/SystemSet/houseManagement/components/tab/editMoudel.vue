<template>
  <div v-loading="loading" class="dialgEditform1">
    <el-form ref="editForm" :model="editForm" label-width="120px" :rules="addFormRules" class="formAdd">
      <el-row class="addtop">
        <el-col :span="12">

          <el-form-item label="库房编号:" prop="code">
            <el-input v-model="editForm.code" autocomplete="off" placeholder="请输入库房编号" />
          </el-form-item>

          <el-form-item label="库房类型:" prop="type">
            <el-select v-model="editForm.type" value-key="name" popper-class="select-option" placeholder="-请选择库房类型-">
              <el-option v-for="item in selecthouseType" :key="item.code" :label="item.name" :value="item" />
            </el-select>
          </el-form-item>

          <el-form-item label="库房管理员:" prop="person">
            <el-input v-model="editForm.person" autocomplete="off" placeholder="-点击选择管理员-" readonly @click.native="addNewUser" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="库房名称:" prop="name">
            <el-input v-model="editForm.name" autocomplete="off" placeholder="请输入库房名称" />
          </el-form-item>
          <el-form-item label="库房状态:" prop="state">
            <el-select v-model="editForm.state" value-key="name" popper-class="select-option" placeholder="-请选择库房状态-">
              <el-option v-for="item in selecthouseState" :key="item.code" :label="item.name" :value="item" />
            </el-select>
          </el-form-item>
          <el-form-item label="管理员电话:" prop="personMobile">
            <el-input v-model="editForm.personMobile" autocomplete="off" readonly />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
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
    <el-dialog title="选择人员" append-to-body :visible.sync="addUserVisible" :before-close="handleAddNewUser" width="45%" class="addHouseUserDialog">
      <div>
        <el-row style="margin-bottom:10px">
          关键字 :
          <el-input v-model="primaryKey" placeholder="请输入姓名或工号" style="width:200px;margin:0px 10px" />
          <el-button class="button-sub btn btn2" @click="searchNewUsers">查询</el-button>
        <!-- <el-button class="button-sub btn btn2" @click="confirmAddUsers">确认</el-button> -->
        </el-row>
        <el-table ref="userInfoTable" v-loading="userloading" :data="userUnselectedInfo" tooltip-effect="dark" height="435" style="width: 100%;height:400px" @row-click="selectUserInfoRow">
          <el-table-column type="index" label="序号" width="60" />
          <el-table-column prop="userCode" label="工号" />
          <el-table-column prop="personName" label="姓名" />
          <el-table-column prop="mobile" label="手机" />
          <el-table-column prop="email" label="邮箱" />
        </el-table>
        <div class="numListJup " style="padding-right:70px">
          <el-pagination :page-size="userPageSize" :page-sizes="[10, 20, 50, 100]" layout="total,sizes,prev, pager, next, jumper" :total="userTotalCount" :current-page.sync="selectUserPage" @size-change="handleUserSizeChange" @current-change="handleSelectUserChange" />
        <!-- <div class="sendAllBtn">
            <span>跳转</span>
          </div> -->
        </div>
      </div>
    </el-dialog>
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
        state: [{ required: true, message: '请选择库房状态', trigger: ['blur', 'change'] }],
        type: [{ required: true, message: '请选择库房类型', trigger: ['blur', 'change'] }]
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
      }
    }).catch(res => {
      this.$message.error(res.msg)
    })
    common.getDictNameList({ dictName: '库房类型', dictNameIsLike: 0 }).then(res => {
      if (res.success === true) {
        this.$nextTick(() => {
          this.selecthouseType = res.data
        })
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
      this.editForm.person = row.personName
      this.editForm.personMobile = row.mobile
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
      // this.editForm.person = ''
      // this.editForm.personMobile = ''
      this.addUserVisible = true
      this.handleGetUnselectRoleUsers(this.editForm.person)
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
