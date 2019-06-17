<template>
  <div class="hello">
      <Menu></Menu>
  </div>
</template>

<script>
  import Menu from './menu/menu.vue'
  export default {
    name: 'home',
    components:{
      Menu
    },
    data () {
      return {
        msg: 'Welcome to Your Vue.js App555'
      }
    },
    beforeCreate(){
      console.log(this,'beforeCreate');
    },
    methods:{
      deleteTodo(id){
        console.log(id);
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
  @import "../publicCss/time.less";
  .hello{
    background: url("../assets/bg.png") no-repeat;
    width: 1920px;
    height: 1080px;
  }
  img[src=""],img:not([src]){
    opacity:0;
  }
</style>
