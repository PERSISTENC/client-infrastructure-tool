<script>
import Render from './renderFormItem'
export default {
    data(){
        return {
            loading:false,
        }
    },
    model:{
        prop:'modalProps.value',
        event:'change'
    },
    props:{
        modalProps:{
            type:Object,
            default:()=>{}
        },
        modalOn:{
            type:Object,
            default:()=>{}
        },
        modalFormProps:{
            type:Object,
            default:()=>{},
        },
        // 弹框点击确定 需要返回是否成功 来决定是否要关闭弹框
        subimt:{
            type:Function,
        },
        // 重置表单 并且将指值为空
        resetFields:{
            type:Function,
            default:()=>{}
        },
        // 是否需要验证
        isValidate:{
            type:Boolean,
            default:false
        }
    },
   
    render(){
        return (
            <Modal {...{ props: this.modalProps,on:this.modelOn}} on-on-visible-change={this.onVisibleChange}>
                <Form {...{ props: this.modalFormProps}} ref="form">
                    { ( this.modalFormProps.formItem || [] ).map(this.renderFormItem)}
                </Form>
                <div slot="footer">
                    <Button type='text' on-click={this.handleCancel}>取消</Button>
                    <Button type='primary' on-click={this.handleSubimt} loading={this.loading}>确定</Button>
                </div>
            </Modal>
        )
    },
    created(){
      
    },
    methods:{
        onVisibleChange(value){
            this.$emit("change",value)
        },
        renderFormItem(formItem){
            return (
                <FormItem {...{props:formItem}} prop={formItem.prop || formItem.key}>
                    <Render renderData={formItem}/>
                </FormItem>
            )
        },
        handleCancel(){
            this.onVisibleChange(false)
            this.resetFields()
            this.isValidate && this.$refs.form.resetFields()
        },
        async handleSubimt(){
            if (!this.subimt) return
            if (this.isValidate) {
                const valid = await this.$refs.form.validate(valid=>{
                    return valid
                })
                if (!valid) {
                    this.$Message.warning('请检查必填项')
                    return 
                }
              
            }
            this.loading = true
            this.subimt().then(result =>{
                // 验证成功
                result && this.handleCancel()
            }).finally(()=>{
                this.loading = false
            })
        }
    }
}
</script>