<template>
	<view>
		<!-- 菜单 -->
		<view>
			<uni-drawer :visible="showLeft" mode="left" @close="closeDrawer('left')">
				<!-- #ifndef MP-BAIDU || MP-ALIPAY || MP-TOUTIAO -->
				<uni-list>
					<uni-list-item title="Item1" @click="goList('/pages/list/list?name=aa')" />
					<uni-list-item title="Item2" />
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
		<view class="uni-swiper-msg">
			<view class="uni-swiper-msg-icon">
				<uni-icon type="sound" size="22" color="#e65700" />
			</view>
			<swiper vertical="true" autoplay="true" circular="true" interval="5000">
				<swiper-item v-for="(item, index) in msg" :key="index">
					<navigator>{{item}}</navigator>
				</swiper-item>
			</swiper>
		</view>
		<!-- 导航标签 -->
		<view class="uni-flex uni-row nav-menu">
		<!-- 	<view class="flex-item b-b b-r"></view>
			<view class="flex-item b-b"></view>
			<view class="flex-item b-r"></view>
			<view class="flex-item"></view> -->
			<view class="btn-warp"><button type="default">页面次要操作 A</button></view>
			<view class="btn-warp"><button type="default">页面次要操作 B</button></view>
			<view class="btn-warp"><button type="default">页面次要操作 C</button></view>
			<view class="btn-warp"><button type="default">页面次要操作 D</button></view>
		</view>
		<!-- 列表 -->
		<view class="">
			<uni-list>
				<uni-list-item title="标题文字" thumb="https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=2477613277,471706849&fm=58" @click="goList('/pages/list/list?name=aa')" />
				<uni-list-item title="标题文字" note="描述信息" thumb="https://img-cdn-qiniu.dcloud.net.cn/new-page/uni.png" />
				<uni-list-item title="标题文字" thumb="https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=2477613277,471706849&fm=58" />
				<uni-list-item title="标题文字" note="描述信息" thumb="https://img-cdn-qiniu.dcloud.net.cn/new-page/uni.png" />
			</uni-list>
		</view>
	</view>
</template>
<script>
	import uniIcon from '@/components/uni-icon/uni-icon.vue'
	import uniDrawer from '@/components/uni-drawer/uni-drawer.vue'
	import uniList from '@/components/uni-list/uni-list.vue'
	import uniListItem from '@/components/uni-list-item/uni-list-item.vue'
	export default {
		components: {
			uniIcon,
			uniDrawer,
			uniList,
			uniListItem
		},
		data() {
			return {
				indicatorDots: true,
				autoplay: true,
				indicatorColor: 'rgba(245, 242, 242, 0.3)',
				indicatorActiveColor: '#fdfdfd',
				interval: 5000,
				duration: 500,
				showLeft: false,
				msg: ['1234567', 'abcdefg']
			}
		},
		onLoad() {
			console.log(132)
			uni.showLoading({
				title: 'loading'
			});
			setTimeout(function() {
				uni.hideLoading();
			},2000)
		},
		onReachBottom() {
			console.log("onReachBottom");
		},
		onPullDownRefresh() {
			console.log('onPullDownRefresh');
			uni.stopPullDownRefresh();
		},
		methods: {
			closeDrawer(e) {
				this.showLeft = false
			},
			goList(url) {
				this.closeDrawer();
				uni.navigateTo({
					url: url
				});
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
	.nav-menu{
		flex-wrap: wrap;
		padding: 15upx;
	}
	.nav-menu .b-b{
		border-bottom: 1px solid #e0e0e0;
	}
	.nav-menu .b-r{
		border-right: 1px solid #e0e0e0;
	}
	.flex-item{
		box-sizing: border-box;
		width: 50%;
		height: 60px;
		text-align: center;
		line-height: 60px;
		display: block;
	}
	.nav-menu .btn-warp{
		width: 50%;
		padding: 15upx;
		box-sizing: border-box;
	}
	.nav-menu uni-button{
		width: 100%;
		padding: 0;
		box-sizing: border-box;
		border: 1px solid rgba(199, 199, 199, 0.2);
		font-size: 30upx;
		line-height: 90upx;
		color: #525252;
	}
	.nav-menu uni-button:after{
		border: 0;
	}
	.uni-swiper-msg{
		background: #fff;
		box-shadow: 0 0 1px #0404045e;
	}
	.uni-swiper-msg-icon{
		line-height: 22px;
		margin-left: 30upx;
	}
</style>
