<template>
	<view>
		<cu-custom bgColor="bg-white" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">搜索</block>
		</cu-custom>


		<view class="cu-bar bg-white search">
			<view class="search-form round">
				<text class="cuIcon-search"></text>
				<input type="text" placeholder="输入搜索的关键词" @input="goSearch" ></input>
			</view>
		</view>
		
		<card-two :items="threadsData"></card-two>
	</view>
</template>

<script>
	import {
		BASE_API
	} from '@/config/app.js';
	export default {
		data() {
			return {
				threadsData:[],
				keyword:''
			}
		},
		onReachBottom: function() {
			const _this = this;
			_this.page += 1;
			this.threads(_this.page);
		},
		methods: {
			goSearch:function(e){
				console.log(e.detail.value)
				const keyword = e.detail.value;
				this.keyword = keyword
				this.threads()
			},
			
			threads: function(page = 1) {
				var _this = this;
				uni.request({
					url: BASE_API + 'dengje-minprogram/v1/post/search',
					data: {
						page,
						keyword:_this.keyword
					},
					method: "GET",
					success(res) {
						// console.log(res)
						console.log(res.data)
						if(page ==1){
							_this.threadsData = res.data;
						}else{
							_this.threadsData = _this.threadsData.concat(res.data);
						}
			
						
			
					}
				})
			},
		}
	}
</script>

<style>
	page{
		background-color: #FFFFFF;
	}
</style>
