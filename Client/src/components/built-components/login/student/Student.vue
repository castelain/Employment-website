<template>
    <my-container>
        <my-header slot="my-header" id="nav"></my-header>

        <my-row id="content">
            <my-inner-nav :navs="innerNavs"></my-inner-nav>
            <el-row :gutter="20">
                <el-col :span="6">
                    <el-menu mode="vertical" default-active="1" router
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
                        <el-menu-item :index="menus[2].path">
                            <span>{{ menus[2].menus }}</span>
                        </el-menu-item>
                        <el-menu-item :index="menus[3].path">
                            <span>{{ menus[3].menus }}</span>
                        </el-menu-item>
                        <el-menu-item :index="menus[4].path">
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
    name: 'Student',
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
                    msg: '学生中心' 
                }
            ],
            // 侧边栏数据
            menus: [
                {
                    menus: '修改密码',
                    path: '/student/update-password',
                    submenus: []
                },
                {
                    menus: '我的简历',
                    path: '#',
                    submenus: [
                        {
                            title: '创建简历',
                            path: '/student/create-profile'
                        },
                        {
                            title: '更新简历',
                            path: '/student/update-profile'
                        },
                        {
                            title: '预览简历',
                            path: '/student/see-profile'
                        },
                        {
                            title: '删除简历',
                            path: '/student/delete-profile'
                        }
                    ]
                },
                {
                    menus: '我的消息',
                    path: '/student/my-message',
                    submenus: []
                },
                {
                    menus: '查看企业',
                    path: '/student/see-company',
                    submenus: []
                },
                {
                    menus: '退出登录',
                    path: '/student/logout',
                    submenus: []
                },
            ]
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

