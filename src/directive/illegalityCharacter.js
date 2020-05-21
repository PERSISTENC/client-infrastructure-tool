/**
 * @description 过滤非法字符 如果需要外部指定过滤直  { valeu: 需要过滤的文本,replaces: 过滤违法值 string [] }
 * @param { object | string } data
 * 
 */
const characterReplace = (data) => {
  if (data) {
    let replaces = ['<br/>', '/n', '\n']
    if (typeof data === 'string') {
      replaces.forEach(str => {
        data = data.replace(new RegExp(str, 'gm'), '')
      })
      return data
    }else{
      replaces = data.replaces || replaces
      replaces.forEach(str => {
        data.value = data.value.replace(new RegExp(str, 'gm'), '')
      })
      return data.value
    }
  }
  return ''
}
const illegalityCharacter = {
  bind(el, opts, vnode) {
    el.innerHTML = characterReplace(opts.value)
  },
  inserted(el, opts, vnode) {
    el.innerHTML = characterReplace(opts.value)

  },
  update(el, opts, vnode) {
    el.innerHTML = characterReplace(opts.value)
  },
  componentUpdated(el, opts, vnode) {
    el.innerHTML = characterReplace(opts.value)
  }
}



export default illegalityCharacter 