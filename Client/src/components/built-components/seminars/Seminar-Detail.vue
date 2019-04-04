<template>
    <my-container>
        <my-header slot="my-header" id="nav"></my-header>

        <div id="content">
            <my-row>
                <my-inner-nav :navs="innerNavs"></my-inner-nav>
                <my-title :title="title"></my-title>
                <div id="text-block" class="text-left">
                    <div>
                        <span>企业名称：</span>
                        <span>{{ seminarDetail.name }}</span>
                    </div>
                    <div>
                        <span>举行时间：</span>
                        <span>{{ seminarDetail.holds_in }}</span>
                    </div>
                    <div>
                        <span>举办地点：</span>
                        <span>{{ seminarDetail.address }}</span>
                    </div>
                    <div>
                        <span>招聘专业：</span>
                        <span>{{ seminarDetail.majors }}</span>
                    </div>
                </div>
                <div>
                    <div class="text-left description-block">
                        <h3>一、企业简介</h3>
                        <p class="preWrap">{{ seminarDetail.company_description }}</p>
                    </div>
                    <div class="text-left description-block">
                        <h3>二、职位描述</h3>
                        <p class="preWrap">{{ seminarDetail.job_description }}</p>
                    </div>
                    <div class="text-left description-block">
                        <h3>三、薪酬描述</h3>
                        <p class="preWrap">{{ seminarDetail.salary_description }}</p>
                    </div>
                    <div class="text-left description-block">
                        <h3>四、应聘流程</h3>
                        <p class="preWrap">{{ seminarDetail.application_process }}</p>
                    </div>
                </div>
            </my-row>
        </div>

        <my-footer slot="my-footer"></my-footer>
    </my-container>
</template>

<script>
export default {
    name: 'SeminarDetail',
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
                    src: '/seminar-list',
                    msg: '校园宣讲会列表'
                },
                {
                    src: '#',
                    msg: '宣讲会详情' 
                }
            ],
            title: '宣讲会详情',
            seminarDetail: {}
        }
    },
    mounted() {
        let nav = document.getElementById('nav');
        this.navHeight = window.getComputedStyle(nav).height;
        document.getElementById('content').style.marginTop = this.navHeight;
    },
    created() {
        this.$http.get('/api/seminar/' + this.$route.params.id)
            .then(response => {
                response[0].holds_in = this.formatTime(response[0].holds_in);
                this.seminarDetail = response[0];
            })
            .catch(error => {
                console.log('获取宣讲会详情失败了！' + error);
            });
    },
}
</script>

<style scoped>
    #text-block {
        background-color: rgba(92, 153, 240, 0.808);
        margin-top: -4%;
        margin-bottom: 4%;
        padding: 4% 8%;
        border: 4px dotted white;
        color: azure;
    }
    .description-block {
        margin-bottom: 5%;
    }
    .description-block > h3 {
        margin-bottom: 2%;
    }
</style>

