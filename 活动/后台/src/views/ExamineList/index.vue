<template>
    <div class="examineList layout">
        <top></top>
        <div v-if="examineList" class="examin_warp">
            <div v-for="(item,index) in examineList" :key="index" @click="handleJumpUrl(item)" class="examin_item">
                <div class="examin_top">
                    <div class="examin_tit">
                        {{item.activity_title}}
                    </div>
                    <div class="examin_num">
                        待审核数：<span>{{item.toBeAudited}}</span>
                    </div>
                </div>
                <div class="examin_time">
                    活动时间：{{item.start_time}}-{{item.end_time}}
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue , Component } from 'vue-property-decorator';
import top from '@/components/header/index.vue';
import { getExamineList } from '@/api/examineList';
import { handleSign } from '@/api/login';
interface Item {
    id: string;
    activity_title: string;
}
@Component({
    name: 'ExamineList',
    components: {
        top,
    },
})
export default class ExamineList extends Vue {
    private examineList: any = [];
    private mounted(): void {
        this.getInit();
    }
    private getInit(): void {

        getExamineList().then( (res: any) => {
            this.examineList = res.data.infoSuccess;
            this.examineList.forEach((v: any, i: any) => {
                this.examineList[i].start_time = this.tiemFormat(v.start_time);
                this.examineList[i].end_time = this.tiemFormat(v.end_time);
            });
        });
    }

    // 跳转地址
    private handleJumpUrl(item: Item) {
        // 活动id
        sessionStorage.setItem('a_id' , item.id.toString());
        // 保存title
        sessionStorage.setItem('activity_title' , item.activity_title);
        this.$router.push({
            path: '/ExaminePage',
            query: {
                id: item.id , 
                title: item.activity_title,
            },
        });
    }

    // 转换格式
    private tiemFormat(time: string): string {
        const getTime = time.replace( /-/g , '\/' );
        const timeRub = new Date(time).getTime();
        const year = new Date(timeRub).getFullYear();
        let month: number|string = new Date(timeRub).getMonth() + 1;
        month = month < 10 ? '0' + month : month;
        let day: number|string = new Date(timeRub).getDate();
        day = day < 10 ? '0' + day : day;
        const result = `${year}.${month}.${day}`;
        return result;
    }
}
</script>

<style>
    body
    {
        background-color: #f9f9f9;
    }
</style>

<style lang="scss" scoped>
  @import './css/style.scss';
</style>