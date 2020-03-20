import request from '@/utils/request'
const querystring = require('querystring')
export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    data: querystring.stringify({
      userName: data.userName,
      password: data.password
    })
  })
}

export function getInfo(data) {
  return request({
    url: '/user/queryMenuKeyByUserId',
    method: 'post',
    data
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
export function yzlogin(data) {
  return request({
    url: '/user/verification',
    method: 'post',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    data: querystring.stringify({
      mobile: data.mobile
    })
  })
}
export function resetLogin(data) {
  return request({
    url: '/user/reset',
    method: 'post',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    data: querystring.stringify(data)
  })
}
export function updateLogin(data) {
  return request({
    url: '/user/updatePassword',
    method: 'post',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    data: querystring.stringify(data)
  })
}
