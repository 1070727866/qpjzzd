<template>
  <div class="oneCarMessage" :class="displayBorder ? 'addBorders' : 'removeBorders'" @mouseover="addBorder()" @mouseout="removeBorder()">
    <div class="carAndPlate">
      <img :src="oneMessage.picVehicle" height="170" width="220"/>
      <div class="plateDiv">{{oneMessage.plateInfo}}</div>
    </div>
    <div style="float: left; margin-left: 20px">
      <InputTemplate inputName="检查站" :inputValue="oneMessage.stationName"></InputTemplate>
      <InputTemplate inputName="告警时间" :inputValue="oneMessage.alarmTime"></InputTemplate>
      <InputTemplate inputName="车牌号码" :inputValue="oneMessage.plateInfo"></InputTemplate>
    </div>
    <div style="float: left; margin-left: 10px">
      <InputTemplate inputName="车道号" :inputValue="oneMessage.laneId"></InputTemplate>
      <InputTemplate inputName="行驶方向" :inputValue="oneMessage.xsfxmc"></InputTemplate>
      <InputTemplate inputName="处置类型" :inputValue="oneMessage.czjgmc"></InputTemplate>
    </div>
    <div style="float: left; margin-left: 10px">
      <InputTemplate inputName="报警种类" :inputValue="oneMessage.alarmTypeName"></InputTemplate>
      <InputTemplate inputName="报警核实情况" :inputValue="oneMessage.gjhsmc"></InputTemplate>
    </div>
  </div>
</template>

<script>
  import InputTemplate from '../inputTemplate/inputTemplate.vue';
  export default {
    name: "one-car-message",
    components:{
      InputTemplate
    },
    props:[
      'oneMessage'
    ],
    data () {
      return {
        carPic:require('../../assets/car.png'),
        displayBorder:false
      }
    },
    methods: {
      addBorder(){
        this.displayBorder = true;
      },
      removeBorder(){
        this.displayBorder = false;
      }
    }
  }
</script>

<style lang="less" scoped>
  @import '../../publicCss/publicCss.less';
  .oneCarMessage{
    box-sizing: border-box;
    width: 93rem;
    height: 21rem;
    background-color: @backgroundColor;
    padding: 2rem;
    color: @grayColor;
    margin-top: 2rem;
    text-align: left;
    float: left;
  }
  .oneCarMessage:nth-of-type(even){
    margin-left: 2rem;
  }
  .oneCarMessage:nth-of-type(1), .oneCarMessage:nth-of-type(2){
    margin-top: 0;
  }
</style>
