<template>
    <div>
        <my-title title="删除简历"></my-title>
        <el-card label-width="80px">
            <h3>
                你确定要删除你的简历吗？
                <b>该操作是不可逆的哦！</b>
            </h3>
            <el-form>
                <el-form-item>
                    <el-button type="danger" @click="deleteResume" style="margin-top: 6%; margin-left: -2%;">删除</el-button>
                </el-form-item>
            </el-form>
        </el-card>
        
    </div>
</template>

<script>
export default {
    name: 'Delete',
    data () {
        return {
        }
    },
    methods: {
        deleteResume: function() {
            this.$http.delete('/api/resume/' + localStorage.getItem('resume_id'))
                .then(response => {
                    this.$message({
                        type: 'success',
                        message: '删除简历成功了！'
                    })
                    .catch(error => {
                        this.$message({
                            type: 'danger',
                            message: '删除简历失败了：' + error
                        })
                    });
                })
        }
    },
}
</script>

<style scoped>

</style>

