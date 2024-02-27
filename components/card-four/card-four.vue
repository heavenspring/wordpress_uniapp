<template>
	<view>
		<view class="prefer-title margin-top"><text class="cuIcon-newfill text-orange margin-right"></text>最新</view>
		<view class="my-cu-card radius" v-for="(item ,index) in threadsData" :key="index">
			
			
			<view  class="cu-item bg-img"  :data-url="item" @tap="goDetail(item.id)">
				<view  style="width:100%;overflow: hidden;border-radius: 4px;">
					<image class="bg-white" :src="item.full_image_url" style="width: 100%;border-radius: 4px;" mode="widthFix"></image>
				</view>
				<view class="cover">
		
				<view class="cardTitle padding-xs">
					{{item.title}}
				</view>
				<view class="padding-xs intro">
					{{item.intro}}
				</view>
				<view class="padding-xs summary flex">
					<view class="margin-right"><text class="cuIcon-hotfill text-orange padding-right-xs"></text>{{item.views}}</view>
					<view class="margin-right"><text class="cuIcon-discoverfill text-blue padding-right-xs"></text>{{item.post_categroy}}</view>
					<view class="margin-right"><text class="cuIcon-timefill text-mauve padding-right-xs "></text>{{item.post_date}}</view>
						
				</view>
				</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		props: {
		  threadsData: {
		    type: Array,
		    default: ''
		  }
		},
		onShow() {
			
			console.log(this.item)
		},
		methods:{
			goDetail(id){
				
				uni.navigateTo({
					url:"../../pages/detail/detail?id="+id
				})
			}
		}
	}
</script>

<style>
	
	.prefer-title {
		font-size: 1.1rem;
		font-weight: 500;
		line-height: 50upx;
		margin-bottom: 20upx;
		padding-left: 15px;
		
		
		
	}
	.my-cu-card{
		margin: 15px 15px 80px 15px;
		
	}
	.cover{
		/* position: absolute; */
		bottom: 0px;
		/* background-color: rgba(0,0,0,.5); */
	}
	.cardCate{
		color: #555;
		/* padding: 20upx 60upx; */
		font-size: 20upx;
		transform: skew(-10deg, 0deg);
		position: relative;
	
	}
	.cardTitle {
		color: #191919;
		/* padding: 30upx 60upx; */
		font-size: 1.1rem;
		/* font-weight: bold; */
		/* transform: skew(-10deg, 0deg);
		position: relative; */
		font-weight: bold;
		overflow: hidden;
		  text-overflow: ellipsis;
		  display: -webkit-box;
		  display: box;
		  -webkit-box-orient: vertical;
		  -webkit-line-clamp: 2;
		  /* height: 74px; */
		
	}
	.intro{
		color: #949494;
		overflow: hidden;
		  text-overflow: ellipsis;
		  display: -webkit-box;
		  display: box;
		  -webkit-box-orient: vertical;
		  -webkit-line-clamp: 2;
		  font-size: 0.8rem;
		  height: 40px;
		
	}
	.summary{
		color: #949494;
		line-height: 8px;
		font-size: 0.7rem;
		margin-top: 8px;
	}
	
	.cardTitle::before {
		/* content: "";
		position: absolute;
		width: 60upx;
		height: 6upx;
		border-radius: 20upx;
		background-color: #fff;
		display: block;
		top: 60upx;
		left: 50upx;
		transform: skew(10deg, 0deg); */
	}
	
	.cardTitle::after {
		content: "";
		position: absolute;
		width: 140upx;
		border-radius: 6upx;
		height: 24upx;
		background-color: #fff;
		display: block;
		bottom: 76upx;
		left: 90upx;
		transform: skew(10deg, 0deg);
		opacity: 0.1;
	}
	
	
	
	

</style>
