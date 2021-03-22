/**
 * @description 主要用于serve 请求设置缓存
 */

/**
 * @description 从localstorage 设置 缓存
 * @param {String} _cacheMaxAge 过期时间 
 * @param {String} cacheKey 缓存key
 * @param {String} cacheData 缓存数据
 * 
 */
 export const setLocalStorage = (cacheKey,_cacheMaxAge,cacheData) => {
     const cache = {
         cacheTime:new Date().getTime(), // 缓存时间
         timeout:_cacheMaxAge, // 过期时间
         cache:cacheData
     }
     window.localStorage.setItem(cacheKey,JSON.stringify(cache))
 }
/**
 * @description 从localstorage 取 缓存 判断边界值 不符合条件返回null 符合条件 返回 cache response 信息
 * @param {request} 请求参数
 */
 export const getLocalStorage = (cacheKey) => {
    let cacheData = window.localStorage.getItem(cacheKey)
    const curTime = new Date().getTime()
    // 判断 cache 是否过期
    if (cacheData){
        cacheData = JSON.parse(cacheData)
        const cacheAllTime = cacheData.cacheTime + cacheData.timeout 
        // 过期了
       if (cacheAllTime - curTime <= 0) {
           remoreLocalStorage(cacheKey)
          return null
       }else{
           return cacheData.cache
       }
    }
    return null
 }
export const remoreLocalStorage = (key)=>{
    window.localStorage.removeItem(key)
}