<template>
	<view>

	
		<view class="UCenter-bg" :style="[{backgroundImage:'url('+centerBg+')'}]">
			<view class="flex justify-between user-info">
				<view>
					<view class="dj-avatar">
						<open-data type="userAvatarUrl"></open-data>
					</view>
				</view>
				<view class="text-xxl text-bold margin-top text-white">
					<open-data type="userNickName"></open-data>
				</view>
			</view>


			<view class="dj-item-box padding">
				<view class="flex padding-xs dj-item">
					<view class="padding"><text class="dj-icon-lg cuIcon-weixin text-green"></text></view>
					<view class="text-lg text-bold padding">微信公众号</view>
				</view>
				<view class="flex padding-xs dj-item">
					<view class="padding"><text class="dj-icon-lg cuIcon-newfill text-green"></text></view>
					<view class="text-lg text-bold padding">作者微信</view>
				</view>
				<view class="flex padding-xs dj-item" @tap="goAbout">
					<view class="padding"><text class="dj-icon-lg cuIcon-creativefill text-mauve"></text></view>
					<view class="text-lg text-bold padding">关于</view>
				</view>
			</view>




			<view class="footer">
				v 1.0.2
			</view>
		</view>
	</view>
</template>

<script>
	import {
		BASE_API
	} from '@/config/app.js';
	export default {
		data() {
			return {
				centerBg: '',
			}
		},
		computed: {

		},
		onLoad() {
			this.userBgUrls();
		},
		methods: {
			goAbout: function() {
				uni.navigateTo({
					url: '../about/about'
				})
			},
			userBgUrls: function() {

				const _this = this;
				uni.request({
					url: BASE_API + 'dengje-minprogram/v1/common/config',
					data: {
						key: 'user-bg'
					},
					method: "GET",
					success(res) {
						console.log('j:', res.data)
						_this.centerBg = res.data;

					}
				})
			},

		}
	}
</script>


<style>
	page {
		background-color: #FFFFFF;
	}

	.user-info {
		    margin: 121px 67px 0 38px;
	}

	.dj-avatar {
		width: 60px;
		height: 60px;
		border-radius: 50%;
		overflow: hidden;

	}

	.UCenter-bg {
		background-size:cover;
		position: absolute;
		width: 100%;
		height: 256px;
		box-sizing: border-box;

	}

	

	.UCenter-bg image {
		width: 200rpx;
		height: 200rpx;
	}

	.UCenter-bg .gif-wave {
		position: absolute;
		width: 100%;
		bottom: 0;
		left: 0;
		z-index: 99;
		mix-blend-mode: screen;
		height: 100rpx;
	}

	map,
	.mapBox {
		left: 0;
		z-index: 99;
		mix-blend-mode: screen;
		height: 100rpx;
	}

	map,
	.mapBox {
		width: 750rpx;
		height: 300rpx;
	}

	.dj-item {
		line-height: 30px;
	}

	.dj-item-box {
		position: relative;
		background-color: #fff;
		top: 60px;
		border-radius: 16px;
	}

	.dj-icon-lg {
		font-size: 1.9rem;
		line-height: 8px;
	}

	.footer {
		position: fixed;
		bottom: 8px;
		width: 100%;
		font-size: 0.8rem;
		text-align: center;
		color: #949494;
	}
</style>
