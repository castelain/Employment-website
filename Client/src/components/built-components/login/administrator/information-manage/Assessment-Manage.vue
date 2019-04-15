<template>
    <div>
        <my-title title="管理职业评测" class="title"></my-title>
        <export-excel-2 :excelSetting="excelSetting" class="exportBtn right"></export-excel-2>
        <el-button @click="add" type="text">添加</el-button>
        <el-table
            :data="assessments"
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

        <!-- 编辑职业评测的弹出框 -->
        <el-dialog title="编辑职业评测" :visible.sync="editFormVisible">
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

         <!--添加职业评测的弹出框 -->
        <el-dialog title="添加职业评测" :visible.sync="addFormVisible">
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
import ExportExcel2 from '../../../../base-components/Export-Excel-2'
export default {
    name: 'AssessmentManage',
    data () {
        return {
            assessments: null,
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
            // 导出表格的设置
            excelSetting: {
                fileName: '职业评测统计表',
                tHeader: [ '标题', '内容', '发布日期' ],
                filterVal: [ 'title', 'content', 'created_at' ],
                list: [] 
            }
        }
    },
    components: {
        'export-excel-2': ExportExcel2
    },
    methods: {
        see: function(row) {
            this.$router.push('/assessment-detail/' + row.id);
        },
        edit: function(row) {
            this.editFormVisible = true;
            this.editId = row.id;
            this.$http.get('/api/career_assessment/' + row.id)
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
                this.assessments = this.temp.slice(0, this.setting.pageSize);;
            }else {
                this.assessments = this.temp.slice( this.setting.pageSize*(val-1) );
            }
        },
        submitEditForm: function() {
            this.$http.put('/api/career_assessment/' + this.editId, this.editForm)
                .then(response => {
                    location.reload();
                })
                .catch(error => {
                    this.$message({
                        type: 'error',
                        message: '更新职业评测失败了！'+ error.msg
                    });
                });
        },
        submitAddForm: function() {
            this.$http.post('/api/career_assessment', this.addForm)
                .then(response => {
                    location.reload();
                })
                .catch(error => {
                    this.$message({
                        type: 'error',
                        message: '添加职业评测失败了！' + error.msg
                    });
                });
        },
        deleteItem: function(row) {
            this.$http.delete('/api/career_assessment/' + row.id)
                .then(response => {
                    this.$message({
                        type: 'success',
                        message: '删除职业评测成功了！'
                    });
                    location.reload();
                })
                .catch(error => {
                    this.$message({
                        type: 'error',
                        message: '删除职业评测失败了！'+ error.msg
                    });
                })
        }
    },
    created() {
        this.$http.get('/api/career_assessment')
            .then(response => {
                this.assessments = response;
                response.map((value, index) => {
                    value.created_at = this.formatTime(value.created_at);
                    value.content = this.formateStr(value.content, 30);
                });
                 // 初始化记录的总数目
                this.setting.total = this.assessments.length;
                // 初始化临时变量
                this.temp = this.assessments;
                // 初始化首页的显示记录
                this.handleCurrentChange(1);
                // 初始化导出表格的数据
                this.excelSetting.list = this.temp;
            })
            .catch(error => {
                console.log('获取职业评测列表失败了:' + error);
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

