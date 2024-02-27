<template>
	<view>
		<cu-custom bgColor="bg-white" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">列表</block>
		</cu-custom>
		<card-two :items="itemsData"></card-two>

	
	</view>
</template>

<script>
	import {
		BASE_API
	} from '@/config/app.js';
	export default {
		data() {
			return {
				itemsData:[],
				page:1,
				term_id:0
			}
		},
		onLoad(options) {
			var term_id = options.term_id;
			this.getPostsBytag(term_id)
		},
		onReachBottom: function() {
			const _this = this;
			uni.vibrateShort({
			    success: function () {
			        console.log('success');
			    }
			});
			_this.page += 1;
			this.getPostsBytag(_this.term_id, _this.page);
		},
		methods: {
			getPostsBytag: function(id, page = 1) {
				var _this = this;
				uni.request({
					url: BASE_API + 'dengje-minprogram/v1/post/listbytag',
					data: {
						page,
						'term_id': id
					},
					method: "GET",
					success(res) {
			
						console.log(99)
						_this.itemsData = _this.itemsData.concat(res.data);
			
					}
				})
			},
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #FFFFFF;
	}
	
	
</style>
