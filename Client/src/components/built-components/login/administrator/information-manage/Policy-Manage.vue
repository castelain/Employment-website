<template>
    <div>
        <my-title title="管理就业政策" class="title"></my-title>
        <el-button @click="add" type="text">添加</el-button>
        <el-table
            :data="polices"
            stripe border
            style="width: 100%">
            <el-table-column
                prop="created_at"
                label="创建日期"
                width="120">
            </el-table-column>
            <el-table-column
                prop="title"
                label="标题"
                width="180">
            </el-table-column>
            <el-table-column
                prop="content"
                label="内容">
            </el-table-column>
            <el-table-column
                fixed="right"
                label="操作"
                width="180">
            <template slot-scope="scope">
                <el-button @click="see(scope.row)" type="text">查看</el-button>
                <el-button type="text" @click="edit(scope.row)">编辑</el-button>
                <el-button type="danger" @click="deleteItem(scope.row)" plain size="small">删除</el-button>
            </template>
            </el-table-column>
        </el-table>

        <my-pagination :setting="setting" @current-change="handleCurrentChange"></my-pagination>

        <!-- 编辑就业政策的弹出框 -->
        <el-dialog title="编辑就业政策" :visible.sync="editFormVisible">
            <el-form :model="editForm">
                <el-form-item label="标题">
                    <el-input v-model="editForm.title" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="内容">
                    <el-input v-model="editForm.content" autocomplete="off" type="textarea"
                        :autosize="{ minRows: 2, maxRows: 4}">
                    </el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="editFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitEditForm">确 定</el-button>
            </div>
        </el-dialog>

         <!--添加就业政策的弹出框 -->
        <el-dialog title="添加就业政策" :visible.sync="addFormVisible">
            <el-form :model="addForm">
                <el-form-item label="标题">
                    <el-input v-model="addForm.title" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="内容">
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
    </div>
</template>

<script>
export default {
    name: 'PolicyManage',
    data () {
        return {
            polices: null,
            editFormVisible: false,
            addFormVisible: false,
            formLabelWidth: '120px',
            editId: null,
             // 关于分页的设置
            setting: {
                pageSize: 5,
                total: null
            },
            // 临时变量
            temp: null,
            // 编辑表单的数据
            editForm: {
                title: '',
                content: ''
            },
            // 添加表单的数据
            addForm: {
                title: '',
                content: '',
                created_by: localStorage.getItem('id')
            },
        }
    },
    methods: {
        see: function(row) {
            this.$router.push('/policyment-detail/' + row.id);
        },
        edit: function(row) {
            this.editFormVisible = true;
            this.editId = row.id;
            this.$http.get('/api/employment_policy/' + row.id)
                .then(response => {
                    this.editForm = response[0];
                })
                .catch(error => {
                    this.$message({
                        type: 'error',
                        message: '预设表单失败了！'+ error.msg
                    });
                });
        },
        add: function() {
            this.addFormVisible = true;
        },
        handleCurrentChange: function(val) {
            if(val === 1) {
                this.polices = this.temp.slice(0, this.setting.pageSize);;
            }else {
                this.polices = this.temp.slice( this.setting.pageSize*(val-1) );
            }
        },
        submitEditForm: function() {
            this.$http.put('/api/employment_policy/' + this.editId, this.editForm)
                .then(response => {
                    location.reload();
                })
                .catch(error => {
                    this.$message({
                        type: 'error',
                        message: '更新就业政策失败了！'+ error.msg
                    });
                });
        },
        submitAddForm: function() {
            this.$http.post('/api/employment_policy', this.addForm)
                .then(response => {
                    location.reload();
                })
                .catch(error => {
                    this.$message({
                        type: 'error',
                        message: '添加就业政策失败了！' + error.msg
                    });
                });
        },
        deleteItem: function(row) {
            this.$http.delete('/api/employment_policy/' + row.id)
                .then(response => {
                    this.$message({
                        type: 'success',
                        message: '删除就业政策成功了！'
                    });
                    location.reload();
                })
                .catch(error => {
                    this.$message({
                        type: 'error',
                        message: '删除就业政策失败了！'+ error.msg
                    });
                })
        }
    },
    created() {
        this.$http.get('/api/employment_policy')
            .then(response => {
                this.polices = response;
                response.map((value, index) => {
                    value.created_at = this.formatTime(value.created_at);
                    value.content = this.formateStr(value.content, 30);
                });
                 // 初始化记录的总数目
                this.setting.total = this.polices.length;
                // 初始化临时变量
                this.temp = this.polices;
                // 初始化首页的显示记录
                this.handleCurrentChange(1);
            })
            .catch(error => {
                console.log('获取就业政策列表失败了:' + error);
            });

    }
}
</script>

<style scoped>
    .title {
        margin-top: -4px;
        margin-bottom: -4px;
    }
</style>

