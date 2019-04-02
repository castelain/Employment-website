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
            policyDetail: {}
        }
    },
    mounted() {
        let nav = document.getElementById('nav');
        this.navHeight = window.getComputedStyle(nav).height;
        document.getElementById('content').style.marginTop = this.navHeight;
    },
    created() {
        this.$http.get('/api/employment_policy/')
            .then(response => {
                this.policyDetail = response[0];
            })
            .catch(error => {
                console.log('获取就业政策的详情失败了：' + error);
            });
    },
}
</script>

<style scoped>

</style>

