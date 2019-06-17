<template>
  <div class="condition">
    <div class="timeWord">选择时段</div>
    <div class="selectTime">
      <el-date-picker
        @change="handleTime"
        v-model="timeValue"
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
    <SelectTemplate ref="selectStation"   v-show="ifStation"   :displayWhat="displayWhat" selectName="检查站"      :list="stationList" isCondition="true" @updateRlkList="getRlkMessage"/>
    <SelectTemplate ref="selectRlk"       v-show="ifRlk"       :displayWhat="displayWhat" selectName="人脸库"      :list="rlkList" isCondition="true" />
    <SelectTemplate ref="selectDirection" v-show="ifDirection" :displayWhat="displayWhat" selectName="行驶方向"    :list="xsfxList" isCondition="true"/>
    <SelectTemplate ref="selectCDH"       v-show="ifCDH"       :displayWhat="displayWhat" selectName="车道号"      :list="cdbhList" isCondition="true"/>
    <SelectTemplate ref="selectCategory"  v-show="ifCategory"  :displayWhat="displayWhat" selectName="报警种类"    :list="alarmTypeList" isCondition="true"/>
    <SelectTemplate ref="selectSituation" v-show="ifSituation" :displayWhat="displayWhat" selectName="报警核实情况" :list="situationList" isCondition="true"/>
    <div class="inputPublicCss" v-show="ifCarNumber" >
      <label>车牌号码</label>
      <div class="cphmSelect">
        <SelectTemplate ref="selectCphGsd" v-show="ifcphGsd" :displayWhat="displayWhat" selectName="车牌号码" style="position: absolute" :list="cphList"/>
        <input class="hphm" type="text" v-model="carNumber" @blur="changeCarNum(carNumber)" />
      </div>

    </div>
    <SelectTemplate ref="selectCphmColor" v-show="ifCphmColor" :displayWhat="displayWhat" selectName="号牌颜色" :list="cphmColorList" isCondition="true"/>
    <div class="inputPublicCss" v-if="ifIMSI">
      <label>IMSI</label><input type="text" v-model="phoneIMSI" />
    </div>
    <div class="inputPublicCss" v-if="ifIMEI">
      <label>IMEI</label><input type="text" v-model="phoneIMEI" />
    </div>
    <SelectTemplate ref="selectInternet"  v-show="ifInternet"  :displayWhat="displayWhat" selectName="网络制式" :list="situationList" isCondition="true"/>
    <SelectTemplate ref="selectPhoneGsd"  v-show="ifPhoneGsd"  :displayWhat="displayWhat" selectName="归属地" :list="situationList" isCondition="true"/>
    <div class="inputPublicCss" v-if="ifName">
      <label>姓名</label><input type="text" v-model="name" @blur="changeName(name)" />
    </div>
    <div class="inputPublicCss" v-if="ifIdentity">
      <label>身份证</label><input type="text" v-model="identity" @blur="changeIdentity(identity)" />
    </div>
    <div class="inputPublicCss" v-if="ifLxr">
      <label>联系人</label><input type="text" v-model="lxr" @blur="changeLxr(lxr)" />
    </div>
    <div class="inputPublicCss" v-if="ifLxdh">
      <label>联系电话</label><input type="text" v-model="lxdh" @blur="changeLxdh(lxdh)" />
    </div>
    <SelectTemplate ref="selectBklx"   v-show="ifBklx"   :displayWhat="displayWhat" selectName="布控类型"      :list="bklxList" isCondition="true"/>
    <SelectTemplate ref="selectBkdw"   v-show="ifBkdw"   :displayWhat="displayWhat" selectName="布控单位"      :list="bklxList" isCondition="true"/>
    <div class="searchButton">
      <img @click="handleClear" style="cursor: pointer" src="../../assets/btn_clear.png" height="30" width="100"/>
      <img @click="handleSearch" style="margin-left: 30px;cursor: pointer" src="../../assets/btn_search.png" height="30" width="100"/>
    </div>
  </div>
</template>

