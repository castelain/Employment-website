<template>
    <div>
        <my-title title="专业简介" style="margin-top: 2%;"></my-title>
        <el-table :data="colleges" border stripe style="width: 100%;">
            <el-table-column
                prop="title"
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
        <my-pagination :setting="setting" @current-change="handleCurrentChange"></my-pagination>
    </div>
</template>

<script>
export default {
    name: 'MajorIntroduction',
    data () {
        return {
            colleges: null,
            columns: [ '学院名称', '所含专业', '操作' ],
            // 关于分页的设置
            setting: {
                pageSize: 5,
                total: null
            },
            // 临时变量
            temp: null,
        }
    },
    created() {
        this.$http.get('/api/school_college')
            .then(response => {
                this.colleges = response;
                // 初始化记录的总数目
                this.setting.total = this.colleges.length;
                // 初始化临时变量
                this.temp = this.colleges;
                // 初始化首页的显示记录
                this.handleCurrentChange(1);
            })
            .catch(error => {
                console.log('获取所有学院的信息失败了！' + error);
            }) ;
    },
    methods: {
        showDetail: function(row) {
            this.$router.push({ path: '/major-detail/' + row.id });
        },
        handleCurrentChange: function(val) {
            if(val === 1) {
                this.colleges = this.temp.slice(0, this.setting.pageSize);;
            }else {
                this.colleges = this.temp.slice( this.setting.pageSize*(val-1) );
            }
        }
    },
}
</script>

<style scoped>
    .el-table {
        width: 100%;
    }
</style>

