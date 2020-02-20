<template>
    <div class="content layout">
       <top :isGoBack.sync="isGoBack" :current.sync="current" />
       <div class="cate_content">
            <ul class="cate">
                <li v-for="(val,key) in cateList" :key="key">
                    <span :class="{active:active == key}" @click="handleChangeCate(key)">{{val}}</span>
                </li>
            </ul>
            <i class="line" :style="`${isGoBack === true ? 'border-bottom:2px solid' + color : ''};transform:translateX(${speed})`"></i>
       </div>
       
       <!-- 活动信息 -->
       <ul class="products" v-if="listData[active] && listData[active].length">
           <li v-for="(val,key) in listData[active]" :key="key">
               <div class="item" @click="handleJumpUrl(val.id)">
                   <div class="img" :style="`background-image:url(${val.activity_img})`"></div>
                   <div class="desc">
                       <div class="name">{{val.activity_title}}</div>
                       <div class="introduce">
                            {{val.activity_text}}
                       </div>
                       <div class="end_time">
                           结束时间：{{val.end_time.split(' ')[0]}}
                       </div>
                   </div>
               </div>
           </li>
       </ul>
       <!-- 空数据默认样式 -->
       <div class="tips" v-show="listData[active] && !listData[active].length">
           <img :src="'../static/images/' + tipsImg[active]" alt="">
           <div>暂无活动</div>
       </div>
       <!-- banner -->
       <div class="banner">
           <banner />
       </div>
       <!-- 底部导航 -->
       <tabbar :list="tabbarList[current]" />
    </div>
</template>

<script>
import {mapState,mapMutations} from 'vuex'
import banner from '@/components/banner/index.vue';
import {getActivityData} from '@/api/activity'
import tabbar from '@/components/Index/tabbar.vue';
import top from '@/components/Index/header.vue';
import cache from '@/utils/cache'
export default {
    name:'Activity',
    components:{
        banner,
        tabbar,
        top
    },
    beforeRouteEnter(to,from,next){
        next( vm => {
            vm.current = vm.$route.params.isInner ? 1 : 0
            vm.isGoBack = vm.$route.params.isInner || false
            if(vm.$route.params.active != undefined) vm.handleChangeCate(0) //活动结束详情过来默认显示进行中
            cache(vm)
        })
    },
    data(){
        return{
            cateList:['进行中','未开始','已结束'],
            active:0, //默认选中的分类
            listData:[], //活动数据
            tipsImg:[ //空数据默认图片显示
                'action.jpg',
                'notBegun.jpg',
                'over.jpg'
            ],
            speed:0,
            current:0,
            isGoBack:false,
        }
    },
    methods:{
        ...mapMutations({
            handleAdd:'handleAdd',
            handleRemove:'handleRemove'
        }),
        //获取数据
        handleGetData()
        {
            getActivityData().then( res => {
                let name = [2,1,3]
                for(var i = 0; i < 3; i++)
                {
                    this.listData.push(res.data[`ListVoteIndex${name[i]}`])
                }
            })
        },
        //切换选中分类
        handleChangeCate(index)
        {
           if(this.active === index) return

           this.active = ~~index

           let lis = document.querySelector('.cate').children

           let site = lis[this.active].offsetLeft + (lis[this.active].clientWidth  / 2) - (document.querySelector('.line').clientWidth / 2)

           this.speed = site + 'px'
        },
        //路由跳转
        handleJumpUrl(id)
        {
            if(this.$route.params.isInner) this.handleRemove('ActivityList')
            let isCache = this.$route.params.isInner ? {'isCache':false} : {}
            let mode = 'push';
            if(this.$route.params.isInner)
            {
                mode = 'replace'
            }
            this.$router[mode]({
                name:'ActivityList',
                params:{
                    id,
                    ...isCache
                }
            })
        }
    },
    mounted(){
        this.handleChangeCate('0')
        this.handleGetData()
    },
    computed:{
        ...mapState([
        'tabbarList',
        'color'
        ])
    }
}
</script>

<style lang="scss" scoped>
    @import './css/style.scss';
</style>

