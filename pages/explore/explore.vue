<template>
	<view>
		<cu-custom bgColor="bg-white" :isBack="false">
			<!-- <block slot="backText">返回</block> -->
			<block slot="content">发现</block>
		</cu-custom>

		<view class="cu-bar bg-white search">
			<view class="search-form round">
				<text class="cuIcon-search"></text>
				<input type="text" placeholder="输入搜索的关键词" @click="InputChange" confirm-type="search"></input>
			</view>

		</view>
		<view class="margin text-bold">标签</view>
		<view class="margin bg-white">
			<view class='cu-tag radius margin-bottom ' v-for="(item,index) in postTagData" :key="index"
				:data-term_id="item.term_id" data-type="tag" @tap="goPostList">{{item.name}}</view>
		</view>

		<view class="margin text-bold">分类</view>
		<view class="flex justify-between margin radius" v-for="(item,index) in categoryData" :key="index"
			:data-id="item.term_id" @tap="goCate">
			<view>
				<view class="text-xl text-bold">
					{{item.name}}

				</view>
				<view class="category-intro">
					{{item.intro}}
				</view>
				<view class="margin-top-xs">
					<view class='cu-tag radius bg-purple'>88篇</view>
				</view>
			</view>
			<view>

				<image class="radius" v-if="item.image" style="width: 160px;height: 90px;" :src="item.image"
					mode=""></image>
				<image src="../../static/images/user-bg.jpg" class="radius" style="width: 160px;height: 90px;" mode=""
					v-else></image>
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
				postTagData: [],
				categoryData: []
			}
		},
		onLoad() {
			this.category()
			this.postTag()
		},
		onPullDownRefresh() {
			console.log('refresh');
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		onReachBottom: function() {
			
			uni.vibrateShort({
			    success: function () {
			        console.log('success');
			    }
			});
		},
		methods: {
			category: function() {
				const _this = this;
				uni.request({
					url: BASE_API + 'dengje-minprogram/v1/common/category',
					data: {

					},
					method: "GET",
					success(res) {
						console.log(res)
						_this.categoryData = res.data;

					}
				})
			},
			postTag: function() {
				const _this = this;
				uni.request({
					url: BASE_API + 'dengje-minprogram/v1/common/posttag',
					data: {

					},
					method: "GET",
					success(res) {
						console.log(res)
						_this.postTagData = res.data;

					}
				})
			},
			goCate: function(e) {
				const id = e.currentTarget.dataset.id;
				uni.navigateTo({
					url: "../category/category?id=" + id
				})
			},
			goPostList: function(e) {
				const term_id = e.currentTarget.dataset.term_id;
				const type = e.currentTarget.dataset.type;
				uni.navigateTo({
					url: "../posts-list/posts-list?term_id=" + term_id + '&type=' + type
				})
			},
			InputChange: function() {
				uni.navigateTo({
					url: '../../pages/search/search'
				})
			}
		}
	}
</script>

<style>
	page {
		background-color: #fff;

	}

	.dj-cate-box {
		min-height: 150px;
	}

	.category-intro {
		color: #949494;
		min-height: 35px;
		font-size: 0.8rem;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		display: box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
	}
</style>
