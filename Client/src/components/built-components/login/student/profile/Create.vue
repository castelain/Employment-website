<template>
    <div>
        <div v-if="!hasResume">
            <my-title title="创建简历" class="title"></my-title>
            <el-form :model="form" label-width="100px" style="margin-top: 10%;" ref="form" :rules="rules">
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="form.email"></el-input>
                </el-form-item>
                <el-form-item label="电话号码" prop="telephone">
                    <el-input v-model="form.telephone"></el-input>
                </el-form-item>
                <el-row>
                    <el-col :span="12" prop="sex">
                        <el-form-item label="性别" class="left" prop="sex">
                            <el-select v-model="form.sex" placeholder="请选择">
                                <el-option
                                v-for="item in sexOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="民族" class="right" prop="nationality">
                            <el-select v-model="form.nationality" placeholder="请选择">
                                <el-option
                                v-for="item in nationalityOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="婚姻状态" class="left" prop="marry_status">
                            <el-select v-model="form.marry_status" placeholder="请选择">
                                <el-option
                                v-for="item in marryOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="政治面貌" class="right" prop="political_status">
                            <el-select v-model="form.political_status" placeholder="请选择">
                                <el-option
                                v-for="item in politicalOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item label="出生日期" prop="birthday">
                    <el-date-picker type="date"
                        placeholder="选择日期" 
                        v-model="form.birthday" 
                        style="width: 100%;"
                        format="yyyy 年 MM 月 dd 日"
                        value-format="timestamp">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="当前住址" prop="address">
                    <el-input v-model="form.address"></el-input>
                </el-form-item>
                <el-form-item label="期望工作">
                    <el-input
                        type="textarea"
                        :autosize="{ minRows: 2, maxRows: 4}"
                        placeholder="请输入内容"
                        v-model="form.will_jobs">
                    </el-input>
                </el-form-item>
                <el-form-item label="期望工作地点">
                    <el-input
                        type="textarea"
                        :autosize="{ minRows: 2, maxRows: 4}"
                        placeholder="请输入内容"
                        v-model="form.will_spots">
                    </el-input>
                </el-form-item>
                <el-form-item label="期望薪资">
                    <el-select v-model="form.will_salary" placeholder="请选择" class="left">
                        <el-option
                        v-for="item in salaryOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="个人技能">
                    <el-input
                        type="textarea"
                        :autosize="{ minRows: 2, maxRows: 4}"
                        placeholder="请输入内容"
                        v-model="form.skills">
                    </el-input>
                </el-form-item>
                <el-form-item label="获得荣耀">
                    <el-input
                        type="textarea"
                        :autosize="{ minRows: 2, maxRows: 4}"
                        placeholder="请输入内容"
                        v-model="form.awards">
                    </el-input>
                </el-form-item>
                <el-form-item label="工作/实习经历">
                    <el-input
                        type="textarea"
                        :autosize="{ minRows: 2, maxRows: 4}"
                        placeholder="请输入内容"
                        v-model="form.experiences">
                    </el-input>
                </el-form-item>
                <el-form-item label="自我评价">
                    <el-input
                        type="textarea"
                        :autosize="{ minRows: 2, maxRows: 4}"
                        placeholder="请输入内容"
                        v-model="form.introduction">
                    </el-input>
                </el-form-item>

            
                <el-form-item>
                    <el-button type="primary" @click="submit(form)">提交</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div v-else style="margin: 20% auto;">
            <h3>每个用户只能创建一份简历哦！</h3>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Create',
    data () {
        return {
            // 标识是否以及有简历了，若为true，则不可再创建简历
            hasResume: false,
            form: {
                student_id: localStorage.getItem('id'),
                email: '',
                sex: '',
                birthday: '',
                telephone: '',
                will_jobs: '',
                will_spots: '',
                will_salary: '',
                political_status: '',
                introduction: '',
                nationality: '',
                address: '',
                marry_status: '',
                awards: '',
                skills: '',
                experiences: '',   
            },
             // 表单验证规则
            rules: {
                email: [
                    { required: true, message: "请输入邮箱", trigger: "blur" },
                    { pattern: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/, message: "请输入正确的邮箱", trigger: "blur" }
                ],
                sex: [
                    { required: true, message: '请选择性别', trigger: "blur" }
                ],
                birthday: [
                    { required: true, message: '请选择生日', trigger: "blur" }
                ],
                telephone: [
                    { required: true, message: "请输入号码", trigger: "blur" },
                    { pattern: /^1[34578]\d{9}$/, message: "请输入正确的电话号码", trigger: "blur" }
                ],
                political_status: [
                    { required: true, message: "请选择政治面貌", trigger: "blur" }
                ],
                nationality: [
                    { required: true, message: "请选择民族", trigger: "blur" }
                ],
                address: [
                    { required: true, message: "请输入当前居住地", trigger: "blur" }
                ],
                marry_status: [
                    { required: true, message: "请选择婚姻状态", trigger: "blur" }
                ],
            },
            sexOptions: [
                {
                    value: 0,
                    label: '男'
                },
                {
                    value: 1,
                    label: '女'
                },
                {
                    value: 2,
                    label: '保密'
                }
            ],
            politicalOptions: [
                {
                    value: '中共党员',
                    label: '中共党员'
                },
                {
                    value: '共青团员',
                    label: '共青团员'
                },
                {
                    value: '群众',
                    label: '群众'
                },
                {
                    value: '其它',
                    label: '其它'
                }
            ],
            salaryOptions: [
                {
                    value: '4k-6k',
                    label: '4k-6k'
                },
                {
                    value: '7k-9k',
                    label: '7k-9k'
                },
                {
                    value: '9k-11k',
                    label: '9k-11k'
                },
                {
                    value: '11k以上',
                    label: '11k以上'
                }
            ],
            marryOptions: [
                {
                    value: 0,
                    label: '已婚',
                },
                {
                    value: 1,
                    label: '未婚',
                },
                {
                    value: 2,
                    label: '保密',
                }
            ],
            nationalityOptions: [
                {
                    value: '汉族',
                    label: '汉族'
                },
                {
                    value: '回族',
                    label: '回族'
                },
                {
                    value: '彝族',
                    label: '彝族'
                },
                {
                    value: '壮族',
                    label: '壮族'
                },
                {
                    value: '苗族',
                    label: '苗族'
                },
                // {
                //     value: '回族',
                //     label: '回族'
                // },
                {
                    value: '维吾尔族',
                    label: '维吾尔族'
                },
                {
                    value: '藏族',
                    label: '藏族'
                },
                {
                    value: '瑶族',
                    label: '瑶族'
                },
                {
                    value: '侗族',
                    label: '侗族'
                },
                {
                    value: '傣族',
                    label: '傣族'
                },
                {
                    value: '白族',
                    label: '白族'
                },
                {
                    value: '满族',
                    label: '满族'
                },
                {
                    value: '朝鲜族',
                    label: '朝鲜族'
                },
                {
                    value: '布依族',
                    label: '布依族'
                },
                {
                    value: '蒙古族',
                    label: '蒙古族'
                },
                {
                    value: '羌族',
                    label: '羌族'
                },
                {
                    value: '仫佬族',
                    label: '仫佬族'
                },
                {
                    value: '土族',
                    label: '土族'
                },
                {
                    value: '柯尔克孜族',
                    label: '柯尔克孜族'
                },
                {
                    value: '景颇族',
                    label: '景颇族'
                },
                {
                    value: '纳西族',
                    label: '纳西族'
                },
                {
                    value: '东乡族',
                    label: '东乡族'
                },
                {
                    value: '水族',
                    label: '水族'
                },
                {
                    value: '拉祜族',
                    label: '拉祜族'
                },
                {
                    value: '高山族',
                    label: '高山族'
                },
                {
                    value: '佤族',
                    label: '佤族'
                },
                {
                    value: '僳僳族',
                    label: '僳僳族'
                },
                {
                    value: '黎族',
                    label: '黎族'
                },
                {
                    value: '哈萨克族',
                    label: '哈萨克族'
                },
                {
                    value: '哈尼族',
                    label: '哈尼族'
                },
                {
                    value: '土家族',
                    label: '土家族'
                },
                // {
                //     value: '汉族',
                //     label: '汉族'
                // },
                // {
                //     value: '回族',
                //     label: '回族'
                // },
                // {
                //     value: '彝族',
                //     label: '彝族'
                // },
                // {
                //     value: '壮族',
                //     label: '壮族'
                // },
                // {
                //     value: '苗族',
                //     label: '苗族'
                // },
                // {
                //     value: '回族',
                //     label: '回族'
                // },
                // {
                //     value: '维吾尔族',
                //     label: '维吾尔族'
                // },
                // {
                //     value: '藏族',
                //     label: '藏族'
                // },
                // {
                //     value: '瑶族',
                //     label: '瑶族'
                // },
                // {
                //     value: '侗族',
                //     label: '侗族'
                // },
                // {
                //     value: '傣族',
                //     label: '傣族'
                // },
                // {
                //     value: '白族',
                //     label: '白族'
                // },
                // {
                //     value: '满族',
                //     label: '满族'
                // },
                // {
                //     value: '朝鲜族',
                //     label: '朝鲜族'
                // },
                // {
                //     value: '布依族',
                //     label: '布依族'
                // },
                // {
                //     value: '蒙古族',
                //     label: '蒙古族'
                // },
                // {
                //     value: '羌族',
                //     label: '羌族'
                // },
                // {
                //     value: '仫佬族',
                //     label: '仫佬族'
                // },
                // {
                //     value: '土族',
                //     label: '土族'
                // },
                // {
                //     value: '柯尔克孜族',
                //     label: '柯尔克孜族'
                // },
                // {
                //     value: '景颇族',
                //     label: '景颇族'
                // },
                // {
                //     value: '纳西族',
                //     label: '纳西族'
                // },
                // {
                //     value: '东乡族',
                //     label: '东乡族'
                // },
                // {
                //     value: '水族',
                //     label: '水族'
                // },
                // {
                //     value: '拉祜族',
                //     label: '拉祜族'
                // },
                // {
                //     value: '高山族',
                //     label: '高山族'
                // },
                // {
                //     value: '佤族',
                //     label: '佤族'
                // },
                // {
                //     value: '僳僳族',
                //     label: '僳僳族'
                // },
                // {
                //     value: '黎族',
                //     label: '黎族'
                // },
                // {
                //     value: '哈萨克族',
                //     label: '哈萨克族'
                // },
                // {
                //     value: '哈尼族',
                //     label: '哈尼族'
                // },
                // {
                //     value: '土家族',
                //     label: '土家族'
                // },
                // {
                //     value: '汉族',
                //     label: '汉族'
                // },
                // {
                //     value: '回族',
                //     label: '回族'
                // },
                // {
                //     value: '彝族',
                //     label: '彝族'
                // },
                // {
                //     value: '壮族',
                //     label: '壮族'
                // },
                // {
                //     value: '苗族',
                //     label: '苗族'
                // },
                // {
                //     value: '回族',
                //     label: '回族'
                // },
                // {
                //     value: '维吾尔族',
                //     label: '维吾尔族'
                // },
                // {
                //     value: '藏族',
                //     label: '藏族'
                // },
                // {
                //     value: '瑶族',
                //     label: '瑶族'
                // }
                {
                    value: '基诺族',
                    label: '基诺族'
                },
                {
                    value: '珞巴族',
                    label: '珞巴族'
                },
                {
                    value: '门巴族',
                    label: '门巴族'
                },
                {
                    value: '赫哲族',
                    label: '赫哲族'
                },
                {
                    value: '鄂伦春族',
                    label: '鄂伦春族'
                },
                {
                    value: '独龙族',
                    label: '独龙族'
                },
                {
                    value: '塔塔尔族',
                    label: '塔塔尔族'
                },
                {
                    value: '京族',
                    label: '京族'
                },
                {
                    value: '裕固族',
                    label: '裕固族'
                },
                {
                    value: '保安族',
                    label: '保安族'
                },
                {
                    value: '德昂族',
                    label: '德昂族'
                },
                {
                    value: '鄂温克族',
                    label: '鄂温克族'
                },
                {
                    value: '俄罗斯族',
                    label: '俄罗斯族'
                },
                {
                    value: '乌孜别克族',
                    label: '乌孜别克族'
                },
                {
                    value: '怒族',
                    label: '怒族'
                },
                {
                    value: '塔吉克族',
                    label: '塔吉克族'
                },
                {
                    value: '普米族',
                    label: '普米族'
                },
                {
                    value: '阿昌族',
                    label: '阿昌族'
                },
                {
                    value: '锡伯族',
                    label: '锡伯族'
                },
                {
                    value: '仡佬族',
                    label: '仡佬族'
                },
                {
                    value: '毛南族',
                    label: '毛南族'
                },
                {
                    value: '撒拉族',
                    label: '撒拉族'
                },
                {
                    value: '布朗族',
                    label: '布朗族'
                },
            ],
        }
    },
    created() {
        if(localStorage.getItem('resume_id')) {
            this.hasResume = true;
        }else {
            this.hasResume = false;
        }
    },
    methods: {
        submit: function(form) {
            this.$refs['form'].validate(valid => {
                if(valid) {
                    this.form.birthday = Number(this.form.birthday);
                    this.$http.post('/api/resume', this.form)
                        .then(response => {
                            this.$message({
                                type: 'success',
                                message: '创建简历成功了'
                            });
                            localStorage.setItem('resume_id', response.insertId);
                            this.$router.push('/student/see-profile');
                        })
                        .catch(error => {
                            this.$message({
                                type: 'danger',
                                message: '创建简历失败了' + error
                            });
                        });
                }else {
                    this.$message({
                        type: 'danger',
                        message: '创建简历失败了'
                    });
                }
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

