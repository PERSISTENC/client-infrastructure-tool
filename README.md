# client-infrastructure-tool

## 
    基建库不涉及到ui组件的引入 基建库所使用的ui组件 都为全局组件 ！！

## Server 服务端
```
    HttpServe axios 服务端交互集合 1.0 版本 ( 接口信息缓存, 全局loading， )
    Cache 公共方法
```

## Components 组件库
```
    TableGroup 表格组合（包含了 分页 排序 搜索 表格 头部操作项 ... ） 待完善
    AddOption 业务中比较常见得 增加和删除  如  
```

## Utils 公共方法
```
    validate 公共校验方法
```
## Modules 业务组件
```
    OssUpload Oss 上传图片组件   
    ModalForm 弹框里面有form 表单得
    Search  适用于 
        客户：  王思渊 王思渊 王思渊 王思涛
        客户：  王思渊 王思渊 王思渊 王思涛
```
## 更新记录
### 0.1.2-7
    修复tableGroup page 组件 total 优先级问题
### 0.1.2-9 
> CSS 
   1. 增加rest.css
   2. 更改css为less
> Components
* table组件
   1. columns为date 支持从columns 取值
   2. 增加slot table-header-right
   3. 增加slot table-header-left
   4. 增加是否显示头部默认slot isShowTableHeader
   5. 增加是否显示默认 page isShowPage
* utils
    1. 增加throttle节流函数
* directive
    1. reachBottom 可直接传入函数
### 0.1.3
    Option 组件修复 当type 为button时  无法成为button 的type  增加了buttonType
    Option Upload 组件增加文件大小限制prop及触发事件
    utils 增加获取url携带参数 公共函数

## 0.2 规划
    ```
    1，全局loading  √
    2，骨架屏
    3，utils 
    4，表单 弹框 模板 
    5，表格Group 封装  
    6，Add 业务组件封装 √
    7，loading 重新载入
    
## TODO

1. tableHeaderOptions 拆分出来   √
2. tableHeaderOptions 点击导出 增加params  优先级不高 又需求再说
3. tableHeader slot 配置更加自由   √
4. form表单配置化封装
5. table 表格拆分
6. axios 支持局部loading
7. axios 支持请求失败 重新请求
8. axios all 并发支持
9. react版本的event bus  √
10. 检查 tableGroup 中的data 在response 有data 是否还能监听到
11. tableHeaderOptions 支持render 
12. 1,复制粘贴指令 v-copy 2,输入框防抖指令 v-debounce 3, 图片懒加载 v-LazyLoad 4,拖拽指令 v-draggable 5,长按指令 v-longpress 参考:https://juejin.cn/post/6906028995133833230
13. 序列化url参数




