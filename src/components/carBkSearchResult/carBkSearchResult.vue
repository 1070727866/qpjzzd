<template>
  <div class="carBkMessage">
    <div style="height: 40px;line-height: 40px">
      <div style="float: left">车辆布控黑名单</div>
      <div style="float: right;margin-right: 10px;"><img src="../../assets/addBk.png" @click="addBkClick" height="30" width="100"/></div>
    </div>
    <el-table
      :data="list"
      stripe
      highlight-current-row
      ref="singleTable"
      @row-click="handleCarCurrentChange"
      :row-class-name="carRowClassName"
      header-cell-class-name="headerCss"
      class="myTable">

      <el-table-column prop="bksj" label="布控开始时间" width="188" v-if="false"></el-table-column>
      <el-table-column prop="bkjssj" label="布控结束时间" width="188" v-if="false"></el-table-column>
      <el-table-column prop="hphm" label="车牌号码" width="188">
        <template slot-scope="scope">
          <div :class="getPlateColor(scope.row.hpysmc)">{{scope.row.hphm}}</div>
        </template>
      </el-table-column>
      <el-table-column prop="lxr" label="联系人" width="188" ></el-table-column>
      <el-table-column prop="lxdh" label="联系电话" width="188"></el-table-column>
      <el-table-column prop="bjzlmc" label="布控类型" width="188" ></el-table-column>
      <el-table-column prop="bkdw" label="布控单位" width="188"></el-table-column>
      <el-table-column prop="bksj" label="布控时段" width="188" ></el-table-column>
      <el-table-column prop="bkyy" label="布控原因" width="188"></el-table-column>
      <el-table-column prop="xfzt" label="下发状态" width="188"></el-table-column>
      <el-table-column prop="yxzt" label="有效状态" width="188"></el-table-column>

      <el-table-column prop="reportStatus" label="操作" width="188">
        <template slot-scope="scope">
          <img @click.stop="revoke(scope.row)" style="vertical-align: middle;float: left" src="../../assets/btn_revoke.png" height="16" width="55"/>
          <img @click.stop="update(scope.row)" style="vertical-align: middle;float: right" src="../../assets/btn_update.png" height="16" width="56"/>
        </template>
      </el-table-column>
    </el-table>
    <Page :searchCount="searchCount" displayWhat="car"/>
    <AddDialog v-if="displayAddBkDialog" :displayDialog.sync="displayAddBkDialog" dialogTitle="车辆布控新增" :currentRow="currentRow" whatDialog="carAddBk" />
    <DetailBkDialog v-if="displayDetailBkDialog" :displayDialog.sync="displayDetailBkDialog" dialogTitle="车辆布控详情" :currentRow="currentRow" whatDialog="carAddBk" />
    <UpdateBkDialog v-if="displayUpdateDialog" :displayDialog.sync="displayUpdateDialog" dialogTitle="车辆布控修改" :currentRow="currentRow" whatDialog="carUpdateBk"/>
  </div>
</template>

<script>
  import AddDialog from '../addBkDialog/addBkDialog.vue';
  import DetailBkDialog from '../detailBkDialog/detailBkDialog.vue';
  import UpdateBkDialog from '../updateBkDialog/updateBkDialog.vue';
  import Page from '../page/page.vue';
  export default {
    name: "car-bk-search-result",
    components: {
      AddDialog,
      DetailBkDialog,
      UpdateBkDialog,
      Page
    },
    props: ['list','searchCount'],
    data() {
      return {
        displayAddBkDialog: false,
        displayDetailBkDialog:false,
        displayUpdateDialog:false,
        currentRow: ''
      }
    },
    methods: {
      carRowClassName({row, rowIndex}) {
        if (rowIndex % 2 != 0) {
          return 'blankingBg';
        } else {
          return 'el-table__row--striped';
        }
      },
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
      handleCarCurrentChange(currentRow) {
        console.log('点击行事件');
        this.currentRow = currentRow;
        this.displayDetailBkDialog = true;
      },
      update(currentRow){
        this.currentRow = currentRow;
        this.displayUpdateDialog = true;
      },
      addBkClick(){
        this.displayAddBkDialog = true;
      },
      revoke(row){
        alert('撤销了')
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../../publicCss/page.less";
  @import "../../publicCss/dialog.less";
  @import "../../publicCss/table.less";
  .carBkMessage{
    margin-top: 3rem;
    color: white;
  }
  .carBkMessage img{
    cursor: pointer;
  }
  /*设置表格头部的背景*/
  /deep/ .headerCss{
    text-align: center;
    width: 188px;
    height: 40px;
    background: url("../../assets/list_peopleBk_title.png") no-repeat;
  }
</style>
