<template>
  <div class="UserManage-edit">
    <el-steps :active="active" finish-status="success" simple>
      <el-step title="基本信息">
        <span slot="icon" class="icontext">1</span>
      </el-step>
      <el-step title="角色分配"><span slot="icon" class="icontext">2</span></el-step>
      <el-step title="所属数据域"><span slot="icon" class="icontext">3</span></el-step>
    </el-steps>
    <el-tabs v-model="activeName" stretch>
      <!--新建人员基本信息 :disabled="disabled"-->
      <el-tab-pane label="基本信息" name="0" :disabled="disabled">
        <div>
          <el-form ref="editForm" :model="editForm" label-width="90px" :rules="editFormRules" class="edituser">
            <el-row>
              <el-col :span="12">
                <el-form-item label="用户名:" prop="name">
                  <el-input v-model="editForm.name" placeholder="请输入用户名" />
                </el-form-item>
                <el-form-item label="岗位:" prop="job">
                  <el-input v-model="editForm.job" auto-complete="off" placeholder="请输入岗位" />
                </el-form-item>
                <el-form-item label="工号:" prop="userCode">
                  <el-input v-model="editForm.userCode" placeholder="请输入工号" />
                </el-form-item>
                <el-form-item label="职务:" prop="userPosition">
                  <el-input v-model="editForm.userPosition" autocomplete="off" placeholder="请输入职位" />
                </el-form-item>
                <el-form-item label="性别:" prop="sex">
                  <el-select v-model="editForm.sex" popper-class="select-option" placeholder="-请选择性别-">
                    <el-option label="男" value="1" />
                    <el-option label="女" value="0" />
                  </el-select>
                </el-form-item>
                <el-form-item label="账号状态:" prop="available">
                  <el-select v-model="editForm.available" popper-class="select-option" placeholder="-请选择账号状态-">
                    <el-option label="启用" value="1" />
                    <el-option label="未启用" value="0" />
                  </el-select>
                </el-form-item>
                <el-form-item label="在职状态:" prop="active">
                  <el-select v-model="editForm.active" popper-class="select-option" placeholder="-请选择在职状态-">
                    <el-option label="在职" value="1" />
                    <el-option label="离职" value="0" />
                  </el-select>
                </el-form-item>
                <el-form-item label="所属组织:" prop="deptId">
                  <treeselect v-model="editForm.deptId" :open-direction="'top'" :default-expand-level="1" :multiple="false" :no-results-text="noResultsText" :options="organTree" placeholder="点击选择组织" :normalizer="normalizer" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="头像:" prop="avatar">
                  <el-upload
                    class="avatar-uploader"
                    :action="baseURL"
                    :show-file-list="false"
                    :before-upload="beforeAvatarUpload"
                    :on-success="handleAvatarSuccess"
                    :on-error="handleError"
                    :accept="'image/*'"
                    name="file"
                    :headers="headers"
                    :disabled="avatardisabled"
                    :drag="true"
                    :data="avatarData"
                  >
                    <img v-if="editForm.avatar" :src="avatar.url" class="avatar">
                    <img v-else :src="header" class="avatar" alt="">
                    <div v-if="tip" class="mask"><i :class="iconcass" /></div>
                    <div v-if="!tip" class="mask" @click.stop="deleteAvatar"><i class="iconfont iconxingzhuang1" /></div>
                    <div v-if="tip" slot="tip" class="el-upload__tip">可拖拽上传jpg/png文件，且不超过500kb</div>
                    <!-- <div v-if="!tip" slot="tip" class="el-upload__tip2">删除</div> -->
                  </el-upload>
                </el-form-item>
                <el-form-item label="生日:" prop="birthday" class="birdate">

                  <el-date-picker v-model="editForm.birthday" value-format="yyyy-MM-dd" type="date" placeholder="请选择日期" align="right" prefix-icon="iconfont iconrili" />
                </el-form-item>
                <el-form-item label="联系方式:" prop="mobile">
                  <el-input v-model="editForm.mobile" autocomplete="off" placeholder="请输入联系方式" />
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                  <el-input v-model="editForm.email" autocomplete="off" placeholder="请输入邮箱" />
                </el-form-item>
                <el-form-item label="密码:" prop="password">
                  <el-input v-model="editForm.password" autocomplete="off" placeholder="需要修改密码请填写" />
                </el-form-item>
                <el-form-item label="所属班组:" prop="group">
                  <treeselect v-model="editForm.groupId" :open-direction="'top'" :default-expand-level="1" :multiple="false" :no-results-text="noResultsText" :options="groupTree" placeholder="点击选择班组" :normalizer="normalizer" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="描述:" prop="remark">
                  <el-input v-model="editForm.remark" type="textarea" placeholder="请输入用户描述" />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <div class="dialog-footer">
            <el-button v-preventReClick="1000" size="small" class="button-sub" @click.native="submitUserForm('editForm')">下一步</el-button>
          </div>
        </div>
      </el-tab-pane>
      <!--角色信息-->
      <el-tab-pane label="角色分配" name="1" :disabled="disabled">
        <div>
          <div class="button-tool" style="margin-top:5px;margin-bottom:5px;float:left">
            <el-button icon="iconfont icontianjia1" size="small" @click="AddtwoRole">新增</el-button>
            <el-button icon="iconfont iconxingzhuang1 " size="small" @click="handletwoDelRole">批量删除</el-button>
          </div>
          <div>
            <el-table ref="multipRole" height="360" class="addShow" :data="tableDataRole" @selection-change="handleSelcRoleChange">
              <el-table-column type="selection" width="60" />
              <el-table-column type="index" label="序号" />
              <el-table-column prop="name" label="角色名" />
              <el-table-column prop="description" label="描述" />
            </el-table>
          </div>
          <div class="dialog-footer nextfooter">
            <el-button v-preventReClick="1000" size="small" class="button-cancel" @click.native="prev(0)">上一步</el-button>
            <el-button v-preventReClick="1000" size="small" class="button-sub" @click.native="submitRoleForm">下一步</el-button>
          </div>
        </div>
      </el-tab-pane>
      <!--所属数据域-->
      <el-tab-pane label="所属数据域" name="2" :disabled="disabled">
        <div>
          <div class="button-tool" style="margin-top:5px;margin-bottom:5px;float:left">
            <el-button icon="iconfont icontianjia1" size="small" @click="AddtwoRegion">新增</el-button>
            <el-button icon="iconfont iconxingzhuang1 " size="small" @click="handletwoDelRegion">批量删除</el-button>
          </div>
          <div>
            <el-table ref="multipRegion" height="360" :data="tableDataRegion" @selection-change="handleSelcRegionChange">
              <el-table-column type="selection" width="60" />
              <el-table-column type="index" label="序号" width="150" />
              <el-table-column prop="name" label="名称" />
              <el-table-column prop="description" label="描述" />
            </el-table>
          </div>
          <div class="dialog-footer nextfooter">
            <el-button v-preventReClick="1000" size="small" class="button-cancel" @click.native="prev(1)">上一步</el-button>
            <el-button v-preventReClick="1000" size="small" class="button-sub" @click.native="submitForm">保存</el-button>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
    <!--再次弹出框人员新增里边的新增角色-->
    <el-dialog v-if="AddtwoRoleFormVisible" v-model="AddtwoRoleFormVisible" append-to-body title="选择角色" :close-on-click-modal="false" :visible.sync="AddtwoRoleFormVisible" :before-close="RoleAddteoClose" class="deviceAdd editHeight" width="900px">
      <p class="bkb" />
      <div>
        <div class="addAtop">
          <el-form ref="formRoleAdd" :model="formRoletwoAdd" size="small" label-width="110px" @submit.native.prevent>
            <el-row :gutter="10">
              <el-col :span="8">
                <el-form-item label="关键字：">
                  <el-input v-model="formRoletwoAdd.name" placeholder="请输入角色名" />
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item>
                  <el-button size="small" class="button-sub" style="margin-left:-80px;" @click="selseAddTwoRole">查询</el-button>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item>
                  <el-button size="small" class="button-sub" style="margin-left:-120px;" @click="AddTwoRoleOK">确认</el-button>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <div class="AddBorder">
          <el-table ref="multipleTwoRole" height="370" :data="AddtwoRoletable" @selection-change="SelcTwoRoleChange">
            <el-table-column type="selection" width="60" />
            <el-table-column type="index" label="序号" />
            <el-table-column prop="name" label="角色名称" />
            <el-table-column prop="description" label="描述" />
          </el-table>
          <div class="numListJup margin-jump">
            <el-pagination :page-size="pageSize" layout="total,sizes,prev, pager, next, jumper" :total="totalCount" :pager-count="5" :current-page.sync="currentPage" @size-change="handleSizeRole" @current-change="handleCurrentRole" />
            <!-- <div class="sendAllBtn" @click="handleJumperRole">
              <span>跳转</span>
            </div> -->
          </div>
        </div>
      </div>
    </el-dialog>
    <!--再次弹出框人员新增里边的新增数据域-->
    <el-dialog v-if="AddtwoRegionFormVisible" v-model="AddtwoRegionFormVisible" append-to-body title="选择数据域" :close-on-click-modal="false" :visible.sync="AddtwoRegionFormVisible" :before-close="RegionAddteoClose" class="deviceAdd editHeight" width="900px">
      <p class="bkb" />
      <div>
        <div class="addAtop">
          <el-form ref="formRegionAdd" :model="formRegiontwoAdd" size="small" label-width="110px" @submit.native.prevent>
            <el-row :gutter="10">
              <el-col :span="8">
                <el-form-item label="关键字：">
                  <el-input v-model="formRegiontwoAdd.name" placeholder="请输入数据域名" />
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item>
                  <el-button size="small" class="button-sub" style="margin-left:-80px;" @click="selseAddTwoRegion">查询</el-button>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item>
                  <el-button size="small" class="button-sub" style="margin-left:-120px;" @click="AddTwoRegionOK">确认</el-button>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <div class="AddBorder">
          <el-table ref="multipleTwoRegion" height="390" :data="AddtwoRegiontable" @selection-change="SelcTwoRegionChange">
            <el-table-column type="selection" width="60" />
            <el-table-column type="index" label="序号" />
            <el-table-column prop="name" label="数据域名称" />
            <el-table-column prop="description" label="描述" />
          </el-table>
          <div class="numListJup margin-jump">
            <el-pagination :page-size="pageSizeRegion" layout="total,prev,pager, next, jumper" :total="totalCountRegion" :pager-count="5" :current-page.sync="currentPageRegion" @size-change="handleSizeRegion" @current-change="handleCurrentRegion" />
            <!-- <div class="sendAllBtn" @click="handleJumperRegion">
              <span>跳转</span>
            </div> -->
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getOrgTreeNew } from '@/api/userManagement'
import { setTreeData } from '@/utils/utils'
import common from '@/utils/common'
import { selectRoleByUserId, selectRegionByUserId, getRegionList, getRoleList, editUserAll } from '@/api/userManagement.js'
import header from '@/assets/img/header.png'
export default {
  props: {
    row: {
      type: Object,
      default: () => { }
    }
  },
  data() {
    var validatePass1 = (rule, value, callback) => {
      var myreg = /^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/
      // var myreg = /^1[3456789]\d{9}$/
      if (value === '') {
        callback(new Error('请输入联系方式'))
      } else if (!myreg.test(value)) {
        callback(new Error('联系方式输入不正确'))
      } else {
        callback()
      }
    }
    const validatePass2 = (rule, value, callback) => {
      var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>《》/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？ ]")
      var myreg = /^[a-zA-Z]\w{3,15}$/
      if (value === '') {
        callback(new Error('请输入账号'))
      } else if (pattern.test(value)) {
        callback(new Error('账号不含除-符号以外的符号'))
      } else if (!myreg.test(value)) {
        callback(new Error('账号为字母开头,由4-16位字母或数字组成'))
      } else {
        callback()
      }
    }
    return {
      disabled: true, // tabs是否禁用
      activeName: 0, // tabs默认显示第一个用户基本信息
      active: 0,
      header: header,
      editForm: { name: '', userCode: '', avatar: '', birthday: '', mobile: '', email: '', password: '', sex: '', available: '', active: '', remark: '', job: '', userPosition: '', groupId: [], deptId: [] },
      editFormRules: {
        name: [{ validator: validatePass2, trigger: 'change', required: true }],
        userCode: [{ required: true, message: '请输入工号', trigger: 'change' }],
        birthday: [{ required: true, message: '请选择生日', trigger: ['blur', 'change'] }],
        mobile: [{ required: true, validator: validatePass1, trigger: 'change' }],
        email: [{ required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }],
        sex: [{ required: true, message: '请选择性别', trigger: ['blur', 'change'] }],
        available: [{ required: true, message: '请选择账号状态', trigger: ['blur', 'change'] }],
        active: [{ required: true, message: '请选择在职状态', trigger: ['blur', 'change'] }],
        avatar: [{ required: true, message: '请上传头像', trigger: ['change'] }],
        organ: [{ required: true, message: '请选择组织', trigger: ['blur'] }]
      },
      noResultsText: '无数据', // 无搜索数据
      groupTree: [], // 班组树
      organTree: [], // 组织树
      // formRole: { name: '' }, // 角色名查询
      tableDataRole: [], // 角色table数据
      tableDataRegion: [], // 数据域table数据
      totalCount: 0, // 角色总条数
      pageSize: 10, // 角色每页几条
      pageNumber: 1, // 角色第几页
      currentPage: 1, // 角色直接跳到第几页
      totalCountRegion: 0, // 数据域总条数
      pageSizeRegion: 10, // 数据域每页几条
      pageNumberRegion: 1, // 数据域第几页
      currentPageRegion: 1, // 数据域直接跳到第几页
      UserId: '', // 传参人员id
      roleIdList: [], // 添加角色id传参
      regionIdList: [], // 添加数据域id传参
      multipRole: [], // 选择table角色表格的一条或多条数据
      multipRegion: [], // 选择table数据域表格的一条或多条数据
      AddtwoRoleFormVisible: false, // 人员修改里边的角色新增是否显示
      AddtwoRegionFormVisible: false, // 人员修改里面的数据域新增是否显示
      formRoletwoAdd: { name: '' }, // 修改里面的新增角色查询
      formRegiontwoAdd: { name: '' }, // 修改里面的新增数据域查询
      AddtwoRoletable: [], // 新增的角色table表格数据
      AddtwoRegiontable: [], // 新增的数据域的table表格
      multipleTwoRole: [], // 新增的角色的table的ref值
      multipleTwoRegion: [], // 新增的数据域的table的ref值
      AllRoleList: [], // 角色全部的id
      reloselseid: [], // 新增角色选择要添加的角色id
      AllRegionList: [], // 数据域全部id
      regionselseid: [], // 新增数据域选择要添加的id
      tip: false,
      baseURL: this.GLOBAL.BASE_URL + '/common/uploadFile',
      avatarData: {
        type: 1,
        connType: '600',
        attCode: '600',
        connId: ''
      },
      avatardisabled: true, // 头像上传禁用
      headers: {
        'Authorization': this.$store.state.user.token
      },
      iconclass: 'iconfont iconbianzu2 avatar-uploader-icon',
      avatar: {
        id: '',
        url: '',
        appendixPath: ''
      }
    }
  },
  watch: {
    'editForm.deptId': function(newvalue, oldvalue) {
      if (newvalue !== '') {
        this.$refs.editForm.clearValidate('deptId')
      }
    },
    organTree: function(newvalue, oldvalue) {
      this.organTree = newvalue
    }, groupTree: function(newvalue, oldvalue) {
      this.groupTree = newvalue
    }
  },

  created() {
    this.init()
  },
  mounted() {
    this.$nextTick(() => {
      this.editForm = Object.assign({}, this.row)
      if (this.row.avatarAddress === '' && this.row.avatar === '') {
        this.avatardisabled = false
        this.tip = true
      } else {
        // this.avatardisabled = false 调试用
        this.avatar.id = this.row.avatar
        this.avatar.url = this.row.avatarAddress
        this.avatar.appendixPath = this.row.avatarAddress
      }
      if (this.editForm.deptId === '') {
        this.editForm.deptId = null
      }
      if (this.editForm.groupId === '') {
        this.editForm.groupId = null
      }
    })

    this.getRole()
    this.getRegin()
  },
  methods: {
    init() {
      var _this = this
      if (_this.organTree.length === 0) {
        getOrgTreeNew().then(res => {
          if (res.code === 0) {
            _this.organTree = setTreeData(res.data)
          } else {
            _this.$message.error(res.msg)
          }
        })
      }
      if (_this.groupTree.length === 0) {
        getOrgTreeNew().then(res => {
          if (res.code === 0) {
            _this.groupTree = setTreeData(res.data)
          } else {
            _this.$message.error(res.msg)
          }
        })
      }
    },
    // 根据用户ID查询所拥有的角色信息接口函数---下一步调用
    getRole() {
      this.UserId = this.row.id
      const paraRole = {
        userId: this.UserId
      }
      selectRoleByUserId(paraRole).then(response => {
        if (response.success === true) {
          this.tableDataRole = response.data
        } else {
          this.$message.error(response.msg)
        }
      }).catch(response => {
        this.$message.error(response.message)
      })
    },
    // 根据用户ID查询所拥有的数据域信息接口函数---下一步调用
    getRegin() {
      this.UserId = this.row.id
      const paraRegion = {
        userId: this.UserId
      }
      selectRegionByUserId(paraRegion).then(response => {
        if (response.success === true) {
          this.tableDataRegion = response.data
        } else {
          this.$message.error(response.msg)
        }
      }).catch(response => {
        this.$message.error(response.message)
      })
    },
    // 新建人员基本信息下一步 根据用户ID查询所拥有的角色信息接口  1
    submitUserForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 保存编辑的人员信息
          const paramUser = {
            flag: '0'
          }
          paramUser.sysUser = { name: this.editForm.name, userCode: this.editForm.userCode, mobile: this.editForm.mobile, email: this.editForm.email, sex: this.editForm.sex,
            available: this.editForm.available, active: this.editForm.active, remark: this.editForm.remark, birthday: this.editForm.birthday, job: this.editForm.job, userPosition: this.editForm.userPosition, id: this.row.id, avatar: this.editForm.avatar, groupId: this.editForm.groupId, deptId: this.editForm.deptId }
          if (this.editForm.password !== '') {
            paramUser.sysUser.password = this.editForm.password
          }
          editUserAll(paramUser).then(response => {
            if (response.success === true) {
              this.$message.success('修改人员信息成功')
              // 根据用户ID查询所拥有的角色信息接口
              this.getRole()
              this.activeName = '1'
              this.active = 1
              this.$emit('clickAdd')
            } else {
              this.$message.error(response.msg)
            }
          }).catch(response => {
            this.$message.error(response.message)
          })
        } else {
          // console.log('error submit!!')
          return false
        }
      })
    },
    // 角色下一步  根据用户ID查询所拥有的数据域信息接口  2
    submitRoleForm() {
      if (this.tableDataRole.length === 0) {
        this.$message.error('请至少添加一个角色')
      } else {
        // 修改角色
        this.AllRoleList = []
        this.tableDataRole.map(value => {
          this.AllRoleList.push(value.id)
        })
        // this.UserId = this.row.id
        const paraAddrole = {
          flag: '1',
          roleIdList: this.AllRoleList
        }
        paraAddrole.sysUser = { id: this.row.id }

        editUserAll(paraAddrole).then(response => {
          if (response.success === true) {
            this.$message.success('保存成功')
            // 根据用户ID查询所拥有的数据域信息接口
            this.getRegin()
            this.activeName = '2'
            this.active = 2
            this.$emit('clickAdd')
          } else {
            this.$message.error(response.msg)
          }
        }).catch(response => {
          this.$message.error(response.message)
        })
      }
    },
    // 保存  根据人员ID添加修改数据域  3
    submitForm() {
      if (this.tableDataRegion.length === 0) {
        this.$message.error('请选择修改的数据域信息')
      } else {
        this.AllRegionList = []
        this.tableDataRegion.map(value => {
          this.AllRegionList.push(value.id)
        })
        const paraAddregin = {
          flag: '2',
          regionIdList: this.AllRegionList
        }
        paraAddregin.sysUser = { id: this.row.id }
        this.active = 3
        editUserAll(paraAddregin).then(response => {
          if (response.success === true) {
            this.$message.success('保存成功')
            this.$emit('closeEdit')
            this.activeName = '0'
            this.$emit('clickAdd')
            if (this.editForm.name === this.$store.getters.name) {
              location.reload()
            }
          } else {
            this.$message.error(response.msg)
          }
        }).catch(response => {
          this.$message.error(response.msg)
        })
      }
    },
    // 新增里面的新增 弹出要新增的角色的列表
    AddtwoRole() {
      this.AddtwoRoleFormVisible = true
      this.handelRoleList()
    },
    // 新增里面的新增 批量删除角色列表信息
    handletwoDelRole() {
      // console.log(this.multipRole, 444444)
      if (this.multipRole.length === 0) {
        this.$message.error('请选择要删除的角色')
      } else {
        this.tableDataRole = this.tableDataRole.filter(value => {
          if (this.multipRole.indexOf(value) !== -1) {
            return false
          } else {
            return true
          }
        })
      }
    },
    // 新增里面的新增 新增页面弹出的新增角色弹框里边的查询角色
    selseAddTwoRole() {
      this.handelRoleList()
    },
    // 新增里面的新增 点击x关闭新增角色弹框
    RoleAddteoClose(done) {
      this.formRoletwoAdd.name = ''
      done()
    },
    // 新增里面的新增 确认添加的角色信息
    AddTwoRoleOK() {
      if (this.multipleTwoRole.length === 0) {
        this.$message.error('请选择要添加的角色信息')
      } else {
        if (this.tableDataRole.length === 0) {
          this.tableDataRole = [...this.multipleTwoRole]
        } else {
          // 判断数据有没有添加
          const ifRole = []
          this.tableDataRole.map(item => {
            this.multipleTwoRole.map(value => {
              if (item.id === value.id) {
                ifRole.push(item)
              }
            })
          })
          if (ifRole.length > 0) {
            this.$message.error('该数据已添加')
          } else {
            this.tableDataRole = this.tableDataRole.concat(this.multipleTwoRole)
          }
        }
        this.AddtwoRoleFormVisible = false
      }
    },
    // 数据域新增弹出框显示  数据域列表
    AddtwoRegion() {
      this.AddtwoRegionFormVisible = true
      this.handelRegionList()
    },
    // 批量删除数据域列表
    handletwoDelRegion() {
      if (this.multipRegion.length === 0) {
        this.$message.error('请选择要删除的数据域')
      } else {
        this.tableDataRegion = this.tableDataRegion.filter(value => {
          if (this.multipRegion.indexOf(value) !== -1) {
            return false
          } else {
            return true
          }
        })
      }
    },
    // 新增里面查询新增的数据域列表
    selseAddTwoRegion() {
      this.handelRegionList()
    },
    // 数据域新增弹出框点击x
    RegionAddteoClose(done) {
      this.formRegiontwoAdd.name = ''
      done()
    },
    AddTwoRegionOK() {
      if (this.multipleTwoRegion.length === 0) {
        this.$message.error('请选择一个数据域')
      } else {
        if (this.tableDataRegion.length === 0) {
          this.tableDataRegion = [...this.multipleTwoRegion]
        } else {
          // 判断数据有没有添加
          const ifRegion = []
          this.tableDataRegion.map(item => {
            this.multipleTwoRegion.map(value => {
              if (item.id === value.id) {
                ifRegion.push(item)
              }
            })
          })
          if (ifRegion.length > 0) {
            this.$message.error('该数据已添加')
          } else {
            this.tableDataRegion = this.tableDataRegion.concat(this.multipleTwoRegion)
          }
        }
        this.AddtwoRegionFormVisible = false
      }
    },
    // 角色  选择table表格事件
    handleSelcRoleChange(val) {
      this.roleIdList = []
      this.multipRole = val
      this.multipRole.map(value => {
        this.roleIdList.push(value.id)
      })
      // console.log('roleIdList', this.roleIdList)
    },
    // 数据域  选择table表格事件
    handleSelcRegionChange(val) {
      this.regionIdList = []
      this.multipRegion = val
      this.multipRegion.map(value => {
        this.regionIdList.push(value.id)
      })
      // console.log('regionIdList', this.regionIdList)
    },
    // 角色的新增角色 选择table事件
    SelcTwoRoleChange(val) {
      this.multipleTwoRole = val
      this.reloselseid = []
      this.multipleTwoRole.map(value => {
        this.reloselseid.push(value.id)
      })
      // console.log('xinzengzinztable', this.multipleTwoRole)
    },
    // 数据域的新增数据域 选择table事件
    SelcTwoRegionChange(val) {
      this.multipleTwoRegion = val
      this.regionselseid = []
      this.multipleTwoRegion.map(value => {
        this.regionselseid.push(value.id)
      })
      // console.log('xinzengzinztable', this.regionselseid)
    },
    // 角色 分页
    handleSizeRole(val) {
      this.pageSize = val
      this.handelRoleList()
    },
    // 角色 点击哪一页跳到哪一页
    handleCurrentRole(val) {
      this.pageNumber = val
      this.handelRoleList()
    },
    // 直接跳转到第几页
    handleJumperRole(currentPage) { },
    // 数据域 分页
    handleSizeRegion(val) {
      this.pageSizeRegion = val
      this.handelRegionList()
    },
    handleCurrentRegion(val) {
      this.pageNumberRegion = val
      this.handelRegionList()
    },
    handleJumperRegion(currentPageRegion) { },
    // 新增里面要新增的角色列表-----查询角色列表-----函数调用及分页调用
    handelRoleList() {
      const paRoleList = { pageSize: this.pageSize, pageNumber: this.pageNumber, status: '1', name: this.formRoletwoAdd.name }
      getRoleList(paRoleList).then(response => {
        if (response.success === true) {
          this.AddtwoRoletable = response.data.rows
          this.totalCount = response.data.totalCount
        } else {
          this.$message.error(response.msg)
        }
      }).catch(response => {
        this.$message.error(response.message)
      })
    },
    // 新增里面要新增的数据域列表-----查询数据域列表-----函数调用及分页调用sortOrder: 'create_time', sortColumn: 'desc',
    handelRegionList() {
      const paRegionList = { pageSize: this.pageSizeRegion, pageNumber: this.pageNumberRegion, name: this.formRegiontwoAdd.name }
      getRegionList(paRegionList).then(response => {
        if (response.success === true) {
          this.AddtwoRegiontable = response.data.rows
          this.totalCountRegion = response.data.totalCount
        } else {
          this.$message.error(response.msg)
        }
      }).catch(response => {
        this.$message.error(response.message)
      })
    },
    // // 上传头像承购回调
    handleAvatarSuccess(res, file) {
      this.avatar.appendixPath = URL.createObjectURL(file.raw)
      if (res.code === 0) {
        this.$message.success('上传成功')
        this.iconclass = 'el-icon-plus avatar-uploader-icon'
        this.avatardisabled = true
        this.tip = false
        this.$refs.editForm.clearValidate('avatar')
        this.editForm.avatar = res.data.id
        this.avatar.id = res.data.id
        this.avatar.url = window.URL.createObjectURL(file.raw)
        this.avatar.appendixPath = res.data.appendixPath
      } else if (res.code === 10003) {
        this.$message.error(res.msg)
        this.$store.store.state.user.token = null
        this.$store.dispatch('tagsView/delAllVisitedViews', '')
        this.$store.dispatch('user/logout')
      } else {
        this.$message.error(res.msg)
      }
    },
    // 改变
    // imgSaveToUrl(e) {
    //   this.editForm.avater = URL.createObjectURL(e.raw)
    //   this.getBase64(e.raw).then(res => {
    //     this.editForm.avatar = res
    //   })
    //   this.iconclass = 'el-icon-plus avatar-uploader-icon'
    //   this.tip = false
    // },
    // 上传头像判断
    beforeAvatarUpload(file) {
      const isImage = file.type.includes('image')
      if (!isImage) {
        this.$message.error('上传文件类型必须是图片!')
      }
      const isLt2M = file.size / 1024 / 1024 < 1
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 1MB!')
      }
      this.iconclass = 'el-icon-loading avatar-uploader-icon'
      return isImage && isLt2M
    }, deleteAvatar() {
      common.removeFJ(this.avatar).then(res => {
        if (res.code === 0) {
          this.$message.success(res.msg)
          this.avatardisabled = false
          this.editForm.avatar = ''
          this.avatar.id = ''
          this.tip = true
        } else {
          throw res
        }
      }).catch(res => {
        this.$message.error(res.msg)
      })
    },
    getBase64(file) {
      return new Promise(function(resolve, reject) {
        const reader = new FileReader()
        let imgResult = ''
        reader.readAsDataURL(file)
        reader.onload = function() {
          imgResult = reader.result
        }
        reader.onerror = function(error) {
          reject(error)
        }
        reader.onloadend = function() {
          resolve(imgResult)
        }
      })
    },
    handleError(e) {
      const img = e.srcElement
      this.editForm.avatar = this.errorLoadImg //  用加载失败的图片替代之
      img.onerror = null //  清除错误:如果错误时加载时显示的图片出错，将会一直循环，所以我们必须清除掉错误，限制运行一次
    }, prev(e) {
      this.activeName = e + ''
      this.active = e
    }, normalizer(node, instanceId) {
      node.label = node.name
      return node
    }

  }
}

