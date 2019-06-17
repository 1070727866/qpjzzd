<template>
  <div class="detailInput">
    <div style="margin-bottom: 5px;height: 14px;line-height: 14px;margin-left: 0.6rem">{{inputName}}</div>
    <div><input :class='["inputCss",xsd==="xsd"? " xsdBg" : "",bkyy==="bkyy" ? "bkyyBg" : ""]'
                :readonly="isReadonly ? false : true"
                type="text"
                :unselectable='unselectable ? "off" : "on"'
                :value="inputValue"
                 @change="inputChange" /></div>
  </div>
</template>

<script>
  import {mapState, mapMutations} from 'vuex';
  export default {
    name: "detail-input-template",
    props:['inputName','inputValue','isReadonly','xsd','unselectable','bkyy','baseMessage','whatDialog'],
    data(){
      return{
        value:''
      }
    },
    methods:{
      ...mapMutations(['updatePeopleReportList','updateCarReportList','updatePhoneReportList',
        'updatePeopleBkUpdate'
  ]),
      inputChange(e){
        const value = e.currentTarget.value;
        console.log(value);
        if(this.whatDialog === 'people'){
          if(this.inputName === '接收单位'){
            this.updatePeopleReportList(['jsdw',value]);
          }else if(this.inputName === '查获民警'){
            this.updatePeopleReportList(['chmj',value]);
          }else if(this.inputName === '接收民警'){
            this.updatePeopleReportList(['jsmj',value]);
          }
        }else if(this.whatDialog === 'car'){
          if(this.inputName === '接收单位'){
            this.updateCarReportList(['jsdw',value]);
          }else if(this.inputName === '查获民警'){
            this.updateCarReportList(['chmj',value]);
          }else if(this.inputName === '接收民警'){
            this.updateCarReportList(['jsmj',value]);
          }
        }else if(this.whatDialog === 'phone'){
          if(this.inputName === '接收单位'){
            this.updatePhoneReportList(['jsdw',value]);
          }else if(this.inputName === '查获民警'){
            this.updatePhoneReportList(['chmj',value]);
          }else if(this.inputName === '接收民警'){
            this.updatePhoneReportList(['jsmj',value]);
          }
        }else if(this.whatDialog === 'peopleUpdateBk'){
          switch (this.inputName) {
            case '姓名':
              return this.updatePeopleBkUpdate(['xm',value]);
            case '身份证':
              return this.updatePeopleBkUpdate(['sfzh',value]);
            case '手机号':
              return this.updatePeopleBkUpdate(['sjh',value]);
            case '联系人':
              return this.updatePeopleBkUpdate(['lxr',value]);
            case '联系电话':
              return this.updatePeopleBkUpdate(['lxdh',value]);
            case '联系单位':
              return this.updatePeopleBkUpdate(['lxdw',value]);
            case '布控人':
              return this.updatePeopleBkUpdate(['bkr',value]);
              default:
                return
            }
        }
      }

    },
    computed:{
      ...mapState(['peopleReportList','carReportList','phoneReportList'])
    }
  }
</script>

<style lang="less" scoped>
  @import '../../publicCss/publicCss.less';
  .detailInput{
    margin-top: 20px;
    text-align: left;
    color: white;
  }
  .detailInput:nth-of-type(1){
    margin-top: 0px;
  }
  .xsdBg{
    background: url("../../assets/bg_xsd.png");
  }

  .baseMessage input{
    background: url("../../assets/bg_baseMessage.png") no-repeat;
  }
  .bkyyBg{
    background: url("../../assets/bg_bkyy_base.png") no-repeat !important;
    width: 670px;
  }
</style>
