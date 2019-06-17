<template>
  <!--v-model=" selectName !== '车牌号码' ? value : cphmValue"  v-model="updateDefalutValue ? defalutValues : value"-->
  <div :class="isCondition ? 'inputPublicCss' : 'selectTemplate'">
    <div :class="isCondition ? 'inBlock' : 'verticalBlock'" v-show="selectName !== '车牌号码'">{{selectName}}</div>
    <el-select v-if="selectName !== '车牌号码' && !defalutValues"
               v-model="value"
               placeholder="全部"
               @change="handleSelectChange"

    >
      <el-option
        size="32"
        v-for="item in list"
        :key="item.value"
        :label="item.name"
        :value="item.value">
      </el-option>
    </el-select>
    <el-select v-if="defalutValues"
               v-model="defalutValues.name"
               placeholder="全部"
               @change="handleUpdateSelectChange"

    >
      <el-option
        size="32"
        v-for="item in list"
        :key="item.value"
        :label="item.name"
        :value="item.value">
      </el-option>
    </el-select>
    <!--车牌号单独设置，因为默认值不一样-->
    <el-select v-if="selectName === '车牌号码' && !defalutValues"
               v-model="cphmValue"
               @change="handleSelectChange"

    >
      <el-option
        size="32"
        v-for="item in list"
        :key="item.value"
        :label="item.name"
        :value="item.value">
      </el-option>
    </el-select>
  </div>
</template>

