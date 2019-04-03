<template>
    <div>
        <my-title title="我的宣讲会" class="title"></my-title>
        <el-button @click="add" type="text">添加</el-button>
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
            :data="seminars"
            stripe border
            style="width: 100%">
            <el-table-column
                prop="majors"
                label="招聘专业"
                width="120">
            </el-table-column>
            <el-table-column
                prop="holds_in"
                label="举行时间"
                width="80">
            </el-table-column>
            <el-table-column
                prop="address"
                label="举行地点">
            </el-table-column>
            <el-table-column
                prop="status"
                label="审核状态">
            </el-table-column>
            <el-table-column
                prop="created_at"
                label="提交时间">
            </el-table-column>
            <el-table-column
                prop="company_description"
                label="公司描述">
            </el-table-column>
            <el-table-column
                prop="job_description"
                label="工作描述"
                width="120">
            </el-table-column>
            <el-table-column
                prop="salary_description"
                label="薪资待遇">
            </el-table-column>
            <el-table-column
                prop="application_process"
                label="应聘流程">
            </el-table-column>
            <el-table-column
                fixed="right"
                label="操作"
                width="160">
            <template slot-scope="scope">
                <el-button type="text" @click="see(scope.row)" size="small">查看详情</el-button>
                <el-button type="danger" @click="delete(scope.row)" plain size="small">删除</el-button>
            </template>
            </el-table-column>
        </el-table>

        <!--添加宣讲会的弹出框 -->
        <el-dialog title="添加宣讲会" :visible.sync="addFormVisible">
            <el-form :model="addForm">
                <el-form-item label="学院">
                    <el-input v-model="addForm.title" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="专业">
                    <el-input v-model="addForm.majors" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="简介">
                    <el-input v-model="addForm.content" autocomplete="off" type="textarea"
                        :autosize="{ minRows: 2, maxRows: 4}">
                    </el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitAddForm">确 定</el-button>
            </div>
        </el-dialog>

        <my-pagination :setting="setting" @current-change="handleCurrentChange"></my-pagination>
    </div>
</template>

<script>
export default {
    name: 'Seminars',
    data () {
        return {
            seminars: null,
             addFormVisible: false,
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
            // 添加表单的数据
            addForm: {
                holds_in: '',
                address: '',
                majors: '',
                company_description: '',
                job_description: '',
                salary_description: '',
                application_process: ''
            },
        }
    },
    methods: {
        handleCurrentChange: function(val) {
            if(val === 1) {
                this.seminars = this.temp.slice(0, this.setting.pageSize);;
            }else {
                this.seminars = this.temp.slice( this.setting.pageSize*(val-1) );
            }
        },
        add: function() {
            this.addFormVisible = true;
        },
        see: function (row) {
            this.$router.push({ path: '/seminar-detail/' + row.id });
        },
        delete: function(row) {
            this.$http.delete('/api/seminar/' + row.id)
                .then(response => {
                    this.$message({
                        type: 'success',
                        message: '删除宣讲会操作成功了！'
                    });
                    location.reload();
                })
                .catch(error => {
                    this.$message({
                        type: 'danger',
                        message: '删除宣讲会操作失败了！' + error
                    });
                });
        },
        submitAddForm: function() {
            this.$http.post('/api/school_college', this.addForm)
                .then(response => {
                    location.reload();
                })
                .catch(error => {
                    this.$message({
                        type: 'error',
                        message: '添加宣讲会失败了！' + error.msg
                    });
                });
        },
        search: function () {
            if(this.form.keyword == '') {
                this.$http.get('/api/company/' + localStorage.getItem('id') + '/seminar')
                .then(response => {
                        response.map((item, index) => {
                            item.status = this.formateStatus(item.status);
                            item.holds_in = this.formatTime(item.holds_in);
                            item.created_at = this.formatTime(item.created_at);
                            item.company_description = this.formateStr(item.company_description, 10);
                            item.job_description = this.formateStr(item.job_description, 10);
                            item.salary_description = this.formateStr(item.salary_description, 10);
                            item.application_process = this.formateStr(item.application_process, 10);
                        });
                        this.seminars = response;
                        // 初始化记录的总数目
                        this.setting.total = this.seminars.length;
                        // 初始化临时变量
                        this.temp = this.seminars;
                        // 初始化首页的显示记录
                        this.handleCurrentChange(1);
                })
                .catch(error => {
                    console.log('搜索宣讲会信息列表失败了:' + error);
                });
            }else {
                let keyword = this.form.keyword;
                if(this.form.keyword === '待审核') {
                    keyword = 0;
                }else if (this.form.keyword === '审核通过') {
                    keyword = 1;
                }else if(this.form.keyword === '审核不通过') {
                    keyword = -1;
                }
                this.$http.get('/api/company/' + localStorage.getItem('id') + '/seminar/?keyword=' + keyword)
                    .then(response => {
                        response.map((item, index) => {
                        item.status = this.formateStatus(item.status);
                        item.holds_in = this.formatTime(item.holds_in);
                        item.created_at = this.formatTime(item.created_at);
                        item.company_description = this.formateStr(item.company_description, 10);
                        item.job_description = this.formateStr(item.job_description, 10);
                        item.salary_description = this.formateStr(item.salary_description, 10);
                        item.application_process = this.formateStr(item.application_process, 10);
                    });
                        this.seminars = response;
                        // 初始化记录的总数目
                        this.setting.total = this.seminars.length;
                        // 初始化临时变量
                        this.temp = this.seminars;
                        // 初始化首页的显示记录
                        this.handleCurrentChange(1);
                    })
                    .catch(error => {
                        console.log('搜索宣讲会信息列表失败了:' + error);
                    });
            }
        }
    },
    created() {
        this.$http.get('/api/company/' + localStorage.getItem('id') + '/seminar')
            .then(response => {
                response.map((item, index) => {
                    item.status = this.formateStatus(item.status);
                    item.holds_in = this.formatTime(item.holds_in);
                    item.created_at = this.formatTime(item.created_at);
                    item.company_description = this.formateStr(item.company_description, 10);
                    item.job_description = this.formateStr(item.job_description, 10);
                    item.salary_description = this.formateStr(item.salary_description, 10);
                    item.application_process = this.formateStr(item.application_process, 10);
                });
                this.seminars = response;
                 // 初始化记录的总数目
                this.setting.total = this.seminars.length;
                // 初始化临时变量
                this.temp = this.seminars;
                // 初始化首页的显示记录
                this.handleCurrentChange(1);
            })
            .catch(error => {
                console.log('获取宣讲会信息列表失败了:' + error);
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