<script>
  import {mapState, mapMutations} from 'vuex';
  import {getCarApi, getPeopleApi, getPhoneApi, getAlarmSituationApi, getAlarmTypeApi, getCdbhApi, getCpysApi, getCzlxApi, getRlkApi, getStationApi} from '../../request/api';
  import InputTemplate from '../inputTemplate/inputTemplate.vue';
  import SelectTemplate from '../selectTemplate/selectTemplate.vue';
  export default {
    name: "conditions",
    props: [
      'displayWhat'
    ],
    components:{
      InputTemplate,
      SelectTemplate
    },
    data() {
      return {
        ifCarNumber: false,
        ifCphmColor: false,
        ifStation: false,
        ifCDH: false,
        ifcphGsd:true,
        ifDirection: false,
        ifName: false,
        ifIdentity: false,
        ifLxr:false,
        ifLxdh:false,
        ifCategory: true,
        ifSituation: true,
        ifRlk:false,
        ifIMSI: false,
        ifIMEI: false,
        ifInternet: false,
        ifPhoneGsd: false,
        ifBklx:false,
        ifBkdw:false,
        timeValue: '选择开始时间',
        value: ['','','','','','','',''],
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
        },
        phoneIMSI: '',

        carNumber: '',
        name: '',
        identity: '',
        lxr:'',
        lxdh:'',

        cphList:[
          {value:'沪',name:'沪'},
          {value:'苏',name:'苏'},
          {value:'浙',name:'浙'},
          {value:'皖',name:'皖'},
          {value:'京',name:'京'},
          {value:'津',name:'津'},
          {value:'冀',name:'冀'},
          {value:'晋',name:'晋'},
          {value:'蒙',name:'蒙'},
          {value:'辽',name:'辽'},
          {value:'吉',name:'吉'},
          {value:'黑',name:'黑'},
          {value:'闽',name:'闽'},
          {value:'赣',name:'赣'},
          {value:'鲁',name:'鲁'},
          {value:'豫',name:'豫'},
          {value:'鄂',name:'鄂'},
          {value:'湘',name:'湘'},
          {value:'粤',name:'粤'},
          {value:'桂',name:'桂'},
          {value:'琼',name:'琼'},
          {value:'渝',name:'渝'},
          {value:'川',name:'川'},
          {value:'贵',name:'贵'},
          {value:'云',name:'云'},
          {value:'藏',name:'藏'},
          {value:'陕',name:'陕'},
          {value:'甘',name:'甘'},
          {value:'青',name:'青'},
          {value:'宁',name:'宁'},
          {value:'新',name:'新'}
          ],
        alarmTypeList:[{value:'0',name:'接口没通'},{value:'1',name:'暂无数据哦'}],
        cdbhList:[{value:'0',name:'接口没通'},{value:'1',name:'暂无数据哦'}],
        cphmColorList:[{value:'0',name:'接口没通'},{value:'1',name:'暂无数据哦'}],
        rlkList:[{value:'0',name:'请先选择检查站'}],
        stationList: [{value:'0',name:'接口没通'},{value:'1',name:'暂无数据哦'}],
        sxtList:[{value:'0',name:'接口没通'},{value:'1',name:'暂无数据哦'}],
        xsfxList: [{value:'0',name:'接口没通'},{value:'1',name:'暂无数据哦'}],
        bklxList:[{value:'0',name:'接口没通'},{value:'1',name:'暂无数据哦'}]
      }
    },
    created() {
      this.getAlarmSituationMessage();
      this.getAlarmTypeMessage();
      this.getCdbhMessage();
      this.getCpysMessage();
      this.getCzlxMessage();
      // this.getRlkMessage({});
      this.getStationMessage();
    },
    mounted(){
      if (this.displayWhat === 'car'){
        this.ifCarNumber=true;this.ifCphmColor=true;this.ifStation=true;this.ifCDH=true;this.ifDirection=true;
      }else if (this.displayWhat === 'people'){
        this.ifCarNumber=true;this.ifRlk=true;this.ifStation=true;this.ifName=true;this.ifIdentity=true;this.displayCarSit=true;
      }else if (this.displayWhat === 'phone'){
        this.ifCarNumber=true;this.ifIMSI=true;this.ifCphmColor=true;this.ifStation=true;this.ifCDH=true;this.ifDirection=true;
      }else if(this.displayWhat === 'peopleBk'){
        this.ifIdentity=true;this.ifName=true;this.ifSituation=false;this.ifCategory=false;this.ifLxr=true;this.ifLxdh=true;this.ifBklx=true;this.ifBkdw=true;this.ifcphGsd=false;
      }else if(this.displayWhat === 'carBk'){
        this.ifSituation=false;this.ifCategory=false;this.ifCarNumber=true;this.ifLxr=true;this.ifLxdh=true;this.ifBklx=true;this.ifBkdw=true;
      }
    },
    methods: {
      ...mapMutations(['updatePeopleCondition', 'updateCarCondition', 'updatePhoneCondition',
        'updatePeopleList', 'updateCarList','updatePhoneList',
        'updateSituationList','updateCzlxList',
        'clearPeopleCondition','clearCarCondition','clearPhoneCondition',
        'updatePeopleBkCondition','updateCarBkCondition','clearPeopleBkCondition','clearCarBkCondition'
      ]),
      message(res,successText,failedText){
        if(res.responseCode === '1000'){
          this.$message({message: successText, type: 'success',showClose: true});
        }else{
          this.$message({message: failedText, type: 'error',showClose: true})
        }
      },
      //调用报警核实情况下拉框接口
      getAlarmSituationMessage() {
        getAlarmSituationApi({}).then(res => {
          this.updateSituationList(res.content)
        })
      },
      //调用处置类型下拉框接口
      getCzlxMessage() {
        getCzlxApi({}).then(res => {
          this.updateCzlxList(res.content)
        })
      },
      //调用告警布控类型下拉框接口
      getAlarmTypeMessage() {
        getAlarmTypeApi({}).then(res => {
          this.alarmTypeList = res.content;
        })
      },
      //调用车道编号下拉框接口
      getCdbhMessage() {
        getCdbhApi({}).then(res => {
          this.cdbhList = res.content;
        })
      },
      //调用车牌颜色下拉框接口
      getCpysMessage() {
        getCpysApi({}).then(res => {
          this.cphmColorList = res.content;
        })
      },
      //调用人脸库下拉框接口
      getRlkMessage(e) {
        console.log('更新了');
        getRlkApi(e).then(res => {
          this.rlkList = res.content;
        })
      },
      //调用检查站下拉框接口
      getStationMessage(){
        getStationApi({}).then(res => {
          this.stationList = res.content;
        })
      },
      //调用摄像头下拉框接口
      getSxtMessage() {
        getSxtApi({}).then(res => {
          this.sxtList = res.content;
        })
      },
      //时间改变赋值
      handleTime(e) {
        if (this.displayWhat === 'people') {
          console.log('修改人员时间');
          this.updatePeopleCondition(['startTime',e[0]]);
          this.updatePeopleCondition(['endTime',e[1]]);
        } else if (this.displayWhat === 'car') {
          console.log('修改车辆时间');
          this.updateCarCondition(['startTime',e[0]]);
          this.updateCarCondition(['endTime',e[1]]);
        } else if(this.displayWhat === 'people'){
          console.log('修改手机时间');
          this.updatePhoneCondition(['startTime',e[0]]);
          this.updatePhoneCondition(['endTime',e[1]]);
        }
      },
      //车牌号改变赋值
      changeCarNum(e) {
        if (this.displayWhat === 'people') {
          console.log('修改人员的车牌号');
          this.updatePeopleCondition(['plateInfo', this.peopleCondition.first_cphm + e]);
        } else if (this.displayWhat === 'car'){
          console.log('修改车辆的车牌号');
          this.updateCarCondition(['plateInfo', this.carCondition.first_cphm + e]);
        }else if (this.displayWhat === 'phone'){
          console.log('修改手机的车牌号');
          this.updatePhoneCondition(['plateInfo', this.phoneCondition.first_cphm + e]);
        }else if(this.displayWhat === 'peopleBk'){
          console.log('修改人员布控的车牌号');
          this.updatePeopleBkCondition(['plateInfo', this.peopleBkCondition.first_cphm + e])
        }else if(this.displayWhat === 'carBk'){
          console.log('修改车辆布控的车牌号');
          this.updateCarBkCondition(['plateInfo', this.carBkCondition.first_cphm + e])
        }
      },
      //姓名改变赋值
      changeName(e){
        if (this.displayWhat === 'people'){
          console.log('修改人员的姓名');
          this.updatePeopleCondition(['rlxm', e]);
        }else if (this.displayWhat === 'peopleBk'){
          console.log('修改人员布控的姓名');
          this.updatePeopleBkCondition(['xm', e]);
        }
      },
      //身份证改变赋值
      changeIdentity(e){
        if (this.displayWhat === 'people'){
          console.log('修改人员的身份证');
          this.updatePeopleCondition(['rlsfz', e]);
        }else if (this.displayWhat === 'peopleBk'){
          console.log('修改人员布控的身份证');
          this.updatePeopleBkCondition(['sfzh', e]);
        }else if (this.displayWhat === 'carBk'){
          console.log('修改人员布控的身份证');
          this.updateCarBkCondition(['sfzh', e]);
        }
      },
      //联系人改变赋值
      changeLxr(e){
        if (this.displayWhat === 'peopleBk'){
          console.log('修改人员布控的联系人');
          this.updatePeopleCondition(['lxr', e]);
        }else if (this.displayWhat === 'carBk'){
          console.log('修改车辆布控的联系人');
          this.updateCarBkCondition(['lxr', e]);
        }
      },
      //联系电话改变赋值
      changeLxdh(e){
        if (this.displayWhat === 'peopleBk'){
          console.log('修改人员布控的联系电话');
          this.updatePeopleCondition(['lxdh', e]);
        }else if (this.displayWhat === 'carBk'){
          console.log('修改车辆布控的联系电话');
          this.updateCarBkCondition(['lxdh', e]);
        }
      },
      //清空
      handleClear(e){
        this.timeValue = "";//清空时间
        this.$refs.selectStation.clearSelect();//清空所有下拉框；在父组件中调用子组件的方法
        this.$refs.selectCategory.clearSelect();
        this.$refs.selectSituation.clearSelect();
        this.$refs.selectRlk.clearSelect();
        this.$refs.selectDirection.clearSelect();
        this.$refs.selectCDH.clearSelect();
        this.$refs.selectCphmColor.clearSelect();
        this.$refs.selectCphGsd.clearSelect();
        this.$refs.selectBklx.clearSelect();
        this.$refs.selectBkdw.clearSelect();
        if(this.displayWhat === 'people'){
          this.carNumber = '';
          this.name = '';
          this.identity = '';
          this.clearPeopleCondition();//清除store中的人员查询条件
        }else if(this.displayWhat === 'car'){
          this.carNumber = '';
          this.clearCarCondition();//清除store中的车辆查询条件
        }else if(this.displayWhat === 'phone'){
          this.carNumber = '';
          this.phoneIMSI = '';
          this.clearPhoneCondition();//清除store中的手机查询条件
        }else if(this.displayWhat === 'peopleBk'){
          this.name = '';
          this.identity = '';
          this.lxr = '';
          this.lxdh = '';
          this.clearPeopleBkCondition();
        }else if(this.displayWhat === 'carBk'){
          this.carNumber = '';
          this.lxr = '';
          this.lxdh = '';
          this.clearCarBkCondition();
        }
      },
      //检索
      handleSearch(e) {
        if (this.displayWhat === 'people') {
          console.log('检索人员');
          console.log(this.peopleCondition);
          getPeopleApi(this.peopleCondition).then(res => {
            this.updatePeopleList(res.content);
            this.message(res,'检索成功', '检索失败')
          })
        }else if (this.displayWhat === 'car'){
          getCarApi(this.carCondition).then(res => {
            this.updateCarList(res.content);
            this.message(res,'检索成功', '检索失败')
          })
        } else if (this.displayWhat === 'phone') {
          this.updatePhoneCondition(['IMSI',this.phoneIMSI]);
          getPhoneApi(this.phoneCondition).then(res => {
            this.updatePhoneList(res.content);
            this.message(res,'检索成功', '检索失败')
          })
        }
      },

    },
    computed: {
      ...mapState(['peopleCondition','carCondition','phoneCondition','situationList','czlxList',
        'peopleBkCondition','carBkCondition'
      ])
    }
  }
