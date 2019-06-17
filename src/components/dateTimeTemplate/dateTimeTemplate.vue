<template>
  <div class="dateTimeTemplate">
    <div>{{inputName}}</div>
    <el-date-picker
      v-model="value"
      type="datetime"
      placeholder="选择日期时间"
      align="right"
      size="large"
      :clearable=false
      prefix-icon="noDisplay"
      :picker-options="pickerOptions">
    </el-date-picker>
  </div>
</template>

<script>
  export default {
      name: "date-time-template",
      props:['inputName'],
      data(){
        return{
          pickerOptions: {
            shortcuts: [{
              text: '今天',
              onClick(picker) {
                picker.$emit('pick', new Date());
              }
            }, {
              text: '昨天',
              onClick(picker) {
                const date = new Date();
                date.setTime(date.getTime() - 3600 * 1000 * 24);
                picker.$emit('pick', date);
              }
            }, {
              text: '一周前',
              onClick(picker) {
                const date = new Date();
                date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                picker.$emit('pick', date);
              }
            }]
          },
          value: ''
        }
      }
    }
</script>

<style lang="less" >
  @import "../../publicCss/publicCss.less";
  @import "../../publicCss/time.less";
  .noDisplay{
    display: none;
  }
  /*单选时间控件样式*/
  .el-input__inner {
    background-color: transparent !important;
    color: white !important;
  }
  .el-date-picker__time-header{
    border-bottom: none;
  }
  .el-date-picker__header-label{
    color: white;
  }
  .el-picker-panel__footer{
    border-top: none;
    background-color: transparent;
  }
  .el-button{
    background: transparent;
    color: white;
    border: none;
  }
  .dateTimeTemplate{
    /deep/ .el-input--prefix .el-input__inner{
      padding-left: 10px;
    }
    /deep/ .el-date-editor.el-input, .el-date-editor.el-input__inner{
      width: 160px;
    }
    /deep/ .el-input__inner{
      width: 180px !important;
    }


  }


</style>
