<template>
    <div>
        <my-title title="校史沿革" style="margin-top: 2%;"></my-title>
        <my-steps :steps="steps" style="margin-left: 40%;"></my-steps>
    </div>
</template>

<script>
export default {
    name: 'SchoolHistory',
    data () {
        return {
              // 校史沿革的数据
            steps: [
                {
                    title: '1996年',
                    content: 'birthday'
                },
                {
                    title: '2001年',
                    content: '滴水成冰'
                },
                {
                    title: '2004年',
                    content: '看错课表'
                }
            ]
        }
    }
}
</script>

<style scoped>

</style>

