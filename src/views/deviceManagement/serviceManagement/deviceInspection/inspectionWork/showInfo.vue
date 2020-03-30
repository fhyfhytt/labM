<template>
  <div class="registion">
    <el-collapse v-model="activeNames" @change="handleChange">
      <div class="collapse show">
        <el-collapse-item name="1">
          <template slot="title">
            <i class="title-icon iconfont" :class="iconState.title1" />巡检信息
          </template>
          <el-form ref="form1" :model="conForm" size="small" label-width="120px">
            <el-row>
              <el-col :span="10">
                <el-form-item label="巡检时间：" prop="maintainTime">
                  <el-date-picker
                    v-model="conForm.maintainTime"
                    type="datetime"
                    format="yyyy-MM-dd hh:mm"
                    value-format="yyyy-MM-dd hh:mm"
                    placeholder="请选择巡检时间"
                    disabled
                    prefix-icon="iconfont iconrili"
                    style="width:100%;"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="10" :offset="1">
                <el-form-item label="巡检人：" prop="maintainPer">
                  <el-select v-model="conForm.maintainPer" disabled remote filterable popper-class="select-option" placeholder="请选择巡检人">
                    <el-option v-for="item in personList" :key="item.id" :value="item.id" :label="item.name" />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="10">
                <el-form-item label="巡检描述：" prop="maintainDesc">
                  <el-input v-model="conForm.maintainDesc" type="textarea" disabled placeholder="请输入巡检描述" />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-collapse-item>
      </div>
      <div class="collapse show uploadfile">
        <el-collapse-item name="2">
          <template slot="title">
            <i class="title-icon iconfont" :class="iconState.title2" />巡检附件
          </template>
          <el-tabs v-model="activeTab" @tab-click="handleClick">
            <el-tab-pane label="文档" name="first">
              <div v-for="item in docList" :key="item.id" class="file-upload-div">
                <div class="file-div">
                  <span class="iconfont iconwenjian icon-size" />
                </div>
                <div :title="item.appendixName" class="title-span">{{ item.appendixName }}</div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="图片" name="second">
              <div v-for="item in imageList" :key="item.id" class="file-upload-div">
                <div class="file-div">
                  <span class="iconfont icontupian icon-size" />
                </div>
                <div :title="item.appendixName" class="title-span">{{ item.appendixName }}</div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="视频" name="third">
              <div v-for="item in videoList" :key="item.id" class="file-upload-div">
                <div class="file-div">
                  <span class="iconfont iconshipin1 icon-size" />
                </div>
                <div :title="item.appendixName" class="title-span">{{ item.appendixName }}</div>
              </div>
            </el-tab-pane>
          </el-tabs>
        </el-collapse-item>
      </div>
    </el-collapse>
  </div>
