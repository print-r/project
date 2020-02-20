<template>
    <div class="examinePage layout">
        <top :title="title" :isGoBack="true"></top>
        <div class="examinePageWarp">
          <div  @click="examineClick(1)" class="examine_nav" :class="navStatus == 1?'active':''" >
            <span>待审核</span>
          </div>
          <div  @click="examineClick(2)" class="examine_nav" :class="navStatus == 2?'active':''" >
            <span>已审核</span>
          </div>
        </div>
        <div v-if="navStatus == 1 && examineData"  class="examinePageCont">
          <router-link v-for="(item,key) in examineData.waitExamine" :key="key" :to="{ name: 'ExamineDetail', query: { id:item.id ,  mid: item.mid , activity_id: item.activity_id , state: item.state , title: item.attribute1 }}" class="examinePageItem">
            <div class="examinePage_top">
              <div class="examinePage_left">
                <div class="examinePage_tit">{{item.attribute1}}</div>
                <div class="examinePage_status">待审核</div>
              </div>
              <div class="examinePage_detail">
                <span>查看详情</span>
                <i class="iconfont icon-you1"></i>
              </div>
            </div>
            <div class="examinePage_cont">
              {{item.attribute5}}
            </div>
          </router-link>
        </div>
        <div v-if="navStatus == 2 && examineData"  class="examinePageCont">
          <router-link v-for="(item,key) in examineData.aleadyExamine" :to="{ name: 'ExamineDetail', query: { id:item.id ,  mid: item.mid , activity_id: item.activity_id , state: item.state , title: item.attribute1 }}" :key="key"  class="examinePageItem">
            <div class="examinePage_top">
              <div class="examinePage_left">
                <div class="examinePage_tit">{{item.attribute1}}</div>
                <div v-if="item.state == 1" class="examinePage_status success">已审核</div>
                <div v-if="item.state == 2" class="examinePage_status error">已驳回</div>
              </div>
              <div class="examinePage_detail">
                <span>查看详情</span>
                <i class="iconfont icon-you1"></i>
              </div>
            </div>
            <div class="examinePage_cont">
               {{item.attribute5}}
            </div>
          </router-link>
        </div>
        <div class="tips" v-if="examineData[navStatus == 1 ? 'waitExamine' : 'aleadyExamine'] && !examineData[navStatus == 1 ? 'waitExamine' : 'aleadyExamine'].length">暂无审核内容</div>
    </div>
</template>
<script lang="ts">
import { Vue , Component } from 'vue-property-decorator';
import top from '@/components/header/index.vue';
import { getExaminePage } from '@/api/examinePage';
import { namespace } from 'vuex-class';
const Vuex = namespace('common');

interface ToParams {
  name: string;
}

@Component({
    name: 'ExaminePage',
    components: {
        top,
    },
})
export default class ExaminePage extends Vue {
    @Vuex.Mutation('handleAddCache') public handleAddCache!: (name: string) => void; // 添加缓存
    @Vuex.Mutation('handleRemoveCache') public handleRemoveCache!: (name: string) => void; // 删除缓存
    private title  = ''; // 名字
    private navStatus = 1; // 待审核 1 已审核 0
    private examineData = []; // 审查数据
    // 进入路由
    private beforeRouteEnter(to: object, from: object, next: (vm: any) => void): void {
       next( (vm: any) => {
         // 添加缓存
        vm.handleAddCache(vm.$options.name as string);
       });
    }
    // 离开路由
    private beforeRouteLeave(to: ToParams, from: object, next: () => void): void {
      // 删除缓存
      if (to.name !== 'ExamineDetail') {
        this.handleRemoveCache(this.$options.name as string);
      }
      next();
    }
    private mounted() {
      this.title = (this.$route.query.title || sessionStorage.getItem('activity_title')) as string;
      this.getInit();
      
    }
    private getInit() {
      const that = this;
      getExaminePage({
        mapStr: JSON.stringify({
          id: this.$route.query.id.toString() || sessionStorage.getItem('a_id') ,
        }),
      }).then( (res: any) => {
        that.examineData = res.data.infoSuccess;
      });
    }
    private examineClick(index: number): void {
      if (this.navStatus === index) {
          return;
        } else {
          this.navStatus = index;
        }
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