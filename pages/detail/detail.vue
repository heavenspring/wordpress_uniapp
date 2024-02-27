<template>
	<view>
		<cu-custom :bgColor="'bg-white'" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">{{title}}</block>
		</cu-custom>
		<image :src="full_image_url" mode="widthFix" style="width: 100%;"></image>

		<view class="content-box">
			<view class="text-bold padding text-xl">
				{{title}}
			</view>
			<view class="flex justify-between margin">

				<view><text class="cuIcon-discoverfill text-blue padding-right-xs"></text>{{category}}</view>
				<view><text class="text-purple cuIcon-timefill padding-right-xs"></text>{{postTime}}</view>

			</view>
			<view class="padding rich-box" style="width: 100%;">
				<mp-html :content="content" />

			</view>
		</view>

	

		<view class="footer">
			<view class="footer-item" @tap="goHome"><text class="iconfont icon-shouye"></text></view>
			<view class="footer-item" @tap="copyWx"><text class="iconfont icon-weixin"></text></view>
			<view class="footer-item" :data-id="id" @tap="poster"><text class="iconfont icon-pengyouquan"></text></view>
			<view class="footer-item"><button open-type="share"><text class="iconfont icon-fenxiang"></text></button>
			</view>
		</view>


        <poster v-if="list.length"  :list="list" background-color="#FFF" :width="750" :height="1334"
        	@on-success="posterSuccess" @on-error="posterError" ref="poster"></poster>
			

		<orange-fulll-page :showpage='showloading' icon="../../static/images/loading.gif"></orange-fulll-page>

	</view>
</template>

<script>
	import {
		BASE_API
	} from '@/config/app.js';
	import Poster from '@/components/zhangyuhao-poster/Poster.vue'
	export default {
		data() {
			return {
				id:0,
				showempty:false,
				showloading:true,
				full_image_url: '',
				postTime: '',
				category: '',
				title: '',
				content: '',
				posterData: {},
				list: [],
				posterPath: '',
				loadicon:'/static/images/loading.gif'
				

			}
		},
		components: {
			Poster
		},
		onLoad(options) {
            console.log(options)
			if(options.scene){
				let id = options.scene
				this.id = id;
				this.detail(id);
			}else{
				let id = options.id
				this.id = id;
				this.detail(id);
			}
			
		

		},
		onShareAppMessage() {},
		methods: {
			poster:function(){
				
				this.getPoster()
			},
			detail: function(id) {
				var _this = this;
				uni.request({
					url: BASE_API + 'dengje-minprogram/v1/post/detail',
					data: {
						id
					},
					method: "GET",
					success(res) {
						_this.full_image_url = res.data.full_image_url;
						_this.title = res.data.post_title;
						_this.postTime = res.data.post_date;
						_this.category = res.data.post_categroy;
						_this.content = res.data.post_content.replace(/\<img/gi,
							'<img style="max-width:100%;height:auto;display:block;border-radius: 4px;margin:9px 0px;" '
							);

						
						_this.showloading = false;

					}
				})
			},
			copyWx:function(){	
						uni.request({
							url: BASE_API + 'dengje-minprogram/v1/common/config',
							data: {
								key: 'wx'
							},
							method: "GET",
							success(res) {
								uni.setClipboardData({
								    data: res.data,
								    success: function () {
										uni.showToast({
										    title: '已复制微信号',
										    duration: 2000
										});
										}})
							
							}
						})
				        
				
			},
			goHome:function(){
				uni.reLaunch({
					url:'../index/index'
				})
			},
			makePoster() {
				const _this = this;
				let list = [];
				list.push({
					type: 'image',
					path: _this.posterData.qrcode,
					x: 199,
					y: 900,
					width: 320,
					height: 320
				})
			
				list.push({
					type: 'image',
					path: _this.posterData.logo,
					x: 31,
					y: 41,
					width: 110,
					height: 110,
					shape: 'circle'
				})
			
				list.push({
					type: 'image',
					path: _this.posterData.full_image_url,
					x: 31,
					y: 180,
					width: 690,
					height: 410,
			
				})
			
				list.push({
					type: 'text',
					x: 160,
					y: 61,
					text: _this.posterData.name,
					size: 28,
					color: '#999'
				})
				list.push({
					type: 'text',
					x: 160,
					y: 105,
					text: '向你推荐了一篇文章,请查收.',
					size: 28,
					color: '#000'
				})
				list.push({
					type: 'textarea',
					x: 31,
					y: 705,
					text: _this.posterData.intro,
					size: 38,
					color: '#000',
					width: 650,
					height: 90
				})
				uni.showLoading({
					title: '生成海报'
				});
			
				_this.list = list;
			
			},
			posterSuccess(res) {
				console.log(res)
				let _this = this;
				_this.posterPath = res
				 // 预览图片
				        uni.previewImage({
				            urls: [_this.posterPath],
				            longPressActions: {
				                itemList: ['发送给朋友', '保存图片', '收藏'],
				                success: function(data) {
				                    console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
				                },
				                fail: function(err) {
				                    console.log(err.errMsg);
				                }
				            }
				        });
				uni.hideLoading()
			},
			posterError(err) {
				console.log('err', err)
			},
			getPoster() {
				const _this = this;
				const id = this.id;
				uni.request({
					url: BASE_API + 'dengje-minprogram/v1/post/poster',
					data: {
						id
					},
					method: "GET",
					success(res) {
			
						_this.posterData = res.data;
						uni.showLoading({
							title: '生成小程序码'
						});
						
						_this.makePoster()
			
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	body {
		background-color: #FFFFFF;

	}

	.rich-box {
		letter-spacing: 2px;
		font-size: 28upx;
		color: #333232;
		line-height: 60upx;

	}

	.content-box {
		background-color: #fff;
		height: 100%;
		width: 100%;
		border-radius: 20px;
		position: absolute;
		top: 280px;
	}

	.footer {
		position: fixed;
		bottom: 0px;
		display: flex;
		justify-content: space-around;
		width: 100%;
		background-color: #FFFFFF;

		padding-bottom: env(safe-area-inset-bottom);

		.footer-item {
			display: flex;
			align-items: center;
			justify-content: center;
			padding: 15px 0;

			text {
				font-size: 1.2rem;
			}

			button {
				background-color: #FFFFFF;
			}

			button::after {

				border: 0;

			}
		}
	}
</style>
