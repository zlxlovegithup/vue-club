<template>
	<div>
    <!-- 首页轮播图 -->
		<Slider/>

		<el-row :gutter="60">

			<el-col :span="12" :xs="24">
				<div class="" v-if="topNoticesVo != null">
					<div class="news-title-wrap" v-if="topNoticesVo.passageType != null">
            <!-- 社团的重要通知 -->
						<span class="news-title">{{ topNoticesVo.passageType.type }}</span>
						<router-link :to="{ name: 'PassageList', query: { passageTypeId: 1 } }" class="more" tag="span">更多>></router-link>
					</div>
          <!-- 社团通知下面的内容  noticePassageList-->
          <!--<el-table :data="topNoticesVo.passageList" style="width: 100%" :row-class-name="tableRowClassName">
            <el-table-column prop="title" label="通知的标题" width="190"></el-table-column>
            <el-table-column prop="publishTime" label="通知的发布时间" width="190"></el-table-column>
          </el-table>-->
          <el-table :data="topNoticesVo.passageList" height="250" border style="width: 100%">
            <el-table-column prop="title" label="通知的标题" width="180"></el-table-column>
            <el-table-column prop="publishTime" label="通知的发布时间" width="180"></el-table-column>
            <el-table-column prop="publisher" label="通知的发布者" ></el-table-column>
          </el-table>

					<!--<ul class="news-list">
            <li v-for="notice in topNoticesVo.passageList">
              <div>
                <router-link :to="{ name: 'Passage', params: { id: notice.id } }" tag="a">{{ notice.title }}</router-link>
                <span class="time">{{ notice.publishTime }}</span>
              </div>
            </li>
					</ul>-->

				</div>
			</el-col>

			<el-col :span="12" :xs="24">
				<div class="grid-content bg-purple" v-if="topNoticesVo != null">
					<div class="news-title-wrap">
						<el-row v-if="topNewsListVo.passageType != null">
              <!-- 社团的重要新闻 -->
							<span class="news-title" v-if="topNewsListVo.passageType != null">{{ topNewsListVo.passageType.type }}</span>
							<router-link :to="{ name: 'PassageList', query: { passageTypeId: 2 } }" class="more" tag="span">更多>></router-link>
						</el-row>
					</div>
          <el-table :data="topNewsListVo.passageList" height="250" border style="width: 100%">
            <el-table-column prop="title" label="新闻的标题" width="180"></el-table-column>
            <el-table-column prop="publishTime" label="新闻的发布时间" width="180"></el-table-column>
            <el-table-column prop="publisher" label="新闻的发布者" ></el-table-column>
          </el-table>
					<!--<ul class="news-list">
						<li v-for="news in topNewsListVo.passageList">
							<el-row>
								<router-link :to="{ name: 'Passage', params: { id: news.id } }">{{ news.title }}</router-link>
								<span class="publishTime">{{ news.publishTime }}</span>
							</el-row>
						</li>
					</ul>-->
				</div>
			</el-col>

		</el-row>

		<div class="news-title-wrap show-wrap">
      <div class="news-title show">社团精彩瞬间</div>
    </div>
		<el-row :gutter="10">
      <!-- 图片 -->
      <IndexHotActivities />
    </el-row>

	</div>
</template>

<script>
const OK = 200;
//导入首页轮播图
import Slider from '@/components/common/Slider';
//导入下方的精彩瞬间
import IndexHotActivities from '@/components/home/IndexHotActivities';
export default {
	data() {
		return {
			topNoticesVo: {},   //社团的最近发布的n篇社团重要通知  pageType{}  pageList[]
      topNewsListVo: {},  //社团的最近发布的n篇社团重要新闻
			topActivityVo: {},
			activityList: []
		};
	},
	components: {
		Slider,
		IndexHotActivities
	},
	methods: {
    tableRowClassName({row, rowIndex}) {
      if (rowIndex === 1) {
        return 'warning-row';
      } else if (rowIndex === 3) {
        return 'success-row';
      }
      return '';
    },

    //调用后端的接口去查找最近发布的n篇社团重要通知
		getTopNotices: function(typeId, n) {
			this.$axios
				.get('/api/passages/top/' + n, {
					params: {
						passageTypeId: typeId
					}
				}).then(res => {
					if (res.data.code == OK) {
					  //社团的最近发布的n篇社团重要通知
						this.topNoticesVo = res.data.data;
						// this.noticePassageList = res.data.data.passageList;
						console.log("res.data.data.passageList ===>"+res.data.data.passageList)
						console.log("this.topNoticesVo.passageList ===>"+this.topNoticesVo.passageList)
					} else {
						this.$layer.alert('error');
					}
				});
		},
    //调用后端的接口去查找最近发布的n篇社团重要新闻
		getTopNewsList: function(typeId, n) {
			this.$axios
				.get('/api/passages/top/' + n, {
					params: {
						passageTypeId: typeId
					}
				}).then(res => {
					if (res.data.code == OK) {
					  //社团的最近发布的n篇社团重要新闻
						this.topNewsListVo = res.data.data;
					} else {
						this.$layer.alert('error');
					}
				});
		},
    //查询社团的前n条活动
		getTopActivityList: function(typeId, n) {
			this.$axios
				.get('/api/activities', {
					params: {
						activityTypeId: typeId,
						pageNum: 1,
						pageSize: n
					}
				})
				.then(res => {
					if (res.data.code == OK) {
						this.topActivityVo = res.data.data;
						this.activityList = this.topActivityVo.activityList;
						console.log(this.topActivityVo);
					} else {
						this.$layer.alert('error');
					}
				});
		}
	},
	created() {
    //查询找最近发布的6篇社团重要通知
		this.getTopNotices(1, 6);
    //查询找最近发布的6篇社团重要新闻
		this.getTopNewsList(2, 6);

    //查询找最近发布的4篇社团活动
		this.getTopActivityList(2, 4);
	}
};
</script>

<style scoped="scoped">
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}

.news-title-wrap {
	background-color: #22b3c8;
	border-radius: 20px;
	position: relative;
}

.news-title-wrap .news-title {
	display: inline-block;
	left: 220px;
	top: 0px;
	width: 300px;
	color: white;
	font-family: '微软雅黑';
	font-weight: 900;
	font-size: 18px;
	height: 40px;
	line-height: 40px;
}

.news-title-wrap .more {
	position: absolute;
	right: 20px;
	top:10px;
	color: #fff;
	font-size: 16px;
	cursor: pointer;
}

.news-title-wrap.show-wrap {
	margin-top: 18px;
	position: relative;
	height: 40px;
	line-height: 40px;
}

.news-title-wrap .show {
	position: absolute;
	left: 10px;
}

.news-list li {
	height: 32px;
	line-height: 32px;

}

.news-list li{
	display: inline-block;
	float: left;
	width: 270px;
	height: 32px;
	line-height: 32px;
	margin-left: 25px;
	text-align: left;

	-webkit-line-clamp: 1;
	overflow: hidden;
	display: -webkit-box;
	-webkit-box-orient: vertical;
	white-space: normal;
}

.news-list li span {
	display: inline-block;
	margin-left: 85px;

	color: #000;
	font-size: 16px;
	height: 32px;
	line-height: 32px;
}
</style>
