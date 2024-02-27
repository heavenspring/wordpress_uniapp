<template>
	<view>
		
		<view class="">
			<view class="cu-card article" :class="isCard?'no-card':''">
				
				<view class="cu-item shadow">
					<view class="light bg-yellow flex flex-direction">
						<text class="margin">TODAY</text>
						<text class="margin-bottom-xs margin-left  text-bold text-Abc text-xl text-yellow ">每日精选文章</text>
					</view>
					<view v-for="(item ,index) in items" :key="index">
						
					<view class="title"><view class="text-cut">{{item.thread.title}}</view></view>
					<view class="content">
						<image :src="item.attachment[0].url"></image>
						<view class="desc">
							<view class="text-content"> {{item.thread.summary}}</view>
						</view>
					</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
		  items: {
		    type: Array,
		    default: ''
		  }
		},
		onShow() {
			uni.request({
				url:''
			})
		}
	}
</script>

<style>

</style>
