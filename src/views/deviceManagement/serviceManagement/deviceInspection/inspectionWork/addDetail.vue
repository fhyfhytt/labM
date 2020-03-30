<template>
  <div class="registion">
    <el-collapse v-model="activeNames" @change="handleChange">
      <div class="collapse show">
        <el-collapse-item name="1">
          <template slot="title">
            <i class="title-icon iconfont" :class="iconState.title1" />巡检信息
          </template>
          <el-form ref="form1" :model="conForm" :rules="rules1" size="small" label-width="120px">
            <el-row>
              <el-col :span="10">
                <el-form-item label="巡检时间：" prop="maintainTime">
                  <el-date-picker
                    v-model="conForm.maintainTime"
                    type="datetime"
                    format="yyyy-MM-dd hh:mm"
                    value-format="yyyy-MM-dd hh:mm"
                    placeholder="请选择巡检时间"
                    prefix-icon="iconfont iconrili"
                    style="width:100%;"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="10" :offset="1">
                <el-form-item label="巡检人：" prop="maintainPer">
                  <el-select v-model="conForm.maintainPer" filterable remote reserve-keyword popper-class="select-option" placeholder="请选择责任人">
                    <el-option v-for="item in personList" :key="item.id" :value="item.id" :label="item.name" />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="10">
                <el-form-item label="巡检描述：" prop="maintainDesc" :rules="filter_rules({maxLength:100, name: '巡检描述'})">
                  <el-input v-model="conForm.maintainDesc" type="textarea" placeholder="请输入巡检描述" />
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
                  <span class="iconfont iconguanbi1 close-span" @click="delAppendInfo(item)" />
                  <span class="iconfont iconwenjian icon-size" />
                </div>
                <div :title="item.appendixName" class="title-span" @click="downFile(item)">{{ item.appendixName }}</div>
              </div>
              <div class="file-upload-div" style="padding-left:15px;">
                <div class="upload-div" @click="wodUpload">
                  <span class="iconfont iconjia1 icon-size" />
                </div>
                <div class="title-span" style="color:#00eeee;margin-left:-16px;">上传文档</div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="图片" name="second">
              <div v-for="item in imageList" :key="item.id" class="file-upload-div">
                <div class="file-div">
                  <span class="iconfont iconguanbi1 close-span" @click="delAppendInfo(item)" />
                  <span class="iconfont icontupian icon-size" />
                </div>
                <div :title="item.appendixName" class="title-span" @click="downFile(item)">{{ item.appendixName }}</div>
              </div>
              <div class="file-upload-div" style="padding-left:15px;">
                <div class="upload-div" @click="imgUpload">
                  <span class="iconfont iconjia1 icon-size" />
                </div>
                <div class="title-span" style="color:#00eeee;margin-left:-16px;">上传图片</div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="视频" name="third">
              <div v-for="item in videoList" :key="item.id" class="file-upload-div">
                <div class="file-div">
                  <span class="iconfont iconguanbi1 close-span" @click="delAppendInfo(item)" />
                  <span class="iconfont iconshipin1 icon-size" />
                </div>
                <div :title="item.appendixName" class="title-span" @click="downFile(item)">{{ item.appendixName }}</div>
              </div>
              <div class="file-upload-div" style="padding-left:15px;">
                <div class="upload-div" @click="videoUpload">
                  <span class="iconfont iconjia1 icon-size" />
                </div>
                <div class="title-span" style="color:#00eeee;margin-left:-16px;">上传视频</div>
              </div>
            </el-tab-pane>
          </el-tabs>
        </el-collapse-item>
      </div>
      <input id="uploadWod" type="file" style="display:none" accept=".xlsx,.xls,.docx" @change="getWodChange">
      <input id="uploadImg" type="file" style="display:none" accept=".jpg,.jpeg,.png,.bmp" @change="getImgChange">
      <input id="uploadVideo" type="file" style="display:none" accept=".avi,.mp4" @change="getVideoChange">
      <a v-show="false" id="downFiles" />
    </el-collapse>
    <div class="submit-div">
      <el-button v-preventReClick class="button-sub" size="small" @click.prevent="onSubmit">提交</el-button>
      <el-button class="button-cancle" size="small" @click="addFormclose">取消</el-button>
    </div>
  </div>
