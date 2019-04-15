<template>
    <div>
        <el-form :model="form" ref="form" :rules="rules">
            <el-form-item prop="username">
                <el-input v-model="form.username" placeholder="用户名"></el-input>
            </el-form-item>

            <el-form-item prop="realname">
                <el-input v-model="form.realname" placeholder="真实姓名"></el-input>
            </el-form-item>

            <el-form-item prop="school">
                <el-input v-model="form.school" placeholder="学校"></el-input>
            </el-form-item>

            <el-form-item prop="college">
                <el-input v-model="form.college" placeholder="学院"></el-input>
            </el-form-item>

            <el-form-item prop="major">
                <el-input v-model="form.major" placeholder="专业"></el-input>
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
    name: 'StudentTab',
    data () {
        return {
            form: {
                username: null,
                realname: null,
                school: null,
                college: null,
                major: null,
                password: null,
                password2: null,
                isAgree: false,
            },
        // 表单验证规则
            rules: {
                username: [
                    { required: true, message: "请输入用户名", trigger: "blur" },
                ],
                realname: [
                    { required: true, message: "请输入真实姓名", trigger: "blur" },
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
                            let saltPassword = this.setMd5(this.form.password, 'jasmine');
                            this.form.password = saltPassword;
                            this.$http.post('/api/student', this.form)
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

</style>

