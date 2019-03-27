<template>
    <h2>{{ title }}</h2>
</template>

<script>
export default {
    name: 'MyTitle',
    props: [ 'title' ],
    data () {
        return {

        }
    }
}
</script>

<style scoped>
    h2 {
        margin: 6% auto;
    }
</style>
