<template>
    <div class="secondMenuFatherDiv">
      <div class="kkpyCondition">
        <div class="timeWord">选择时段</div>
        <div class="selectTime">
          <el-date-picker
            @change="handleTime"
            v-model="value"
            type="daterange"
            align="right"
            size="small"
            value-format=" yyyy-MM-dd"
            format="yyyy-MM-dd"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions">
          </el-date-picker>
        </div>
        <div class="pySearch">
          <img src="../../assets/btn_search.png" style="margin-top: 5px;" @click="handleSearch" height="30" width="100"/>
        </div>
      </div>
      <div class="gjczDiv">
        <div class="pyTitle">告警处置评优</div>
        <div class="gjcz" >
          <div class="sort_icon">
            <img src="../../assets/1.png" height="26" width="30"/>
            <img src="../../assets/2.png" height="26" width="30"/>
            <img src="../../assets/3.png" height="26" width="30"/>
            <img src="../../assets/4.png" height="26" width="30"/>
            <img src="../../assets/5.png" height="26" width="30"/>
            <img src="../../assets/6.png" height="26" width="30"/>
            <img src="../../assets/7.png" height="26" width="30"/>
            <img src="../../assets/8.png" height="26" width="30"/>
            <img src="../../assets/9.png" height="26" width="30"/>
            <img src="../../assets/10.png" height="26" width="30"/>
          </div>
          <div style="width: 740px;height: 450px;float: left" ref="gjcz"></div>
        </div>
      </div>
      <div class="cdycbDiv">
        <div class="pyTitle">车道异常比评优</div>
        <div class="cdycb" >
          <div style="width: 940px;height: 475px;float: left;" ref="cdycb"></div>
        </div>
      </div>

      <div class="sbbyDiv">
        <div class="pyTitle">设备保养评优</div>
        <div class="sbby" >
          <div style="width: 1820px;height: 280px;float: left;" ref="sbby"></div>
        </div>
      </div>
    </div>
</template>

