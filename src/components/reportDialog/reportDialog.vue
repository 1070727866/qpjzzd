<template>
    <div>
      <el-dialog :visible.sync="displayDialog"
                 width="1200px" center
                 :before-close="modalClose"
                 :close-on-click-modal="false"
                 :close-on-press-escape="false"
      >
        <div class="reportDialog" >
          <div class="dialogTitle">{{dialogTitle}}</div>
          <div class="baseMessage">
            <div style="font-size: 16px;text-align: left">基础信息</div>
            <div style="float: left">
              <div class="inlineBlockInput">
                <DetailInputTemplate inputName="检查站" :inputValue="currentRow.stationName" />
                <DetailInputTemplate inputName="行驶方向" :inputValue="currentRow.xsfxmc" />
                <DetailInputTemplate inputName="车道编号" :inputValue="currentRow.laneId" />
                <DetailInputTemplate inputName="报警种类" :inputValue="currentRow.alarmTypeName"/>
              </div>
              <div class="inlineBlockInput">
                <DetailInputTemplate inputName="姓名" :inputValue="currentRow.rlxm" v-if="xm" />
                <DetailInputTemplate inputName="身份证号" :inputValue="currentRow.rlsfz" v-if="sfz" />
                <DetailInputTemplate inputName="车牌号码" :inputValue="currentRow.plateInfo" v-if="cphm" />
                <DetailInputTemplate inputName="车牌颜色" :inputValue="currentRow.plateColor" v-if="cphmColor" />
                <DetailInputTemplate inputName="经过时间" :inputValue="currentRow.jgsj" />
                <DetailInputTemplate inputName="告警时间" :inputValue="currentRow.alarmTime" />
              </div>
              <div class="inlineBlockInput">
                <DetailInputTemplate inputName="相似度" :inputValue="currentRow.xsd" v-if="xsd" />
                <DetailInputTemplate inputName="车牌号码" :inputValue="currentRow.plateInfo" v-if="!cphm" />
              </div>
              <div class="inlineBlockInput" style="float: left">
                <DetailInputTemplate inputName="联系人" :inputValue="currentRow.lxr" />
                <DetailInputTemplate inputName="联系电话" :inputValue="currentRow.lxdh" />
                <DetailInputTemplate inputName="联系单位" :inputValue="currentRow.lxdw" />
              </div>
              <div class="inlineBlockInput" style="clear: left">
                <DetailInputTemplate inputName="布控人" :inputValue="currentRow.bkr" />
                <DetailInputTemplate inputName="布控单位" :inputValue="currentRow.bkdw" />
                <DetailInputTemplate inputName="布控时间" :inputValue="currentRow.bksj" />
              </div>
              <div class="inlineBlockInput" style="clear: both;margin-top: 20px">
                <DetailInputTemplate inputName="布控原因" :inputValue="currentRow.bkyy" bkyy="bkyy" />
              </div>
            </div>
            <div style="float: left;margin-left: 30px;">
              <img :src="currentRow.picVehicle" height="305" width="430" style="border-radius: 10px"/>
            </div>
          </div>
          <!--填写信息部分-->
          <div class="writeDiv">
            <div class="writeTitle"><label style="color: red;margin-right: 5px">*</label>根据实际内容填写以下信息</div>
            <div>
              <div class="inlineBlockInput" style="float: left">
                <div style="display: inline-block">
                  <div>车辆识别正确</div>
                  <el-radio v-model="isCorrectCar" label="0">否</el-radio>
                  <el-radio v-model="isCorrectCar" label="1">是</el-radio>
                </div>
                <div style="display: inline-block;margin-left: 60px;margin-right: 50px">
                  <div>车辆拦截</div>
                  <el-radio v-model="isLjcar" label="0">否</el-radio>
                  <el-radio v-model="isLjcar" label="1">是</el-radio>
                </div>
                <SelectTemplate selectName="报警核实情况" :list="situationList" :whatDialog="whatDialog" />
                <SelectTemplate selectName="处置结果" :list="czlxList" :whatDialog="whatDialog"  />
                <DetailInputTemplate inputName="接收单位" :whatDialog="whatDialog" unselectable="off" isReadonly="false" />
              </div>
              <div class="inlineBlockInput" style="float: left">
                <DetailInputTemplate inputName="查获民警" :whatDialog="whatDialog" v-model="chmj" unselectable="off" isReadonly="false" />
                <DetailInputTemplate inputName="接收民警" :whatDialog="whatDialog" v-model="jsmj" unselectable="off" isReadonly="false" />
                <DetailInputTemplate inputName="驾驶员" v-if="ifJsy" unselectable="off" isReadonly="false" />
                <DetailInputTemplate inputName="身份证号" v-if="ifsfzh" unselectable="off" isReadonly="false" />
                <SelectTemplate selectName="处理状态" v-if="ifClzt" :list="list4" />
              </div>
              <div style="padding-top: 20px;clear: both">
                <div style="float: left">
                  <div style="margin-bottom: 5px;height: 14px;line-height: 14px;text-align: left">备注信息</div>
                  <div>
                    <el-input
                      type="textarea"
                      :clearable=true
                      :rows="4"
                      placeholder="请输入内容"
                      v-model="bzxx">
                    </el-input>
                  </div>
                </div>
                <div style="margin-top: 83px;margin-left:40px;float: left;cursor: pointer">
                  <img @click="reportClick(currentRow)" src="../../assets/btn_report.png" height="30" width="100"/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-dialog>
    </div>
