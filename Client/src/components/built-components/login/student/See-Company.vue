<template>
    <div>
        <my-title title="查看企业" class="title"></my-title>
        <el-form :model="form" ref="form" label-width="80px" id="search">
            <el-form-item>
                <el-input
                    placeholder="请输入关键字(名称、类型、规模等)"
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
                <el-button type="primary" @click="send(scope.row)" plain size="small">留言</el-button>
            </template>
            </el-table-column>
        </el-table>

        <!-- 发送留言的弹出框 -->
        <el-dialog title="编辑留言" :visible.sync="formVisible">
            <el-form :model="messageForm">
                <el-form-item label="留言内容">
                    <el-input v-model="messageForm.message" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="formVisible = false">取 消</el-button>
                <el-button type="primary" @click="sendMessage">确 定</el-button>
            </div>
        </el-dialog>

        <my-pagination :setting="setting" @current-change="handleCurrentChange"></my-pagination>
    </div>
</template>

<script>
export default {
    name: 'SeeCompany',
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
            },
            formVisible: false,
            messageForm: {
                student_id: null,
                company_id: null,
                message: '',
            }
        }
    },
    methods: {
        handleCurrentChange: function(val) {
            if(val === 1) {
                this.companies = this.temp.slice(0, this.setting.pageSize);;
            }else {
                this.companies = this.temp.slice( this.setting.pageSize*(val-1) );
            }
        },
        send: function (row) {
            this.messageForm.student_id = localStorage.getItem('id');
            this.messageForm.company_id = row.id;
            this.formVisible = true;
        },
        sendMessage: function () {
            if(this.messageForm.message === '') {
                this.$message({
                    type: 'error',
                    message: '留言信息不可为空！'
                });
            }else {
                this.$http.post('/api/student_company/to_company', this.messageForm)
                    .then(response => {
                        this.$message({
                            type: 'success',
                            message: '向企业留言成功了！'
                        });
                        this.formVisible = false;
                    })
                    .catch(error => {
                        this.$message({
                            type: 'error',
                            message: '向企业留言失败了！'+ error.msg
                        });
                    });
            }
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

