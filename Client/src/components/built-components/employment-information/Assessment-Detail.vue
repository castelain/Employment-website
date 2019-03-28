<template>
    <my-container>
        <my-header slot="my-header" id="nav"></my-header>

        <div id="content">
            <my-row>
                <my-inner-nav :navs="innerNavs"></my-inner-nav>
                <my-title :title="assessmentDetail.title"></my-title>
                <p class="text-left">{{ assessmentDetail.content }}</p>
            </my-row>
        </div>

        <my-footer slot="my-footer"></my-footer>
    </my-container>
</template>

<script>
export default {
    name: 'AssessmentDetail',
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
                    src: '/employment-information/career-assessment',
                    msg: '职业评测列表'
                },
                {
                    src: '#',
                    msg: '职业评测详情' 
                }
            ],
            assessmentDetail:  {
                    id: 1,
                    title: '霍兰德职业倾向测试大类解释',
                    content: '霍兰德职业兴趣自测（Self-Directed Search）是由美国职业指导专家霍兰德（John Holland）根据他本人大量的职业咨询经验及其职业类型理论编制的测评工具。霍兰德认为，个人职业兴趣特性与职业之间应有一种内在的对应关系。根据兴趣的不同，人格可分为研究型（I）、艺术型（A）、社会型（S）、企业型（E）、传统型（C）、现实型（R）六个维度，每个人的性格都是这六个维度的不同程度组合。霍兰德所划分的六大类型，并非是并列的、有着明晰的边界的。他以六边形标示出六大类型的关系。'
                },
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

</style>