</script>

<style lang="less" scoped>
  @import "../../publicCss/publicCss.less";
  .condition{
    width: 188rem;
    background: @backgroundColor;
    height: 13.1rem;
    line-height: 6.5rem;
    color: @whiteColor;
    padding-left: 2rem;
  }
  .inputPublicCss{
    float: left;
    margin-right: 4rem;
  }
  .condition label{
    margin-right: @spaceNumber;
  }
  .inputPublicCss input{
    .inputCss
  }
  .identity input{
    box-sizing: border-box;
    padding-left: 0.8rem;
    outline: none;
    border-radius: @borderRdius;
    font-size: @smallFontSize;
    border: none;
    width: 199px;
    height: 30px;
    background: url("../../assets/bg_ID.png") no-repeat;
    color: @whiteColor;
  }
  .hphm{
    background: url("../../assets/bg_chepaihao.png") no-repeat !important;
    padding-left: 72px !important;
  }
  .searchButton{
    float: right;
    margin-right: 3rem;
    line-height: 8.5rem;
  }
  .cphmSelect{
    display: inline-block;position: relative;
    /deep/ .el-input__inner{
      width: 55px !important;
      padding-right: 25px !important;
      height: 30px !important;
    }
    /deep/ .el-input__suffix{
      right: -2px;
    }
  }

</style>

