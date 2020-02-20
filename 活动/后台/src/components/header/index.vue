<template>
    <div class="top">
       <div>
            <span class="back iconfont icon-zuobian" @click="handleGoBack" v-if="isGoBack"></span>
            <h3 class="title">{{ title || $route.meta.title}}</h3>
       </div>
    </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Header extends Vue {
    @Prop() private isGoBack!: boolean;
    @Prop() private title!: string;
    // 返回上一页
    private handleGoBack() {
        this.$router.go(-1);
    }
}
</script>

<style lang="scss" scoped>
    .top
    {
        position: absolute;
        top: 0;
        
        font-family: SFProDisplay-Medium;
        font-size: 34px;

        width: 100%;
        max-width: $max_width;
        height: 108px;
        line-height: 108px;

        color:#333;
        
        z-index: 10;

        .back
        {
            margin-left: 24px;
            font-size: 35px;
        }
        .title
        {
            position: absolute;
            left: 50%;
            top: 0;

            transform: translateX(-50%);

            font-weight: 700;

            opacity: 0.9;
            
        }
    }
    
</style>