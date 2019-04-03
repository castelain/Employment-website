<template>
    <div>
        <div v-if="hasResume">
            <my-title title="简历详情" class="title"></my-title>
            <div id="text-block" class="text-left">
                <el-row :gutter="20">
                    <el-col :span="12">
                        <div>
                            <span>姓名：</span>
                            <span>{{ form.realname }}</span>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div>
                            <span>民族：</span>
                            <span>{{ form.nationality }}</span>
                        </div>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <div>
                            <span>联系电话：</span>
                            <span>{{ form.telephone }}</span>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div>
                            <span>联系邮箱：</span>
                            <span>{{ form.email }}</span>
                        </div>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <div>
                            <span>学院：</span>
                            <span>{{ form.college }}</span>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div>
                            <span>专业：</span>
                            <span>{{ form.major }}</span>
                        </div>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <div>
                            <span>性别：</span>
                            <span>{{ form.sex | formatSex }}</span>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div>
                            <span>婚姻状况：</span>
                            <span>{{ form.marry_status | formatPoliticalStatus }}</span>
                        </div>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <div>
                            <span>政治面貌：</span>
                            <span>{{ form.political_status }}</span>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div>
                            <span>当前住址：</span>
                            <span>{{ form.address }}</span>
                        </div>
                    </el-col>
                </el-row>
                <hr>
                <el-row :gutter="20">
                    <el-col :span="8">
                        <div>
                            <span>期望职位：</span>
                            <span>{{ form.will_jobs }}</span>
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div>
                            <span>期望工作地点：</span>
                            <span>{{ form.will_spots }}</span>
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div>
                            <span>期望薪资：</span>
                            <span>{{ form.will_salary }}</span>
                        </div>
                    </el-col>
                </el-row>
            </div>
            <div style="padding-left: 6%;">
                <div class="text-left description-block" v-if="form.awards">
                    <h3><i class="el-icon-info"></i>&nbsp;&nbsp;&nbsp;&nbsp;获得奖项</h3>
                    <p>{{ form.awards }}</p>
                </div>
                <div class="text-left description-block" v-if="form.skills">
                    <h3><i class="el-icon-info"></i>&nbsp;&nbsp;&nbsp;&nbsp;个人技能</h3>
                    <p>{{ form.skills }}</p>
                </div>
                <div class="text-left description-block" v-if="form.experiences">
                    <h3><i class="el-icon-info"></i>&nbsp;&nbsp;&nbsp;&nbsp;实习/学校/工作经历</h3>
                    <p>{{ form.experiences }}</p>
                </div>
                <div class="text-left description-block" v-if="form.introduction">
                    <h3><i class="el-icon-info"></i>&nbsp;&nbsp;&nbsp;&nbsp;自我评价</h3>
                    <p>{{ form.introduction }}</p>
                </div>
            </div>
        </div>
        <div v-else style="margin: 20% auto;">
            <h3>你还没有简历，快去创建一个吧！</h3>
        </div>
    </div>
</template>

<script>
export default {
    name: 'See',
    data () {
        return {
            // 标识是否创建了奖励
            hasResume: true,
            form: {}
        }
    },
    created() {
        let resume_id = localStorage.getItem('resume_id') | this.$route.params.id;
        if(localStorage.getItem('resume_id')) {
            this.hasResume = true;
            this.$http.get('/api/resume/' + resume_id)
            .then(response => {
                this.form = response[0];
            })
            .catch(error => {
                console.log('预设简历表单失败了！' + error);
            })
        }else {
            this.hasResume = false;
        }
    },
}
</script>

<style scoped>
    #text-block {
        background-color: rgba(92, 153, 240, 0.808);
        margin-top: -4%;
        margin-bottom: 4%;
        padding: 4% 8%;
        border: 4px dotted white;
        color: azure;
    }
    .description-block {
        margin-bottom: 5%;
    }
    .description-block > h3 {
        margin-bottom: 2%;
    }
    .title {
        margin-top: -2px;
    }
    hr {
        margin: 4% auto;
        height: .1px;
    }
</style>

