<template>
	<view>
		<!-- 菜单 -->
		<view>
			<uni-drawer :visible="showLeft" mode="left" @close="closeDrawer('left')">
				<!-- #ifndef MP-BAIDU || MP-ALIPAY || MP-TOUTIAO -->
				<uni-list>
					<uni-list-item title="Item1" @click="goRoute('/pages/list/list?name=aa')" />
					<uni-list-item title="Item2" @click="goRoute('/pages/list/list?name=bb')" />
					<uni-list-item :show-badge="true" title="Item3" badge-text="12" />
				</uni-list>
				<!-- #endif -->
				<!-- #ifdef MP-BAIDU || MP-ALIPAY || MP-TOUTIAO -->
				<view class="uni-list">
					<uni-list-item title="Item1" />
					<uni-list-item title="Item2" />
					<uni-list-item :show-badge="true" title="Item3" badge-text="12" />
				</view>
				<!-- #endif -->
				<view class="close">
					<button type="default" @click="closeDrawer">关闭菜单</button>
				</view>
			</uni-drawer>
		</view>
		<!-- 轮播图 -->
		<view class="uni-margin-wrap">
			<swiper class="swiper" :indicator-dots="indicatorDots" :indicator-color="indicatorColor" :indicator-active-color="indicatorActiveColor" :autoplay="autoplay" :interval="interval" :duration="duration">
				<swiper-item>
					<view class="swiper-item uni-bg-red">A</view>
				</swiper-item>
				<swiper-item>
					<view class="swiper-item uni-bg-green">B</view>
				</swiper-item>
				<swiper-item>
					<view class="swiper-item uni-bg-blue">C</view>
				</swiper-item>
			</swiper>
		</view>
		<view class="input-view">
			<uni-icon type="search" size="22" color="#666666" @click="confirm" />
			<input confirm-type="search" class="input" type="text" placeholder="输入搜索关键词" @confirm="confirm">
		</view>
		<view class="">
			<uni-list>
				<uni-list-item title="标题文字" thumb="https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=2477613277,471706849&fm=58" @click="goRoute('/pages/detail/detail?name=aa')" />
				<uni-list-item title="标题文字" note="描述信息" thumb="https://img-cdn-qiniu.dcloud.net.cn/new-page/uni.png" />
				<uni-list-item title="标题文字" thumb="https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=2477613277,471706849&fm=58" />
				<uni-list-item title="标题文字" note="描述信息" thumb="https://img-cdn-qiniu.dcloud.net.cn/new-page/uni.png" />
				<uni-list-item title="标题文字" thumb="https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=2477613277,471706849&fm=58" />
				<uni-list-item title="标题文字" note="描述信息" thumb="https://img-cdn-qiniu.dcloud.net.cn/new-page/uni.png" />
				<uni-list-item title="标题文字" thumb="https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=2477613277,471706849&fm=58" />
				<uni-list-item title="标题文字" note="描述信息" thumb="https://img-cdn-qiniu.dcloud.net.cn/new-page/uni.png" />
			</uni-list>
		</view>
		<view class="" @click="addMore" >
			<uni-load-more :status="status" :content-text="contentText"/>
		</view>
	</view>
</template>
<script>
	import uniIcon from '@/components/uni-icon/uni-icon.vue'
	import uniDrawer from '@/components/uni-drawer/uni-drawer.vue'
	import uniList from '@/components/uni-list/uni-list.vue'
	import uniListItem from '@/components/uni-list-item/uni-list-item.vue'
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue'
	export default {
		components: {
			uniIcon,
			uniDrawer,
			uniList,
			uniListItem,
			uniLoadMore
		},
		data() {
			return {
				num: 0,
				status: 'more',
				contentText: {
					contentdown: '上拉或点击-显示更多',
					contentrefresh: '正在加载...',
					contentnomore: '没有更多数据了'
				},
				indicatorDots: true,
				indicatorColor: 'rgba(245, 242, 242, 0.3)',
				indicatorActiveColor: '#fdfdfd',
				autoplay: true,
				interval: 5000,
				duration: 500,
				showLeft: false
			}
		},
		onLoad(option) {
			uni.setNavigationBarTitle({
				title: this.$store.state.menu[option.name] || '列表'
			});
		},
		onReachBottom() {
			console.log("onReachBottom132");
			this.addMore()
		},
		onPullDownRefresh() {
			console.log('onPullDownRefresh');
			uni.stopPullDownRefresh();
		},
		methods: {
			closeDrawer(e) {
				this.showLeft = false
			},
			goRoute(url) {
				this.closeDrawer();
				uni.navigateTo({
					url: url
				});
				// 跳转到首页时
				// uni.reLaunch({
				// 	url: url
				// });
			},
			addMore() {
				console.log(1321465)
				this.status = 'loading';
				var that = this;
				setTimeout(function() {
					that.num += 1;
					if (that.num > 3) {
						that.status = 'noMore';
					} else {
						that.status = 'more';
					}
				}, 2000)
			},
			confirm() {
				console.log(123)
			}
		},
		onNavigationBarButtonTap(e) {
			this.showLeft = !this.showLeft
		},
		onBackPress() {
			if (this.showLeft) {
				this.showLeft = false
				return true
			}
		}
	}
</script>

<style>
	.uni-margin-wrap {
		width:750upx;
		/* margin:0 30upx; */
	}
	.swiper {
		height: 300upx;
	}
	.swiper-item {
		display: block;
		height: 300upx;
		line-height: 300upx;
		text-align: center;
	}
	.close {
		padding: 30upx;
	}
	.input-view {
		display: flex;
		align-items: center;
		flex-direction: row;
		background-color: #e7e7e7;
		height: 35px;
		border-radius: 17px;
		padding: 0 10px;
		flex: 1;
		margin: 30upx;
	}
	.input {
		flex: 1;
		padding: 0 5px;
		height: 24px;
		line-height: 24px;
		font-size: 16px;
	}
	.input-view .input {
		background-color: transparent;
	}
</style>
