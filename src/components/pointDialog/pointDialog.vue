<template>
  <div class="pointDialog" :class="className">
    <div style="font-size: 14px">{{titleName}}检查站每日统计</div>
    <div style="margin-left: 20px;line-height: 40px;height: 40px;">
      <div style="float: left">过车：{{list[0].carCount}}辆</div>
      <div style="float: right">人脸抓拍：{{list[0].faceCount}}张</div>
    </div>
    <div style="line-height: 40px;height: 40px;">
      <div style="float: left">车辆报警：{{list[0].carAlarmCount}}辆</div>
      <div style="float: right">车架人脸报警：{{list[0].carFaceAlarmCount}}张</div>
    </div>
    <div style="line-height: 40px;height: 40px;">
      <div style="float: left">手机报警：{{list[0].phoneAlarmCount}}次</div>
      <div style="float: right">动态人脸告警：{{list[0].dtrlFaceAlarmCount}}人</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "point-dialog",
    props: ['titleName','className','list']
  }
</script>

<style scoped>
  .pointDialog{
    background-color: rgba(62,74,125,0.7);
    width: 330px;
    height: 175px;
    padding: 20px;
    box-sizing: border-box;
    color: white;
    border-radius: 4px;
    position: absolute;
  }
  .baiheDiv{
    margin-left: 1133px;
    margin-top: 55px;
  }
  .zhaotunDiv{
    margin-left: 903px;
    margin-top: 45px;
  }
  .dayingDiv{
    margin-left: 867px;
    margin-top: 155px;
  }
  .yingdianDiv{
    margin-left: 940px;
    margin-top: 55px;
  }
  .xicenDiv{
    margin-left: 720px;
    margin-top: 9px;
  }
  .huyuDiv{
    margin-left: 782px;
    margin-top: 110px;
  }
  .jinzeDiv{
    margin-left: 770px;
    margin-top: 110px;
  }
  .sjhDiv{
    margin-left: 851px;
    margin-top: 248px;
  }
  .zhenyuDiv{
    margin-left: 772px;
    margin-top: 120px;
  }
</style>
