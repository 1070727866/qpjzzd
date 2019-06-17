<template>
  <div id="shouye">
    <div style="float: left;opacity: 0;">
      <iframe src="http://15.225.229.69:8888/qp/qpleft/index.html"
              style="width: 720px;height: 1090px;background-color:transparent"
              align="center" scrolling="no"
              frameborder="0" allowTransparency="true"
              class="iframe">
      </iframe>
    </div>
    <div style="float: right;opacity: 0;">
      <iframe src="http://15.225.229.69:8888/qp/qpright/index.html"
              style="width: 720px;height: 1090px;background-color:transparent"
              align="center" scrolling="no"
              frameborder="0" allowTransparency="true"
              class="iframe">
      </iframe>
    </div>
    <div style="position: absolute;margin-top: 800px;margin-left: 475px;opacity: 0;">
      <iframe src="http://15.225.229.69:8888/qp/bottom/threeVideo.html"
              style="width: 970px;height: 270px;background-color:transparent"
              align="center" scrolling="no"
              frameborder="0" allowTransparency="true"
              class="iframe">
      </iframe>
    </div>
    <div id="mapPoint">
      <PointDialog v-if="ifBaihe" titleName="白鹤" :list="stationsList" className="baiheDiv" />
      <div class="baihe"><img @mouseover="displayDiv(['baihe','310229001'])" @mouseleave="noDisplayDiv('baihe')" src="../../assets/point.png" height="33" width="38"/>白鹤</div>
      <PointDialog v-if="ifZhaotun" titleName="赵屯" :list="stationsList" className="zhaotunDiv" />
      <div class="zhaotun"><img @mouseover="displayDiv(['zhaotun','310229002'])" @mouseleave="noDisplayDiv('zhaotun')" src="../../assets/point.png" height="33" width="38"/>赵屯</div>
      <PointDialog v-if="ifHuchang" titleName="沪常" :list="stationsList" className="huchangDiv" />
      <div class="huchang"><img @mouseover="displayDiv(['huchang','310229007'])" @mouseleave="noDisplayDiv('huchang')" src="../../assets/point.png" height="33" width="38"/>沪常</div>
      <PointDialog v-if="ifDaying" titleName="大盈" :list="stationsList" className="dayingDiv" />
      <div class="daying"><img @mouseover="displayDiv(['daying','310229003'])" @mouseleave="noDisplayDiv('daying')" src="../../assets/point.png" height="33" width="38"/>大盈</div>
      <PointDialog v-if="ifYingdian" titleName="盈淀" :list="stationsList" className="yingdianDiv" />
      <div class="yingdian"><img @mouseover="displayDiv(['yingdian','310229010'])" @mouseleave="noDisplayDiv('yingdian')" src="../../assets/point.png" height="33" width="38"/>盈淀</div>
      <PointDialog v-if="ifXicen" titleName="西岑" :list="stationsList" className="xicenDiv" />
      <div class="xicen"><img @mouseover="displayDiv(['xicen','310229004'])" @mouseleave="noDisplayDiv('xicen')" src="../../assets/point.png" height="33" width="38"/>西岑</div>
      <PointDialog v-if="ifHuyu" titleName="沪渝" :list="stationsList" className="huyuDiv" />
      <div class="huyu"><img @mouseover="displayDiv(['huyu','310229006'])" @mouseleave="noDisplayDiv('huyu')" src="../../assets/point.png" height="33" width="38"/>沪渝</div>
      <PointDialog v-if="ifJinze" titleName="金泽" :list="stationsList" className="jinzeDiv" />
      <div class="jinze"><img @mouseover="displayDiv(['jinze','310229005'])" @mouseleave="noDisplayDiv('jinze')"src="../../assets/point.png" height="33" width="38"/>金泽</div>
      <PointDialog v-if="ifSjh" titleName="申嘉湖" :list="stationsList" className="sjhDiv" />
      <div class="sjh"><img @mouseover="displayDiv(['sjh','310229009'])" @mouseleave="noDisplayDiv('sjh')" src="../../assets/point.png" height="33" width="38"/>申嘉湖</div>
      <PointDialog v-if="ifZhenyu" titleName="蒸俞" :list="stationsList" className="zhenyuDiv" />
      <div class="zhengyu"><img @mouseover="displayDiv(['zhenyu','310229032'])" @mouseleave="noDisplayDiv('zhenyu')" src="../../assets/point.png" height="33" width="38"/>蒸俞</div>
    </div>
  </div>

