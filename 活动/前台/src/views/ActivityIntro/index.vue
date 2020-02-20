<template>
    <div class="layout">
        <top />
        <div class="cate">
            <div class="item" :class="{active:!active}" @click="handleChange(0)">活动奖品</div>
            <div class="item" :class="{active:active}" @click="handleChange(1)">活动规则</div>
            <i class="line" :style="`background-color:${$store.state.color};transform:translateX(${speed})`"></i>
        </div>
        <div v-if="listMap" class="content" :class="{bg:active}">
            <!-- 活动奖品 -->
            <div class="prize"  v-show="!active">
                <img :src="listMap.activity_prize" alt="">
            </div>
            <!-- 活动规则 -->
            <div class="rule" v-show="active">
                <img :src="listMap.activity_rules" alt="">
            </div>
        </div>
        <!-- 底部导航 -->
        <tabbar :list="$store.state.tabbarList[1]" />
    </div>
</template>

<script>
import tabbar from '@/components/Index/tabbar.vue';
import top from '@/components/Index/header.vue';
import {getActiveProduct} from '@/api/activity_pro.js'

export default {
    name:'ActivityIntro',
    components:{
        tabbar,
        top
    },
     beforeRouteEnter(to,from,next)
    {
        next( vm => {
            if(to.params.active != undefined) vm.handleChange(to.params.active)
        })
    },
    data(){
        return{
            active:0,
            activity_id:sessionStorage.getItem('activityId'),
            listMap:[],
            speed:0,
        }
    },
    methods:{
        handleChange(index)
        {
           if(this.active === index) return
           
            this.active = Boolean(~~index)

            let lis = document.querySelector('.cate').children

            let site = lis[index].offsetLeft + (lis[index].clientWidth  / 2) - (document.querySelector('.line').clientWidth / 2)

            this.speed = site + 'px'
        },
        getInit(){
            getActiveProduct({
                mapStr:JSON.stringify({
                    activity_id:this.activity_id
                })
            }).then(res=>{
                this.listMap = res.data;
            })
        }
    },
    mounted(){
       if(!this.activity_id) this.$layer.alert('参数有误',() => { this.$router.go(-1)});
       this.getInit();
       this.handleChange('0')
    },
}
</script>

<style lang="scss" scoped>
    @import './css/style.scss';
</style>