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
            bgHeight: Number(window.innerHeight) * 0.3 + 'px'
        }
    },
   
}
</script>

<style scoped>
    .el-header {
        margin-top: -50px;
    }
    .el-footer {
        width: 100%;
        height: 50px;
        background-color: #bbbbbb;
        margin-top: 6%;
    }
    .el-header, .el-footer, .el-main {
        padding: 0;
    }
</style>
