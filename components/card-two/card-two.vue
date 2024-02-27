<template>
	<view>
		<view class="flex justify-start list-box" v-for="(item,index) in items" :key="index" @click="bindTab(item.id)">
			<view class="margin-right">
				<image style="width: 160px;height: 119px;" class="radius" :src="item.full_image_url" mode="aspectFill"></image>
				
			</view>
			<view class="dj-right-box">
				
				<view class="title">{{item.title}}</view>
				<view class="intro-box">{{item.intro}}</view>
				<view class="flex fbox">
					<view class="padding-right-xs"><text class="cuIcon-hotfill text-purple padding-right-xs "></text>{{item.views}}</view>
					<view class="padding-right-xs"><text class="cuIcon-timefill text-mauve padding-right-xs "></text>{{item.post_date}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			items:{
				type:Array,
				default:()=>{
					return []
				}
			}
		},
		components: {},
		data() {
			return {
				formData: {
					status: 'loading', // 加载状态
				},
				tipShow: false // 是否显示顶部提示框
			};
		},
		onLoad() {},
		methods: {
			bindTab(id) {
				
				uni.navigateTo({
					url:"../../pages/detail/detail?id="+id
				})
			}
		},
		/**
		 * 下拉刷新回调函数
		 */
		onPullDownRefresh() {
			this.formData.status = 'more'
			this.$refs.udb.loadData({
				clear: true
			}, () => {
				this.tipShow = true
				clearTimeout(this.timer)
				this.timer = setTimeout(()=>{
					this.tipShow  = false
				},1000)
				uni.stopPullDownRefresh()
			})
		},
		/**
		 * 上拉加载回调函数
		 */
		onReachBottom() {
			this.$refs.udb.loadMore()
		}
	};
</script>

<style lang="scss">


	
	.list-box{
		// border-bottom: 1px solid #f3f3f3;
		margin: 15px;
	}
	.title{
		overflow: hidden;
		  text-overflow: ellipsis;
		  display: -webkit-box;
		  display: box;
		  -webkit-box-orient: vertical;
		  -webkit-line-clamp: 2;
		      font-size: 1.1rem;
			  min-height: 49px;
		  font-weight: bold;
	}
	.dj-right-box{
		width: 200px;
	}
	.intro-box{
		 overflow: hidden;
		  text-overflow: ellipsis;
		  display: -webkit-box;
		  display: box;
		  -webkit-box-orient: vertical;
		  -webkit-line-clamp: 2;
		  padding-top: 5px;
		  color: #949494;
		  font-size: 0.8rem;
		  min-height: 40px;
	}
	.fbox{
		line-height: 32px;
		color: #949494;
		font-size: 0.7rem;
	}

	.tips {
		color: #67c23a;
		font-size: 14px;
		line-height: 40px;
		text-align: center;
		background-color: #f0f9eb;
		height: 0;
		opacity: 0;
		transform: translateY(-100%);
		transition: all 0.3s;
	}

	.tips-ani {
		transform: translateY(0);
		height: 40px;
		opacity: 1;
	}

	.content {
		width: 100%;
		display: flex;
	}

	.list-picture {
		width: 100%;
		height: 145px;
	}

	.thumb-image {
		width: 100%;
		height: 100%;
	}

	.ellipsis {
		display: flex;
		overflow: hidden;
	}

	.uni-ellipsis-1 {
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	.uni-ellipsis-2 {
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}
</style>