<script>
  import echarts from 'echarts/lib/echarts'
  import 'echarts/lib/component/legend'
  import 'echarts/lib/component/toolbox'
  import 'echarts/lib/component/tooltip'
  import 'echarts/lib/chart/bar'
  import 'echarts/lib/chart/line'
  import 'echarts/lib/component/title'
  import 'echarts/lib/component/dataZoom'
  export default {
    name: "kkpy",
    data() {
      return {
        value: '选择开始时间',
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        }
      }
    },
    methods: {
      //时间改变赋值
      handleTime(e) {

      },
      handleSearch() {

      },
      setColor(params){
        //颜色渐变，右/下/左/上，从下往上渐变
        return new echarts.graphic.LinearGradient(0, 0, 1, 1, [
          {offset: 0, color: params[0]},
          {offset: 1, color: params[1]},
        ]);
      }
    },
    mounted() {
      const that = this;
      const legendStyle = {color: '#fff', fontSize: 12};
      const axisLabelStyle = {
        formatter: '{value}',
        textStyle: {
          color: '#fff'
        }
      }
      /*告警处置评优ECharts图表*/
      const gjczYData = ['检查站1','检查站2','检查站3','检查站4','检查站5', '检查站6','检查站7','检查站8','检查站9','检查站10'];
      const gjczTimeData = [320, 302, 301, 334, 390, 330, 320,390, 330, 320];
      const gjczCountData = [120, 132, 101, 134, 90, 230, 210,390, 330, 320];
      const gjczChart = echarts.init(this.$refs.gjcz);
      const gjczOption = {
        tooltip : {
          trigger: 'axis',
          axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'none'        // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          data: ['时长', '处置次数'],
          bottom:'90%',
          textStyle:legendStyle
        },
        grid: {
          left: '1%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis:  {
          type: 'value',
          axisTick:{       //x轴刻度线
            "show":false
          },
          splitLine: {     //网格线
            "show": false
          },
          axisLine:{       //y轴
            "show":true,
            lineStyle:{
              color:'rgba(0,175,255,0.4)',
              width:4
            }
          },
          axisLabel : {
            formatter: '{value}',
            textStyle: {
              color: '#fff'
            }
          }
        },
        yAxis: {
          type: 'category',
          data: gjczYData,
          axisTick: {"show": false},//y轴刻度线
          splitLine: {"show": false},//网格线
          axisLine:{"show":false},//y轴
          axisLabel : axisLabelStyle
        },
        series: [
          {
            name: '时长',
            type: 'bar',
            stack: '总量',
            barWidth: 10,
            data: gjczTimeData,
            itemStyle: {
              normal: {
                color:this.setColor(['#f9b401','rgba(155,144,0,0.6)'])
              }
            }
          },
          {
            name: '处置次数',
            type: 'bar',
            stack: '总量',
            barWidth: 10,
            data: gjczCountData,
            itemStyle: {
              normal: {
                color:this.setColor(['#00ffed','rgba(0,174,255,0.1)'])
              }
            }
          }
        ]
      };
      gjczChart.setOption(gjczOption);

      /*车道异常评优ECharts图表*/
      const ycbXData = ['检查站1', '检查站2', '检查站3', '检查站4', '检查站5', '检查站6', '检查站7', '检查站8', '检查站9', '检查站10'];
      const maxPercent = 100 ;//左边纵坐标 最大的百分比
      const maxCount = 400 ;//右边纵坐标 最大的案件数
      const percentData = [90, 30, 6, 2, 11, 22, 8, 5, 9, 6];
      const countData = [10, 52, 200, 334, 390, 330, 220, 390, 330, 220];
      const ycbChart = echarts.init(this.$refs.cdycb);
      const ycbOption = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#283b56'
            }
          }
        },
        legend: {
          data: ['异常告警占比', '异常告警件数'],
          bottom: '92%',
          textStyle: legendStyle
        },
        xAxis: [
          {
            type: 'category',
            data: ycbXData,
            axisTick: {"show": false},//x轴刻度线
            splitLine: {"show": false},//网格线
            axisLine: {"show": true, lineStyle: {color: 'rgba(0,175,255,0.4)', width: 4}},//y轴
            axisLabel: axisLabelStyle
          },
          {
            type: 'category',
          }
        ],
        yAxis: [
          {
            type: 'value',
            scale: true,
            name: '占比(百分比%)',
            max: maxPercent,
            min: 0,
            axisTick: {"show": false},//y轴刻度线
            splitLine: {"show": true, lineStyle: {color: ['#46536c'], width: 0.5, type: 'dash'}},//网格线
            axisLine: {"show": false,lineStyle:{color:'white', width:2}},//y轴
            axisLabel: axisLabelStyle
          },
          {
            type: 'value',
            scale: true,
            name: '案件数(件)',
            max: 400,
            min: 0,
            axisTick: {"show": false},//y轴刻度线
            splitLine: {"show": false},//网格线
            axisLine: {"show": false, lineStyle:{color:'white', width:2}},//y轴
            axisLabel: axisLabelStyle
          }
        ],
        series: [
          {
            name: '异常告警占比',
            type: 'bar',
            data: percentData,
            barWidth: 22,
            itemStyle: {
              normal: {
                color:this.setColor(['rgba(0,174,255,0.1)','#00ffed'])
              }
            }
          },
          {
            name: '异常告警件数',
            type: 'line',
            xAxisIndex: 1,
            yAxisIndex: 1,
            data: countData,
            barWidth: 22,
            itemStyle: {
              normal: {
                color: '#f6ff00'
              }
            }
          }

        ]
      };
      ycbChart.setOption(ycbOption);

      /*设备保养评优ECharts图表*/
      const sbbyXData = ['检查站1', '检查站2', '检查站3', '检查站4', '检查站5', '检查站6', '检查站7', '检查站8', '检查站9', '检查站10'];
      const maxGrade = 100 ;//左边纵坐标 最大的分数
      const maxBreakdownDevice = 500;//右边纵坐标 最大的故障设备数量
      const gradeData = [100, 90, 80, 2, 11, 22, 8, 5, 9, 6];
      const breakdownDeviceData = [10, 52, 200, 334, 390, 330, 220, 390, 330, 220];
      const sbbyChart = echarts.init(this.$refs.sbby);
      const sbbyOption = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#283b56'
            }
          },
          formatter:function(params){
            const gzsb = params[0].name+"<br>"+params[0].seriesName+":"+params[0].data+"<br>";
            if(params[1].data>=81 && params[1].data<=100){
              return gzsb+'评分：优(81-100):'+params[1].data
            }else if(params[1].data>=61 && params[1].data<=80){
              return gzsb+'评分：良(61-80):'+params[1].data
            }else if(params[1].data>=0 && params[1].data<=60){
              return gzsb+'评分：差(0-60):'+params[1].data
            }
          },
        },
        legend: {
          data: [{name:'故障设备数(台)',textStyle: {color: 'white'}},'评分：优(81-100)','评分：良(61-80)',,'评分：差(0-60)'],
          bottom: '88%',
          textStyle: legendStyle
        },
        xAxis: [
          {
            type: 'category',
            data: sbbyXData,
            axisTick: {"show": false},//x轴刻度线
            splitLine: {"show": false},//网格线
            axisLine: {"show": true, lineStyle: {color: 'rgba(0,175,255,0.4)', width: 4}},//y轴
            axisLabel: axisLabelStyle
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '评优分数',
            max: maxGrade,
            min: 0,
            position:'left',
            axisTick: {"show": false},//y轴刻度线
            splitLine: {"show": true, lineStyle: {color: ['#46536c'], width: 0.5, type: 'dash'}},//网格线
            axisLine: {show: false, lineStyle:{color:'#f8b402', width:1}},//y轴
            axisLabel: {formatter: '{value}', textStyle: {color: '#f8b402'}}
          },
          {
            type: 'value',
            scale: true,
            name: '故障设备(台)',
            max: maxBreakdownDevice,
            min: 0,
            position:'right',
            axisTick: { "show": false},//y轴刻度线
            splitLine: {"show": false},//网格线
            axisLine: {"show": false, "lineStyle":{color:'white', width:2}},//y轴
            axisLabel: axisLabelStyle
          }
        ],
        series: [
          {
            name: '故障设备数(台)',
            type: 'bar',
            yAxisIndex: 1,
            data: breakdownDeviceData,
            barWidth: 22,
            itemStyle: {
              normal: {
                color:this.setColor(['rgba(255,180,0,0.1)','#d2ff00'])
              }
            }
          },
          {
            name: '评分：优(81-100)',
            type: 'bar',
            data: gradeData,
            barWidth: 22,
            itemStyle:{
              normal:{
                color:function(params){
                  if(params.value >=81 && params.value <=100){
                    return new echarts.graphic.LinearGradient(0, 0, 1, 1, [
                      {offset: 0, color: 'rgba(0,174,255,0.1)'},
                      {offset: 1, color: '#00ffed'},
                    ]);
                  }else if(params.value >=61 && params.value<=80 ){
                    return new echarts.graphic.LinearGradient(0, 0, 1, 1, [
                      {offset: 0, color: 'rgba(255,144,0,0.1)'},
                      {offset: 1, color: '#f9b401'},
                    ]);
                  }else if(params.value >=0 && params.value<=60){
                    return new echarts.graphic.LinearGradient(0, 0, 1, 1, [
                      {offset: 0, color: 'rgba(255,0,0,0.1)'},
                      {offset: 1, color: '#bd0000'},
                    ]);
                  }
                }
              }
            }
          },
          {
            name: '评分：良(61-80)',
            type: 'bar',
            barWidth: 0,
            itemStyle: {
              normal: {
                color:this.setColor(['rgba(255,144,0,0.1)','#f9b401'])
              }
            }
          },
          {
            name: '评分：差(0-60)',
            type: 'bar',
            barWidth: 0,
            itemStyle: {
              normal: {
                color:this.setColor(['rgba(255,0,0,0.1)','#bd0000'])
              }
            }
          }
        ]
      };
      sbbyChart.setOption(sbbyOption);
    }
  }
