<template>
  <div v-loading="loading" class="UserManage-add">
    <el-steps :active="active" finish-status="success" simple>
      <el-step title="入库基本信息">
        <span slot="icon" class="icontext">1</span>
      </el-step>
      <el-step title="添加设备"><span slot="icon" class="icontext">2</span></el-step>
    </el-steps>
    <el-tabs v-model="activeName" stretch>
      <!--新建人员基本信息 :disabled="disabled"-->
      <el-tab-pane label="基本信息" name="0" :disabled="disabled">
        <div style="margin-top: 24px;">
          <el-form ref="addForm" :model="addForm" label-width="90px" :rules="addFormRules">
            <el-row>
              <el-col :span="12">
                <el-form-item label="入库类型:" prop="storageType">
                  <el-select v-model="addForm.storageType" popper-class="select-option" placeholder="-请选择入库类型-">
                    <el-option v-for="(item, index) in houseType" :key="index" :label="item.name" :value="item" />
                  </el-select>
                </el-form-item>
                <el-form-item label="操作人:" prop="operationP">
                  <el-input v-model="addForm.operationP" value="超级管理员" :disabled="true" placeholder="超级管理员" />
                </el-form-item>
                <el-form-item label="交付人:" prop="deliveryPer">
                  <el-input v-model="addForm.deliveryPer" placeholder="-请选择-" @focus="chooseDelivery"><i slot="suffix" class="el-input__icon el-icon-more" @click="chooseDelivery" /></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="备件来源:" prop="sourceParts" class="">
                  <el-select v-model="addForm.sourceParts" popper-class="select-option" placeholder="-请选择备件来源-">
                    <el-option v-for="(item, index) in sourceParts" :key="index" :label="item.name" :value="item" />
                  </el-select>
                </el-form-item>
                <el-form-item label="所属库房:" prop="Subwarehourse">
                  <el-select v-model="addForm.Subwarehourse" popper-class="select-option" placeholder="-请选择-" @change="chooseHourse($event)">
                    <el-option v-for="item in houseList" :key="item.id" :label="item.name" :value="item" />
                  </el-select>
                </el-form-item>
                <!-- <el-form-item label="所属库位:" prop="SubwareItemhourse">
                  <el-select v-model="addForm.SubwareItemhourse" popper-class="select-option" placeholder="-请选择-">
                    <el-option v-for="(item, index) in houseItemList" :key="index" :label="item.name" :value="item" />
                  </el-select>
                </el-form-item> -->
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="描述:" prop="remark">
                  <el-input v-model="addForm.remark" type="textarea" placeholder="请输入用户描述" />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <div class="dialog-footer">
            <el-button v-preventReClick="1000" size="small" class="button-sub butposi" @click.native="submitUserForm('addForm')">下一步</el-button>
          </div>
        </div>
      </el-tab-pane>
      <!--添加设备-->
      <el-tab-pane label="添加设备" name="1" :disabled="disabled">
        <div>
          <div class="button-tool fr" style="line-height:64px;">
            <el-button icon="iconfont icontianjia1" size="small" @click="chooseNewSupl">选择新增物资</el-button>
            <el-button icon="iconfont iconxingzhuang1 " size="small" @click="handleDelMore">删除</el-button>
          </div>
          <div>
            <el-table ref="multipRole" height="430" class="addShow" :data="tableDataEquip" @selection-change="handleEquipChange" @row-click="clicktable">
              <el-table-column type="selection" width="60" />
              <el-table-column type="index" label="序号" />
              <el-table-column prop="assetNo" label="物资编号" />
              <el-table-column prop="assetName" label="物资名称" />
              <el-table-column prop="itemType" label="物资分类" />
              <el-table-column prop="unitType" label="设备型号" />
              <el-table-column prop="itemType" label="所属库位">
                <template slot-scope="scope">
                  <el-select v-model="scope.row.hourseItemName">
                    <el-option v-for="item in houseItemList" :key="item.code" :label="item.name" :value="item.name" />
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column prop="price" label="设备价格">
                <template slot-scope="{ row, $index }">
                  <div @click.stop="{{changeNum($index)}}">
                    <el-input v-if="editable[$index]" v-model.number="row.price" type="text" min-length="1" onkeyup="this.value=this.value.replace(/[^\d.]/g,'');" @blur="loseFocus($index)">{{ row.price }}</el-input>
                    <span v-else>{{ row.price }}</span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="count" label="设备总数">
                <template slot-scope="{ row, $index }">
                  <div @click.stop="{{changeNum2($index)}}">
                    <el-input v-if="editable2[$index]" v-model.number="row.count" type="text" min-length="1" onkeyup="this.value=this.value.replace(/[^\d.]/g,'');" @blur="loseFocus2($index)">{{ row.count }}</el-input>
                    <span v-else>{{ row.count }}</span>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="fr">
            <el-pagination
              :page-size="pageSize"
              :page-sizes="[100]"
              layout="total,sizes,prev, pager, next, jumper"
              :total="totalCount"
              :pager-count="5"
              :current-page.sync="currentPage"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
            />
          </div>
          <div class="dialog-footer nextfooter butposi">
            <el-button v-preventReClick="1000" size="small" class="button-cancel" @click.native="prev(0)">上一步</el-button>
            <el-button v-preventReClick="1000" size="small" class="button-sub" @click.native="saveForm()">保存</el-button>
            <el-button v-preventReClick="1000" size="small" class="button-sub" @click.native="completeWare()">完成入库</el-button>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
    <!-- 物资选择 -->
    <el-dialog v-if="addSupleVisible" v-model="addSupleVisible" :append-to-body="true" title="选择物资" :close-on-click-modal="false" :visible.sync="addSupleVisible" width="45%">
      <chooseSupple ref="addSuple" @closeNewSupl="closeNewSupl" />
    </el-dialog>
    <!-- 人员查询选择 -->
    <el-dialog title="人员查询" :append-to-body="true" :close-on-click-modal="false" :visible.sync="showDelivery" width="40%">
      <choosePeople @closePeople="closePeople" />
    </el-dialog>
  </div>
