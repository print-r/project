<template>
    <div class="utils_slide">
        <cropper v-if="show" :show.sync="show" :suffix="value.validate.suffix" :success="handleSaveData" ref="cropper"></cropper>
        <div class="tips">
            <div class="tips_text">
                <span>上传图片</span>
                <sup class="tips_icon">*</sup>
            </div>
            <div class="tips_content">
                <span>
                    建议图片宽度702,高度344,支持类型JPG、PNG。
                    要求一组内的图片高度必须完全一致。
                </span>
            </div>
        </div>
        <div class="slide_list">
            <draggable tag="ul" v-model="copyValue.list" v-bind="dragOptions" @start="handleDragStart" @end="handleDragOver">
               <li v-for="(item,index) in copyValue.list" :key="index">
                    <div class="item">
                        <img :src="item.img" alt="">
                        <div class="del" @click="handleDel(index)" v-show="!isDrag"></div>
                    </div>
                </li>
            </draggable>
        </div>
        <div class="upload" @click="handleUpload">
            <div class="text">
                <i class="iconfont icon-tianjia1"></i><span>添加{{copyValue.list.length}}/{{copyValue.validate.max}}</span>
            </div>
        </div>
    </div>
</template>
<script lang='ts'>
import {
    Component,
    Prop,
    Watch,
    Emit,
} from 'vue-property-decorator';
import { Utils, ReturnParams } from '@/abstract/menuUtils';
import { MenuOption } from '@/types/menu';
import cropper from '@/components/cropper/index.vue';
import draggable from 'vuedraggable';

@Component({
    name: '',
    components: {
        cropper,
        draggable,
    },
})
export default class extends Utils {

    // 接收父组件数据
    @Prop({
        type: Object,
        default: {},
        required: true,
    }) private value!: any;

    // 保存一份原来的数据
    private copyValue = this.$deep(this.value);
    // 判断是否有编辑
    private isEdit = false;
    // 显示、隐藏上传图片框
    private show = false;
    // 拖拽状态
    private isDrag = false;

    // 验证返回数据
    public handleCheckData(): ReturnParams {
        let data: ReturnParams = {
            code: 0,
            data: '',
            msg: '',
        };
        if (this.copyValue.list.length) {
            if (!this.isEdit) {
                data.msg = '您尚未编辑数据!';
            } else {
                this.isEdit = false;
                data.code = 1;
                data.data = this.$deep(this.copyValue);
            }
            
        } else {
            data.msg = '最少要上传一张轮播图!';
        }
        return data;
    }

    // 重置数据
    public handleResetData(): void {
        if (this.isEdit) {
            this.copyValue = this.$deep(this.value);
        }
    }

    // 数据监听
    @Watch('copyValue', { deep: true})
    private copyValueChange(
        newVal: any,
        oldVal: any,
    ): void {
        this.isEdit = true;
    }

    // 数据监听
    @Watch('value', { deep: true})
    private changValue(
        newVal: any,
        oldVal: any,
    ): void {
        this.copyValue = this.$deep(newVal);
    }

    @Watch('show', { deep: true})
    private showChange(
        newVal: any,
        oldVal: any,
    ): void {
        if (newVal) {
            this.$nextTick(() => {
                document.body.append((this.$refs.cropper as any).$el);
            });
        }
    }

    // 拖拽配置
    private get dragOptions(): object {
        return {
            animation: 300,
            // disabled: !this.editable,
            ghostClass: 'ghost',
            // scroll: true,
            dragClass: 'dragClass',
        };
    }

    // 开始拖拽
    private handleDragStart(): void {
        this.isDrag = true;
    }

    // 拖拽结束
    private handleDragOver(evt: any): void {
       this.isDrag = false;
    }
    
    // 上传图片
    private handleUpload(): void {
        // 图片最大数
        let max = this.copyValue.validate.max;
        if (this.copyValue.list.length === max) {
            this.$message.error(`最多上传${max}张轮播图`);
            return;
        }
        this.show = true;
    }

    // 保存图片
    private handleSaveData(img: string): void {
        this.copyValue.list.push({
            img,
            url: '',
        });
    }

    // 删除图片
    private handleDel(index: number) {
        this.copyValue.list.splice(index, 1);
    }

    // 提交
    // private handleSubmit() {
    //     if (!this.isEdit) {
    //         this.$message.error('您尚未编辑数据!');
    //         return;
    //     }
    //     if (this.copyValue.list.length) {
    //         this.isEdit = false;
    //         this.$emit('handleSaveChildData', Object.assign({}, JSON.parse(JSON.stringify(this.copyValue))));
    //     } else {
    //         this.$message.error('最少要上传一张轮播图!');
    //     }
    // }

    // 生命周期 - 创建之前
    private beforeCreate(): void {}

    // 生命周期 - 创建完成
    private created(): void {}

    // 生命周期 - 挂载之前
    private beforeMount(): void {}

    // 生命周期 - 挂载完成
    private mounted(): void {}

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