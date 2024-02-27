<template>
	<view>
		<cu-custom bgColor="bg-white" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">分类</block>
		</cu-custom>

		<card-two :items="items"></card-two>

		<orange-fulll-page :showpage='showempty' icon="../../static/images/empty.png"></orange-fulll-page>
		<orange-fulll-page :showpage='showloading' icon="../../static/images/loading.gif"></orange-fulll-page>
	</view>
</template>

<script>
	import {
		BASE_API
	} from '@/config/app.js';
	export default {
		data() {
			return {
				items: [],
				page: 1,
				id: 0,
				showempty:false,
				showloading:true
			}
		},
		onLoad(options) {
			console.log(options)
			var id = options.id;
			this.id = id;
			this.threads(id)
		},
		onReachBottom: function() {
			const _this = this;
			uni.vibrateShort({
			    success: function () {
			        console.log('success');
			    }
			});
			_this.page += 1;
			this.threads(_this.id, _this.page);
			
		},
		methods: {
			threads: function(id, page = 1) {
				var _this = this;
				uni.request({
					url: BASE_API + 'dengje-minprogram/v1/post/listbycate',
					data: {
						page,
						'cate_id': id
					},
					method: "GET",
					success(res) {
						

						_this.items = _this.items.concat(res.data);
						if(_this.items.length <=0){
							_this.showempty = true;
				
						}
						_this.showloading = false;

					}
				})
			},
			bindTab(id) {

				uni.navigateTo({
					url: "../../pages/detail/detail?id=" + id
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #FFFFFF;
	}

	
</style>
