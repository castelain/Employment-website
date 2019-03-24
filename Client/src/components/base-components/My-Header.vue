<template>
    <my-row class="fixed-top nav">
        <el-menu mode="horizontal" :default-active="activeIndex" router>
            <el-menu-item :index="item.src" v-for="(item, index) in navItems" :key="index">
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
                    src: '/'
                },
                {
                    msg: '学校简介',
                    src: '/school-introduction'
                },
                {
                    msg: '就业信息',
                    src: '/employment-information'
                },
                {
                    msg: '常见问题',
                    src: '/common-questions'
                }
            ]
        }
    }
}
</script>

<style scoped>
    .fixed-top {
        position: fixed;
        top: 0;
    }
    .nav {
        width: 100%;
        background-color: white;
    }
</style>
