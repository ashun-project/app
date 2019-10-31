<template>
	<view>
		<view class="uni-page-head">
			<view class="uni-page-head-title">
				<text class="uni-page-head-title-txt">{{videoObj.title}}</text>
			</view>
		</view>
		<view class="video-wrap">
			<video v-if="videoObj.video" id="myVideo" :src="videoObj.video"
			 @error="videoErrorCallback" controls :poster="videoObj.img"></video>
			<view v-else class="video-cont">
				<uni-load-more :status="status"/>
			</view>
		</view>
		<text class="random-r">随机推荐</text>
		<view class="list-data">
			<uni-list>
				<uni-list-item v-for="item in recommond" :title="item.title" :note="item.time" :thumb="item.img" @click="goRoute('/pages/detail/detail?id='+item.create_time)" />
			</uni-list>
		</view>
	</view>
</template>
<script>
	import uniIcon from '@/components/uni-icon/uni-icon.vue'
	import uniList from '@/components/uni-list/uni-list.vue'
	import uniListItem from '@/components/uni-list-item/uni-list-item.vue'
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue'
	export default {
		components: {
			uniIcon,
			uniList,
			uniListItem,
			uniLoadMore
		},
		data() {
			return {
				showLeft: false,
				videoObj: {},
				recommond: [],
				status: 'loading'
			}
		},
		onLoad(option) {
			this.getVidoe(option.id);
			this.getRecommond();
		},
		onPullDownRefresh() {
			// console.log('onPullDownRefresh');
			// uni.stopPullDownRefresh();
		},
		methods: {
			goRoute(url) {
				uni.redirectTo({
					url: url
				});
			},
			videoErrorCallback(e) {
				uni.showModal({
					content: e.target.errMsg || '未知错误，请选择其他视频',
					showCancel: false
				})
			},
			getVidoe(id) {
				uni.request({
					url: this.$resource + '/app/detail',
					method: 'POST',
					data: {
						id: id
					},
					header:{
						'content-type':'application/x-www-form-urlencoded'
					},
					success: (res) => {
						this.videoObj = res.data.data;
					},
					fail: (res) => {
						uni.showModal({
							content: '加载数据失败',
							showCancel: false
						})
					}
				});
			},
			getRecommond(id) {
				var vm = this;
				uni.request({
					url: this.$resource + '/app/recommond',
					method: 'POST',
					header:{
						'content-type':'application/x-www-form-urlencoded'
					},
					success: (res) => {
						var listD = res.data.list.map(item => {
							var obj = Object.assign({}, item);
							obj.img = item.img.split(',')[0];
							obj.time = '更新日期：' + vm.$dateFormat(item.create_time + '000', 'yyyy-MM-dd');
							return obj;
						});
						this.recommond = listD;
					}
				});
			}
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
		width: 100%;
	}
	#myVideo{
		width: 100%;
		background: #000000;
	}
	.close {
		padding: 30upx;
	}
	.uni-page-head-title{
		height: auto;
		border-color: #e0e0e0;
	}
	.uni-page-head-title .uni-page-head-title-txt{
		display: inline-block;
		text-align: left;
		line-height: 26px;
		word-break: break-all;
		color: #333;
	}
	.video-wrap{
		/* width: 100%; */
		padding: 0 15upx;
	}
	.video-wrap .video-cont{
		width: 100%;
		background: #000;
		min-height: 225px;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: 30upx;
	}
	.uni-page-head{
		padding: 30upx 15upx;
	}
	.random-r{
		font-size: 32upx;
		padding: 15upx 30upx;
		color: #333;
		position: relative;
		display: block;
	}
	.random-r:before{
		content: '';
		height: 32upx;
		width: 3px;
		background: #2963e6;
		position: absolute;
		left: 15upx;
		top: 50%;
		transform: translateY(-50%);
	}
</style>
