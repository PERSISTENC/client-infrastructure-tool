import getOssUploadFile from './ossUpload'
/**
 * @desc 函数防抖
 * @param func 函数
 * @param wait 延迟执行毫秒数
 * @param immediate true 表立即执行，false 表非立即执行
 */
export  function debounce (func, wait, immediate = false) {
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
 * @description 判断是否有权限
 * @param { array | number } value
 * @param { array } permissions 权限列表  
 */
export const HasPermissionsAccess = (value = [],permissions = [])=>{
    let hasAccess = true
    // 如果是多个权限 只要符合一次就出现 
    if (Array.isArray(value)) {
      hasAccess = value.find((id)=> permissions.includes(id) ) ? true : false;
    } else {
      // 单个权限
      hasAccess = permissions.includes(value)
    }
    return hasAccess
}
export {
    getOssUploadFile
}