<template>
	<view v-if="showpage" class="fullloading" :style="{backgroundColor: bgcolor}">
		<image :src="icon" :style="{width:iconwidth+'rpx',height:iconheight+'rpx'}"></image>
		<view class="text" v-if="text" :style="{fontSize:textsize+'rpx',color:textcolor}">{{text}}</view>
		
	</view>
	
</template>
<script>
	export default {
		name:"orange-full-page",
		props: {
			icon: {
				type: String,
				default() {
					return ''
				}
			},
			text: {
				type: String,
				default() {
					return ''
				}
			},
			iconwidth: {
				type: [Number, String],
				default() {
					return 350
				}
			},
			iconheight: {
				type: [Number, String],
				default() {
					return 350
				}
			},
			textcolor: {
				type: String,
				default() {
					return '#000000'
				}
			},
			textsize: {
				type: [Number, String],
				default() {
					return 30
				}
			},
			bgcolor: {
				type: String,
				default() {
					return '#ffffff'
				}
			},
			showpage: {
				type: Boolean,
				default() {
					return true
				}
			},
		},
		data() {
			return {
				loadingImg: '',
				errorImg: ''
			}
		},
		methods: {
			
		}
	}
</script>
<style scoped>
	.fullloading{
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		background-color: #fff;
		text-align: center;
		z-index: 99999;
	}
	.fullloading image{
		width: 250rpx;
		height: 250rpx;
		margin-top: 60%;
	}
</style>