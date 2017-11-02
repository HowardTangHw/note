// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import axios from 'axios';
import ElementUI from 'element-ui';
import _ from 'underscore';
import Icon from 'vue-svg-icon/Icon.vue';
import store from './store'


Vue.component('icon', Icon);
Vue.prototype._ = _;
Vue.prototype.$ajax = axios;
Vue.use(ElementUI);
Vue.config.productionTip = false;


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
});

