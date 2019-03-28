<template>
    <div>
        <my-title title="职业评测" style="margin-top: 2%;"></my-title>
        <el-table :data="assessments" border stripe style="width: 100%;">
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
    name: 'CareerAssessment',
    data () {
        return {
            assessments: [
                {
                    id: 1,
                    title: '霍兰德职业倾向测试大类解释',
                    content: '霍兰德职业兴趣自测（Self-Directed Search）是由美国职业指导专家霍兰德（John Holland）根据他本人大量的职业咨询经验及其职业类型理论编制的测评工具。霍兰德认为，个人职业兴趣特性与职业之间应有一种内在的对应关系。根据兴趣的不同，人格可分为研究型（I）、艺术型（A）、社会型（S）、企业型（E）、传统型（C）、现实型（R）六个维度，每个人的性格都是这六个维度的不同程度组合。'.slice(0,40) + '......'
                },
                {
                    id: 2,
                    title: '霍兰德职业倾向测试大类解释',
                    content: '霍兰德职业兴趣自测（Self-Directed Search）是由美国职业指导专家霍兰德（John Holland）根据他本人大量的职业咨询经验及其职业类型理论编制的测评工具。霍兰德认为，个人职业兴趣特性与职业之间应有一种内在的对应关系。根据兴趣的不同，人格可分为研究型（I）、艺术型（A）、社会型（S）、企业型（E）、传统型（C）、现实型（R）六个维度，每个人的性格都是这六个维度的不同程度组合。'.slice(0,40) + '......'
                },
                {
                    id: 3,
                    title: '霍兰德职业倾向测试大类解释',
                    content: '霍兰德职业兴趣自测（Self-Directed Search）是由美国职业指导专家霍兰德（John Holland）根据他本人大量的职业咨询经验及其职业类型理论编制的测评工具。霍兰德认为，个人职业兴趣特性与职业之间应有一种内在的对应关系。根据兴趣的不同，人格可分为研究型（I）、艺术型（A）、社会型（S）、企业型（E）、传统型（C）、现实型（R）六个维度，每个人的性格都是这六个维度的不同程度组合。'.slice(0,40) + '......'
                },
            ],
            columns: [ '职业评测', '内容简介', '操作' ],
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
        // 初始化记录的总数目
        this.setting.total = this.assessments.length;
         // 初始化临时变量
        this.temp = this.assessments;
        // 初始化首页的显示记录
        this.handleCurrentChange(1);
    },
    methods: {
        showDetail: function(row) {
            this.$router.push({ path: '/assessment-detail/' + row.id });
        },
        handleCurrentChange: function(val) {
            if(val === 1) {
                this.assessments = this.temp.slice(0, this.setting.pageSize);;
            }else {
                this.assessments = this.temp.slice( this.setting.pageSize*(val-1) );
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

