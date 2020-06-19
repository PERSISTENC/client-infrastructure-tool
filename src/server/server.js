import axios from 'axios'
import { v4 as uuidv4 } from 'uuid';
import { setLocalStorage ,getLocalStorage } from './cache'
/**
 * @description http任务队列
 */
class TaskHttpRequest  {
    constructor ( { task,endTime = '',isAgain = false,args } = {} ){
        this._startTime = new Date().getTime()
        this._endTime = endTime,
        this._inatance = task
        this._isagain = isAgain
        this._args = args
    }
}
/**
 * @description axios request 拦截器
 */
const interceptors_request = (config) =>{
    return config
}
/**
 * @description axios reponse 拦截器
 */
const interceptors_reponse = (response) =>{
    return response
}
/**
 * @description axios reponse error 拦截器
 */
const interceptors_reponse_error = (error) => {
   return Promise.reject(error)
}
/**
 * @description 封装axios 请求方案  
 * @param {string} baseUrl http 请求公共url
 * @param {number} timeout 接口响应超时 默认 1000 单位秒
 * @param {object} headers 公共请求头
 * @param {function} loadingShow loading 钩子函数
 */
class HttpServer {
    constructor({ 
            baseUrl = '', 
            timeout = 10000,
            headers,
            loadingShow,
            loadingHide,
            cacheMaxAge,
            cacheKey,
            isLoading = false,
            loadingShowTime = 2000,
            inatance_interceptors_request = interceptors_request ,
            inatance_interceptors_reponse = interceptors_reponse,
            inatance_interceptors_reponse_error = interceptors_reponse_error
        } = {} ){

        /**
         * @description http请求任务队列
         */
        // new Proxy([], proxyHandler)
        this._taskQueue = []
        /**
         * @description 当前正在执行得http 请求数量
         */
        this._count =  0
        /**
         * @description 是否需要loading
         */
        this._isLoading = isLoading
        /**
         * @description loading展示 钩子函数
         */
        this._loadingShow = loadingShow
        /**
         * @description loading 隐藏 钩子函数
         */
        this._loadingHide = loadingHide
        /**
         * @description 初始化axios 实例 供每个请求调用
         */
        this.inatance = axios.create({
            baseURL:baseUrl,
            timeout:timeout,
            headers:headers,
        })
        /**
         * @description cacheMaxAge 缓存 过期时间 单秒 秒
         */
        this._cacheMaxAge = cacheMaxAge
        /**
         * @description cache 保存key
         */
        this._cacheKey = cacheKey
        /**
         * @description loading 开始时间
         */
        this._loadingBeginTime = 0
        /**
         * @description loading从多少秒开始出现
         */
        this._loadingShowTime = loadingShowTime 
        /**
         * @description axios request请求拦截器
         */
        this.inatance.interceptors.request.use((config)=>{
            if(this._isLoading && this._loadingBeginTime === 0){
                setTimeout(() => {
                    if (this._taskQueue.length !== 0) {
                        this._loadingShow && this._loadingShow()
                        this._loadingBeginTime = new Date().getTime()
                    }
                    
                }, this._loadingShowTime);
            }
            return inatance_interceptors_request(config)
        })
        /**
         * @description axios reponse 拦截器
         */
        this.inatance.interceptors.response.use( (response)=> {
             // 判断是否需要缓存 以及 需要缓存得时间 如接口中没有给出 取_cacheMaxAge全量缓存时间 还有缓存的key值
            if (response.config.isCache && response.config.cacheKey ){
                // 缓存过期时间
                const _cacheMaxAge = response.config._cacheMaxAge || this._cacheMaxAge
                setLocalStorage(response.config.cacheKey,_cacheMaxAge,response)
            }

            return inatance_interceptors_reponse(response)
        }, function (error) {
            return inatance_interceptors_reponse_error(error);
        });
    }
    /**
     * @description 请求axios
     */
   async server(args){
        // 判断是否有缓存 并且 需要缓存 如果有缓存 那么直接返回 缓存数据
        if (args.isCache && args.cacheKey ){
           const cacheResponse =  getLocalStorage(args.cacheKey)
           if (!cacheResponse){
                return  this.inatance({...args})
           }else{
               return cacheResponse
           }
        }
        return  this.inatance({...args})
    }
    /**
     * @description http server request 请求方案
     * @param {object} args 请求信息 后期考虑ts 接口重写
     */
    request(args){  
        args._id = uuidv4()  
        // 将 http请求堆入 http任务队列
        this._taskQueue.push(new TaskHttpRequest({args:args})) 

        return new Promise((resolve, reject)=>{
           const task = this.createHttpTask(args,resolve, reject)
           task()    
        })
    }
    /**
     * @description 销毁任务队列中得http请求 
     * 根据条件 id 来判断唯一 
     */
    destroy(id){
      let index = this._taskQueue.findIndex(task=>task._args._id === id)
      if (index !== -1 ){
        this._taskQueue.splice(index,1)
      }
    }
    /**
     * @description 创建异步任务 等待推入 http 任务队列中
     */
    createHttpTask(args,resolve, reject){
        return ()=>{
            // 将当前执行总数 ++
            this._count++
            this.server(args).then(resolve).catch(reject).finally(()=>{
                // 更新 当前执行请求数量
                this._count--
                // 删除 http 任务队列中的实例
                this.destroy(args._id)
                if (this._taskQueue.length === 0){
                    if (new Date().getTime() - this._loadingBeginTime <= 1000){
                        setTimeout(() => {
                            this._loadingHide &&  this._loadingHide()
                            this._loadingBeginTime = 0
                        }, 1000);
                    }else{
                        this._loadingHide &&  this._loadingHide()
                        this._loadingBeginTime = 0
                    }
                }                
            })
        }
    }
}

export default HttpServer