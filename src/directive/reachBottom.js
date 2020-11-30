
/**
 * @description 获取元素滚动是否到底了
 * @param  event 需要监听的元素 
 */

function reachBottom (event,binding){
    const scrollTop = event.target.scrollTop
    const clientHeight = event.target.clientHeight
    const scrollHeight = event.target.scrollHeight
    const onReachBottom = typeof binding.value === 'function' ? binding.value : binding.value.onReachBottom
    const bottom = binding.value.reachBottom || 0
    if( scrollTop +  clientHeight  + bottom >= scrollHeight){
        onReachBottom()
    }
}

export default {
    inserted: (el, binding) => {
        el.addEventListener('scroll', (event)=>reachBottom(event,binding) )
    },
    unbind: (el)=>{
        el.removeEventListener('scroll',reachBottom)
    }
}