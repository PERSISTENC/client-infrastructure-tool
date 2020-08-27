<template>
        <div class='table-header-options'>
            <template v-for="option in contentTopRight" >
                 <Button v-if="option.type === 'button'" :key="option.name" :size='option.size ? option.size : "default"' :ghost='option.ghost || false' type='primary' :disabled="option.disabled" @click="handleOptionClick(option)">
                    <i class="iconfont" style="font-size:12px;" v-html='option.icon'></i>
                    {{option.name}}
                </Button>
                <Upload :show-upload-list="false" :key="option.name" v-else-if="option.type === 'upload'" :action="option.action" :headers="header" :data="{bot:__bot}" :on-success='option.onSuccess' :on-error='option.onError'>
                    <Button  type="text" style='color:#FF9305;'>
                        <i class="iconfont" style="margin-right:4px;" v-html='option.icon'></i>
                        {{option.name}}
                    </Button>
                </Upload>
               
                <div class="client-button" v-else :key="option.name"  @click="handleOptionClick(option)">
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
export default {
    name:'contentTopRight',
    data () {
        return {
             header:{
                'Authorization':window.localStorage.getItem('storagetoken')
            },
        }
    },
    props:{
        contentTopRight:{
            type:Array,
            default:()=>[]
        },
        response:{
            type:Object,
            default:()=>{}
        }
    },
    methods:{
        // 点击操作按钮
        handleOptionClick(option){
            const { type } = option
            if (type === 'export'){
                let selected = []
                try {
                    selected = option.selected ? option.selected : this.response.otherInfo.ids
                }catch(err) {
                    selected = []
                }
                const exportUrl = option.exportUrl
                this.$Modal.confirm({
                    content:`<p style='margin-top:32px;'>确认取消确认需要导出【${selected.length}条】信息么？</p>`,
                    onOk:()=>{
                        window.open(`${process.env.BASE_API}${exportUrl}?bot=${this.__bot}&ids=${selected.join(',')}`)
                    }
                })
                return 
            }
           
            option.click && option.click(option)
        },
    }
}
</script>
