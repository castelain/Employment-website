<template>
    <el-container>
        <el-header height="">
            <!-- Header content -->
            <slot name="my-header"></slot>
        </el-header>
        <el-main height="500px">
            <!-- Main content -->
            <slot></slot>
        </el-main>
        <el-footer :height="bgHeight" class="text-info">
            <!-- Footer content -->
            <slot name="my-footer"></slot>
        </el-footer>
        
    </el-container>
    
</template>

<script>
export default {
    name: 'MyContainer',
    data () {
        return {
            bgHeight: document.body.clientWidth / 1440 * 650 + 'px',
        };
    },
    mounted() {
       window.onresize = function(){
           this.bgHeight = document.body.clientWidth / 1440 * 650 + 'px';
       } ;
    },
}
</script>

<style scoped>
    .el-header {
        margin-top: -50px;
    }
    .el-footer {
        position: fixed;
        bottom: 0;
    }
    .el-header, .el-footer, .el-main {
        padding: 0;
    }
</style>
