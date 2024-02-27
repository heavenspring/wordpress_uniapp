<template>
	<view>
		<view class="cu-custom "  :style="[{height:CustomBar + 'px'}]">
			<view class="cu-bar fixed none-bg text-white bg-img"  :style="style" >
				<view class="action">
					<view class="flex">
						<view class="action text-black">
							
						</view>
						<view class="search-form round">
							<text class="cuIcon-search"></text>
							<input  @click="InputChange" :adjust-position="false" type="text" placeholder="搜索标题、内容、标签" confirm-type="search"></input>
						</view>
						
					</view>
				</view>
				
				
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar
			};
		},
		name: 'cu-customs',
		computed: {
			style() {
				var StatusBar= this.StatusBar;
				var CustomBar= this.CustomBar;
				var bgImage = this.bgImage;
				var bgColor = this.bgColor;
				var style = `height:${CustomBar}px;padding-top:${StatusBar}px;background-color:${bgColor}`;
				if (this.bgImage) {
					style = `${style}background-image:url(${bgImage});`;
				}
				
				
				return style
			}
			
		},
		props: {
			bgColor: {
				type: String,
				default: ''
			},
			isBack: {
				type: [Boolean, String],
				default: false
			},
			bgImage: {
				type: String,
				default: ''
			},
			textColor:{
				type: String,
				default: ''
			},
			logo:{
				type: String,
				default: ''
			}
		},
	
		methods: {
			BackPage() {
				uni.navigateBack({
					delta: 1
				});
			},
			InputChange:function(){
				uni.navigateTo({
					url:'../../pages/search/search'
				})
			}
		}
	}
</script>

<style>

</style>
