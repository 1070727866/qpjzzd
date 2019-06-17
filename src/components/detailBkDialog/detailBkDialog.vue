<template>
  <div>
    <el-dialog :visible.sync="displayDialog"
               width="765px" center
               :before-close="modalClose"
               :close-on-click-modal="false"
               :close-on-press-escape="false"
    >
      <div class="bkDialog" >
        <div class="dialogTitle">{{dialogTitle}}</div>
        <div style="float: left;width: 580px" class="baseMessage">
          <div class="inlineBlockInput">
            <DetailInputTemplate inputName="姓名" :inputValue="currentRow.xm" />
            <DetailInputTemplate inputName="身份证" :inputValue="currentRow.sfzh" />
          </div>
          <div class="inlineBlockInput">
            <DetailInputTemplate inputName="手机号" :inputValue="currentRow.sjh" />
            <DetailInputTemplate inputName="性别" :inputValue="currentRow.xbmc" />
          </div>
          <div class="inlineBlockInput" style="margin-top: 20px">
            <DetailInputTemplate inputName="布控时段" :inputValue="currentRow.bksd" />
          </div>
          <div class="inlineBlockInput">
            <DetailInputTemplate inputName="联系人" :inputValue="currentRow.lxr" />
            <DetailInputTemplate inputName="联系电话" :inputValue="currentRow.lxdh" />
            <DetailInputTemplate inputName="联系单位" :inputValue="currentRow.lxdw" />
          </div>
          <div class="inlineBlockInput">
            <DetailInputTemplate inputName="布控人" :inputValue="currentRow.bkr" />
            <DetailInputTemplate inputName="布控单位" :inputValue="currentRow.bkdw" />
            <DetailInputTemplate inputName="布控类型" :inputValue="currentRow.bjzl" />
          </div>
          <div class="inlineBlockInput" style="margin-top: 15px">
            <div style="color: white;text-align: left">布控原因</div>
            <div>
              <el-input
                type="textarea"
                :clearable=true
                :rows="4"
                disabled
                placeholder="请输入内容"
                v-model="currentRow.bjzl">
              </el-input>
            </div>
          </div>
        </div>
        <div style="float: left;color: white">
          <div>人员布控图片</div>
          <div class="rybktp">
            <img :src="currentRow.zp" width="114" height="132" alt="">
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import DetailInputTemplate from '../detailInputTemplate/detailInputTemplate.vue';
  import SelectTemplate from '../selectTemplate/selectTemplate.vue';
  export default {
    name: "detail-bk-dialog",
    props: {
      displayDialog: {type: Boolean, default: false},
      currentRow: {},
      dialogTitle: {},
      whatDialog:{}
    },
    components:{
      DetailInputTemplate,
      SelectTemplate
    },
    data(){
      return{
      }
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
  /*设置布控原因的输入框*/
  /deep/ .el-textarea__inner{
    color: white;
    background: url("../../assets/bg__bk_bkyy_base.png") no-repeat;
    border: none;
    width: 500px;
    height: 122px;
    overflow: hidden;
  }
  .rybktp{
    background: url("../../assets/bg_rybktp.png") no-repeat;
    width: 114px;
    height: 132px;
    cursor: pointer;
  }
  /*禁用布控原因输入框后的样式*/
  /deep/ .el-textarea.is-disabled .el-textarea__inner{
    background-color: transparent;
    color: white;
  }
</style>
