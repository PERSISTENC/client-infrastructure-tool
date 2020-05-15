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
        :action="ossUrl">
        <slot></slot>
    </Upload>
</template>

<script >
import { getOssUploadFile } from './ossUploadMethod'
const OSS_API = 'https://isp-prod.oss-cn-hangzhou.aliyuncs.com/'
const ACCESSID = 'LTAIzxiihKegrWfl'
const ACCESSKEY = 'cyYJQHYozXRn0uvkiZdUrHVX7Lj7ON'
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
            default:OSS_API,
        },
        ossAccessId:{
            type:String,
            default:ACCESSID,
        },
        ossAccessKey:{
            type:String,
            default:ACCESSKEY,
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
        }
    }
  
}
</script>