<template>
    <div class="examineDetail layout">
        <top :isGoBack="true" :title="title"></top>
        <div class="contain">
            <div :style='"background-image: url("+examineDeatailData.portrait+");"'  class="cover" alt=""></div>
            <div  v-if="examineDeatailData.attribute && examineDeatailData.address " class="info">
                <div class="name">{{examineDeatailData.attribute1}}</div>
                <div class="info_item">
                    <div class="info_tit">{{examineDeatailData.attribute.attribute2}}：</div>
                    <div class="info_cont">{{examineDeatailData.attribute2}}</div>
                </div>
                <div class="info_item">
                    <div class="info_tit">{{examineDeatailData.attribute.attribute3}}：</div>
                    <div class="info_cont">{{examineDeatailData.attribute3}}</div>
                </div>
                <div class="info_item">
                    <div class="info_tit">{{examineDeatailData.attribute.attribute4}}：</div>
                    <div class="info_cont">{{examineDeatailData.attribute4}}</div>
                </div>
                <div class="info_item">
                    <div class="info_tit">收件人：</div>
                    <div class="info_cont">{{examineDeatailData.address.receive_name}}</div>
                </div>
                <div class="info_item">
                    <div class="info_tit">手机号：</div>
                    <div class="info_cont">{{examineDeatailData.address.receive_mobile}}</div>
                </div>
                <div class="info_item">
                    <div class="info_tit">地址：</div>
                    <div class="info_cont">{{examineDeatailData.address.receive_address}}</div>
                </div>
                <div class="info_desc">
                    {{examineDeatailData.attribute5}} 
                </div>
            </div>

            <div class="img_array">
                <img v-for="(item,index) in examineDeatailData.pictures" :key="index"  class="img_item" :src='item' alt="">
            </div>

            <div class="footer">
                <!-- 待审核 -->
                <div v-if="examineDeatailData.state == 0" class="waitExamine">
                    <div @click="reJectStatus = !reJectStatus" class="reject">驳回</div>
                    <div @click="handleSubmit('1')" class="success">通过</div>
                </div>
                <!-- 审核结果 -->
                <div v-if="examineDeatailData.state == 1 || examineDeatailData.state == 2 " class="resultExamine">
                    <div v-if="examineDeatailData.state == 2" class="reject">{{examineDeatailData.enroll_log.pass_log}}</div>
                    <div v-if="examineDeatailData.state == 1" class="success">已通过</div>
                </div>
            </div>
        </div>
        <div @click="reJectStatus = !reJectStatus" v-if="!reJectStatus" class="mark"></div>
        <div class="reject_pop" :class="reJectStatus?'':'active'" >
            <div class="top">
                <div class="title">信息驳回</div>
                <div class="icon">
                     <i @click="reJectStatus = !reJectStatus" class="iconfont icon-guanbi"></i>
                </div>
            </div>
            <div class="content">
                <textarea v-model="rejectContent" placeholder="请填写驳回原因..." name="" id="" cols="30" rows="10"></textarea>
            </div>
            <div @click="handleSubmit('2')" class="submit">提交</div>
        </div>
    </div>
</template>


<script lang="ts">
import { Vue , Component } from 'vue-property-decorator';
import top from '@/components/header/index.vue';
import { getExamineDetail , submitData } from '@/api/examineDetail';
import { namespace } from 'vuex-class';
const Vuex = namespace('common');

interface ExamineDeatailData {
    address: { // 收货地址
        receive_mobile: string, // 手机号
    };
    pictures: any; // 图集
}

@Component({
    name: 'ExamineDetail',
    components: {
        top,
    },
})
export default class ExamineDetail extends Vue {
    @Vuex.Mutation('handleRemoveCache') public handleRemoveCache!: (name: string) => void; // 删除缓存
    private title  =  ''; // 标题名字
    private reJectStatus = true; // 驳回按钮
    private examineDeatailData = {} as ExamineDeatailData; // 审核数据
    private rejectContent = ''; // 驳回原因
    private mounted() {
        this.title = this.$route.query.title + '';
        this.init();
    }
    private init() {
        getExamineDetail({
            mapStr: JSON.stringify({
                id: this.$route.query.id + '',
                activity_id: this.$route.query.activity_id + '',
                state: this.$route.query.state + '',
            }),
        }).then ( ( res: any) => {
            // 基础数据
            this.examineDeatailData = res.data.infoSuccess;
            // 隐藏手机号
            if (this.examineDeatailData.address.receive_mobile) {
                this.examineDeatailData.address.receive_mobile = this.examineDeatailData.address.receive_mobile.replace(/^(\d{3})\d{4}(\d{4})$/, '$1****$2');
            }
            // 处理图片数据
            this.examineDeatailData.pictures = this.examineDeatailData.pictures.split(';');
        });
    }
    /**
     * 审核通过、驳回
     * @param status [string] 1通过，2驳回
     */
    private handleSubmit(status: string): void {
        const rejectText = status === '2' ? {note: this.rejectContent + ''} : {};
        submitData({
            mapStr: JSON.stringify({
                id: this.$route.query.id + '',
                state: status,
                activity_id: this.$route.query.activity_id + '',
                ...rejectText,
            }),
        }).then((res: any) => {
            this.handleRemoveCache('ExaminePage'); // 删除列表缓存
            this.$router.go(-1);
        });
    }
}
</script>

<style lang="scss" scoped>
    @import './css/style.scss';
</style>