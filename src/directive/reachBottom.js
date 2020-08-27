
/**
 * @description 获取元素滚动是否到底了
 * @param  event 需要监听的元素 
 */

function reachBottom (event,binding){
    const { scrollTop,clientHeight,scrollHeight} = event.target
    const bottom = binding.value.reachBottom || 0
    const onReachBottom = binding.value.onReachBottom 
    if( scrollTop +  clientHeight  + bottom >= scrollHeight){
        onReachBottom()
    }
}

export default {
    inserted:(el,binding ) =>{
        el.addEventListener('scroll', (event)=>reachBottom(event,binding) )
    },
    unbind: (el)=>{
        el.removeEventListener('scroll',reachBottom)
    }
}