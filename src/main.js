// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'element-ui/lib/theme-chalk/index.css';
import 'vue-happy-scroll/docs/happy-scroll.css';
import ElementUI from 'element-ui';
import Vue from 'vue';
import "babel-polyfill";
import router from './router';
import {store} from './store/store.js';
import { HappyScroll } from 'vue-happy-scroll';

import App from './App.vue';

//自定义组件名
Vue.component('HappyScroll', HappyScroll)
Vue.config.productionTip = false
Vue.use(ElementUI)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
