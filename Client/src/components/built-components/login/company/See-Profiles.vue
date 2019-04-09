<template>
    <div>
        <my-title title="查看学生" class="title"></my-title>
        <el-form :model="form" ref="form" label-width="80px" id="search">
            <el-form-item>
                <el-input
                    placeholder="请输入关键字（用户名、真实姓名、学校、学院、专业）"
                    prefix-icon="el-icon-search"
                    v-model.trim="form.keyword" @keyup.native.enter="search">
                </el-input>
            </el-form-item>
        </el-form>
        
        <el-table
            :data="students"
            stripe border
            style="width: 100%">
            <el-table-column
                prop="username"
                label="用户名"
                width="120">
            </el-table-column>
            <el-table-column
                prop="realname"
                label="真实姓名"
                width="120">
            </el-table-column>
            <el-table-column
                prop="school"
                label="就读学校">
            </el-table-column>
            <el-table-column
                prop="college"
                label="学院"
                width="120">
            </el-table-column>
            <el-table-column
                prop="major"
                label="专业">
            </el-table-column>
            <el-table-column
                fixed="right"
                label="操作"
                width="160">
            <template slot-scope="scope">
                <el-button type="text" @click="seeProfile(scope.row)">查看简历</el-button>
                <el-button type="success" @click="send(scope.row)" plain size="small">留言</el-button>
            </template>
            </el-table-column>
        </el-table>

        <!-- 回复留言的弹出框 -->
        <el-dialog title="编辑回复留言" :visible.sync="formVisible">
            <el-form :model="form">
                <el-form-item label="回复内容">
                    <el-input v-model="form.message" autocomplete="off"></el-input>
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
    name: 'SeeProfile',
    data () {
        return {
            students: null,
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
        seeProfile: function(row) {
            this.$http.get('/api/resume/get-id/' + row.id)
                .then(response => {
                    if(response.length === 0) {
                        this.$message({
                            type: 'primary',
                            message: '该学生尚未创建简历！'
                        });
                    }else {
                        this.$router.push({ path: '/visit-resume/' + response[0].id });
                    }
                })
                .catch(error => {
                    console.log('获取简历id失败了！' + error);
                });
        },
        handleCurrentChange: function(val) {
            if(val === 1) {
                this.students = this.temp.slice(0, this.setting.pageSize);;
            }else {
                this.students = this.temp.slice( this.setting.pageSize*(val-1) );
            }
        },
        deleteItem: function(row) {
            this.$http.delete('/api/student/' + row.id)
                .then(response => {
                    this.$message({
                        type: 'success',
                        message: '删除学生信息成功了！'
                    });
                    location.reload();
                })
                .catch(error => {
                    this.$message({
                        type: 'error',
                        message: '删除学生信息失败了！'+ error.msg
                    });
                })
        },
        send: function (row) {
            this.form.student_id = localStorage.getItem('id');
            this.form.company_id = row.id;
            this.formVisible = true;
        },
        sendMessage: function (row) {
            if(this.messageForm.message === '') {
                this.$message({
                    type: 'error',
                    message: '留言信息不可为空！'
                });
            }else {
                this.$http.post('/api//student_company/to_company', this.form)
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
                this.$http.get('/api/student')
                .then(response => {
                    this.students = response;
                    // 初始化记录的总数目
                    this.setting.total = this.students.length;
                    // 初始化临时变量
                    this.temp = this.students;
                    // 初始化首页的显示记录
                    this.handleCurrentChange(1);
                })
                .catch(error => {
                    console.log('搜索学生信息列表失败了:' + error);
                });
            }else {
                this.$http.get('/api/student?keyword=' + this.form.keyword)
                    .then(response => {
                        this.students = response;
                        // 初始化记录的总数目
                        this.setting.total = this.students.length;
                        // 初始化临时变量
                        this.temp = this.students;
                        // 初始化首页的显示记录
                        this.handleCurrentChange(1);
                    })
                    .catch(error => {
                        console.log('搜索学生信息列表失败了:' + error);
                    });
            }
        }
    },
    created() {
        this.$http.get('/api/student')
            .then(response => {
                this.students = response;
                 // 初始化记录的总数目
                this.setting.total = this.students.length;
                // 初始化临时变量
                this.temp = this.students;
                // 初始化首页的显示记录
                this.handleCurrentChange(1);
            })
            .catch(error => {
                console.log('获取学生信息列表失败了:' + error);
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

