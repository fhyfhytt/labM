<template>
  <el-row v-loading="bigloading" class="pageRow sendContent">
    <el-form ref="ruleForm" :model="ruleForm" label-width="140px" :rules="rules" class="sendMsg" label-position="right">
      <el-row>
        <el-col>
          <el-form-item label="通知标题 : " prop="topic" class="mgItem">
            <el-input v-model="ruleForm.topic" class="tpc" placeholder="请输入通知标题" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :xl="{span:8}" :lg="{span:12}">
          <el-form-item label="发布人 : " prop="sendPeople" class="mgItem">
            <el-input v-model="ruleForm.sendPeople" class="shortInput tpc" placeholder="请输入发布人" disabled />
          </el-form-item>
          <el-form-item label="通知类型 : " prop="typeL">
            <el-select v-model="ruleForm.typeL" value-key="code" placeholder="请选择" popper-class="select-option">
              <el-option v-for="(item,index) in typeLs" :key="index" :label="item.name" :value="item" />
            </el-select>
          </el-form-item>
          <el-form-item label="发送组织 : " prop="organ">
            <treeselect
              v-model="ruleForm.organ"
              :limit="limit"
              :limit-text="limitText"
              :multiple="true"
              :value-consists-of="valueConsistsOf"
              :no-results-text="noResultsText"
              :allow-selecting-disabled-descendants="true"
              :options="organTree"
              placeholder="点击选择组织"
              :normalizer="normalizer"
            />
          </el-form-item>
          <el-form-item label="是否为个人消息 :" prop="isPerson" class="mgItem">
            <el-switch
              v-model="ruleForm.isPerson"
              active-color="#379EFC"
              inactive-color="#C0C4CC"
            /></el-form-item>
        </el-col>
        <el-col :xl="{span:8,push:8}" :lg="{span:12}">
          <el-form-item label="生效时间 : " prop="endMsgTime" class="mgItem">
            <el-date-picker v-model="ruleForm.endMsgTime" type="datetime" placeholder="请选择生效时间" prefix-icon="iconfont iconrili" value-format="yyyy-MM-dd HH:mm:ss" />
          </el-form-item>
          <el-form-item label="编辑时间 : " prop="startMsgTime" class="mgItem">
            <el-date-picker v-model="ruleForm.startMsgTime" type="datetime" placeholder="请选择编辑时间" prefix-icon="iconfont iconrili" value-format="yyyy-MM-dd HH:mm:ss" />
          </el-form-item>
          <el-form-item label="系统分类 : " prop="typeS" class="typeTime">
            <el-select v-model="ruleForm.typeS" placeholder="请选择" value-key="code" popper-class="select-option" class="nextSelect">
              <el-option v-for="(item,index) in typeSs" :key="index" :label="item.name" :value="item" />
            </el-select>
          </el-form-item>
          <el-form-item label="发布平台 :" prop="pubWay" class="mgItem">
            <el-radio v-model="ruleForm.pubWay" label="0">PC</el-radio>
            <el-radio v-model="ruleForm.pubWay" label="1">APP</el-radio>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>

        <el-form-item label="通知内容 : ">
          <vue-html5-editor :content="content" :height="500" :z-index="1000" :auto-height="true" :show-module-name="false" @change="updateData" />

        </el-form-item>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="图片上传 : " class="typeTime">
            <el-upload
              class="upload-img"
              drag
              :show-file-list="false"
              :before-upload="beforeImgUpload"
              :headers="headers"
              :on-error="handleError"
              :on-success="handleImgSuccess"
              :disabled="disabled"
              :action="baseURL"
              :data="imgData"
              :accept="'image/*'"
            >
              <div v-if="!tip" class="mask" @click.stop="hindleRemove"><i class="iconfont iconxingzhuang1" /></div>
              <i v-if="!imgurl" :class="iconclass" />
              <div v-if="!imgurl" class="el-upload__text">将图片拖到此处，或<em>点击上传</em></div>
              <img v-if="imgurl" width="100%" :src="imgurl" class="avatar" alt="">
              <!-- <div v-if="!tip" slot="tip" class="el-upload__tip2" @click="hindleRemove">点击删除</div> -->
              <div v-if="tip" slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </el-form-item>
          <el-form-item label="文件上传 : " class="typeTime">
            <el-upload
              ref="uploadFile"
              class="upload-file"
              :action="baseURL"
              :before-upload="beforeFileUpload"
              :headers="headers"
              :on-error="handleError"
              :on-success="handlefileSuccess"
              :on-remove="onRemoveTxt"
              :data="fileData"
              :show-file-list="show"
              :file-list="fileList"
              :on-exceed="handleExceed"
              :limit="5"
              multiple
            >
              <el-button size="small" class="filebtn" type="primary">选择文件</el-button>
              <div slot="tip" class="el-upload__tip">文件大小不能超过10MB</div>

            </el-upload>
          </el-form-item>
        </el-col>
      </el-row>

      <div class="btnSubmit">
        <div class="sendAllBtn">
          <el-button v-preventReClick="1000" size="small" class="button-sub" @click="submits(0,'ruleForm')">保存</el-button>
          <el-button v-preventReClick="1000" size="small" class="button-sub" @click="submits(1,'ruleForm')">保存并发布</el-button>
          <el-button size="small" class="button-cancle" @click="closeTab">退出</el-button>
        </div>
      </div>
    </el-form>
  </el-row>
