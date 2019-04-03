<template>
    <div>
        <my-title title="更新密码" class="title"></my-title>
        <el-form :model="form" class="demo-form-inline" label-width="100px" style="margin-top: 10%;">
            <el-form-item label="原密码">
                <el-input v-model="form.oldPassword" placeholder="请输入原来的密码" type="password" show-password></el-input>
            </el-form-item>
            <el-form-item label="新密码">
                <el-input v-model="form.password" placeholder="请输入新的密码" type="password" show-password></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="update">确认修改</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    name: 'UpdatePasswordCompany',
    data () {
        return {
            form: {
                oldPassword: '',
                password: ''
            }
        }
    },
    methods: {
        update: function() {
            this.$http.get('/api/company/' + localStorage.getItem('id'))
                .then(response => {
                    if(response[0].password == this.form.oldPassword) {
                        this.$http.put('/api/company/' + localStorage.getItem('id'), this.form)
                            .then(response => {
                                // 更改密码后，重置token
                                let token = response.token;
                                localStorage.removeItem('token');
                                localStorage.setItem('token', token);
                                this.$message({
                                    type: 'success',
                                    message: '企业密码更新成功！'
                                });
                            })
                            .catch(error => {
                                this.$message({
                                    type: 'danger',
                                    message: '企业更新密码失败！'
                                });
                            });
                    }else {
                        this.$message({
                            type: 'danger',
                            message: '更新密码失败：原来的密码输入错误！'
                        });
                    }
                })
                .catch(error => {
                    this.$message({
                        type: 'danger',
                        message: '企业更新密码失败！' + error
                    });
                });
        }
    },
}
</script>

<style scoped>
    .title {
        margin-top: -4px;
        margin-bottom: -4px;
    }
</style>