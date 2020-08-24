export default {
    methods: {
        renderInput(props){
            return <Input {...{ props: this.props}} v-model={props.data[props.key]}/>
        },
        renderSelect(props = {}){
            const { data,key,options = [] } = props 
            return (
                <Select v-model={data[key]} {...{ props: this.props}}>
                    {
                        options.map(option=>{
                            return <Option value={option.value} label={option.label}>{option.label}</Option>
                        })
                    }
                </Select>
            )
        }
    }
}