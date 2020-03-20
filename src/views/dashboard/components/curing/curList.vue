<template>
  <div class="curList">
    <li v-for="(item,index) in cur" :key="index">
      <!-- <span class="name" :style="bgColor(item.type_s)" v-html="nameCheck(item.type_s)" />
      <span></span>
      <span class="memo"><span class="yeColor">{{ item.topic }}</span> {{ item.memo }}</span> -->
      <!-- <span class="memo">{{ item.memo }}</span> -->
      <span class="time">{{ item.time }}</span>
    </li>
  </div>
</template>
<script>
// export default {
//   name: 'CurList',
//   props: {
//     cur: {
//       type: Array,
//       default:()=>[]
//     }
//   },
//   data() {
//     return {
//       curList: [{ 'memo': '1号隧道计划于2019年10月31日进行养护，请相关人员做好准备。', 'time': '2019-10-26 14:00' },
//         { 'memo': '1号隧道计划于2019年10月31日进行养护，请相关人员做好准备。', 'time': '2019-10-26 14:00' },
//         { 'memo': '1号隧道计划于2019年10月31日进行养护，请相关人员做好准备。', 'time': '2019-10-26 14:00' },
//         { 'memo': '1号隧道计划于2019年10月31日进行养护，请相关人员做好准备。', 'time': '2019-10-26 14:00' },
//         { 'memo': '1号隧道计划于2019年10月31日进行养护，请相关人员做好准备。', 'time': '2019-10-26 14:00' },
//         { 'memo': '1号隧道计划于2019年10月31日进行养护，请相关人员做好准备。', 'time': '2019-10-26 14:00' },
//         { 'memo': '1号隧道计划于2019年10月31日进行养护，请相关人员做好准备。', 'time': '2019-10-26 14:00' },
//         { 'memo': '1号隧道计划于2019年10月31日进行养护，请相关人员做好准备。', 'time': '2019-10-26 14:00' }]
//     }
//   },
//   activated() {
//   },
//   methods:{
//      bgColor(name) {
//       var backColor = ''
//       if (name === '1201') {
//         backColor = '#f27360'
//       } else if (name === '1102') {
//         backColor = '#27a9e3'
//       } else if (name === '1103') {
//         backColor = '#ffb84a'
//       } else if (name === '1101') {
//         backColor = '#4fd8be'
//       }
//       return 'background:' + backColor
//     },
//     nameCheck(name) {
//       if (name === '1201') {
//         return '新闻'
//       } else if (name === '1102') {
//         return '运行'
//       } else if (name === '1103') {
//         return '通知'
//       } else if (name === '1101') {
//         return '更新'
//       }
//     }
//   }
// }
// </script>
// <style lang='scss' scoped>
//     .curList{
//         li{
//             height: 18px;
//             line-height: 18px;
//             margin: 8px 0 8px  16px;
//             .time{
//                 width: 120px;
//                 margin-right: 16px;
//                 display: inline-block;
//                 float: right;
//             }
//             .memo{
//                 text-overflow: ellipsis;
//                 overflow: hidden;
//                 white-space: nowrap;
//                 word-break: break-all;
//                 display: inline-block;
//                 width: 75%;
//             }
//         }
//     }
// </style>
