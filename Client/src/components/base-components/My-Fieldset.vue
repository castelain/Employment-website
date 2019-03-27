<template>
    <fieldset>
        <legend class="text-bold"> 
            <i class="el-icon-news"></i>
            {{ title }}
        </legend>
        <slot></slot>
    </fieldset>
</template>

<script>
export default {
    name: 'MyFieldset',
    props: [ 'title' ],
    data () {
        return {

        }
    }
}
</script>

<style scoped>
    fieldset {
        padding: 10% 10%;
        margin-bottom: 10%;
        border:1px solid rgba(0, 0, 0, .1);
    }
    legend {
        font-size: 20px;
        /* padding: 2%; */
    }
</style>
