<template>
    <div>
        <my-title title="管理企业" class="title"></my-title>
        <el-form :model="form" ref="form" label-width="80px" id="search">
            <el-form-item>
                <el-input
                    placeholder="请输入关键字"
                    prefix-icon="el-icon-search"
                    v-model="form.keyword" @keyup.native.enter="search">
                </el-input>
            </el-form-item>
        </el-form>
        
        <el-table
            :data="companies"
            stripe border
            style="width: 100%">
            <el-table-column
                prop="username"
                label="用户名"
                width="80">
            </el-table-column>
            <el-table-column
                prop="name"
                label="公司名称"
                width="120">
            </el-table-column>
            <el-table-column
                prop="kind"
                label="公司类型"
                width="120">
            </el-table-column>
            <el-table-column
                prop="scale"
                label="公司规模"
                width="120">
            </el-table-column>
            <el-table-column
                prop="address"
                label="公司地址"
                width="120">
            </el-table-column>
            <el-table-column
                prop="email"
                label="公司邮箱"
                width="120">
            </el-table-column>
            <el-table-column
                prop="link_man"
                label="公司联系人"
                width="120">
            </el-table-column>
            <el-table-column
                prop="link_man_tel"
                label="公司联系人电话"
                width="120">
            </el-table-column>
            <el-table-column
                fixed="right"
                label="操作"
                width="80">
            <template slot-scope="scope">
                <el-button type="danger" @click="deleteItem(scope.row)" plain size="small">删除</el-button>
            </template>
            </el-table-column>
        </el-table>

        <my-pagination :setting="setting" @current-change="handleCurrentChange"></my-pagination>
    </div>
</template>

<script>
export default {
    name: 'CompanyManage',
    data () {
        return {
            companies: null,
            formLabelWidth: '120px',
             // 关于分页的设置
            setting: {
                pageSize: 5,
                total: null
            },
            // 临时变量
            temp: null,
            // 搜索表单
            form: {
                keyword: ''
            }
        }
    },
    methods: {
        seeProfile: function(row) {
            
        },
        handleCurrentChange: function(val) {
            if(val === 1) {
                this.companies = this.temp.slice(0, this.setting.pageSize);;
            }else {
                this.companies = this.temp.slice( this.setting.pageSize*(val-1) );
            }
        },
        deleteItem: function(row) {
            this.$http.delete('/api/company/' + row.id)
                .then(response => {
                    this.$message({
                        type: 'success',
                        message: '删除企业信息成功了！'
                    });
                    location.reload();
                })
                .catch(error => {
                    this.$message({
                        type: 'error',
                        message: '删除企业信息失败了！'+ error.msg
                    });
                })
        },
        search: function () {
            if(this.form.keyword == '') {
                this.$http.get('/api/company')
                .then(response => {
                    this.companies = response;
                    // 初始化记录的总数目
                    this.setting.total = this.companies.length;
                    // 初始化临时变量
                    this.temp = this.companies;
                    // 初始化首页的显示记录
                    this.handleCurrentChange(1);
                })
                .catch(error => {
                    console.log('搜索企业信息列表失败了:' + error);
                });
            }else {
                this.$http.get('/api/company?keyword=' + this.form.keyword)
                    .then(response => {
                        this.companies = response;
                        // 初始化记录的总数目
                        this.setting.total = this.companies.length;
                        // 初始化临时变量
                        this.temp = this.companies;
                        // 初始化首页的显示记录
                        this.handleCurrentChange(1);
                    })
                    .catch(error => {
                        console.log('搜索企业信息列表失败了:' + error);
                    });
            }
        }
    },
    created() {
        this.$http.get('/api/company')
            .then(response => {
                this.companies = response;
                 // 初始化记录的总数目
                this.setting.total = this.companies.length;
                // 初始化临时变量
                this.temp = this.companies;
                // 初始化首页的显示记录
                this.handleCurrentChange(1);
            })
            .catch(error => {
                console.log('获取企业信息列表失败了:' + error);
            });

    },
}
</script>

<style scoped>
    .title {
        margin-top: -4px;
        margin-bottom: -4px;
    }
    #search {
        margin: 6% auto;
    }
</style>

