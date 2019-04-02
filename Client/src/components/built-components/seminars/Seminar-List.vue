<template>
    <my-container>
        <my-header slot="my-header" id="nav"></my-header>

        <my-row id="content">
            <my-inner-nav :navs="innerNavs"></my-inner-nav>
            <my-title :title="seminarTitle"></my-title>
            <el-row :gutter="20">
                <el-col :span="8" v-for="(seminar, index) in seminars" :key="index">
                    <my-card>
                        <div slot="title">
                            <span>{{ seminar.name }}</span>
                            <el-button type="text" @click="showDetail(seminar.id)" class="right">查看详情</el-button>
                        </div>
                        <div slot="content">
                            <span class="text-bold">招聘专业：</span>
                            <span>{{ seminar.majors }}</span>
                        </div>
                        <div slot="info" style="margin-top: 3%;">
                            <span>举行时间：</span>
                            <span>{{ seminar.holds_in | formatTime }}</span>
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
    name: 'SeminarList',
    data () {
        return {
            // 内部导航数据
            innerNavs: [
                {
                    src: '/',
                    msg: '首页'
                },
                {
                    src: '/seminar-list',
                    msg: '校园宣讲会列表'
                }
            ],
            // 校园招聘会数据
            seminarTitle: '校园招聘会列表',
            seminars: null
        }
    },
    methods: {
        showDetail: function(id) {
            this.$router.push({ path: '/seminar-detail/' + id });
        }
    },
    mounted() {
        let nav = document.getElementById('nav');
        this.navHeight = window.getComputedStyle(nav).height;
        document.getElementById('content').style.marginTop = this.navHeight;
    },
    created() {
        this.$http.get('/api/seminar?keyword=1')
            .then(response => {
                response.map((item, index) => {
                    item.status = this.formateStatus(item.status);
                    item.holds_in = this.formatTime(item.holds_in);
                    item.created_at = this.formatTime(item.created_at);
                    item.company_description = this.formateStr(item.company_description, 10);
                    item.job_description = this.formateStr(item.job_description, 10);
                    item.salary_description = this.formateStr(item.salary_description, 10);
                    item.application_process = this.formateStr(item.application_process, 10);
                });
                this.seminars = response;
                //  // 初始化记录的总数目
                // this.setting.total = this.seminars.length;
                // // 初始化临时变量
                // this.temp = this.seminars;
                // // 初始化首页的显示记录
                // this.handleCurrentChange(1);
            })
            .catch(error => {
                console.log('获取宣讲会信息列表失败了:' + error);
            });
    },
}
</script>

<style scoped>

</style>

