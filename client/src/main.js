import Vue from 'vue';
import App from '@/App';
import router from '@/router';

import 'es6-promise/auto';

import store from '@/vuex/store';
import env from '@/config/env';
import request from '@/util/request';

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store: store,
  router,
  template: '<App/>',
  components: {App}
});
