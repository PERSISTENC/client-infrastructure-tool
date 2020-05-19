<template>
    <Upload
        ref="upload"
        :show-upload-list="false"
        :on-success="handleSuccess"
        :accept='accept'
        :format="format"
        :max-size="maxSize"
        :before-upload="handleBeforeUpload"
        :data="ossData"
        :on-format-error='handleFormatError'
        :action="ossUrl">
        <slot></slot>
    </Upload>
</template>

<script >
import { getOssUploadFile } from './ossUploadMethod'
export default {
    data (){
        return {
            ossData: {}

        }
    },
    props: {
        accept:{
            type: String,
            default: ''
        },
        format:{
            type:Array,
            default:()=>[]
        },
        maxSize:{
            type:Number,
            default:2048
        },
        ossUrl:{
            type:String,
            default:'',
            required:true
        },
        ossAccessId:{
            type:String,
            default:'',
            required:true
        },
        ossAccessKey:{
            type:String,
            default:'',
            required:true

        }
    },
    methods:{
        handleSuccess(response, file, fileList){
            let data = {
                response,
                file,
                fileList,
                ossData:this.ossData
            }
            this.$emit('success',data)
        },
        handleBeforeUpload(file){
            this.ossData = getOssUploadFile(file,'',{ossAccessKey:this.ossAccessKey,ossAccessId:this.ossAccessId});
            this.$nextTick(()=>{
                this.$refs.upload.post(file);
            })
            return false
        },
        handleFormatError(validateMessages){
            this.$emit('on-format-error',validateMessages)
        }
    }
  
}
</script>