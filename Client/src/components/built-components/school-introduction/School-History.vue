<template>
    <div>
        <my-title title="校史沿革" style="margin-top: 2%;"></my-title>
        <my-steps :steps="steps" style="margin: 10%; margin-bottom: 10%; margin-right: 10%;"></my-steps>
    </div>
</template>

<script>
export default {
    name: 'SchoolHistory',
    data () {
        return {
              // 校史沿革的数据
            steps: null
        }
    },
    created() {
        this.$http.get('/api/school_event')
            .then(response => {
                this.steps = response;
            })
            .catch(error => {
                console.log('获取最新通知列表失败了:' + error);
            });
    },
}
</script>

<style scoped>

</style>

