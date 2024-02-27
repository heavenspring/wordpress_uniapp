<template>
	<view>
		<web-view :webview-styles="webviewStyles" :src="url"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				webviewStyles: {
					progress: {
						color: '#FFF'
					}
				},
				url:''
			}
		},
		onLoad(options) {
			// console.log(options)
			this.url = options.url;
		},
		methods: {

		}
	}
</script>

<style>

</style>
