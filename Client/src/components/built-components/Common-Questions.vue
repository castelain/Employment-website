<template>
    <my-container>
        <my-header slot="my-header" id="nav"></my-header>

        <single-banner :img="banner" id="content"></single-banner>

        <my-row  style="margin-bottom: 4%;">
            <div>
                <my-title title="常见问题"></my-title>
                <el-collapse accordion>
                    <el-collapse-item v-for="(item, index) in questions" :key="index">
                        <template slot="title">
                            <i class="header-icon el-icon-question"></i>
                            <h3>&nbsp;&nbsp;&nbsp;&nbsp;{{ item.question }}</h3>
                        </template>
                        <div style="padding-left: 3%; padding-right: 30%;" class="text-left">{{ item.answer }}</div>
                    </el-collapse-item>
                    </el-collapse>
            </div>
            <div>
                <my-title :title="contact.title"></my-title>
                <el-row :gutter="80">
                    <el-col :span="16">
                        <img :src="contact.mapSrc" alt="map">
                    </el-col>
                    <el-col :span="8" id="contact">
                        <p>
                            <span class="light">本部地址：&nbsp; </span>
                            <span>{{ contact.address }}</span>
                        </p>
                        <p>
                            <span class="light">联系电话：&nbsp; </span>
                            <span>{{ contact.phone }}</span>
                        </p>
                        <p>
                            <span class="light">电子邮箱：&nbsp; </span>
                            <span>{{ contact.email }}</span>
                        </p>
                    </el-col>
                </el-row>
            </div>
        </my-row>


        <my-footer slot="my-footer"></my-footer>
    </my-container>
</template>

<script>
export default {
    name: 'CommonQuestions',
    data () {
        return {
            // 导航栏的高度
            navHeight: null,
            // banner图数据
            banner: {
                src: require('../../assets/images/about-us/banner.jpg'),
                msg: '常见问题 banner',
                detailPath: '#'
            },
            // 常见问题的数据
            questions: [
                {
                    question: '简历只能创建一个吗？(学生)',
                    answer: '是的，目前只支持注册的学生创建一个简历！'
                },
                {
                    question: '我提交的宣讲会申请，什么时候能在系统上看到呢？（企业）',
                    answer: '当宣讲会申请被成功提交之后，管理员会在1-2个工作日进行审核。当审核通过之后，您提交的宣讲会信息就会在系统上显示了！您可以在个人中心处，查看到宣讲会的审核状态。'
                }
            ],
            // 联系我们数据
            contact: {
                title: '联系我们',
                address: '云南大学呈贡校区',
                phone: '15912143364',
                email: 'lenmontree@qq.com',
                mapSrc: require('../../assets/images/about-us/map.jpg')
            }
        }
    },
    mounted() {
        let nav = document.getElementById('nav');
        this.navHeight = window.getComputedStyle(nav).height;
        document.getElementById('content').style.marginTop = this.navHeight;
    },
}
</script>

<style scoped>
    .info {
        font-size: 16px;
        color: rgb(67, 67, 67);
        margin-top: 50px;
    }
    #contact {
        text-align: left;
        margin-top: 10%;
    }
    #contact > p {
        margin-bottom: 20px;
    }
    .light {
        color: rgb(102, 102, 102);
    }
    img {
        width: 100%;
    }
    .info[data-v-526718c2]  {
        text-align: center !important;
    }
</style>
