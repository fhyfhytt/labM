<template>
  <div class="pageRow">
    <el-row>
      <!-- 左侧列表 -->
      <el-col :xl="{span:3}" :lg="{span:5}">
        <div class="warehourse">
          <div class="cangku">
            <i class="iconfont iconcangku" style="color: #36A1FE" />
            仓库
          </div>
          <div class="search-hourse">
            <input v-model.trim="inputContent" type="text" name="" class="search-input" @focus="focus" @blur="blur">
            <i class="iconfont iconsousuo1 hoursesousuo" @click="searchWarehourse()" />
          </div>
          <div class="kufanglist">
            <div v-for="(data,index) in wareHourseList" :key="index" :class="{bg: index === isActive}" class="hourser-list" @click="changeList(index)">
              <i class="iconfont iconcangku" style="color: #FFCA25" />
              <span>{{ data.name }}</span>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :xl="{span:21}" :lg="{span:19}" class="right-page">
        <div class="rightTop">
          <input v-model.trim="searchHourseItem" type="text" name="" class="rightInput" style="border: none" @focus="focus1" @blur="blur1">
          <i class="iconfont iconsousuo1 posisousuo" @click="searchHourse()" />
          <i class="iconfont iconxinzeng iconStyle" @click="showAddBounced()" />
          <i class="iconfont iconStyle" @click="importHourse()">&#xe6b2;</i>
          <i class="iconfont iconxingzhuang1 iconStyleDel" @click="deleteWareHourse(checkHourseItem)" />
        </div>
        <div class="content">
          <div v-for="(item,index) in hourseInfo" :key="index" class="flip-container">
            <div class="flipper">
              <div class="front" @mouseover="ShowBounced(index)">
                <img :src="item.defaultImg">
              </div>
              <!-- 库房点击详情弹框 -->
              <ItemBounced v-if="index===showbouncedItx" class="back" :hourseitem="showNowhourse" @deleteWare="deleteWareHourse" />
            </div>
            <el-checkbox-group v-model="checkHourseItem" class="checkbox">
              <el-checkbox :key="item.id" v-model="item.id" :checked="item.checked" class="checkscolor" :class="{checkcolor: index === showbouncedItx}" :label="'编号：'+item.code" :disabled="item.disabled" />
            </el-checkbox-group>
          </div>
        </div>
        <footer class="footer">
          <el-pagination
            :current-page="currentPage"
            :page-sizes="[10, 20, 30, 40, 50]"
            :page-size="100"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            @current-change="handleCurrentChange"
          />
        </footer>
      </el-col>
    </el-row>
    <el-dialog v-if="showFormAdd" v-model="showFormAdd" title="库位新增" :close-on-click-modal="false" :visible.sync="showFormAdd" class="deviceAdd addmanage">
      <addMoudel @updateWarehourse="updateWarehourse" @formVisible="cancelupdate" />
    </el-dialog>
  </div>
</template>

