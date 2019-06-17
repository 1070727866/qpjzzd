<template>
    <div id="top_menu" >
      <!--:default-active="activeIndex" this.$route.path-->
      <el-menu :default-active="this.$route.path" router class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <el-menu-item :index="'/shouye'">首页</el-menu-item>
        <el-submenu index="2">
          <template slot="title">告警信息统计</template>
          <el-menu-item v-for="(item, i) in firstItemList" :key="i" :index="item.path">
            {{item.secondMenuName}}
          </el-menu-item>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">卡口流量模型</template>
          <el-menu-item v-for="(item, i) in secondItemList" :key="i" :index="item.path">
            {{item.secondMenuName}}
          </el-menu-item>
        </el-submenu>
        <el-submenu index="4">
          <template slot="title">告警数据推送</template>
          <el-menu-item v-for="(item, i) in thirdItemList" :key="i" :index="item.path">
            {{item.secondMenuName}}
          </el-menu-item>
        </el-submenu>
        <el-submenu index="5">
          <template slot="title">设备故障模型</template>
          <el-menu-item v-for="(item, i) in fourItemList" :key="i" :index="item.path">
            {{item.secondMenuName}}
          </el-menu-item>
        </el-submenu>
        <el-submenu index="6">
          <template slot="title">人车布控中心</template>
          <el-menu-item v-for="(item, i) in fiveItemList" :key="i" :index="item.path">
            {{item.secondMenuName}}
          </el-menu-item>
        </el-submenu>
        <el-menu-item :index="'/kkpy'">卡口综合评优</el-menu-item>
      </el-menu>
      <div class="timeCss">{{nowTime}}</div>
      <div>
        <keep-alive>
          <router-view class="view"></router-view>
        </keep-alive>
      </div>
    </div>
</template>

<script>
  import {mapMutations} from 'vuex';
  export default {
      name: "top_menu",
      data() {
        return {
          activeIndex: '1',
          nowTime:'',
          timer:1,
          firstItemList:[
            {path:'/alarmMessageStatisticsPeople',secondMenuName:'人员告警'},
            {path:'/alarmMessageStatisticsCar',secondMenuName:'车辆告警'},
            {path:'/alarmMessageStatisticsPhone',secondMenuName:'手机告警'}
          ],
          secondItemList:[
            {path:'/handlePhone',secondMenuName:'过车流量'},
            {path:'/handlePhone',secondMenuName:'人证闸机'},
            {path:'/handlePeople',secondMenuName:'车底扫描'},
            {path:'/handlePhone',secondMenuName:'车牌归属地'}
          ],
          thirdItemList:[
            {path:'/handlePhone',secondMenuName:'告警信息'},
            {path:'/handlePeople',secondMenuName:'拦截信息'},
            {path:'/handlePhone',secondMenuName:'上报信息'}
          ],
          fourItemList:[
            {path:'/handlePhone',secondMenuName:'相机设备状态'},
            {path:'/handlePeople',secondMenuName:'服务运行状态'}
          ],
          fiveItemList:[
            {path:'/peopleBk',secondMenuName:'人员布控'},
            {path:'/carBk',secondMenuName:'车辆布控'}
          ],
          sixItemList:[
            {path:'/handlePhone',secondMenuName:'告警处置评优'},
            {path:'/handlePhone',secondMenuName:'设备保养评优'},
            {path:'/handlePhone',secondMenuName:'车道异常比评优'}
          ]
        };
      },
      mounted(){
        // this.timer = setInterval(this.setTime,1000)
      },
      methods:{
        ...mapMutations(['updateRouterIndex']),
        handleSelect (key, keyPath) {
          console.log(key, keyPath);
          this.updateRouterIndex(keyPath);
        },
        setTime () {
          let vWeek,weekIndex,vDay,year,month,day,hours,minutes,seconds;
          vWeek = ["星期天","星期一","星期二","星期三","星期四","星期五","星期六"];
          let date =  new Date();
          year = date.getFullYear();month = date.getMonth() + 1;day = date.getDate();hours = date.getHours();
          minutes = date.getMinutes();seconds = date.getSeconds();weekIndex = date.getDay();
          //小时,分钟,秒如果小于10加上前导零
          if (hours < 10) {hours = 0 + "" + hours;}
          if (minutes < 10) {minutes = 0 + "" + minutes;}
          if (seconds < 10) {seconds = 0 + "" + seconds;}
          //完整时间  + "\t" + vWeek[weekIndex]
          this.nowTime =  year + "年" + month + "月" + day + "日" + "\t" + hours + ":" + minutes +":" + seconds;
        }
      },
      beforeDestroy () {
        clearInterval(this.timer)
      }
    }
</script>

<style lang="less" scoped>
  @selectColor: #0084ff;
  @selectBackgroundColor:#000518;
  @whiteColor:white;
  @bigFontSize:16px;
  .view{
    padding-top: 100px;
  }
  #top_menu{
    background: transparent;
    margin-left: 555px;
  }
  .timeCss{
    float: left;color: white;margin-top: 30px;margin-left: 20px;
  }
</style>
<!--一定要全局变量才起作用-->
<style >
  .el-menu, .el-menu--horizontal>.el-menu-item:not(.is-disabled):focus, .el-menu--horizontal>.el-menu-item:not(.is-disabled):hover, .el-menu--horizontal>.el-submenu .el-submenu__title:hover{
    background-color: transparent !important;
  }
  .el-submenu__title {
    padding: 0 15px;
  }
  .el-menu--horizontal .el-menu .el-menu-item {
    background-color: #000518;
    color: white;
    height: 40px;
    line-height: 40px;
    width: 140px;
  }
</style>
<style lang="less" scoped>
  .el-menu--horizontal .el-menu .el-menu-item {
    background-color: #000518;
    color: white;
    text-align: center;
  }
  .el-menu--horizontal .el-menu .el-menu-item:hover{
    color: #0084ff;
  }
  .el-menu-demo {
    margin-top: 10px;
  }
  /deep/ .el-menu{
    background-color: transparent;
  }
  #top_menu {
    /deep/ .el-menu--horizontal > .el-menu-item.is-active,
    /deep/ .el-menu--horizontal > .el-menu-item {
      color: white;
      font-size: 16px;
    }
    .el-menu--horizontal > .el-menu-item:not(.is-disabled):focus,
    .el-menu--horizontal > .el-menu-item:not(.is-disabled):hover,
    .el-menu--horizontal > .el-submenu .el-submenu__title:hover {
      background-color: #000518;
      color: #0084ff;
    }

    /*设置导航栏的样式*/
    /deep/ .el-menu.el-menu--horizontal {
      border-bottom: none;
      width: 1070px;
      z-index: 999;
      float: left;
    }

    /*设置导航栏字体样式*/
    /deep/ .el-submenu__title,
    /deep/ .el-menu--horizontal > .el-submenu .el-submenu__title,
    /deep/ .el-submenu__title i {
      color: white;
      font-size: 16px;
    }

    /deep/ .el-menu--horizontal > .el-submenu .el-submenu__title:hover {
      background-color: #000518;
      color: #0084ff;
    }

  }

</style>
