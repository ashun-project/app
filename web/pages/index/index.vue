<template>
	<view>
		<!-- 菜单 -->
		<view>
			<uni-drawer :visible="showLeft" mode="left" @close="closeDrawer('left')">
				<view class="send-email">
					发送邮件获取最新下载地址：
					kp12306help@gmail.com
				</view>
				<!-- #ifndef MP-BAIDU || MP-ALIPAY || MP-TOUTIAO -->
				<uni-list>
					<uni-list-item v-for="item in drawerMenu" :title="item.name" :drawerIs="true" @click="goRoute(item.url)" />
					<!-- <uni-list-item title="Item2" />
					<uni-list-item :show-badge="true" title="Item3" badge-text="12" /> -->
				</uni-list>
				<!-- #endif -->
				<!-- #ifdef MP-BAIDU || MP-ALIPAY || MP-TOUTIAO -->
				<view class="uni-list">
					<uni-list-item v-for="item in drawerMenu" :title="item.name" :drawerIs="true" @click="goRoute(item.url)" />
				</view>
				<!-- #endif -->
				<view class="close">
					<button type="default" class="close-menu" size="mini" @click="closeDrawer">关闭菜单</button>
				</view>
			</uni-drawer>
		</view>
		<!-- 轮播图 -->
		<view class="uni-margin-wrap">
			<swiper class="swiper" :indicator-dots="indicatorDots" :indicator-color="indicatorColor" :indicator-active-color="indicatorActiveColor" :autoplay="autoplay" :interval="interval" :duration="duration">
				<swiper-item v-for="item in banner" @click="goOut(item.url)">
					<view class="swiper-item default-color">
						<image :src="item.img" style="width: 100%; height: 100%" mode=""></image>
					</view>
				</swiper-item>
			</swiper>
		</view>
		<view class="uni-swiper-msg">
			<view class="uni-swiper-msg-icon">
				<uni-icon type="sound" size="22" color="#d349f7" />
			</view>
			<swiper vertical="true" autoplay="true" circular="true" interval="5000">
				<swiper-item v-for="(item, index) in msg" :key="index">
					<navigator style="color:#dc6bf9">{{item}}</navigator>
				</swiper-item>
			</swiper>
		</view>
		<!-- 导航标签 -->
		<view class="uni-flex uni-row nav-menu">
			<view class="btn-warp" v-for="item in menu"><button type="default" class="nav-btn" @click="goRoute(item.url)">{{item.name}}</button></view>
		</view>
		<!-- 列表 -->
		<view class="list-data">
			<uni-list>
				<uni-list-item v-for="item in listData" :title="item.title" :note="item.time" :thumb="item.img" @click="goRoute('/pages/detail/detail?id='+item.create_time)" />
			</uni-list>
		</view>
		<view class="tickle">
			<text>邮箱反馈：kp12306help@gmail.com</text>
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
				listData: [],
				drawerMenu: [],
				menu: [],
				msg: [],
				banner: []
			}
		},
		onLoad() {
			var storeMenu = this.$store.state.menu;
			this.drawerMenu = storeMenu;
			this.menu = storeMenu.filter(item => item.show);
			this.getList();
			this.getNotice();
			this.getBanner();
			this.getInfo();
		},
		onPullDownRefresh() {
			this.getList(true);
		},
		onNavigationBarButtonTap(e) {
			this.showLeft = !this.showLeft
		},
		onBackPress() {
			if (this.showLeft) {
				this.showLeft = false
				return true
			}
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
			},
			goOut(url) {
				if(!url) {
					return
				};
				// #ifdef APP-PLUS
				plus.runtime.openURL(url);
				// #endif
				// #ifndef APP-PLUS
				window.location.href = url;
				//#endif
			},
			getList(refresh) {
				var vm = this;
				uni.showLoading({
					title: 'loading'
				});
				uni.request({
					url: this.$resource + '/app/news/list',
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
						vm.listData = listD;
					},
					fail: (res) => {
						uni.showModal({
							content: '加载数据失败，下拉刷新试试',
							showCancel: false
						})
					},
					complete: () => {
						uni.hideLoading();
						if(refresh) {
							uni.stopPullDownRefresh();
						}
					}
				});
			},
			getNotice() {
				var vm = this;
				uni.request({
					url: this.$resource + '/app/notice',
					method: 'POST',
					header:{
						'content-type':'application/x-www-form-urlencoded'
					},
					success: (res) => {
						vm.msg = res.data.list;
					}
				});
			},
			getBanner() {
				var vm = this;
				uni.request({
					url: this.$resource + '/app/banner',
					method: 'POST',
					header:{
						'content-type':'application/x-www-form-urlencoded'
					},
					success: (res) => {
						vm.banner = res.data.list;
					}
				});
			},
			getInfo() {
				uni.request({
					url: this.$resource + '/app/info',
					method: 'POST',
					header:{
						'content-type':'application/x-www-form-urlencoded'
					},
					success: (res) => {
						if (res.data.data) {
							setTimeout(function() {
								uni.showModal({
									content: res.data.data,
									showCancel: false
								});
							}, 3000)
							
						}
					}
				});
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
	.close .close-menu{
		width: 100%;
		line-height: 2.9;
		background: rgb(209, 63, 235);
		color: #fff;
	}
	.close .close-menu:after{
		border: 1px solid rgba(242, 101, 237, 0.15);
	}
	.close .close-menu.button-hover{
		background: rgb(153, 28, 175);
	}
	.default-color{
		background: #000;
	}
	.send-email{
		padding: 30upx;
		color: #fff;
	}
	.nav-menu{
		flex-wrap: wrap;
		padding: 15upx;
		background: #fff;
		margin: 30upx 0;
		box-shadow: 0 0 3px rgba(0, 0, 0, 0.08);
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
	.nav-menu .nav-btn{
		width: 100%;
		padding: 0;
		box-sizing: border-box;
		border: 1px solid rgba(199, 199, 199, 0.2);
		font-size: 30upx;
		line-height: 60upx;
		color: #fff;
		background: linear-gradient(right , #c24de6, #f568ee);
        background: -ms-linear-gradient(right , #c24de6, #f568ee);
        background: -webkit-linear-gradient(right , #c24de6, #f568ee);
        background: -moz-linear-gradient(right , #c24de6, #f568ee);
	}
	.nav-menu .nav-btn:after{
		border: 0;
	}
	.nav-menu .nav-btn.button-hover{
		background: rgb(153, 28, 175);
	}
	.uni-swiper-msg{
		background: #fff;
	}
	.uni-swiper-msg-icon{
		line-height: 22px;
		margin-left: 30upx;
	}
	.tickle{
		text-align: center;
		line-height: 3;
		color: #8c699c;
	}
</style>
