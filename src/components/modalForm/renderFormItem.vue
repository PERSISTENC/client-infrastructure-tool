<script>
import mixins from '../../mixins/baseMethods'
export default {
    mixins: [mixins],
    data(){
        return {
            renderSwitch : {
                'select':this.renderSelect,
                'input':this.renderInput,
                'datePicker':this.renderDatePicker
            }
        }
    },
    props:['renderData'],
    render(){
        return  this.renderSwitch[this.renderData.type](this.renderData)
    },
    methods:{
      
        renderDatePicker(){

        },
     
    }
}
</script>