<template>
  <div class="systems">
    <headers :post-name="postName" @getMores="getMores" />
    <stem v-if="searchData" :system-all="systemAll" :system-length="systemLength" @stopLength="stopLength" />
    <div v-else class="noData">
      暂无数据
    </div>
  </div>
</template>
<script>
import headers from './header'
import stem from './system/stem'
import { getMsgSystem } from '@/api/dashboard'
import { getTime } from '@/utils/time'
export default {
  name: 'System',
  components: { headers, stem },
  data() {
    return {
      postName: {
        msg: '系统公告',
        isRefersh: false,
        isToggle: false,
        isMore: true
      },
      systemAll: [],
      systemLength: 0,
      searchData: true
    }
  },
  activated() {
  },
  created() {
    this.getSystems()
  },
  methods: {
    getSystems() {
      var time = new Date().getTime() - 86400 * 7 * 1000
      const param = {
        typeL: '1100',
        ifpublic: '1',
        startDate: getTime(time)
      }
      getMsgSystem(param).then(res => {
        this.searchData = true
        this.systemAll = res.data.responses
        this.systemLength = this.systemAll.length
      }).catch(res => {
        this.searchData = false
      })
    },
    stopLength(val) {
      this.systemLength = val
    },
    getMores() {
      this.$router.push({ path: '/message/messageList' })
    }
  }
}
</script>
<style lang='scss' scoped>
.systems{
  height: 291px;
  .noData{
    align-items: center;
    display: flex;
    font-size: 14px;
    height: 249px;
    justify-content: center;
  }
}
</style>