</script>

<style lang="less" scoped>
  @import "../../publicCss/publicCss.less";
  @import "../../publicCss/time.less";
  /deep/ .el-range-editor{
    color: @whiteColor;
    height: 3.2rem;
    line-height: 3.2rem;
    width: 370px;
    background: url("../../assets/bg_time.png") no-repeat;
  }
  /*查询条件样式*/
  .kkpyCondition{
    height: 4rem;
    line-height: 4rem;
    color: @grayColor;
  }
  .timeWord{
    margin-left: 0px;
  }
  .pySearch{
    float: left;
    margin-left: 3rem;
    height: 40px;
  }
  /*告警处置样式*/
  .gjczDiv{
    float: left;
  }
  .gjcz{
    width: 92.8rem;
    height: 45.4rem;
    box-sizing: border-box;
    background: url("../../assets/bg_gjcz.png") no-repeat;
    padding-left: 3rem;
  }
  .pyTitle{
    color: @whiteColor;
    font-size: @bigFontSize;
    text-align: left;
    width: 20rem;
    margin-top: 4rem;
    margin-bottom: 2rem;
  }
  .sort_icon{
    float: left;
    margin-top: 65px
  }
  .sort_icon img{
    display: block;
    margin-bottom: 10px;
  }
  /*车道异常比样式*/
  .cdycbDiv{
    float: left;
    margin-left: 2rem;
  }
  .cdycb{
    width: 92.8rem;
    height: 45.4rem;
    box-sizing: border-box;
    background: url("../../assets/bg_ycb.png") no-repeat;
    padding-left: 0rem;
  }
  /*设备保养样式*/
  .sbby{
    width: 187.7rem;
    height: 30.1rem;
    box-sizing: border-box;
    background: url("../../assets/bg_sbby.png") no-repeat;
    padding-left: 0rem;
    padding-top: 1rem;
  }
</style>

