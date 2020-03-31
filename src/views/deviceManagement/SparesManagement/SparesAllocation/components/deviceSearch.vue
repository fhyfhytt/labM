<template>
  <div>
    <el-row style="margin-bottom:10px">
      <el-form ref="form1" :model="formSpare">
        <input v-model="formSpare.assetItemType" hidden>
        <el-col :span="8">
          <el-form-item label="关键字 :">
            <el-input v-model="primaryKey" placeholder="" style="width: 180px; margin: 0px 10px;" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="资产分类:" @click.native="handleAdd">
            <el-input v-model="typeNames" :title="typeNames" placeholder="-请选择-" clearable style="width: 180px; margin: 0px 10px;" />
          </el-form-item>
        </el-col>
        <el-button class="button-sub btn btn2" @click="searchSpares">查询</el-button>
        <el-button class="button-sub btn btn2" @click="confirmAddUsers">确认</el-button>
      </el-form>
    </el-row>

    <el-table ref="userInfoTable" :data="userUnselectedInfo" empty-text="无数据" height="435" style="width: 100%;height:400px" @selection-change="handleUnSelectionChange">
      <el-table-column type="selection" width="40" />
      <el-table-column type="index" label="编号" width="55" />
      <el-table-column prop="userCode" label="资产编码" width="" />
      <el-table-column prop="name" label="资产名称" width="" />
      <el-table-column prop="mobile" label="资产分类" />
      <el-table-column prop="email" label="资产型号" />
      <el-table-column prop="name" label="厂商" />
      <el-table-column prop="name" label="所属状态" />
      <el-table-column prop="name" label="来源" />
      <el-table-column prop="name" label="数量" />
    </el-table>
    <div class="numListJup margin-jump">
      <el-pagination
        :page-size="userPageSize"
        layout="total,sizes,prev, pager, next, jumper"
        :total="userTotalCount"
        :pager-count="5"
        @size-change="handleUserSizeChange"
        @current-change="handleSelectUserChange"
      />
    </div>

    <!--备件分类界面-->
    <el-dialog v-if="sparesTypeVisible" v-model="sparesTypeVisible" append-to-body title="备件分类" :close-on-click-modal="false" :visible.sync="sparesTypeVisible" class="deviceAdd addmanage sparesTypeDialog">
      <sparesType ref="sparesType" :tree-id="id" @getData="getData" @handelsparesTypeVisible="handelsparesTypeVisible" />
    </el-dialog>
  </div>
</template>
<script>
// getUserByRegionId,
import { getUserList } from '@/api/userManagement.js'
// import { getSparesList } from '@/api/deviceManage.js'
// import addFilters from '../../../AssetManagement/components/addFiltersType'
import sparesType from '../../SparesCheck/components/tab/sparesType'
export default {
  components: { sparesType },
  data() {
    return {
      sparesTypeVisible: false, // 备件分类页面是否显示
      formSpare: { assetName: '', assetItemType: '' },
      tableDate: [],
      loading: false,
      pageNumber: 1,
      pageSize: 10,
      // totalNum: 0, // 总页数
      // param: {
      //   checkStatus: 0,
      //   pageNum: 1,
      //   pageSize: 10
      // },
      input: '',
      tableloading: true,
      id: '',
      typeData: [], // 备件分类数据
      typeNames: '', // 备件分类名称
      userUnselectedInfo: [], // 未添加人员信息
      multipleSelection: [], // 已选用户多选列表
      unSelectMultipleSelection: [], // 未选用户多选列表
      userInfo: [], // 已添加人员信息
      userPageSize: 10, // 选择人员每页个数
      userTotalCount: 0, // 未选择人数页数
      selectUserPage: 1, // 当前页数 // 未选择人员页数
      primaryKey: '' // 查询关键字
    }
  },
  mounted() {
    this.handleGetUnselectRoleUsers()
  },
  methods: {
    // 查询列表信息
    // 获取未选择的人员信息
    handleGetUnselectRoleUsers(data) {
      // regionId: this.baseInfo.id,
      getUserList({ pageSize: this.userPageSize, pageNumber: this.selectUserPage, name: data }).then(res => {
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
    searchSpares() {
      // this.param = Object.assign(this.param, this.formSpare)
      this.selectUserPage = 1
      this.handleGetUnselectRoleUsers(this.primaryKey)
    },
    // 分页掉接口
    handleGetTableData(value) {
      if (value) {
        this.param.pageSize = value.pageSize
        this.param.pageNum = value.pageNum
        this.selectUserPage = value.selectUserPage
      }
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
    handleUserSizeChange(val) {
      this.userPageSize = val
      this.handleGetUnselectRoleUsers()
    },
    // 未添加人员信息列表
    handleSelectUserChange() {
      this.handleGetUnselectRoleUsers()
    },
    // 打开分类弹框
    handleAdd() {
      this.sparesTypeVisible = true
    },
    // 取消，关闭弹框
    handelsparesTypeVisible(sparesTypeVisible) {
      this.sparesTypeVisible = false
    },
    // 点击查询备件分类数据
    getData(msg) {
      this.typeData = msg
      this.typeNames = this.typeData.map(item => {
        return item.name
      }).join(',')
      this.formSpare.assetItemType = this.typeData.map(item => {
        return item.id
      }).join(',')
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
      this.$emit('getUserInfo', this.userInfo)
      this.primaryKey = ''
    }
  }
}
</script>
<style lang="scss">
@import '~@/styles/mixin.scss';
@import '~@/styles/variables.scss';

</style>
<style lang="scss" scoped>
  .sparesTypeDialog /deep/.el-dialog {
    width: 350px!important;
  }
</style>
