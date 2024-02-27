<template>
	<view class="prefer-content">
		<!-- 标题 -->
		<view class="flex justify-between">
			<view class="prefer-title">为你优选</view>
			<view>查看全部</view>
		</view>
		
		<scroll-view scroll-x="true" class="scroll" scroll-with-animation="true">
			<view class="prefer-dis">
				<block v-for="(item, index) in preferdata" :key="index">
					<view class="prefer-view" @tap="goDetail(item.id)">
						<view class="info">
							<image :src="item.full_image_url" mode="aspectFill"></image>
							<view class="fbox" style="padding: 8px;">
								<view class="info-title text-bold">{{ item.title }}</view>
								<view class="info-cate">{{ item.post_categroy }}</view>
							</view>
						</view>
					</view>
				</block>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		props: {
			preferdata: Array
		},
		data() {
			return {};
		},
		methods: {
			goDetail(id) {
				console.log(99)
				uni.navigateTo({
					url: "../../pages/detail/detail?id=" + id
				})
			}
		}
	};
</script>

<style scoped>
	.prefer-content {
		margin: 30upx 15px;
	}

	.prefer-title {
		font-size: 1.1rem;
		font-weight: 500;
		height: 50upx;
		line-height: 50upx;
		margin-bottom: 40upx;
	}

	.scroll {
		/* white-space: nowrap; */
		width: 100%;
	
	}
	.fbox{
		position: absolute;
		top: 128px;
		width: 100%;
	}

	.prefer-dis {
		display: flex;
		justify-content: space-between;
	}

	.prefer-view {

		width: 300upx;
		padding: 0 8upx;
		border-radius: 4px;
	}

	.prefer-view image {
		width: 300upx;
		height: 360upx;
		border-radius: 4px;
	}

	.prefer-view .info .fbox .info-title {

		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		display: box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		height: 30px;
		padding-bottom: 10px;
		font-size: 0.8rem;
		color: #fff;

	}

	.prefer-view .info .info-cate {

		text-overflow: ellipsis;
		display: -webkit-box;
		display: box;
		color: #fff;
		font-size: 0.6rem;

	}

	.info {
		border-radius: 4px;


	}

	/* .prefer-view text:nth-child(2) {
	font-size: 30upx;
}
.prefer-view text:nth-child(3) {
	font-size: 27upx;
	color: #9c9c9c;
}
.prefer-dis view:nth-child(2) {
	padding: 0 7upx !important;
} */
</style>
