<template>
    <el-form :model="form" ref="form" :rules="rules">
        <el-form-item prop="username">
        <el-input v-model="form.username" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password">
            <el-input v-model="form.password" placeholder="密码" show-password></el-input>
        </el-form-item>

        <el-checkbox
        v-model="form.rememberPassword"
        label="记住密码"
        class="center"
        style="color: lightgray"
        ></el-checkbox>
        <!-- <a href="#" style="color: lightgray; font-size: 14px;" class="right">忘记密码</a> -->
        <el-form-item>
          <el-button type="success" @click="login(form)" style="margin-top: 5%;">登&nbsp;录</el-button>
        </el-form-item>
        <p>没有账号？
         <router-link to="/register" style="color: green;">注册</router-link>
        </p>
    </el-form>
</template>

<script>
export default {
    name: 'CompanyTab',
    data() {
    return {
      form: {
        username: null,
        password: null,
        rememberPassword: null
      },
      // 表单验证规则
      rules: {
        username: [
          { required: true, message: "请输入公司名称", trigger: "blur" },
        ], 
        password: [
          { required: true, message: "密码不可为空", trigger: "blur" }
        ],
      },
    };
  },
  methods: {
    login: function(form) {
        this.$refs['form'].validate((valid) => {
          if(valid) {
            if(this.form.rememberPassword){
              localStorage.setItem('username', this.form.username);
              localStorage.setItem('password', this.form.password);
            }
            let saltPassword = this.setMd5(this.form.password, 'jasmine');
            let data = {
              username: this.form.username,
              password: saltPassword,
              type: 1
            };
            this.$http.post('/api/company', data)
                .then((response) => {
                    localStorage.setItem('id', response[0].id);
                    localStorage.setItem('username', response[0].username);
                    localStorage.setItem('token', response[0].token);
                    localStorage.setItem('type', 1);
                    this.$router.push('/');
                })
                .catch((error => {
                  this.$message({
                    type: 'error',
                    message: '登录失败，请检查用户名密码后重试！'
                  });
                }));
          }else{
            this.$message({
              type: 'error',
              message: '提交表单失败：表单填写尚存在错误'
            });
          }
        });
    },
  },
  mounted() {
    let username = localStorage.getItem('username')
    let password = localStorage.getItem('password');
    if(username && password){
      this.form.username = username;
      this.form.password = password;
    }
  }
}
</script>

<style scoped>
    .el-input {
        width: 160%;
        margin: 0 -30%;
    }
</style>
