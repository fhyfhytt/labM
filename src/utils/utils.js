/**
 * @param {Array} source
 * @returns {object}
 * editor fuhy
 */
// 数组对象
export function setTreeData(source) {
  const cloneData = deepCopy(source)
  // 对源数据深度克隆
  return cloneData.filter(father => {
    // 循环所有项，并添加children属性
    father.icon = ''
    const branchArr = cloneData.filter(child => father.id === child.parentId) // 返回每一项的子级数组
    branchArr.length > 0 ? (father.children = branchArr) : '' // 给父级添加一个children属性，并赋值
    return father.parentId === '0' // 返回第一层
  })
}
/**
 * @param {Object} obj
 * @returns {object}
 * editor fuhy
 */
export function deepCopy(obj) {
  // 深度复制数组
  if (Object.prototype.toString.call(obj) === '[object Array]') {
    const object = []
    for (let i = 0; i < obj.length; i++) {
      object.push(deepCopy(obj[i]))
    }
    return object
  }
  // 深度复制对象
  if (Object.prototype.toString.call(obj) === '[object Object]') {
    const object = {}
    for (const p in obj) {
      object[p] = obj[p]
    }
    return object
  }
}
/**
 * @param {Object} treeObj
 * @param {String} rootid
 * @returns {Array}
 * editor fuhy
 */
export function tree2Array(treeObj, rootid) {
  const temp = [] // 设置临时数组，用来存放队列
  const out = [] // 设置输出数组，用来存放要输出的一维数组
  if (treeObj.length === 0) {
    return treeObj
  }
  temp.push(treeObj)
  // 首先把根元素存放入out中
  let pid = rootid
  const obj = deepCopy(treeObj)
  obj.parentId = pid
  delete obj['children']
  out.push(obj)
  // 对树对象进行广度优先的遍历
  while (temp.length > 0) {
    const first = temp.shift()
    const children = first.children
    if (children && children.length > 0) {
      pid = first.id
      const len = first.children.length
      for (let i = 0; i < len; i++) {
        temp.push(children[i])
        const obj = deepCopy(children[i])
        obj.parentId = pid
        delete obj['children']
        out.push(obj)
      }
    }
  }
  return out
}
export function url2obj(url) {
  var urlobj = {}
  var urlArr = url.split(':')
  urlobj.http = urlArr[0]
  urlobj.ip = urlArr[1].replace('//', '')
  var pathA = urlArr[2].split('/')
  var port = pathA.shift()
  urlobj.port = port
  urlobj.path = '/' + pathA.join('/')
  return urlobj
}
// 去掉半选状态
export function getCheckedKeys(data, keys, key) {
  var res = []
  recursion(data, false)
  return res
  // arr -> 树形总数据
  // keys -> getCheckedKeys获取到的选中key值
  // isChild -> 用来判断是否是子节点
  function recursion(arr, isChild) {
    var aCheck = []
    for (var i = 0; i < arr.length; i++) {
      var obj = arr[i]
      aCheck[i] = false

      if (obj.children) {
        aCheck[i] = recursion(obj.children, true) ? true : aCheck[i]
        if (aCheck[i]) {
          res.push(obj[key])
        }
      }

      for (var j = 0; j < keys.length; j++) {
        if (obj[key] === keys[j]) {
          aCheck[i] = true
          if (res.indexOf(obj[key]) === -1) {
            res.push(obj[key])
          }
          break
        }
      }
    }
    if (isChild) {
      return aCheck.indexOf(true) !== -1
    }
  }
}

export function checked(id, data, newArr) {
  data.forEach(item => {
    if (item.id === id) {
      if (!item.children || item.children.length === 0) {
        newArr.push(item.id)
      }
    } else {
      if (item.children && item.children.length !== 0) {
        checked(id, item.children, newArr)
      }
    }
  })
}

