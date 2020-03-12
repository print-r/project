<template>
  <div class="body">
    <top />
    <div v-if="isShow">
      <!-- 排行榜信息 -->
      <div class="rank_info" :style="`background-color:${$store.state.color}`">
        <!-- <div v-show="isTimeOut" class="isTimeOut">已结束</div>
        <div v-show="!isTimeOut" class="isTime">拒结束：16天03时02分10秒</div> -->
        <img src="/static/images/pf.png" alt />
        <!-- 梯形 -->
        <ul class="trapezoid">
          <li v-for="(val, key) in rank" :key="key"> 
            <div v-if="val.id">
                <div class="hg" v-if="key == 1">
                  <img src="../../../static//images/hg.png" alt />
                </div>
                <div class="avatar">
                  <img :src="val.portrait" alt />
                </div>
                <div class="tips">
                  <img :src="val.img" alt />
                </div>
                <div class="code">ID：{{ val.id }}</div>
                <div class="vote_count">{{ val.gain_votes || 0 }}票</div>
            </div>
          </li>
        </ul>
        <div class="end_time">
            <div v-if="!isOver">距结束：<span class="dateTime"> <i class="d">-</i> 天 <i class="h">-</i> 时 <i class="m">-</i> 分 <i class="s">-</i> 秒</span></div>
            <div style="text-align:center" v-if="isOver">已结束</div>
        </div>
      </div>
      <!-- 排行榜列表 -->
      <ul class="list">
        <li v-for="(val, key) in listMap.getRankingList" :key="key" v-if="key > 2">
          <div class="left">
            <div class="num">{{ key + 1 }}</div>
            <div class="img">
              <img :src="val.portrait" alt />
            </div>
            <span>ID：{{ val.id }}</span>
          </div>
          <div class="right">{{ val.gain_votes || 0 }}票</div>
        </li>
      </ul>
      <!-- 用户参赛信息 -->
      <match-info :isJoin="isJoin" :listMap.sync="info" :shareParam="shareParam" />
      <!-- 底部导航 -->
    </div>
    <div class="rank_empty" v-if="!isShow">
      <img class="rank_empty_icon" src="../../../static/images/rank.jpg" />
      <div class="tip">
        正在统计中，赶快
        <span @click="sighUp()" style="color: #6795f8;">报名</span>中
      </div>
      <div class="banner">
        <banner />
      </div>
    </div>
    <!-- 活动结束弹出窗 -->
    <!-- <overPopup :isOver="isOver" /> -->
    <tabbar :list="$store.state.tabbarList[1]" />
  </div>
