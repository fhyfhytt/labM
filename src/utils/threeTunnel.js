// 根据后台传的设备type 返回三维里的设备类型
export function handleDeviceType(type) {
  switch (type) {
    case '110':
      return 'CDZSD'
    case '120':
      return 'SKBXHD'
    case '132':
      return 'SDQBB'
    case '131':
      return 'MJSQBB'
    case '133':
      return 'XBSQBB'
    case '140':
      return 'XSQBB'
    case '150':
      return 'QT'
    case '160':
      return 'WBCJY'
    case '213':
      return 'GGD'
    case '214':
      return 'DG'
    case '215':
      return 'SDD1'
    case '216':
      return 'SDD2'
    case '321':
      return 'SDHJBJP'
    case '410':
      return 'LABA'
    case '420':
      return 'SDNUJDH'
    case '510':
      return 'GDSXJ'
    case '610':
      return 'QYKZQ'
    case '711':
      return 'FENGJI'
    case '712':
      return 'FENGJI'
    default:
  }
}
export function handleDeviceState(type, value) {
  switch (type) {
    case '110':
    // 车道指示灯
      if (value[0] && value[0].devCurState === '1') {
        switch (value[0].laneIndicatorVal) {
          // 正绿正红反绿反红
          case '015':
            return ['7', '9']
          case '014':
            // 正红反绿反红
            return ['3', '9']
          case '013':
            // 正绿反绿反红
            return ['2', '9']
          case '012':
            // 正绿正红反红
            return ['7', '5']
          case '011':
            // 正绿正红反绿
            return ['7', '4']
          case '010':
            // 反绿反红
            return ['6', '9']
          case '009':
            // 正绿正红
            return ['7', '8']
          case '008':
            // 反红
            return ['6', '5']
          case '007':
            // 反绿
            return ['6', '4']
          case '006':
            // 正红
            return ['3', '8']
          case '005':
            // 正绿
            return ['2', '8']
          case '004':
            // 正绿反红
            return ['2', '5']
          case '003':
            // 正红反绿
            return ['3', '4']
          case '002':
            // 正绿反绿
            return ['2', '4']
          case '001':
            // 正红反红
            return ['3', '5']
          default:
            // 默认 正绿反红
            return ['6', '8']
        }
      } else if (value[0] && value[0].devCurState === '2') {
        switch (value[0].laneIndicatorVal) {
          case '015':
            return ['7', '9', '0']
          case '014':
            // 正红反绿反红
            return ['3', '9', '0']
          case '013':
            // 正绿反绿反红
            return ['2', '9', '0']
          case '012':
            // 正绿正红反红
            return ['7', '5', '0']
          case '011':
            // 正绿正红反绿
            return ['7', '4', '0']
          case '010':
            // 反绿反红
            return ['6', '9', '0']
          case '009':
            // 正绿正红
            return ['7', '8', '0']
          case '008':
            // 反红
            return ['6', '5', '0']
          case '007':
            // 反绿
            return ['6', '4', '0']
          case '006':
            // 正红
            return ['3', '8', '0']
          case '005':
            // 正绿
            return ['2', '8', '0']
          case '004':
            return ['2', '5', '0']
          case '003':
            return ['3', '4', '0']
          case '002':
            return ['2', '4', '0']
          case '001':
            return ['3', '5', '0']
          default:
            return ['6', '8', '0']
        }
      } else {
        return ['6', '8']
      }
    case '120':
      // 四可变
      var flag = '1'
      if (value[0] && value[0].devCurState === '1') {
        flag = '1'
        flag += value[0].boultLightVal ? '1' : '0'
        flag += value[0].greenLightVal ? '1' : '0'
        flag += value[0].yellowLightVal ? '1' : '0'
        flag += value[0].redLightVal ? '1' : '0'
        return [flag]
      } else if (value[0] && value[0].devCurState === '2') {
        flag = '0'
        flag += value[0].boultLightVal ? '1' : '0'
        flag += value[0].greenLightVal ? '1' : '0'
        flag += value[0].yellowLightVal ? '1' : '0'
        flag += value[0].redLightVal ? '1' : '0'
        return [flag]
      } else {
        return ['1']
      }
    case '132':
      // 隧道内情报板
      if (value[0] && value[0].devCurState === '1') {
        return ['1']
      } else if (value[0] && value[0].devCurState === '2') {
        return ['0']
      } else {
        return ['1']
      }
    case '131':
      // 门架式情报板
      if (value[0] && value[0].devCurState === '1') {
        return ['1']
      } else if (value[0] && value[0].devCurState === '2') {
        return ['0']
      } else {
        return ['1']
      }
    case '133':
      // 悬臂式情报板
      if (value[0] && value[0].devCurState === '1') {
        return ['1']
      } else if (value[0] && value[0].devCurState === '2') {
        return ['0']
      } else {
        return ['1']
      }
    case '140':
      if (value[0] && value[0].devCurState === '1') {
        switch (value[0].itemVal) {
          case '30':
            return ['130']
          case '40':
            return ['140']
          case '50':
            return ['150']
          case '60':
            return ['160']
          case '80':
            return ['180']
          case '100':
            return ['1100']
          case '120':
            return ['1120']
          default:
            return ['100']
        }
      } else if (value[0] && value[0].devCurState === '2') {
        switch (value[0].itemVal) {
          case '30':
            return ['130', '0']
          case '40':
            return ['140', '0']
          case '50':
            return ['150', '0']
          case '60':
            return ['160', '0']
          case '80':
            return ['180', '0']
          case '100':
            return ['1100', '0']
          case '120':
            return ['1120', '0']
          default:
            return ['100', '0']
        }
      } else {
        return ['100']
      }
    case '150':
      // 汽通卷帘门
      var sum = 0
      if (value && value.length > 0) {
        for (let i = 0; i < value.length; i++) {
          if (value[i].doorCloseState && value[i].doorCloseState === 'true') {
            return ['1', '4']
          }
          if (value[i].doorOpenState && value[i].doorOpenState === 'true') {
            return ['2', '5']
          }
          if (value[i].doorCloseState && value[i].doorCloseState === 'false') {
            sum = sum + 1
          }
          if (value[i].doorOpenState && value[i].doorOpenState === 'false') {
            sum = sum + 1
          }
        }
        if (sum === 2) {
          return ['1', '4', '0']
        } else {
          return ['1', '4']
        }
      } else {
        return ['1', '4']
      }
    case '160':
      return 'WBCJY'
    case '213':
      // 高杆灯
      if (value[0] && (value[0].devCurState === '1' || value[0].devCurState === '3')) {
        switch (value[0].itemVal) {
          case '0':
            return ['2']
          case '1':
            return ['1']
          default:
            return ['2']
        }
      } else if (value[0] && value[0].devCurState === '2') {
        switch (value[0].itemVal) {
          case '0':
            return ['2', '0']
          case '1':
            return ['1', '0']
          default:
            return ['2', '0']
        }
      } else {
        return ['2']
      }
    case '214':
      // 洞口灯
      if (value[0] && (value[0].devCurState === '1' || value[0].devCurState === '3')) {
        switch (value[0].itemVal) {
          case '0':
            return ['2']
          case '1':
            return ['1']
          default:
            return ['2']
        }
      } else if (value[0] && value[0].devCurState === '2') {
        switch (value[0].itemVal) {
          case '0':
            return ['2', '-1']
          case '1':
            return ['1', '-1']
          default:
            return ['2', '-1']
        }
      } else {
        return ['2']
      }
    case '215':
      // 基础灯组
      if (value[0] && (value[0].devCurState === '1' || value[0].devCurState === '3')) {
        switch (value[0].itemVal) {
          case '0':
            return ['2']
          case '1':
            return ['1']
          default:
            return ['2']
        }
      } else if (value[0] && value[0].devCurState === '2') {
        switch (value[0].itemVal) {
          case '0':
            return ['2', '0']
          case '1':
            return ['1', '0']
          default:
            return ['2', '0']
        }
      } else {
        return ['2']
      }
    case '216':
      // 加强灯组
      if (value[0] && (value[0].devCurState === '1' || value[0].devCurState === '3')) {
        switch (value[0].itemVal) {
          case '0':
            return ['2']
          case '1':
            return ['1']
          default:
            return ['2']
        }
      } else if (value[0] && value[0].devCurState === '2') {
        switch (value[0].itemVal) {
          case '0':
            return ['2', '0']
          case '1':
            return ['1', '0']
          default:
            return ['2', '0']
        }
      } else {
        return ['2']
      }
    case '321':
      return 'SDHJBJP'
    case '410':
      return 'LABA'
    case '420':
      return 'SDNUJDH'
    case '510':
      return 'GDSXJ'
    case '610':
      return 'QYKZQ'
    case '711':
      if (value[0] && value[0].devCurState === '1') {
        switch (value[0].itemVal) {
          case '0':
            // 停止
            return ['1']
          case '1':
            // 正转
            return ['2']
          case '2':
            // 反转
            return ['3']
          default:
            return ['1']
        }
      } else if (value[0] && value[0].devCurState === '2') {
        switch (value[0].itemVal) {
          case '0':
            // 停止
            return ['1', '0']
          case '1':
            // 正转
            return ['2', '0']
          case '2':
            // 反转
            return ['3', '0']
          default:
            return ['1', '0']
        }
      } else {
        return ['1']
      }
    case '712':
      if (value[0] && value[0].devCurState === '1') {
        switch (value[0].itemVal) {
          case '0':
            // 停止
            return ['1']
          case '1':
            // 正转
            return ['2']
          case '2':
            // 反转
            return ['3']
          default:
            return ['1']
        }
      } else if (value[0] && value[0].devCurState === '2') {
        switch (value[0].itemVal) {
          case '0':
            // 停止
            return ['1', '-1']
          case '1':
            // 正转
            return ['2', '-1']
          case '2':
            // 反转
            return ['3', '-1']
          default:
            return ['1', '-1']
        }
      } else {
        return ['0']
      }
    default:
  }
}
export function handleDeviceName(type) {
  switch (type) {
    case '110':
      return '车道指示灯'
    case '120':
      return '四可变交通信号灯'
    case '131':
      return '门架式情报板'
    case '132':
      return '隧道内情报板'
    case '133':
      return '悬臂式情报板'
    case '140':
      return '可变限速标志'
    case '150':
      return '气筒卷帘门'
    case '160':
      return '车辆检测器'
    case '211':
      return '应急灯'
    case '212':
      return '标志灯'
    case '213':
      return '高杆灯'
    case '214':
      return '洞口路灯'
    case '215':
      return '基础照明灯组'
    case '216':
      return '加强照明灯组'
    case '217':
      return '引导灯'
    case '218':
      return '洞内照度仪'
    case '219':
      return '洞外照度仪'
    case '220':
      return '能见度检测器'
    case '311':
      return '水源水池'
    case '312':
      return '低位水池'
    case '313':
      return '高位水池'
    case '314':
      return '潜水泵'
    case '315':
      return '1号泵'
    case '316':
      return '2号泵'
    case '321':
      return '手动报警'
    case '322':
      return '感温光纤'
    case '323':
      return '烟感检测器'
    case '410':
      return '所有隧道广播'
    case '420':
      return '紧急电话'
    case '510':
      return '所有隧道摄像机'
    case '610':
      return '区域控制器'
    case '620':
      return '摄像机供电箱'
    case '630':
      return '风机控制柜'
    case '640':
      return '风机供电柜'
    case '650':
      return '照明控制柜'
    case '711':
      return '射流风机'
    case '712':
      return '轴流风机'
    case '720':
      return 'CO-VI检测器'
    case '730':
      return '风速风向检测器'
    case '800':
      return '其他'
    default:
      return ''
  }
}
export function handleDeviceTypeArr(type) {
  switch (type) {
    case '110':
      return ['100', '110']
    case '120':
      return ['100', '120']
    case '131':
      return ['100', '130', '131']
    case '132':
      return ['100', '130', '132']
    case '133':
      return ['100', '130', '133']
    case '140':
      return ['100', '140']
    case '150':
      return ['100', '150']
    case '160':
      return ['100', '160']
    case '211':
      return ['200', '210', '211']
    case '212':
      return ['200', '210', '212']
    case '213':
      return ['200', '210', '213']
    case '214':
      return ['200', '210', '214']
    case '215':
      return ['200', '210', '215']
    case '216':
      return ['200', '210', '216']
    case '217':
      return ['200', '210', '217']
    case '218':
      return ['200', '210', '218']
    case '219':
      return ['200', '210', '219']
    case '220':
      return ['200', '220']
    case '311':
      return ['300', '310', '311']
    case '312':
      return ['300', '310', '312']
    case '313':
      return ['300', '310', '313']
    case '314':
      return ['300', '310', '314']
    case '315':
      return ['300', '310', '315']
    case '316':
      return ['300', '310', '316']
    case '321':
      return ['300', '320', '321']
    case '322':
      return ['300', '320', '322']
    case '323':
      return ['300', '320', '323']
    case '410':
      return ['400', '410']
    case '420':
      return ['400', '420']
    case '510':
      return ['500', '510']
    case '610':
      return ['600', '610']
    case '620':
      return ['600', '620']
    case '630':
      return ['600', '630']
    case '640':
      return ['600', '640']
    case '650':
      return ['600', '650']
    case '711':
      return ['700', '710', '711']
    case '712':
      return ['700', '710', '712']
    case '720':
      return ['700', '720']
    case '730':
      return ['700', '730']
    default:
      return ''
  }
}
export function handleDevicePos(type, pos, data) {
  switch (type) {
    // 车道指示器
    case '110':
      pos = pos.split(',')
      pos[1] = 'y:500'
      return pos.join(',')
    // 四可变信号灯
    case '120':
      pos = pos.split(',')
      pos[1] = 'y:400'
      return pos.join(',')
    // 门架式情报板
    case '131':
      pos = pos.split(',')
      pos[1] = 'y:360'
      return pos.join(',')
    // 隧道内情报板
    case '132':
      pos = pos.split(',')
      pos[1] = 'y:500'
      return pos.join(',')
    // 悬臂式情报板
    case '133':
      pos = pos.split(',')
      pos[1] = 'y:400'
      return pos.join(',')
    // 可变速标志
    case '140':
      pos = pos.split(',')
      pos[1] = 'y:400'
      return pos.join(',')
    // 气筒卷帘门
    case '150':
      pos = pos.split(',')
      pos[1] = 'y:100'
      return pos.join(',')
    // 车检器
    // case '160':
    // 应急灯
    // case '211':
    // 标志灯
    // case '212':
    // 高杆灯
    case '213':
      pos = pos.split(',')
      pos[1] = 'y:80'
      return pos.join(',')
    // 中甘灯
    case '214':
      data.y = 400
      var data1 = {}
      var data2 = {}
      var data3 = {}
      var data4 = {}
      if (data.x > 0) {
        if (data.z > 0) {
          data2 = data
          data1.x = data.x
          data1.y = 400
          data1.z = -data.z
          data3.x = -15000 - data.x
          data3.y = 400
          data3.z = data.z
          data4.x = -15000 - data.x
          data4.y = 400
          data4.z = -data.z
        } else {
          data1 = data
          data2.x = data.x
          data2.y = 400
          data2.z = -data.z
          data3.x = -15000 - data.x
          data3.y = 400
          data3.z = -data.z
          data4.x = -15000 - data.x
          data4.y = 400
          data4.z = data.z
        }
      } else {
        if (data.z > 0) {
          data3 = data
          data1.x = Math.abs(data.x + 15000)
          data1.y = 400
          data1.z = -data.z
          data2.x = Math.abs(data.x + 15000)
          data2.y = 400
          data2.z = data.z
          data4.x = data.x
          data4.y = 400
          data4.z = -data.z
        } else {
          data4 = data
          data1.x = Math.abs(data.x + 15000)
          data1.y = 400
          data1.z = data.z
          data2.x = Math.abs(data.x + 15000)
          data2.y = 400
          data2.z = -data.z
          data3.x = data.x
          data3.y = 400
          data3.z = -data.z
        }
      }
      var data1Pos = '{x:' + data1.x + ',y:' + data1.y + ',z:' + data1.z + '}'
      var data2Pos = '{x:' + data2.x + ',y:' + data2.y + ',z:' + data2.z + '}'
      var data3Pos = '{x:' + data3.x + ',y:' + data3.y + ',z:' + data3.z + '}'
      var data4Pos = '{x:' + data4.x + ',y:' + data4.y + ',z:' + data4.z + '}'
      var position = '[' + data1Pos + ',' + data2Pos + ',' + data3Pos + ',' + data4Pos + ']'
      return position
    // 普通照明
    case '215':
      pos = pos.split(',')
      pos[1] = 'y:450'
      return pos.join(',')
    // 加强照明
    case '216':
      pos = pos.split(',')
      pos[1] = 'y:450'
      return pos.join(',')
    // 引导灯
    // case '217':
    // 洞内照度仪
    // case '218':
    // 洞内照度仪
    // case '219':
    // 能见度检测器
    // case '220':
    // 集水井
    // case '311':
    //   return ['300', '310', '311']
    // case '312':
    //   return ['300', '310', '312']
    // case '313':
    //   return ['300', '310', '313']
    // case '314':
    //   return ['300', '310', '314']
    // case '315':
    //   return ['300', '310', '315']
    // case '316':
    //   return ['300', '310', '316']
    // case '321':
    //   return ['300', '320', '321']
    // case '322':
    //   return ['300', '320', '322']
    // case '323':
    //   return ['300', '320', '323']
    // case '410':
    //   return ['400', '410']
    // case '420':
    //   return ['400', '420']
    // case '510':
    //   return ['500', '510']
    // case '610':
    //   return ['600', '610']
    // case '620':
    //   return ['600', '620']
    // case '630':
    //   return ['600', '630']
    // case '640':
    //   return ['600', '640']
    // case '650':
    //   return ['600', '650']
    // 射流风机
    case '711':
      pos = pos.split(',')
      pos[1] = 'y:500'
      return pos.join(',')
    // 轴流风机
    case '712':
      pos = pos.split(',')
      pos[1] = 'y:500'
      return pos.join(',')
    // case '720':
    //   return ['700', '720']
    // case '730':
    //   return ['700', '730']
    default:
      pos = pos.split(',')
      pos[1] = 'y:500'
      return pos.join(',')
  }
}
export function handleDeviceScale(type, num) {
  if (['711', '712'].indexOf(type) !== -1) {
    if (num === 2) {
      return { x: 0.5, y: 0.5, z: 0.5 }
    } else {
      return { x: 0.5, y: 0.5, z: 0.5 }
    }
  } else if (type === '131') {
    if (num === 2) {
      return { x: 1, y: 1, z: 1 }
    } else {
      return { x: 1, y: 1, z: 2 }
    }
  } else {
    return { x: 1, y: 1, z: 1 }
  }
}
export function handleDeviceAngle(type, num, hole) {
  switch (type) {
    case '150':
      return { x: 0, y: 1, z: 0 }
    case '213':
      return { x: 0, y: 0, z: 0 }
    case '214':
      return [{ x: 0, y: -1.55, z: 0 }, { x: 0, y: 1.55, z: 0 }, { x: 0, y: 1.55, z: 0 }, { x: 0, y: -1.55, z: 0 }]
    case '215':
      if (num >= 0) {
        if (hole === 2) {
          if (num > 870) {
            return { x: 0, y: 0, z: 0 }
          } else {
            return { x: 0, y: 3.15, z: 0 }
          }
        } else {
          if (num > 950) {
            return { x: 0, y: 0, z: 0 }
          } else {
            return { x: 0, y: 3.15, z: 0 }
          }
        }
      } else {
        if (hole === 2) {
          if (num > -1000) {
            return { x: 0, y: 0, z: 0 }
          } else {
            return { x: 0, y: 3.15, z: 0 }
          }
        } else {
          if (num > -1800) {
            return { x: 0, y: 0, z: 0 }
          } else {
            return { x: 0, y: 3.15, z: 0 }
          }
        }
      }
    case '216':
      if (num >= 0) {
        if (hole === 2) {
          if (num > 870) {
            return { x: 0, y: 0, z: 0 }
          } else {
            return { x: 0, y: 3.15, z: 0 }
          }
        } else {
          if (num > 950) {
            return { x: 0, y: 0, z: 0 }
          } else {
            return { x: 0, y: 3.15, z: 0 }
          }
        }
      } else {
        if (hole === 2) {
          if (num > -1000) {
            return { x: 0, y: 0, z: 0 }
          } else {
            return { x: 0, y: 3.15, z: 0 }
          }
        } else {
          if (num > -1800) {
            return { x: 0, y: 0, z: 0 }
          } else {
            return { x: 0, y: 3.15, z: 0 }
          }
        }
      }
    case '711':
      if (num >= 0) {
        return { x: 0, y: 1.55, z: 0 }
      } else {
        return { x: 0, y: -1.55, z: 0 }
      }
    case '712':
      if (num >= 0) {
        return { x: 0, y: 1.55, z: 0 }
      } else {
        return { x: 0, y: -1.55, z: 0 }
      }
    default:
      if (num >= 0) {
        return { x: 0, y: 3.15, z: 0 }
      } else {
        return { x: 0, y: 0, z: 0 }
      }
  }
}
