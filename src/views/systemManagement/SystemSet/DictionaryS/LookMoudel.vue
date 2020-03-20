<template>
  <div class="DictionarysLook">
    <p class="bkb" />
    <div class="lookTop">
      <el-form ref="form" :model="formDiction" size="small" label-width="110px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="字典名称：">
              <el-input v-model="formDiction.name" :disabled="true" :title="formDiction.name" />
            </el-form-item>
          </el-col>
          <el-col :span="14">
            <el-form-item label="字典描述：">
              <el-input v-model="formDiction.description" type="textarea" :disabled="true" :title="formDiction.description" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="tablediction">
      <div class="button-tool" style="float:left">
        <el-button icon="iconfont icontianjia1" size="small" @click="handleAdd">新增</el-button>
        <el-button icon="iconfont iconxingzhuang1 " size="small" @click="handleSelectDel">批量删除</el-button>
      </div>
      <div class="Look-tale">
        <el-table ref="multipleDel" v-loading="loading" :data="SontableData" style="width: 100%" height="332" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="60" />
          <el-table-column type="index" label="序号" />
          <el-table-column prop="name" label="字典名称" />
          <el-table-column prop="description" label="字典描述" />
          <el-table-column prop="level" label="显示顺序" />
          <el-table-column label="操作">
            <template slot-scope="scope">
              <i class="iconfont iconbianji1 scope-caozuo" title="编辑" @click="handleEdit(scope.$index, scope.row)" />
              <i class="iconfont iconxingzhuang1  scope-caozuo" title="删除" @click="handleDel(scope.$index, scope.row)" />
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="dialog-footer">
      <el-button size="medium" class="button-sub" @click.native="submitForm">完成</el-button>
    </div>
    <!--确认删除弹框-->
    <el-dialog append-to-body title="删除" :visible.sync="moveShow" class="baseMove">
      <baseConfirm @sureMsg="sureMsg" @confireMsg="confireMsg" />
    </el-dialog>
    <!--新增界面-->
    <el-dialog v-if="SonaddFormVisible" v-model="SonaddFormVisible" append-to-body title="新建字典子项" :close-on-click-modal="false" :visible.sync="SonaddFormVisible" class="deviceAdd newLookadd" width="550px">
      <SonAddMoudel :dict-id="dictId" @Sonaddclose="Sonaddclose" @resGetSontable="resGetSontable" />
    </el-dialog>
    <!--编辑界面-->
    <el-dialog v-if="SoneditFormVisible" v-model="SoneditFormVisible" append-to-body title="编辑字典子项" :close-on-click-modal="false" :visible.sync="SoneditFormVisible" class="deviceAdd newLookadd" width="550px">
      <SoneditMoudel :dict-id="dictId" :parent-name="parentName" :looklist="Looklist" @Soneditclose="Soneditclose" @resGetSontable="resGetSontable" />
    </el-dialog>
  </div>
</template>

