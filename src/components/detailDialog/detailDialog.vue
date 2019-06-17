<template>
    <div>
      <el-dialog :visible.sync="displayDialog"
                 width="1166px" center
                 :before-close="modalClose"
                 :close-on-click-modal="false"
                 :close-on-press-escape="false"
      >
        <div class="dialog" >
          <div class="dialogTitle">{{dialogTitle}}</div>
          <div>
            <img v-if="whatDialog === 'car' || whatDialog === 'phone'"    class="floatLeft" :src="currentRow.picVehicle" height="424" width="548"/>
            <img v-if="whatDialog === 'people'" class="floatLeft" :src="currentRow.lrxzdt" height="424" width="548"/>
            <div v-if="whatDialog === 'car'  || whatDialog === 'phone'"    class="floatLeft marginLeft">
              <img :src="currentRow.picPlate" height="90" width="216"/>
              <div class="cphmCss">{{currentRow.plateInfo}}</div>
            </div>
            <div v-if="whatDialog === 'people'" class="floatLeft marginLeft">
              <div style="position: relative">
                <img :src="currentRow.lrxzxt" height="160" width="216"/>
                <div class="picWord">抓拍图</div>
              </div>
              <div style="position: relative">
                <img class="marginLeft" :src="currentRow.rlxzdt" height="160" width="216"/>
                <div class="picWord" style="top: 10px">布控图</div>
              </div>
            </div>
            <div class="detailInputDiv">
              <div v-if="whatDialog === 'car' || whatDialog === 'phone'"    class="floatLeft">
                <DetailInputTemplate inputName="检查站" :inputValue="currentRow.stationName" />
                <DetailInputTemplate inputName="车牌号码" :inputValue="currentRow.plateInfo" />
                <DetailInputTemplate inputName="车牌颜色" :inputValue="currentRow.plateColor" />
                <DetailInputTemplate inputName="告警时间" :inputValue="currentRow.alarmTime" />
              </div>
              <div v-if="whatDialog === 'people'" class="floatLeft">
                <DetailInputTemplate inputName="相似度" :inputValue="currentRow.xsd" xsd="xsd" />
                <DetailInputTemplate inputName="姓名" :inputValue="currentRow.rlxm" />
                <DetailInputTemplate inputName="身份证号" :inputValue="currentRow.rlsfz"/>
                <DetailInputTemplate inputName="告警时间" :inputValue="currentRow.alarmTime"/>
                <DetailInputTemplate inputName="抓拍位置" :inputValue="currentRow.sxtmc"/>
              </div>
              <div v-if="whatDialog === 'car' || whatDialog === 'phone'" class="floatLeft marginLeft">
                <DetailInputTemplate inputName="告警种类" :inputValue="currentRow.gjhsmc" />
                <DetailInputTemplate inputName="行驶方向" :inputValue="currentRow.xsfxmc" />
                <DetailInputTemplate inputName="处置结果" :inputValue="currentRow.czjgmc" />
                <DetailInputTemplate inputName="车道号" :inputValue="currentRow.laneId" />
              </div>
              <div v-if="whatDialog === 'people'" class="floatLeft marginLeft">
                <DetailInputTemplate inputName="告警种类" :inputValue="currentRow.alarmTypeName"/>
                <DetailInputTemplate inputName="性别" :inputValue="currentRow.rlxbmc"/>
                <DetailInputTemplate inputName="布控库" :inputValue="currentRow.rlkmc"/>
                <DetailInputTemplate inputName="处置结果" :inputValue="currentRow.czjgmc"/>
                <DetailInputTemplate inputName="检查站" :inputValue="currentRow.stationName"/>
              </div>
            </div>
          </div>
        </div>
      </el-dialog>
    </div>
</template>

<script>
  import DetailInputTemplate from '../detailInputTemplate/detailInputTemplate.vue';
  export default {
    name: "detail-report",
    props: {
      displayDialog: {type: Boolean, default: false},
      currentRow: {},
      dialogTitle: {},
      whatDialog:{}
    },
    components:{
      DetailInputTemplate
    },
    methods:{
      modalClose(){
        this.$emit('update:displayDialog', false); // 直接修改父组件的属性
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../../publicCss/dialog.less";
  @import "../../publicCss/publicCss.less";
  /*车牌号码样式*/
  .cphmCss{
    width: 216px;height: 90px;
    background-color: #1682e7;
    font-size: 32px;line-height: 90px;
    text-align: center;border-radius: 4px;
    color: white;
  }
  .detailInputDiv{
    float: left;margin-left: 20px;color: white;
  }
  .floatLeft{
    float: left;
  }
  .marginLeft{
    margin-left: 10px;
  }
  /*所有图片圆角*/
  .dialog img{
    border-radius: 4px;
  }
</style>
