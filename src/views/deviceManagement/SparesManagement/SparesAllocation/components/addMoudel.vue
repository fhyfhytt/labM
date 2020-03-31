<template>
  <div v-loading="loading" class="roleManage-addRole">
    <el-steps :active="active" finish-status="success" simple>
      <el-step title="基本信息">
        <span slot="icon" class="icontext">1</span>
      </el-step>
      <el-step title="添加设备"><span slot="icon" class="icontext">2</span></el-step>
    </el-steps>
    <el-tabs v-model="activeName">
      <el-tab-pane label="基本信息" name="0" :disabled="pane1" style="height:490px">
        <el-row style="margin-top:50px;">
          <el-form ref="baseInfo" :model="baseInfo" label-width="140px" :rules="baseInfoRule" :validate-on-rule-change="false" class="addtop">
            <el-col :span="12">
              <el-form-item label="调出仓库:" prop="outHouse">
                <el-input v-model="baseInfo.outHouse" placeholder="-请选择-" clearable @focus="showAddFiltersType" />
              </el-form-item>
              <el-form-item label="日期:" prop="date">
                <el-col>
                  <el-date-picker v-model="baseInfo.date" type="date" placeholder="选择日期" style="width: 100%;" />
                </el-col>
              </el-form-item>
              <el-form-item label="接收人：" prop="recevier">
                <el-input v-model="baseInfo.recevier" placeholder="-请选择-" clearable @focus="addNewUser" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="调入仓库:" prop="inHouse">
                <el-input v-model="baseInfo.inHouse" placeholder="-请选择-" clearable @focus="showAddFiltersType" />
              </el-form-item>
              <el-form-item label="操作人:" prop="operator">
                <el-input v-model="baseInfo.operator" style="background:transparent" placeholder="请输入操作人" disabled />
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="调拨原因：" prop="reason">
                <el-input v-model="baseInfo.reason" type="textarea" autocomplete="off" placeholder="请输入调拨原因" />
              </el-form-item>
            </el-col>
          </el-form>
        </el-row>
        <div style="position:absolute;bottom:0px;right:0">
          <el-button v-preventReClick="1000" class="button-sub" @click="saveBaseInfo('baseInfo')">下一步</el-button>
        </div>
      </el-tab-pane>
      <el-tab-pane label="添加设备" name="1" :disabled="pane2">
        <el-row style="margin-bottom:10px">
          <div style="display:inline-block">
            <el-button class="button-sub btn" icon="iconfont icontianjia1" @click="addNewDevices">选择在库资产</el-button>
            <el-button class="button-sub btn" icon="iconfont iconxingzhuang1 " style="margin-right:5px">批量删除</el-button>
          </div>
        </el-row>
        <el-table ref="userTable" :data="userInfo" tooltip-effect="dark" height="380" style="width: 100%;height:300px">
          <!--  @row-click="selectUserRow" @selection-change="handleSelectionChange" -->
          <el-table-column type="selection" width="60" />
          <el-table-column type="index" label="序号" width="60" />
          <el-table-column prop="userCode" label="资产编号" />
          <el-table-column prop="name" label="资产名称" />
          <el-table-column prop="name" label="资产型号" />
          <el-table-column prop="name" label="设备总数（需编辑）" width="150" />
          <el-table-column prop="name" label="资产状态" />
        </el-table>
        <div style="text-align:right;margin-top:40px;">
          <el-button v-preventReClick="1000" size="small" class="button-cancel" @click.native="prev(0)">上一步</el-button>
          <!-- @click="saveUserInfo"-->
          <el-button v-preventReClick="1000" class="button-sub">完 成</el-button>
        </div>
      </el-tab-pane>
    </el-tabs>

    <!-- 接收人弹框  :before-close="handleAddNewUser" -->
    <el-dialog title="选择人员" append-to-body :visible.sync="addUserVisible" width="45%" class="addRoleUserDialog">
      <userSearch ref="userSearch" @setReciver="setReciver" />
    </el-dialog>

    <!-- 添加设备弹框 -->
    <el-dialog title="选择设备" append-to-body :visible.sync="addDeviceVisible" width="45%" class="addRoleUserDialog">
      <deviceSearch ref="deviceSearch" />
    </el-dialog>

    <!-- 树 -->
    <el-dialog append-to-body :title="dialogName" :close-on-click-modal="false" :visible.sync="addFiltersVisible" :before-close="filterClose" width="300px">
      <addFilters ref="addFilters" :filters-type-id="filtersTypeId" @filterRes="filterRes" />
    </el-dialog>
  </div>
