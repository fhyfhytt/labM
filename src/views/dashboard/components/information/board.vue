<template>
  <div class="board">
    <el-table
      :data="tableData"
    >
      <el-table-column
        prop="type"
        label=""
        width="60"
      >
        <template slot-scope="scope">
          <!-- <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button> -->
          <div v-if="scope.row.type==='131'" style="background:#ff6668" class="iconDiv">
            <span class="iconfont icont-qingbaoban" />
          </div>

          <div v-else-if="scope.row.type==='132'" style="background:#4fd8be" class="iconDiv">
            <span class="iconfont icont-qingbaobanT" />
          </div>

          <div v-else style="background:#fab045" class="iconDiv">
            <span class="iconfont icont-qingbaobanF" />
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="roadStandard"
        label="路段"
        width="60"
        show-overflow-tooltip
      />
      <el-table-column
        prop="mileageDirection"
        label="桩号"
        width="100"
        show-overflow-tooltip
      />
      <el-table-column
        prop="contents"
        label="内容"
      />
      <el-table-column
        label="操作"
        width="45"
        prop="id"
      >
        <template slot-scope="scope">
          <!--   -->
          <!-- <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button> -->
          <span class="iconfont iconchakan" @click="goToBoard(scope.row)" />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  props: {
    tableData: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {

    }
  },
  methods: {
    goToBoard(row) {
      const querys = {
        boardId: row.id,
        name: row.tunName,
        flag: true,
        id: row.tunId,
        standard_code: row.standard_code
      }
      this.$router.push({ path: '/tunnelControl/tunnelTree/' + row.id, query: querys })
    }
  }
}
// :show-overflow-tooltip="true"
</script>

<style lang='scss'>
    .board{.el-table{
        /* 表格字体颜色 */
        color:white;
        background-color: transparent;
        /* 表格边框颜色 */
        /* border: 0.5px solid #758a99; */
        height: 608px;
        }
        /* 表格内背景颜色 */
        .el-table th, .el-table tr,.el-table td{
        border: 0;
        background-color: transparent;
        // padding: 0 4px;
        text-align: center;
        }
        /* 双数行背景颜色 */
        .el-table--striped .el-table__body tr.el-table__row--striped td {
        // background-color:#fff;
        // background-color: rgba(148, 144, 144, 0.3)
        }
        /* 使表格背景透明 */
        .el-table th, .el-table tr {
            background-color: transparent;
        }
        /* 删除表格下横线 */
        .el-table::before {
        left: 0;
        bottom: 0;
        width: 100%;
        height: 0px;
        }
        /* 表格表头字体颜色 */
        .el-table thead {
        color: white;
        font-weight: 500;
        background-color: transparent;
        }
        .el-table th:hover, .el-table tr:hover,.el-table--enable-row-hover .el-table__body tr:hover>td {
            background-color: transparent;
        }
        .el-table .cell{
            padding: 0 4px;
            white-space: nowrap;
            font-size: 12px;
            height: 36px;
            line-height: 36px;
            .iconchakan{
                color: #5B92FF;
            }
        }
         .el-table--medium td{
            padding: 9px 0;
        }
        .el-table--medium th{
            padding: 16px 0 0;
        }
        .iconDiv{
            width: 36px;
            height: 36px;
            border-radius: 50%;
            overflow: hidden;
            margin: auto;
            .iconfont{
                font-size: 18px;
            }
        }
        .el-table__empty-text{
          line-height: 60px;
          margin: 250px auto;
          width: 50%;
          color: #fff;
          font-size: 20px;
        }
        .iconchakan{
          cursor: pointer;
        }
    }
    .el-tooltip__popper.is-dark{
      margin-top: 25px;
    }
</style>