</template>

<script>
  import PointDialog from '../pointDialog/pointDialog.vue';
  import {mapStationApi} from '../../request/api';
  export default {
    name: "left",
    components:{
      PointDialog
    },
    data(){
      return{
        ifBaihe:false,
        ifZhaotun:false,
        ifHuchang:false,
        ifDaying:false,
        ifYingdian:false,
        ifXicen:false,
        ifHuyu:false,
        ifJinze:false,
        ifSjh:false,
        ifZhenyu:false,
        mapStationList:[],
        stationsList:[]
      }
    },
    mounted(){
      this.getMapStationMessage();
    },
    methods:{
      //获取当前时间，格式YYYY-MM-DD
      getNowFormatDate() {
        let date = new Date();
        let seperator1 = "-";
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let strDate = date.getDate();
        if (month >= 1 && month <= 9) {
          month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
          strDate = "0" + strDate;
        }
        let currentdate = year + seperator1 + month + seperator1 + strDate;
        return currentdate;
      },
      getMapStationMessage(){
        mapStationApi({"dayTime":this.getNowFormatDate()}).then(res => {
          this.mapStationList = res.content
        })
      },

      displayDiv(e){
        console.log(e[1]);
        this.stationsList = this.mapStationList.filter(function (res) {
          return res.dkdm == e[1]
        });
        console.log(this.stationsList);
        switch (e[0]) {
          case 'baihe':this.ifBaihe = true;break;
          case 'zhaotun':this.ifZhaotun = true;break;
          case 'huchang':this.ifHuchang = true;break;
          case 'daying':this.ifDaying = true;break;
          case 'yingdian':this.ifYingdian = true;break;
          case 'xicen':this.ifXicen = true;break;
          case 'huyu':this.ifHuyu = true;break;
          case 'jinze':this.ifJinze = true;break;
          case 'sjh':this.ifSjh = true;break;
          case 'zhenyu':this.ifZhenyu = true;break;
            default:
              return
          }
      },
      noDisplayDiv(e){
        switch (e) {
          case 'baihe':this.ifBaihe = false;break;
          case 'zhaotun':this.ifZhaotun = false;break;
          case 'huchang':this.ifHuchang = false;break;
          case 'daying':this.ifDaying = false;break;
          case 'yingdian':this.ifYingdian = false;break;
          case 'xicen':this.ifXicen = false;break;
          case 'huyu':this.ifHuyu = false;break;
          case 'jinze':this.ifJinze = false;break;
          case 'sjh':this.ifSjh = false;break;
          case 'zhenyu':this.ifZhenyu = false;break;
          default:
            return
        }
      }
    }
  }
</script>

<style scoped>
  .iframe{
    outline: none;border: none;overflow: hidden;padding:0;
    background: transparent;
  }
  #shouye{
    z-index: 99;
    width: 1920px;
    height: 990px;
    box-sizing: border-box;
    margin-left: -55.5rem;
    position: absolute;
    margin-top: -9.2rem;
  }
  #mapPoint{
    z-index: 1;
  }

  #mapPoint>div{
    z-index: 999;
    color: white;
    font-size: 14px;
    font-family: "Microsoft YaHei UI";
  }
  .baihe{
    margin-left: 1138px;
    margin-top: 107px;
    width: 50px;
    cursor: pointer;
  }
  .zhaotun{
    margin-left: 825px;
    margin-top: 2px;
    cursor: pointer;
  }
  .huchang{
    margin-left: 825px;
    margin-top: 43px;
    cursor: pointer;
  }
  .daying{
    margin-left: 867px;
    margin-top: 39px;
    cursor: pointer;
  }
  .yingdian{
    margin-left: 1049px;
    margin-top: 18px;
    cursor: pointer;
  }
  .xicen{
    margin-left: 700px;
    margin-top: 189px;
    position: absolute;
    cursor: pointer;
  }
  .huyu{
    margin-left: 682px;
    margin-top: 233px;
    position: absolute;
    cursor: pointer;
  }
  .jinze{
    margin-left: 675px;
    margin-top: 281px;
    position: absolute;
    cursor: pointer;
  }
  .sjh{
    margin-left: 656px;
    margin-top: 313px;
    position: absolute;
    cursor: pointer;
  }
  .zhengyu{
    margin-left: 778px;
    margin-top: 308px;
    position: absolute;
    cursor: pointer;
  }
</style>