<script>
// import { groupEdit } from '@/api/manage.js'
import { dictConnSelect, dictConnDel } from '@/api/Dictionarys.js'
import baseConfirm from '@/views/baseComponents/baseConfirm'
import SonAddMoudel from './SonAddMoudel.vue'
import SoneditMoudel from './SoneditMoudel.vue'
export default {
  components: { baseConfirm, SonAddMoudel, SoneditMoudel },
  props: {
    dictId: {
      type: String,
      default: () => ''
    },
    parentName: {
      type: String,
      default: () => ''
    }
  },
  data() {
    return {
      formDiction: { name: '', description: '' },
      SontableData: [], // 字典字表的table数据
      Looklist: {}, // 点击查看子表的信息
      moveShow: false, // 删除弹框是否显示
      SonaddFormVisible: false, // 子字典新增页面是否显示
      SoneditFormVisible: false, // 子字典编辑页面是否显示
      multipleDel: [],
      ids: '', // 删除字典子表的id
      loading: false
    }
  },
  mounted() {
    this.getSonDiction()
  },
  methods: {
    // 根据根据字典主键查询字典子项信息列表初始化
    getSonDiction() {
      this.loading = true
      const param = {
        dictId: this.dictId,
        sortColumn: 'leve',
        sortOrder: 'asc'
      }
      dictConnSelect(param).then(response => {
        this.loading = false
        if (response.success === true) {
        //   this.SontableData = response.data.sysDictItems
          this.formDiction = response.data.sysDict
          this.SontableData = response.data.sysDictItems
        //   this.SontableData.unshift(response.data.sysDict)
        } else {
          this.$message.error(response.data)
        }
      }).catch(response => {
        this.$message.error(response.message)
      })
    },
    // // 根据字典名称精确查询字典子项信息-不分页-按level排序
    // getDiction() {
    //   const param = { dictName: this.formDiction.dictName, dictNameIsLike: '0', sortColumn: 'leve', sortOrder: 'asc' }
    //   dictConnSelect(param).then(response => {
    //     if (response.success === true) {
    //       this.SontableData = response.data
    //     } else {
    //       this.$message.error(response.data)
    //     }
    //   }).catch(response => {
    //     this.$message.error(response.message)
    //   })
    // },
    // 新增字典子表
    handleAdd() {
      this.SonaddFormVisible = true
    },
    // 取消新增界面
    Sonaddclose() {
      this.SonaddFormVisible = false
    },
    // 新增编辑之后刷新页面
    resGetSontable() {
      this.getSonDiction()
    },
    // 编辑字典子表
    handleEdit(index, row) {
      this.Looklist = row
      //   console.log('looklist', this.Looklist)
      //   console.log('parentname', this.parentName)
      this.SoneditFormVisible = true
    },
    // 取消字典子表
    Soneditclose() {
      this.SoneditFormVisible = false
    },
    // 批量删除字典子表
    handleSelectDel() {
      if (this.ids.length === 0) {
        this.$message.error('请至少选择一条数据')
      } else {
        this.moveShow = true
      }
    },
    // 删除字典字表
    handleDel(index, row) {
      this.ids = row.id
      this.moveShow = true
    },
    // 取消删除
    confireMsg(flag) {
      this.moveShow = flag
    },
    // 确认删除字典子表
    sureMsg(flag) {
      this.moveShow = flag
      const param = {
        ids: this.ids,
        flag: '0'
      }
      dictConnDel(param).then(response => {
        if (response.success === true) {
          this.getSonDiction()
          this.$message.success('删除字典子表成功')
        } else {
          this.$message.error(response.msg)
        }
      }).catch(response => {
        this.$message.error(response.message)
      })
    },

    // 选择字典子表要删除的项
    handleSelectionChange(val) {
      this.multipleDel = val
      const delId = []
      this.multipleDel.map(value => {
        delId.push(value.id)
      })
      //   console.log('userid', delId.join(','))
      this.ids = delId.join(',')
    },
    // 完成
    submitForm() {
      this.$emit('Lookclose')
    }
  }
}
</script>

<style lang="scss">
.DictionarysLook{
   .lookTop{
    //   height: 100px;
      padding-top:18px;
      margin-left:-4px;
      margin-bottom: -4px;
      .el-input__inner {
          height: 34px;
          width: 166px;
        }
        .el-form-item__label{
          color: #292929;
          font-family:"微软雅黑";
          font-weight:400;
        }
        .el-input--small .el-input__inner {
        background-color: transparent;
        font-family:"微软雅黑";
        font-weight:400;
        border:1px solid #D8DCE6;
        &:focus {
          border:1px solid #379EFC;
        }
      }
       .el-input--small.is-focus .el-input__inner {
        background-color: transparent;
        font-family:'微软雅黑';
        font-weight:400;
        border:1px solid rgba(80,220,245,1);
      }
      input::-webkit-input-placeholder {
        opacity: 0.5;
        font-size: 12px;
      }
      .el-textarea.is-disabled .el-textarea__inner {
          background-color: transparent;
          border:1px solid #D8DCE6;
          font-weight:400;
          height: 60px;
      }
   }
   .tablediction{
       .Look-tale{
           margin: 5px 20px;
       }
       .el-table{
            border-radius: 5px;
            border: 1px solid #379EFC;
            .cell{
                border-bottom:1px solid #379EFC
            }
            .el-table th>.cell{
                border: none
            }
       }
       .button-tool{
         margin-left: 20px;
         margin-top:-5px;
         margin-bottom: 5px
        // margin: -5px auto 5px auto
       }
       .scope-caozuo{
          margin-left: 12px;
          margin-right:8px;
          cursor: pointer;
       }
   }
   .dialog-footer{
       text-align: right;
       margin-top: 9px !important;
   }
   input::-webkit-input-placeholder {
      opacity: 0.5;
   }
   .el-textarea.el-input--medium .el-textarea__inner {
      height: 80px;
   }
   textarea::-webkit-input-placeholder {
      opacity: 0.5;
    }

}
    .newLookadd.el-dialog__wrapper .el-dialog{
        height: 325px!important;
    }
</style>
