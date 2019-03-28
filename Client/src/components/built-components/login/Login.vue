<template>
  <my-row class="bg">
    <el-form>
      <router-link to="/">
        <img src="../../../assets/images/login/login-logo.png" alt="logo" class="logo">
      </router-link>
      <p class="title">登录云南大学就业信息网站</p>
      <el-tabs type="border-card">
        <el-tab-pane label="学生">
          <student-tab></student-tab>
        </el-tab-pane>
        <el-tab-pane label="企业">
          <company-tab></company-tab>
        </el-tab-pane>
        <el-tab-pane label="管理员">
          <administrator-tab></administrator-tab>
        </el-tab-pane>
      </el-tabs>
    </el-form>
  </my-row>
</template>

<script>
import StudentTab from '@/components/built-components/login/Student-Tab';
import CompanyTab from '@/components/built-components/login/Company-Tab';
import AdministratorTab from '@/components/built-components/login/Administrator-Tab';
export default {
  name: "Login",
  data() {
    return {

    }
  },
  components: {
    'student-tab': StudentTab,
    'company-tab': CompanyTab,
    'administrator-tab': AdministratorTab
  },
};
</script>

<style scoped>
.bg {
  background-image: url("../../../assets/images/register/register-background.jpg");
  background-position: top;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  margin: 0 auto;
  margin-top: -60px;
}
.el-form {
  width: 50%;
  background-color: rgba(255, 255, 255, 0.2);
  padding: 6%;
  margin: 5% auto;
}
.inline {
  display: inline-block;
}
.title {
  font-size: 20px;
  color: white;
  margin: 30px auto;
}
.logo {
  width: 26%;
}
</style>
