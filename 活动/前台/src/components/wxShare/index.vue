<template>
    <div>
        <div v-if="isShow" class="share animated" :class="anima ? 'slideInUp' : 'slideOutDown'">
            <div class="top">
                <div class="text">分享至</div>
                <div class="iconfont icon-guanbi" @click="handleClose"></div>
            </div>
            <ul class="list">
                <li class="item" v-for="(item,index) in list" :key="index" @click="handleShare(item.type)">
                    <img :src="item.img" alt="">
                    <div>{{item.text}}</div>
                </li>
            </ul>
        </div>
        <div class="arrow" v-if="arrow"></div>
        <div class="tips" v-if="arrow">
            <div class="text">
                <div>1.点击右上角</div>
                <div>2.点击 <img src="../../../static/images/wx1.png" alt="">发送给朋友或 <img src="../../../static/images/wx2.png" alt="">分享给朋友圈</div>
            </div>
        </div>
        <div class="shade" v-if="isShow || arrow"  @click="handleClose"></div>
    </div>
</template>

<script>
import Clipboard from 'clipboard'
import {wxShare} from '@/utils/wxShare'
import {mapState} from 'vuex'
export default {
    name: 'wxShare',
    watch:{
        param:{
            handler(newVal,oldVal)
            {
                // 判断是否为微信浏览器
                if(this.weChat)
                {
                   // 显示组件
                   if(this.isShare)
                   {
                     this.arrow = true
                   }else
                   {
                       // 显示分享提示
                       this.isShow = true
                   }
                }else
                {
                    // 复制链接
                    this.handleCopy()
                }
            },
            deep:true
        },
    },
    props:{
        param:{
            type:Object,
            default:{}
        },
    },
    data(){
        return {
            list:[
                {
                    type:'wx',
                    img:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAMAAAC5zwKfAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAABIUExURUdwTHO2AHK0AHG0AHGzAHG0AHGzAHGzAHS5AHvFAHG2AHGzAHGzAP////b67unz157MUYe/J7/djHu5ErDVcJHEOdHmq93twRXm4HsAAAAMdFJOUwBObbbQlO/hGQdC+aWEFjwAAALbSURBVFjDvVnp1kMwEFVEhMgii/d/0w+HIplELP3mV0+d3s56Z5FlcambHBUlrtq2wmWB8qbO7gv5oJJ6UqIPuQXXoIoGpELNZeVyTKOCc/Im3EXITwLcDPlJgqsLmixFQsw/Fb0g1ZmSBNGLgqKeJCW9LDGz6xt4Y6aHEEmN6S3BAcS7eCHEe/aGrSYP8EZEP9boCV5LkZfP9KE4GV5XTwGroxsL+liKc4OV6O0wiu21uWY0gTJQWNZtwnt5mo1bpHP/qRk6R9gpZB5RsO8AYSJRRU9BNXSw9Gkq4lS8M0S89Ev3+zDeGWIDFl3fxSTqx7kAiVMkcsmWwQi+xUOb5X+4ipULAZLabj80X0C9PdBnyY0CCk7R+aa22VwRVXGy2eFBvRppts9dZ0d0vgMP8uLIM7DFU2XYXSyGfsFjLBro2kuaWM4MWshR4onjlgkPoTEt5Ug/nPPBhtknd2OiQoC9FMOOfrhWgagUSRpy49EP1zDNlqGgHJwnNfCtVVCYcULhcWnhICmAH9zuZIBwrGW3+XCX/U7xZS09daIWix/VanivJIfJp/UBPW+x5cf6+29sNFUszzxAvyG74exFFwT0VKwyv58YdgQ0dm0pqy87+6U2lypwBsxIwrGYxQhXumkDzQyCHXLwCoMX8NRldqG2lwAR1OSP6X1Nw9zveS5F8LgPjUtfNWjybKvoJ35hMkaRTLkEC4V5spjPtqiRT1Wsr1qvBYBR4WxPdzGbhd+koNlQy8TWPwBtlJxPw0Ead0t5bvQp83/AaG++Q/CwdJLpkXmxgcc5UEeAs3VgnAsUixcofpIy28BJErdGYVdMZrX1k3qb2tNUnPNcaK2FmZBGRhSBoT1ZRQdd69Ba8XzT87a9t1ez95fH19fbhws49RfwZyeCFjgRvH7EeP/Mch8Rh09L756qbvqxrP/z3Pf+QfIHJ9P3j7o/ODu/fxj/wen+Fy8Xbr7++AO5M/XLvrsMVwAAAABJRU5ErkJggg==',
                    text:'微信'
                },
                {
                    type:'wxLine',
                    img:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAMAAAC5zwKfAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAABIUExURUdwTEi2AEi0AEi0AEm0AEu5AEizAEizAFPBAEizAEi2AEizAP////f89L3kpNfuyGS/KJvWdVW4Euf13njHRKzci8nptYzPX0eGZYcAAAALdFJOUwBObbaUHO/hCdBCETEQjwAAAy9JREFUWMO9mdeWqzAMRRNiWtxx4f//9OKQ4iI5wJCrh1lrUjaydVTsXC51a+8NuY19R2nXjzfS3NvLcRuuZKSFjeQ6HMLdSUcR68h9t3NNT6vWN8OZuJ3I6wbcA3ndhGtvdLPdNsT82tEd1n1zciB0p5HqTg4j3W1jhdge4C1EdCPbnh6yvj2XhxGHkR42aB//wgOJhP7JSKFn+kfLFN5W8sM6Lw3nRnpnKzmTBgbPX8tZZNzheb1lwfNEqYuBTCwvfl/0ACvQGiZz4gLkEl55/4l0A35ABEBODMDHX8CaqoOTXAkZcQUyP9VchBxU5oVIiU/g41XURcDByXycCt8Vr3/8E8gMQOyf/RJ4lowDERNfHi6vAl+7Y0knEqnExA+QOSQBhzJJLGMYMQKyUj3dAIvaMJQYAw0s7nLFVpSml9d9BmQzuOYdddBnwNLFcakze2qUT4HALraAaDxPLY6mT/bQQsIp04Sn8dCJ4OfP+0iykLpmuMUeGBzXtoxKUVqTamUUhYHhQZMvxX0rg+wz+YFAqdb64csw95U0hsseX5f76A2mrA8dniYa1g7n83tnCmB3QYPMsRbn1WP71g8V76LAEI4JY77LLy89RJYcwmENsugZrw8dEhSxfg0GRsKSZVBA2QSQRsIyxdUckE0hbL2GQyBxtgbNy1XYZeo9wiGfn1cztn1wuSFlcZimTxQXYKqerNlwoDjcawPSAmQ8Smc1a62dc0sJ995L6YDyBRRYHW2Rgjswai3UAkwKDNqYhHBOz7O1Sk2VB4xgk5ozYBDHnO6dMVJ6ocAmda3MDU9gqC6alb0VbqO1Rv8CBr25AqjgRg+NIjoHBsH5jIeNIqBwRA4MckwmqDLr3sMSOM7JDBjKWTzjgcNXXxk4V2IEDHL8TKH1gROe2UUGDD6pVwqJ6kiMDO2ap8BQJG2t2zTfjhXKp8AQ1yBwr74dK9CDz5QCg2da2i2nPfRoNjlTrX/I0ax6eFSzE35JXi9mtfnwePrx9vwD+K7R+PeXDvBl0NnXLOdfBJ1/VXX+ZdoR9ZDh/15I/uDK9PxL3R9cO59/Mf6Dq/tf/Lhw8OePf8325JPR45FAAAAAAElFTkSuQmCC',
                    text:'朋友圈'
                },
                {
                    type:'copy',
                    img:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAMAAAC5zwKfAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAA8UExURUdwTGuV8GyW8WyU72uU8GuU8G2V8WuU8HCY9GyU8GuU7////42t877Q+N/n+7DG9u7z/Z+69Xyg8c7c+lESQpwAAAAKdFJOUwBqQnG7707cGZTS+aP6AAACeklEQVRYw7WZ17KDIBCGxYgUASnv/64nlkSP/hQN7k0ycfxmO8umadLCWyI6xqiUlLFOkJY3P0gvmDwJE/09WiuojAgV7WUcYTIpjFzCvTK4Gfkqd10BbkaWOZN3sli6gpj3VF4QmlVSyIsiqplbYjZn8oYwXpcXJ97lxYj3eRFiJ3+QrkK+ZLKnlz/KIcM5/RVIeT0HAjdCg5UOQY/+ltEgY0Y7LGJUae7s+unpoTfDJmMh8RVX0K/qrR/6oork9GjWT79t9c5eIJKYgm5S7uM6XU5cVWxPDyattlCM5cQWF51/A8I+4MXEpQApstjJO0SKk3p638tbxB62GX0CFhMFrBL3LyaXiO84c1DE6N2xrGY4SJpj2uyJKp84BPw6vWuga02+WGDrt//e1UF9C1JlowJbqx92xPCuw7hvT20WH55qI86F/VXcZMMcOY03ot3qxnzRCWDsdFJr4rldYa9ApVLFF32kFlLYlc1i8pj0ZBwolZ164s7MNSgmFRva5A5ku1m85rtLVSFtWB5oDomdqmuWBU4GLt+20ksQWXZmGL9ZE7a2OxMdTuzc1DUVjV3C7A7njIelR3LlHqKdIsDm0OaA3iLi/CtsXzzbM9WAiCP2Im8ado+oYANnZbMwJMLMEYXDMCBiDXt40BcRHfIhLZ//T0SLElFEhqUCIs7DNjoQx4ifIU/DM5VFB844cQijctriU58kZnbccXeDNzCYJYb2SBWa5CT/Sl4rsLgFabVPXiuu3PS8ck7lb3u1r2b1L4/Vr7f1L+D1VwT1lxjV1yz1F0H1V1X1l2n1130PLCTrr0zrL3UfWDs/sBh/YHX/wJ8LN//++ANx68mGHu2F0wAAAABJRU5ErkJggg==',
                    text:'复制链接'
                }
            ],
            isShow:false,
            anima:true,
            clipboard:{},
            isShare:false, // 判断是否请求过分享接口
            arrow:false
        }
    },
    methods:{
        // 关闭
        handleClose()
        {
            this.anima = false
            setTimeout(() => {
                this.arrow = false
                this.anima = true
                this.isShow = false
            },200)
        },
        // 分享
        handleShare(type)
        {
            if(type == 'copy')
            {
                this.handleCopy()
                this.handleClose()
                return
            }
            if(!this.isShare)
            {
                wxShare(this.param)
            }
            this.arrow = true // 显示分享提示
            this.anima = false // 动画
            this.isShare = true 
        },
        // 复制
        handleCopy()
        {
            let _this = this
            let flag = false
            // this.clipboard.on('success', e => {
            //      _this.$layer.alert('链接复制成功，快去粘贴吧')
            //     // 释放内存
            //     _this.clipboard.destroy()
            // })
            this.clipboard.on('error', e => {
                flag = true
                // 不支持复制
                 _this.$layer.msg('复制失败，当前浏览器不支持复制o(╥﹏╥)o')
                // 释放内存
                _this.clipboard.destroy()
            })

            if(!flag) _this.$layer.alert('链接复制成功，快去粘贴吧')
        }
    },
    computed:{
        ...mapState([
        'weChat'
        ])
    },
    mounted(){
        let _this = this
        // 初始化复制插件
        this.clipboard = new Clipboard('.wxShare',{
            text: function () {
                return _this.param.link
            }
        })
    }
}
</script>

