<template>
	<view class="canvas">
		<canvas canvas-id="myCanvas" :style="{width: width+'px',height: height+'px'}"></canvas>
	</view>
</template>
<!-- 
list参数说明：
 图片渲染：
 type: 'image',
 x: X轴位置,
 y: Y轴位置,
 path: 图片路径,
 width: 图片宽度,
 height: 图片高度,
 rotate: 旋转角度
 shape: 形状，默认无，可选值：circle 圆形
 area: {x,y,width,height}  // 绘制范围，超出该范围会被剪裁掉 该属性与shape暂时无法同时使用，area存在时，shape失效
 
 文字渲染：
 type: 'text',
 x: X轴位置,
 y: Y轴位置,
 text: 文本内容,
 size: 字体大小,
 textBaseline： 基线 默认top  可选值：'top'、'bottom'、'middle'、'normal'
 color: 颜色
 
 多行文字渲染：
 type: 'textarea',
 x: X轴位置,
 y: Y轴位置,
 width：换行的宽度
 height: 高度，溢出会展示“...”
 lineSpace: 行间距
 text: 文本内容,
 size: 字体大小,
 textBaseline： 基线 默认top  可选值：'top'、'bottom'、'middle'、'normal'
 color: 颜色
 -->
<script>
	export default {
		name: "Poster",
		props: {
			// 绘制队列
			list: {
				type: Array,
				required: true
			},
			width: {
				type: Number,
				required: true
			},
			height: {
				type: Number,
				required: true
			},
			backgroundColor: {
				type: String,
				default: 'rgba(0,0,0,0)'
			}
		},
		emit: ['on-success', 'on-error'],
		data() {
			return {
				posterUrl: '',
				ctx: null, //画布上下文
				counter: -1, //计数器
				drawPathQueue: [], //画图路径队列
			};
		},
		watch: {
			drawPathQueue(newVal, oldVal) {
				// 绘制单行文字
				const fillText = (textOptions) => {
					this.ctx.setFillStyle(textOptions.color)
					this.ctx.setFontSize(textOptions.size)
					this.ctx.setTextBaseline(textOptions.textBaseline || 'top')
					this.ctx.fillText(textOptions.text, textOptions.x, textOptions.y)
				}
				// 绘制段落
				const fillParagraph = (textOptions) => {
					this.ctx.setFontSize(textOptions.size)
					let tempOptions = JSON.parse(JSON.stringify(textOptions));
					// 如果没有指定行间距则设置默认值
					tempOptions.lineSpace = tempOptions.lineSpace ? tempOptions.lineSpace : 10;
					// 获取字符串
					let str = textOptions.text;
					// 计算指定高度可以输出的最大行数
					let lineCount = Math.floor((tempOptions.height + tempOptions.lineSpace) / (tempOptions.size +
						tempOptions.lineSpace))
					// 初始化单行宽度
					let lineWidth = 0;
					let lastSubStrIndex = 0; //每次开始截取的字符串的索引

					// 构建一个打印数组
					let strArr = str.split("");
					let drawArr = [];
					let text = "";
					while (strArr.length) {
						let word = strArr.shift()
						text += word;
						let textWidth = this.ctx.measureText(text).width;
						if (textWidth > textOptions.width) {
							// 因为超出宽度 所以要截取掉最后一个字符
							text = text.substr(0, text.length - 1)
							drawArr.push(text)
							text = "";
							// 最后一个字还给strArr
							strArr.unshift(word)
						} else if (!strArr.length) {
							drawArr.push(text)
						}
					}

					if (drawArr.length > lineCount) {
						// 超出最大行数
						drawArr.length = lineCount;
						let pointWidth = this.ctx.measureText('...').width;
						let wordWidth = 0;
						let wordArr = drawArr[drawArr.length - 1].split("");
						let words = '';
						while (pointWidth > wordWidth) {
							words += wordArr.pop();
							wordWidth = this.ctx.measureText(words).width
						}
						drawArr[drawArr.length - 1] = wordArr.join('') + '...';
					}
					// 打印
					for (let i = 0; i < drawArr.length; i++) {
						tempOptions.y = tempOptions.y + tempOptions.size * i + tempOptions.lineSpace * i; // y的位置
						tempOptions.text = drawArr[i]; // 绘制的文本
						fillText(tempOptions)
					}
				}
				// 绘制背景
				this.ctx.setFillStyle(this.backgroundColor);
				this.ctx.fillRect(0, 0, this.width, this.height);
				/* 所有元素入队则开始绘制 */
				if (newVal.length === this.list.length) {
					try {
						// console.log('生成的队列：' + JSON.stringify(newVal));
						console.log('开始绘制...')
						for (let i = 0; i < this.drawPathQueue.length; i++) {
							for (let j = 0; j < this.drawPathQueue.length; j++) {
								let current = this.drawPathQueue[j]
								/* 按顺序绘制 */
								if (current.index === i) {
									/* 文本绘制 */
									if (current.type === 'text') {
										console.log('绘制文本：' + current.text);
										fillText(current)
										this.counter--
									}
									/* 多行文本 */
									if (current.type === 'textarea') {
										console.log('绘制段落：' + current.text);
										fillParagraph(current)
										this.counter--
									}
									/* 图片绘制 */
									if (current.type === 'image') {
										console.log('绘制图片：' + current.path);
										if (current.area) {
											// 绘制绘图区域
											this.ctx.save()
											this.ctx.beginPath(); //开始绘制
											this.ctx.rect(current.area.x, current.area.y, current.area.width, current.area
												.height)
											this.ctx.clip();
											// 设置旋转中心
											let offsetX = current.x + Number(current.width) / 2;
											let offsetY = current.y + Number(current.height) / 2;
											this.ctx.translate(offsetX, offsetY)
											let degrees = current.rotate ? Number(current.rotate) % 360 : 0;
											this.ctx.rotate(degrees * Math.PI / 180)
											this.ctx.drawImage(current.path, current.x - offsetX, current.y - offsetY,
												current.width, current.height)
											this.ctx.closePath();
											this.ctx.restore(); // 恢复之前保存的上下文
										} else if (current.shape == 'circle') {
											this.ctx.save(); // 保存上下文，绘制后恢复
											this.ctx.beginPath(); //开始绘制
											//先画个圆   前两个参数确定了圆心 （x,y） 坐标  第三个参数是圆的半径  四参数是绘图方向  默认是false，即顺时针
											let width = (current.width / 2 + current.x);
											let height = (current.height / 2 + current.y);
											let r = current.width / 2;
											this.ctx.arc(width, height, r, 0, Math.PI * 2);
											//画好了圆 剪切  原始画布中剪切任意形状和尺寸。一旦剪切了某个区域，则所有之后的绘图都会被限制在被剪切的区域内 这也是我们要save上下文的原因
											this.ctx.clip();
											// 设置旋转中心
											let offsetX = current.x + Number(current.width) / 2;
											let offsetY = current.y + Number(current.height) / 2;
											this.ctx.translate(offsetX, offsetY)
											let degrees = current.rotate ? Number(current.rotate) % 360 : 0;
											this.ctx.rotate(degrees * Math.PI / 180)
											this.ctx.drawImage(current.path, current.x - offsetX, current.y - offsetY,
												current.width, current.height)
											this.ctx.closePath();
											this.ctx.restore(); // 恢复之前保存的上下文
										} else {
											this.ctx.drawImage(current.path, current.x, current.y, current.width, current
												.height)
										}
										this.counter--
									}
								}
							}
						}
					} catch (err) {
						console.log(err)
						this.$emit('on-error', err)
					}
				}
			},
			counter(newVal, oldVal) {
				if (newVal === 0) {
					this.ctx.draw()
					/* draw完不能立刻转存，需要等待一段时间 */
					setTimeout(() => {
						console.log('final counter', this.counter);
						uni.canvasToTempFilePath({
							canvasId: 'myCanvas',
							success: (res) => {
								console.log('in canvasToTempFilePath');
								// 在H5平台下，tempFilePath 为 base64
								// console.log('图片已保存至本地：', res.tempFilePath)
								this.posterUrl = res.tempFilePath;
								this.$emit('on-success', res.tempFilePath)
							},
							fail: (res) => {
								console.log(res)
							}
						}, this)
					}, 1000)
				}
			}
		},
		mounted() {
			this.ctx = uni.createCanvasContext('myCanvas', this)
			this.generateImg()
			console.log('mounted')
		},

		methods: {
			create() {
				this.generateImg()
			},
			generateImg() {
				console.log('generateimg')
				this.counter = this.list.length
				this.drawPathQueue = []
				/* 将图片路径取出放入绘图队列 */
				for (let i = 0; i < this.list.length; i++) {
					let current = this.list[i]
					current.index = i
					/* 如果是文本直接放入队列 */
					if (current.type === 'text' || current.type === 'textarea') {
						this.drawPathQueue.push(current)
						continue
					}
					/* 图片需获取本地缓存path放入队列 */
					uni.getImageInfo({
						src: current.path,
						success: (res) => {
							current.path = res.path
							this.drawPathQueue.push(current)
						}
					})
				}
			},
			saveImg() {
				uni.canvasToTempFilePath({
					canvasId: 'myCanvas',
					success: (res) => {
						// 在H5平台下，tempFilePath 为 base64
						uni.saveImageToPhotosAlbum({
							filePath: res.tempFilePath,
							success: () => {
								console.log('save success');
							}
						});
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.canvas {
		position: fixed;
		top: 100rpx;
		left: 750rpx;
	}
</style>
