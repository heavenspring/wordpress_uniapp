import Vue from 'vue'
import App from './App'
import {BASEURl} from './config/app.js';


import store from 'store'
Vue.prototype.$store = store

import cuCustom from './colorui/components/cu-custom.vue'
Vue.component('cu-custom',cuCustom)

Vue.prototype.$func = {
	//提示文字
	showToast(text, duration) {
		let d = 2000;
		if (duration) {
			d = duration;
		}
		uni.showToast({
			title: text,
			icon: 'none',
			mask: true,
			duration: d
		});
	},
	//加载层
	showLoading(text) {
		let t = '加载中...';
		if (text) {
			t = text;
		}
		uni.showLoading({
			mask: true,
			title: t,
		})
	},
	getNowTimeByDate(date){
		let year = date.getFullYear();
		let month = date.getMonth() + 1;
		let day = date.getDate();
		return year + "-" + month + "-" + day ; //精确到天
	},
};


App.mpType = 'app'
const app = new Vue({
	...App
})
app.$mount()
