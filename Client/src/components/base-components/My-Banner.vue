<template>
    <el-carousel height="300px">
      <el-carousel-item v-for="(banner, index) in banners" :key="index">
         <img :src="banner.src" alt="banner.msg">
      </el-carousel-item>
    </el-carousel>
</template>

<script>
export default {
    name: 'MyBanner',
    props: [ 'banners' ],
    data () {
        return {

        }
    }
}
</script>

<style scoped>
    img {
        widows: 100%;
    }
</style>
