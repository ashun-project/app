<template>
	<view>
		<!-- 菜单 -->
		<view>
			<uni-drawer :visible="showLeft" mode="left" @close="closeDrawer('left')">
				<view class="send-email">
					发送邮件获取最新下载地址：
					sexlookashun@sina.com
				</view>
				<!-- #ifndef MP-BAIDU || MP-ALIPAY || MP-TOUTIAO -->
				<uni-list>
					<uni-list-item v-for="item in drawerMenu" :title="item.name" :drawerIs="true" @click="goRoute(item.url)" />
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
		<view class="input-view">
			<uni-icon type="search" size="22" color="#a929e6" @click="confirm" />
			<input v-model="searchValue" confirm-type="search" class="input" type="text" placeholder="搜你想要" @confirm="confirm">
		</view>
		<view class="list-data">
			<uni-list>
				<uni-list-item v-for="item in listData" :title="item.title" :note="item.time" :thumb="item.img" @click="goRoute('/pages/detail/detail?id='+item.create_time)" />
			</uni-list>
		</view>
		<view class="" @click="getList()" >
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
				showLeft: false,
				searchValue: '',
				listData: [],
				drawerMenu: [],
				banner: [],
				page: 1,
				type: ''
			}
		},
		onLoad(option) {
			var storeMenu = this.$store.state.menu;
			var obj = storeMenu.filter(item => item.type === option.type)[0];
			var title = obj ? obj.name : '列表';
			this.drawerMenu = storeMenu;
			this.type = option.type;
			uni.setNavigationBarTitle({
				title: title
			});
			this.getList();
			this.getBanner();
		},
		onReachBottom() {
			this.getList();
		},
		onPullDownRefresh() {
			this.page = 1;
			this.status = 'loading';
			this.getList(true);
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
			confirm() {
				if (this.searchValue) {
					var params = escape(this.searchValue);
					this.goRoute('/pages/search/search?value='+params);
				}
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
				if (this.status === 'noMore') {
					return;
				};
				var vm = this;
				this.status = 'loading';
				uni.request({
					url: this.$resource + '/app/list',
					method: 'POST',
					data: {
						page: vm.page,
						type: vm.type
					},
					header:{
						'content-type':'application/x-www-form-urlencoded'
					},
					success: (res) => {
						vm.page = vm.page + 1;
						var listD = res.data.list.map(item => {
							var obj = Object.assign({}, item);
							obj.img = item.img.split(',')[0];
							obj.time = '更新日期：' + vm.$dateFormat(item.create_time + '000', 'yyyy-MM-dd');
							return obj;
						});
						if (refresh) {
							vm.listData = listD;
						} else {
							vm.listData = vm.listData.concat(listD);
						}
						if (listD.length < 10) {
							vm.status = 'noMore';
						} else {
							vm.status = 'more';
						}
					},
					fail: (res) => {
						uni.showModal({
							content: '加载数据失败，下拉刷新试试',
							showCancel: false
						})
					},
					complete: () => {
						if(refresh) {
							uni.stopPullDownRefresh();
						}
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
	.close .close-menu{
		width: 100%;
		line-height: 2.9;
		background: rgb(209, 63, 235);
		color: #fff;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.17);
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
	.input-view {
		display: flex;
		align-items: center;
		flex-direction: row;
		background-color: #fff;
		height: 35px;
		border-radius: 17px;
		padding: 0 10px;
		flex: 1;
		margin: 30upx;
		box-shadow: 0 0 3px rgba(0, 0, 0, 0.13);
	}
	.input {
		flex: 1;
		padding: 0 5px;
		height: 24px;
		line-height: 24px;
		font-size: 16px;
		color: #a929e6;
	}
	.input-view .input {
		background-color: transparent;
	}
</style>