</script>
<style lang="scss" scoped>
.el-select {
  width: 100%;
}
.el-col {
  padding: 0 60px;
}
.UserManage-edit {
  .avatar-uploader:hover .mask {
    display: flex;
  }
  .mask {
    position: absolute;
    background: rgba(0, 0, 0, 0.4);
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    display: none;
    flex-direction: column;
    justify-content: center;
    i {
      color: #fff;
      font-size: 40px;
      vertical-align: middle;
    }
  }
  .vue-treeselect {
    line-height: 30px;
    // height: 30px;
  }
  >>> .vue-treeselect__control {
    height: 30px;
    line-height: 30px;
  }
  >>> .vue-treeselect__placeholder,
  .vue-treeselect__single-value {
    line-height: 30px;
  }
  >>> .vue-treeselect--focused {
    .vue-treeselect__control {
      border-color: #379efc;
      box-shadow: none;
    }
  }
  .vue-treeselect__multi-value-item {
    font-size: 14px;
    line-height: 24px;
    font-weight: 100;
    color: #292929;
  }
  >>> .vue-treeselect__menu-container {
    .vue-treeselect__menu {
      margin-top: 0px;
      margin-bottom: 0px;
      .vue-treeselect__option--highlight {
        .vue-treeselect__label {
          font-weight: 900;
        }
        background: rgba(244, 247, 250, 1);
      }
      &::-webkit-scrollbar {
        width: 5px;
        background-color: transparent;
      }

      /* 滚动条中能上下移动的小块 */
      &::-webkit-scrollbar-thumb {
        background: rgba(0, 0, 0, 0.45);
        border-radius: 5px;
      }
      /* scroll轨道背景 */
      &::-webkit-scrollbar-track {
        border-radius: 5px;
        background-color: transparent;
      }
    }
  }

  .vue-treeselect__control-arrow {
    display: none;
  }
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
  >>> .el-step__title.is-process {
    color: #292929;
  }
  >>> .avatar-uploader {
    // text-align: center;
    .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 50%;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      border-radius: 50%;
      .el-upload-dragger {
        width: auto;
        height: auto;
        border: none;
      }
    }
    .el-upload__tip {
      font-size: 12px;
      color: #606266;
      margin-top: 7px;
      position: absolute;
      white-space: nowrap;
      top: 122px;
      // color: red;
      left: 50%;
      transform: translateX(-50%);
    }
    .el-upload__tip2 {
      font-size: 12px;
      color: #606266;
      margin-top: 7px;
      position: absolute;
      white-space: nowrap;
      top: 122px;
      color: red;
      left: 50%;
      transform: translateX(-50%);
      cursor: pointer;
    }
  }
  >>> .avatar-uploader .el-upload:hover {
    border-color: #379efc;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 135px;
    height: 135px;
    line-height: 135px;
    text-align: center;
    display: block;
  }
  .avatar {
    width: 135px;
    height: 135px;
    display: block;
    border-radius: 50%;
  }
}
</style>

