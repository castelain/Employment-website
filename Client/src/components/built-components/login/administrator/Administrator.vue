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
                        <el-menu-item :index="menus[0].path">
                            <span>{{ menus[0].menus }}</span>
                        </el-menu-item>
                        <el-submenu :index="menus[1].path">
                            <template slot="title">{{ menus[1].menus }}</template>
                            <el-menu-item v-for="(item, subIndex) in menus[1].submenus"
                                :index="item.path"
                                :key="subIndex">>
                                    {{ item.title }}
                            </el-menu-item>
                        </el-submenu>
                        <el-submenu :index="menus[2].path">
                            <template slot="title">{{ menus[2].menus }}</template>
                            <el-menu-item v-for="(item, subIndex) in menus[2].submenus"
                                :index="item.path"
                                :key="subIndex">>
                                    {{ item.title }}
                            </el-menu-item>
                        </el-submenu>
                        <el-menu-item :index="menus[3].path">
                            <span>{{ menus[3].menus }}</span>
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
    name: 'Administrator',
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
                    msg: '管理员中心' 
                }
            ],
            menus: [
                {
                    menus: '学生事务',
                    path: '/administrator/student-manage',
                },
                {
                    menus: '企业事务',
                    path: '',
                    submenus: [
                        {
                            title: '管理企业',
                            path: '/administrator/company-manage'
                        },
                        {
                            title: '管理宣讲会',
                            path: '/administrator/seminar-manage'
                        }
                    ]
                },
                {
                    menus: '信息管理',
                    path: '#',
                    submenus: [
                        {
                            title: '最新通知',
                            path: '/administrator/notification-manage'
                        },
                        {
                            title: '校史沿革',
                            path: '/administrator/history-manage'
                        },
                        {
                            title: '专业简介',
                            path: '/administrator/college-manage'
                        },
                        {
                            title: '就业政策',
                            path: '/administrator/policy-manage'
                        },
                        {
                            title: '职业评测',
                            path: '/administrator/assessment-manage'
                        }
                    ]
                },
                {
                    menus: '修改密码',
                    path: '/administrator/update-password-admin',
                },
                {
                    menus: '退出登录',
                    path: '#',
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