</template>
<script>
import { getRankList } from "@/api/rank.js";
import tabbar from "@/components/Index/tabbar.vue";
import top from "@/components/Index/header.vue";
import matchInfo from "@/components/matchInfo/index.vue";
import overPopup from "@/components/overPopup/index.vue";
import banner from "@/components/banner/index.vue";
import { countDown } from "@/utils/common";
export default {
  name: "RankingList",
  components: {
    matchInfo,
    overPopup,
    banner,
    top,
    tabbar
  },
  data() {
    return {
      isJoin: true,
      isOver: false,
      activityId: sessionStorage.getItem("activityId"),
      mid: this.$getUserInfo().mid,
      listMap: [],
      rank: [],
      info:{},
      isShow: true,
      isTimeOut: false,
      timeOut:'',
      shareParam:{} // h5微信分享数据
    };
  },
  mounted() {
    // 获取元素
    this.$nextTick(()=>{
       this.dateEl = {
        d:document.querySelector('.d'),
        h:document.querySelector('.h'),
        m:document.querySelector('.m'),
        s:document.querySelector('.s')
      }
    })
    if (!sessionStorage.getItem("activityId")) {
      this.$layer.alert("参数错误", () => {
        this.$router.go(-1);
      });
    }
    this.getInit();
  },
  methods: {
    getInit() {
      getRankList({
        mapStr: JSON.stringify({
          activity_id: this.activityId,
          mid: this.mid,
          pageNum: "0"
        })
      }).then(res => {
        this.listMap = res.data;
        
        this.isJoin =
          JSON.stringify(this.listMap.mapRankingByIdList) == "{}"
            ? true
            : false;
        
        if(!this.isJoin)
        {
          this.info = this.listMap.mapRankingByIdList
          // 获取当前用户参赛数据(用于分享)
          this.listMap.getRankingList.forEach( val => {
            if(val.mid == this.$getUserInfo().mid)
            {
                let imgUrl = val.portrait.indexOf('http') != -1 ? val.portrait : 'http:' + val.portrait;
                let a_title = sessionStorage.getItem('a_title') || '投票';
                this.shareParam = {
                  title : '大尚国际-投票活动', // 分享标题
                  desc : `我正在参加${a_title}活动，快来帮我投一票吧！`, // 分享描述
                  link : `http://www.dusun.com.cn/openVote.do#/ActivityDetail?activity_id=${val.activity_id}&id=${val.id}&isShare=true`, // 分享链接
                  imgUrl, // 分享图标
                }
            }
          })
        }
        // this.listMap.getRankingList = [];
        if (this.listMap.getRankingList.length) {
          let imgs = [
            "./static/images/one.png",
            "./static/images/two.png",
            "./static/images/three.png"
          ];
          // 处理前三名的数据
          for (let i = 0; i < 3; i++) {
            if(this.listMap.getRankingList[i])
            {
               this.rank.push(this.listMap.getRankingList[i]);
            }else
            {
              this.rank.push({});
            }
            this.rank[i]['img'] = imgs[i]
          }
          var arr = this.rank[1];
          this.rank[1] = this.rank[0];
          this.rank[0] = arr;
        } else {
          this.isShow = false;
        }
         /* 解决ios时间乱码兼容 */
        res.data.mapRankingTime.start_time = res.data.mapRankingTime.start_time.replace(/\-/g, "/")
        res.data.mapRankingTime.end_time = res.data.mapRankingTime.end_time.replace(/\-/g, "/")
        //开始时间
        let start_time = new Date(
          res.data.mapRankingTime.start_time
        ).getTime();
        //结束时间
        let end_time = new Date(res.data.mapRankingTime.end_time).getTime();
        
        //当前时间
        let now = Date.now();
        //活动开始
        if (now > start_time) {
          //判断活动是否结束
          if (now > end_time) {
            //活动结束
            this.isOver = true;
            this.info.isOver = true
            sessionStorage.setItem("isTimeOut", 1);
          } else {
            //活动开始
            this.isStart = true;
            //活动进行中
            // res.data.mapRankingTime.end_time = '2019/12/27 14:28:05'
            this.handleCountDown(res.data.mapRankingTime.end_time);
          }
        } else {
          //未开始
          this.handleCountDown(res.data.mapRankingTime.start_time);
        }

        // 监听滚到底部
        this.onScrollBottom();
      });
    },
    sighUp() {
      if (this.isOver) {
        //活动结束
        this.$layer.alert("活动结束了");
      } else {
        // 活动列表
        this.$router.replace({
          path:"/ActivityList",
        })
      }
    },
    onScrollBottom() {
      const that = this;
      window.onscroll = function() {
        //变量scrollTop是滚动条滚动时，距离顶部的距离
        var scrollTop =
          document.documentElement.scrollTop || document.body.scrollTop;
        //变量windowHeight是可视区的高度
        var windowHeight =
          document.documentElement.clientHeight || document.body.clientHeight;
        //变量scrollHeight是滚动条的总高度
        var scrollHeight =
          document.documentElement.scrollHeight || document.body.scrollHeight;
        //滚动条到底部的条件
        if (scrollTop + windowHeight == scrollHeight) {
          if (
            parseInt(that.listMap.pageIndex) + 1 >=
            parseInt(that.listMap.pageCount)
          ) {
            return false;
          }
          getRankList({
            mapStr: JSON.stringify({
              activity_id: that.activityId,
              mid: that.mid,
              pageNum: parseInt(that.listMap.pageIndex) + 1
            })
          }).then(res => {
            res.data.getRankingList.forEach((v, i) => {
              that.listMap.getRankingList.push(v);
            });
            that.listMap.pageIndex = parseInt(res.data.pageIndex) + 1;
          });
        }
      };
    },
    //设置时间
    handleSetTime(time)
    {
        let dateTime = countDown(time);
        if(parseInt(dateTime.days)<=0 && parseInt(dateTime.hours)<=0 && parseInt(dateTime.minutes)<=0 && parseInt(dateTime.seconds)<=0 ){
          clearInterval(this.timeOut)
          this.info.isOver = true
          this.info = JSON.stringify(this.info)
          this.isOver = true;
        }
        this.dateEl.d.innerText = dateTime.days
        this.dateEl.h.innerText = dateTime.hours
        this.dateEl.m.innerText = dateTime.minutes
        this.dateEl.s.innerText = dateTime.seconds
    },
    //倒计时
    handleCountDown(time)
    {
        this.handleSetTime(time)
        this.timeOut = setInterval(() => {
            this.handleSetTime(time)
        },1000);
    },
  },
  beforeDestroy(){
    // 清除定时器
    clearInterval(this.timeOut)
  },
};
</script>

<style lang="scss" scoped>
@import "./css/style.scss";
</style>