<script>
import { editWarehourse, deleteWarehourse, getWarehouseList, getAllWarehouse } from '@/api/warehourse'
import allware from '@/assets/img/warehourse/allware.png'
import fullware from '@/assets/img/warehourse/fullware.png'
import halfware from '@/assets/img/warehourse/halfware.png'
import addMoudel from './components/addMoudel.vue'
import ItemBounced from './components/itemBounced'
export default {
  components: {
    addMoudel,
    ItemBounced
  },
  data() {
    return {
      inputContent: '',
      hourseInfo: [], // 库位列表
      wareHourseList: [], // 库房列表
      showNowhourse: '', // 当前展示的库位
      searchHourseItem: '', // 需要搜索的库位
      total: 0,
      currentPage: 1,
      isActive: 0,
      showbouncedItx: -1,
      showFormAdd: false,
      defaultImg: '',
      checkHourseItem: [],
      checked: '',
      listParam: {
        warehouseId: '',
        name: '',
        code: '',
        pageSize: 10,
        pageNumber: this.currentPage,
        sortColumn: '',
        sortOrder: ''
      },
      wareHourseParam: {
        sortColumn: 'create_time',
        sortOrder: 'desc',
        name: ''
      } // 库房参数
    }
  },
  created() {
  },
  mounted() {
    // 查询库房列表
    this.getwarehouseList()
    // 查询库位列表
    this.getList()
  },
  methods: {
    // 展示新增弹框
    showAddBounced() {
      this.showFormAdd = true
    },
    // 展示每一项弹框
    ShowBounced(index) {
      this.showNowhourse = this.hourseInfo[index]
      this.showbouncedItx = index
    },
    // 查询库房列表
    getwarehouseList() {
      getAllWarehouse(this.wareHourseParam).then(response => {
        if (response.code === 0) {
          this.wareHourseList = response.data
        }
      })
    },
    // 查询库位列表
    getList() {
      getWarehouseList(this.listParam).then(response => {
        if (response.success === true) {
          this.total = Number(response.data.totalNum)
          this.hourseInfo = response.data.list
          for (var i = 0; i < this.hourseInfo.length; i++) {
            // 80%以上红色,20-80黄色,小于20绿色
            if (parseInt(this.hourseInfo[i].rate) < 20) {
              this.hourseInfo[i].defaultImg = allware
              this.hourseInfo[i].disabled = false
            } else if (parseInt(this.hourseInfo[i].rate) <= 80) {
              this.hourseInfo[i].defaultImg = halfware
              this.hourseInfo[i].disabled = true
            } else {
              this.hourseInfo[i].defaultImg = fullware
              this.hourseInfo[i].disabled = true
            }
          }
        } else {
          return
        }
      }).catch((e) => {
        console.log(e)
      })
    },
    // 删除库房
    deleteWareHourse(id) {
      if (!id.toString()) {
        this.$confirm('请选择要删除的库位', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        return
      } else {
        this.$confirm('是否确定删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const param = {
            ids: id.toString()
          }
          deleteWarehourse(param).then(response => {
            if (response.code === 0) {
              this.$message({
                type: 'success',
                message: '删除成功'
              })
              this.getList()
            }
          }).catch((e) => {
            console.log(e)
          })
        }).catch(() => {
        })
      }
    },
    // 新增/修改
    updateWarehourse(param) {
      const params = {
        id: '',
        name: param.name,
        code: param.code,
        site: param.position,
        comment: param.memo,
        warehouseId: this.listParam.warehouseId,
        volume: param.volume,
        weight: param.weight
      }
      editWarehourse(params).then(response => {
        if (response.code === 0) {
          this.showFormAdd = false
          this.getList()
        } else {
          alert(response.msg)
        }
      }).catch((e) => {
        console.log(e)
      })
    },
    // 隐藏弹框
    cancelupdate() {
      this.showFormAdd = false
    },
    // 导入
    importHourse() {},
    // 搜索库房
    searchWarehourse() {
      if (!this.inputContent) {
        this.$alert('请输入要查询的仓库名称', '提示', {
          confirmButtonText: '确定'
        })
      } else {
        this.wareHourseParam.name = this.inputContent
        this.getwarehouseList()
      }
    },
    // 搜索库位
    searchHourse() {
      if (!this.searchHourseItem) {
        this.$alert('请输入要查询的库位名称', '提示', {
          confirmButtonText: '确定'
        })
      } else {
        this.listParam.name = this.searchHourseItem
        this.getList()
      }
    },
    handleCurrentChange(val) {
      this.listParam.pageNumber = val
      this.getList()
    },
    // 聚焦时修改输入框按钮样式
    focus() {
      $('.hoursesousuo').css('color', '#379EFC')
    },
    blur() {
      $('.hoursesousuo').css('color', '#C8C9D2')
    },
    focus1() {
      $('.posisousuo').css('color', '#fff')
      $('.posisousuo').css('background', '#389DFA')
    },
    blur1() {
      $('.posisousuo').css('color', '#5D99D9')
      $('.posisousuo').css('background', '#E7F3FF')
    },
    // 点击左侧list
    changeList(index) {
      const _this = this
      _this.listParam.warehouseId = _this.wareHourseList[index].id
      _this.getList()
      _this.isActive = index
    }
  }
}
</script>
<style lang="scss" scoped>
  @import '~@/styles/mixin.scss';
  @import '~@/styles/variables.scss';
  .warehourse{
    background: #fff;
    height: 100%;
    text-align: center;
    padding-top: 10px;
    .cangku{
      float: left;
      padding-left: 20px;
    }
    .search-hourse{
      position: relative;
      padding: 10px 0;
      display: inline-block;
      width: 100%;
      .search-input{
        height: 30px;
        width: 85%;
        border-radius: 20px;
        padding: 10px;
        padding-right: 30px;
        border: none;
        background: #F1F2F6;
        outline: none;
      }
      .hoursesousuo{
        color: #C1CEE0;
        position: absolute;
        right: 20px;
        top: 16px;
        cursor: pointer;
        &:hover{
          color: #379EFC!important;
        }
      }
    }
    .kufanglist{
      overflow: hidden;
      overflow-y: auto;
      height: 100%;
      .hourser-list{
        text-align: left;
        padding-left: 20px;
        height: 40px;
        line-height: 40px;
        &.bg{
          background: #EBF5FF;
          border-right: 4px solid #379EFC;
        }
      }
      &::-webkit-scrollbar{
        width: 4px;
        background: #8C8B8E;
      }
    }
  }
  .rightTop{
    position: absolute;
    right: 0;
    .rightInput{
      width: 324px;
      height: 40px;
      border-radius: 20px;
      padding: 0 30px 0 10px;
      outline: none;
    }
    .iconStyle{
      color:#fff;
      background: #39A0FF;
      border-radius: 10px;
      padding: 6px;
      box-shadow:0px 2px 10px 0px rgba(214,215,222,1);
      cursor: pointer;
      &:hover{
        background: #fff;
        color: #379EFC;
      }
    }
    .iconStyleDel{
      color: #4F95D4;
      background: #fff;
      border-radius: 10px;
      padding: 6px;
      box-shadow:0px 2px 10px 0px rgba(214,215,222,1);
      cursor: pointer;
      &:hover{
        background: #379EFC;
        color: #fff;
      }
    }
    .posisousuo{
      position: absolute;
      right: 100px;
      top: 4px;
      color: #5D99D9;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: #E7F3FF;
      text-align: center;
      padding: 7px;
      cursor: pointer;
      &:hover{
        background: #389DFA!important;
        color: #fff!important;
      }
    }
  }
  .content{
    margin: 30px 0;
    overflow: hidden;
    overflow-y: scroll;
    width: 100%;
    height: 100%;
  }
  .footer{
    bottom: 0;
    right: 0;
    position: absolute;
  }
.flip-container {
  display: inline-block;
  margin: 10px 0 0 20px;
  position: relative;
  width: 23%;
  height: 28%;
  .checkbox{
    margin-top: 17px;
    .checkscolor{
      color: #B8B9BD;
    }
    .checkcolor{
      color: #2A2A2C;
    }
  }
}
.flip-container:hover .flipper, .flip-container.hover .flipper {
	transform: rotateY(-180deg);
}
.flipper {
	transition: 0.6s;
	transform-style: preserve-3d;
	position: relative;
  height: 100%;
  .front, .back {
    backface-visibility: hidden;
    width: 75%;
    height: 95%;
    display: inline-block;
    img{
      width: 100%;
      height: 100%;
    }
  }
  .back {
    transform: rotateY(-180deg);
  }
}

</style>