</template>

<script>
import chooseSupple from './chooseSupple'
import choosePeople from './choosePeople'
import { getWarehouseById } from '@/api/warehourse.js'
import { saveWarehourse, complateWare } from '@/api/asstesManagement.js'
export default {
  components: { chooseSupple, choosePeople },
  props: {
    houseList: {
      type: Array,
      default: () => []
    },
    // 入库类型
    houseType: {
      type: Array,
      default: () => []
    },
    sourceParts: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      disabled: true, // tabs是否禁用
      activeName: 0, // tabs默认显示第一个用户基本信息
      active: 0,
      loading: false,
      addForm: { storageType: '', sourceParts: '', Subwarehourse: '', deliveryPer: '', remark: '', operationP: '超级管理员' },
      addFormRules: {
        storageType: [{ required: true, message: '请选择入库类型', trigger: ['blur'] }],
        operationP: [{ required: true }],
        sourceParts: [{ required: true, message: '请选择备件来源', trigger: 'blur' }],
        Subwarehourse: [{ required: true, message: '请选择所属库房', trigger: 'blur' }]
      },
      tableDataEquip: [], // 设备信息
      totalCount: 0, // 设备总条数
      pageSize: 10, // 设备每页几条
      pageNumber: 1, // 设备第几页
      currentPage: 1, // 设备直接跳到第几页
      multipRole: [], // 选择table角色表格的一条或多条数据
      addSupleVisible: false, // 展示物资对话框
      showDelivery: false, // 展示人员查询对话框
      deliveryPer: [{ name: '11', code: 12 }], // 交付人
      houseItemList: [],
      editable: [],
      editable2: [],
      warehourseId: '',
      operationP: '超级管理员',
      delEqip: [] // 要删除的设备
    }
  },
  created() {
  },
  mounted() {},
  methods: {
    // 展示选择交付人
    chooseDelivery() {
      this.showDelivery = true
    },
    // 库房选择
    chooseHourse(item) {
      this.addForm.Subwarehourse = item.name
      this.warehourseId = item.id
      // this.addForm.SubwareItemhourse = ''
      const params = {
        warehouseId: this.warehourseId
      }
      getWarehouseById(params).then((response) => {
        if (response.code === 0) {
          this.houseItemList = response.data
        }
      })
    },
    // 关闭选择交付人
    closePeople(params) {
      this.addForm.deliveryPer = params
      this.showDelivery = false
    },
    // 入库下一步
    submitUserForm(formParam) {
      this.$refs[formParam].validate((valid) => {
        if (valid) {
          this.activeName = '1'
          this.active = 1
        }
      })
    },
    // 点击单个单元格
    clicktable(row, event, column) {
    },
    // 编辑单个单元格
    changeNum(row) {
      this.editable[row] = true
      this.$set(this.editable, row, true)
    },
    loseFocus(row) {
      this.editable[row] = false
      this.$set(this.editable, row, false)
    },
    changeNum2(row) {
      this.editable2[row] = true
      this.$set(this.editable2, row, true)
    },
    loseFocus2(row) {
      this.editable2[row] = false
      this.$set(this.editable2, row, false)
    },
    // 展示新增物资
    chooseNewSupl() {
      this.addSupleVisible = true
    },
    // 关闭新增物资
    closeNewSupl(params) {
      for (var i = 0; i < params.length; i++) {
        params[i].count = 1
      }
      this.tableDataEquip = params
      this.addSupleVisible = false
    },
    // 选择设备
    handleEquipChange(params) {
      this.delEqip = params
      console.log(params)
    },
    // 批量删除
    handleDelMore() {
      this.tableDataEquip.forEach((item, j) => {
        for (var i = 0; i < this.delEqip.length; i++) {
          if (this.delEqip[i].assetNo === item.assetNo) {
            this.tableDataEquip.splice(j, 1)
          }
        }
      })
    },
    // 添加设备上一步
    prev(e) {
      this.activeName = e + ''
      this.active = e
    },
    Saveparams(status) {
      console.log(this.tableDataEquip)
      let ids = ''; let nums = ''; let prices = ''
      this.tableDataEquip.forEach((item, i) => {
        ids = ids + item.assetNo + ','
        nums = nums + item.count + ','
        prices = prices + item.price + ','
      })
      const params = {
        type: this.addForm.storageType.name,
        house: this.addForm.Subwarehourse,
        fromorgo: this.addForm.sourceParts.name,
        deliverer: this.addForm.deliveryPer,
        operator: '超级管理员',
        note: this.addForm.remark,
        houseId: this.warehourseId,
        status: status,
        no: '',
        ids: ids.substring(0, ids.length - 1),
        nums: nums.substring(0, nums.length - 1),
        prices: prices.substring(0, prices.length - 1)
      }
      return params
    },
    // 保存
    saveForm() {
      const params = this.Saveparams('待入库')
      saveWarehourse(params).then((response) => {
        if (response.code === 0) {
          console.log(response.data)
          this.$message.success('保存成功')
          this.$emit('closeAddMol')
        }
      })
    },
    // 完成入库
    completeWare() {
      const params = this.Saveparams('已入库')
      complateWare(params).then((response) => {
        if (response.code === 0) {
          this.$message.success('入库成功')
          this.$emit('closeAddMol')
        }
      })
    },
    // 分页
    handleSizeChange(val) {
      this.pageSize = val
      this.pageNumber = 1
      // this.getEquipList()
    },
    handleCurrentChange(val) {
      this.pageNumber = val
      // this.getEquipList()
    }
  }
}
</script>
<style lang="scss" scoped>
.el-col {
  padding: 0 60px;
}
.el-select {
  width: 100%;
}
.UserManage-add {
  >>>.el-input.is-disabled .el-input__inner{
    background-color: #fff;
    color: #49494b;
  }
  .el-steps--simple {
    height: 54px;
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
    .el-tabs__content{
      height: 600px;
      .butposi{
        position: absolute;
        bottom: 30px;
        right: 10px;
      }
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
}
</style>