</template>

<script>
// import { saveRole, getRolePermission, getRoleUsers, searchRoleUsers, saveAddRole, searchRoleName } from '@/api/roleManage'
// import { tree2Array, setTreeData, checked } from '@/utils/utils'
import addFilters from '../../../AssetManagement/components/addFiltersType'
import userSearch from '../components/userSearch'
import deviceSearch from '../components/deviceSearch'
export default {
  name: 'AddRolePage',
  components: { addFilters, userSearch, deviceSearch },
  data() {
    return {
      addDeviceVisible: false, // 在库资产弹框，默认不显示
      recevier: '', // 接收人
      addFiltersVisible: false,
      dialogName: '新建角色',
      filters: {},
      filtersTypeId: [],
      activeName: '0',
      baseInfo: { outHouse: '', date: '', recevier: '', inHouse: '', operator: '', reason: '' }, // 基本信息
      baseInfoRule: {
        outHouse: [{ required: true, message: '请输入调出仓库', trigger: ['blur'] }],
        date: [{ required: true, message: '请输入编辑日期', trigger: ['blur'] }],
        recevier: [{ required: true, message: '请输入接收人', trigger: ['blur', 'change'] }],
        inHouse: [{ required: true, message: '请输入调入仓库', trigger: ['blur'] }],
        operator: [{ required: true, message: '请输入操作人', trigger: ['blur'] }]
      },
      addFlag: false,
      loading: false,
      rolePrev: true, // 上一步按钮提示
      pane1: false,
      pane2: true,
      pane3: true,
      active: 0, // 步骤条控制
      primaryKey: '', // 关键字
      totalCount: 50, // 表格数据总数
      userTotalCount: 0, // 未选择人数页数
      userPageSize: 10, // 选择人员每页个数
      pageSize: 10, // 每页个数
      currentPage: 1, // 当前页数
      selectUserPage: 1, // 为选择人员页数
      multipleSelection: [], // 已选用户多选列表
      unSelectMultipleSelection: [], // 未选用户多选列表
      userInfo: [], // 已添加人员信息
      userUnselectedInfo: [], // 未添加人员信息
      formUserInfo: {},
      addUserVisible: false,
      autosize: {
        minRows: 4, maxRows: 5
      },
      userloading: true,
      itemTypes: ''
    }
  },
  mounted() {
  },
  methods: {
    // 选择筛选条件
    showAddFiltersType() {
      this.dialogName = '资产分类选择'
      this.addFiltersVisible = true
      this.$nextTick(() => {
        this.$refs.addFilters.getAssetsTreeData()
      })
    },
    // 条件选择返回
    filterRes(res) {
      if (res && res.length > 0) {
        this.addFiltersVisible = false
        this.filtersTypeId = []
        const valueArr = []
        for (const value of res) {
          valueArr.push(value.name)
        }
        if (this.dialogName === '资产分类选择') {
          this.itemTypes = valueArr.join(',')
        }
      } else {
        this.addFiltersVisible = false
      }
    },
    // 关闭
    filterClose() {
      this.addFiltersVisible = false
    },
    // 选择接收人 -- 打开人员查询弹框
    addNewUser() {
      this.addUserVisible = true
    },
    // 赋值接收人
    setReciver(data) {
      this.baseInfo.recevier = data
      this.addUserVisible = false
    },
    // 选择在库资产 -- 打开资产查询弹框
    addNewDevices() {
      this.addDeviceVisible = true
    },
    //     // 父组件调用判断添加或者修改
    //     clearContent() {
    //       this.baseInfo = { status: '1' }
    //     },
    //     async getRoleMenuFirst() {
    //       await getRolePermission({ roleId: this.addFlag === false ? this.baseInfo.id : '' }).then(res => {
    //         if (res.success === true) {
    //           this.fromData = res.data
    //           var newArr = []
    //           res.data.filter(item => {
    //             return item.checked === '1'
    //           }).map(item => {
    //             return item.id
    //           }).forEach(item => {
    //             checked(item, setTreeData(res.data), newArr)
    //           })
    //           this.roleData = newArr
    //         } else {
    //           this.$message.error(res.msg)
    //         }
    //       }).catch(e => {
    //         this.$message.error(e.msg)
    //       })
    //     },
    addEditRoleDialog(data) {
      this.activeName = '0'
      this.active = 0
      if (data) {
        this.addFlag = false
        this.baseInfo = data
        this.pane1 = false
        this.pane2 = false
        this.pane3 = false
        this.$emit('reset-save-flag', false)
        // // 根据角色获取按钮权限
        // this.getRoleMenuFirst()
        // // 根据角色获取人员
        // this.handleGetRoleUsers()
      } else {
        this.$emit('reset-save-flag', true)
        this.addFlag = true
        this.pane2 = true
        this.pane3 = true
      }
    },
    //     selectUserRow(row) {
    //       this.$refs.userTable.toggleRowSelection(row)
    //     },
    //     selectUserInfoRow(row) {
    //       this.$refs.userInfoTable.toggleRowSelection(row)
    //     },
    //     // 获取人员信息
    //     handleGetRoleUsers(data) {
    //       getRoleUsers({ pageSize: this.pageSize, active: '1', available: '1', pageNumber: this.currentPage, roleId: this.addFlag === false ? this.baseInfo.id : undefined, userName: data }).then(res => {
    //         if (res.success === true) {
    //           this.userInfo = res.data
    //         } else {
    //           this.$message.error(res.msg)
    //         }
    //       }).catch(e => {
    //         this.$message.error(e.msg)
    //       })
    //     },
    // // 获取未选择的人员
    // handleGetUnselectRoleUsers(data) {
    //   searchRoleUsers({ roleId: this.baseInfo.id, pageSize: this.userPageSize, pageNumber: this.selectUserPage, name: data }).then(res => {
    //     this.userloading = false
    //     if (res.success === true) {
    //       this.userUnselectedInfo = res.data.rows
    //       this.userTotalCount = res.data.totalCount
    //     } else {
    //       this.$message.error(res.msg)
    //     }
    //   }).catch(e => {
    //     this.$message.error(e.msg)
    //   })
    // },
    //     // 人员信息列表
    //     handleCurrentChange() {
    //       this.handleGetRoleUsers()
    //     },
    //     // 未添加人员信息列表
    //     handleSelectUserChange() {
    //       this.handleGetUnselectRoleUsers()
    //     },
    //     handleSizeChange(val) {
    //       this.pageSize = val
    //       this.pageNumber = 1
    //       this.handleGetRoleUsers()
    //     },
    //     handleUserSizeChange(val) {
    //       this.userPageSize = val
    //       this.handleGetUnselectRoleUsers()
    //     },
    //     // 处理多选列表
    //     handleSelectionChange(val) {
    //       this.multipleSelection = val
    //     },
    //     // 处理未选多选列表
    //     handleUnSelectionChange(val) {
    //       this.unSelectMultipleSelection = val
    //     },
    //     // 关闭添加人员
    //     closeAddRoleUser() {
    //       this.addUserVisible = false
    //       this.handleGetRoleUsers()
    //     },
    // 保存角色信息--第一步
    saveBaseInfo(formName) {
      // var param = {}
      // if (this.addFlag === false) {
      //   param.flag = '0'
      //   param.sysRole = {}
      //   param.sysRole.name = this.baseInfo.name
      //   param.sysRole.status = this.baseInfo.status
      //   param.sysRole.description = this.baseInfo.description || ''
      //   param.sysRole.id = this.baseInfo.id
      // }
      // this.$refs[formName].validate((valid) => {
      //   if (valid) {
      //     if (this.addFlag === false) {
      //       saveRole(param).then(res => {
      //         if (res.success === true) {
      //           this.activeName = '1'
      //           this.active = 1
      //           this.$message.success('修改成功')
      //         } else {
      //           this.$message.error(res.msg)
      //         }
      //       })
      //     } else {
      // searchRoleName({ sysRole: { name: this.baseInfo.name }}).then(res => {
      //   if (res.code === 0) {
      this.activeName = '1'
      this.active = 1
      //         this.getRoleMenuFirst()
      //       }
      //     }).catch(res => {
      //       this.$message.error(res.msg)
      //     })
      //   }
      // } else {
      //   return false
      // }
      // })
    },
    //     // 关闭人员弹窗
    //     saveUserInfo() {
    //       var param = {}
    //       this.loading = true
    //       if (this.addFlag === false) {
    //         param.flag = '2'
    //         param.sysRole = {}
    //         param.sysRole.id = this.baseInfo.id
    //         param.userIdList = []
    //         if (this.userInfo) {
    //           this.userInfo.map(user => {
    //             param.userIdList.push(user.id)
    //           })
    //         }
    //         saveRole(param).then(res => {
    //           this.loading = false
    //           if (res.success === true) {
    //             this.$message.success('保存成功')
    //           }
    //           this.clearContent()
    //           this.closeAddRole()
    //         }).catch(res => {
    //           this.loading = false
    //           this.$message.error(res.msg)
    //         })
    //       } else {
    //         param.sysRole = {
    //           name: this.baseInfo.name,
    //           description: this.baseInfo.description || '',
    //           status: this.baseInfo.status
    //         }
    //         param.userIdList = []
    //         if (this.userInfo) {
    //           this.userInfo.map(user => {
    //             param.userIdList.push(user.id)
    //           })
    //         }
    //         saveAddRole(param).then(res => {
    //           this.loading = false
    //           if (res.success === true) {
    //             this.$message.success('新建成功')
    //           }
    //           this.clearContent()
    //           this.closeAddRole()
    //         }).catch(res => {
    //           this.loading = false
    //           this.$message.error(res.msg)
    //         })
    //       }
    //     },
    //     // 添加新成员
    // addNewUser() {
    //   this.addUserVisible = true
    //   this.handleGetUnselectRoleUsers()
    // },
    //     // 关闭添加用户页面
    //     handleAddNewUser(done) {
    //       this.primaryKey = ''
    //       if (this.addFlag === false) {
    //         this.handleGetRoleUsers()
    //       }
    //       done()
    //     },
    //     closeAddRole() {
    //       this.toData = []
    //       this.rolePrev = true
    //       this.$refs.treeTransfer.clearChecked()
    //       this.$emit('closeAddRole')
    //     },
    // 确认添加用户
    // confirmAddUsers() {
    //   if (this.unSelectMultipleSelection.length < 1) {
    //     this.$message.info('您还没有选择要添加的人员')
    //     return false
    //   }
    //   var selectedUsers = []
    //   if (this.userInfo) {
    //     this.userInfo.map(user => {
    //       selectedUsers.push(user.id)
    //     })
    //   }
    //   var userIdList = []
    //   this.unSelectMultipleSelection.map(item => {
    //     if (selectedUsers.indexOf(item.id) === -1) {
    //       userIdList.push(item)
    //     }
    //   })
    //   if (userIdList.length !== this.unSelectMultipleSelection.length) {
    //     this.$message.info('已过滤掉重复人员')
    //   }
    //   this.userInfo = this.userInfo.concat(userIdList)
    //   this.addUserVisible = false
    // },
    // 查询要新添加的用户
    // searchNewUsers() {
    //   this.selectUserPage = 1
    //   this.handleGetUnselectRoleUsers(this.primaryKey)
    // },
    prev(e) {
      // 上一页
      this.activeName = e + ''
      this.active = e
    } // 树形遍历
  }
}
</script>
<style scoped>
.numListJup {
  padding-right: 10px;
}
.right {
  text-align: right;
  padding-right: 10px;
}

