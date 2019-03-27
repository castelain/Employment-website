<template>
    <my-container>
        <my-header slot="my-header" id="nav"></my-header>

        <div id="content">
            <my-row>
                <my-inner-nav :navs="innerNavs"></my-inner-nav>
                <my-title :title="notificationDetail.title"></my-title>
                <p class="text-left">{{ notificationDetail.content }}</p>
            </my-row>
        </div>

        <my-footer slot="my-footer"></my-footer>
    </my-container>
</template>

<script>
export default {
    name: 'NotificationDetail',
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
                    src: '/notification-list',
                    msg: '最新通知列表'
                },
                {
                    src: '#',
                    msg: '最新通知详情' 
                }
            ],
            notificationDetail: {
                id: 1,
                title: '十九大召开',
                content: '本次大会主题是“不忘初心，牢记使命，高举中国特色社会主义伟大旗帜，决胜全面建成小康社会，夺取新时代中国特色社会主义伟大胜利，为实现中华民族伟大复兴的中国梦不懈奋斗”。中央邀请党内有关负责同志和部分党外人士列席大会。列席大会的有：不是十九大代表的十八届中央委员会委员、候补委员和中央纪律检查委员会委员，不是十九大代表、特邀代表的原中央顾问委员会委员，以及其他有关同志，共405人。作为来宾列席大会开幕会和闭幕会的有：现任和曾任全国人大常委会副委员长、全国政协副主席的党外人士，在京各民主党派中央、全国工商联副主席，无党派代表人士，宗教界代表人士，在京全国人大、全国政协常委中的民主党派、无党派和民族宗教界人士，共149人。'
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

</style>

