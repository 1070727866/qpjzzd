<template>
  <div class="secondMenuFatherDiv">
    <keep-alive>
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="人员布控" name="peopleBk">
          <Conditions displayWhat="peopleBk"/>
          <SearchResult componentName="PeopleBkSearchResult" :list="peopleBkList" />
        </el-tab-pane>
        <el-tab-pane label="车辆布控" name="carBk">
          <Conditions displayWhat="carBk"/>
          <SearchResult componentName="CarBkSearchResult" :list="carBkList" />
        </el-tab-pane>
      </el-tabs>
    </keep-alive>
  </div>
</template>

<script>
  import Conditions from '../condition/conditions.vue';
  import SearchResult from '../searchResult/searchResult.vue';
  import {mapState, mapMutations} from 'vuex';
  export default {
    name: "people-and-car-bk",
    components:{
      Conditions,
      SearchResult
    },
    data() {
      return {
        activeName: 'peopleBk'
      }
    },
    watch: {
      "$route": {
        handler(route) {
          const that = this;
          if (that.bkRouterIndex.length > 1) {
            that.activeName = that.bkRouterIndex[1].substring(1);
          }
        },
        deep: true
      }
    },
    computed: {
      ...mapState(['bkRouterIndex', 'peopleBkList', 'carBkList'])
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
