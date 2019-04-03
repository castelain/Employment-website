<template>
    <div>
        <my-title title="公司信息" class="title"></my-title>
        <div id="text-block" class="text-left">
            <el-row :gutter="20">
                <el-col :span="12">
                    <div>
                        <span>用户名：</span>
                        <span>{{ form.username }}</span>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div>
                        <span>公司名称：</span>
                        <span>{{ form.name }}</span>
                    </div>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="12">
                    <div>
                        <span>公司类型：</span>
                        <span>{{ form.kind }}</span>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div>
                        <span>公司地址：</span>
                        <span>{{ form.address }}</span>
                    </div>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="12">
                    <div>
                        <span>联系邮箱：</span>
                        <span>{{ form.email }}</span>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div>
                        <span>公司规模：</span>
                        <span>{{ form.scale }}</span>
                    </div>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="12">
                    <div>
                        <span>联系人：</span>
                        <span>{{ form.link_man }}</span>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div>
                        <span>联系人电话：</span>
                        <span>{{ form.link_man_tel }}</span>
                    </div>
                </el-col>
            </el-row>

            <el-dialog title="修改公司基本信息" :visible.sync="updateFormVisible">
                <el-form :model="updateForm" ref="updateForm" :rules="rules">
                    <el-form-item prop="username">
                        <el-input v-model="updateForm.username" placeholder="用户名"></el-input>
                    </el-form-item>
                    <el-form-item prop="name">
                        <el-input v-model="updateForm.name" placeholder="公司名称"></el-input>
                    </el-form-item>
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <el-select v-model="updateForm.kind" placeholder="请选择公司类别" multiple>
                                <el-option
                                    v-for="item in kindOptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">    
                                </el-option>
                            </el-select>
                        </el-col>
                        <el-col :span="12">
                            <el-select v-model="updateForm.scale" placeholder="请选择公司规模">
                                <el-option
                                    v-for="item in scaleOptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </el-col>
                    </el-row>
                    <el-form-item prop="address">
                        <el-input v-model="updateForm.address" placeholder="联系地址"></el-input>
                    </el-form-item>
                    <el-form-item prop="email">
                        <el-input v-model="updateForm.email" placeholder="联系邮箱"></el-input>
                    </el-form-item>
                    <el-form-item prop="link_man">
                        <el-input v-model="updateForm.link_man" placeholder="联系人"></el-input>
                    </el-form-item>
                    <el-form-item prop="link_man_tel">
                        <el-input v-model="updateForm.link_man_tel" placeholder="联系人电话"></el-input>
                    </el-form-item>
                </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="dialogFormVisible = false">取 消</el-button>
                        <el-button type="primary" @click="update">确 定</el-button>
                    </div>
            </el-dialog>
        </div>
        <el-form :model="updateForm" label-width="100px" style="margin-top: 10%;">
            <el-form-item>
                <el-button type="primary" @click="handleClick">修改信息</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    name: 'Information',
    data () {
        return {
            // 预设表单
            form: {},
            // 修改信息的表单
            updateForm: {},
            // 修改信息表单信息的显示与否
            updateFormVisible: false,
            formLabelWidth: 120,

            kindOptions: [ 
                { 
                    value: '国企',
                    label: '国企'
                },
                {
                    value: '私企',
                    label: '私企'
                },
                {
                    value: '民营',
                    label: '民营'
                },
                {
                    value: '上市',
                    label: '上市'
                },
                {
                    value: '其它',
                    label: '其它'
                }
            ],
            scaleOptions: [ 
                { 
                    value: '0-99人',
                    label: '0-99人'
                },
                {
                    value: '100-300人',
                    label: '100-300人'
                },
                {
                    value: '300-500人',
                    label: '300-500人'
                },
                {
                    value: '500-1000人',
                    label: '500-1000人'
                },
                {
                    value: '1000以上',
                    label: '1000以上'
                }
            ],
        // 表单验证规则
            rules: {
                username: [
                    { required: true, message: "请输入用户名", trigger: "blur" },
                ],
                name: [
                    { required: true, message: "请输入公司名称", trigger: "blur" },
                ],
                address: [
                    { required: true, message: "请输入联系地址", trigger: "blur" },
                ],
                email: [
                    { required: true, message: "请输入联系邮箱", trigger: "blur" },
                    { pattern: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/, message: "请输入正确的邮箱", trigger: "blur" }
                ],
                link_man: [
                    { required: true, message: "请输入联系人姓名", trigger: "blur" },
                ],
                link_man_tel: [
                    { required: true, message: "请输入联系人电话", trigger: "blur" },
                    { pattern: /^1[34578]\d{9}$/, message: "请输入正确的电话号码", trigger: "blur" }
                ],
                password: [
                    { required: true, message: "密码不可为空", trigger: "blur" }
                ],
                password2: [
                    { required: true, message: "确认密码不可为空", trigger: "blur" }
                ]
            },
        }
    },
    methods: {
        handleClick: function() {
            this.updateFormVisible = true;
        },
        update: function () {
            this.updateForm.kind = String(this.updateForm.kind);
            this.$http.put('/api/company/' + localStorage.getItem('id'), this.form)
                .then(response => {
                    // 更新信息后，重置token
                    let token = response.token;
                    console.log('更新信息后，重置token: ' + token);
                    localStorage.removeItem('token');
                    localStorage.setItem('token', token);
                    this.$message({
                        type: 'success',
                        message: '更新企业基本信息成功了！'
                    });
                    this.updateFormVisible = false;
                })
                .catch(error => {
                    this.$message({
                        type: 'error',
                        message: '更新企业基本信息失败了！' + error
                    });
                })
        }
    },
    created() {
        this.$http.get('/api/company/' + localStorage.getItem('id'))
        .then(response => {
            this.form = response[0];
            this.updateForm = response[0];
        })
        .catch(error => {
            console.log('预设公司信息失败了！' + error);
        })
    },
}
</script>

<style scoped>
    #text-block {
        background-color: rgba(92, 153, 240, 0.808);
        margin-top: -4%;
        margin-bottom: 4%;
        padding: 4% 8%;
        border: 4px dotted white;
        color: azure;
    }
    .title {
        margin-top: -2px;
        margin-bottom: 10%;
    }
    .el-select {
        margin-bottom: 10%;
    }
</style>

