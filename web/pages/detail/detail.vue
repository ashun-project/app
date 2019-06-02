<template>
	<view>
		<view class="uni-page-head">
			<view class="uni-page-head-title">
				<text class="uni-page-head-title-txt">P{{videoObj.title}}</text>
			</view>
		</view>
		<view class="uni-padding-wrap">
			<view class="video-wrap">
				<video v-if="videoObj.video" id="myVideo" :src="videoObj.video"
				 @error="videoErrorCallback" controls :poster="videoObj.img"></video>
				<view v-else class="video-cont">
					<uni-load-more :status="status"/>
				</view>
			</view>
		</view>
		<view class="">
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
	.video-wrap{
		width: 100%;
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
</style>
