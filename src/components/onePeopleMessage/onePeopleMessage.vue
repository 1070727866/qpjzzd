<template>
    <div class="onePeopleMessage" >
      <div class="picAndWordDiv">
        <img :src="oneMessage.lrxzdt" height="175" width="130"/>
        <div class="picWord">抓拍图</div>
      </div>
      <div class="picAndWordDiv" style="margin-left: 20px;">
        <img :src="oneMessage.rlxzdt" height="175" width="130"/>
        <div class="picWord">布控图</div>
      </div>
      <div class="peopleMessageInput" >
        <InputTemplate inputName="检查站" :inputValue="oneMessage.stationName" isReadonly="true"/>
        <InputTemplate inputName="报警核实情况" :inputValue="oneMessage.gjhsmc" isReadonly="true"/>
        <InputTemplate inputName="姓名" :inputValue="oneMessage.rlxm" isReadonly="true"/>
      </div>
      <div class="peopleMessageInput">
        <InputTemplate inputName="报警种类" :inputValue="oneMessage.alarmTypeName" isReadonly="true"/>
        <InputTemplate inputName="告警时间" :inputValue="oneMessage.alarmTime" isReadonly="true"/>
        <InputTemplate inputName="身份证号码" :inputValue="oneMessage.rlsfz" isReadonly="true"/>
      </div>
      <div class="peopleMessageInput">
        <InputTemplate inputName="相似度" :inputValue="oneMessage.xsd" xsd="xsd" isReadonly="true"/>
        <InputTemplate inputName="车牌号" :inputValue="oneMessage.alarmTime" isReadonly="true"/>
        <div v-if="oneMessage.reportStatusCode==='1'" class="peopleReport" >
          <img src="../../assets/btn_unReport.png" height="30" width="100"/>
        </div>
        <div v-if="oneMessage.reportStatusCode==='0'" class="peopleReport" @click.stop="handleReportClick(oneMessage)" >
          <img src="../../assets/btn_report.png" height="30" width="100"/>
        </div>
      </div>
    </div>
</template>

<script>
  import InputTemplate from '../inputTemplate/inputTemplate.vue';
  import SelectTemplate from '../selectTemplate/selectTemplate.vue';
  import DateTimeTemplate from '../dateTimeTemplate/dateTimeTemplate.vue';
  import {mapMutations} from 'vuex'
  export default {
      name: "one-people-message",
      components:{
        InputTemplate,
        SelectTemplate,
        DateTimeTemplate
      },
      props:[
        'oneMessage',
        'displayDialog'
      ],
      data () {
        return {
        }
      },
      methods: {
        ...mapMutations(['updateDisplayPeopleReportDialog','updateCurrentPeopleReportMessage']),
        handleReportClick(item) {
          this.updateDisplayPeopleReportDialog(true);
          this.updateCurrentPeopleReportMessage(item);
        }
      }
    }
</script>

<style lang="less" scoped>
  @import '../../publicCss/publicCss.less';
  .onePeopleMessage{
    box-sizing: border-box;
    width: 93rem;
    height: 21rem;
    background: url("../../assets/bg_people.png") no-repeat;
    padding: 2rem;
    color: @grayColor;
    margin-top: 4rem;
    text-align: left;
    float: left;
    cursor: pointer;
  }
  /*选中信息背景色*/
  .selectPeopleMessage {
    background: url("../../assets/bg_peopleSelected.png") no-repeat;
  }
  /*设置每条信息左边间距*/
  .onePeopleMessage:nth-of-type(even){
    margin-left: 2rem;
  }
  /*设置额每条信息上边间距*/
  .onePeopleMessage:nth-of-type(1), .onePeopleMessage:nth-of-type(2){
    margin-top: 3rem;
  }
  .peopleReport{
    margin-top: 30px;
    float: right
  }
  /*每条信息每一列输入框样式*/
  .peopleMessageInput{
    float: left;
    margin-left: 40px;
    margin-top: -5px
  }

</style>
