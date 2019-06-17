<template>
  <div class="countAndPage">
    <div style="float: left;">共<span style="color: #007bef;">{{searchCount}}</span>条结果</div>
    <div class="page">
      <img src="../../assets/firstPage.png" @click="firstPageClick" height="39" width="40"/>
      <img src="../../assets/pageUp.png"   @click="pageUpClick" height="39" width="40" />
      <label class="pageLabel">第</label>
      <input type="text" v-model="pageNum" class="pageNumber">
      <label class="pageLabel">页，共{{pageCount}}页</label>
      <img src="../../assets/padeDown.png" @click="pageDownClick" height="39" width="40" />
      <img src="../../assets/lastPage.png" @click="lastPageClick" height="39" width="40" />
    </div>
  </div>
</template>

<script>
  import {mapState, mapMutations} from 'vuex';
  import {getPeopleApi, getCarApi, getPhoneApi} from '../../request/api';
  export default {
    name: "page",
    props: ['searchCount', 'displayWhat'],
    data() {
      return {
        pageNum: 1,
        pageCount:1,
        pageSize_people: 6,
        pageSize_car: 16,
        pageSize_phone: 16
      }
    },
    mounted(){
      if(this.displayWhat === 'people'){
        this.pageCount = Math.ceil(parseInt(this.searchCount) / this.pageSize_people);
      }else if (this.displayWhat === 'car'){
        this.pageCount = Math.ceil(parseInt(this.searchCount) / this.pageSize_car);
      }else if (this.displayWhat === 'phone'){
        this.pageCount = Math.ceil(parseInt(this.searchCount) / this.pageSize_phone);
      }
    },
    methods: {
      ...mapMutations(['updatePeopleCondition', 'updateCarCondition', 'updatePhoneCondition',
        'updatePeopleList', 'updateCarList', 'updatePhoneList',]),
      pageSearch(){
        if (this.displayWhat === 'people') {
          this.updatePeopleCondition(['pageNo',this.pageNum])
          getPeopleApi(this.peopleCondition).then(res => {
            this.updatePeopleList(res.content);
          }).catch(error => {
            console.log(error);
            this.$message({showClose: true, message: '翻页失败', type: 'error'})
          })
        }else if (this.displayWhat === 'car'){
          this.updateCarCondition(['pageNo',this.pageNum])
          getCarApi(this.carCondition).then(res => {
            this.updateCarList(res.content);
          }).catch(error => {
            console.log(error);
            this.$message({showClose: true, message: '翻页失败', type: 'error'})
          })
        }else if (this.displayWhat === 'phone'){
          this.updatePhoneCondition(['pageNo',this.pageNum])
          getPhoneApi(this.phoneCondition).then(res => {
            this.updatePhoneList(res.content);
          }).catch(error => {
            console.log(error);
            this.$message({showClose: true, message: '翻页失败', type: 'error'})
          })
        }
      },
      firstPageClick() {
        this.pageNum = 1;
        this.pageSearch();
      },
      pageDownClick() {
        this.pageNum++;
        this.pageSearch();
      },
      pageUpClick() {
        this.pageNum--;
        this.pageSearch();
      },
      lastPageClick() {
        if(this.displayWhat === 'people'){
          this.pageNum = Math.ceil(parseInt(this.searchCount) / this.pageSize_people);
          this.pageSearch();
        }else if (this.displayWhat === 'car'){
          this.pageNum = Math.ceil(parseInt(this.searchCount) / this.pageSize_car);
          this.pageSearch();
        }else if (this.displayWhat === 'phone'){
          this.pageNum = Math.ceil(parseInt(this.searchCount) / this.pageSize_phone);
          this.pageSearch();
        }

      }
    },
    computed: {
      ...mapState(['peopleCondition', 'carCondition', 'phoneCondition'])
    }

  }
</script>

<style lang="less" scoped>
  @import "../../publicCss/page.less";
</style>
