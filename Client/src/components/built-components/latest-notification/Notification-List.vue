<template>
    <my-container>
        <my-header slot="my-header" id="nav"></my-header>

        <my-row id="content">
            <my-inner-nav :navs="innerNavs"></my-inner-nav>
            <my-title title="最新通知列表"></my-title>
            <el-row :gutter="20">
                <el-col :span="8" v-for="(notification, index) in notifications" :key="index">
                    <my-card>
                        <div slot="title">
                            <span>{{ notification.title | formateStr(8)}}</span>
                            <el-button type="text" @click="showDetail(notification.id)" class="right">查看详情</el-button>
                        </div>
                        <div slot="content">
                            {{ notification.content | formateStr(52) }}
                        </div>
                        <div slot="info" style="margin-top: 4%;">
                            <span>发布时间：</span>
                            <span>{{ notification.created_at | formatTime }}</span>
                        </div>
                    </my-card>
                </el-col>
            </el-row>
        </my-row>

        <my-footer slot="my-footer"></my-footer>

    </my-container>
</template>

<script>
export default {
    name: 'NotificationList',
    data () {
        return {
            // 内部导航数据
            innerNavs: [
                {
                    src: '/',
                    msg: '首页'
                },
                {
                    src: '/notification-list',
                    msg: '最新通知列表'
                }
            ],
            // 最新通知列表数据
            notifications: null
        }
    },
    methods: {
        showDetail: function(id) {
            this.$router.push({ path: '/notification-detail/' + id });
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
                this.notifications = response;
            })
            .catch(error => {
                this.$message({
                        type: 'error',
                        message: '获取最新通知列表失败了！'+ error.msg
                    });
            });
    },
}
</script>

<style scoped>
    .el-col {
        margin-bottom: 20px;
    }
</style>

