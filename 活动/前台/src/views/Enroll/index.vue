<template>
    <div class="layout-2">
        <top />
        <div class="section">
            <!-- 封面 -->
            <div class="cover" :class="{error:formData.portrait.check}">
                <label for="cover_img" class="cover_img" @change="handleChangeImg">
                    <div class="icon" v-show="!formData.portrait.data">
                        <i>+</i>
                        <div>上传封面</div>
                    </div>
                    <img :src="formData.portrait.data" alt="" v-show="formData.portrait.data" style="height:100%">
                    <input ref="portrait" type="file" id="cover_img" style="display:none">
                </label>
            </div>
            <!-- 属性 -->
            <div class="attr" v-for="(val ,key) in attrData" :key="key" >
                <div v-if="key < attrData.length - 1" class="row" :class="{error:formData.attrData[key].check}">
                    <div class="text">
                        {{val}}
                    </div>
                    <div class="input">
                        <input maxlength="10" type="text" v-model="formData.attrData[key].data" :placeholder="'请输入' + val" @blur="handleCheckInputData" :data-params="key">
                    </div>
                </div>
            </div>
            <!-- 描述 -->
            <div class="desc" v-if="formData.attrData[formData.attrData.length - 1]">
                <div class="text">{{attrData[attrData.length - 1]}}</div>
                <div class="textarea" :class="{error:formData.attrData[formData.attrData.length - 1].check}">
                    <textarea :placeholder="'请输入' + attrData[attrData.length - 1] " v-model="formData.attrData[formData.attrData.length - 1].data" :maxlength="num" @blur="handleCheckInputData" :data-params="(formData.attrData.length - 1)"></textarea>
                    <span class="num" :class="{disabled:!(num - formData.attrData[formData.attrData.length - 1].data.length)}" >{{num - formData.attrData[formData.attrData.length - 1].data.length}}</span>
                </div>
            </div>
            <!-- 图集 -->
            <ul class="atlas">
                <li v-for="(val,key) in formData.pictures.data" :key="key">
                    <img :src="val" alt="" preview>
                    <div class="icon" @click="handleDelImg(key)">
                        <i class="iconfont icon-guanbi2"></i>
                    </div>
                    <input type="hidden" :value="val">
                </li>
                <li class="uploadBtn" :class="{error:formData.pictures.check}">
                    <label for="uploadFile" @change="handleUploadFiles">
                        <div>
                            <i>+</i>
                            <div>上传图片</div>
                            <div class="count">({{formData.pictures.data.length}}/{{maxImgCount}})</div>
                        </div>
                        <input ref="imgs" type="file" id="uploadFile" style="display:none" multiple>
                    </label>
                </li>
            </ul>
            <!-- 收货信息 -->
            <div class="address_info">
                <div class="addr_title">
                    <span>收货信息</span>
                    <span>以下信息仅用于发货</span>
                </div>
                <div class="item" :class="{error:formData.name.check}">
                    <div class="text">姓名</div>
                    <div class="input">
                        <input type="text" :class="formData.name.check" v-model="formData.name.data" placeholder="请输入收件人姓名" @blur="handleCheckInputData" data-params="name">
                    </div>
                </div>
                <div class="item" :class="{error:formData.tel.check}">
                    <div class="text">联系方式</div>
                    <div class="input">
                        <input type="text" placeholder="请输入联系方式" :class="formData.tel.check" v-model="formData.tel.data" @blur="handleCheckInputData" data-params="tel">
                    </div>
                </div>
                <div class="item" :class="{error:formData.region.check}">
                    <div class="text">所在地区</div>
                    <div class="input" @click="areaVisible = true">
                        <span>{{regionText || '请选择地区'}}</span>
                        <!-- <i class="iconfont icon-you1"></i> -->
                    </div>
                </div>
                <div class="item" :class="{error:formData.address.check}">
                    <div class="text">收货地址</div>
                    <div class="input" >
                        <input type="text" placeholder="请输入收货地址" :class="formData.address.check" v-model="formData.address.data" @blur="handleCheckInputData" data-params="address">
                    </div>
                </div>
            </div>
            <!-- 提交 -->
            <div class="sub" :class="{success:isSuccess}">
                <div class="btn " @click="handleSubmit">提交</div>
            </div>
            <!-- 用户协议 -->
            <div class="user_agreement">
                <label>
                    <input type="checkbox" v-model="isAgree">
                    <span class="text">已同意</span>
                </label>
                <span @click="isAuth=!isAuth" class="info_text">《用户授权协议》</span>
            </div>
        </div>
        <!-- 地区 -->
        <picker :areaVisible.sync="areaVisible" @handleSetRegion="handleSetRegion" :currentRegion="currentRegion"></picker>
        <!-- 用户授权协议 -->
        <auth :isAuth.sync="isAuth"></auth>
    </div>