</template>

<script>
  import DetailInputTemplate from '../detailInputTemplate/detailInputTemplate.vue';
  import SelectTemplate from '../selectTemplate/selectTemplate.vue';
  import DateTimeTemplate from '../dateTimeTemplate/dateTimeTemplate.vue';
  import {peopleReportApi, carReportApi, phoneReportApi} from '../../request/api';
  import {mapState, mapMutations} from 'vuex';
  export default {
    name: "report-dialog",
    props: {
      displayDialog: {
        type: Boolean,
        default: false
      },
      currentRow: {}, 'dialogTitle': {}, 'whatDialog': {}
    },
    components:{
      DetailInputTemplate,
      SelectTemplate,
      DateTimeTemplate
    },
    data(){
      return{
        xm: false,
        sfz: false,
        cphm: false,
        cphmColor: false,
        xsd: false,
        ifJsy:false,
        ifsfzh:false,
        ifClzt:false,
        isCorrectCar: '0',
        isLjcar:'0',
        bzxx:'',
        gjhs:'',
        czlx:'',
        jsdw:'',
        chmj:'',
        jsmj:''
      }
    },
    mounted(){
      if(this.whatDialog === 'car'){
        this.cphm = true;
        this.cphmColor = true;
      }else if(this.whatDialog === 'people'){
        this.xm = true;
        this.sfz = true;
        this.xsd = true;
        this.cphm = false;
      }else if(this.whatDialog === 'phone'){
        this.ifJsy = true;
        this.ifsfzh = true;
      }
    },
    methods:{
      ...mapMutations(['updatePeopleReportList','updateCarReportList','updatePhoneReportList',
        'updatePeopleDataList','updateCarDataList','updatePhoneDataList'
      ]),
      message(res,successText,failedText,currentRow,list,what){
        if(res.responseCode === '1000'){
          this.$message({message: successText, type: 'success',showClose: true});
          for(let i=0;i<list.length;i++){
            if (list[i].id === currentRow.id){
              if(what === 'people'){
                this.updatePeopleDataList([i,'1'])
              }else if (what === 'car'){
                this.updateCarDataList([i,'1'])
              }else if (what === 'phone'){
                this.updatePhoneDataList([i,'1'])
              }

            }
          }
          this.modalClose(); // 上报成功后调用关闭上报弹窗的方法
        }else{
          this.$message({message: failedText, type: 'error',showClose: true})
        }
      },
      updateReport(e){
        e(['id',this.currentRow.id]);
        e(['sbjg',this.isCorrectCar]);
        e(['ljjg',this.isLjcar]);
        e(['bzxx',this.bzxx]);
      },
      reportClick(currentRow){
        if(this.whatDialog === 'people'){
          this.updateReport(this.updatePeopleReportList);
          peopleReportApi(this.peopleReportList).then(res => {
            this.message(res,'上报成功','上报失败',currentRow,this.peopleList.data,'people')
          });
        }else if(this.whatDialog === 'car'){
          this.updateReport(this.updateCarReportList);
          console.log(this.carReportList);
          carReportApi(this.carReportList).then(res => {
            this.message(res,'上报成功','上报失败',currentRow,this.carList.data,'car')
          });
        }else if(this.whatDialog === 'phone'){
          this.updateReport(this.updatePhoneReportList);
          console.log(this.phoneReportList);
          phoneReportApi(this.phoneReportList).then(res => {
            this.message(res,'上报成功','上报失败',currentRow,this.phoneList.data,'phone')
          });

        }
      },
      modalClose(){
        this.$emit('update:displayDialog', false); // 直接修改父组件的属性
      }
    },
    computed:{
      ...mapState(['peopleReportList','carReportList','phoneReportList','situationList','czlxList',
        'carList','peopleList','phoneList'
      ])
    }
  }
</script>

<style scoped lang="less">
  @import "../../publicCss/dialog.less";

  .baseMessage{
    padding-left: 10px;color: white;
    background: url("../../assets/bg_jcxx.png") no-repeat;
    width: 1163px;
    height: 467px;
  }
</style>
