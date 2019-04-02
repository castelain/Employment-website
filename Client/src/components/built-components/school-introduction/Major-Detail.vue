<template>
    <my-container>
        <my-header slot="my-header" id="nav"></my-header>

        <div id="content">
            <my-row>
                <my-inner-nav :navs="innerNavs"></my-inner-nav>
                <my-title :title="majorDetail.title"></my-title>
                <div class="text-bold" id="majors">
                    {{ majorDetail.majors }}
                </div>
                <div>
                    {{ majorDetail.content }}
                </div>
            </my-row>
        </div>

        <my-footer slot="my-footer"></my-footer>
    </my-container>
</template>

<script>
export default {
    name: 'MajorDetail',
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
                    src: '/school-introduction/major-introduction',
                    msg: '学院列表'
                },
                {
                    src: '#',
                    msg: '专业详情' 
                }
            ],
            // 内容数据
            majorDetail: {}
        }
    },
    mounted() {
        let nav = document.getElementById('nav');
        this.navHeight = window.getComputedStyle(nav).height;
        document.getElementById('content').style.marginTop = this.navHeight;
    },
    created() {
        this.$http.get('/api/school_college/' + this.$route.params.id)
            .then(response => {
                this.majorDetail = response[0];
            })
            .catch(error => {
                console.log('获取学院的详细信息失败了！' + error);
            })
    },
}
</script>

<style scoped>
    #majors {
        margin-top: -4%;
        margin-bottom: 4%;
    }
</style>

