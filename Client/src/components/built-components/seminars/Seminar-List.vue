<template>
    <my-container>
        <my-header slot="my-header" id="nav"></my-header>

        <my-row id="content">
            <my-inner-nav :navs="innerNavs"></my-inner-nav>
            <my-title :title="seminarTitle" style="margin-bottom: -2%;"></my-title>
            <el-form :model="form" ref="form" label-width="80px" id="search">
                <el-form-item>
                    <el-input
                        style="width: 60%; margin: 4% auto;"
                        placeholder="请输入关键字"
                        prefix-icon="el-icon-search"
                        v-model="form.keyword" @keyup.native.enter="search">
                    </el-input>
                </el-form-item>
            </el-form>
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
            <my-pagination :setting="setting" @current-change="handleCurrentChange"></my-pagination>
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
            // 临时变量
            temp: null,
            // 关于分页的设置
            setting: {
                pageSize: 9,
                total: null
            },
            // 校园招聘会数据
            seminarTitle: '校园招聘会列表',
            seminars: null,
             // 搜索表单
            form: {
                keyword: ''
            }
        }
    },
    methods: {
        showDetail: function(id) {
            this.$router.push({ path: '/seminar-detail/' + id });
        },
        handleCurrentChange: function(val) {
            if(val === 1) {
                this.seminars = this.temp.slice(0, this.setting.pageSize);;
            }else {
                this.seminars = this.temp.slice( this.setting.pageSize*(val-1) );
            }
        },
        search: function () {
            if(this.form.keyword == '') {
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
                        // 初始化记录的总数目
                        this.setting.total = this.seminars.length;
                        // 初始化临时变量
                        this.temp = this.seminars;
                        // 初始化首页的显示记录
                        this.handleCurrentChange(1);
                })
                .catch(error => {
                    console.log('搜索宣讲会信息列表失败了:' + error);
                });
            }else {
                let keyword = this.form.keyword;
                this.$http.get('/api/seminar?keyword=' + keyword)
                    .then(response => {
                        // response = response.filter(v => this.temp.includes(v));
                        // console.log("response: " + response);
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
                        // 初始化记录的总数目
                        this.setting.total = this.seminars.length;
                        // 初始化临时变量
                        this.temp = this.seminars;
                        // 初始化首页的显示记录
                        this.handleCurrentChange(1);
                    })
                    .catch(error => {
                        console.log('搜索宣讲会信息列表失败了:' + error);
                    });
            }
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
                 // 初始化记录的总数目
                this.setting.total = this.seminars.length;
                // 初始化临时变量
                this.temp = this.seminars;
                // 初始化首页的显示记录
                this.handleCurrentChange(1);
            })
            .catch(error => {
                console.log('获取宣讲会信息列表失败了:' + error);
            });
    },
}
</script>

<style scoped>

</style>

