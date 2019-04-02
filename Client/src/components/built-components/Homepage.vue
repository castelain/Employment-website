<template>
    <my-container>
        <my-header slot="my-header" id="nav"></my-header>

        <div id="content">
            <my-banner :banners="banners"></my-banner>
            <my-row>
                <el-row :gutter="40">
                    <el-col :span="6" class="top">
                        <my-fieldset title="最新通知">
                            <my-list-item v-for="(item, index) in notices" :key="index" :item="item"></my-list-item>
                            <el-button type="text" @click="seeMoreNotices">查看更多</el-button>
                        </my-fieldset>
                    </el-col>
                    <el-col :span="18">
                        <my-title :title="seminarTitle"></my-title>
                        <el-row :gutter="20">
                            <el-col :span="12" v-for="(seminar, index) in seminars" :key="index">
                                <my-card>
                                    <div slot="title">
                                        <span>{{ seminar.name }}</span>
                                        <el-button type="text" @click="showDetail(seminar.id)" class="right">查看详情</el-button>
                                    </div>
                                    <div slot="content">
                                        <span class="text-bold">招聘专业：</span>
                                        <span>{{ seminar.majors }}</span>
                                    </div>
                                    <div slot="info" style="margin-top: 4%;">
                                        <span>举行时间：</span>
                                        <span>{{ seminar.holds_in }}</span>
                                    </div>
                                </my-card>
                            </el-col>
                            <el-button type="text" @click="seeMoreSeminars" style="margin-top: 6%;">查看更多</el-button>
                        </el-row>
                    </el-col>
                </el-row>
            </my-row>
        </div>

        <my-footer slot="my-footer"></my-footer>
    </my-container>
</template>

<script>
export default {
    name: 'Homepage',
    data () {
        return {
            // 导航栏的高度
            navHeight: null,
            // banner数据
            banners: [
                {
                    src: require('../../assets/images/homepage/Dew_by_Aaron_Burden.jpg'),
                    msg: 'banner1'
                },
                {
                    src: require('../../assets/images/homepage/Early_Spring_Memory2.jpg'),
                    msg: 'banner2'
                },
                {
                    src: require('../../assets/images/homepage/Flower_by_Dominik_Scythe.jpg'),
                    msg: 'banner3'
                },
            ],
            // 校园招聘会数据
            seminarTitle: '校园招聘会',
            seminars: null,
            // 最新通知部分
            notices: null
        }
    },
    methods: {
        seeMoreNotices: function() {
            this.$router.push({ name: 'notification-list' });
        },
        seeMoreSeminars: function() {
            this.$router.push({ name: 'seminar-list' });
        },
        showDetail: function(id) {
            console.log(id);
            this.$router.push({ path: '/seminar-detail/' + id });
        }
    },
    mounted() {
        let nav = document.getElementById('nav');
        this.navHeight = window.getComputedStyle(nav).height;
        document.getElementById('content').style.marginTop = this.navHeight;
    },
    created() {
        this.$http.get('/api/latest_notification')
            .then(response => {
                this.notices = response.slice(0, 3);
                this.notices.map((value, index) => {
                    value.content = this.formateStr(value.content, 10);
                });
            })
            .catch(error => {
                this.$message({
                        type: 'error',
                        message: '获取最新通知列表失败了！'+ error.msg
                    });
            });

        this.$http.get('/api/seminar?keyword=1')
            .then(response => {
                response.map((item, index) => {
                    item.holds_in = this.formatTime(item.holds_in);
                });
                this.seminars = response.slice(0, 5);
            })
            .catch(error => {
                console.log('获取宣讲会信息列表失败了:' + error);
            });
    },
}
</script>

<style scoped>
    
</style>

