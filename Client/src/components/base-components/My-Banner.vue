<template>
    <el-carousel :height="bannerHeight">
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
            bannerHeight: '400px'
        }
    },
    methods: {
        setBannerHeight: function() {
            this.bannerHeight = 400 / 1440 * window.innerWidth + 'px';
        }
    },
    mounted() {
        this.setBannerHeight();
        window.addEventListener('resize', () => {
            this.setBannerHeight();
        }, false);
    },
}
</script>

<style scoped>
   img {
        width: 100%;
    }
</style>
