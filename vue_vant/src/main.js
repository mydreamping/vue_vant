import Vue from 'vue'
import App from './App.vue'
import router from './router'
// import store from './vuex/store'

import $ from 'jquery'
window .$ = $

//vuex引入
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
	//状态
	state: {
		searchText: "",
	},
	//
	mutations: {
		changeSearchText(state, data) {
			state.searchText = data;
		}
	},
	actions: {
		setSearchText(context, data) {
			context.commit('changeSearchText', data)
		},
	},
	getters:{
		getSearchText(state){
			return state.searchText
		}
	}
	//actions---(commit)--->mutations----->state
})





//vant的引入
import vant from 'vant'
import 'vant/lib/vant-css/index.css'
import { Loading } from 'vant'

// axios的引入及使用
import axios from 'axios'
Vue.prototype.$http=axios;

Vue.use(Loading);

Vue.use(vant);




new Vue({
  router,
  store,
  el: '#app',
  render: h => h(App)
})
