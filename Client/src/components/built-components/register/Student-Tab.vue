<template>
    <div>
        <el-form :model="form" ref="form" :rules="rules">
            <el-form-item prop="name">
                <el-input v-model="form.name" placeholder="姓名"></el-input>
            </el-form-item>

            <el-form-item prop="nickname">
                <el-input v-model="form.nickname" placeholder="昵称"></el-input>
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
                name: null,
                nickname: null,
                password: null,
                password2: null,
                isAgree: false,
            },
        // 表单验证规则
            rules: {
                name: [
                        { required: true, message: "请输入姓名", trigger: "blur" },
                    ],
                nickname: [
                    { required: true, message: "请输入昵称", trigger: "blur" },
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
                            this.$router.push('/login');
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

