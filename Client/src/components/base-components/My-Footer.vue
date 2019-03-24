<template>
    <div>
        <my-row>
            <ul class="text-info">
                <li v-for="(msg, index) in msgs" :key="index">
                    {{ msg }}
                </li>
            </ul>
        </my-row>
    </div>
</template>

<script>
export default {
    name: 'MyFooter',
    data () {
        return {
            msgs: [
                '地址：云南省昆明市呈贡区大学城东外环南路云南大学呈贡校区中山邦翰楼负一楼',
                '邮编：650500',
                '电话：0871-65148526  65931997',
                '邮箱：ydxsjyzx@126.com ',
                'QQ：545018473'
            ]
        }
    }
}
</script>

<style scoped>
    li {
        list-style: none;
    }
</style>
