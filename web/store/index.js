import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		menu: [
			{name: '首页', type: 'index', url: '/pages/index/index', show: false},
			{name: '无码性爱', type: 'wumavideo', url: '/pages/list/list?type=wumavideo', show: false},
			{name: '经典三级', type: 'sanjivideo', url: '/pages/list/list?type=sanjivideo', show: true},
			{name: '卡通动漫', type: 'dongmanvideo', url: '/pages/list/list?type=dongmanvideo', show: true},
			{name: '有码视频', type: 'youmavideo', url: '/pages/list/list?type=youmavideo', show: false},
			{name: '自拍偷拍', type: 'zipaivideo', url: '/pages/list/list?type=zipaivideo', show: true},
			{name: '欧美口味', type: 'oumeivideo', url: '/pages/list/list?type=oumeivideo', show: false},
			{name: '另类风情', type: 'lingleivideo', url: '/pages/list/list?type=lingleivideo', show: true}
		]
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
