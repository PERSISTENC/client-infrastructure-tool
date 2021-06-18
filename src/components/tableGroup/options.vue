<template>
        <div class='table-header-options'>
            <template v-for="option in options" >
                <Button v-if="option.type === 'button'" :key="option.name" :size='option.size ? option.size : "default"' :ghost='option.ghost || false' :type='option.buttonType || "primary"' :disabled="option.disabled" @click="handleOptionClick(option)">
                    <i class="iconfont" style="font-size:12px;" v-html='option.icon'></i>
                    {{option.name}}
                </Button>
                <Upload  
                    v-else-if="option.type === 'upload'" 
                    :accept='option.accept'  
                    :format='option.format'  
                    :show-upload-list="false" 
                    :key="option.name" 
                    :action="option.action" 
                    :headers="header"
                    :multiple='option.multiple'
                    :data='option.data'
                    :on-success='option.onSuccess' 
                    :on-error='option.onError' 
                    :maxSize='option.maxSize' 
                    :on-format-error='option.onFormatError'
                    :on-exceeded-size='option.handleExceededSize || handleExceededSize'>
                    <RenderDom v-if="option.render" :render='option.render' />
                    <Button v-else type="text" style='color:#FF9305;' >
                        <i class="iconfont" style="margin-right:4px;" v-html='option.icon'></i>
                        {{option.name}}
                    </Button>
                </Upload>
                <!-- todo 支持render  -->
                <div  v-else class="client-button" :key="option.name"  @click="handleOptionClick(option)">
                    <i class="iconfont" v-html='option.icon'></i>
                    {{option.name}}
                </div>
            </template>
           
        </div>
</template>
<script>
/**
 * @description 主要应用在template 中 内容头部右边区域得操作项区域
 */
import { RenderDom } from '../../utils/index'
export default {
    name:'Options',
    data () {
        return {
             header:{
                'Authorization':window.localStorage.getItem('storagetoken')
            },
        }
    },
    props:{
        options:{
            type:Array,
            default:()=>[]
        },
        response:{
            type:Object,
            default:()=>{}
        }
    },
    components:{
        RenderDom
    },
    methods:{
        // 点击操作按钮
        handleOptionClick(option){
            const { type,exportUrl } = option
            // 如果是导出 有已经选择的 那么取其中id 如果没有取response 的ids
            if (type === 'export'){
                let selected = []
                try {
                    selected = option.selected ? option.selected : this.response.otherInfo.ids
                }catch(err) {
                    selected = []
                }
                this.$Modal.confirm({
                    content:`<p style='margin-top:32px;'>确认取消确认需要导出【${selected.length}条】信息么？</p>`,
                    onOk:()=>{
                        // 如果导出有参数 请在exportUrl 做修改
                        window.open(exportUrl)
                    }
                })
                return 
            }
           
            option.click && option.click(option)
        },
        // upload 上传文件超出大小
        handleExceededSize(){
            this.$Message.warning('超出文件指定大小')
        }
    }
}
</script>
