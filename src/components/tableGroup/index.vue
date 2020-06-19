<template>
    <div class="tableGroup">
        <div style="margin-bottom:12px;">
            <slot name="table-top"></slot>
        </div>
        <Table :columns='columns' :data='data' @on-selection-change='handleSelectionChange'/>
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
    methods:{
        handlePageSizeChange(pageSize){
            this.$emit('on-page-size-change',pageSize)
        },
        handleSelectionChange(selection){
            this.$emit('on-selection-change',selection)
        },
        handlePageChange(page) {
            this.$emit('on-change',page)
        }
    }
}
</script>
<style lang="less" >
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