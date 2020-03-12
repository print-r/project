<template>
    <div>
        <footer class="iconfont">
            <ul>
                <li v-for="(val,key) in list.data" :key="key" :class="{active:$route.name == val.url && list.data.length <= 2}" :style="`color:${$route.name == val.url && list.data.length >= 5 ? $store.state.color : ''};width:${100 / list.data.length}%`">
                    <div class="item" @click="handleJumpUrl(val.url,val.isInner)">
                        <i :class="val.icon" ></i>
                        <div class="text">{{val.name}}</div>
                    </div>
                </li>
            </ul>
        </footer>
    </div>
</template>
<script>
export default {
    name:'tabbar',
    props:{
        list:{
            type:Object,
            default:{}
        }
    },
    methods:{
        handleJumpUrl(url,params){
            //防止重复访问
            if(this.$route.name == url)
            {
                return
            }
            //跳转方式
            let mode = this.list.data.length >= 5 ? 'replace': 'push'
            //路由跳转
            this.$router[mode]({
                name:url,
                params:{
                    isInner:params || false
                }
            })
        },
    }
}
</script>
<style lang="scss" scoped>
    footer
    {
        position: fixed;
        bottom: 0;

        width: 100%;
        max-width: $max_width;

        height: 100px;

        z-index:10;

        border-top: 1px solid #f7f7f7;

        background-color: #fff;

        ul
        {
            display: flex;

            height: 100%;

            color:#949494;
            li
            {
                display: flex;
                align-items: center;
                justify-content: center;
                text-align: center;

                height: 100%;
                .item
                {
                    display: inline-block;
                    font-size: 20px;
                    i
                    {
                        font-size: 36px;
                    }
                    .text
                    {
                        font-size: 24px;
                    }
                }
            }
            
        }
        
    }
    .active
    {
        color:$color;
    }
</style>