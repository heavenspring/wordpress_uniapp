import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);
const store = new Vuex.Store({  
    state: {  
        HasLogin: false,
        userInfo:{
			user_email: "",
			user_nicename: "",
		},
    },  
    mutations: {  
        loginIn(state, provider) { 
           state.userInfo.user_email = provider.user_email;
           state.userInfo.user_nicename = provider.user_nicename?provider.user_nicename:'';
		   uni.setStorageSync('app_userInfo',provider);
            
        },  
        logout(state) {  
			uni.removeStorageSync('app_userInfo');
            state.HasLogin = false;  
            state.userInfo = {};
			
        },
		auth(state){
			let userInfo = uni.getStorageSync('app_userInfo');
			debugger
			if (!userInfo.user_email) {
				uni.navigateTo({
					url: "/pages/login/login"
				})
			}		
		}
    }  
})
export default store