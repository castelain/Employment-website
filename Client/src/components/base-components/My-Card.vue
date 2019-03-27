<template>
    <el-card :body-style="{ padding: '5%' }" shadow="hover" class="text-left">
        <div slot="header">
            <slot name="title"></slot>
        </div>
        <div class="text-normal">
            <slot name="content"></slot>
        </div>
        <div class="text-info text-right">
            <slot name="info"></slot>
        </div>
    </el-card>
</template>

<script>
export default {
    name: 'MyCard',
    data () {
        return {

        }
    }
}
</script>

<style scoped>

</style>