</template>
<script>
import { getOrgTreeNew } from '@/api/userManagement'
import { setTreeData, url2obj } from '@/utils/utils'
import { removeFJ, addMsg, getContent } from '@/api/message'
// import Quill from 'quill'
import common from '@/utils/common'
export default {
  name: 'SendMsg',
  data() {
    return {
      ruleForm: {
        topic: '',
        typeL: '',
        typeS: '',
        appendixImgId: '',
        organ: null,
        sendPeople: this.$store.getters.name, // 发布人
        startMsgTime: '',
        endMsgTime: '',
        appendixIdName: [], // 文件对象
        isPerson: false,
        pubWay: '0'
      },
      rules: {
        topic: [
          { required: true, message: '请输入标题', trigger: 'blur' }
        ],
        typeL: [
          { required: true, message: '请选择通知类型', trigger: ['blur', 'change'] }
        ],
        typeS: [
          { required: true, message: '请选择系统类型', trigger: ['blur', 'change'] }
        ],
        sendPeople: [
          { required: true, message: '请输入发布人', trigger: 'blur' }
        ],
        startMsgTime: [
          { type: 'string', required: true, message: '请选择开始日期', trigger: 'blur' }
        ],
        endMsgTime: [
          { type: 'string', required: true, message: '请选择结束时间', trigger: 'blur' }
        ],
        organ: [
          { required: true, message: '请选择组织', trigger: ['blur', 'change'] }
        ]
      },
      limitText: count => `以及 ${count} 个组织部门`,
      limit: 1,
      tip: true,
      msId: '',
      iconclass: 'el-icon-upload',
      noResultsText: '无数据',
      valueConsistsOf: 'ALL',
      typeLs: [], // 通知分类
      typeSs: [], // 系统分类
      imgurl: '', // 图片预览
      loading: false,
      bigloading: false,
      baseURL: this.GLOBAL.BASE_URL + '/common/uploadFile',
      imgData: {
        type: 1,
        attCode: 600
      },

      fileData: {
        type: [0, 2],
        attCode: 100
      },
      headers: {
        'Authorization': this.$store.state.user.token
      },
      disabled: false,
      listType: [],
      show: true,
      fileList: [], // 文件列表
      organTree: [], // 组织数据
      content: '', // 编辑器内容
      customToolbar: [

      ]

    }
  },
  watch: {
    'ruleForm.organ': function(newvalue, oldvalue) {
      if (newvalue !== '') {
        this.$refs.ruleForm.clearValidate('organ')
      }
    }
  },
  created() {
    getOrgTreeNew().then(res => {
      if (res.code === 0) {
        this.$nextTick(() => {
          this.organTree = setTreeData(res.data)
        })
      } else {
        this.$message.error(res.msg)
      }
    })
    common.getDictNameList({ dictCode: 'msg_type', dictNameIsLike: 0 }).then(res => {
      if (res.success === true) {
        this.$nextTick(() => {
          this.typeLs = res.data
        })
      }
    }).catch(res => {
      this.$message.error(res.msg)
    })
    common.getDictNameList({ dictCode: 'msg_category', dictNameIsLike: 0 }).then(res => {
      if (res.success === true) {
        this.$nextTick(() => {
          this.typeSs = res.data
        })
      }
    }).catch(res => {
      this.$message.error(res.msg)
    })
  },
  mounted() {
    var queryId = this.$route.query.id
    if (queryId) {
      this.getAll(queryId)
    }
  },
  methods: {
    submits(state, formName) {
      var publishTime = new Date(this.ruleForm.startMsgTime.replace(/-/g, '/'))
      var invalidTime = new Date(this.ruleForm.endMsgTime.replace(/-/g, '/'))
      var dateDiff = invalidTime.getTime() - publishTime.getTime()
      if (dateDiff < 0) {
        this.$message.error('生效时间要大于编辑时间!')
        return
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.bigloading = true
          const param = {
            'state': state,
            'typeLDict': this.ruleForm.typeL,
            'typeSDict': this.ruleForm.typeS,
            'topic': this.ruleForm.topic,
            'memo': this.content,
            'publishPer': this.ruleForm.sendPeople,
            'invalidTime': this.ruleForm.endMsgTime,
            'publishTime': this.ruleForm.startMsgTime,
            'pubWay': '0',
            'isPerson': this.ruleForm.isPerson,
            'appendixIdName': this.ruleForm.appendixIdName,
            'appendixImgId': this.ruleForm.appendixImgId,
            'organ': this.ruleForm.organ
          }
          param.msId = this.msId
          addMsg(param).then(res => {
            this.bigloading = false
            if (res.success) {
              if (state === 0) {
                this.$message({
                  type: 'success',
                  message: '保存成功！'
                })
              } else {
                this.$message({
                  type: 'success',
                  message: '发布成功！'
                })
              }
              this.ruleForm.topic = ''
              this.ruleForm.typeL = ''
              this.ruleForm.typeS = ''
              this.ruleForm.sendPeople = this.$store.getters.name
              this.ruleForm.startMsgTime = ''
              this.ruleForm.endMsgTime = ''
              this.ruleForm.appendixIdName = ''
              this.appendixId = ''
              this.content = ''
              this.ruleForm.organ = null
              this.imgurl = ''
              this.tip = true
              this.$refs.uploadFile.clearFiles()
              this.$store.dispatch('dashord/imgIdPath', '')
              this.$nextTick(() => {
                this.$refs.ruleForm.clearValidate()
              })
            }
          }).catch(res => {
            this.bigloading = false
            this.$message.error(res.msg)
          })
        } else {
          this.$message.error('请填写必填项')
          return false
        }
      })
    },

    // 草稿详情
    getAll(id) {
      getContent(id).then(res => {
        var msgSys = res.data.msgSys
        this.ruleForm.topic = msgSys.topic
        this.ruleForm.sendPeople = msgSys.createPer
        this.ruleForm.startMsgTime = msgSys.publishTime
        this.ruleForm.endMsgTime = msgSys.invalidTime
        this.content = msgSys.memo
        this.msId = msgSys.msId
        this.ruleForm.organ = res.data.organ
        this.ruleForm.typeL = { code: msgSys.typeL }
        this.ruleForm.typeS = { code: msgSys.typeS }
        if (msgSys.appendixId !== '') {
          var appendixIdArr = msgSys.appendixId.split(',')
          var appendixNameArr = msgSys.appendixName.split(',')
          var appendixPathArr = msgSys.appendixPath.split(',')
          appendixIdArr.map((item, index) => {
            this.ruleForm.appendixIdName.push({ name: appendixNameArr[index], path: url2obj(appendixPathArr[index]).path, id: item })
            this.fileList.push({ name: appendixNameArr[index], path: appendixPathArr[index].path, id: item })
            return { id: item, name: appendixNameArr[index], url: appendixPathArr[index] }
          })
        }
        if (msgSys.appendixImgId !== '') {
          this.tip = false
          this.disabled = true
          this.ruleForm.appendixImgId = msgSys.appendixImgId
          this.imgurl = msgSys.appendixImgPath
        }
      }).catch(res => {
        console.log(res)
        this.$message.error(res.msg)
      })
    },
    // 图片成功回调
    handleImgSuccess(res, file) {
      if (res.code === 0) {
        this.disabled = true
        this.$message.success('上传成功')
        this.iconclass = 'el-icon-upload'
        this.ruleForm.appendixImgId = res.data.id
        this.$store.dispatch('dashord/imgIdPath', { id: res.data.id })
        this.tip = false
        this.imgurl = URL.createObjectURL(file.raw)
      } else if (res.code === 10003) {
        this.$message.error(res.msg)
        this.$store.dispatch('user/logout')
      } else {
        this.$message.error(res.msg)
      }
    },
    handlefileSuccess(res, file, fileList) {
      if (res.code === 0) {
        this.ruleForm.appendixIdName.push({ name: res.data.appendixName, path: res.data.appendixPath, id: res.data.id })
        var fileIds = this.ruleForm.appendixIdName.map(item => {
          return item.id
        })
        this.$store.dispatch('dashord/fjIdPath', { id: fileIds })
        this.$message.success('上传成功')
      } else if (res.code === 10003) {
        this.$message.error(res.msg)
        this.$store.dispatch('user/logout')
      } else {
        this.$message.error(res.msg)
      }
    }, beforeImgUpload(file) {
      const isImage = file.type.includes('image')
      if (!isImage) {
        this.$message.error('上传文件类型必须是图片!')
      }
      const isLt2M = file.size / 1024 / 1024 < 1
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 1MB!')
      }
      this.iconclass = 'el-icon-loading'
      return isImage && isLt2M
    }, beforeFileUpload(file) {
      return new Promise((resolve, reject) => {
        var sameFileName = false
        this.ruleForm.appendixIdName.forEach((item, index) => {
          if (item.name === file.name) {
            sameFileName = true
          }
        })
        if (sameFileName) {
          return reject(false)
        }
        var fileName = file.name
        this.autoUpload = true
        const mimeTypes = {
          '.pdf': 'application/pdf',
          '.txt': 'text/plain',
          '.wav': 'audio/x-wav',
          '.wma': 'audio/x-ms-wma',
          '.wmv': 'video/x-ms-wmv',
          '.xml': 'text/xml',
          '.avi ': 'video/x-msvideo',
          '.xls': 'application/vnd.ms-excel',
          '.xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        }
        var extendName = fileName.substring(fileName.lastIndexOf('.')).toLowerCase()
        var isFile = mimeTypes[extendName] === file.type
        if (!isFile) {
          this.$message.error('上传文件类型不符合要求!')
        }
        const isLt2M = file.size / 1024 / 1024 < 10
        if (!isLt2M) {
          this.$message.error('上传文件大小不能超过10MB!')
        }
        if (isFile && isLt2M) {
          return resolve(true)
        } else {
          return reject(false)
        }
      })
    }, closeTab() {
      const vistedRouer = this.$store.state.tagsView.visitedViews
      if (this.appendixId) {
        const param = {
          'id': this.appendixId,
          'appendixPath': this.appendixPath
        }
        removeFJ(param).then(res => {
          if (res.success) {
            return
          }
        }).catch(res => {
          this.$message.error(res.msg)
        })
      }
      if (this.appendixImgId) {
        const param = {
          'id': this.ruleForm.appendixImgId,
          'appendixPath': this.ruleForm.appendixImgPath
        }
        removeFJ(param).then(res => {
          if (res.success) {
            this.$message.success('上传图片已删除')
          }
        }).catch(res => {
          this.$message.error(res.msg)
        })
        this.ruleForm.appendixIdName.map(item => {
          removeFJ(item).then(res => {
            if (res.success) {
              this.$message.success('上传附件已删除')
            }
          }).catch(res => {
            this.$message.error(res.msg)
          })
        })
      }
      common.closeCurrentTab(vistedRouer, this.$route)
    }, handleError(e) {
      console.log(e)
      const img = e.srcElement
      this.$message.error('上传失败')
      img.onerror = null
    }, normalizer(node, instanceId) {
      node.label = node.name
      return node
    }, hindleRemove() {
      const param = {
        'id': this.ruleForm.appendixImgId,
        'appendixPath': this.ruleForm.appendixImgPath
      }
      removeFJ(param).then(res => {
        if (res.success) {
          this.disabled = false
          this.$message.success('上传图片已删除')
          this.tip = true
          this.imgurl = ''
        }
      }).catch(res => {
        this.$message.error(res.msg)
      })
    }, handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 5 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    onRemoveTxt(file, fileList) {
      if (file.response === undefined && fileList.length > 0) {
        var sameFile = fileList.filter(item => {
          return file.name === item.name
        })
        if (sameFile.length > 0) {
          return this.$message.warning('文件名称重复')
        } else {
          return
        }
      } else {
        removeFJ({ id: file.response.data.id, appendixPath: file.response.data.appendixPath }).then(res => {
          if (res.success) {
            this.ruleForm.appendixIdName = fileList.map(item => {
              return { name: item.response.data.appendixName, path: item.response.data.appendixPath, id: item.response.data.id }
            })
            this.$message.success('上传附件已删除')
          }
        }).catch(res => {
          this.$message.error(res.msg)
        })
      }
    }, updateData(e) {
      this.content = e
    }
  }

}

</script>
<style lang='scss' scoped>
.el-loading-mask{
  height: 100vh;
}
@import '~@/styles/btn.scss';

.note-placeholder {
  color: #ccc;
}

@import '~@/styles/message/sendMsg.scss';

</style>
