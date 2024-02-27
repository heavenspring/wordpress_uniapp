<template>
	<view>
		<index-custom :bgColor="bgColor" :isBack="false">
			<block slot="backText">返回</block>
			<block slot="content">导航栏</block>
		</index-custom>

		<view class="margin-bottom">
			<scroll-view scroll-x class="bg-white nav" scroll-with-animation :scroll-left="scrollLeft">
				<view class="cu-item text-bold " :class="index==TabCur?'text-black cur':''"
					v-for="(item,index) in cateData" :key="index" @tap="goCate" :data-id="item.id">
					{{item.name}}
				</view>
			</scroll-view>
		</view>






		<view class="margin-left margin-right">
			<swiper class="screen-swiper" :class="dotStyle?'square-dot':'round-dot'" :indicator-dots="true"
				:circular="true" :autoplay="true" interval="5000" duration="500">
				<swiper-item v-for="(item,index) in swiperList" :key="index" :data-index="index" data-type="swiper"
					@tap="go">
					<image class="radius" :src="item.image.url" mode="aspectFill"></image>

				</swiper-item>
			</swiper>
		</view>

		<view class="cu-list grid col-4 no-border margin-top margin-bottom" v-if="isShowNav">
			<view class="" v-for="(item,index) in navList" :key="index" :data-index="index" data-type="nav" @tap="go">
				<view>
					<image style="width: 50px;height: 50px;" :src="item.image.url" mode=""></image>

				</view>
				<text>{{item.title}}</text>
			</view>
		</view>



		<card-two :items="postTopData"></card-two>


		<card-four :threadsData="threadsData" :included="threadsIncluded">{{item.data}}</card-four>



	</view>
</template>

<script>
	import {
		BASE_API
	} from '@/config/app.js';
	export default {
		data() {
			return {
				isShowNav: 0,
				navList: [],
				TabCur: 0, // tabs组件的current值，表示当前活动的tab选项
				scrollLeft: 0,
				bgColor: '#fff',
				textColor: '',
				verticalNavTop: 0,
				load: true,
				threadsData: [],
				cateData: [],
				postTopData: [],
				swiperList: [],
				logo: {},
				page: 1,
				threadsIncluded: [],
				scrollTop: 0,

			};
		},
		onPageScroll(res) {



		},
		onShareAppMessage() {},
		onLoad(res) {
			console.log(res)
			uni.showLoading({
				title: '加载中...',
				mask: true
			});
			this.cateList();
			this.threads();
			this.postTop();
			this.getNavList();



		},
		onReady() {
			uni.hideLoading()
		},
		onPullDownRefresh() {
			console.log('refresh');
			
			this.cateList();
			this.threads();
			this.postTop();
			this.getNavList();
			 uni.stopPullDownRefresh();
			
		},
		onReachBottom: function() {
			const _this = this;
			uni.vibrateShort({
			    success: function () {
			        console.log('success');
			    }
			});
			_this.page += 1;
			this.threads(_this.page);
		},
		methods: {

			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60

				// uni.navigateTo({
				// 	url: '../category/category?id=' + id
				// })
			},


			threads: function(page = 1) {
				var _this = this;
				uni.request({
					url: BASE_API + 'dengje-minprogram/v1/post/list',
					data: {
						page
					},
					method: "GET",
					success(res) {
						// console.log(res)
						console.log(res.data)

						_this.threadsData = _this.threadsData.concat(res.data);

					}
				})
			},
			postTop: function() {
				var _this = this;
				uni.request({
					url: BASE_API + 'dengje-minprogram/v1/post/recommend',
					data: {

					},
					method: "GET",
					success(res) {
						// console.log(res)
						console.log(res.data)

						_this.postTopData = res.data;

					}
				})
			},
			cateList: function() {
				var _this = this;
				uni.request({
					url: BASE_API + 'wp/v2/categories',
					data: {
						'_fields': 'name,id'

					},
					method: "GET",
					success(res) {
						// console.log(res)


						_this.cateData = res.data;

					}
				})

				uni.request({
					url: BASE_API,
					data: {
						'mod': 'config',
						'act': 'configData',

					},
					method: "GET",
					success(res) {


						_this.logo = res.data.data;

					}
				})

				// 轮播图
				uni.request({
					url: BASE_API + 'dengje-minprogram/v1/index/slide',
					data: {

					},
					method: "GET",
					success(res) {
						_this.swiperList = res.data;
					}
				})
			},

			getNavList: function() {
				const _this = this;
				uni.request({
					url: BASE_API + 'dengje-minprogram/v1/common/config',
					data: {
						key: 'is_show_nav'
					},
					method: "GET",
					success(res) {
						_this.isShowNav = res.data;
						if (res.data == 1) {
							uni.request({
								url: BASE_API + 'dengje-minprogram/v1/index/nav',
								data: {

								},
								method: "GET",
								success(res) {
									_this.navList = res.data;
								}
							})
						}
					}
				})
			},
			go: function(e) {

				const type = e.currentTarget.dataset.type;

				if (type == 'swiper') {

					console.log(e)
					const index = e.currentTarget.dataset.index;
					const navObj = this.swiperList[index];
					// console.log(navObj)

					if (navObj.slide_type == 1) {
						// 外部
						uni.navigateTo({
							url: '../web/web?url=' + navObj.url
						})
					} else if (navObj.slide_type == 0) {
						// 内部
						uni.navigateTo({
							url: navObj.url
						})
					} else if (navObj.slide_type == 2) {
						// 其他小程序
						uni.navigateToMiniProgram({
							appId: navObj.appid,
							path: navObj.url,
							extraData: {

							},
							success(res) {
								// 打开成功
							}
						})
					}

				} else if (type == 'nav') {

					// console.log(e)
					const index = e.currentTarget.dataset.index;
					const navObj = this.navList[index];
					// console.log(navObj)

					if (navObj.nav_type == 1) {
						// 外部
						uni.navigateTo({
							url: '../web/web?url=' + navObj.url
						})
					} else if (navObj.nav_type == 0) {
						// 内部
						uni.navigateTo({
							url: navObj.url
						})
					} else if (navObj.nav_type == 2) {
						// 其他小程序
						uni.navigateToMiniProgram({
							appId: navObj.appid,
							path: navObj.url,
							extraData: {

							},
							success(res) {
								// 打开成功
							}
						})
					}

				}


			},
			goCate: function(e) {
				const id = e.currentTarget.dataset.id;
				uni.navigateTo({
					url: "../category/category?id=" + id
				})
			}

		},
	}
</script>

<style>
	page{
		background-color: #ffffff;
	}
	.screen-swiper {
		min-height: 239rpx !important;
	}

	.search-postion {
		position: relative;
		top: -45px;
	}

	.body {
		position: relative;
		top: -45px;
	}
</style>
