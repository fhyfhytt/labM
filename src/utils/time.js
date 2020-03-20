// 时间转标准格式
export function getTime(time, flag) {
  const d = new Date(time)
  var months = d.getMonth() + 1
  var dates = d.getDate()
  var hours = d.getHours()
  var minutes = d.getMinutes()
  var seconds = d.getSeconds()
  if (months < 10) {
    months = '0' + months
  }
  if (dates < 10) {
    dates = '0' + dates
  }
  if (hours === '0') {
    hours = '00'
  } else if (hours < 10) {
    hours = '0' + hours
  }
  if (minutes === '0') {
    minutes = '00'
  } else if (minutes < 10) {
    minutes = '0' + minutes
  }
  if (seconds === '0') {
    seconds = '00'
  } else if (seconds < 10) {
    seconds = '0' + seconds
  }
  var time_str
  if (flag) {
    time_str = d.getFullYear() + '-' + months + '-' + dates
  } else {
    time_str = d.getFullYear() + '-' + months + '-' + dates + ' ' + hours + ':' + minutes + ':' + seconds
  }
  return time_str
}

export function checkTime(start, end) {
  var publishTime = new Date(getTime(start).replace(/-/g, '/'))
  var invalidTime = new Date(getTime(end).replace(/-/g, '/'))
  var dateDiff = invalidTime.getTime() - publishTime.getTime()
  if (dateDiff < 0) {
    return false
  } else {
    return true
  }
}
