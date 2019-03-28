<template>
    <el-pagination
        background
        layout = "prev, pager, next"
        :pageSize = "setting.pageSize"
        :total = "setting.total"
        @current-change="handleCurrentChange">
    </el-pagination>
    
</template>

<script>
export default {
    name: 'MyPagination',
    props: [ 'setting' ],
    data () {
        return {

        }
    },
    methods: {
        handleCurrentChange: function(val) {
            this.$emit('current-change', val);
        }
    },
}
</script>

<style scoped>
    .el-pagination {
        margin-top: 4%;
        margin-bottom: 4%;
    }
</style>