</template>
<script>
import common from '@/utils/common'
import { updateDetail, selectDetail } from '@/api/projectManage'
export default {
  name: 'AddDetail',
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
        id: this.id,
        maintainTime: '', // 巡检时间
        maintainPer: '', // 巡检人
        maintainDesc: '' // 巡检描述
      },
      // 巡检人 下拉框
      personList: [],
      unitIds: [],
      titleName: '', // 添加明细 弹框的标题
      rules1: {
        maintainTime: [{ required: true, message: '请选择巡检时间', trigger: 'change' }],
        maintainPer: [{ required: true, message: '请选择巡检人', trigger: 'change' }]
      }
    }
  },
  mounted() {
    this.getPersonList()
    this.selectDetail()
  },
  methods: {
    // 根据id查询清单详情
    selectDetail() {
      const param = {
        id: this.id
      }
      selectDetail(param).then(res => {
        if (res.success) {
          this.conForm = res.data
          if (this.conForm.maintainPer === '') {
            this.conForm.maintainPer = this.$store.getters.name
          }
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
    // 取消
    addFormclose() {
      this.$emit('addclose')
    },
    // 提交按钮事件
    onSubmit() {
      this.$refs['form1'].validate((valid) => {
        if (valid) {
          if (this.judgeLength(this.conForm)) {
            updateDetail(this.conForm).then(res => {
              if (res.success) {
                this.$message({
                  showClose: true,
                  message: res.msg,
                  type: 'success'
                })
                this.addFormclose()
              }
            }).catch(res => {
              this.$message({
                showClose: true,
                message: res.msg,
                type: 'error'
              })
            })
          }
        }
      })
    },
    // 判断文本框字符串的长度  以及桩号格式
    judgeLength(param) {
      if (param.maintainDesc.length >= 100) {
        this.$message({
          showClose: true,
          message: '巡检描述的长度不能大于100',
          type: 'error'
        })
        return false
      }
      return true
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
    },
    // 文件下载
    downFile(item) {
      const param = {
        'appendixName': item.appendixName,
        'appendixPath': item.appendixPath
      }
      fetch(this.$store.state.user.baseUrl + '/common/downloadFile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': this.$store.state.user.token
        },
        body: JSON.stringify(param)
      })
        .then(res => res.blob())
        .then(data => {
          const blobUrl = window.URL.createObjectURL(data)
          this.download(blobUrl, item.appendixName)
        })
    },
    download(blobUrl, name) {
      const a = document.getElementById('downFiles')
      a.download = name
      a.href = blobUrl
      a.click()
    },
    // 附件删除
    delAppendInfo(item) {
      const param = {
        id: item.id,
        appendixPath: item.appendixPath
      }
      common.removeFJ(param).then(res => {
        if (res.success) {
          this.$message({
            showClose: true,
            message: res.msg,
            type: 'success'
          })
          if (item.type === '0') {
            this.docList.forEach((obj, index) => {
              if (obj.id === item.id) {
                this.docList.splice(index, 1)
              }
            })
          }
          if (item.type === '1') {
            this.imageList.forEach((obj, index) => {
              if (obj.id === item.id) {
                this.imageList.splice(index, 1)
              }
            })
          }
          if (item.type === '2') {
            this.videoList.forEach((obj, index) => {
              if (obj.id === item.id) {
                this.videoList.splice(index, 1)
              }
            })
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
      }
      )
    },
    // 文档上传
    wodUpload() {
      $('#uploadWod').click()
    },
    getWodChange() {
      this.worldChange($('#uploadWod'), '0')
    },
    // 图片上传
    imgUpload() {
      $('#uploadImg').click()
    },
    getImgChange() {
      this.worldChange($('#uploadImg'), '1')
    },
    // 视频上传
    videoUpload() {
      $('#uploadVideo').click()
    },
    getVideoChange() {
      this.worldChange($('#uploadVideo'), '2')
    },
    worldChange(targets, type) {
      var files = targets[0].files[0] // 获取文件信息
      var myform = new FormData()
      var fileName = targets[0].files[0].name
      var extendName = fileName.substring(fileName.lastIndexOf('.') + 1)

      if (type === '0') {
        if (!(extendName === 'xlsx' || extendName === 'docx' || extendName === 'xls')) {
          this.$message.error('请上传文档附件（格式为xlsx,docx,xls）')
          return
        }
      } else if (type === '1') {
        if (!(extendName === 'jpg' || extendName === 'jpeg' || extendName === 'png' || extendName === 'bmp')) {
          this.$message.error('请上传图片附件（格式为jpg,jpeg,png,bmp）')
          return
        }
      } else {
        if (!(extendName === 'avi' || extendName === 'mp4')) {
          this.$message.error('请上传视频附件（格式为avi,mp4）')
          return
        }
      }

      var newName = files.name
      // var newName = files.name.substring(0, files.name.lastIndexOf('.')) + '_' + this.conForm.id + files.name.substring(files.name.lastIndexOf('.'))
      var renameReportFile = new Blob([files])
      myform.append('file', renameReportFile, newName)
      myform.append('attCode', '600')// 所在文件夹
      myform.append('type', type) //   1图片 0文档 2视频
      myform.append('connType', '600')
      myform.append('connId', this.conForm.id)

      common.subFJ(myform).then(res => {
        if (res.success) {
          this.docList = []
          this.imageList = []
          this.videoList = []
          if (res.data !== '' || res.data !== null) {
            res.data.forEach(item => {
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
        } else {
          this.$message({
            showClose: true,
            message: res.msg,
            type: 'error'
          })
        }
      }).catch(res => {
        this.$message.error(res.msg)
      })
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
