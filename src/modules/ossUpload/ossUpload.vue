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
        :on-exceeded-size='handleExceededSize'
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
        /**
         * @description oss 配置项
         *      ossPolicyBase64
         *      ossAccessId
         *      ossSignature
         */
        ossConfig:{
            type:Function,
            default:async ()=>{
                return {}
            }
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
        async handleBeforeUpload(file){
            const ossConfig = await this.ossConfig()
            this.ossData = getOssUploadFile(file,'',ossConfig);
            this.$nextTick(()=>{
                this.$refs.upload.post(file);
            })
            return false
        },
        handleFormatError(validateMessages){
            this.$emit('on-format-error',validateMessages)
        },
        handleExceededSize( file, fileList){
            this.$emit('on-exceeded-size', file, fileList)
        }
    }
  
}
</script>