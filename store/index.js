import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		menu: {aa: '列表aa', bb: '列表bb'}
	},
	mutations: {
		login(state, provider) {
			state.hasLogin = true;
		}
	},
	actions: {
		
	}
})

export default store
