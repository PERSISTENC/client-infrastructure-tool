import axios from 'axios'
import { v4 as uuidv4 } from 'uuid';
// TODO 公共得处理response
/**
 * @description http任务队列
 */
class TaskHttpRequest  {
    constructor ( { task,endTime,isAgain = false,args } = {} ){
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
 * @param {number} max 最大并发数 默认 10
 * @param {number} timeout 接口响应超时 默认 1000 单位秒
 * @param {object} headers 公共请求头
 * @param {number} max_again 重新请求最大数 默认 3
 * @param {number} max_again_time 重新请求最大数间隔 默认2000 单位秒
 */
class HttpServer {
    constructor({ 
            baseUrl = '', 
            max = 10, 
            timeout = 1000,
            headers,
            loadingShow,
            loadingHide,
            serverWarning,
            isAgainHttp = false, 
            againHttp,
            // max_again = 2,
            // max_again_time = 2000,
            inatance_interceptors_request = interceptors_request ,
            inatance_interceptors_reponse = interceptors_reponse,
            inatance_interceptors_reponse_error = interceptors_reponse_error
        } = {} ){
        /**
         * @description 请求最大数量 默认为10 超过此数量会再当前任务队列执行完成后 执行
         */
        this._max = max
        /**
         * @description http请求任务队列
         */
        this._taskQueue = []
        /**
         * @description 当前正在执行得http 请求数量
         */
        this._count =  0
        /**
         * @description loading展示 钩子函数
         */
        this._loadingShow = loadingShow
        /**
         * @description loading 隐藏 钩子函数
         */
        this._loadingHide = loadingHide
        /**
         * @description 请求失败 钩子函数
         */
        this._serverWarning = serverWarning
        /**
         * @description 是否需要重载
         */
        this.isAgainHttp = isAgainHttp
        /**
         * @description 重新 请求函数 
         */
        this._againHttp = againHttp
        /**
         * @description 初始化axios 实例 供每个请求调用
         */
        this.inatance = axios.create({
            baseURL:baseUrl,
            timeout:timeout,
            headers:headers,
        })
        
        this._max_while = 0,
        /**
         * @description axios request请求拦截器
         */
        this.inatance.interceptors.request.use((config)=>{
            return inatance_interceptors_request(config)
        })
        /**
         * @description axios reponse 拦截器
         */
        this.inatance.interceptors.response.use( (response)=> {
            return inatance_interceptors_reponse(response)
        }, function (error) {
            return inatance_interceptors_reponse_error(error);
        });
    }
    /**
     * @description 请求axios
     */
    server(args){
        return  this.inatance({...args})
    }
    /**
     * @description http server request 请求方案
     * @param {object} args 请求信息 后期考虑ts 接口重写
     */
    request(args){
        return new Promise((resolve, reject)=>{
            args._id = uuidv4()        
           const task = this.createHttpTask(args,resolve, reject)
            // 如果当前执行任务总数 大于 当前最大并发http请求 那么推入队列 以待下次执行
            this._taskQueue.push(new TaskHttpRequest({task:task,endTime:new Date().getTime(),args:args}))       
            while (this._taskQueue.length){
                const firstTask = this._taskQueue.shift()
                firstTask._inatance()
                this.destroy(args._id)            

            }
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
            })
        }
    }
}

export default HttpServer