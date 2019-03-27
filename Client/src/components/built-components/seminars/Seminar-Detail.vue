<template>
    <my-container>
        <my-header slot="my-header" id="nav"></my-header>

        <div id="content">
            <my-row>
                <my-inner-nav :navs="innerNavs"></my-inner-nav>
                <my-title :title="seminarDetail.name"></my-title>
                <div id="text-block" class="text-left">
                    <div>
                        <span>企业名称：</span>
                        <span>{{ seminarDetail.company }}</span>
                    </div>
                    <div>
                        <span>企业主页：</span>
                        <span>{{ seminarDetail.homepage }}</span>
                    </div>
                    <div>
                        <span>举行时间：</span>
                        <span>{{ seminarDetail.holds_in }}</span>
                    </div>
                    <div>
                        <span>举办地点：</span>
                        <span>{{ seminarDetail.address }}</span>
                    </div>
                    <div>
                        <span>招聘专业：</span>
                        <span>{{ seminarDetail.majors }}</span>
                    </div>
                </div>
                <div>
                    <div class="text-left description-block">
                        <h3>一、企业简介</h3>
                        <p>{{ seminarDetail.company_description }}</p>
                    </div>
                    <div class="text-left description-block">
                        <h3>二、职位描述</h3>
                        <p>{{ seminarDetail.job_description }}</p>
                    </div>
                    <div class="text-left description-block">
                        <h3>三、薪酬描述</h3>
                        <p>{{ seminarDetail.salary_description }}</p>
                    </div>
                    <div class="text-left description-block">
                        <h3>四、应聘流程</h3>
                        <p>{{ seminarDetail.application_process }}</p>
                    </div>
                </div>
            </my-row>
        </div>

        <my-footer slot="my-footer"></my-footer>
    </my-container>
</template>

<script>
export default {
    name: 'SeminarDetail',
    data () {
        return {
            navHeight: null,
             // 内部导航数据
            innerNavs: [
                {
                    src: '/',
                    msg: '首页'
                },
                {
                    src: '/seminar-list',
                    msg: '校园宣讲会列表'
                },
                {
                    src: '#',
                    msg: '宣讲会详情' 
                }
            ],
            seminarDetail: {
                name: '宣讲会详情',
                company: '上海汉得公司',
                homepage: 'http://hand-china.com',
                holds_in: '2019-04-16 9:00',
                majors: '软件工程，数字媒体技术',
                address: '中山楼',
                company_description: ' 浙大网新集团是以产学研协同创新系统为依托，沿着主导产业核心技术发展路径，通过技术提升和商业模式创新，进行产业孵化和培育的高科技服务集团，秉持源自教育、投身科技、回报社会的理念，致力于成就更睿智健康的人类。网新集团成立于2001年，旗下拥有多家上市公司，其中浙大网新科技股份有限公司（上海证交所 600797）是全球知名的信息技术咨询与服务集团，中国领先的信息技术全案服务商；浙江众合科技股份有限公司（深交所000925）是中国领先的以自主信号系统为核心技术的轨道交通整体解决方案供应商，国内知名的基于专有技术产品的节能减排、环保产业营运商。',
                job_description: `一、优秀应届生-销售助理 8名
                                岗位职责：
                                1、协助销售经理开展区域内的市场开发、销售和客户关系维护工作；
                                2、项目信息收集、整理；
                                3、项目售前商务支持、报名及资料准备；
                                4、商务投标资格预审，完成资格预审文件。
                                 `,
                salary_description: '4000-6000',
                application_process: '递交个人简历（现场或电子邮箱）——企业查收简历并筛选——通知参加初试——通知参加复试——通知录用——携带入职材料报到——签约上岗试用期——参加试用期考核——通过考核后转正'

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
</style>

