<template>
    <div>
        <el-form :model="form" ref="form" :rules="rules">
            <el-form-item prop="username">
                <el-input v-model="form.username" placeholder="用户名"></el-input>
            </el-form-item>

            <el-form-item prop="name">
                <el-input v-model="form.name" placeholder="公司名称"></el-input>
            </el-form-item>

            <el-row :gutter="20">
                <el-col :span="12">
                    <el-select v-model="form.kind" placeholder="请选择公司类别" multiple>
                        <el-option
                            v-for="item in kindOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">    
                        </el-option>
                    </el-select>
                </el-col>

                <el-col :span="12">
                    <el-select v-model="form.scale" placeholder="请选择公司规模">
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
                <el-input v-model="form.address" placeholder="联系地址"></el-input>
            </el-form-item>

            <el-form-item prop="email">
                <el-input v-model="form.email" placeholder="联系邮箱"></el-input>
            </el-form-item>

            <el-form-item prop="link_man">
                <el-input v-model="form.link_man" placeholder="联系人"></el-input>
            </el-form-item>

            <el-form-item prop="link_man_tel">
                <el-input v-model="form.link_man_tel" placeholder="联系人电话"></el-input>
            </el-form-item>

            <el-form-item prop="password">
                <el-input v-model="form.password" placeholder="设置密码" show-password></el-input>
            </el-form-item>
            <el-form-item prop="password2">
                <el-input v-model="form.password2" placeholder="确认密码" show-password></el-input>
            </el-form-item>

            <el-checkbox
                v-model="form.isAgree"
                label="我已阅读并同意《服务协议》"
                class="left"
                style="color: lightgrey;"
            ></el-checkbox>

            <el-form-item>
                <el-button type="primary" @click="register(form)">注&nbsp;册</el-button>
            </el-form-item>
        </el-form>

        <p>已有账号？
            <router-link to="/login" style="color: green;">登录</router-link>
        </p>
    </div>
</template>

<script>
export default {
    name: 'CompanyTab',
    data () {
        return {
            form: {
                username: null,
                name: null,
                kind: [],
                address: null,
                scale: null,
                email: null,
                link_man: null,
                link_man_tel: null,
                password: null,
                password2: null,
                isAgree: false,
            },
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
        register: function(form) {
            if(!this.form.isAgree){
                this.$message({
                    type: 'warning',
                    message: '注册需同意《服务协议》'
                });
            }else{
                this.$refs['form'].validate((valid) => {
                    if(valid) {
                        if(this.form.password === this.form.password2){
                            this.$http.post('/api/company', this.form)
                                .then((response) => {
                                    localStorage.setItem('token', response.token);
                                    this.$router.push('/login');
                                })
                                .catch((error) => {
                                    this.$message({
                                        type: 'error',
                                        message: '注册信息提交失败！'
                                    });
                                });
                        }else{
                            this.$message({
                                type: 'error',
                                message: '表单提交失败：前后两次输入的密码不一致'
                            });
                        }
                    }else{
                        this.$message({
                            type: 'error',
                            message: '表单提交失败：注册数据中尚存在错误'
                        })
                    }
                });
            }
        },
    }
}
</script>

<style scoped>
    .el-select {
        margin-bottom: 5%;
    }
</style>

