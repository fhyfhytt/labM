<template>
  <div class="pageRow">
    <div class="page-title">
      <el-form ref="form1" :model="formDiction" size="small" label-width="110px">
        <el-row>
          <el-col :xl="{span:4}" :lg="{span:6}">
            <el-form-item label="字典名称：">
              <el-input v-model="formDiction.name" placeholder="请输入字典名称" />
            </el-form-item>
          </el-col>
          <el-col :xl="{span:4}" :lg="{span:6}">
            <el-button v-permission="'dictionarySearch'" size="small" class="button-sub" style="margin-left:24px;" @click="getDiction">查询</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="page-table">
      <div class="page-table-content">
        <div class="button-tool">
          <div class="button-tool-left fl" />
          <div class="button-tool-right fr">
            <el-button v-permission="'dictionaryAdd'" icon="iconfont icontianjia1" size="small" @click="handleAdd">新增</el-button>
            <el-button v-permission="'dictDeleteMore'" icon="iconfont iconxingzhuang1" size="small" @click="handleSelectDel">批量删除</el-button>
          </div>

        </div>
        <el-table ref="multipleDel" v-loading="loading" :data="tableData" style="width: 100%" empty-text="无数据" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="60" />
          <el-table-column type="index" label="序号" />
          <el-table-column prop="code" label="字典编号" />
          <el-table-column prop="name" label="字典名称" />
          <el-table-column prop="description" label="字典描述" />
          <el-table-column prop="remark" label="备注" />
          <el-table-column label="操作">
            <template slot-scope="scope">
              <i v-permission="'dictionaryEdit'" class="iconfont iconbianji1 scope-caozuo" title="编辑" @click="handleEdit(scope.$index, scope.row)" />
              <i v-permission="'dictionaryAddSon'" class="iconfont iconchakan scope-caozuo" title="查看详情" @click="handleLook(scope.$index, scope.row)" />
              <i v-permission="'dictSingleDelete'" class="iconfont iconxingzhuang1 scope-caozuo" title="删除" @click="handleDel(scope.$index, scope.row)" />
            </template>
          </el-table-column>
        </el-table>
        <div class="numListJup margin-jump">
          <el-pagination
            :page-size="pageSize"
            :page-sizes="[10, 20, 50, 100]"
            layout="total,sizes,prev, pager, next, jumper"
            :total="totalCount"
            :pager-count="5"
            :current-page.sync="currentPage"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
      </div>
    </div>
    <div class="dislog">
      <!--新增界面-->
      <el-dialog v-if="addFormVisible" v-model="addFormVisible" title="新建字典库" :close-on-click-modal="false" :visible.sync="addFormVisible" class="deviceAdd newAddDit" width="550px">
        <AddMoudel @addclose="addclose" @resgetDiction="resgetDiction" />
      </el-dialog>
      <!--编辑界面-->
      <el-dialog v-if="editFormVisible" v-model="editFormVisible" title="编辑字典库" :close-on-click-modal="false" :before-close="closeEdit" :visible.sync="editFormVisible" class="deviceAdd newAddDit" width="550px">
        <EditMoudel :row="row" :dict-id="dictId" @editclose="editclose" @resgetDiction="resgetDiction" />
      </el-dialog>
      <!--详情界面-->
      <el-dialog v-if="LookFormVisible" v-model="LookFormVisible" title="查看字典子项" :close-on-click-modal="false" :visible.sync="LookFormVisible" class="deviceAdd newlookDit" width="860px">
        <LookMoudel :dict-id="dictId" :parent-name="parentName" @Lookclose="Lookclose" />
      </el-dialog>
      <!--确认删除弹框-->
      <el-dialog title="删除" :visible.sync="moveShow" class="baseMove">
        <baseConfirm @sureMsg="sureMsg" @confireMsg="confireMsg" />
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { dictConnSelect, dictConnDel } from '@/api/Dictionarys.js'
import AddMoudel from './AddMoudel.vue'
import EditMoudel from './EditMoudel.vue'
import LookMoudel from './LookMoudel.vue'
import baseConfirm from '@/views/baseComponents/baseConfirm'
export default {
  components: { AddMoudel, EditMoudel, LookMoudel, baseConfirm },
  data() {
    return {
      formDiction: { name: '' },
      tableData: [], // 字典table表格数据
      pageNumber: 1,
      pageSize: 10,
      totalCount: 0,
      currentPage: 1,
      addFormVisible: false, // 新增界面是否显示
      editFormVisible: false, // 编辑界面是否显示
      LookFormVisible: false, // 详情界面是否显示
      ids: '', // 删除传参id
      moveShow: false, // //确认删除弹框是否显示
      multipleDel: [],
      row: {}, // 字典编辑的数据
      dictId: '', // 主表字典id
      parentName: '', // 主表字典的name
      loading: true
    }
  },
  mounted() {
    this.getStartDiction()
  },
  methods: {
    // 字典查询----初始化查询
    getStartDiction() {
      this.loading = true
      const param = {
        dictName: this.formDiction.name,
        dictNameIsLike: '1',
        sortColumn: 'create_time',
        sortOrder: 'asc',
        pageNumber: this.pageNumber,
        pageSize: this.pageSize
      }
      dictConnSelect(param).then(response => {
        this.loading = false
        if (response.success === true) {
          this.tableData = response.data.sysDicts
          this.totalCount = Number(response.data.totalCount)
        }
      }).catch(response => {
        this.$message.error(response.msg)
      })
    },
    // 字典查询----模糊查询
    getDiction() {
      this.pageNumber = 1
      this.pageSize = 10
      this.currentPage = 1
      this.getStartDiction()
    },
    // 字典删除
    handleDel(index, row) {
      this.ids = [row.id]
      this.moveShow = true
    },
    // 确认删除
    sureMsg(flag) {
      this.moveShow = flag
      const param = {
        ids: this.ids,
        flag: '1'
      }
      dictConnDel(param).then(response => {
        if (response.success === true) {
          this.ids = []
          this.$message.success(response.msg)
          this.getDiction()
        } else {
          this.$message.error(response.msg)
        }
      }).catch(response => {
        this.$message.error(response.msg)
      })
    },
    // 批量删除
    handleSelectDel() {
      if (this.ids.length === 0) {
        this.$message.error('请至少选择一条数据')
      } else {
        this.moveShow = true
      }
    },
    // 选择表格数据
    handleSelectionChange(val) {
      this.multipleDel = val
      const delId = []
      this.multipleDel.map(value => {
        delId.push(value.id)
      })
      //   console.log('userid', delId.join(','))
      this.ids = delId.join(',')
    },
    // 取消删除
    confireMsg(flag) {
      this.moveShow = flag
    },
    // 字典新增
    handleAdd() {
      this.addFormVisible = true
    },
    // 取消新增
    addclose() {
      this.addFormVisible = false
    },
    // 新增编辑之后刷新页面
    resgetDiction() {
      this.getStartDiction()
    },
    // 字典编辑
    handleEdit(index, row) {
      this.dictId = row.id
      this.row = row
      this.editFormVisible = true
    },
    // 取消编辑
    editclose() {
      this.editFormVisible = false
    },
    // 点击x取消编辑
    closeEdit(done) {
      done()
      // this.getStartDiction()
    },
    // 查看详情  查看字典库子表
    handleLook(index, row) {
      this.LookFormVisible = true
      this.dictId = row.id
      this.parentName = row.name
      //   console.log('parentname', this.parentName)
      //   const param = { dictId: this.dictId }
      //   dictConnSelect(param).then(response => {
      //     if (response.success === true) {
      //       this.SontableData = response.data.sysDictItems
      //     } else {
      //       this.$message.error(response.data)
      //     }
      //   }).catch(response => {
      //     this.$message.error(response.msg)
      //   })

      //   console.log('zirow', row)
    },
    // 取消详情
    Lookclose() {
      this.LookFormVisible = false
    },
    // 分页
    handleSizeChange(val) {
      this.pageSize = val
      this.pageNumber = 1
      this.getStartDiction()
    },
    handleCurrentChange(val) {
      this.pageNumber = val
      this.getStartDiction()
    },
    handleJumper(currentPage) { }
  }
}
</script>

<style lang="scss" >
.pageRow{

}

</style>
