<template>
    <div>
        <div class="my_picker animated" :class="{fadeInUp:areaVisible}" v-if="areaVisible" @touchmove.prevent @mousewheel.prevent>
            <div class="btn">
                <div class="cancel" @click="handleCancel">取消</div>
                <span>选择省市区</span>
                <div class="determine" @click="handleDetermine">确定</div>
            </div>
            <mt-picker :slots="slots" @change="handleChangeRegion" popup-transition="popup-fade" position="bottom" valueKey="name"></mt-picker>
        </div>
        <div class="shade" @click="handleCancel" v-show="areaVisible" @touchmove.prevent @mousewheel.prevent></div>
    </div>
</template>
<script>
import {getProvince} from '@/api/enroll'
export default {
    name:'picker',
    props:{
        //默认值
        currentRegion:{
            type:Object,
            default: () => { return {}}
        },
        areaVisible:{
            type:Boolean,
            default:false
        }
    },
    watch:{
        currentRegion:{
            handler(val){
               this.handleSetRegion()
            },
            deep:true
        },
        province_id(id)
        {   
            this.slots[1].values = this.region.cityList.filter( val => {
                return id == val.parentid
            })
        },
        city_id(id)
        {
            this.slots[2].values = this.region.areaList.filter( val => {
                return id == val.parentid
            })
        }
    },
    data(){
        return{
            region:[], //地区
            province_id:'', // 监听省
            city_id:'', // 监听市
            //保存临时地区数据
            temporaryRegion:{
                province:'',
                city:'',
                area:''
            }, 
            slots: [
                {
                    flex: 1,
                    values: [],
                    className: 'slot1',
                    textAlign: 'center'
                }, 
                {
                    flex: 1,
                    values: [],
                    className: 'slot2',
                    textAlign: 'center'
                }, 
                {
                    flex: 1,
                    values: [],
                    className: 'slot3',
                    textAlign: 'center'
                }, 
                {
                    divider: true,
                    content: ' ',
                    className: 'current'
                }
            ]
        }
    },
    methods:{
        //设置地区数据
        handleSetRegion()
        {
            if(this.region.length == 0) return
            //参数
            let params = ['provinceList','cityList','areaList']
            let defaultParams = ['pid','cid','aid']
            //默认地区
            let data = JSON.stringify(this.currentRegion) == '{}' ? false : this.currentRegion
            //保存默认下标
            let index = '';
            for(let i = 0; i < 3; i++)
            {
                //数据筛选
                if(i > 0)
                {
                    this.slots[i].values = this.region[params[i]].filter( val => {
                        return this.slots[ i - 1].values[index || 0].id == val.parentid
                    })
                }else
                {
                    this.slots[i].values = this.region[params[i]]
                }
                //设置默认地区
                if(data)
                {
                    index = this.slots[i].defaultIndex = this.slots[i].values.findIndex( (val,key) => {  return val.id == data[defaultParams[i]] })
                }
            }
        },
        //切换地区
        handleChangeRegion(picker, values)
        {
            if(picker.getSlotValue(0) && picker.getSlotValue(1))
            {

                /* 保存选中地区数据 */
                this.temporaryRegion.province = picker.getSlotValue(0) //省
                this.temporaryRegion.city = picker.getSlotValue(1) //市
                this.temporaryRegion.area = picker.getSlotValue(2) || picker.getSlotValue(1) //区


                this.province_id = picker.getSlotValue(0).id //监听省
                this.city_id = picker.getSlotValue(1).id //监听市
            }
        },
        //确定
        handleDetermine()
        {
            //TODO:首次触发有默认地址直接点确定，则给空对象
            if(!this.temporaryRegion.province)
            {
                if(JSON.stringify(this.currentRegion) == '{}')
                {
                    this.temporaryRegion = {
                        province:{
                            id:1,
                            name:'北京市'
                        },
                        city:{
                            id: 3,
                            name: '东城区',
                            parentid: 1
                        },
                        area:{
                            id: 3,
                            name: '东城区',
                            parentid: 1
                        }

                    }
                }else
                {
                    this.temporaryRegion = {}
                }
            }
            //关闭
            this.handleCancel()
            //设置父组件值
            this.$emit('handleSetRegion',this.temporaryRegion)
        },
        //取消
        handleCancel()
        {
            //初始化地区
            this.handleSetRegion()
            this.$emit('update:areaVisible',false)
        }
    },
    mounted(){
        //获取本地数据
        let region = localStorage.getItem('region')
        //计算时间 （大于1天则重新发送请求）
        var time = region ? (((Date.now() - JSON.parse(localStorage.getItem('region')).time ) / 1000) / 3600 / 24) : '';

        if(region && time <= 1)
        {
            this.region =  JSON.parse(region).data
            //初始化地区
            this.handleSetRegion()
        }else
        {
            //获取地区
            getProvince().then( res => {
                //保存地区
                this.region =  res.data
                //保存数据到本地
                localStorage.setItem('region',JSON.stringify({
                    data:res.data,
                    time:Date.now()
                }))
                //初始化地区
                this.handleSetRegion()
            })
        }
        
    }
}
</script>

<style lang="scss">
    .my_picker
    {
        position: fixed;
        left: 0;
        bottom: 0;

        width: 100%;

        font-size: 28px;
        background-color: #fff;

        z-index:15;
        
        animation-duration: .3s !important;

        .btn
        {
            display: flex;
            justify-content: space-between;
            align-items: center;
            
            height: 80px;

            background-color: rgb(247, 247, 248);

            padding:0 50px;

            .cancel
            {
                color:#999;
            }

            .determine
            {
                color:rgb(0, 118, 242);
            }
            
        }

        .picker
        {
            color:#ccc;

            overflow: hidden;
        }
        .picker-items
        {
            display: flex;
            justify-content: space-between !important;

            text-align: center;

            .picker-selected
            {
                color:#333;
            }
        }

        .current
        {
            position: absolute;
            bottom: 50%;
            
            transform: translateY(100%);

            width: 100%;
            height: 70px;

            
            border-top: 1px solid #eee;
            border-bottom: 1px solid #eee;
            z-index: -1;
        }
    }
</style>