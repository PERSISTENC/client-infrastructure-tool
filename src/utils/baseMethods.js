import getOssUploadFile from './ossUpload'
/**
 * @desc 函数防抖
 * @param func 函数
 * @param wait 延迟执行毫秒数
 * @param immediate true 表立即执行，false 表非立即执行
 */
function debounce(func, wait, immediate = false) {
  let timeout;
  return function () {
    let context = this;
    let args = arguments;

    if (timeout) clearTimeout(timeout);
    if (immediate) {
      var callNow = !timeout;
      timeout = setTimeout(() => {
        timeout = null;
      }, wait)
      if (callNow) func.apply(context, args)
    } else {
      timeout = setTimeout(function () {
        func.apply(context, args)
      }, wait);
    }
  }
}
/**
 * @description 节流
 */
function throttle(func, delay) {
  var prev = Date.now();
  return function () {
    var context = this;
    var args = arguments;
    var now = Date.now();
    if (now - prev >= delay) {
      func.apply(context, args);
      prev = Date.now();
    }
  }
}
/**
 * @description 判断是否有权限
 * @param { array | number } value
 * @param { array } permissions 权限列表  
 */
const HasPermissionsAccess = (value = [], permissions = []) => {
  let hasAccess = true
  // 如果是多个权限 只要符合一次就出现 
  if (Array.isArray(value)) {
    hasAccess = value.find((id) => permissions.includes(id)) ? true : false;
  } else {
    // 单个权限
    hasAccess = permissions.includes(value)
  }
  return hasAccess
}
/**
 * @description excel 文件下载 主要用于axios 下载excel 注意  一定要写响应类型：{responseType: 'blob'}
 * @param excelData 二进制流
 */
const excelDownload = (excelData, excelName = '') => {
  if (!excelName.includes('xls')) {
    console.warn('文件名字格式错误')
    return
  }
  let blob = new Blob([excelData], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8' })
  if (window.navigator.msSaveOrOpenBlob) {
    navigator.msSaveBlob(blob, excelName);

  } else {
    let url = window.URL.createObjectURL(blob);
    let aLink = document.createElement("a");
    aLink.style.display = "none";
    aLink.href = url;
    aLink.setAttribute("download", excelName);
    document.body.appendChild(aLink);
    aLink.click();
    document.body.removeChild(aLink); //下载完成移除元素
    window.URL.revokeObjectURL(url); //释放掉blob对象
  }
}
/**
 * @description window.open 下载word 文件或者是pdf 
 * @param {object} data get方法携带得参数
 * @param {string} path window open打开得地址
 */
const excelDownloadWindow = (data, path) => {
  const queryString = Object.keys(data).filter(key => data[key]).map(key => `${key}=${data[key]}`).join('&')
  window.open(`${path}?${queryString}`)
}
/**
 * @description 页面滚动到指定位置
 * @param target 将要滚动的目标对象 如果是整个窗口  document.documentElement
 * @param scrollEventId 要滚动的目标对象id
 */
const ScrollTo = (target, scrollEventId) => {
  if (!target || (!scrollEventId && scrollEventId !== 0)) {
    console.log('传入数据不合法', target, scrollEventId)
    return
  }
  const scrollEvent = document.getElementById(scrollEventId)
  if (!scrollEvent) {
    console.log('scrollEventId未获取到对象', scrollEvent)
    return
  }
  target.scrollTop = scrollEvent.offsetTop
}
/**
 * 元素是否在可视区域内
 * @param {event} el 
 * @param {*} offset 
 */
const IsElementInViewport = (el, offset = 0) => {
  const box = el.getBoundingClientRect(),
    top = (box.top >= 0),
    left = (box.left >= 0),
    bottom = (box.bottom <= (window.innerHeight || document.documentElement.clientHeight) + offset),
    right = (box.right <= (window.innerWidth || document.documentElement.clientWidth) + offset);
  return (top && left && bottom && right);
}
/**
 * @description 得到浏览器地址携带的参数
 */
function getQueryStringArgs() {
  //取得url中？之后的字符串并且去掉开头的?
  const qs = window.location.search.length > 0 ? window.location.search.substring(1) : "";
  let args = {};
  let items = qs.length > 0 ? qs.split("&") : []
  items.forEach(item => {
    // 通过&分割字符保存在items数组中
    const key = decodeURIComponent(item.split('=')[0])
    const value = decodeURIComponent(item.split('=')[1])
    args[key] = value
  })
}
/**
 * @description 是否滚动到底部
 * @param reachBottomValue 距离底部多少距离 触发函数
 * @param reachBottom  执行函数
 * @param isRemoveEventListener 是否要移除监听 如果要移除监听  执行函数为必填
 * @param isDebounce 是否需要防抖 默认要用
 * @param debounceTime 防抖时间
 */
function onReachBottom(node, reachBottomData = {}) {
  const { isRemoveEventListener = false, reachBottomValue = 0, reachBottom, isDebounce = true, debounceTime = 200 } = reachBottomData
  const onScroll = (event) => {
    const scroll = () => {
      const scrollTop = event.target.scrollTop
      const clientHeight = event.target.clientHeight
      const scrollHeight = event.target.scrollHeight
      if (scrollTop + clientHeight + reachBottomValue >= scrollHeight) {
        reachBottom()
      }
    }
    if (isDebounce) {
      debounce(scroll, debounceTime)()
    } else {
      scroll()
    }


  }

  if (isRemoveEventListener) {
    node.removeEventListener('scroll', onScroll)
  } else {
    node.addEventListener('scroll', onScroll)
  }









}

/**
 * @description 判断是否是ios
 */
function isIos() {
  const u = navigator.userAgent
  const isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端 
  return isiOS
}
export {
  throttle,
  getOssUploadFile,
  debounce,
  HasPermissionsAccess,
  excelDownload,
  ScrollTo,
  getQueryStringArgs,
  IsElementInViewport,
  isIos,
  excelDownloadWindow,
  onReachBottom,
}