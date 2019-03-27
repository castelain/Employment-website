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
                        <school-history></school-history>
                    </el-tab-pane>
                    <el-tab-pane 
                        key="1"
                        :label = "tabs[1]"
                        name="1">
                        <major-introduction></major-introduction>
                    </el-tab-pane>
                </el-tabs>
            </my-row>
        </div>

        <my-footer slot="my-footer"></my-footer>
    </my-container>
</template>

<script>
import SchoolHistory from '@/components/built-components/school-introduction/School-History'
import MajorIntroduction from '@/components/built-components/school-introduction/Major-Introduction'
export default {
    name: 'SchoolIntroduction',
    data () {
        return {
             // 导航栏的高度
            navHeight: null,
            // banner数据
            banners: [
                {
                    src: require('../../../assets/images/homepage/Dew_by_Aaron_Burden.jpg'),
                    msg: 'banner1'
                },
                {
                    src: require('../../../assets/images/homepage/Early_Spring_Memory2.jpg'),
                    msg: 'banner2'
                },
                {
                    src: require('../../../assets/images/homepage/Flower_by_Dominik_Scythe.jpg'),
                    msg: 'banner3'
                },
            ],
            // 侧边导航的数据
            activeTab: '0',
            tabs: [ '校史沿革', '专业简介' ],
        }
    },
    components: {
        'school-history': SchoolHistory,
        'major-introduction': MajorIntroduction
    },
    mounted() {
        let nav = document.getElementById('nav');
        this.navHeight = window.getComputedStyle(nav).height;
        document.getElementById('content').style.marginTop = this.navHeight;

        let routeName = this.$route.name;
        if(routeName === 'major-introduction'){
            this.activeTab = '1';
        }else if(routeName === 'school-history'){
            this.activeTab = '0';
        }     
    },
    methods: {
        handleSelect: function(tab, event){
            if(tab.name === '0'){
                this.$router.push({ name: 'school-history' })
            }else if(tab.name === '1'){
                this.$router.push({ name: 'major-introduction' })
            }
        }
    },
}
</script>

<style scoped>

</style>