<script>
  import {mapState, mapMutations} from 'vuex';
  export default {
    name: "select-template",
    props: [
      'list' ,
      'selectName',
      'isCondition',
      'displayWhat',
      'isReport',
      'whatDialog',
      'updateDefalutValue'
      ],
    data() {
      return {
        value: '',
        cphmValue:'沪',
        defalutValues:{name:''}
      }
    },
    created(){
      console.log('1111');
      console.log(this.updateDefalutValue);
      this.$set(this.defalutValues,'name',this.updateDefalutValue);

    },
    mounted(){
      //修改车辆布控时需要给所有下拉框的值保存到修改的list中
      if(this.displayWhat === 'carUpdateBk'){
        switch (this.selectName) {
          case '车牌号码':
            return this.updateCarBkUpdate(['first_cphm', this.updateDefalutValue]);
          default:
            return
        }
      }
    },
    watch: {
      selectValues (newVal) {
        console.log(newVal);
      }
    },
    methods: {
      ...mapMutations(['updatePeopleCondition', 'updateCarCondition', 'updatePhoneCondition',
        'updatePeopleReportList','updateCarReportList','updatePhoneReportList',
        'updatePeopleBkCondition','updateCarBkCondition',
        'updatePeopleBkUpdate','updateCarBkUpdate'
      ]),
      handleSelectChange(e) {
        this.$forceUpdate();
        console.log(e);
        //上报的下拉框值存储
        if (this.whatDialog === 'people'){
          if(this.selectName === '报警核实情况'){
            this.updatePeopleReportList(['gjhs',e]);
          }else if(this.selectName === '处置结果'){
            this.updatePeopleReportList(['czjg',e]);
          }
        }else if(this.whatDialog === 'car'){
          if(this.selectName === '报警核实情况'){
            this.updateCarReportList(['gjhs',e]);
          }else if(this.selectName === '处置结果'){
            this.updateCarReportList(['czjg',e]);
          }
        }else if(this.whatDialog === 'phone'){
          if(this.selectName === '报警核实情况'){
            this.updatePhoneReportList(['gjhs',e]);
          }else if(this.selectName === '处置结果'){
            this.updatePhoneReportList(['czjg',e]);
          }
        }
        //查询条件的下拉框值存储
        if (this.displayWhat === 'people') {
          console.log('选择人员');//因为人员的检查站要和人脸库关联，所以在选择人员的检查站时需要更新人脸库
          switch (this.selectName) {
            case '检查站':
              this.$emit('updateRlkList',{"stationId":e});
              return this.updatePeopleCondition(['stationId', e]);
            case '报警种类':
              return this.updatePeopleCondition(['alarmType', e]);
            case '报警核实情况':
              return this.updatePeopleCondition(['gjhs', e]);
            case '车牌号码':
              return this.updatePeopleCondition(['first_cphm', e]);
              default:
                return
            }
        } else if (this.displayWhat === 'car') {
          console.log('选择车辆');
          switch (this.selectName) {
            case '检查站':
              return this.updateCarCondition(['stationId', e]);
            case '行驶方向':
              return this.updateCarCondition(['xsfx', e]);
            case '车道号':
              return this.updateCarCondition(['cdh', e]);
            case '报警种类':
              return this.updateCarCondition(['alarmType', e]);
            case '报警核实情况':
              return this.updateCarCondition(['gjhs', e]);
            case '号牌颜色':
              return this.updateCarCondition(['plateColorCode', e]);
            case '车牌号码':
              return this.updateCarCondition(['first_cphm', e]);
            default:
              return
          }
        } else if (this.displayWhat === 'phone') {
          console.log('选择手机');
          switch (this.selectName) {
            case '检查站':
              return this.updatePhoneCondition(['stationId', e]);
            case '行驶方向':
              return this.updatePhoneCondition(['xsfx', e]);
            case '车道号':
              return this.updatePhoneCondition(['cdh', e]);
            case '报警种类':
              return this.updatePhoneCondition(['alarmType', e]);
            case '报警核实情况':
              return this.updatePhoneCondition(['gjhs', e]);
            case '号牌颜色':
              return this.updatePhoneCondition(['plateColorCode', e]);
            case '车牌号码':
              return this.updatePhoneCondition(['first_cphm', e]);
            default:
              return
          }
        }else if (this.displayWhat === 'peopleBk') {
          console.log('选择人员布控');
          switch (this.selectName) {
            case '车牌号码':
              return this.updatePeopleBkCondition(['first_cphm', e]);
            default:
              return
          }
        }else if (this.displayWhat === 'carBk') {
          console.log('选择车辆布控');
          switch (this.selectName) {
            case '报警种类':
              return this.updateCarBkCondition(['alarmType', e]);
            case '报警核实情况':
              return this.updateCarBkCondition(['gjhs', e]);
            case '车牌号码':
              return this.updateCarBkCondition(['first_cphm', e]);
            default:
              return
          }
        }
        //修改布控
        if (this.whatDialog === 'carUpdateBk'){
          console.log('修改车辆布控');
          switch (this.selectName) {
            case '车牌号码':
              return this.updateCarBkUpdate(['first_cphm', e]);
            case '车牌颜色':
              return this.updateCarBkUpdate(['hpys', e]);
            case '布控单位':
              return this.updateCarBkUpdate(['bkdw', e]);
            case '布控类型':
              return this.updateCarBkUpdate(['bjzl', e]);
            default:
              return
          }
        }
      },
      //更新的选择框改变事件
      handleUpdateSelectChange(e){
        if (this.whatDialog === 'peopleUpdateBk'){
          switch (this.selectName) {
            case '布控单位':
              return this.updatePeopleBkUpdate(['bkdw',e])
            case '布控类型':
              return this.updatePeopleBkUpdate(['bjzl',e])
              default:
                return
            }
        }
      },
      clearSelect(){
        this.value = '';
        this.cphmValue = '沪'
      }
    },
    computed:{

    }
  }
</script>

<style scoped>
  /*<!--class='inputPublicCss'表示是条件查询的样式 class='selectTemplate'表示是上报的样式 v-model="svalue"-->*/
  .selectTemplate{
    color: white;
  }
  .inBlock{
    display: inline-block;
    margin-right: 1.4rem;
  }
  .verticalBlock{
    padding-left: 6px;
  }
  /deep/ .el-input__inner{
    color: white;
    height: 3.2rem;
    line-height: 3.2rem;
    width: 160px ;
    background: url("../../assets/bg_input.png") no-repeat !important;
  }
</style>
