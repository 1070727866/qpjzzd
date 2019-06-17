<template>
  <div class="peopleBkMessage">
    <div style="height: 40px;line-height: 40px">
      <div style="float: left">人员布控黑名单</div>
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

      <el-table-column prop="zp" label="照片" width="188" v-if="false"></el-table-column>
      <el-table-column prop="bksj" label="布控开始时间" width="188" v-if="false"></el-table-column>
      <el-table-column prop="bkjssj" label="布控结束时间" width="188" v-if="false"></el-table-column>
      <el-table-column prop="xm" label="姓名" width="88" ></el-table-column>
      <el-table-column prop="sfzh" label="身份证" width="188"></el-table-column>
      <el-table-column prop="lxr" label="联系人" width="188" ></el-table-column>
      <el-table-column prop="lxdh" label="联系电话" width="188"></el-table-column>
      <el-table-column prop="bjzl" label="布控类型" width="188" ></el-table-column>
      <el-table-column prop="bkdw" label="布控单位" width="188"></el-table-column>
      <el-table-column prop="bksd" label="布控时段" width="188" ></el-table-column>
      <el-table-column prop="bkyy" label="布控原因" width="188"></el-table-column>
      <el-table-column prop="xfzt" label="下发状态" width="188"></el-table-column>
      <el-table-column prop="yxzt" label="有效状态" width="100"></el-table-column>

      <el-table-column prop="reportStatus" label="操作" width="188">
        <template slot-scope="scope">
            <img @click.stop="revoke(scope.row)" style="vertical-align: middle;float: left" src="../../assets/btn_revoke.png" height="16" width="55"/>
            <img @click.stop="update(scope.row)" style="vertical-align: middle;float: right" src="../../assets/btn_update.png" height="16" width="56"/>
        </template>
      </el-table-column>
    </el-table>
    <Page :searchCount="searchCount" displayWhat="car"/>
    <AddDialog v-if="displayAddBkDialog" :displayDialog.sync="displayAddBkDialog" dialogTitle="人员布控新增" :currentRow="currentRow" whatDialog="peopleAddBk" />
    <DetailBkDialog v-if="displayDetailBkDialog" :displayDialog.sync="displayDetailBkDialog" dialogTitle="人员布控详情" :currentRow="currentRow" whatDialog="peopleDetailBk" />
    <UpdateBkDialog v-if="displayUpdateDialog" :displayDialog.sync="displayUpdateDialog" dialogTitle="人员布控修改" :currentRow="currentRow" whatDialog="peopleUpdateBk"/>
  </div>
</template>

<script>
  import AddDialog from '../addBkDialog/addBkDialog.vue';
  import DetailBkDialog from '../detailBkDialog/detailBkDialog.vue';
  import UpdateBkDialog from '../updateBkDialog/updateBkDialog.vue';
  import Page from '../page/page.vue';
  export default {
    name: "people-bk-search-result",
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
      handleCarCurrentChange(currentRow) {
        console.log('点击行事件');
        this.currentRow = currentRow;
        this.displayDetailBkDialog = true;
      },
      addBkClick(){
        this.displayAddBkDialog = true;
      },
      revoke(currentRow){
        alert('撤销了')
      },
      update(currentRow){
        this.currentRow = currentRow;
        this.displayUpdateDialog = true;
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../../publicCss/page.less";
  @import "../../publicCss/dialog.less";
  @import "../../publicCss/table.less";
  .peopleBkMessage{
    margin-top: 3rem;
    color: white;
  }
  .peopleBkMessage img{
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
