<template>
    <el-tabs
        type="border-card" tab-position="left">
        <el-tab-pane v-for="(tab, index) in tabs"
            :key="index"
            :label = "tab"
            :name="index">
            <router-view name="history"></router-view>
            <router-view name="majors"></router-view>
        </el-tab-pane>
    </el-tabs>
    
</template>

<script>
export default {
    name: 'MyTabs',
    props: [ 'tabs' ],
    data () {
        return {

        }
    }
}
</script>

<style scoped>

</style>

