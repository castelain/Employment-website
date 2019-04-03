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
                <el-button type="danger" @click="deleteSeminar(scope.row)" plain size="small">删除</el-button>
            </template>
            </el-table-column>
        </el-table>

        <!--添加宣讲会的弹出框 -->
        <el-dialog title="申请宣讲会" :visible.sync="addFormVisible">
            <el-form :model="addForm">
                <el-form-item label="招聘专业">
                    <el-input v-model="addForm.majors">
                    </el-input>
                </el-form-item>
                <el-row>
                    <el-col :span="12">
                         <el-form-item label="举办时间" prop="holds_in">
                            <el-date-picker type="datetime"
                                placeholder="选择时间" 
                                v-model="addForm.holds_in" 
                                style="width: 100%;"
                                format="yyyy 年 MM 月 dd 日 HH:mm:ss"
                                value-format="timestamp">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="举办地址" class="right" prop="address">
                            <el-select v-model="addForm.address" placeholder="请选择">
                                <el-option
                                    v-for="item in addressOptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item label="公司介绍">
                    <el-input
                        type="textarea"
                        :autosize="{ minRows: 2, maxRows: 4}"
                        placeholder="请输入内容"
                        v-model="addForm.company_description">
                    </el-input>
                </el-form-item>
                 <el-form-item label="工作职责">
                    <el-input
                        type="textarea"
                        :autosize="{ minRows: 2, maxRows: 4}"
                        placeholder="请输入内容"
                        v-model="addForm.job_description">
                    </el-input>
                </el-form-item>
                 <el-form-item label="薪资待遇">
                    <el-input
                        type="textarea"
                        :autosize="{ minRows: 2, maxRows: 4}"
                        placeholder="请输入内容"
                        v-model="addForm.salary_description">
                    </el-input>
                </el-form-item>
                 <el-form-item label="应聘流程">
                    <el-input
                        type="textarea"
                        :autosize="{ minRows: 2, maxRows: 4}"
                        placeholder="请输入内容"
                        v-model="addForm.application_process">
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
            addressOptions: [
                {
                    value: '楠苑综合楼二楼报告厅',
                    lalel: '楠苑综合楼二楼报告厅'
                },
                {
                    value: '中山邦翰楼1楼报告厅',
                    lalel: '中山邦翰楼1楼报告厅'
                },
                {
                    value: '软件学院二楼报告厅',
                    lalel: '软件学院二楼报告厅'
                },
                {
                    value: '信息学院二楼报告厅',
                    lalel: '信息学院二楼报告厅'
                },
                {
                    value: '马克思主义学院1楼报告厅',
                    lalel: '马克思主义学院1楼报告厅'
                },
            ],
            // 添加表单的数据
            addForm: {
                company_id: localStorage.getItem('id'),
                holds_in: null,
                address: '',
                majors: '',
                company_description: '',
                job_description: '',
                salary_description: '',
                application_process: ''
            },
                         // 表单验证规则
            rules: {
                holds_in: [
                    { required: true, message: '请选择举办日期', trigger: "blur" }
                ],
                address: [
                    { required: true, message: '请选择举办地点', trigger: "blur" }
                ]
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
        deleteSeminar: function(row) {
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
            this.$http.post('/api/seminar', this.addForm)
                .then(response => {
                    this.$message({
                        type: 'success',
                        message: '添加宣讲会成功了！'
                    });
                    this.addFormVisible = false;
                    // location.reload();
                })
                .catch(error => {
                    this.$message({
                        type: 'error',
                        message: '添加宣讲会失败了！' + error.msg
                    });
                    this.addFormVisible = false;
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

</style>