</template>
<script>
import common from '@/utils/common'
import { selectDetail } from '@/api/projectManage'
export default {
  name: 'ShowInfo',
  components: { },
  props: {
    id: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      activeNames: ['1', '2'], // 默认展开第一个面板
      iconState: {
        title1: 'iconshouhui', // 基础信息  标题图标  默认展开状态
        title2: 'iconshouhui' // 巡检清单  标题图标  默认关闭状态
      },
      activeTab: 'first', // 附件上传的页签
      // 文档列表
      docList: [],
      // 图片列表
      imageList: [],
      // 视频列表
      videoList: [],
      // 巡检信息
      conForm: {
        maintainTime: '', // 巡检时间
        maintainPer: this.$store.getters.name, // 巡检人
        maintainDesc: '' // 巡检描述
      },
      // 巡检人 下拉框
      personList: [],
      unitIds: [],
      titleName: '' // 添加明细 弹框的标题
    }
  },
  mounted() {
    this.getPersonList()
    this.selectDetail()
  },
  methods: {
    // 责任人下拉列表查询
    getPersonList() {
      var unitSelect = this.$store.state.dashord.allData.unitSelect
      unitSelect.forEach(item => {
        if (item.other === '4') {
          this.unitIds.push(item.code)
        }
      })
      const param = {
        ids: this.unitIds
      }
      common.selectPrincipalPer(param).then(res => {
        if (res.success) {
          this.personList = res.data
        }
      }).catch(res => {
        this.$message({
          showClose: true,
          message: res.msg,
          type: 'error'
        })
      })
    },
    // 根据id查询清单详情
    selectDetail() {
      const param = {
        id: this.id
      }
      selectDetail(param).then(res => {
        if (res.success) {
          this.conForm = res.data
          // 附件信息
          if (res.data.appendixList !== '' || res.data.appendixList !== null) {
            this.docList = []
            this.imageList = []
            this.videoList = []
            if (res.data.appendixList.length > 0) {
              res.data.appendixList.forEach(item => {
                if (item.type === '0') {
                  this.docList.push(item)
                }
                if (item.type === '1') {
                  this.imageList.push(item)
                }
                if (item.type === '2') {
                  this.videoList.push(item)
                }
              })
            }
          }
        } else {
          this.$message({
            showClose: true,
            message: res.msg,
            type: 'error'
          })
        }
      }).catch(res => {
        this.$message({
          showClose: true,
          message: res.msg,
          type: 'error'
        })
      })
    },
    handleChange(val) {
      if (val.indexOf('1') === -1) {
        this.iconState.title1 = 'iconxiala1'
      } else {
        this.iconState.title1 = 'iconshouhui'
      }
      if (val.indexOf('2') === -1) {
        this.iconState.title2 = 'iconxiala1'
      } else {
        this.iconState.title2 = 'iconshouhui'
      }
    },
    handleClick(tab, event) {
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~@/styles/registion.scss";
.collapse {
    >>> .el-textarea__inner {
        width: 506px !important;
    }
}
// 附件上传  tab页签样式
  .uploadfile{
    >>> .el-tabs__active-bar {
      background-color: #00EEEE;
    }
    >>> .el-tabs__item {
      padding: 0 20px;
      height: 40px;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      line-height: 32px;
      display: inline-block;
      list-style: none;
      font-size: 14px;
      font-weight: 500;
      color: #fff;
      position: relative;
      &.is-active {
        color: #00EEEE;
      }
    }
    >>> .el-tabs__nav-wrap {
      overflow: hidden;
      margin-bottom: -1px;
      position: relative;
      padding-left: 15px;
      &::after {
        height: 1px;
        background-color: rgba(83,227,253,0.5);;
      }
    }
    >>> .el-tabs__content {
      padding: 10px 0 0 15px;
    }
    >>> .el-collapse-item__content {
      padding-bottom: 25px;
      font-size: 14px;
      color: #fff;
      line-height: 24px;
    }
    .icon-size {
      font-size: 22px;
      position: relative;
      left: 14px;
      top: 13px;
      color: #00EEEE;
    }
    .upload-div {
      display: inline-block;
      background-color: rgba(0,0,0,0.1);
      width: 50px;
      height: 50px;
      border-radius: 4px;
      border: 1px dashed #50dcf5;
      cursor: pointer;
      &:hover {
        transform: scale(1.1);
      }
    }
    .file-upload-div {
      width: 90px;
      display: inline-block;
      .file-div {
        display: inline-block;
        position: relative;
        left: 15px;
        margin-right: 10px;
        background-color: rgba(0,0,0,0.1);
        width: 50px;
        height: 50px;
        border-radius: 4px;
      }
      .title-span {
        font-size: 12px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        width: 80px;
        text-align: center;
        cursor: pointer;
        &:hover {
          color: #50DCF5;
        }
      }
    }
    .close-span {
      position: absolute;
      left: 37px;
      top: -3px;
      font-size: 10px;
      color: #00EEEE;
      cursor: pointer;
      &:hover {
        transform: scale(1.1);
        color: #ffffff;
      }
    }
  }
</style>
