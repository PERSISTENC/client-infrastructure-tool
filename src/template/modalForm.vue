<script>
import baseMethods from '@/mixins/baseMethods'
export default {
    mixins:[baseMethods],
    props:{
        /**
         * @description formItem列表
         */
        formItem:{
            type:Array,
            default:()=>[]
        },
        formModel:{
            type:Object,
            default:()=>{}
        },
        value:{
            type:Boolean,
            default:false
        },
        /**
         * @description 重置这个表单
         * 再这个方法里面 可以 写一些 表单重置 和 重置表单字段
         */
        resetFields:{
            type:Function,
            default:()=>{}
        },
        cancelText:{
            type:String,
            default:'取消'
        },
        subimtText:{
            type:String,
            default:'确定'
        },
        labelWidth:{
            type:Number,
            default:0
        },
        inline:{
            type:Boolean,
            default:false
        },
        title:{
            type:String,
            default:''
        }
    },
    render(){
        return (
            <Modal value={this.value} on-on-visible-change={this.onVisibleChange} title={this.title}>
                <Form model={this.formModel} labelWidth={this.labelWidth} inline={this.inline}>
                    { 
                        this.formItem.map(formItem=>{
                            return (
                                <FormItem attrs={{...formItem}}>
                                    {formItem.formItemType === 'input' && this.renderInput(formItem)} 
                                </FormItem>
                            )
                        })
                    }
                </Form>
                <div slot='footer'>
                    <Button type='text'>{this.cancelText}</Button>
                    <Button type='primary'>{this.subimtText}</Button>
                </div>
            </Modal>
        )
    },
    methods:{
        /**
         * @description 显示状态发生变化
         */
        onVisibleChange( value= false ){
            this.$emit('on-visible-change',value)
            this.$emit('input',value)
            if (!value){
                this.resetFields && this.resetFields()
            }
        },
     
    }     
}
</script>
