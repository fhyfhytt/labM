<template>
  <div class="page-table-content">
    <el-row>
      <el-form ref="form1" :model="chooseSupply" size="small" label-width="110px">
        <el-col :xl="{span:8}" :lg="{span:6}">
          <el-form-item label="关键字">
            <el-input v-model="chooseSupply.keyword" auto-complete="off" placeholder="请输入查询关键字" />
          </el-form-item>
        </el-col>
        <el-col :xl="{span:10}" :lg="{span:6}">
          <el-form-item label="资产分类：">
            <treeselect
              v-model="chooseSupply.AssetsClass"
              :limit="limit"
              :limit-text="limitText"
              :multiple="true"
              :options="treedata"
              :normalizer="normalizer"
              :no-results-text="noResultsText"
              :value-consists-of="valueConsistsOf"
              placeholder="点击选择资产"
            />
          </el-form-item>
        </el-col>
        <el-col :xl="{span:5}" :lg="{span:6}" style="margin-left: 24px">
          <el-button v-preventReClick="1000" class="button-sub" @click="getSupplyList()">查询</el-button>
        </el-col>
      </el-form>
      <el-col>
        <el-table ref="suplyData" :data="suplyData" height="568" @row-click="selectRow" @selection-change="handleSelectRow">
          <el-table-column type="selection" width="60" />
          <el-table-column type="index" label="编号" />
          <el-table-column prop="assetNo" label="物资编号" />
          <el-table-column prop="assetName" label="物资名称" />
          <el-table-column prop="itemType" label="物资分类" />
          <el-table-column prop="unitType" label="物资型号" />
          <el-table-column prop="factory" label="厂商" />
        </el-table>
      </el-col>
      <el-col :xl="{span:12}" :lg="{span:6}" class="fr" style="margin:10px 30px 0 0 ">
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
        <el-button v-preventReClick="1000" class="button-sub fr" @click="confirmSupply()">确认</el-button>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { classifyTree } from '@/api/classify.js'
import { setTreeData } from '@/utils/utils.js'
import { getSupplies } from '@/api/deviceManage.js'
export default {
  data: () => ({
    value: null,
    treedata: [],
    normalizer(node) {
      return {
        id: node.id,
        label: node.name,
        children: node.children
      }
    },
    chooseSupply: {
      type: '',
      AssetsClass: null
    },
    suplyData: [], // 物资数据
    // 分页数据
    pageSize: 10,
    totalCount: 0,
    pageNumber: 1,
    currentPage: 1,
    valueConsistsOf: 'ALL',
    noResultsText: '无数据',
    limitText: count => `以及 ${count} 个资产`,
    limit: 3,
    chooseSupplyData: []
  }),
  created() {},
  mounted() {
    // 查询分类结构树
    this.getClassifyTree()
    // 查询数据
    this.getSupplyList()
  },
  methods: {
    getClassifyTree() {
      classifyTree().then((response) => {
        if (response.code === 0) {
          this.$nextTick(() => {
            this.treedata = setTreeData(response.data).slice(2, 3)
          })
        } else {
          this.$message.error(response.msg)
        }
      })
    },
    // 查询物资
    getSupplyList() {
      let itemType
      if (this.chooseSupply.AssetsClass && this.chooseSupply.AssetsClass.length > 0) {
        itemType = this.chooseSupply.AssetsClass
      } else {
        itemType = ''
      }
      const params = {
        code: '',
        pageSize: this.pageSize,
        pageNum: this.pageNumber,
        itemType: itemType
      }
      getSupplies(params).then((response) => {
        if (response.code === 0) {
          this.suplyData = response.data.assetList
          this.totalCount = response.data.count
        }
      })
    },
    // 单击行数据
    selectRow(row, event, colomn) {
    },
    handleSelectRow(params) {
      this.chooseSupplyData = params
    },
    // 确认
    confirmSupply() {
      this.$emit('closeNewSupl', this.chooseSupplyData)
    },
    // 分页
    handleSizeChange(val) {
      this.pageSize = val
      this.pageNumber = 1
      this.getSupplyList()
    },
    handleCurrentChange(val) {
      this.pageNumber = val
      this.getSupplyList()
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
