<template>
    <el-form :model="form" class="demo-form-inline" label-width="100px" style="margin-top: 10%;">
        <el-form-item label="原密码">
            <el-input v-model="form.oldPassword" placeholder="请输入原来的密码" type="password"></el-input>
        </el-form-item>
        <el-form-item label="新密码">
            <el-input v-model="form.password" placeholder="请输入新的密码" type="password"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="update">确认修改</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
export default {
    name: 'UpdatePasswordAdmin',
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
            this.$http.get('/api/administrator/' + localStorage.getItem('id'))
                .then(response => {
                    if(response[0].password == this.form.oldPassword) {
                        this.$http.put('/api/administrator/' + localStorage.getItem('id'), this.form)
                            .then(response => {
                                this.$message({
                                    type: 'success',
                                    message: '管理员密码更新成功！'
                                });
                            })
                            .catch(error => {
                                this.$message({
                                    type: 'danger',
                                    message: '更新密码失败！'
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
                        message: '更新密码失败！' + error
                    });
                });
        }
    },
}
</script>

<style scoped>

</style>

