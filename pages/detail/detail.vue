<template>
	<view>
		<view class="uni-page-head">
			<view class="uni-page-head-title">
				<text class="uni-page-head-title-txt">关闭菜单关闭菜单关闭菜单关闭菜单关闭菜单关闭菜单关闭菜单关闭菜单关闭菜单关闭菜单关闭菜单关闭菜单</text>
			</view>
		</view>
		<view class="uni-padding-wrap">
			<view>
				<video id="myVideo" src="http://103.60.222.43:8899/m3u8/video2.m3u8"
				 @error="videoErrorCallback" controls poster="https://img-cdn-qiniu.dcloud.net.cn/uniapp/doc/poster.png"></video>
			</view>
		</view>
		<view class="">
			<uni-list>
				<uni-list-item title="标题文字" thumb="https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=2477613277,471706849&fm=58" />
				<uni-list-item title="标题文字" note="描述信息" thumb="https://img-cdn-qiniu.dcloud.net.cn/new-page/uni.png" />
				<uni-list-item title="标题文字" thumb="https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=2477613277,471706849&fm=58" />
				<uni-list-item title="标题文字" note="描述信息" thumb="https://img-cdn-qiniu.dcloud.net.cn/new-page/uni.png" />
			</uni-list>
		</view>
	</view>
</template>
<script>
	import uniIcon from '@/components/uni-icon/uni-icon.vue'
	import uniList from '@/components/uni-list/uni-list.vue'
	import uniListItem from '@/components/uni-list-item/uni-list-item.vue'
	export default {
		components: {
			uniIcon,
			uniList,
			uniListItem
		},
		data() {
			return {
				showLeft: false
			}
		},
		onLoad(option) {
			console.log(1321)
			// uni.setNavigationBarTitle({
			// 	title: this.$store.state.menu[option.name] || '列表'
			// });
		},
		onPullDownRefresh() {
			// console.log('onPullDownRefresh');
			// uni.stopPullDownRefresh();
		},
		methods: {
			goRoute(url) {
				uni.reLaunch({
					url: url
				});
			},
			videoErrorCallback(e) {
				uni.showModal({
					content: e.target.errMsg || '未知错误，请选择其他视频',
					showCancel: false
				})
			},
		},
		onNavigationBarButtonTap(e) {
			this.goRoute('/pages/index/index');
		},
		onBackPress() {
			console.log(12313)
		}
	}
</script>

<style>
	.uni-margin-wrap {
		width:750upx;
		/* margin:0 30upx; */
	}
	video {
		width: 690upx;
	}
	.close {
		padding: 30upx;
	}
	.uni-page-head-title{
		height: auto;
	}
	.uni-page-head-title .uni-page-head-title-txt{
		display: inline-block;
		text-align: left;
		line-height: 26px;
		word-break: break-all;
	}
</style>
