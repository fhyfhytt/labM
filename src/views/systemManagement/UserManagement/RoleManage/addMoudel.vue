<template>
  <div v-loading="loading" class="roleManage-addRole">
    <el-steps :active="active" finish-status="success" simple>
      <el-step title="基本信息">
        <span slot="icon" class="icontext">1</span>
      </el-step>
      <el-step title="权限设置"><span slot="icon" class="icontext">2</span></el-step>
      <el-step title="人员信息"><span slot="icon" class="icontext">3</span></el-step>
    </el-steps>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="基本信息" name="0" :disabled="pane1" style="height:490px">
        <el-row style="margin-top:50px;">
          <el-form ref="baseInfo" :model="baseInfo" label-width="140px" :rules="baseInfoRule" :validate-on-rule-change="true" class="addtop">
            <el-col :span="12">
              <el-form-item label="角色名称：" prop="name">
                <el-input v-model="baseInfo.name" placeholder="请输入角色名称" />
              </el-form-item>
              <el-form-item label="启用状态：" prop="status">
                <el-select v-model="baseInfo.status" popper-class="select-option" placeholder="-请选择状态-">
                  <el-option value="1" label="启用" />
                  <el-option value="0" label="未启用" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="20">
              <el-form-item label="备注：" prop="description">
                <el-input v-model="baseInfo.description" type="textarea" autocomplete="off" placeholder="请输入角色备注" />
              </el-form-item>
            </el-col>

          </el-form>
        </el-row>
        <div style="position:absolute;bottom:0px;right:0">
          <el-button v-preventReClick="1000" class="button-sub" @click="saveBaseInfo('baseInfo')">下一步</el-button>
        </div>
      </el-tab-pane>
      <el-tab-pane label="权限设置" name="1" :disabled="pane2">
        <el-row style="height:540px">
          <treetransfer
            ref="treeTransfer"
            :title="title"
            node_key="id"
            :from_data="fromData"
            :to_data="toData"
            :default-transfer="true"
            :default-checked-keys="roleData"
            :default-props="defaultProps"
            :array-to-tree="true"
            pid="parentId"
            height="490px"
            placeholder="请输入权限关键词"
            filter
            open-all
            @addBtn="add"
            @removeBtn="remove"
          />
        </el-row>
        <div style="position:absolute;bottom:0;right:0">
          <el-button v-if="rolePrev" v-preventReClick="1000" size="small" class="button-cancel" @click.native="prev(0)">上一步</el-button>
          <el-button v-preventReClick="2000" class="button-sub" @click="saveRoleInfo">下一步</el-button>
        </div>
      </el-tab-pane>
      <el-tab-pane label="人员信息" name="2" :disabled="pane3">
        <el-row style="margin-bottom:10px">
          <div style="display:inline-block">
            <el-button class="button-sub btn" icon="iconfont icontianjia1" @click="addNewUser">新增</el-button>
            <el-button class="button-sub btn" icon="iconfont iconxingzhuang1 " style="margin-right:5px" @click="delUsers">批量删除</el-button>
          </div>
        </el-row>
        <el-table ref="userTable" :data="userInfo" tooltip-effect="dark" height="380" style="width: 100%;height:300px" @row-click="selectUserRow" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="60" />
          <el-table-column type="index" label="序号" width="60" />
          <el-table-column prop="userCode" label="工号" />
          <el-table-column prop="name" label="用户名" />
        </el-table>
        <div style="text-align:right;margin-top:40px;">
          <el-button v-preventReClick="1000" size="small" class="button-cancel" @click.native="prev(1)">上一步</el-button>
          <el-button v-preventReClick="1000" class="button-sub" @click="saveUserInfo">完 成</el-button>
        </div>
      </el-tab-pane>
    </el-tabs>
    <el-dialog title="选择人员" append-to-body :visible.sync="addUserVisible" :before-close="handleAddNewUser" width="45%" class="addRoleUserDialog">
      <div>
        <el-row style="margin-bottom:10px">
          关键字 :
          <el-input v-model="primaryKey" placeholder="请输入姓名或ID" style="width:200px;margin:0px 10px" />
          <el-button class="button-sub btn btn2" @click="searchNewUsers">查询</el-button>
          <el-button class="button-sub btn btn2" @click="confirmAddUsers">确认</el-button>
        </el-row>
        <el-table ref="userInfoTable" v-loading="userloading" :data="userUnselectedInfo" tooltip-effect="dark" height="435" style="width: 100%;height:400px" @row-click="selectUserInfoRow" @selection-change="handleUnSelectionChange">
          <el-table-column type="selection" width="60" />
          <el-table-column type="index" label="序号" width="60" />
          <el-table-column prop="userCode" label="工号" />
          <el-table-column prop="name" label="用户名" />
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
import { saveRole, getRolePermission, getRoleUsers, searchRoleUsers, saveAddRole, searchRoleName } from '@/api/roleManage'
import { tree2Array, setTreeData, checked } from '@/utils/utils'
export default {
  name: 'AddRolePage',
  data() {
    return {
      activeName: '0',
      baseInfo: { name: '', status: '1', description: '' }, // 基本信息
      baseInfoRule: {
        name: [{ required: true, message: '请输入角色名', trigger: ['blur'] }],
        status: [{ required: true, message: '请选择状态', trigger: ['blur', 'change'] }]
      },
      defaultProps: {
        label: 'name',
        children: 'children'
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
      roleMenuTree: [], // 菜单权限tree
      roleBtnTree: [], // 按钮权限tree
      userInfo: [], // 已添加人员信息
      userUnselectedInfo: [], // 未添加人员信息
      formUserInfo: {},
      addUserVisible: false,
      autosize: {
        minRows: 4, maxRows: 5
      },
      fromData: [], // 未添加的权限
      toData: [], // 已添加的权限排序，
      roleData: [], // 权限参数
      title: ['全部权限', '授予权限'],
      userloading: true,
      ids: []
    }
  },
  mounted() {
  },
  methods: {
    handleClick(tab) {
    },
    // 父组件调用判断添加或者修改
    clearContent() {
      this.toData = []
      this.roleData = []// 初始化权限
      this.$refs.treeTransfer.clearChecked()
      this.baseInfo = { status: '1' }
    },
    async getRoleMenuFirst() {
      await getRolePermission({ roleId: this.addFlag === false ? this.baseInfo.id : '' }).then(res => {
        if (res.success === true) {
          this.fromData = res.data
          var newArr = []
          res.data.filter(item => {
            return item.checked === '1'
          }).map(item => {
            return item.id
          }).forEach(item => {
            checked(item, setTreeData(res.data), newArr)
          })
          this.roleData = newArr
        } else {
          this.$message.error(res.msg)
        }
      }).catch(e => {
        console.log(e)
        this.$message.error(e.msg || e)
      })
    },
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
        // 根据角色获取按钮权限
        this.getRoleMenuFirst()
        // 根据角色获取人员
        this.handleGetRoleUsers()
      } else {
        // this.baseInfo = { status: '1' }
        this.userInfo = []
        this.$emit('reset-save-flag', true)
        this.addFlag = true
        this.pane2 = true
        this.pane3 = true
      }
    },
    selectUserRow(row) {
      this.$refs.userTable.toggleRowSelection(row)
    },
    selectUserInfoRow(row) {
      this.$refs.userInfoTable.toggleRowSelection(row)
    },
    // 获取人员信息
    handleGetRoleUsers(data) {
      getRoleUsers({ pageSize: this.pageSize, active: '1', available: '1', pageNumber: this.currentPage, roleId: this.addFlag === false ? this.baseInfo.id : undefined, userName: data }).then(res => {
        if (res.success === true) {
          this.userInfo = res.data
        } else {
          this.$message.error(res.msg)
        }
      }).catch(e => {
        this.$message.error(e.msg)
      })
    },
    // 获取未选择的人员
    handleGetUnselectRoleUsers(data) {
      searchRoleUsers({ roleId: this.baseInfo.id, pageSize: this.userPageSize, pageNumber: this.selectUserPage, name: data }).then(res => {
        this.userloading = false
        if (res.success === true) {
          this.userUnselectedInfo = res.data.rows
          this.userTotalCount = res.data.totalCount
        } else {
          this.$message.error(res.msg)
        }
      }).catch(e => {
        this.$message.error(e.msg)
      })
    },
    // 人员信息列表
    handleCurrentChange() {
      this.handleGetRoleUsers()
    },
    // 未添加人员信息列表
    handleSelectUserChange() {
      this.handleGetUnselectRoleUsers()
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.pageNumber = 1
      this.handleGetRoleUsers()
    },
    handleUserSizeChange(val) {
      this.userPageSize = val
      this.handleGetUnselectRoleUsers()
    },
    // 处理多选列表
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    // 处理未选多选列表
    handleUnSelectionChange(val) {
      this.unSelectMultipleSelection = val
    },
    // 关闭添加人员
    closeAddRoleUser() {
      this.addUserVisible = false
      this.handleGetRoleUsers()
    },
    // 保存角色信息--第一步
    saveBaseInfo(formName) {
      var param = {}
      if (this.addFlag === false) {
        param.flag = '0'
        param.sysRole = {}
        param.sysRole.name = this.baseInfo.name
        param.sysRole.status = this.baseInfo.status
        param.sysRole.description = this.baseInfo.description || ''
        param.sysRole.id = this.baseInfo.id
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.addFlag === false) {
            saveRole(param).then(res => {
              if (res.success === true) {
                this.activeName = '1'
                this.active = 1
                this.$message.success('修改成功')
              } else {
                this.$message.error(res.msg)
              }
            })
          } else {
            searchRoleName({ sysRole: { name: this.baseInfo.name }}).then(res => {
              if (res.code === 0) {
                this.activeName = '1'
                this.active = 1
                this.getRoleMenuFirst()
              } else {
                this.$message.error(res.msg)
              }
            })
          }
        } else {
          return false
        }
      })
    },
    // 保存或修改角色信息--第二步
    saveRoleInfo() {
      if (this.addFlag === false) {
        var resourcesList = this.ids
        saveRole({ flag: '1', sysRole: { id: this.baseInfo.id }, resourcesList }).then(res => {
          if (res.success === true) {
            this.activeName = '2'
            this.active = 2
            this.$message.success('保存成功')
            this.rolePrev = false
            this.handleGetRoleUsers()

            this.$refs.treeTransfer.clearChecked()
            this.$emit('reset-save-flag', false)
          } else {
            this.$message.error(res.msg)
          }
        }).catch(e => {
          this.$message.error(e.msg)
        })
      } else {
        this.activeName = '2'
        this.active = 2
      }
    },
    // 关闭人员弹窗
    saveUserInfo() {
      var param = {}
      this.loading = true
      if (this.addFlag === false) {
        param.flag = '2'
        param.sysRole = {}
        param.sysRole.id = this.baseInfo.id
        param.userIdList = []
        if (this.userInfo) {
          this.userInfo.map(user => {
            param.userIdList.push(user.id)
          })
        }
        this.active = 3
        saveRole(param).then(res => {
          this.loading = false
          if (res.success === true) {
            this.$message.success('保存成功')
            this.closeAddRole()
          } else {
            this.$message.error(res.msg)
          }
        }).catch(res => { this.$message.error(res.msg) })
      } else {
        var resourcesList = this.ids
        param.sysRole = {
          name: this.baseInfo.name,
          description: this.baseInfo.description || '',
          status: this.baseInfo.status
        }
        param.userIdList = []
        if (this.userInfo) {
          this.userInfo.map(user => {
            param.userIdList.push(user.id)
          })
        }
        this.active = 3
        param.resourcesList = resourcesList
        saveAddRole(param).then(res => {
          this.loading = false
          if (res.success === true) {
            this.$message.success('新建成功')
            this.closeAddRole()
          } else {
            this.$message.error(res.msg)
          }
        }).catch(res => {
          this.$message.error(res.msg)
        })
      }
    },
    // 添加新成员
    addNewUser() {
      this.addUserVisible = true
      this.handleGetUnselectRoleUsers()
    },
    // 关闭添加用户页面
    handleAddNewUser(done) {
      this.primaryKey = ''
      if (this.addFlag === false) {
        this.handleGetRoleUsers()
      }
      done()
    },
    closeAddRole() {
      this.toData = []
      this.rolePrev = true
      this.$refs.treeTransfer.clearChecked()
      this.$emit('closeAddRole')
    },
    // 确认添加用户
    confirmAddUsers() {
      if (this.unSelectMultipleSelection.length < 1) {
        this.$message.info('您还没有选择要添加的人员')
        return false
      }
      var selectedUsers = []
      if (this.userInfo) {
        this.userInfo.map(user => {
          selectedUsers.push(user.id)
        })
      }
      var userIdList = []
      this.unSelectMultipleSelection.map(item => {
        if (selectedUsers.indexOf(item.id) === -1) {
          userIdList.push(item)
        }
      })
      if (userIdList.length !== this.unSelectMultipleSelection.length) {
        this.$message.info('已过滤掉重复人员')
      }
      this.userInfo = this.userInfo.concat(userIdList)
      this.addUserVisible = false
    },
    // 查询要新添加的用户
    searchNewUsers() {
      this.selectUserPage = 1
      this.handleGetUnselectRoleUsers(this.primaryKey)
    },
    // 批量删除
    delUsers() {
      var userIdList = this.multipleSelection
      userIdList = userIdList.map(item => {
        return item.id
      })
      this.userInfo = this.userInfo.filter(item => {
        if (userIdList.indexOf(item.id) === -1) {
          return item
        }
      })
    },
    // 切换模式 现有树形穿梭框模式transfer 和通讯录模式addressList
    changeMode() {
      if (this.mode === 'transfer') {
        this.mode = 'addressList'
      } else {
        this.mode = 'transfer'
      }
    },
    // 监听穿梭框组件添加
    add(fromData, toData, obj) {
      // 树形穿梭框模式transfer时，返回参数为左侧树移动后数据、右侧树移动后数据、移动的{keys,nodes,halfKeys,halfNodes}对象
      // 通讯录模式addressList时，返回参数为右侧收件人列表、右侧抄送人列表、右侧密送人列表
      if (toData.length === 0) {
        toData[0] = []
      }
      this.ids = tree2Array(toData[toData.length - 1], '0').map(item => {
        if (item) {
          return item.id
        } else {
          return
        }
      })
    },
    // 监听穿梭框组件移除
    remove(fromData, toData, obj) {
      // 树形穿梭框模式transfer时，返回参数为左侧树移动后数据、右侧树移动后数据、移动的{keys,nodes,halfKeys,halfNodes}对象
      // 通讯录模式addressList时，返回参数为右侧收件人列表、右侧抄送人列表、右侧密送人列表
      if (toData.length === 0) {
        toData[0] = []
      }
      this.ids = tree2Array(toData[toData.length - 1], '0').map(item => {
        if (item) {
          return item.id
        } else {
          return
        }
      })
    }, prev(e) {
      if (this.rolePrev && e === 0 && this.addFlag !== false) {
        this.toData = []
      }
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
    margin-bottom: 10px;
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
