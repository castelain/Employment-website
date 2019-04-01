<template>
    <my-container>
        <my-header slot="my-header" id="nav"></my-header>

        <my-row id="content">
            <my-inner-nav :navs="innerNavs"></my-inner-nav>
            <el-row :gutter="20">
                <el-col :span="6">
                    <el-menu mode="vertical" :default-active="menus[0].path" router
                            background-color="#408FFF"
                            text-color="#fff"
                            active-text-color="#aabbaa">
                        <el-menu-item :index="submenus.path" v-for="(submenus, index) in menus.slice(0, 4)" :key="index">
                            <span>{{ submenus.menus }}</span>
                        </el-menu-item>

                        <el-menu-item :index="menus[4].path" @click="logout">
                            <span>{{ menus[4].menus }}</span>
                        </el-menu-item>
                        
                    </el-menu>
                </el-col>
                <el-col :span="18">
                    <router-view></router-view>
                </el-col>
            </el-row>
        </my-row>

        <my-footer slot="my-footer"></my-footer>
    </my-container>
</template>

<script>
export default {
    name: 'Company',
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
                    src: '#',
                    msg: '企业中心' 
                }
            ],
            // 侧边栏数据
            menus: [
                {
                    menus: '企业资料',
                    path: '/company/information',
                },
                {
                    menus: '查看学生简历',
                    path: '/company/see-profiles',
                },
                {
                    menus: '我的消息',
                    path: '/company/company-message',
                },
                {
                    menus: '我的宣讲会',
                    path: '/company/seminars',
                },
                {
                    menus: '退出登录',
                    path: '/company/logout',
                }
            ]
        }
    },
    methods: {
        logout: function() {
            localStorage.clear();
            this.$router.push('/');
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
    .el-menu {
        color: white;
    }
</style>

