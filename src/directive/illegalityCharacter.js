/**
 * @description 过滤非法字符 如果需要外部指定过滤直  { valeu: 需要过滤的文本,replaces: 过滤违法值 string [] }
 * @param { string } data
 * @param { boolean } isAll 是否全局替换
 * @param { array | string } 替换数组
 * 
 */
const replace = [
  {
    replace:'<br/>',
    replaceString:''
  },
  {
    replace:'/n',
    replaceString:''
  },
  {
    replace:'\n',
    replaceString:''
  },
]
const characterReplace = (target,isAll = true, replaces = replace) => {
  if (target) {
    if (Array.isArray(replaces)){
      replaces.forEach(obj => {
        if (isAll){
          target = target.replace(new RegExp(obj.replace,  'gm'), obj.replaceString || '')
        }else{
          target = target.replace(new RegExp(obj.replace,  isAll ? 'gm' : ''), obj.replaceStringg || '')
        }
      })
    }else{
      console.warn('替换数组 invalid')
    }
  }
  return ''
}
const illegalityCharacter = {
  bind(el, opts) {
    opts.value && (  el.innerHTML = characterReplace(opts.value.target || opts.value,opts.value.isAll,opts.value.replaces) )
  },
  inserted(el, opts) {
    opts.value && (  el.innerHTML = characterReplace(opts.value.target || opts.value,opts.value.isAll,opts.value.replaces) )
  },
  update(el, opts) {
    opts.value && (  el.innerHTML = characterReplace(opts.value.target || opts.value,opts.value.isAll,opts.value.replaces) )
  },
  componentUpdated(el, opts) {
    opts.value && (  el.innerHTML = characterReplace(opts.value.target || opts.value,opts.value.isAll,opts.value.replaces) )
  }
}



export default illegalityCharacter 