<style lang="scss" scoped>
    .arrow
    {
        position: fixed;
        right: 45px;
        top: 15.15px;

        width: 116px;
        height: 148px;

        background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHUAAACVBAMAAACUbqgNAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAwUExURUdwTP///////////////////////////////////////////////////////////0Q+7AIAAAAPdFJOUwAH2UXq95ohWhKBbMWxMZYbeCkAAARnSURBVGje1VhPbBR1FJ7pJt0/bDe1KBeaiCE2wsHhIB6EZCFeODExJv4jOgvhSnYpcpCAbVA0hMMUoRgTTUsiRg/NrtZ4MWbXgxEPMiQEDl62ISWBeCidzmzLsuU5+2e2293fm535NqTxHdq0O9/+5vfe99773pMkyORdEmwDN3Fseh8MjdEyjM3TCgqNEJVQbJLIBKEhjYgmMOy8AyUswGG1ip2GsKNVKBUQaFSpYd9AsMM1KD1BsqBYxz5GsqAOpVUkCxpYC8kC1zJAFrg2DmSBaykgC1zbFhQ7ozaxjwLfN/GZ0sAuIZx87XYNW4aSYap0xMFWIKy+LF2aUe1BqMBWXZz4JYNg1ZSEWjg4pZq2Ca1z1SyswFDpuTKOTS7h2B56oNxDiEJgS6hav4Vf99nS/8/NWqoHNs95fXziwq+zx7kP4x5sll99sVaORs6LP1/gm1jotltD7VtiV73LQbc6FXRk9qNnPt5zlOilQIyMqPS++67/GnRD1FQYV4WL9NZaBQsZdq7jkT5OWJ2jUmvxCymrHXU0ucKFrrK+bl6h39ufMV7gWvrh9ipeaStrCcqJk4sOdXqmTWMPWOJukLc7k1pvY8JYmakHSyJ5MeeHGUOiq8hGYf11xczIChXTyZX11xW2hAS9LXSg2eqcZJnxstD7Ua3138Z+IXaS8X620BoycQfMM11mrGWaGWLIbDATT7zlO7PiEhnltFbMbHHnTYYZKa7LN8MyLI6QQyBOCKhNpuaZUtXPlk7DnUjCWoGT45zkybqXjNvMI3FWgOiuE7OcVugjTqYl97ne5EYi/tyFxfrvy9aEFPS+Yw2hbLC9s59VAs8/aQRxmp8/xr2xesVjiOB6xdRyfebd4SEwudlhqnbfe5aH5FUXOV8t1mbeDzwadpHbHCw8dH584al7dW441B1uhBXPsXPSZkKf31Ydtae9Z9Mc06VSUkItd5n0mA5n5KR57nvdDsBcSdZ2RbR3uk094iKboItpu5ty7RMza5N5ml7urouFEY6b6mr3uSRri0rWpK8VyjC9LqjbadruZ95S7A7iyT9TydfMOErl9ufO+l36RJW29wt/639RtYXoesufm4tkXfO9P3mFaKfr7PBvKlk/6L6nA8c1ZP3zyfGvvtwz4yjayo+S4n8VIf+0tsCgnRknQ3IB5oFTfzSQI59XWWUFm+rvf3fs7zvfP/ASNr5M2d/DQJODsZfNQRibhle2rLDxY312BsZmH/fwygUYO2RlNsLLkeCrwKbdw4kR9WzX3hbvgctpPP1iPfBRr8Ce8tJTXQOEcyqhvgkfO9+11T+VYz/cmGN348eGNPxYHT82RgdRqJw2YUp9TX+h0LBgAeRfckzjjjoEF7iiNYdiR3FHRbTSIBxaexw99m53hc4qE/yNo0X8jT+lP1HoN53K23fCqybKimjncjLAZbej0DMEh2erBl82pNhX0VKRhiMrX6MDqJ/O0nsTIHQvrWbg6JhwF1AsXEYdvQpD/wPhzCA7vVUoUwAAAABJRU5ErkJggg==);
        background-size: 100% 100%;
        background-repeat: no-repeat;
        background-position: 50%;

        z-index:10001;
    }
    .tips
    {
        position: fixed;
        top: 200px;
        left: 50%;

        width: 80%;

        text-align: center;

        transform: translateX(-50%);

        z-index:10001;

        .text
        {
            
            display: inline-block;

            font-family: PingFang-SC-Bold;
            font-size: 28px;

            padding:40px 30px;

            border-radius: 10px;

            background-color: #fff;

            img
            {
                display: inline-block;

                width: 34px;
            }
            div
            {
                text-align: left;

                letter-spacing:2px;

                &:first-child
                {
                    margin-bottom: 20px;
                }
                &:last-child
                {
                    display: flex;
                    align-items: center;
                }
            }
        }
    }
    .share
    {
        position: fixed;
        bottom: 0;
        
        width: 100%;
        max-width: $max_width;

        padding: 25px 25px 30px;

        background-color: #fff;

        animation-duration: .3s;

        box-sizing: border-box;

        z-index: 12;

        .top
        {
            display: flex;
            justify-content: center;

            position: relative;

            font-size: 32px;

            .iconfont
            {
                position: absolute;
                right: 0;

                font-size: 32px;

                color:#ccc;
            }
        }

        .list
        {
            display: flex;
            justify-content: space-around;
            padding-top: 30px;

            .item
            {
                width: 15vw;
                
                text-align: center;

                img
                {
                    display: inline-block;

                    width: 75%;

                    margin-bottom: 10px;

                }
            }
        }
    }
</style>