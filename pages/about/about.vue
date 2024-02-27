<template>
	<view>
		<cu-custom bgColor="bg-white" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">关于</block>
		</cu-custom>
		<view class="logo">
			<image src="../../static/images/logo.png" mode="" style="height: 80px;width: 80px;"></image>
		</view>
		
		<view class="intro-text">
			
			WordPress友集博客｜资讯，期待您的使用
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {

		}
	}
</script>

<style>
	page{
		background-color: #fff;
	}
	.logo{
		text-align: center;
		margin-top: 120px;
	}
	.intro-text {
		text-align: center;
		margin: 50px;
		color: #949494;
		font-weight: bold;
		font-size: 1.03rem;
	}
</style>
