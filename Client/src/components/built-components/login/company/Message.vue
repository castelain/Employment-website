<template>
    <div>
        <my-title title="管理我的消息" class="title"></my-title>
        
        <el-table
            :data="messages"
            stripe border
            style="width: 100%">
            <el-table-column type="expand">
                <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                        <el-form-item label="学生姓名">
                            <span>{{ props.row.realname }}</span>
                        </el-form-item>
                        <el-form-item label="留言详情">
                            <span class="preWrap">{{ props.row.message }}</span>
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column
                prop="realname"
                label="学生姓名">
            </el-table-column>
            <el-table-column
                prop="time"
                label="留言时间">
            </el-table-column>
            <el-table-column
                fixed="right"
                label="操作"
                width="120">
            <template slot-scope="scope">
                <el-button type="text" @click="send(scope.row)" size="small">回复</el-button>
                <el-button type="danger" @click="deleteItem(scope.row)" plain size="small">删除</el-button>
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
    name: 'Message',
    data () {
        return {
            messages: null,
            formLabelWidth: '120px',
             // 关于分页的设置
            setting: {
                pageSize: 5,
                total: null
            },
            // 临时变量
            temp: null,
            // 回复表单
            formVisible: false,
            form: {
                student_id: null,
                company_id: null,
                message: '',
            }
        }
    },
    methods: {
        handleCurrentChange: function(val) {
            if(val === 1) {
                this.messages = this.temp.slice(0, this.setting.pageSize);;
            }else {
                this.messages = this.temp.slice( this.setting.pageSize*(val-1) );
            }
        },
        send: function (row) {
            this.form.student_id = row.student_id;
            this.form.company_id = row.company_id;
            this.formVisible = true;
        },
        sendMessage: function (row) {
            if(this.messageForm.message === '') {
                this.$message({
                    type: 'error',
                    message: '留言信息不可为空！'
                });
            }else {
                this.$http.post('/api/student_company/to_student', this.form)
                    .then(response => {
                        this.$message({
                            type: 'success',
                            message: '回复学生留言成功了！'
                        });
                        this.formVisible = false;
                    })
                    .catch(error => {
                        this.$message({
                            type: 'error',
                            message: '回复学生留言失败了！'+ error.msg
                        });
                    });
            }
        },
        deleteItem: function(row) {
            this.$http.delete('/api/student_company/' + row.id)
                .then(response => {
                    this.$message({
                        type: 'success',
                        message: '删除学生留言成功了！'
                    });
                    location.reload();
                })
                .catch(error => {
                    this.$message({
                        type: 'error',
                        message: '删除学生留言失败了！'+ error.msg
                    });
                });
        },
    },
    created() {
        this.$http.get('/api/student_company/to_company/' + localStorage.getItem('id'))
            .then(response => {
                response.map((item, index) => {
                    item.time = this.formatTime(item.time);
                });
                this.messages = response;
                 // 初始化记录的总数目
                this.setting.total = this.messages.length;
                // 初始化临时变量
                this.temp = this.seminars;
                // 初始化首页的显示记录
                this.handleCurrentChange(1);
            })
            .catch(error => {
                console.log('获取留言列表失败了:' + error);
            });

    },
}
</script>

<style scoped>
    .title {
        margin-top: -4px;
        margin-bottom: 6%;
    }
    .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    /* margin-right: 0; */
    margin-bottom: 0;
    width: 80%;
  }
</style>

