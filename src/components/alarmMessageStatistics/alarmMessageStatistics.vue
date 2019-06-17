<template>
    <div class="secondMenuFatherDiv alarmMessageStatistics">
      <keep-alive>
        <el-tabs v-model="activeName" type="card" @tab-click="handleTabClick">
          <el-tab-pane label="人员告警" name="alarmMessageStatisticsPeople">
            <Conditions displayWhat="people"/>
            <SearchResult componentName="AlarmPeopleSearchResult" :list="peopleList" />
          </el-tab-pane>
          <el-tab-pane label="车辆告警" name="alarmMessageStatisticsCar">
            <Conditions displayWhat="car"/>
            <SearchResult  componentName="AlarmCarSearchResult" :list="carList" />
          </el-tab-pane>
          <el-tab-pane label="手机告警" name="alarmMessageStatisticsPhone">
            <Conditions displayWhat="phone"/>
            <SearchResult componentName="AlarmPhoneSearchResult" :list="phoneList" />
          </el-tab-pane>
        </el-tabs>
      </keep-alive>
    </div>
</template>

<script>
  import Conditions from '../condition/conditions.vue';
  import SearchResult from '../searchResult/searchResult.vue';
  import {mapState, mapMutations} from 'vuex';
  import {getCarApi, getPeopleApi, getPhoneApi} from '../../request/api';
  export default {
    name: "alarm-message-statistics",
    components:{
      Conditions,
      SearchResult
    },
    data () {
      return {
        activeName: 'alarmMessageStatisticsPeople'
      }
    },
    watch:{
      "$route":{
        handler(route){
          const that = this;
          if (that.routerIndex.length>1){
            that.activeName = that.routerIndex[1].substring(1);
          }
        },
        deep:true
      }
    },
    created(){
      this.getCarMessage();
      this.getPeopleMessage();
      this.getPhoneMessages();
    },
    methods: {
      ...mapMutations(['updateCarList','updatePeopleList','updatePhoneList']),
      handleTabClick(tab, event) {
        // console.log(tab, event)
      },
      getCarMessage(){
        getCarApi({"pageNo":1,"pageSize":16}).then(res => {
          this.updateCarList(res.content)
          console.log(res.content);
        }).catch(error => {
          console.log(error);
        })
      },
      getPeopleMessage(){
        getPeopleApi({"pageNo":1,"pageSize":6}).then(res => {
          this.updatePeopleList(res.content)
        }).catch(error => {
          console.log(error);
        })
      },
      getPhoneMessages(){
        getPhoneApi({"pageNo":1,"pageSize":16}).then(res => {
          this.updatePhoneList(res.content)
        }).catch(error => {
          console.log(error);
        })
      }
    },
    computed: {
      ...mapState(['routerIndex','carList','peopleList','phoneList'])
    }
  }
</script>

<style lang="less" scoped>
  /*<!--公共样式-->*/
  @import "../../publicCss/publicCss.less";
  /*<!--tab页样式-->*/
  @import "../../publicCss/tab.less";
  /*<!--select下拉框样式页样式-->*/
  @import "../../publicCss/select.less";
</style>

