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
                            <span>{{ seminar.company }}</span>
                            <el-button type="text" @click="showDetail(seminar.id)" class="right">查看详情</el-button>
                        </div>
                        <div slot="content">
                            <span class="text-bold">招聘专业：</span>
                            <span>{{ seminar.majors }}</span>
                        </div>
                        <div slot="info">
                            <span>举行时间：</span>
                            <span>{{ seminar.time }}</span>
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
            seminars: [
                {
                    id: 1,
                    company: '四方伟业',
                    majors: '软件工程、信息安全、数字媒体技术',
                    time: '2019-3-3'
                },
                {
                    id: 2,
                    company: '四方伟业',
                    majors: '软件工程、信息安全、数字媒体技术',
                    time: '2019-3-3'
                }
            ],
        }
    },
    mounted() {
        let nav = document.getElementById('nav');
        this.navHeight = window.getComputedStyle(nav).height;
        document.getElementById('content').style.marginTop = this.navHeight;
    },
}
</script>

<style scoped>

</style>

