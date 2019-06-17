<template>
  <div :class="className" class="inputPublicCss" :style="{display:isDisplay}">
    <label>{{titleName}}</label>
    <input class="hphm" type="text" v-model="carNumber" @blur="changeCarNum(carNumber)" />
  </div>
</template>

<script>
    export default {
        name: "condition-input-template",
      props:['className','isDisplay','titleName']
    }
</script>

<style scoped>

</style>
