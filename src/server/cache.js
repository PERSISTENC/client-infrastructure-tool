/**
 * @description 主要用于serve 请求设置缓存
 */

/**
 * @description 从localstorage 设置 缓存
 * @param {Object} response axios 拦截器返回参数
 * @param {String} _cacheMaxAge 过期时间 如果接口中存在 取接口 不存在取全局
 * 
 */
 export const setLocalStorage = (response,_cacheMaxAge) => {
     const cache = {
         curTime:new Date().getTime(),
         timeout:_cacheMaxAge,
         cache:response
     }
     window.localStorage.setItem(response.config.cacheKey,JSON.stringify(cache))
 }
/**
 * @description 从localstorage 取 缓存 判断边界值 不符合条件返回null 符合条件 返回 cache response 信息
 * @param {request} 请求参数
 */
 export const getLocalStorage = ({ cacheKey }) => {
    let cacheData = window.localStorage.getItem(cacheKey)
    const curTime = new Date().getTime()

    // 判断 cache 是否过期
    if (cacheData){
       let cacheData = JSON.parse(cacheData)
        // 过期了
       if (cacheData.curTime + cacheData.timeout >= curTime) {
          return null
       }else{
           return cacheData.cache
       }
    }
    return null
 }