</template>

<script>
import {mapState,mapMutations} from 'vuex'
import top from '@/components/Index/header.vue';
import picker from '@/components/picker/index.vue'
import auth from '@/components/auth/index.vue'
import {getEnrollData,handleUploadFile,handleJoinActivity} from '@/api/enroll'
import {getActivityDetailData} from '@/api/activity'
export default {
    name:'Enroll',
    components:{
        top,
        picker,
        auth
    },
    watch:{
        isAgree(val)
        {
           if(val)
           {
               this.isSuccess =  !this.handleCheckData(true)
           }else
           {
               this.isSuccess = false
           }
        }
    },
    handler:function(e){e.preventDefault();}, //阻止body滑动

    beforeRouteEnter(to,from,next){
        next( vm => {
            if(vm.keepAlive.indexOf(vm.$options.name) == -1) vm.handleAdd(vm.$options.name) //开启缓存
            if(from.name) vm.handleSaveImg() //保存封面图
        })
    },
    beforeRouteLeave(to,from,next)
    {
        //清除缓存
        if(to.name != 'Cropper')
        {
            this.handleRemove(this.$options.name)
        }
        next()
    },
    
   
    data(){
        return{
            attr_id:'',// 活动属性id
            attrData:[], // 属性数据
            addressInfo:{}, // 地址信息
            isAgree:false, // 用户协议阅读状态
            areaVisible:false, //显示地区
            regionText:'', // 默认地区文字
            num:200, // 描述最大文字数量
            maxImgCount:6, //最大图片上传数
            isSuccess:false, // 判断数据是否完整
            formData:{  // 数据对象
                //封面图片
                portrait:{ 
                    data:'',
                    check:false
                }, 
                attrData:[], //属性
                //图集
                pictures:{
                    data:[],
                    check:false
                }, 
                //收货名称
                name:{ 
                    data:'',
                    check:false
                },
                //联系方式
                tel:{ 
                    data:'',
                    check:false
                },
                //收货地区
                region:{
                    data:'',
                    check:false
                },
                //收货地址
                address:{ 
                    data:'',
                    check:false
                },
            },
            currentRegion:{}, // 选中地区
            isAuth:false
        }
    },
    methods:{
        ...mapMutations({
            handleAdd:'handleAdd',
            handleRemove:'handleRemove'
        }),
        //获取数据
        getData()
        {
            let activity_id = this.$route.query.activity_id || sessionStorage.getItem('activityId'); //活动id
            let mid = this.$getUserInfo().mid; // 用户id
            getEnrollData({
                mapStr:JSON.stringify({
                    activity_id,
                    mid
                })
            }).then( res => {
                //活动属性id
                this.attr_id = res.data.mapAttribute.activity_attribute_id 
                //地址信息
                this.addressInfo = res.data.mapAddress
                //收货人
                this.formData.name.data = this.addressInfo.name
                //联系方式
                this.formData.tel.data = this.addressInfo.mobile
                //收货地址
                this.formData.address.data =  this.addressInfo.address
                for(let i = 1; i <= 5;i++ )
                {
                   this.attrData.push(res.data.mapAttribute['attribute' + i])
                   
                   this.formData.attrData.push(Object.assign({},{
                       data:'',
                       check:false
                   }))
                }
                //默认地区
                if(JSON.stringify(this.addressInfo) != '{}')
                {
                    this.formData.region.data = this.addressInfo.area_id
                    this.currentRegion = {
                        pid:this.addressInfo.province_id,
                        cid:this.addressInfo.city_id || this.addressInfo.area_id,
                        aid:this.addressInfo.area_id,
                    }
                    //地区文字
                    this.regionText = this.addressInfo.province + ' ' + (this.addressInfo.city || '') + ' ' + this.addressInfo.county
                }
            })
            //获取审核未通过数据
            if(this.$route.query.id)
            {
                this.getDetailData()
            }
        },
        //获取参与详情
        getDetailData()
        {
            getActivityDetailData({mapStr:JSON.stringify({
                mid:this.$getUserInfo().mid,
                enroll_id:this.$route.query.id,
                activity_id:this.$route.query.activity_id
            })}).then( res => {
                let data = res.data.mapDetailed
                //获取数据对象
                let formData = this.formData
                //封面图
                formData.portrait.data = data.portrait
                //属性
                formData.attrData.forEach( (val,key) => {
                    val.data = data['attr' + (key + 1)]
                })
                //图集
                let pictures = data.pictures.split(';')
                if(pictures.length)
                {
                    pictures.forEach( val => {
                        this.formData.pictures.data.push(val)
                    })
                }
                //初始化预览插件
                this.$previewRefresh()
                //勾选用户协议
                this.isAgree = true
            })
        },
        //图片裁剪
        handleChangeImg(e)
        {
            //活动详情ID
            let id = this.$route.query.id ? {id:this.$route.query.id} : {}
            //文件
            let file = e.target.files[0]

            if(file.type.indexOf('image/') == -1)
            {
                this.$layer.alert('请上传图片');
                return
            }
            //跳转
            this.$router.replace({
                name:'Cropper',
                params:{
                    ...id,
                    file,
                    activity_id:this.$route.query.activity_id
                }
            })
            //清除
            this.$refs.portrait.value = null;
        },
        //验证基本数据
        handleCheckInputData(e)
        {
            let param = e.target.dataset.params
            //判断是否为属性
            if(!isNaN(param))
            {
                this.formData.attrData[param].check = !Boolean(this.formData.attrData[param].data)
            }else
            {
                if(param == 'tel')
                {
                    this.formData[param].check = !(/^1[3456789]\d{9}$/.test(this.formData[param].data))
                }else
                {
                    this.formData[param].check = !Boolean(this.formData[param].data)
                }
                
            }
            this.isSuccess =  !this.handleCheckData(true)
        },
        //保存封面图
        handleSaveImg()
        {
            let param = this.$route.query.u
            if(param)
            {
                this.formData.portrait.data = JSON.parse(sessionStorage.getItem('fileUrl'))[param]
                this.formData.portrait.check = false
            }
            if(!this.isSuccess)
            {
                this.isSuccess =  !this.handleCheckData(true)
            }
        },
        //图集上传
        handleUploadFiles(e)
        {
            let isFirst = false
            let flag = false
            let files = e.target.files
            //判断图片上传最大数
            if(this.maxImgCount < this.formData.pictures.data.length + files.length)
            {
                this.$layer.alert('超出图片最大上传数量');
                return
            }
            for( let item of files)
            {
                if(item.type.indexOf('image/') == -1)
                {
                    flag = true
                }
            }
            if(flag)
            {
                this.$layer.alert('请上传图片');
                return
            }
            for( let item of files)
            {
                let fromData = new FormData()
                fromData.append('uploadName',item)
                //上传图片
                handleUploadFile(fromData).then( res => {
                    this.formData.pictures.data.push(res.data.url)
                    //初始化预览插件
                    this.$previewRefresh()
                    if(!isFirst)
                    {
                        this.formData.pictures.check = !Boolean(this.formData.pictures.data.length)
                        this.isSuccess =  !this.handleCheckData(true)
                    }
                    isFirst = true
                })
                
            }
            this.$refs.imgs.value = null
        },
        //删除图片
        handleDelImg(key)
        {
            this.formData.pictures.data.splice(key,1)
            if(!this.formData.pictures.data.length)
            {
                this.isSuccess =  false
                this.formData.pictures.check = true
            }else
            {
                this.isSuccess =  !this.handleCheckData(true)
                this.formData.pictures.check = false
            }
        },
        //设置地区值
        handleSetRegion(val)
        {
            if(JSON.stringify(val) == '{}') return
            //保存值
            this.formData.region.data = val.area.id
            this.formData.region.check = false
            this.currentRegion = {
                pid:val.province.id, // 省
                cid:val.city.id, // 市
                aid:val.area.id // 区
            }
            this.regionText = val.province.name + ' ' + val.city.name + ' ' + (val.city.name == val.area.name ? '' : val.area.name)
            this.isSuccess =  !this.handleCheckData(true)
        },
        //数据验证
        handleCheckData(check)
        {
            let flag = false
            for(let name in this.formData)
            {
                //验证属性
                if(name == 'attrData')
                {
                    this.formData[name].forEach( val => {
                       if(!val.data)
                       {
                           if(!check) val.check = true
                           flag = true
                       }
                    })
                    continue;
                }
                //验证图集
                if(name == 'pictures')
                {
                    if(!check) this.formData[name].check = !Boolean(this.formData[name].data.length)
                    if(!this.formData[name].data.length) flag = true
                    continue;
                }
                //验证手机号
                if(name == 'tel')
                {
                    var reg = !(/^1[3456789]\d{9}$/.test(this.formData[name].data))
                    if(!check) this.formData[name].check = reg
                    if(reg) flag = true
                    continue;
                }
                if(!this.formData[name].data)
                {
                    flag = true
                    if(!check) this.formData[name].check = true
                }
            }
            if(flag) return flag
            //判断用户是否勾选用户授权协议
            if(!this.isAgree) flag = 1
            
           return flag
        },
        //提交
        handleSubmit()
        {
            let flag = this.handleCheckData()
            if(flag === true)
            {
                this.$layer.alert('信息填写不完整或者信息填写错误')
                return
            }else if(flag === 1)
            {
                this.$layer.alert('请勾选用户授权协议')
                return
            }
            //数据
            let data = {
                activity_id:sessionStorage.getItem('activityId'), //活动id
                mid:this.$getUserInfo().mid, //用户id
                portrait:this.formData.portrait.data, //封面图
                pictures:this.formData.pictures.data.join(';'), //图集
                address_id:JSON.stringify(this.addressInfo) == '{}' ? '' : this.addressInfo.address_id,//地址id
                NAME:this.formData.name.data, //收货名
                TEL:this.formData.tel.data, //联系方式
                MOBILE:this.formData.tel.data, //联系方式
                area_id:this.formData.region.data, // 地区id
                ADDRESS:this.formData.address.data, //收货地址
                activity_attribute_id:this.attr_id, //活动属性id    
                is_buy_first:sessionStorage.getItem('isBuy')
            }
            //属性数据
            this.formData.attrData.forEach( (val,key) => {
                data['attribute' + (key + 1)] = val.data
            })
            //发送请求
            handleJoinActivity({
                mapStr:JSON.stringify(data)
            }).then( res => {
                //清除个人中心缓存
                this.handleRemove('Personal')
                this.$router.push({
                    path:'/SuccessEnroll'
                })
            })
            
        }
    },
    mounted(){
        let activity_id = this.$route.query.activity_id || sessionStorage.getItem('activityId') 
        if(!activity_id || !sessionStorage.getItem('isBuy'))
        {
            this.$layer.alert('参数有误',() => {this.$router.replace({path:'/ActivityList'})})
            return
        }
        //获取属性数据
        this.getData()
    },
    computed:{
        ...mapState([
        'keepAlive'
        ])
    }
}
</script>

<style lang="scss">
    @import './css/style.scss';
</style>