<template>
    <el-form :model="form" ref="form" :rules="rules">
        <el-form-item prop="name">
        <el-input v-model="form.name" placeholder="公司名称"></el-input>
        </el-form-item>
        <el-form-item prop="password">
            <el-input v-model="form.password" placeholder="密码" show-password></el-input>
        </el-form-item>

        <el-checkbox
        v-model="form.rememberPassword"
        label="记住密码"
        class="left"
        style="color: lightgray"
        ></el-checkbox>
        <a href="#" style="color: lightgray; font-size: 14px;" class="right">忘记密码</a>
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
        name: null,
        password: null,
        rememberPassword: null
      },
      // 表单验证规则
      rules: {
        name: [
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
              localStorage.setItem('password', this.form.password);
            }
            localStorage.setItem('phone', this.form.phone);
            localStorage.setItem('isLogined', true);
            this.$router.push('/');
          }else{
            this.$message({
              type: 'error',
              message: '提交表单失败：表单填写尚存在错误'
            })
          }
        })
    },
  },
  mounted() {
    let phone = localStorage.getItem('phone')
    let password = localStorage.getItem('password');
    if(phone && password){
      this.form.phone = phone;
      this.form.password = password;
    }
  },
}
</script>

<style scoped>
    .el-input {
        width: 160%;
        margin: 0 -30%;
    }
</style>
