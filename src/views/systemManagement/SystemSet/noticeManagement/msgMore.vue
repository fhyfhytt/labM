<template>
  <div class="msgMore">
    <h3 class="topic">{{ allList.topic }}</h3>
    <p class="nameTime"><span>发布人：{{ allList.publishPer }}</span><span>时间：{{ time }}</span></p>
    <div class="msgContent" v-html="allList.memo" />
    <div v-if="true" class="msgFj">
      <div class="fj">附件：</div>
      <div class="fl">
        <ul>
          <li v-for="(item,index) in fileList" :key="index"><span class="fjName">{{ item.name }}</span>
            <i class="iconfont iconchakan- btn" title="预览" @click="lookFile(index)" />
            <i class="iconfont iconxiazai- btn" title="下载" @click="downFile(index)" />

          </li>
        </ul>
      </div>
      <form v-show="false" />
    </div>
    <a v-show="false" id="downFile" />
  </div>
</template>
<script>
import { getContent } from '@/api/message'
// import axios from 'axios'
export default {
  name: 'MessageMore',
  data() {
    return {
      allList: {},
      mslistSAD: {},
      showFj: false,
      time: '',
      downFileUrl: '',
      downFileName: '',
      nameLength: 0,
      fileList: []
    }
  },
  activated() {
  },
  mounted() {
    var queryId = this.$route.query.id
    this.getAll(queryId)
  },
  methods: {
    getAll(id) {
      getContent(id).then(res => {
        this.allList = res.data.msgSys
        if (this.allList.appendixId !== '') {
          var appendixIdArr = this.allList.appendixId.split(',')
          var appendixNameArr = this.allList.appendixName.split(',')
          var appendixPathArr = this.allList.appendixPath.split(',')
          var fileList = appendixIdArr.map((item, index) => {
            return { id: item, name: appendixNameArr[index], url: appendixPathArr[index] }
          })
          this.fileList = fileList
          console.log(this.fileList)
          this.showFj = true
        }
        this.time = this.allList.createTime
      }).catch(res => {
        this.$message.error(res.msg)
      })
    },
    lookFile(e) {
      this.$confirm('确定需要打开外部链接么?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$router.push({ path: '/systemManagement/SystemSet/docView', query: { url: 'http://view.xdocin.com/xdoc?_xdoc=' + this.fileList[e].url }})
      }).catch(() => {
      })
    },
    downFile(e) {
      const param = {
        'appendixName': this.fileList[e].name,
        'appendixPath': this.fileList[e].url
      }
      // fetch(this.GLOBAL.BASE_URL + '/common/downloadFile', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization': this.$store.state.user.token
      //   },
      //   body: JSON.stringify(param)
      // })
      //   .then(res =>{

      //   })
      // .then(data => {
      //   // const blobUrl = window.URL.createObjectURL(data)
      //   // this.download(blobUrl, e)
      // })
      this.download(param.appendixPath, e)
    },
    download(blobUrl, index) {
      const a = document.getElementById('downFile')
      var fileName = this.fileList[index].name
      var extendName = fileName
      // .substring(fileName.lastIndexOf('.')).toLowerCase()
      a.download = extendName
      a.href = blobUrl
      a.click()
    }
  }
}
</script>
<style lang='scss' scoped>
.msgMore {
  background: #fff;
  padding: 0 50px;
  height: calc(100vh - 140px);
  margin-bottom: 16px;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 4px;
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
  p,
  ul {
    margin: 0;
    padding: 0;
  }
  font-size: 14px;
  font-family: '微软雅黑';
  color: #292929;
  margin: 16px 16px;
  border-radius: 8px;
  // height: 765px;
  .topic {
    font-size: 32px;
    text-align: center;
    margin-top: 60px;
  }
  .nameTime {
    text-align: center;
    font-size: 12px;
    color: rgba(255, 255, 255, 0.5);
    margin: 12px auto 32px;
    color: #292929;
    & > span {
      margin: 0 6px;
    }
  }
  .msgContent {
    padding: 0 50px;
    height: 560px;
    overflow: auto;
    &::-webkit-scrollbar {
      display: none;
    }
  }
  .msgFj {
    margin: 25px 0 0 32px;
    .fj {
      margin-left: 6px;
      float: left;
      // line-height: 32px;
      margin-right: 30px;
    }
    .fjName {
      color: #379efc;
      margin-right: 30px;
      max-width: 300px;
      text-overflow: ellipsis;
      white-space: nowrap;
      display: inline-block;
      overflow: hidden;
    }
    li{
      margin-bottom: 10px;
    }
    .btn {
      margin-right: 13px;
      cursor: pointer;
      color: #379efc;
      &:hover {
        color: #8ac7ff;
      }
    }
  }
}
</style>
