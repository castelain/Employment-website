<template>
    <div class="patter">
        <el-row :gutter="10">
            <el-col :span="8" class="hidden-sm-and-down">
                <hr>
            </el-col>
            <el-col :span="8">
                <span class="title">{{ title }}</span>
            </el-col>
            <el-col :span="8" class="hidden-sm-and-down">
                <hr>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="9">&nbsp;</el-col>
            <el-col :span="6">
                <slot class="subTitle"></slot>
            </el-col>
            <el-col :span="9">&nbsp;</el-col>
        </el-row>
    </div>
</template>

<script>
import 'element-ui/lib/theme-chalk/display.css';
export default {
    name: 'My-Patter',
    props: [ 'title' ],
    data () {
        return {

        }
    }
}
</script>

<style scoped>
    .patter {
        margin-top: 10%;
        margin-bottom: 25px;
    }
    .title {
        font-size: 30px;
        color: rgb(67, 67, 67);
        text-align: center;
        display: block;
        margin-top: -20px;
        z-index: 20;
    }
    .sub-title {
        margin-top: 30px;
        margin-bottom: 30px;
        color: rgb(160, 160, 160);
    }
</style>
