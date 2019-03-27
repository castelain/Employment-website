<template>
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item v-for="(nav, index) in navs" :key="index" :to="nav.src">
            {{ nav.msg }}
        </el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script>
export default {
    name: 'MyInnerNav',
    props: [ 'navs' ],
    data () {
        return {

        }
    }
}
</script>

<style scoped>
    .el-breadcrumb {
        margin-top: 2%;
        margin-bottom: 4%;
    }
</style>
