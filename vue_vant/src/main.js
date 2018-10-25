import Vue from 'vue'
import App from './App.vue'
import router from './router'
// import store from './vuex/store'

import $ from 'jquery'
window .$ = $

//vuex引入
import Vuex from 'vuex'
Vue.use(Vuex)


//vant的引入
import vant from 'vant'
import 'vant/lib/vant-css/index.css'
import { Loading } from 'vant'


// axios的引入及使用
import axios from 'axios'
Vue.prototype.$http=axios;

Vue.use(Loading);

Vue.use(vant);

Vue.config.productionTip = false

// muse.ui
import MuseUI from 'muse-ui';
import 'muse-ui/dist/muse-ui.css';

Vue.use(MuseUI);


new Vue({
  router,
  // store,
  el: '#app',
  render: h => h(App)
})
