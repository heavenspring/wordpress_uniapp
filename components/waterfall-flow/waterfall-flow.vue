<template>
	<view class="container">
		<view class="list">
			<view class="list-item"  v-for="(item,index) in imgList" :key="index" @click="bindTab(item.id)">
				<image class="item-img" :src="item.full_image_url" mode="widthFix"></image>
				<view class="content">
					{{item.title}}
					<view class="slot">
						<slot></slot>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			imgList:{
				type:Array,
				default:()=>{
					return []
				}
			}
		},
		data() {
			return {
				
			}
		},
		onLoad() {
			
		},
		methods: {
			bindTab(id){
				uni.navigateTo({
					url:"../../pages/detail/detail?id="+id
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container{
		height: 100vh;
		overflow-y: scroll;
		background-color: rgba(226, 226, 226, 0.452);
	}
	.list {
	  padding-top: 4rpx;
	  column-count: 2;
	  column-gap: 18rpx;
	  margin: 10px;
	  .list-item {
	    display: inline-block;
	    margin-top: 8px;
	    width: 326rpx;
	    // background: white;
	    box-shadow: 0 0 10rpx 0 rgba(194, 194, 194, 0.1);
	    border-radius: 8px;
	    border-radius: 14rpx;
	    break-inside: avoid;
	    padding-bottom: 20rpx;
	    overflow: auto;
		.item-img{
			width: 100%;
			height: 200px;
			border-radius: 4px;
		}
		.content{
			 width: 94%;
			 margin-left: 3%;
			 font-size: 1.1rem;
			 font-weight: 500;
			 margin-top: 10px;
			  word-break: break-all;
		}
	  }
	}
	
</style>
