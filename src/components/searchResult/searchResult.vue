<template>
  <div class="seachResult">
    <!--<HappyScroll color="rgba(0,97,212,0.6)" size="4" hide-horizontal>-->
      <!--<div :is='componentName'  v-for="item in list" :key="item.id" :oneMessage="item">-->
      <!--</div>-->

    <!--</HappyScroll>-->
    <div :is='componentName' :list="list.data" :searchCount="list.total"></div>
  </div>
</template>

<script>
  import AlarmPeopleSearchResult from '../alarmPeopleSearchResult/alarmPeopleSearchResult.vue';
  import AlarmCarSearchResult from '../alarmCarSearchResult/alarmCarSearchResult.vue';
  import AlarmPhoneSearchResult from '../alarmPhoneSearchResult/alarmPhoneSearchResult.vue';

  import PeopleBkSearchResult from '../peopleBkSearchResult/peopleBkSearchResult.vue';
  import CarBkSearchResult from '../carBkSearchResult/carBkSearchResult.vue';
  export default {
    name: "search-result",
    components:{
      AlarmPeopleSearchResult,
      AlarmCarSearchResult,
      AlarmPhoneSearchResult,
      PeopleBkSearchResult,
      CarBkSearchResult
    },
    props: ['componentName', 'list']
  }
</script>
<style lang="less" scoped>
  .seachResult{
    height: 750px;width: 1890px;
  }
  .seachResult {
    /deep/ .happy-scroll-container {
      height: 750px !important;
      width: 1890px !important;
    }
  }
</style>
