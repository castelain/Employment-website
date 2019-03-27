<template>
    <div>
        <my-title title="专业简介" style="margin-top: 2%;"></my-title>
        <el-table :data="colleges" border stripe style="width: 100%;">
            <el-table-column
                prop="name"
                :label="columns[0]"
                width="150">
            </el-table-column>
            <el-table-column
                prop="majors"
                :label="columns[1]"
                >
            </el-table-column>
            <el-table-column
                fixed="right"
                :label="columns[2]"
                width="100">
                 <template slot-scope="scope">
                    <el-button type="text" @click="showDetail(scope.row)">查看详情</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    name: 'MajorIntroduction',
    data () {
        return {
            colleges: [
                {
                    id: 1,
                    name: '软件学院',
                    majors: '软件工程，数字媒体，信息安全，网络安全'
                },
                {
                    id: 2,
                    name: '信息学院',
                    majors: '软件工程，数字媒体，信息安全，网络安全'
                },
                {
                    id: 3,
                    name: '国际金融学院',
                    majors: '软件工程，数字媒体，信息安全，网络安全'
                }
            ],
            columns: [ '学院名称', '所含专业', '操作' ]
        }
    },
    methods: {
        showDetail: function(row) {
            this.$router.push({ path: '/major-detail/' + row.id });
        }
    },
}
</script>

<style scoped>
    .el-table {
        width: 100%;
    }
</style>

