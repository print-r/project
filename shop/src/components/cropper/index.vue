<template>
    <div class="cropper_container">
        <div class="cropper_utils animated fadeInDown" :style="`width:${windowWidth * .9}px;height:${windowHeight * .9}px;`">
            <div class="title">
                <div class="left">
                    <span class="text">选择图片</span>
                    <span class="tips">
                        (建议图片宽度702,高度344,支持类型JPG、PNG。 要求一组内的图片高度必须完全一致)
                    </span>
                </div>
                <div class="close" @click="handleClose">
                    <i class="iconfont icon-guanbi"></i>
                </div>
            </div>
            <div class="cropper-content" v-loading="!reload && options.img">
                <div class="cropper" v-if="options.img && reload" :style="`width:${width}px;height:${height * 2}px;`">
                    <vueCropper
                    ref="cropper"
                    :img="options.img"
                    :info="options.info"
                    :outputSize="options.size"
                    :outputType="options.outputType"
                    :full="options.full"
                    :canMove="options.canMove"
                    :canMoveBox="options.canMoveBox"
                    :original="options.original"
                    :canScale="options.canScale"
                    :autoCrop="options.autoCrop"
                    :autoCropWidth="options.autoCropWidth"
                    :autoCropHeight="options.autoCropHeight"
                    :fixedBox="options.fixedBox"
                    :fixed="options.fixed"
                    :fixedNumber="options.fixedNumber"
                    :mode="'cover'"
                    @imgLoad="handleLoad"
                    ></vueCropper>
                </div>
                <div class="upload" v-if="!options.img">
                    <label @change="handleUploadFile('file')">
                        <input type="file" ref="file">
                        <span>上传</span>
                    </label>
                </div>
            </div>
            <div class="bottom">
                <div class="btns">
                    <div class="reset_select">
                        <label @change="handleUploadFile('reselect')">
                            <input type="file" ref="reselect">
                            <span>重新选择</span>
                        </label>
                    </div>
                    <div class="save" :class="{forbid:isUpload}" @click="handleTailoring" v-loading="isUpload">
                        <span>保存</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="shade"></div>
    </div>
</template>
<script lang='ts'>
import {
    Component,
    Vue,
    Prop,
    Watch,
} from 'vue-property-decorator';
import { upload } from '@/api/upload';

@Component
export default class  extends Vue {

    private width = 0;

    private height = 0;

    private windowWidth = 0;

    private windowHeight =  0;

    private reload = true;

    private isUpload = false;

    // 图片裁剪参数
    private options = {
        img: '',
        info: false,
        outputSize: .8, // 剪切后的图片质量（0.1-1）
        full: true, // 输出原图比例截图 props名full
        outputType: '', // 裁剪生成图片的格式
        canMove: false, // 图片不可移动 
        original: false,  // true 按图片大小显示
        canScale: true, // 允许滚动缩放图片
        canMoveBox: true, 
        autoCrop: true, 
        autoCropWidth: this.width, 
        autoCropHeight: this.height, 
        fixedBox: true,
    };

    // 文件名
    private fileName = '';

    // 允许上传的后缀
    @Prop({
        type: Array,
        default: [],
    }) private suffix!: string[];

    // 上传成功回调
    @Prop({
        type: Function,
        default: () => {},
    }) private success!: (data: string) => void;

    // 上传失败回调
    @Prop({
        type: Function,
        default: () => {},
    }) private error!: (error: string) => void;


    private init(): void {

        this.width = this.options.autoCropWidth = (document.body.clientWidth / 1920) * 702;

        this.height = this.options.autoCropHeight = (document.body.clientHeight / 1920) * 344 * 2;

        this.windowWidth = document.body.clientWidth;

        this.windowHeight =  document.body.clientHeight;

        this.reload = true;
    }
    
    // 关闭
    private handleClose(): void {
        // TODO: 解决页面无法滚动
        (this.$refs.cropper as any)?.cancelScale();
        this.$emit('update:show', false);
    }

