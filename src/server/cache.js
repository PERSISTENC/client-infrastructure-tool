/**
 * @description 主要用于serve 请求设置缓存
 */


 export const setLocalStorage = (response,_cacheMaxAge) => {
     const cache = {
         curTime:new Date().getTime(),
         timeout:_cacheMaxAge,
         cache:response
     }
     window.localStorage.setItem(response.config.cacheKey,JSON.stringify(cache))
 }

 export const getLocalStorage = (request) => {
    let cache = window.localStorage.getItem(request.cacheKey)
    const curTime = new Date().getTime()

    // 判断 cache 是否过期
    if (cache){
       let cache = JSON.parse(cache)
        // 过期了
       if (cache.curTime + cache.timeout >= curTime) {
          return null
       }else{
           return cache.cache
       }
    }
    return null
    
 }