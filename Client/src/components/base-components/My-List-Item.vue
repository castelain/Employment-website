<template>
    <div class="text-left">
        <router-link :to="{ path: '/notification-detail/' + item.id }">
            <p class="text-normal">{{ item.title }}</p>
            <p class="text-info">{{ item.content }}</p>
        </router-link>
    </div>
</template>

<script>
export default {
    name: 'MyListItem',
    props: [ 'item' ],
    data () {
        return {

        }
    }
}
</script>

<style scoped>
    div {
        /* border-bottom: 1px dotted rgba(0,0,0,.2); */
        margin-bottom: 6%;
    }
    a {
        text-decoration: none;
    }
    div :hover {
        background-color: lightskyblue;
        color: white;
    }
</style>
