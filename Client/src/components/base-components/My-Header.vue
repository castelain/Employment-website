<template>
    <my-row class="fixed-top nav">
        <el-menu mode="horizontal" :default-active="activeIndex" router>
            <el-menu-item :index="item.src" v-for="(item, index) in navItems.slice(0,1)" :key="index.msg">
                {{ item.msg }}
            </el-menu-item>
            <el-submenu :index="item.src" v-for="(item, index) in navItems.slice(1,3)" :key="index.msg">
                <template slot="title">{{ item.msg }}</template>
                <template>
                    <el-menu-item v-for="(subItem, subIndex) in item.subItems"
                    :index="subItem.src"
                    :key="subIndex">
                        {{ subItem.msg }}
                    </el-menu-item>
                </template>
            </el-submenu>
            <el-menu-item :index="item.src" v-for="(item, index) in navItems.slice(3,4)" :key="index.msg">
                {{ item.msg }}
            </el-menu-item>
            <el-menu-item :index="item.src" v-for="(item, index) in navItems.slice(4)" :key="index.msg" style="float: right;">
                {{ item.msg }}
            </el-menu-item>
        </el-menu>
    </my-row>
</template>

<script>
export default {
    name: 'MyHeader',
    data () {
        return {
            activeIndex: this.$route.fullPath,
            navItems: [
                {
                    msg: '首页',
                    src: '/',
                    subItems: []
                },
                {
                    msg: '学校简介',
                    src: '/school-introduction',
                    subItems: [
                        {
                            msg: '校史沿革',
                            src: '/school-introduction/school-history'
                        },
                        {
                            msg: '专业简介',
                            src: '/school-introduction/major-introduction'
                        }
                    ]
                },
                {
                    msg: '就业信息',
                    src: '/employment-information',
                    subItems: [
                        {
                            msg: '就业政策',
                            src: '/employment-information/employment-policy'
                        },
                        {
                            msg: '职业评测',
                            src: '/employment-information/career-assessment'
                        }
                    ]
                },
                {
                    msg: '常见问题',
                    src: '/common-questions',
                    subItems: []
                },
                {
                    msg: '登录',
                    src: '/login',
                    subItems: []
                },
                {
                    msg: '注册',
                    src: '/register',
                    subItems: []
                }
            ]
        }
    },
    created() {
        // 根据是否登录，来更改导航
        if(localStorage.getItem('isLogined')){
            console.log('my-header');
            if(localStorage.getItem('type') == 0){
                this.navItems[4] =  { msg: localStorage.getItem('nickname'), src: '/student/' + localStorage.getItem('id'), subItems: [] };
            }else if(localStorage.getItem('type') == 1){
                this.navItems[4] = { msg: localStorage.getItem('name'), src: '/company/' + localStorage.getItem('id'), subItems: [] };
            }else if(localStorage.getItem('type') == 2){
                this.navItems[4] = { msg: localStorage.getItem('nickname'), src: '/administrator/' + localStorage.getItem('id'), subItems: [] };
            }

            // this.navItems.push({ msg: '登出', src: '' });

            // this.$nextTick(function(){
            //     let logOut = document.getElementById('登出');
            //     logOut.addEventListener('click', function(){
            //         localStorage.removeItem('isLogined');
            //         location.reload();
            //     });
            // })
        }
    },
}
</script>

<style scoped>
    .fixed-top {
        position: fixed;
        top: 0;
        z-index: 100;
    }
    .nav {
        width: 100%;
        background-color: white;
    }
</style>
