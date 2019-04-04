<template>
    <el-carousel height="400px">
      <el-carousel-item v-for="(banner, index) in banners" :key="index">
         <router-link :to="banner.path || '#'">
            <img :src="banner.src" alt="banner.msg">
         </router-link>
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
        width: 100%;
    }
</style>