.margin10 {
  margin: 0 10px;
  width: 200px;
}
.el-select {
  width: 100%;
}
</style>
<style lang="scss" scoped>
.roleManage-addRole {
  .el-steps--simple {
    padding: 17px 20px;
    margin-bottom: 30px;
    >>> .is-wait {
      .icontext {
        color: #c0c4cc;
      }
    }
  }
  >>> .el-tabs {
    .el-tabs__header.is-top {
      display: none;
    }
  }
  >>> .el-step__head.is-success {
    color: #379EFC;
    border-color: #379EFC;
  }
  >>> .el-step__title.is-success {
    color: #379EFC;
  }
  >>> .el-step__icon.is-text {
    color: #292929;
    width: 24px;
    height: 24px;
    font-size: 14px;
    font-weight: 900;
    .el-icon-check {
      color: #379EFC;
      font-weight: bold;
      font-size: 24px;
    }
  }
  >>> .el-textarea__inner {
    max-height: 340px;
  }
  >>> .el-step__title.is-process {
    color: #292929;
  }
}

.btn {
  height: 32px;
  color: #fff;
  padding: 0px 15px;
  font-size: 12px;
  background: #379EFC;
  outline: none;
  &:hover {
    background: rgba(113, 160, 255, 1);
  }
  &:focus {
    background: #4b7bdb;
  }
  &:visited {
    background: #379EFC;
  }

  >>> i {
    font-size: 14px;
    margin-right: 4px;
  }
}
.btn2 {
  padding: 5px 15px;
}
</style>
<style lang="scss">
</style>
