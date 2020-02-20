<template>
  <div v-show="isAuth" class="auth" >
    <div class="pop animated zoomIn" @mousewheel.prevent >
      <div class="pop_cont">
        <div class="title">{{authJson.title}}</div>
        <div class="tip">{{authJson.tip}}</div>
        <div v-for="(item,key) in authJson.listMap" :key="key" >
          <div class="pop_item_tit">{{item.tit}}</div>
          <div class="pop_item_cont" v-for="(val,index) in item.cont" :key="index">
              {{val}}
          </div>
        </div>
      </div>
      <div  @click="authBtn" class="pop_sure" >确定</div>
    </div>
    <div class="shade" @touchmove.prevent @mousewheel.prevent></div>
  </div>
</template>

<script>
export default {
  name: "Auth",
  props: {
    isAuth:{
        type:Boolean,
        default:false
    }
  },
  data() {
    return {
      // 授权协议
      authJson: {
        check: false,
        title: "《大尚国际活动用户规则》",
        tip:
          " 您确认：在您参与“大尚国际平台活动”前，您已充分阅读、理解并接受本协议的全部内容，一旦您开始使用即表示您同意遵循本协议之所有约定。如果不接受这些使用条款，请离开并停止使用本网站。",
        listMap: [
          {
            tit: "一、用户参与条件",
            cont: [
              "1.	注册成为大尚国际平台用户，接受并同意遵守《大尚国际注册用户条款》的约定。"
            ]
          },
          {
            tit: "二、用户行为规范",
            cont: [
              " 1.	用户在使用大尚国际平台软件及相关服务、活动时发布上传的内容，包括但不限于文字、图片、视频、音频等各种形式的内容及其中包含的文字、音乐、声音、台词、视觉设计等所有组成部分，您承诺并确保，您的内容：（1）均由您原创或已获合法授权（且含转授权）；（2）不侵违反任何法律、法规、条例或规章；（3）不含有淫秽、色情内容；（4）不含有蓄意破坏、恶意干扰、秘密地截取或侵占任何系统、数据或个人资料的任何病毒、伪装破坏程序、电脑蠕虫、定时程序炸弹或其他电脑程序。如用户违反本条约定的，无论内容是否已经发布，大商国际平台均有权直接删除或采取其他禁止性措施。",
              "2.	用户知悉、理解并同意其通过大尚国际平台软件及相关服务、活动发布上传的内容（包括但不限文字，图片，视频，音频等各种形式的内容及其中包括的文字、音乐、声音、台词、视觉设计、对话等所有组成部分），授权本公司及其关联公司可在全球范围内、免费、非独家、可转授权地使用，使用范围包括但不限于在当前或其他网站、应用程序、产品或终端设备等，您在此确认并同意，上述授予的权利包括在与上述内容、大尚国际平台软件及相关服务、公司和/或公司品牌有关的任何宣传、推广、广告、营销和/或研究中使用和以其他方式开发内容（全部或部分）的权利和许可。为避免疑义，您理解并同意，上述授予的权利包括使用、复制和展示您拥有或被许可使用并植入内容中的个人形象、肖像、姓名、商标、服务标志、品牌、名称、标识和公司标记（",
              "3.	用户将照片、个人信息等资料上传到互联网上，有可能会被其他组织或个人复制、转载、擅改或做其它非法用途，用户必须充分意识此类风险的存在。用户明确同意其使用大尚国际平台服务所存在的风险（包括但不限于受到第三方侵权或对第三方造成侵权）完全由其自己承担；因其使用大尚国际平台服务而产生的一切后果也由其自己承担，大尚国际平台对此不承担任何责任。"
            ]
          },
          {
            tit: "三、活动特殊规则范",
            cont: [
              "1.	活动期间，部分优惠工具可能优惠不生效，或新增可叠加优惠类型，具体以订单确认页面为准。",
              "2.	如出现不可抗力或情势变更的情况（包括但不限于重大灾害事件、活动或互动受政府机关指令需要停止举办或调整的、活动或互动遭受严重网络攻击或因系统故障需要暂停举办的），则大尚国际平台可依相关法律法规的规定主张免责。",
              "3.	在不透露单个用户隐私资料的前提下，大尚国际平台有权对整个用户数据库进行分析并对用户数据库进行商业上的利用。",
              "4.	大尚国际平台可以根据活动及互动的实际举办情况对规则等内容进行变动或调整，相关变动或调整将公布在活动页面上，公布后依法生效。"
            ]
          },
          {
            tit: "四、其他规则",
            cont: ["1.	本规则解释权及修订权归大尚国际平台所有。"]
          }
        ]
      }
    };
  },
  methods: {
      authBtn(){
          this.$emit('update:isAuth',false)
      }
  }
};
</script>

<style lang="scss" scoped>
.pop{
    position: fixed;
    left: 50%;
    top: 50%;
    z-index: 99;

    width: 606px;
    height: 720px;

    margin-left: -303px;
    margin-top: -360px;


    border-radius: 8px;

    background-color: #fff;

    overflow: hidden;

    animation-duration: .3s !important;

    .pop_cont{
        height: 588px;

        overflow: scroll;

        box-sizing: border-box;

        padding: 34px 35px 0px 35px;
        margin-bottom: 48px;

        .title{
            color: #3669e5;
            font-size: 28px;
            text-align: center;
        }

        .tip{
            font-size: 28px;
            color: #58585b;
            margin-top: 54px;
            padding-bottom: 38px;
        }
        .pop_item{
            font-size: 28px;
            line-height: 40px;
            .pop_item_tit{
                margin: 7px 0px;
            }
            .pop_item_cont{
                font-size: 24px
            }
        }
    }

    .pop_sure{
        position: absolute;
        bottom: 0px;
        width: 100%;

        font-size: 28px;
        color: #fff;

        background-color: #3d75fe;
        
        text-align: center;
        line-height: 84px;
        
    }
}

</style>