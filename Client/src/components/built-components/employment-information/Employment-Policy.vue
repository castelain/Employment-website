<template>
    <div>
        <my-title title="就业政策" style="margin-top: 2%;"></my-title>
        <el-table :data="policies" border stripe style="width: 100%;">
            <el-table-column
                prop="title"
                :label="columns[0]"
                width="150">
            </el-table-column>
            <el-table-column
                prop="content"
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
    name: 'EmploymentPolicy',
    data () {
        return {
            policies: null,
            columns: [ '政策名称', '内容简介', '操作' ],
             // 关于分页的设置
            setting: {
                pageSize: 5,
                total: 5
            },
            // 临时变量
            temp: null,
        }
    },
    created() {
        this.$http.get('/api/employment_policy')
            .then(response => {
                response.map((value, index) => {
                    value.created_at = this.formatTime(value.created_at);
                    value.content = this.formateStr(value.content, 30);
                });
                this.policies = response;
                if(this.polices.length) {
                    // 初始化记录的总数目
                    this.setting.total = this.polices.length;
                    // 初始化临时变量
                    this.temp = this.polices;
                    // 初始化首页的显示记录
                    this.handleCurrentChange(1);
                }
               
            })
            .catch(error => {
                console.log('获取就业政策列表失败了:' + error);
            });
    },
    methods: {
        showDetail: function(row) {
            this.$router.push({ path: '/policyment-detail/' + row.id });
        },
        handleCurrentChange: function(val) {
            if(val === 1) {
                this.policies = this.temp.slice(0, this.setting.pageSize);;
            }else {
                this.policies = this.temp.slice( this.setting.pageSize*(val-1) );
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

