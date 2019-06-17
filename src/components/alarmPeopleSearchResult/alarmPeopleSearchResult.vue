<template>
    <div class="alarmPeopleSearchResult">
      <OnePeopleMessage
        v-for="item in list" :key="item.id" :oneMessage="item"
        @click.native="onePeopleMessageClick(item)"
        :class='{selectPeopleMessage:item.id==isSelected}'
      />
      <Page :searchCount="searchCount" displayWhat="people"/>
      <DetailDialog v-if="displayDetailDialog" :displayDialog.sync="displayDetailDialog" dialogTitle="人员告警记录详情" :currentRow="currentRow" whatDialog="people" />
      <ReportDialog v-if="detDisplayReportDialog" :displayDialog.sync="detDisplayReportDialog" dialogTitle="人员告警上报信息" :currentRow="currentPeopleReportMessage" whatDialog="people" />
    </div>
</template>

<script>
  import OnePeopleMessage from '../onePeopleMessage/onePeopleMessage.vue';
  import ReportDialog from '../reportDialog/reportDialog.vue';
  import DetailDialog from '../detailDialog/detailDialog.vue';
  import DetailInputTemplate from '../detailInputTemplate/detailInputTemplate.vue';
  import SelectTemplate from '../selectTemplate/selectTemplate.vue';
  import DateTimeTemplate from '../dateTimeTemplate/dateTimeTemplate.vue';
  import Page from '../page/page.vue';
  import {mapState, mapMutations} from 'vuex';
  export default {
    name: "alarm-people-search-result",
    props: ['list','searchCount'],
    components: {
      OnePeopleMessage,
      ReportDialog,
      DetailDialog,
      DetailInputTemplate,
      SelectTemplate,
      DateTimeTemplate,
      Page
    },
    data() {
      return {
        isSelected: '',
        displayDetailDialog: false,
        currentRow: {}
      }
    },
    methods: {
      ...mapMutations(['updateDisplayPeopleReportDialog']),
      onePeopleMessageClick(item) {
        this.isSelected = item.id;//点击后是选中状态，需要添加背景图
        this.currentRow = item;//获取当前点击的内容
        this.displayDetailDialog = true;//展示详情页
      },
      peopleClose() {
        this.updateDisplayReportDialog(false)
      }
    },
    computed: {
      ...mapState(['currentPeopleReportMessage', 'displayPeopleReportDialog']),
      detDisplayReportDialog: {
        get: function () {
          return this.displayPeopleReportDialog;//methods里面对这个里面有从新赋值的操作
        },
        set: function (newValue) {
          this.updateDisplayPeopleReportDialog(newValue);//这里的newValue就是reportDialog关闭事件返回的false
          return newValue;//这个newValue能监听到methods里面从新赋值了，这个就是新值.

        }
      }
    }
  }
</script>

<style scoped>
  @import "../../publicCss/dialog.less";
  .picWord{
    background-color: rgba(0,0,0,0.5);
    width: 77px;
    height: 23px;
    font-size: 12px;
    color: white;
    text-align: center;
    line-height: 23px;
    position: absolute;
    left: 0;
    top: 0;
  }
</style>
