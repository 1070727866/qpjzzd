<template>
    <div class="phoneMessage">
      <el-table
        :data="list"
        stripe
        highlight-current-row
        ref="singleTable"
        @row-click="handlePhoneCurrentChange"
        :row-class-name="phoneRowClassName"
        header-cell-class-name="headerCss"
        class="myTable">
        <el-table-column prop="picVehicle" label="车辆图片" width="209" v-if="false" ></el-table-column>
        <el-table-column prop="plateInfo" label="车牌图片" width="209" v-if="false"></el-table-column>
        <el-table-column prop="czjgmc" label="处置结果" width="209" v-if="false"></el-table-column>
        <el-table-column prop="plateColor" label="车牌颜色" width="209" v-if="false"></el-table-column>
        <el-table-column prop="reportStatusCode" label="处理状态" width="209" v-if="false"></el-table-column>

        <el-table-column prop="alarmTypeName" label="报警种类" width="209" v-if="false"></el-table-column>
        <el-table-column prop="jgsj" label="经过时间" width="209" v-if="false"></el-table-column>
        <el-table-column prop="bkr" label="布控人" width="209" v-if="false"></el-table-column>
        <el-table-column prop="lxr" label="联系人" width="209" v-if="false"></el-table-column>

        <el-table-column prop="bkdw" label="布控单位" width="209" v-if="false"></el-table-column>
        <el-table-column prop="lxdw" label="联系单位" width="209" v-if="false"></el-table-column>
        <el-table-column prop="bksj" label="不空时间" width="209" v-if="false"></el-table-column>

        <el-table-column prop="stationName" label="检查站" width="209"></el-table-column>
        <el-table-column prop="laneId" label="车道号" width="209"></el-table-column>
        <el-table-column prop="xsfxmc" label="行驶方向" width="209"></el-table-column>
        <el-table-column prop="plateInfo" label="车牌号码" width="209">
          <template slot-scope="scope">
            <div :class="getPlateColor(scope.row.plateColor)">{{scope.row.plateInfo}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="alarmTypeName" label="报警种类" width="209"></el-table-column>
        <el-table-column prop="gjhsmc" label="报警核实情况" width="209"></el-table-column>
        <el-table-column prop="alarmTime" label="告警时间" width="209"></el-table-column>
        <el-table-column prop="imsi" label="IMSI" width="209"></el-table-column>
        <el-table-column prop="reportStatus" label="处理状态">
          <template slot-scope="scope">
            <img v-if="scope.row.reportStatusCode=='0'"
                 @click.stop="getMore(scope.row)"
                 style="vertical-align: middle;"
                 src="../../assets/report.png" height="30" width="100"/>
            <div v-if="scope.row.reportStatusCode=='1'">已上报</div>
          </template>
        </el-table-column>
      </el-table>
      <Page :searchCount="searchCount" displayWhat="phone"/>
      <DetailDialog v-if="displayDetailDialog" :displayDialog.sync="displayDetailDialog" dialogTitle="手机告警记录详情" :currentRow="currentRow" whatDialog="phone" />
      <ReportDialog v-if="displayReportDialog" :displayDialog.sync="displayReportDialog" dialogTitle="手机告警上报信息" :currentRow="currentRow" whatDialog="phone" />
    </div>
</template>

<script>
  import DetailDialog from '../detailDialog/detailDialog.vue';
  import ReportDialog from '../reportDialog/reportDialog.vue';
  import Page from '../page/page.vue';
  export default {
    name: "alarm-phone-search-result",
    components:{
      DetailDialog,
      ReportDialog,
      Page
    },
    props:['list','searchCount'],
    data(){
        return{
          displayDetailDialog: false,
          displayReportDialog:false,
          currentRow: ''
        }
    },
    methods: {
      //判断车牌颜色 蓝色 黄色 白色 黑色 绿色 民航黑色 其他颜色
      getPlateColor(e){
        switch (e){
          case '蓝色车牌':return 'cphmPublicCss blueCphm';
          case '黄色车牌': return 'cphmPublicCss yellowCphm';
          case '白色车牌': return 'cphmPublicCss whiteCphm';
          case '黑色车牌':return 'cphmPublicCss blackCphm';
          case '绿色车牌': return 'cphmPublicCss greenCphm';
          case '民航黑色车牌': return 'cphmPublicCss mhBlackCphm';
          default: return 'cphmPublicCss otherCphm';
        }
      },
      phoneRowClassName({row, rowIndex}) {
        if (rowIndex % 2 != 0) {
          return 'blankingBg';
        } else {
          return 'el-table__row--striped';
        }
      },
      handlePhoneCurrentChange(currentRow) {
        console.log('点击行事件');
        console.log(currentRow);
        this.currentRow = currentRow;
        this.displayDetailDialog = true;
      },
      getMore(row) {
        console.log('上报点击事件');
        this.currentRow = row;
        this.displayReportDialog = true;
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../../publicCss/page.less";
  @import "../../publicCss/dialog.less";
  @import "../../publicCss/table.less";
  .phoneMessage{
    margin-top: 3rem;
  }
  /*设置表格头部的背景*/
  /deep/ .headerCss{
    background: url("../../assets/bg_phone_list_title.png") no-repeat;
  }
</style>
