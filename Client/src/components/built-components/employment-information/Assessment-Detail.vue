<template>
    <my-container>
        <my-header slot="my-header" id="nav"></my-header>

        <div id="content">
            <my-row>
                <my-inner-nav :navs="innerNavs"></my-inner-nav>
                <my-title :title="assessmentDetail.title" style="margin-bottom: 2%;"></my-title>
                <a href="https://www.apesk.com/holland/index.html" id="link" target="blank">霍兰德职业兴趣量表及在线测试(完整专业版) - 才储</a>
                <p class="text-left preWrap" style="margin-top: 4%;">{{ assessmentDetail.content }}</p>
            </my-row>
        </div>

        <my-footer slot="my-footer"></my-footer>
    </my-container>
</template>

<script>
export default {
    name: 'AssessmentDetail',
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
                    src: '/employment-information/career-assessment',
                    msg: '职业评测列表'
                },
                {
                    src: '#',
                    msg: '职业评测详情' 
                }
            ],
            assessmentDetail: {}
        }
    },
    mounted() {
        let nav = document.getElementById('nav');
        this.navHeight = window.getComputedStyle(nav).height;
        document.getElementById('content').style.marginTop = this.navHeight;
    },
    created() {
        this.$http.get('/api/career_assessment/' + this.$route.params.id)
                .then(response => {
                    this.assessmentDetail = response[0];
                })
                .catch(error => {
                    this.$message({
                        type: 'error',
                        message: '获取职业评测的详情失败了！'+ error.msg
                    });
                });
    },
}
</script>

<style scoped>
    a {
        color: #409EFF;
        text-decoration: none;
    }
</style>