    // 上传图片
    private handleUploadFile(refName: string): void {
        const file = (this.$refs[refName] as any).files[0];
        // 验证上传后缀
        if (this.suffix.length && this.suffix.indexOf(file.type.split('/')[1]) === -1) {
            this.$message.error(`只能上传后缀为：${this.suffix.join('、')}的图片`);
            return;
        }
        this.fileName = file.name;
        this.hanldeLoadImg(file);
    }

    // 加载图片
    private handleLoad(msg: string): void {
        if (msg !== 'success') {
            this.$message.error('图片加载失败');
        }
    }

    // 读取图片
    private hanldeLoadImg(file: File): void {
        let fd = new FileReader(); 
        // 转base64
        fd.readAsDataURL(file);
        // 读取图片
        fd.onload = (e) => {
            let type = file.type.split('/')[1];
            // 图片base64
            this.options.img = fd.result as string;
            // 图片类型
            this.options.outputType = type;
        };
    }
    // base64转二进制
    private handleURLtoBlob(baseurl: any): any {
        let arr = baseurl.split(',');
        let mime = arr[0].match(/:(.*?);/)[1];
        let bstr = atob(arr[1]);
        let n = bstr.length;
        let u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        let blob = new Blob([u8arr], {
            type: mime,
        });
        return new File([blob], this.fileName, {type: blob.type, lastModified: Date.now()});
    }
    // 裁剪
    private handleTailoring(): void {
        if (this.isUpload) {
            return;
        }
        if (this.options.img) {
            // 正在上传
            this.isUpload = true;
            (this.$refs.cropper as any).getCropData((data: any) => {
                // 转二进制
                let uploadName = this.handleURLtoBlob(data);
                // 上传图片
                upload({
                    uploadName,
                    index: '4',
                }).then( (res: any) => {
                    this.isUpload = false;
                    this.success(res.data);
                    this.handleClose();
                }).catch( (err: any) => {
                    this.$message.error('上传失败，请重试!');
                    this.isUpload = false;
                    this.error(err);
                });
            });
        } else {
            this.$message.error('请先上传图片!');
        }
        
    }

    // 生命周期 - 创建之前
    private beforeCreate(): void {}

    // 生命周期 - 创建完成
    private created(): void {}

    // 生命周期 - 挂载之前
    private beforeMount(): void {}

    // 生命周期 - 挂载完成
    private mounted(): void {
        this.init();
        const setSize = this.$debounce(this.init);
        // 添加 resize 绑定事件
        window.addEventListener('resize', () => {
            this.reload = false;
            setSize();
        }, false);
    }

    // 生命周期 - 更新之前
    private beforeUpdate(): void {}

    // 生命周期 - 更新完成
    private updated(): void {}

    // 生命周期 - 销毁之前
    private beforeDestroy(): void {}

    // 生命周期 - 销毁完成
    private destroyed(): void {}

    // 使用keep-alive缓存进入页面触发
    private activated(): void {}

    // 进入路由前
    private beforeRouteEnter(to: any, from: object, next: (vm: any) => void): void {
        next( (vm: any) => {});
    }

    // 离开路由后
    private beforeRouteLeave(to: any, from: object, next: () => void): void {
        next();
    }
}
</script>
<style lang='scss' scoped>
@import './style/index.scss';
</style>

<style lang="scss">
.cropper-crop-box,.cropper-view-box
{
    // border: 0;
    outline: 2px dashed #5395F5 !important;
    box-sizing: border-box;
}

.save
{
    .el-loading-mask
    {
        display: flex;
        justify-content: center;
        // align-items: center;
    }
    .el-loading-spinner,.circular
    {
        top: auto !important;
        
        width: pxToEm(30) !important;
        height: pxToEm(30) !important;

        margin: 0 !important;
    }
}
</style>