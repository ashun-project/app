<script>
	export default {
		onLaunch: function() {
			console.log('App Launch');
			// #ifdef APP-PLUS
			// 锁定屏幕方向
			plus.screen.lockOrientation('portrait-primary'); //锁定
			// 检测升级
			plus.runtime.getProperty(plus.runtime.appid, function(widgetInfo) {
				uni.request({
					url: this.$resource + '/app/update', //检查更新的服务器地址
					method: 'POST',
					data: {
						author: 'ashun',
						version: widgetInfo.version,  
						name: widgetInfo.name 
					},
					header:{
						'content-type':'application/x-www-form-urlencoded'
					},
					success: (res) => {
						if (res.data.isUpdate) {
							let openUrl = res.data.updateApk;
							if (res.data.force) { // 强制更新
								uni.showModal({
									title: '更新提示',
									showCancel: false,
									content: res.data.note ? res.data.note : '请更新应该',
									success: (showResult) => {
									  if (showResult.confirm) {
										plus.runtime.openURL(openUrl);
									  }
									}
								})
							} else { // 提醒用户更新
								uni.showModal({
									title: '更新提示',
									content: res.data.note ? res.data.note : '是否选择更新',
									success: (showResult) => {
										if (showResult.confirm) {
											plus.runtime.openURL(openUrl);
										}
									}
								})
							}
						} else if (res.data.isUpdateWgt) {
							uni.downloadFile({  
								url: res.data.wgtUrl,  
								success: (downloadResult) => {  
									if (downloadResult.statusCode === 200) {  
										plus.runtime.install(downloadResult.tempFilePath, {  
											force: false  
										}, function() {
											plus.runtime.restart();  
										}, function(e) {  
											console.error('install fail...');
										});  
									}  
								}  
							});  
						}
					}
				})
			})
			// #endif
			//资源更新--来源：http://ask.dcloud.net.cn/article/35667
			// plus.runtime.getProperty(plus.runtime.appid, function(widgetInfo) {  
			// 	uni.request({  
			// 			url: 'http://www.example.com/update/',  
			// 			data: {  
			// 					version: widgetInfo.version,  
			// 					name: widgetInfo.name  
			// 			},  
			// 			success: (result) => {  
			// 					var data = result.data;  
			// 					if (data.update && data.wgtUrl) {  
			// 							uni.downloadFile({  
			// 									url: data.wgtUrl,  
			// 									success: (downloadResult) => {  
			// 											if (downloadResult.statusCode === 200) {  
			// 													plus.runtime.install(downloadResult.tempFilePath, {  
			// 															force: false  
			// 													}, function() {  
			// 															console.log('install success...');  
			// 															plus.runtime.restart();  
			// 													}, function(e) {  
			// 															console.error('install fail...');  
			// 													});  
			// 											}  
			// 									}  
			// 							});  
			// 					}  
			// 			}  
			// 	});  
			// });
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/* uni.css - 通用组件、模板样式库，可以当作一套ui库应用 */
	@import './common/uni.css';

	/* 以下样式用于 hello uni-app 演示所需 */
	page {
		background-color: #f1f1f1;
		height: 100%;
		font-size: 28upx;
		line-height: 1.8;
	}

	.uni-header-logo {
		padding: 30upx;
		text-align: center;
		margin-top: 10upx;
	}

	.uni-header-logo image {
		width: 140upx;
		height: 140upx;
	}

	.uni-hello-text {
		color: #7A7E83;
	}

	.uni-hello-addfile {
		text-align: center;
		line-height: 300upx;
		background: #FFF;
		padding: 50upx;
		margin-top: 10px;
		font-size: 38upx;
		color: #808080;
	}
	.uni-list-item__icon-img img{
		opacity: 1;
		position: sticky;
	}
	.list-data{
		background: #fff;
	}
</style>
