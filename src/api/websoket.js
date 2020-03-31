
import store from '@/store'
var websock = null
// var global_callback = null
// var serverPort = '5000';	//webSocket连接端口

// function getWebIP() {
//   var curIP = window.location.hostname
//   return curIP
// }

function initWebSocket() { // 初始化weosocket
  // debugger
  // ws地址
  // var wsuri = "ws://" +getWebIP()+ ":" + serverPort;
  var token = store.state.user.token
  if (!token) {
    setTimeout(function() {
      initWebSocket()
    }, 1000)
    return
  }
  var wsuri = 'ws://' + store.state.user.WS_URL + '/webSocket'
  websock = new WebSocket(wsuri, [token])
  websock.onmessage = function(e) {
    console.log(e)
    websocketonmessage(e)
  }
  websock.onclose = function(e) {
    websocketclose(e)
  }
  websock.onopen = function() {
    websocketOpen()
  }

  // 连接发生错误的回调方法
  websock.onerror = function() {
    console.log('WebSocket连接发生错误')
    setTimeout(function() {
      initWebSocket()
    }, 1000)
  }
}

// 实际调用的方法
function sendSock(agentData, callback) {
  // global_callback = callback
  if (websock.readyState === websock.OPEN) {
    // 若是ws开启状态
    websocketsend(agentData)
  } else if (websock.readyState === websock.CONNECTING) {
    // 若是 正在开启状态，则等待1s后重新调用
    setTimeout(function() {
      sendSock(agentData, callback)
    }, 1000)
  } else {
    // 若未开启 ，则等待1s后重新调用
    setTimeout(function() {
      sendSock(agentData, callback)
    }, 1000)
  }
}

// 数据接收
function websocketonmessage(e) {
  // console.log(JSON.parse(e.data))
  // var messages = JSON.parse(e.data)
  // if (messages.enTotalCount > 0) {
  //   var dataListOne = messages.enWarnInfoResponse.map(item => {
  //     if (item.typeS === '720') {
  //       item.topic = 'CO-VI报警'
  //       item.memo = item.tunName + '当前CO值为' + item.coData + ',当前VI值为' + item.viData + ',高于安全阀值，请及时处理。'
  //     } else if (item.typeS === '218' || item.typeS === '219' || item.typeS === '220') {
  //       item.topic = '能见度报警'
  //       item.memo = item.tunName + '当前洞外能见度为' + item.lightOutIntensit + ',当前洞内能见度为' + item.lightInIntensit + ',高于安全阀值，请及时处理。'
  //     } else if (item.typeS === '730') {
  //       item.topic = '风速风向报警'
  //       item.memo = item.tunName + '当前风向为' + item.windDirection + ',当前风速为' + item.windSpeed + ',高于安全阀值，请及时处理。'
  //     }
  //     return item
  //   })
  //   store.commit('dashord/setWarnOnes', true)
  // store.commit('dashord/dataListOnes', dataListOne)
  // }
  // if (messages.fcTotalCount > 0) {
  //   var dataListTwo = messages.fcWarnInfoResponse.map(item => {
  //     if (item.typeS === '311' || item.typeS === '312' || item.typeS === '313') {
  //       item.topic = '水位报警'
  //       item.memo = item.tunName + '水位当前高于安全阀值，请及时处理。'
  //     }
  //     return item
  //   })
  //   store.commit('dashord/setWarnTwos', true)
  //   store.commit('dashord/dataListTwo', dataListTwo)
  // }
}

// 数据发送
function websocketsend(agentData) {
  websock.send(JSON.stringify(agentData))
}

// 关闭
function websocketclose(e) {
  // console.log('connection closed (' + e.code + ')')
}

function websocketOpen() {
  console.log('连接成功')
  ws_heart()
}

initWebSocket()

/**
 * 根据连接状态单线程连接 websocket
 * @param func onopen要执行的函数，可以为空
 */
function ws_execute() {
  // console.log("ws状态是：" + ws.readyState);
  if (websock.readyState === 0) {
    // 连接中
    var _old$open = websock.onopen
    websock.onopen = function(e) {
      // 原本 onopen 里的代码先执行完毕
      _old$open.apply(this, arguments)
    }
  } else if (websock.readyState === 1) {
    // 连接正常，暂未处理
  } else if (websock.readyState === 2) {
    // 连接正在关闭，需要重新连接
    var _old$close = websock.onclose
    websock.onclose = function(e) {
      // 原本 onclose 里的代码先执行完毕
      _old$close.apply(this, arguments)
      initWebSocket()
    }
  } else if (websock.readyState === 3) {
    // 连接已关闭或者没有链接成功，需要重新连接
    initWebSocket()
  }
}
var ws_heart_i = null
/**
 * websocket 每1分钟发一次心跳 判断连接是否正常
 */
function ws_heart() {
  if (ws_heart_i) clearInterval(ws_heart_i)
  ws_heart_i = setInterval(function() {
    ws_execute()
  }, 10000)
}
export { sendSock }
