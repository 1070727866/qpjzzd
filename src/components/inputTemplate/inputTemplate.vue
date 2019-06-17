<template>
    <div>
      <div style="margin-left: 0.6rem">{{inputName}}</div>
      <input :class="xsd==='xsd'? 'inputCss xsdBg' : 'inputCss'"
             :readonly="isReadonly"
             unselectable='on'
             type="text" v-model="inputValue" />
    </div>
</template>

<script>
    export default {
      name: "input-template",
      props:['inputName','inputValue','xsd','isReadonly'],
      data () {
        return {

        }
      },
    }
</script>

<style lang="less" scoped>
  @import '../../publicCss/publicCss.less';
  .inputCss{
    margin-top: -5px;
    margin-bottom: 0px;
  }
  .xsdBg{
    background: url("../../assets/bg_xsd.png");
  }
</style>
