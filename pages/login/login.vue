<template>
	<view>
		<view class="nx-box">
			<image src="/static/images/logo.png" mode='aspectFit' class="nx-logo"></image>
			<!-- <view class="nx-title">LOGO区域</view> -->
			<view class="nx-form">
				<input class="nx-input" placeholder-style="color:#eeeeee;font-size:28rpx" placeholder="请输入用户名"
					v-model="login.loginName" />
				<input class="nx-input" placeholder-style="color:#eeeeee;font-size:28rpx" password placeholder="请输入密码"
					v-model="login.password" />
<!-- 				<checkbox-group class="remember" @change="rememberChange">
					<checkbox value="1" :checked="pwdFlag == 1">记住密码</checkbox>
				</checkbox-group> -->
				<!-- <view class="nx-label">忘记密码？</view> -->
				<view class="nx-label"></view>
				<button class="nx-btn" @tap="loginFunction">立即登录</button>
				<!-- <navigator url="./register" hover-class="none" class="nx-label">还没有账号？点此注册.</navigator> -->
			</view>
		</view>
	</view>
</template>

<script>
	import {
		BASE_API
	} from '@/config/app.js';
	import {
		mapState,
		mapMutations
	} from 'vuex';
	export default {
		computed: {
			...mapState(['HasLogin', 'userInfo'])
		},

		data() {
			return {
				login: {
					loginName: '', //手机号码
					password: '' //密码
				},
				pwdFlag: 0, //1记住密码
				serverUrl: '', //服务器地址
			};
		},
		onLoad: function() {
			this.serverUrl = this.$serverUrl;
			let obj = uni.getStorageSync('pwd');
			if (obj) {
				obj = JSON.parse(obj);
				this.login.loginName = obj.account;
				this.login.password = obj.pwd;
				this.pwdFlag = 1;
			}
		},
		methods: {
			...mapMutations(['loginIn']),
			//记住密码
			rememberChange(e) {
				if (e.detail.value.length == 1) {
					//记住密码
					this.pwdFlag = 1;
				} else {
					this.pwdFlag = 0;
					uni.removeStorageSync('pwd');
				}
			},
			//当前登录按钮操作
			loginFunction() {
				let that = this;
				this.$func.showLoading('登录中');
				if (!that.login.loginName) {
					this.$func.showToast('请输入账户');
					return;
				}

				if (!that.login.password) {
					this.$func.showToast('请输入密码');
					return;
				}

				let d = {
					login: this.login.loginName,
					pass: this.login.password,
				};
				if (this.pwdFlag == 1) {
					uni.setStorageSync('pwd', JSON.stringify(d));
				}
				uni.request({
					url: BASE_API + 'dengje-minprogram/v1/common/login',
					data: d,
					method: "POST",
					success(res) {
						debugger
						console.log(res)
						if(res.data.success){
							that.loginIn(res.data.data);
							uni.navigateBack();
							uni.hideLoading();
						}else{
							console.log(res.data.message)
							uni.hideLoading();
							that.$func.showToast(res.data.message?res.data.message:'访问服务器失败');
						}
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.remember {
		margin-top: 30rpx;
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
	}

	.nx-box {
		padding: 0 100upx;
		position: relative;
	}

	.nx-logo {
		width: 100%;
		width: 100%;
		height: 310upx;
	}

	.nx-title {
		position: absolute;
		top: 120rpx;
		line-height: 360upx;
		font-size: 68upx;
		color: #fff;
		text-align: center;
		width: 100%;
		margin-left: -100upx;
	}

	.nx-form {
		margin-top: 170rpx;
	}

	.placeholder-class {
		color: #EEEEEE;
	}

	.nx-input {
		color: #FFFEFE;
		font-size: 28rpx;
		background: $wxq-color-mainColor;
		margin-top: 30upx;
		border-radius: 100upx;
		padding: 20upx 40upx;
		box-sizing: content-box;
	}


	.nx-label {
		padding: 60upx 0;
		text-align: center;
		font-size: 30upx;
		color: #a7b6d0;
	}

	.nx-btn {
		background: $wxq-color-mainColor;
		color: #fff;
		border: 0;
		border-radius: 100upx;
		font-size: 36upx;
	}

	.nx-btn:after {
		border: 0;
	}

	/*按钮点击效果*/
	.nx-btn.button-hover {
		transform: translate(1upx, 1upx);
	}
</style>