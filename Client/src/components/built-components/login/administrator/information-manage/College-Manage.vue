<template>
    <div>
        <my-title title="管理专业简介" class="title"></my-title>
        <el-button @click="add" type="text">添加</el-button>
        <el-table
            :data="collegs"
            stripe border
            style="width: 100%">
            <el-table-column
                prop="created_at"
                label="创建日期"
                width="100">
            </el-table-column>
            <el-table-column
                prop="title"
                label="学院"
                width="100">
            </el-table-column>
            <el-table-column
                prop="majors"
                label="专业"
                width="180">
            </el-table-column>
            <el-table-column
                prop="content"
                label="简介"
                width="180">
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

        <!-- 编辑专业简介的弹出框 -->
        <el-dialog title="编辑专业简介" :visible.sync="editFormVisible">
            <el-form :model="editForm">
                <el-form-item label="学院">
                    <el-input v-model="editForm.title" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="专业">
                    <el-input v-model="editForm.majors" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="简介">
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

         <!--添加专业简介的弹出框 -->
        <el-dialog title="添加专业简介" :visible.sync="addFormVisible">
            <el-form :model="addForm">
                <el-form-item label="学院">
                    <el-input v-model="addForm.title" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="专业">
                    <el-input v-model="editForm.majors" autocomplete="off"></el-input>
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
    </div>
</template>

<script>
export default {
    name: 'CollegeManage',
    data () {
        return {
            collegs: null,
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
                majors: '',
                content: ''
            },
            // 添加表单的数据
            addForm: {
                title: '',
                majors: '',
                content: ''
            },
        }
    },
    methods: {
        see: function(row) {
            this.$router.push('/major-detail/' + row.id);
        },
        edit: function(row) {
            this.editFormVisible = true;
            this.editId = row.id;
            this.$http.get('/api/school_college/' + row.id)
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
                this.collegs = this.temp.slice(0, this.setting.pageSize);;
            }else {
                this.collegs = this.temp.slice( this.setting.pageSize*(val-1) );
            }
        },
        submitEditForm: function() {
            this.$http.put('/api/school_college/' + this.editId, this.editForm)
                .then(response => {
                    location.reload();
                })
                .catch(error => {
                    this.$message({
                        type: 'error',
                        message: '更新专业简介失败了！'+ error.msg
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
                        message: '添加专业简介失败了！' + error.msg
                    });
                });
        },
        deleteItem: function(row) {
            this.$http.delete('/api/school_college/' + row.id)
                .then(response => {
                    this.$message({
                        type: 'success',
                        message: '删除专业简介成功了！'
                    });
                    location.reload();
                })
                .catch(error => {
                    this.$message({
                        type: 'error',
                        message: '删除专业简介失败了！'+ error.msg
                    });
                })
        }
    },
    created() {
        this.$http.get('/api/school_college')
            .then(response => {
                this.collegs = response;
                response.map((value, index) => {
                    value.created_at = this.formatTime(value.created_at);
                    value.content = this.formateStr(value.content, 30);
                });
                 // 初始化记录的总数目
                this.setting.total = this.collegs.length;
                // 初始化临时变量
                this.temp = this.collegs;
                // 初始化首页的显示记录
                this.handleCurrentChange(1);
            })
            .catch(error => {
                console.log('获取专业简介列表失败了:' + error);
            });

    },
}
</script>

<style scoped>
    .title {
        margin-top: -4px;
        margin-bottom: -4px;
    }
</style>

