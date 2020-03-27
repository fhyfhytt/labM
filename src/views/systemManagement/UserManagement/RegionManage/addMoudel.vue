<template>
  <div v-loading="loading" class="roleManage-addRole">
    <!-- 步骤条 -->
    <el-steps :active="active" finish-status="success" simple>
      <el-step title="基本信息">
        <span slot="icon" class="icontext">1</span>
      </el-step>
      <el-step title="组织选择"><span slot="icon" class="icontext">2</span></el-step>
      <el-step title="区域选择"><span slot="icon" class="icontext">3</span></el-step>
      <!-- 分类暂不显示 -->
      <!-- <el-step title="人员选择"><span slot="icon" class="icontext">3</span></el-step> -->
      <el-step title="分类选择"><span slot="icon" class="icontext">4</span></el-step>
      <el-step title="人员选择"><span slot="icon" class="icontext">5</span></el-step>
    </el-steps>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <!-- 第一步，基本信息 -->
      <el-tab-pane label="基本信息" name="0" :disabled="pane1" style="height:490px">
        <el-row>
          <el-form ref="baseInfo" :model="baseInfo" label-width="140px" :rules="baseInfoRule" class="addtop">
            <el-col :span="12">
              <el-form-item label="编号 :" prop="code">
                <el-input v-model="baseInfo.code" placeholder="请输入数据域编号" />
              </el-form-item>
              <el-form-item label="名称：" prop="name">
                <el-input v-model="baseInfo.name" placeholder="请输入数据域名称" />
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="描述 :" prop="description">
                <el-input v-model="baseInfo.description" type="textarea" autocomplete="off" placeholder="请输入角色备注" />
              </el-form-item>
            </el-col>
          </el-form>
        </el-row>
        <div style="position:absolute;bottom:0px;right:0">
          <el-button v-preventReClick="1000" class="button-sub" @click="saveBaseInfo('baseInfo')">下一步</el-button>
        </div>
      </el-tab-pane>
      <!-- 第二步，组织选择 -->
      <el-tab-pane label="组织选择" name="1" :disabled="pane2">
        <el-row style="height:540px">
          <treetransfer
            ref="orgTreeTransfer"
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
            placeholder="请输入组织关键词"
            filter
            open-all
            @addBtn="add"
            @removeBtn="remove"
          />
        </el-row>
        <div style="position:absolute;bottom:0;right:0">
          <el-button v-if="isPrev" v-preventReClick="1000" size="small" class="button-cancel" @click.native="prev(0)">上一步</el-button>
          <el-button v-preventReClick="1000" class="button-sub" @click="addOrgInfo">下一步</el-button>
        </div>
      </el-tab-pane>
      <!-- 第三步，区域选择 -->
      <el-tab-pane label="区域选择" name="2" :disabled="pane3">
        <el-row style="height:540px">
          <treetransfer
            ref="houseTreeTransfer"
            :title="houseTitle"
            node_key="id"
            :from_data="houseFromData"
            :to_data="houseToData"
            :default-transfer="true"
            :default-checked-keys="houseRoleData"
            :default-props="defaultProps"
            :array-to-tree="false"
            pid="parentId"
            height="490px"
            placeholder="请输入库房关键词"
            filter
            open-all
            @addBtn="add2"
            @removeBtn="remove2"
          />
        </el-row>
        <div style="text-align:right;margin-top:40px;">
          <el-button v-if="isPrev" v-preventReClick="1000" size="small" class="button-cancel" @click.native="prev(1)">上一步</el-button>
          <el-button v-preventReClick="1000" class="button-sub" @click="addHouseInfo">下一步</el-button>
        </div>
      </el-tab-pane>
      <!-- 第四步，分类选择 -->
      <el-tab-pane label="分类选择" name="3" :disabled="pane4">
        <el-row style="height:540px">
          <treetransfer
            ref="classTreeTransfer"
            :title="classTitle"
            node_key="id"
            :from_data="classFromData"
            :to_data="classToData"
            :default-transfer="true"
            :default-checked-keys="classRoleData"
            :default-props="defaultProps"
            :array-to-tree="true"
            pid="parentId"
            height="490px"
            placeholder="请输入分类关键词"
            filter
            open-all
            @addBtn="add3"
            @removeBtn="remove3"
          />
        </el-row>
        <div style="position:absolute;bottom:0;right:0">
          <el-button v-if="isPrev" v-preventReClick="1000" size="small" class="button-cancel" @click.native="prev(2)">上一步</el-button>
          <el-button v-preventReClick="1000" class="button-sub" @click="addClassifyInfo">下一步</el-button>
        </div>
      </el-tab-pane>
      <!-- 第五步，人员选择 -->
      <el-tab-pane label="人员选择" name="4" :disabled="pane5">
        <el-row>
          <div style="display:inline-block">
            <el-button class="button-sub btn" icon="iconfont icontianjia1" @click="addNewUser">新增</el-button>
            <el-button class="button-sub btn" icon="iconfont iconxingzhuang1 " style="margin-right:5px" @click="delUsers">批量删除</el-button>
          </div>
        </el-row>
        <el-table ref="userTable" :data="userInfo" tooltip-effect="dark" height="380" style="width: 100%;height:300px" @row-click="selectUserRow" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="60" />
          <el-table-column type="index" label="序号" width="60" />
          <el-table-column prop="id" label="用户ID" />
          <el-table-column prop="name" label="用户名" />
          <el-table-column prop="mobile" label="手机" />
          <el-table-column prop="email" label="邮箱" />
        </el-table>
        <div style="position:absolute;bottom:0;right:0">
          <el-button v-if="isPrev" v-preventReClick="1000" size="small" class="button-cancel" @click.native="prev(3)">上一步</el-button>
          <el-button v-preventReClick="2000" class="button-sub" @click="saveUserInfo">完 成</el-button>
        </div>
      </el-tab-pane>
    </el-tabs>
    <!-- 人员查询对话框 -->
    <el-dialog title="选择人员" append-to-body :visible.sync="addUserVisible" :before-close="handleAddNewUser" width="45%" class="addRoleUserDialog">
      <div>
        <el-row style="margin-top:10px">
          关键字 :
          <el-input v-model="primaryKey" placeholder="请输入用户名或工号" style="width:200px;margin:0px 10px" />
          <el-button class="button-sub btn btn2" @click="searchNewUsers">查询</el-button>
          <el-button class="button-sub btn btn2" @click="confirmAddUsers">确认</el-button>
        </el-row>
        <el-table ref="userInfoTable" :data="userUnselectedInfo" tooltip-effect="dark" height="435" style="width: 100%;height:400px" @row-click="selectUserInfoRow" @selection-change="handleUnSelectionChange">
          <el-table-column type="selection" width="60" />
          <el-table-column type="index" label="序号" width="60" />
          <el-table-column prop="userCode" label="工号" />
          <el-table-column prop="name" label="用户名" />
          <el-table-column prop="mobile" label="手机" />
          <el-table-column prop="email" label="邮箱" />
        </el-table>
        <div class="numListJup " style="padding-right:70px">
          <el-pagination :page-size="userPageSize" :page-sizes="[10, 20, 50, 100]" layout="total,sizes,prev, pager, next, jumper" :total="userTotalCount" :current-page.sync="selectUserPage" @size-change="handleUserSizeChange" @current-change="handleSelectUserChange" />
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { addRegion, editRegion, getDeptByRegionId, searchRegion, getUserByRegionId, getUserList, getClassifyByRegionId, getHouseByRegionId } from '@/api/userManagement.js'
import { tree2Array, setTreeData, checked } from '@/utils/utils'
export default {
  name: 'AddRolePage',
  props: {
    treeId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      activeName: '0',
      baseInfo: { code: '', name: '', description: '' }, // 基本信息
      baseInfoRule: {
        code: [{ required: true, message: '请输入编号', trigger: 'blur' }],
        name: [{ required: true, message: '请输入名称', trigger: 'blur' }]
      },
      defaultProps: {
        label: 'name',
        children: 'children'
      },
      loading: false,
      addFlag: true, // 区分新增和修改
      pane1: false,
      pane2: true,
      pane3: true,
      pane4: true,
      pane5: true,
      active: 0, // 步骤条控制
      primaryKey: '', // 关键字
      totalCount: 50, // 表格数据总数
      userTotalCount: 0, // 未选择人数页数
      userPageSize: 10, // 选择人员每页个数
      pageSize: 8, // 每页个数
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
      ids: [], // 选中组织ids
      fromData: [], // 未添加的组织
      toData: [], // 已添加的组织排序，
      roleData: [], // 组织参数
      title: ['全部组织', '已选组织'],
      userloading: true,
      classIds: [], // 选中分类ids
      classFromData: [],
      classToData: [],
      classRoleData: [], // 分类参数
      classTitle: ['全部分类', '已选分类'],
      houseIds: [], // 选中库房ids
      houseFromData: [],
      houseToData: [],
      houseRoleData: [], // 库房参数
      houseTitle: ['全部库房', '已选库房'],
      isPrev: true // 上一步按钮提示
    }
  },
  methods: {
    handleClick(tab) {
    },
    // 父组件调用判断添加或者修改
    clearContent() {
      this.toData = []
      this.roleData = []// 初始化权限
      this.$refs.orgTreeTransfer.clearChecked()
      this.houseToData = []
      this.houseRoleData = []
      this.$refs.houseTreeTransfer.clearChecked()
      this.classToData = []
      this.classRoleData = []
      this.$refs.classTreeTransfer.clearChecked()
      this.baseInfo = {}
    },
    // 获取组织树数据
    async getRegionMenuFirst() {
      await getDeptByRegionId({ regionId: this.addFlag === false ? this.baseInfo.id : '' }).then(res => {
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
          this.ids = newArr // 初始查询，选中组织的id
        } else {
          this.$message.error(res.msg)
        }
      }).catch(e => {
        this.$message.error(e.msg)
      })
    },

    // 获取分类数据
    async getClassifyMenu() {
      await getClassifyByRegionId({ regionId: this.addFlag === false ? this.baseInfo.id : '' }).then(res => {
        if (res.success === true) {
          this.classFromData = res.data
          var newArr1 = []
          res.data.filter(item => {
            return item.checked === '1'
          }).map(item => {
            return item.id
          }).forEach(item => {
            checked(item, setTreeData(res.data), newArr1)
          })
          this.classRoleData = newArr1
        } else {
          this.$message.error(res.msg)
        }
      }).catch(e => {
        this.$message.error(e.msg)
      })
    },

    // 获取库房数据
    async getHouseMenu() {
      await getHouseByRegionId({ regionId: this.addFlag === false ? this.baseInfo.id : '' }).then(res => {
        if (res.success === true) {
          this.houseFromData = res.data
          this.houseRoleData = res.data.filter(item => {
            return item.checked === '1'
          }).map(item => {
            return item.id
          })
        } else {
          this.$message.error(res.msg)
        }
      }).catch(e => {
        this.$message.error(e.msg)
      })
    },

    // 判断编辑还是新增弹框
    addEditRoleDialog(data) {
      this.activeName = '0'
      this.active = 0
      if (data) {
        this.addFlag = false // edit
        this.baseInfo = data
        this.pane1 = false
        this.pane2 = false
        this.pane3 = false
        this.pane4 = false
        this.pane5 = false
        this.$emit('reset-save-flag', false)
        // 根据数据域获取组织
        this.getRegionMenuFirst()
        // 根据数据域获取人员
        this.handleGetRoleUsers()
        // 根据数据获取库房
        this.getHouseMenu()
        // 根据数据获取分类
        this.getClassifyMenu()
      } else {
        this.baseInfo = {}
        this.userInfo = []
        this.$emit('reset-save-flag', true)
        this.addFlag = true
        this.pane2 = true
        this.pane3 = true
        this.pane4 = true
        this.pane5 = true
      }
    },
    // 行点击获取行信息
    selectUserRow(row) {
      this.$refs.userTable.toggleRowSelection(row)
    },
    selectUserInfoRow(row) {
      this.$refs.userInfoTable.toggleRowSelection(row)
    },
    // 获取人员信息
    handleGetRoleUsers(data) {
      getUserByRegionId({ pageSize: this.pageSize, active: '1', available: '1', pageNumber: this.currentPage, regionId: this.addFlag === false ? this.baseInfo.id : undefined, userName: data }).then(res => {
        if (res.success === true) {
          this.userInfo = res.data
        } else {
          this.$message.error(res.msg)
        }
      }).catch(e => {
        this.$message.error(e.msg)
      })
    },
    // 获取未选择的人员信息
    handleGetUnselectRoleUsers(data) {
      getUserList({ regionId: this.baseInfo.id, pageSize: this.userPageSize, pageNumber: this.selectUserPage, name: data }).then(res => {
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
    // 保存数据域基本信息--第一步
    saveBaseInfo(formName) {
      const param = {}
      if (this.addFlag === false) {
        param.flag = '0'
        param.sysRegion = {}
        param.sysRegion.code = this.baseInfo.code
        param.sysRegion.name = this.baseInfo.name
        param.sysRegion.description = this.baseInfo.description || ''
        param.sysRegion.id = this.baseInfo.id
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.addFlag === false) {
            editRegion(param).then(res => {
              if (res.success === true) {
                this.activeName = '1'
                this.active = 1
                this.$message.success('修改成功')
                this.$emit('refresh')
                this.getRegionMenuFirst()
              } else {
                this.$message.error(res.msg)
              }
            }).catch(res => {
              this.$message.error(res.msg)
            })
          } else {
            // 查重
            searchRegion({ sysRegion: { code: this.baseInfo.code, name: this.baseInfo.name }}).then(res => {
              if (res.code === 0) {
                this.activeName = '1'
                this.active = 1
                this.getRegionMenuFirst()
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
    // 保存或修改数据域组织信息--第二步
    addOrgInfo() {
      if (this.ids.length === 0) {
        this.$message.error('组织不能为空！')
        return
      }
      if (this.addFlag === false) {
        var deptIdList = this.ids
        editRegion({ flag: '1', sysRegion: { id: this.baseInfo.id }, deptIdList }).then(res => {
          if (res.success === true) {
            this.activeName = '2'
            this.active = 2
            this.$message.success('保存成功')
            this.$emit('getTableData')
            this.getHouseMenu()
            this.$emit('reset-save-flag', false)
            this.$emit('refresh')
            this.isPrev = false
          } else {
            this.$message.error(res.msg)
          }
        }).catch(e => {
          this.$message.error(e.msg)
        })
      } else {
        this.activeName = '2'
        this.active = 2
        this.getHouseMenu()
      }
    },
    //  保存或修改数据域区域信息--第三步
    addHouseInfo() {
      if (this.addFlag === false) { // edit
        var warehouseIdList = this.houseIds
        editRegion({ flag: '4', sysRegion: { id: this.baseInfo.id }, warehouseIdList }).then(res => {
          if (res.success === true) {
            this.activeName = '3'
            this.active = 3
            this.$message.success('保存成功')
            this.$emit('getTableData')
            this.getClassifyMenu()
            this.$emit('reset-save-flag', false)
            this.$emit('refresh')
            this.isPrev = false
          } else {
            this.$message.error(res.msg)
          }
        }).catch(e => { })
      } else {
        this.activeName = '3'
        this.active = 3
        // 根据数据获取分类
        this.getClassifyMenu()
      }
    },
    //  保存或修改数据域分类信息--第四步

    addClassifyInfo() {
      if (this.addFlag === false) {
        var classificationIdList = this.classIds
        editRegion({ flag: '3', sysRegion: { id: this.baseInfo.id }, classificationIdList }).then(res => {
          this.loading = false
          if (res.success === true) {
            this.activeName = '4'
            this.active = 4
            this.$emit('getTableData')
            this.$emit('reset-save-flag', false)
            this.$emit('refresh')
            this.handleGetRoleUsers()
            this.isPrev = false
          } else {
            this.$message.error(res.msg)
          }
        }).catch(e => { })
      } else {
        this.activeName = '4'
        this.active = 4
      }
    },
    // 保存人员信息，并关闭弹窗 -- 第五步
    saveUserInfo() {
      var param = {}
      this.loading = true
      if (this.addFlag === false) { // edit
        var userIdList = []
        if (this.userInfo) {
          this.userInfo.map(user => {
            userIdList.push(user.id)
          })
        }
        editRegion({ flag: '2', sysRegion: { id: this.baseInfo.id }, userIdList }).then(res => {
          if (res.success === true) {
            this.$message.success('保存成功')
            this.closeAddRole()
            this.$emit('refresh')
            this.isPrev = false
          } else {
            this.$message.error(res.msg)
          }
        }).catch(e => { })
      } else {
        var deptIdList = this.ids
        var warehouseIdList = this.houseIds
        var classificationIdList = this.classIds
        param.sysRegion = { // -- 基本信息
          name: this.baseInfo.name,
          description: this.baseInfo.description || '',
          code: this.baseInfo.code,
          parentId: this.treeId
        }
        param.userIdList = [] // -- 人员信息
        if (this.userInfo) {
          this.userInfo.map(user => {
            param.userIdList.push(user.id)
          })
        }
        param.deptIdList = deptIdList
        param.warehouseIdList = warehouseIdList
        param.classificationIdList = classificationIdList
        addRegion(param).then(res => {
          this.loading = false
          if (res.success === true) {
            this.$message.success('新建成功')
            this.closeAddRole()
            this.$emit('refresh')
          } else {
            this.$message.error(res.data)
          }
        })
      }
    },
    closeAddRole() {
      this.toData = []
      this.$refs.orgTreeTransfer.clearChecked()
      this.houseToData = []
      this.$refs.houseTreeTransfer.clearChecked()
      this.classToData = []
      this.$refs.classTreeTransfer.clearChecked()
      this.$emit('closeAddRole')
      this.isPrev = true
    },
    // 添加新成员
    addNewUser() {
      this.addUserVisible = true
      this.handleGetUnselectRoleUsers()
    },
    // 关闭添加用户页面
    handleAddNewUser(done) {
      if (this.addFlag === false) {
        this.handleGetRoleUsers()
      }
      done()
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
      this.primaryKey = ''
    },
    // 查询要新添加的用户
    searchNewUsers() {
      this.selectUserPage = 1
      this.handleGetUnselectRoleUsers(this.primaryKey)
    },
    // 批量删除
    delUsers() {
      if (this.multipleSelection.length === 0) {
        this.$message.error('请至少选择一条数据')
        return
      }
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
    prev(e) {
      if (this.isPrev && e === 0 && this.addFlag !== false) {
        this.toData = []
        this.houseToData = []
        this.classToData = []
      }
      // 上一页
      this.activeName = e + ''
      this.active = e
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
      // this.ids = obj.keys
      // this.ids = obj.keys.concat(obj.harfKeys)
      // if (toData.length === 0) {
      //   toData[0] = []
      // }
      this.ids = tree2Array(toData.length > 0 ? toData[toData.length - 1] : [], '0').map(item => {
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
      this.ids = tree2Array(toData.length > 0 ? toData[toData.length - 1] : [], '0').map(item => {
        if (item) {
          return item.id
        } else {
          return
        }
      })
    },
    // 监听穿梭框组件添加
    add2(houseFromData, houseToData, obj) {
      this.houseIds = houseToData.map(item => {
        return item.id
      })
    },
    // 监听穿梭框组件移除
    remove2(houseFromData, houseToData, obj) {
      this.houseIds = houseToData.map(item => {
        return item.id
      })
    },
    // 监听穿梭框组件添加
    add3(classFromData, classToData, obj) {
      this.classIds = tree2Array(classToData.length > 0 ? classToData[classToData.length - 1] : [], '0').map(item => {
        if (item) {
          return item.id
        } else {
          return
        }
      })
    },
    // 监听穿梭框组件移除
    remove3(classFromData, classToData, obj) {
      this.classIds = tree2Array(classToData.length > 0 ? classToData[classToData.length - 1] : [], '0').map(item => {
        if (item) {
          return item.id
        } else {
          return
        }
      })
    }
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
.height50 {
  height: 50px;
  line-height: 50px;
}
.margin10 {
  margin: 0 10px;
  width: 200px;
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
    color: #379efc;
    border-color: #379efc;
  }
  >>> .el-step__title.is-success {
    color: #379efc;
  }
  >>> .el-step__icon.is-text {
    color: #292929;
    width: 24px;
    height: 24px;
    font-size: 14px;
    font-weight: 900;
    .el-icon-check {
      color: #379efc;
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
  background: #379efc;
  outline: none;
  &:hover {
    background: rgba(113, 160, 255, 1);
  }
  &:focus {
    background: #4b7bdb;
  }
  &:visited {
    background: #379efc;
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
