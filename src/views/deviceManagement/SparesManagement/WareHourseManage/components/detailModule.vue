<template>
  <div class="page-table-content">
    <el-row>
      <el-col :xl="{span:8}" :lg="{span:6}" class="bind-title">基本信息</el-col>
    </el-row>
    <el-row>
      <el-col :xl="{span:8}" :lg="{span:6}">
        <p class="itemp">入库单编号: <span>{{ itemWareHourse.no }}</span></p>
      </el-col>
      <el-col :xl="{span:8}" :lg="{span:6}">
        <p class="itemp">入库单时间: <span>{{ itemWareHourse.gmtCreate }}</span> </p>
      </el-col>
      <el-col :xl="{span:8}" :lg="{span:6}">
        <p class="itemp">入库单类型: <span>{{ itemWareHourse.type }}</span> </p>
      </el-col>
    </el-row>
    <el-row>
      <el-col :xl="{span:8}" :lg="{span:6}">
        <p>备件来源: <span>{{ itemWareHourse.fromorgo }}</span></p>
      </el-col>
      <el-col :xl="{span:8}" :lg="{span:6}">
        <p>所属库房: <span>{{ itemWareHourse.house }}</span> </p>
      </el-col>
      <el-col :xl="{span:8}" :lg="{span:6}">
        <p>支付人: <span>{{ itemWareHourse.deliverer }}</span> </p>
      </el-col>
    </el-row>
    <el-row>
      <el-col :xl="{span:8}" :lg="{span:6}">
        <p>所属区域: <span>{{ itemWareHourse.area }}</span></p>
      </el-col>
      <el-col :xl="{span:8}" :lg="{span:6}">
        <p>设备总数: <span>{{ itemWareHourse.num }}</span> </p>
      </el-col>
      <el-col :xl="{span:8}" :lg="{span:6}">
        <p>操作人: <span>超级管理员</span> </p>
      </el-col>
    </el-row>
    <el-row>
      <el-col :xl="{span:8}" :lg="{span:6}">
        <p>备注: <span>{{ itemWareHourse.note }}</span></p>
      </el-col>
    </el-row>
    <el-row>
      <el-col :xl="{span:8}" :lg="{span:6}" class="bind-title">资产列表</el-col>
      <el-table ref="assetsList" :data="assetsData" :height="320">
        <el-table-column type="index" label="" />
        <el-table-column prop="assetNo" label="物资编码" />
        <el-table-column prop="assetName" label="物资名称" />
        <el-table-column prop="itemType" label="物资分类" />
        <el-table-column type="status" label="物资状态" />
        <el-table-column prop="unitType" label="设备型号" />
        <el-table-column prop="factory" label="生产厂商" />
        <el-table-column prop="checkStatus" label="审核状态" />
        <el-table-column prop="num" label="数量" />
      </el-table>
      <div class="fr">
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
    </el-row>
  </div>
</template>
<script>
import { getWarehourseByNo } from '@/api/asstesManagement.js'
export default {
  props: {
    itemWareHourse: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      totalCount: 0,
      pageSize: 10,
      pageNumber: 1,
      currentPage: 1,
      assetsData: []
    }
  },
  mounted() {
    this.getWarehourseList()
  },
  methods: {
    getWarehourseList() {
      const params = {
        page: this.pageNumber,
        limit: this.pageSize,
        no: this.itemWareHourse.no
      }
      getWarehourseByNo(params).then((response) => {
        if (response.code === 0) {
          this.assetsData = response.data
          this.totalCount = response.count
        } else {
          this.$message.error(response.msg)
        }
      })
    },
    // 分页
    handleSizeChange(val) {
      this.pageSize = val
      this.pageNumber = 1
      this.getWarehourseList()
    },
    handleCurrentChange(val) {
      this.pageNumber = val
      this.getWarehourseList()
    }
  }
}
</script>
<style lang="scss" scoped>
    .page-table-content{
        margin: 10px 20px 0 50px;
        position: relative;
        .bind-title{
          font-size: 16px;
          color: #292929;
          border-left: 4px solid #379EFC;
          padding-left: 8px;
          margin: 10px 0;
        }
        >>>.el-table .cell{
            height: 40px;
            line-height: 40px;
        }
    }
</style>
