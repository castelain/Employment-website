<template>
    <el-steps direction="vertical" :active="6" align-center>
        <el-step v-for="(item, index) in steps"
            :key="index"
            :title="item.title"
            :description="item.content"
            >
        </el-step>
    </el-steps>
    
    
</template>

<script>
export default {
    name: 'MySteps',
    props: [ 'steps' ],
    data () {
        return {
            
        }
    }
}
</script>

<style scoped>

</style>
