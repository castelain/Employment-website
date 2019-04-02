<template>
    <my-container>
        <my-header slot="my-header" id="nav"></my-header>

        <div id="content">
            <my-row>
                <my-inner-nav :navs="innerNavs"></my-inner-nav>
                <my-title :title="notificationDetail.title"></my-title>
                <p class="text-left">{{ notificationDetail.content }}</p>
            </my-row>
        </div>

        <my-footer slot="my-footer"></my-footer>
    </my-container>
</template>

<script>
export default {
    name: 'NotificationDetail',
    data () {
        return {
            navHeight: null,
            // 内部导航数据
            innerNavs: [
                {
                    src: '/',
                    msg: '首页'
                },
                {
                    src: '/notification-list',
                    msg: '最新通知列表'
                },
                {
                    src: '#',
                    msg: '最新通知详情' 
                }
            ],
            notificationDetail: {
                title: '',
                content: ''
            }
        }
    },
    mounted() {
        let nav = document.getElementById('nav');
        this.navHeight = window.getComputedStyle(nav).height;
        document.getElementById('content').style.marginTop = this.navHeight;
    },
    created() {
        this.$http.get('/api/latest_notification/' + this.$route.params.id)
            .then(response => {
                this.notificationDetail = response[0];
            })
            .catch(error => {
                this.$message({
                        type: 'error',
                        message: '获取最新通知详情失败了！'+ error.msg
                    });
            });
    }
}
</script>

<style scoped>

</style>

