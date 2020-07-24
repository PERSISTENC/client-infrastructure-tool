<template>
    <div class="tableGroup">
        <div style="margin-bottom:12px;">
            <slot name="table-top"></slot>
        </div>
        <Table :columns='tableColumn' :data='data' @on-selection-change='handleSelectionChange' @on-sort-change='handleSortChange'/>
        <slot name="table-bottom"></slot>
        <slot name="page" >
            <div class="page" >
                <Page :total="total"  :show-elevator='showElevator' :pageSize='pageSize' :show-sizer='showSizer' show-total @on-change="handlePageChange"  @on-page-size-change='handlePageSizeChange' />
                <slot name="page-left"></slot>
            </div>
        </slot>
        <slot name="footer">

        </slot>
    </div>
</template>
<script>
import dayjs from 'dayjs'
export default {
    props:{
        data:{
            type:Array,
            default:()=>[]
        },
        columns:{
            type:Array,
            default:()=>[]
        },
        total:{
            type:Number,
            default:0,
        },
        showElevator:{
            type:Boolean,
            default:true
        },
        showSizer:{
            type:Boolean,
            default:true
        },
        showPage:{
            type:Boolean,
            default:true
        },
        pageSize:{
            type:Number,
            default:10
        }
    },
    computed: {
        tableColumn(){
            let columns = this.columns
            columns.map(column =>{
                const { type,key,render } = column
                // 时间展示
                if (type === 'date' &&  key && !render) {
                    column.render = (h,params)=>{
                        return <span>{dayjs(params.row[key]).format('YYYY-MM-DD HH:mm:ss')}</span>
                    }
                }
            })
            return columns
        }
    },
    methods:{
        handlePageSizeChange(pageSize){
            this.$emit('on-page-size-change',pageSize)
        },
        handleSelectionChange(selection){
            this.$emit('on-selection-change',selection)
        },
        handlePageChange(page) {
            this.$emit('on-change',page)
        },
        handleSortChange(){
            this.$emit('on-sort-change',...arguments)
        }
    }
}
</script>
<style lang="less" scoped>
.tableGroup {
    .page{
        width:100%;
        margin:24px 0;
        display: flex;
        flex-direction: row-reverse;
        justify-content:space-between;
    }
}
</style>