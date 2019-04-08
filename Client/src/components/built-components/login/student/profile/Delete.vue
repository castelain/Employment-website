<template>
    <div>
        <div v-if="hasResume">
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
        <div v-else style="margin: 20% auto;">
            <h3>想删，没门！你还没有简历，快去创建一个吧！</h3>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Delete',
    data () {
        return {
            // 标识是否创建了奖励
            hasResume: true,
        }
    },
    methods: {
        deleteResume: function() {
            this.$http.delete('/api/resume/' + localStorage.getItem('resume_id'))
                .then(response => {
                    this.$message({
                        type: 'success',
                        message: '删除简历成功了！'
                    });
                    localStorage.removeItem('resume_id');
                    this.$router.push({path: '/student/create-profile'});
                })
                .catch(error => {
                    this.$message({
                        type: 'danger',
                        message: '删除简历失败了：' + error
                    });
                });
        }
    },
    created() {
        if(localStorage.getItem('resume_id')) {
            this.hasResume = true;
        }else {
            this.hasResume = false;
        }
    },
}
</script>

<style scoped>

</style>

