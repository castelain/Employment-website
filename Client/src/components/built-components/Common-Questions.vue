<template>
    <my-container>
        <my-header slot="my-header" id="nav"></my-header>

        <my-row id="content"> 
            CommonQuestions
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

