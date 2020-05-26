<template>
    <div class="client-construction-tool-search-form">
        <div v-for="(row,rowIndex) in searchRows" class="client-construction-tool-search-form-searchRows " :class="row.class" :key="rowIndex">
            <template>
                <label class="client-construction-tool-search-form-searchRows-label"  :style="`width:${labelWidth}px`">{{row.label}}</label>
                <div class="client-construction-tool-search-form-searchRows-children" >
                    <template v-if="!row.render">
                        <span @click='handlelistItem(item,row.children,itemIndex,rowIndex)' class="client-construction-tool-search-form-searchRows-children-item"  :class='{"client-construction-tool-search-form-searchRows-children-item-active":item.active}' v-for="(item,itemIndex) in row.children" :key="itemIndex">{{item.label}}</span>
                    </template>
                     <template v-else>
                        <RenderDom :render='row.render' />
                    </template>
                </div>
            </template>
         
        </div>
    </div>
</template>

<script>
import { RenderDom } from '../utils/index.js'
const prefix = 'client-construction-tool'
export default {
    name: "SearchForm",
    props:{
        searchRows:{
            type: Array,
            default:()=>[]
        },
        labelWidth:{
            type: Number,
        }
    },
    components:{
        RenderDom
    },
    methods: {
        handlelistItem(data,children,itemIndex,rowIndex) {
            if (data.multiple){
                this.$set(data,'active',!data.active)
            }else{
                children.map(obj=>{
                    if ( obj.value == data.value){
                        this.$set(obj,'active',!obj.active)
                    }else{
                        this.$set(obj,'active',false)
                    }
                })
            }
            this.$emit('on-change',{current:data,children:children,currentIndex:itemIndex,rowIndex:rowIndex})
        }
    }
}
</script>
<style lang="less" scoped>
.client-construction-tool-search-form{
    &-searchRows{
        padding:15px 0;
        border-bottom: 1px dashed #DCE3E8;
        margin-left:24px;
        display:flex;
        align-items:center;
        &-label{
            font-size:16px;
            font-family:MicrosoftYaHeiUI;
            color:rgba(153,153,153,1);
        }
        &-children{
            display:inline-flex;
            &-item{
                margin-right:32px;
                cursor: pointer;
                padding: 4px 8px;
                font-size: 16px;
            }
            &-item:last-child{
                margin-right:0;
            }
            &-item-active{
                background:rgba(255,135,32,1);
                border-radius:3px;
                color: #FFFFFF;
                padding: 4px 8px;
            }
        }
    }
    &-searchRows:last-child{
        border-bottom: none
    }
}
</style>