<template>
    <my-container>
        <my-header slot="my-header" id="nav"></my-header>

        <div id="content">
            <my-banner :banners="banners"></my-banner>
            <my-row class="top">
                <el-tabs v-model="activeTab"
                    type="border-card" tab-position="left" @tab-click="handleSelect">
                    <el-tab-pane 
                        key="0"
                        :label = "tabs[0]"
                        name="0">
                        <employment-policy></employment-policy>
                    </el-tab-pane>
                    <el-tab-pane 
                        key="1"
                        :label = "tabs[1]"
                        name="1">
                        <career-assessment></career-assessment>
                    </el-tab-pane>
                </el-tabs>
            </my-row>
        </div>

        <my-footer slot="my-footer"></my-footer>
    </my-container>
</template>

<script>
import EmploymentPolicy from '@/components/built-components/employment-information/Employment-Policy'
import CareerAssessment from '@/components/built-components/employment-information/Career-Assessment'
export default {
    name: 'EmploymentInformation',
    data () {
        return {
             // 导航栏的高度
            navHeight: null,
            // banner数据
            banners: [
                {
                    src: require('../../../assets/images/employment-information/就业信息banner-1.jpg'),
                    msg: 'banner1'
                },
                {
                    src: require('../../../assets/images/employment-information/就业信息banner-2.jpg'),
                    msg: 'banner2'
                },
                {
                    src: require('../../../assets/images/employment-information/就业信息banner-3.jpg'),
                    msg: 'banner3'
                },
            ],
            // 侧边导航的数据
            activeTab: '0',
            tabs: [ '就业政策', '职业评测' ],
        }
    },
    components: {
        'employment-policy': EmploymentPolicy,
        'career-assessment': CareerAssessment
    },
    mounted() {
        let nav = document.getElementById('nav');
        this.navHeight = window.getComputedStyle(nav).height;
        document.getElementById('content').style.marginTop = this.navHeight;

        let routeName = this.$route.name;
        if(routeName === 'career-assessment'){
            this.activeTab = '1';
        }else if(routeName === 'employment-policy'){
            this.activeTab = '0';
        }     
    },
    methods: {
        handleSelect: function(tab, event){
            if(tab.name === '0'){
                this.$router.push({ name: 'employment-policy' })
            }else if(tab.name === '1'){
                this.$router.push({ name: 'career-assessment' })
            }
        }
    },
}
</script>

<style scoped>

</style>

