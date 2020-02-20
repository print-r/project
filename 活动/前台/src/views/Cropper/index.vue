<template>
    <div class="layout-2" >
        <top class="head" />
        <div class="cropper-content" >
                <div class="cropper" style="text-align:center" >
                    <vueCropper
                    ref="cropper"
                    :img="option.img"
                    :outputSize="option.size"
                    :outputType="option.outputType"
                    :info="false"
                    :full="option.full"
                    :canMove="option.canMove"
                    :canMoveBox="option.canMoveBox"
                    :original="option.original"
                    :autoCrop="option.autoCrop"
                    :autoCropWidth="option.autoCropWidth"
                    :autoCropHeight="option.autoCropHeight"
                    :fixedBox="option.fixedBox"
                    :fixed="option.fixed"
                    :fixedNumber="option.fixedNumber"
                    @imgLoad="handleLoad"
                    ></vueCropper>
                </div>
            </div>
        <div class="btn" @click="handleTailoring" @touchmove.prevent @mousewheel.prevent>裁剪</div>
        <div class="shade" style="display:block"></div>
    </div>
</template>

<script>
import top from '@/components/Index/header.vue';
import {VueCropper} from 'vue-cropper';
import {handleUploadFile} from '@/api/enroll'
export default {
    name:'Cropper',
    components:{
        top,
        VueCropper
    },
    data(){
        return{
            option: {
                img: '',
                outputSize:.8, //剪切后的图片质量（0.1-1）
                full: true, //输出原图比例截图 props名full
                outputType: '',
                canMove: true, //图片不可移动 
                original: true,  // true 按图片大小显示
                canMoveBox: false, 
                autoCrop: true, 
                autoCropWidth: window.innerWidth / (750 / 702), 
                autoCropHeight: window.innerWidth / (750 / 702), 
                fixedBox: true,
            }, 
        }
    },
    methods:{
        //加载图片
        handleLoad(msg)
        {
            if(msg != 'success')
            {
                this.$layer.alert('图片加载失败', () => this.$router.go(-1))
            }
        },
        //读取图片
        hanldeLoadImg(file)
        {
            var fd = new FileReader(); 
            //转base64
            fd.readAsDataURL(file)
            //读取图片
            fd.onload = (e) => {
                //图片类型
                // let type = file.type.split('/')[1] == 'jpeg' ? 'jpg' : file.type.split('/')[1]
                let type = file.type.split('/')[1]
                //图片base64
                this.option.img = fd.result
                //图片类型
                this.option.outputType = type
                //保存本地
                sessionStorage.setItem('base64File',JSON.stringify({
                    src:fd.result,
                    type:type,
                    name:file.name
                }))
            }
        },
        //base64转二进制
        handleURLtoBlob(baseurl) 
        {
            let arr = baseurl.split(','),
                mime = arr[0].match(/:(.*?);/)[1],
                bstr = atob(arr[1]),
                n = bstr.length,
                u8arr = new Uint8Array(n);
            while (n--) {
                u8arr[n] = bstr.charCodeAt(n);
            }
            let blob = new Blob([u8arr], {
                type: mime
            });
            return new File([blob], JSON.parse(sessionStorage.getItem('base64File')).name, {type: blob.type, lastModified: Date.now()});
        },
        //裁剪
        handleTailoring(e)
        {
            this.$refs.cropper.getCropData((data) => {
               //转二进制
               let file = this.handleURLtoBlob(data)
               //实例化FormData对象
               let formData = new FormData();
               formData.append('uploadName',file)
               /* 发送请求 */
               handleUploadFile(formData).then( res => {
                   if(res.data.status == 1)
                   {
                        //活动详情ID
                        let id = this.$route.query.id ? {id:this.$route.query.id} : {}
                        let rand = Math.random();
                        //保存本地
                        sessionStorage.setItem('fileUrl' ,`{"${rand}":"${res.data.url}"}`)
                        //返回页面
                        this.$router.replace({
                            path:'/Enroll',
                            query:{
                                ...id,
                                activity_id:this.$route.params.activity_id,
                                u:rand
                            },
                        })
                   }else
                   {
                       this.$layer.alert('图片上传失败，请重试')
                   }
               })
            
            })
        }
    },
    mounted(){
        //判断当前的参数是否存在
        if(this.$route.params.file)
        {
            this.hanldeLoadImg(this.$route.params.file)
        }else
        {
            let base64File = JSON.parse(sessionStorage.getItem('base64File'))
            this.option.img = base64File.src
            this.option.outputType = base64File.type
        }
    }
}
</script>
<style>
    .cropper-box
    {
        overflow: visible !important;
    }
</style>
<style lang="scss" scoped>
    @import './css/style.scss';
</style>