<template>
    <my-container>
        <my-header slot="my-header" id="nav"></my-header>

        <div id="content">
            <my-row>
                <my-inner-nav :navs="innerNavs"></my-inner-nav>
                <my-title :title="policyDetail.title"></my-title>
                <p class="text-left">{{ policyDetail.content }}</p>
            </my-row>
        </div>

        <my-footer slot="my-footer"></my-footer>
    </my-container>
</template>

<script>
export default {
    name: 'PolicyDetail',
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
                    src: '/employment-information/employment-policy',
                    msg: '就业政策列表'
                },
                {
                    src: '#',
                    msg: '就业政策详情' 
                }
            ],
            policyDetail:  {
                    id: 1,
                    title: '云南省促进高校毕业生就业创业政策100问',
                    content: '党的十八届三中、四中全会提出，推动实现更高质量就业。省委、省政府高度重视高校毕业生就业工作，出台了一系列促进高校毕业生就业创业的政策措施，特别是2013年、2014年分别出台了《关于进一步加强普通高等学校毕业生就业工作的通知》（云政办发〔2013〕74号）和《云南省人民政府办公厅关于进一步做好普通高等学校毕业生就业创业工作的通知》（云政办发〔2014〕30号），进一步细化和完善了毕业生就业创业政策。省委高校工委、省教育厅和高校积极开展云南青年志在四方宣传教育活动，拓展就业创业渠道，搭建就业创业平台，促进高校毕业生更加充分、更高质量的就业。为使高校毕业生进一步掌握就业创业的相关政策，我们把近年来国家和省涉及高校毕业生就业创业的相关政策汇编成册，为全省广大高校毕业生提供就业创业指导与服务。在编写过程中，我们力求从政策性、实用性入手，根据相关政策，编印了与大学生就业创业密切相关的内容，主要涉及到基层就业、自主创业、应征入伍、科研助理等方面的政策规定，同时附有涉及问答内容相关文件名称，以便查询，相关政策如有变动的，请以正式文件为准。希望这本小册子能给广大高校毕业生就业创业提供帮助和政策指导。'
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

